// ============================================================
// MoonInfrastructure — 城市连接组织
// 主/次道路 + 能源导管网 + 太阳能阵列 + 后勤停机坪 + 通讯塔
// + 次级建筑填充 + 道路灯柱 = 让四个区域成为"一座城市"
// ============================================================
import * as THREE from 'three';
import {
  cyl, box, sph, torus, dome, habitat, towerModule, corridor,
  latticeTower, dish, commMast, lightPole, crate, rover, vtol,
  solarArray, roadRibbon, energyConduit, signBoard, enableShadows
} from './MoonBuilders.js';
import { ZONES } from './MoonConfig.js';

export function buildInfrastructure(ctx) {
  const { scene, heightAt, palette, updatables } = ctx;
  const { mats, tex } = palette;
  const g = new THREE.Group();

  // ---------- 主道路（中央基地 ↔ 三大区域；起点在基座平台外，避开高架走廊） ----------
  const mainRoads = [
    [{ x: 36, z: -13 }, { x: 104, z: -33 }],   // hub → eco
    [{ x: -36, z: -11 }, { x: -102, z: -25 }], // hub → research
    [{ x: 0,  z: -34 }, { x: 0,  z: -136 }],   // hub → rocket
  ];
  for (const [a, b] of mainRoads) g.add(roadRibbon(a, b, 5.6, ctx));

  // ---------- 次级道路（后勤 / 太阳能 / 区间连接） ----------
  const subRoads = [
    [{ x: 19,  z: -24 }, { x: 26,  z: -86 }],   // hub → 后勤区（止于停机坪，避开后勤舱）
    [{ x: 36,  z: -108 }, { x: -6, z: -142 }],  // 后勤区 → 火箭港（西侧进入，避开车站）
    [{ x: 66,  z: -20 }, { x: 66,  z: 36 }],    // 主路 → 太阳能 A 支线（垂直避开仓储舱）
    [{ x: -60, z: -18 }, { x: -70, z: 36 }],    // 主路 → 太阳能 B 支线
    [{ x: 96,  z: -14 }, { x: 112, z: -30 }],   // 通讯塔 A 支线
  ];
  for (const [a, b] of subRoads) g.add(roadRibbon(a, b, 3.6, ctx));

  // ---------- 能源导管网（太阳能 → 中央 → 各区域） ----------
  const conduits = [
    [{ x: 80,  z: 54 },  { x: 10,   z: 6 }],    // 太阳能 A → hub
    [{ x: -84, z: 50 },  { x: -10,  z: 6 }],    // 太阳能 B → hub
    [{ x: 4,   z: -32 }, { x: 4,    z: -134 }], // hub → 火箭港（沿主路）
    [{ x: 28,  z: -5 },  { x: 102,  z: -29 }],  // hub → 生态舱
    [{ x: -28, z: -3 },  { x: -100, z: -21 }],  // hub → 科研区
  ];
  for (const [a, b] of conduits) g.add(energyConduit(a, b, ctx));

  // ---------- 道路灯柱（沿三条主路，左右交错） ----------
  let side = 1;
  for (const [a, b] of mainRoads) {
    const dx = b.x - a.x, dz = b.z - a.z;
    const len = Math.hypot(dx, dz);
    const nx = -dz / len, nz = dx / len;
    const n = Math.floor(len / 24);
    for (let i = 1; i < n; i++) {
      const t = i / n;
      const px = a.x + dx * t + nx * 4.6 * side;
      const pz = a.z + dz * t + nz * 4.6 * side;
      const pole = lightPole(mats, { cool: true });
      pole.position.set(px, heightAt(px, pz), pz);
      pole.rotation.y = Math.atan2(dx, dz) + (side > 0 ? Math.PI : 0);
      g.add(pole);
      side = -side;
    }
  }

  // ---------- 太阳能阵列 A / B（成组排列，朝向太阳） ----------
  const saA = solarArray(9, 6, ctx);
  saA.position.set(80, heightAt(80, 54), 54);
  saA.rotation.y = 0.25;
  g.add(saA);
  const saB = solarArray(8, 5, ctx);
  saB.position.set(-84, heightAt(-84, 50), 50);
  saB.rotation.y = -0.2;
  g.add(saB);
  // 阵列配套：变电节点
  for (const [px, pz] of [[62, 46], [-66, 42]]) {
    const node = box(2.6, 1.8, 2.0, mats.white2);
    node.position.set(px, heightAt(px, pz) + 0.9, pz);
    g.add(node);
    const nLight = box(2.64, 0.14, 2.04, mats.energySoft);
    nLight.position.set(px, heightAt(px, pz) + 1.5, pz);
    g.add(nLight);
  }

  // ---------- 后勤 / 登陆区（34, -96） ----------
  const logi = new THREE.Group();
  const lPad = cyl(13, 14, 1.2, mats.concrete, 40); lPad.position.y = 0.6; logi.add(lPad);
  const lTop = new THREE.Mesh(new THREE.CircleGeometry(12.4, 40), new THREE.MeshStandardMaterial({
    map: tex.pad, roughness: 0.85, metalness: 0.15
  }));
  lTop.rotation.x = -Math.PI / 2; lTop.position.y = 1.22; lTop.receiveShadow = true; logi.add(lTop);
  const lRing = torus(12.8, 0.1, mats.energySoft); lRing.rotation.x = Math.PI / 2; lRing.position.y = 1.28; logi.add(lRing);
  const ship0 = vtol(mats); ship0.position.set(1.5, 1.25, 0); ship0.rotation.y = 0.5; logi.add(ship0);
  const lHab = habitat(7, 2.0, mats); lHab.position.set(-1, 1.2, 17); lHab.rotation.y = 0.2; logi.add(lHab);
  for (const [cx, cz, ry] of [[-14, 6, 0.4], [-15, 8.5, 1.1], [-13, 9.8, 0.2], [14, -8, 0.9]]) {
    const c0 = crate(mats, 0.9 + Math.random() * 0.3);
    c0.position.set(cx, 1.2, cz); c0.rotation.y = ry; logi.add(c0);
  }
  for (const a of [0.8, 2.6, 4.4]) {
    const pole = lightPole(mats);
    pole.position.set(Math.cos(a) * 15.5, 1.2, Math.sin(a) * 15.5);
    logi.add(pole);
  }
  const lSign = signBoard('后勤登陆区 · LOGISTICS', mats, 6.2, 1.2);
  lSign.position.set(0, 3.2, 13.4);
  logi.add(lSign);
  logi.position.set(34, heightAt(34, -96), -96);
  g.add(logi);

  // ---------- 通讯塔 A / B（顶部加旋转雷达，低成本动效） ----------
  const commA = new THREE.Group();
  commA.add(latticeTower(26, 3.4, mats, { decks: [8, 16, 22], topBox: true }));
  const dA = dish(2.4, mats, 0.5); dA.position.set(4.5, 0, 1); commA.add(dA);
  const cBaseA = cyl(4.4, 5, 0.9, mats.concrete, 20); cBaseA.position.y = 0.45; commA.add(cBaseA);
  const radarA = box(3.2, 0.16, 0.4, mats.metal); radarA.position.y = 28.2; commA.add(radarA);
  commA.position.set(96, heightAt(96, -12), -12);
  g.add(commA);

  const commB = new THREE.Group();
  commB.add(latticeTower(22, 3.0, mats, { decks: [7, 14, 19], topBox: true }));
  const dB = dish(2.0, mats, 0.65); dB.position.set(-4, 0, 1.5); commB.add(dB);
  const cBaseB = cyl(4.0, 4.6, 0.9, mats.concrete, 20); cBaseB.position.y = 0.45; commB.add(cBaseB);
  const radarB = box(2.8, 0.14, 0.36, mats.metal); radarB.position.y = 24.0; commB.add(radarB);
  commB.position.set(-96, heightAt(-96, -86), -86);
  g.add(commB);
  updatables.push((dt) => { radarA.rotation.y += dt * 0.9; radarB.rotation.y -= dt * 0.7; });

  // ---------- 次级建筑填充（区间密度，不对称） ----------
  const fillers = [
    { b: () => towerModule(2.4, 6, mats),   x: 66,   z: -84,  ry: 0.3 },
    { b: () => habitat(6, 1.8, mats),       x: 71,   z: -78,  ry: 1.1 },
    { b: () => habitat(8, 2.2, mats),       x: -58,  z: -96,  ry: 0.5 },
    { b: () => towerModule(2.0, 4.5, mats), x: -64,  z: -104, ry: 0 },
    { b: () => habitat(7, 2.0, mats),       x: -40,  z: 72,   ry: 2.2 },
    { b: () => towerModule(2.2, 5, mats),   x: 44,   z: 78,   ry: 0 },
    { b: () => habitat(6, 1.9, mats),       x: 148,  z: -96,  ry: -0.6 },
    { b: () => towerModule(2.6, 6.5, mats), x: -148, z: -70,  ry: 0 },
    { b: () => dome(3.6, mats),             x: -120, z: 24,   ry: 0 },
    { b: () => habitat(7, 2.1, mats),       x: 128,  z: 6,    ry: 1.9 },
    // —— Phase 1.5 加密：能源 / 仓储 / 维护 / 通讯中继 ——
    { b: () => habitat(6, 1.8, mats),       x: 92,   z: -66,  ry: 0.8 },   // 能源站值班舱
    { b: () => towerModule(2.4, 5.5, mats), x: -100, z: 30,   ry: 0 },     // 通讯中继
    { b: () => habitat(6, 1.8, mats),       x: 60,   z: 20,   ry: -0.9 },  // 仓储舱
    { b: () => towerModule(2.6, 6, mats),   x: -60,  z: -130, ry: 0 },     // 维护站
  ];
  for (const f of fillers) {
    const mod = f.b();
    mod.position.set(f.x, heightAt(f.x, f.z), f.z);
    mod.rotation.y = f.ry;
    g.add(mod);
  }
  // 填充区配套小件
  for (const [px, pz] of [[63, -80], [-61, -99], [42, 74], [126, 10], [-146, -66]]) {
    const pole = lightPole(mats, { cool: true });
    pole.position.set(px, heightAt(px, pz), pz);
    g.add(pole);
  }
  for (const [px, pz] of [[69, -87], [-55, -92], [131, 3]]) {
    const c0 = crate(mats, 0.8);
    c0.position.set(px, heightAt(px, pz), pz);
    c0.rotation.y = Math.random() * Math.PI;
    g.add(c0);
  }
  // 独立通讯杆点缀
  const mast1 = commMast(10, mats, updatables);
  mast1.position.set(58, heightAt(58, -20), -20);
  g.add(mast1);
  const mast2 = commMast(12, mats, updatables);
  mast2.position.set(-50, heightAt(-50, 30), 30);
  g.add(mast2);
  // 野外停放的月球车（主干道旁）
  const rv = rover(mats);
  rv.position.set(14, heightAt(14, -72), -72);
  rv.rotation.y = -0.4;
  g.add(rv);

  enableShadows(g);
  scene.add(g);
  return g;
}
