// ============================================================
// MoonTerrain — 月面：起伏 + 陨石坑 + 城市整平区 + 岩石 + 远山
// heightAt(x,z) 同时供"地形网格烘焙"与"玩家物理"使用，保证一致
// ============================================================
import * as THREE from 'three';
import { ZONES, FLAT_PADS, CRATERS } from './MoonConfig.js';

// 高度场：噪声起伏 × 城市整平 × 陨石坑
export function createHeightField(simplex) {
  const flats = [...Object.values(ZONES), ...FLAT_PADS];

  return function heightAt(x, z) {
    // 基础起伏（离城心越远越野）
    const rc = Math.hypot(x, z);
    const wild = THREE.MathUtils.clamp((rc - 40) / 150, 0.2, 1);
    let h = 0;
    h += simplex.noise3d(x * 0.008, z * 0.008, 0.0) * 10.0;
    h += simplex.noise3d(x * 0.030, z * 0.030, 5.0) * 2.8;
    h += simplex.noise3d(x * 0.085, z * 0.085, 9.0) * 0.8;
    h *= wild;

    // 城市 / 设施整平
    let flat = 1;
    for (const f of flats) {
      const d = Math.hypot(x - f.x, z - f.z);
      flat *= THREE.MathUtils.clamp((d - f.r * 0.55) / (f.r * 0.8), 0, 1);
    }
    h *= flat;

    // 陨石坑（碗形 + 坑缘环脊）
    for (const c of CRATERS) {
      const d = Math.hypot(x - c.x, z - c.z);
      if (d < c.r) {
        const t = d / c.r;
        h -= c.depth * (Math.cos(t * Math.PI) + 1) * 0.5;
      }
      if (d > c.r * 0.7 && d < c.r * 1.35) {
        const t = (d - c.r) / (c.r * 0.35);
        h += c.depth * 0.28 * Math.exp(-t * t * 2.2);
      }
    }
    return h;
  };
}

// 主地形网格 + 程序化月壤贴图
export function buildTerrain(ctx) {
  const { scene, heightAt, palette } = ctx;
  const size = 900, seg = 240;
  const geoT = new THREE.PlaneGeometry(size, size, seg, seg);
  geoT.rotateX(-Math.PI / 2);
  const pos = geoT.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.setY(i, heightAt(pos.getX(i), pos.getZ(i)));
  }
  geoT.computeVertexNormals();

  const c = document.createElement('canvas'); c.width = c.height = 512;
  const x = c.getContext('2d');
  x.fillStyle = '#8f9096'; x.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 3200; i++) {
    const d = Math.random() * 0.35;
    x.fillStyle = `rgba(${105 + d * 90 | 0},${106 + d * 90 | 0},${112 + d * 90 | 0},0.5)`;
    x.beginPath(); x.arc(Math.random() * 512, Math.random() * 512, Math.random() * 2.0, 0, Math.PI * 2); x.fill();
  }
  for (let i = 0; i < 26; i++) {   // 细小坑影
    const px = Math.random() * 512, py = Math.random() * 512, r = 4 + Math.random() * 16;
    const g = x.createRadialGradient(px, py, 1, px, py, r);
    g.addColorStop(0, 'rgba(52,52,60,0.5)'); g.addColorStop(1, 'rgba(200,200,210,0)');
    x.fillStyle = g; x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill();
  }
  const groundTex = new THREE.CanvasTexture(c);
  groundTex.colorSpace = THREE.SRGBColorSpace;
  groundTex.wrapS = groundTex.wrapT = THREE.RepeatWrapping;
  groundTex.repeat.set(10, 10);

  const ground = new THREE.Mesh(geoT, new THREE.MeshStandardMaterial({
    map: groundTex, color: 0xbfbfc6, roughness: 0.97, metalness: 0.02
  }));
  ground.receiveShadow = true;
  scene.add(ground);
  return ground;
}

// 散落岩石（InstancedMesh，城外随机分布）
export function buildRocks(ctx) {
  const { scene, heightAt, palette } = ctx;
  const flats = [...Object.values(ZONES), ...FLAT_PADS];
  const count = 260;
  const inst = new THREE.InstancedMesh(palette.geo.rock, new THREE.MeshStandardMaterial({
    color: 0x7a7b81, roughness: 0.95, metalness: 0.05, flatShading: true
  }), count);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
  let placed = 0, guard = 0;
  while (placed < count && guard++ < 4000) {
    const a = Math.random() * Math.PI * 2;
    const r = 62 + Math.random() * 360;
    const px = Math.cos(a) * r, pz = Math.sin(a) * r;
    if (flats.some(f => Math.hypot(px - f.x, pz - f.z) < f.r * 1.15)) continue;
    const sc = 0.3 + Math.random() * 2.0;
    q.setFromEuler(new THREE.Euler(Math.random() * 3, Math.random() * 3, Math.random() * 3));
    s.set(sc * (0.7 + Math.random() * 0.7), sc * (0.5 + Math.random() * 0.6), sc * (0.7 + Math.random() * 0.7));
    p.set(px, heightAt(px, pz) + sc * 0.25, pz);
    m.compose(p, q, s);
    inst.setMatrixAt(placed++, m);
  }
  inst.count = placed;
  inst.castShadow = true; inst.receiveShadow = true;
  scene.add(inst);
}

// 远山剪影（地平线层次感）
export function buildMountains(ctx) {
  const { scene } = ctx;
  const mat = new THREE.MeshStandardMaterial({ color: 0x5f6067, roughness: 1, flatShading: true });
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
    const r = 340 + Math.random() * 150;
    const sx = 60 + Math.random() * 80, sy = 22 + Math.random() * 34, sz = 60 + Math.random() * 80;
    const g = new THREE.ConeGeometry(1, 1, 7);
    const pp = g.attributes.position;
    for (let j = 0; j < pp.count; j++) {
      pp.setX(j, pp.getX(j) * (1 + (Math.random() - 0.5) * 0.3));
      pp.setZ(j, pp.getZ(j) * (1 + (Math.random() - 0.5) * 0.3));
    }
    g.computeVertexNormals();
    const hill = new THREE.Mesh(g, mat);
    hill.scale.set(sx, sy, sz);
    hill.position.set(Math.cos(a) * r, -sy * 0.18, Math.sin(a) * r);
    hill.rotation.y = Math.random() * Math.PI;
    scene.add(hill);
  }
}
