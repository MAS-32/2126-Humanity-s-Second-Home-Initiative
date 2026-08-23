// ============================================================
// ResearchVillage — 科研区 / 月球村
// 一组不对称聚居模块群：卧式舱 + 立式舱 + 小穹顶 + 连廊
// + 大天线阵 + 通讯塔 + 设备场 + 月球车 = 长期驻扎的痕迹
// 交互点 (-130,2,-22) 保留：研究人员 NPC
// ============================================================
import * as THREE from 'three';
import {
  cyl, box, sph, torus, dome, habitat, towerModule, corridor,
  dish, commMast, lightPole, crate, rover, signBoard, enableShadows
} from './MoonBuilders.js';

export function buildResearchVillage(ctx) {
  const { scene, heightAt, palette, updatables } = ctx;
  const { mats } = palette;
  const CX = -130, CZ = -30;
  const g = new THREE.Group();
  g.position.set(CX, heightAt(CX, CZ), CZ);

  // ---------- 地面基盘 ----------
  const pad = cyl(26, 28, 1.0, mats.concrete, 40); pad.position.y = 0.5; g.add(pad);

  // ---------- 聚居模块群（不对称，像多年扩建而成） ----------
  const mods = [
    { b: () => habitat(9, 2.4, mats),   p: [-6, 0],   ry: 0.4 },    // 居住 A
    { b: () => habitat(7, 2.1, mats),   p: [7, 7],    ry: -0.5 },   // 居住 B
    { b: () => habitat(11, 2.6, mats),  p: [11, -6],  ry: 1.25 },   // 科研主舱
    { b: () => towerModule(3.0, 8, mats),  p: [-13, 7] },           // 立式实验舱
    { b: () => towerModule(2.4, 5.5, mats), p: [1, -13] },          // 通讯舱
    { b: () => towerModule(2.0, 4, mats),   p: [17, 9] },           // 设备舱
    { b: () => habitat(6, 1.8, mats),   p: [-16, -7], ry: 0.9 },    // 居住 C
    { b: () => habitat(7, 2.1, mats),   p: [-24, 2],  ry: 0.3 },    // 医疗舱
    { b: () => habitat(8, 2.2, mats),   p: [21, 5],   ry: 1.0 },    // 居住 D
  ];
  const centers = [];
  for (const m of mods) {
    const mod = m.b();
    mod.position.set(m.p[0], 1.0, m.p[1]);
    mod.rotation.y = m.ry || 0;
    g.add(mod);
    centers.push(m.p);
  }
  // 小科研穹顶
  const lab = dome(5.2, mats);
  lab.position.set(-2, 1.0, 16);
  g.add(lab);
  const labBase = cyl(5.6, 6.0, 1.6, mats.white2, 28); labBase.position.set(-2, 1.4, 16); g.add(labBase);
  const labCore = box(3.2, 2.4, 2.6, mats.white); labCore.position.set(-2, 2.4, 16); g.add(labCore);
  const labBand = box(3.3, 0.5, 2.7, mats.warmSoft); labBand.position.set(-2, 2.6, 16); g.add(labBand);

  // 生命维持塔 + 储罐（水 / 氧循环）
  const lsTower = towerModule(2.8, 6, mats); lsTower.position.set(14, 1.0, 17); g.add(lsTower);
  for (const [tx, tz] of [[18, 15], [18, 19]]) {
    const tank = sph(1.4, mats.white2, 16, 12);
    tank.position.set(tx, 2.2, tz);
    g.add(tank);
    const tStand = cyl(0.9, 1.1, 0.8, mats.dark, 12);
    tStand.position.set(tx, 1.4, tz);
    g.add(tStand);
  }
  const lsSign = signBoard('生命维持 · LIFE SUPPORT', mats, 4.2, 0.9, '#7affb0');
  lsSign.position.set(14, 3.6, 20.5);
  g.add(lsSign);

  // 公共活动穹顶（村民聚集空间）
  const commons = dome(4.2, mats);
  commons.position.set(-20, 1.6, -15);
  g.add(commons);
  const commonsBase = cyl(4.6, 5.0, 1.4, mats.white2, 24);
  commonsBase.position.set(-20, 1.3, -15);
  g.add(commonsBase);
  const commonsCore = box(2.4, 1.8, 2.0, mats.white);
  commonsCore.position.set(-20, 2.2, -15);
  g.add(commonsCore);

  // ---------- 加压连接走廊网（月球无大气，舱间必须封闭连接） ----------
  const links = [
    [[-6, 0], [7, 7]], [[7, 7], [11, -6]], [[-6, 0], [-13, 7]],
    [[-6, 0], [-16, -7]], [[1, -13], [11, -6]], [[-6, 0], [-2, 16]],
    [[-6, 0], [-24, 2]],          // → 医疗舱
    [[11, -6], [21, 5]],          // → 居住 D
    [[-16, -7], [-20, -15]],      // → 公共穹顶
    [[7, 7], [14, 17]],           // → 生命维持
  ];
  for (const [[x1, z1], [x2, z2]] of links) {
    g.add(corridor(x1, z1, x2, z2, mats, { r: 0.8, y: 2.2 }));
  }

  // ---------- 大卫星天线阵 ----------
  const bigDish = dish(4.6, mats, 0.55);
  bigDish.position.set(-21, 1.0, 13);
  bigDish.rotation.y = 0.6;
  g.add(bigDish);
  const midDish = dish(2.6, mats, 0.7);
  midDish.position.set(19, 1.0, -10);
  midDish.rotation.y = -0.8;
  g.add(midDish);
  const roofDish = dish(1.5, mats, 0.9);
  roofDish.position.set(-13, 9.0, 7);
  g.add(roofDish);

  // ---------- 通讯塔 ----------
  const mast = commMast(17, mats, updatables);
  mast.position.set(15, 1.0, -15);
  g.add(mast);

  // ---------- 设备场：货箱 + 电缆盘 + 灯柱 ----------
  const crateSpots = [[-8, -16], [-5.5, -17], [-7, -14.2], [20, 2], [21.5, 4], [5, 18]];
  for (const [cx, cz] of crateSpots) {
    const c0 = crate(mats, 0.8 + Math.random() * 0.4);
    c0.position.set(cx, 1.0, cz);
    c0.rotation.y = Math.random() * Math.PI;
    g.add(c0);
  }
  for (const [px, pz] of [[-11, -13], [13, 13], [22, -4]]) {
    const drum = cyl(0.9, 0.9, 0.8, mats.dark, 14);
    drum.rotation.z = Math.PI / 2;
    drum.position.set(px, 1.4, pz);
    g.add(drum);
  }
  for (const [px, pz] of [[-4, -8], [9, 2], [-14, 2]]) {
    const pole = lightPole(mats);
    pole.position.set(px, 1.0, pz);
    g.add(pole);
  }

  // ---------- 月球车 + 泊位 ----------
  const rv = rover(mats);
  rv.position.set(8, 1.0, -13);
  rv.rotation.y = -0.7;
  g.add(rv);
  // 月球车泊位（划线平台 + 第二辆车 + 充电桩）
  const bayPad = box(8, 0.22, 5, mats.concrete);
  bayPad.position.set(-10, 1.1, -20);
  g.add(bayPad);
  const rv2 = rover(mats);
  rv2.position.set(-11, 1.2, -20);
  rv2.rotation.y = 0.9;
  g.add(rv2);
  const chargePost = box(0.4, 1.6, 0.4, mats.dark);
  chargePost.position.set(-7, 1.9, -21.5);
  g.add(chargePost);
  const chargeLight = box(0.44, 0.2, 0.44, mats.energySoft);
  chargeLight.position.set(-7, 2.75, -21.5);
  g.add(chargeLight);
  // 设备场补充（开口箱组）
  for (const [cx, cz, ry] of [[5, -20, 0.4], [7, -21, 1.3], [6, -18.5, 0.9]]) {
    const c0 = crate(mats, 0.9);
    c0.position.set(cx, 1.0, cz);
    c0.rotation.y = ry;
    g.add(c0);
  }

  // 标牌
  const sign = signBoard('月球村 · RESEARCH VILLAGE', mats, 7, 1.3);
  sign.position.set(0, 3.6, 12.5);
  sign.rotation.y = 0.15;
  g.add(sign);

  // ---------- 研究人员 NPC（交互点原坐标 → 局部 (0,?,8)） ----------
  const colonist = new THREE.Group();
  const cBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.62, 1.4, 4, 12), mats.white);
  cBody.position.y = 1.7; colonist.add(cBody);
  const cHead = sph(0.5, mats.white2, 16, 12); cHead.position.y = 3.0; colonist.add(cHead);
  const cVisor = box(0.62, 0.22, 0.18, mats.energy); cVisor.position.set(0, 3.05, 0.44); colonist.add(cVisor);
  const cPack = box(0.7, 0.9, 0.35, mats.metal); cPack.position.set(0, 2.0, -0.55); colonist.add(cPack);
  colonist.position.set(1.8, 1.0, 8);
  updatables.push((dt, t) => { colonist.rotation.y = Math.sin(t * 0.4) * 0.6; });
  g.add(colonist);
  // 小型工作台
  const bench = box(2.2, 1.0, 0.9, mats.white2); bench.position.set(-1.6, 1.5, 8.4); g.add(bench);
  const benchScreen = box(1.6, 0.9, 0.06, mats.energySoft); benchScreen.position.set(-1.6, 2.6, 8.2); benchScreen.rotation.x = -0.25; g.add(benchScreen);

  enableShadows(g);
  scene.add(g);
  return g;
}
