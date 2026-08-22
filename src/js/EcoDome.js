// ============================================================
// EcoDome — 生态舱 / 温室农业区
// 大玻璃穹顶 + 内部立体农业（环形种植架 + 中央塔 + 水循环）
// 交互点 (130,2,-32) 保留：入口气闸 + 生态机器人
// 设计语义：CONTROLLED ECOLOGICAL SYSTEM，不是热带雨林
// ============================================================
import * as THREE from 'three';
import {
  cyl, box, sph, torus, dome, windowBand, pipeRun, corridor, signBoard, enableShadows
} from './MoonBuilders.js';

export function buildEcoDome(ctx) {
  const { scene, heightAt, palette, updatables } = ctx;
  const { mats, geo } = palette;
  const CX = 130, CZ = -40;
  const g = new THREE.Group();
  g.position.set(CX, heightAt(CX, CZ), CZ);
  const R = 20;

  // ---------- 基座环形墙（+z 朝 hub 方向留入口缺口，玩家可真正走进穹顶） ----------
  const GAP = 0.11;   // 缺口半角（与碰撞缺口一致；theta=0 即 +z）
  const wallGeo = new THREE.CylinderGeometry(R + 1.2, R + 2.2, 2.2, 48, 1, false, GAP, Math.PI * 2 - GAP * 2);
  const wall = new THREE.Mesh(wallGeo, mats.white2); wall.position.y = 1.1; g.add(wall);
  const wallDarkGeo = new THREE.CylinderGeometry(R + 2.2, R + 2.8, 0.8, 48, 1, false, GAP, Math.PI * 2 - GAP * 2);
  const wallDark = new THREE.Mesh(wallDarkGeo, mats.concrete); wallDark.position.y = 0.4; g.add(wallDark);

  // ---------- 大玻璃穹顶 ----------
  const bigDome = dome(R, mats, { glassMat: mats.glassGreen });
  bigDome.position.y = 2.2;
  g.add(bigDome);

  // ---------- 内部地面（土壤 + 水环） ----------
  const floor = cyl(R - 0.4, R - 0.4, 0.4, mats.soil, 40); floor.position.y = 2.4; g.add(floor);
  const pond = new THREE.Mesh(new THREE.CircleGeometry(4.2, 32), mats.water);
  pond.rotation.x = -Math.PI / 2; pond.position.y = 2.65; g.add(pond);
  const waterRing = new THREE.Mesh(new THREE.RingGeometry(6.6, 7.4, 40), mats.water);
  waterRing.rotation.x = -Math.PI / 2; waterRing.position.y = 2.65; g.add(waterRing);

  // ---------- 中央生命塔 ----------
  const tower = cyl(2.6, 3.0, 13, mats.white, 20); tower.position.y = 9; g.add(tower);
  const towerBand = windowBand(2.68, 1.0, mats, 6); towerBand.position.y = 11.5; g.add(towerBand);
  const towerCap = sph(2.6, mats.glass, 20, 12); towerCap.scale.y = 0.6; towerCap.position.y = 15.5; g.add(towerCap);
  const towerAnt = cyl(0.1, 0.16, 4, mats.metal, 8); towerAnt.position.y = 17.5; g.add(towerAnt);

  // ---------- 三层环形种植架 + 程序化作物（三类，替代单一锥体） ----------
  const shelves = [
    { r: 8,  y: 4.2, plants: 34, type: 'B' },   // 低层：水培苗床
    { r: 12, y: 6.2, plants: 46, type: 'A' },   // 中层：阔叶丛
    { r: 16, y: 8.2, plants: 58, type: 'M' },   // 外层：阔叶 + 垂直藤架混合
  ];
  // 作物几何：A 阔叶丛 / B 水培苗床 / C 垂直藤架
  const geoA = new THREE.SphereGeometry(0.42, 7, 5); geoA.scale(1, 0.62, 1);
  const geoB = new THREE.BoxGeometry(0.55, 0.22, 0.4);
  const geoC = new THREE.IcosahedronGeometry(0.3, 0); geoC.scale(1, 2.1, 1);
  const totalByType = { A: 0, B: 0, C: 0 };
  for (const sh of shelves) {
    if (sh.type === 'A') totalByType.A += sh.plants;
    else if (sh.type === 'B') totalByType.B += sh.plants;
    else { totalByType.A += Math.ceil(sh.plants / 2); totalByType.C += Math.floor(sh.plants / 2); }
  }
  const instA = new THREE.InstancedMesh(geoA, mats.plant, Math.max(1, totalByType.A));
  const instB = new THREE.InstancedMesh(geoB, mats.plant2, Math.max(1, totalByType.B));
  const instC = new THREE.InstancedMesh(geoC, mats.plant2, Math.max(1, totalByType.C));
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), sv = new THREE.Vector3(), pv = new THREE.Vector3();
  let ia = 0, ib = 0, ic = 0;
  const place = (inst, idx, x, y, z, sBase) => {
    e.set((Math.random() - 0.5) * 0.2, Math.random() * Math.PI, (Math.random() - 0.5) * 0.2);
    q.setFromEuler(e);
    const sc = sBase + Math.random() * 0.7;
    sv.set(sc, sc, sc);
    pv.set(x, y, z);
    m4.compose(pv, q, sv);
    inst.setMatrixAt(idx, m4);
  };
  for (const sh of shelves) {
    // 环形架体 + 架下生长灯
    const shelf = torus(sh.r, 0.55, mats.metal); shelf.rotation.x = Math.PI / 2; shelf.position.y = sh.y; g.add(shelf);
    const grow = torus(sh.r, 0.09, mats.warm); grow.rotation.x = Math.PI / 2; grow.position.y = sh.y - 0.62; g.add(grow);
    // 立柱
    for (let i = 0; i < 4; i++) {
      const a = i * Math.PI / 2 + 0.4;
      const leg = cyl(0.12, 0.12, sh.y - 2.6, mats.dark, 6);
      leg.position.set(Math.cos(a) * sh.r, 2.6 + (sh.y - 2.6) / 2, Math.sin(a) * sh.r);
      g.add(leg);
    }
    // 作物阵列
    for (let i = 0; i < sh.plants; i++) {
      const a = (i / sh.plants) * Math.PI * 2;
      const rr = sh.r + (Math.random() - 0.5) * 0.5;
      const px = Math.cos(a) * rr, pz = Math.sin(a) * rr;
      if (sh.type === 'B') place(instB, ib++, px, sh.y + 0.68, pz, 0.9);
      else if (sh.type === 'A') place(instA, ia++, px, sh.y + 0.85, pz, 0.8);
      else { // 混合层：偶数阔叶、奇数藤架
        if (i % 2 === 0) place(instA, ia++, px, sh.y + 0.85, pz, 0.8);
        else place(instC, ic++, px, sh.y + 1.1, pz, 0.7);
      }
    }
  }
  g.add(instA, instB, instC);

  // ---------- 水循环管线（塔 → 种植架） ----------
  for (const sh of shelves) {
    g.add(pipeRun([[0, sh.y + 2, 0], [sh.r * 0.5, sh.y + 1.2, sh.r * 0.4], [sh.r, sh.y + 0.4, 0]], 0.1, mats));
  }
  g.add(pipeRun([[0, 3, 0], [5, 2.9, 5], [7, 2.8, 0]], 0.16, mats, { mat: mats.energySoft }));

  // ---------- 内部暖光（生命感） ----------
  const inner = new THREE.PointLight(0xffd9a6, 1.15, 46, 1.8);
  inner.position.set(0, 9, 0);
  g.add(inner);

  // ---------- 长条温室（附属于穹顶） ----------
  const gh = new THREE.Group();
  const ghLen = 22, ghR = 4.2;
  const ghGlass = new THREE.Mesh(new THREE.CylinderGeometry(ghR, ghR, ghLen, 20, 1, true), mats.glassGreen);
  ghGlass.rotation.z = Math.PI / 2; ghGlass.position.y = ghR + 0.6;
  gh.add(ghGlass);
  for (let i = 0; i <= 5; i++) {
    const ring = torus(ghR, 0.16, mats.metal);
    ring.rotation.y = Math.PI / 2;
    ring.position.set(-ghLen / 2 + (ghLen / 5) * i, ghR + 0.6, 0);
    gh.add(ring);
  }
  const ghCore = cyl(ghR * 0.55, ghR * 0.55, ghLen - 2, mats.soil, 14);
  ghCore.rotation.z = Math.PI / 2; ghCore.position.y = 2.6; gh.add(ghCore);
  const ghLight = box(ghLen - 2, 0.1, 0.1, mats.warm); ghLight.position.y = ghR * 1.6; gh.add(ghLight);
  const ghBase = box(ghLen + 1, 1.2, ghR * 2 + 1, mats.concrete); ghBase.position.y = 0.6; gh.add(ghBase);
  gh.position.set(4, 0, R + 12);
  gh.rotation.y = 0.35;
  g.add(gh);

  // ---------- 入口气闸（朝向中央基地）：门洞式，玩家可走进穹顶 ----------
  const airlock = new THREE.Group();
  const lockL = box(1.3, 3.6, 3.2, mats.white); lockL.position.set(-1.45, 1.8, 0); airlock.add(lockL);
  const lockR = box(1.3, 3.6, 3.2, mats.white); lockR.position.set(1.45, 1.8, 0); airlock.add(lockR);
  const lockTop = box(4.2, 0.9, 3.2, mats.white); lockTop.position.set(0, 3.15, 0); airlock.add(lockTop);
  for (const fx of [-0.85, 0.85]) {                       // 门洞门框
    const frame = box(0.12, 2.6, 0.12, mats.metal); frame.position.set(fx, 1.3, 1.6); airlock.add(frame);
  }
  const lockLight = box(1.8, 0.1, 0.06, mats.energySoft); lockLight.position.set(0, 2.7, 1.68); airlock.add(lockLight);
  airlock.position.set(0, 0, R + 1.4);   // 局部 +z 朝向 hub
  g.add(airlock);

  // 生态监测台（气闸旁，SYSTEM 是主角）
  const mon = box(1.6, 1.1, 0.7, mats.dark);
  mon.position.set(5.5, 0.55, R + 5);
  g.add(mon);
  const monScreen = box(1.3, 0.8, 0.08, mats.energySoft);
  monScreen.position.set(5.5, 1.6, R + 4.9);
  monScreen.rotation.x = -0.28;
  g.add(monScreen);

  // 标牌
  const sign = signBoard('生态穹顶 · ECO DOME', mats, 6.4, 1.3, '#7affb0');
  sign.position.set(-3.4, 3.4, R + 3.2);
  g.add(sign);

  // ---------- 生态机器人 NPC（交互点原坐标 → 局部 (0,?,8)） ----------
  const bot = new THREE.Group();
  const bBody = sph(0.9, mats.white, 18, 12); bBody.position.y = 1.9; bot.add(bBody);
  const bCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 0), new THREE.MeshBasicMaterial({ color: 0x7affb0, wireframe: true }));
  bCore.position.y = 2.4; bot.add(bCore);
  const bRing = torus(1.25, 0.07, mats.energySoft); bRing.rotation.x = Math.PI / 2; bRing.position.y = 1.9; bot.add(bRing);
  const bLegs = cyl(0.3, 0.5, 1.0, mats.dark, 10); bLegs.position.y = 0.5; bot.add(bLegs);
  bot.position.set(2.4, 0, 8);
  updatables.push((dt, t) => { bot.rotation.y = Math.sin(t * 0.5) * 0.5; bCore.rotation.y = t * 0.8; });
  g.add(bot);

  enableShadows(g);
  scene.add(g);
  return g;
}
