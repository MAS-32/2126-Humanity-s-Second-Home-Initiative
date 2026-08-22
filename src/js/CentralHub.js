// ============================================================
// CentralHub — 中央基地：整座城市的视觉核心
// 多层环形枢纽 + 大玻璃穹顶 + 中央尖塔 + 放射连廊 + 入口广场
// 交互点 (0,2,11) 保留在原位：欢迎终端广场
// ============================================================
import * as THREE from 'three';
import {
  cyl, box, sph, torus, dome, windowBand, corridor,
  commMast, dish, lightPole, crate, habitat, towerModule, signBoard, enableShadows
} from './MoonBuilders.js';

export function buildCentralHub(ctx) {
  const { scene, heightAt, palette, updatables } = ctx;
  const { mats } = palette;
  const g = new THREE.Group();
  g.position.set(0, heightAt(0, 0), 0);

  // ---------- 基座：深色底盘 + 双层白色平台 ----------
  const base0 = cyl(31, 33, 1.6, mats.concrete, 56); base0.position.y = 0.8; g.add(base0);
  const base1 = cyl(26, 28.5, 1.8, mats.white2, 56); base1.position.y = 2.4; g.add(base1);
  const base2 = cyl(19, 22, 1.6, mats.white, 48); base2.position.y = 4.0; g.add(base2);
  // 平台边缘导航灯带（克制的能量线）
  const navRing = torus(27.2, 0.1, mats.energySoft); navRing.rotation.x = Math.PI / 2; navRing.position.y = 3.35; g.add(navRing);
  const navRing2 = torus(20.2, 0.08, mats.energySoft); navRing2.rotation.x = Math.PI / 2; navRing2.position.y = 4.85; g.add(navRing2);

  // ---------- 主大厅：鼓形主体 + 夜景窗带 ----------
  const drum = cyl(14.2, 14.8, 7, mats.white, 40); drum.position.y = 8.3; g.add(drum);
  const band1 = windowBand(15.0, 1.8, mats, 10); band1.position.y = 7.6; g.add(band1);
  const band2 = windowBand(14.9, 1.2, mats, 10); band2.position.y = 10.4; g.add(band2);
  const drumTop = cyl(11.6, 13.2, 2.6, mats.white2, 40); drumTop.position.y = 13.1; g.add(drumTop);

  // ---------- 大穹顶（玻璃 + 结构肋） ----------
  const bigDome = dome(11.6, mats);
  bigDome.position.y = 14.4;
  g.add(bigDome);

  // ---------- 中央尖塔（城市最高点 / 通讯中枢） ----------
  const spire = new THREE.Group();
  const s1 = cyl(1.0, 1.5, 7, mats.white, 16); s1.position.y = 3.5; spire.add(s1);
  const sRing1 = torus(1.7, 0.14, mats.metal); sRing1.rotation.x = Math.PI / 2; sRing1.position.y = 7; spire.add(sRing1);
  const s2 = cyl(0.55, 0.85, 12, mats.metal, 12); s2.position.y = 13; spire.add(s2);
  const sRing2 = torus(1.2, 0.1, mats.metal); sRing2.rotation.x = Math.PI / 2; sRing2.position.y = 15; spire.add(sRing2);
  const s3 = cyl(0.22, 0.4, 9, mats.metal, 10); s3.position.y = 23.5; spire.add(s3);
  const sDish = dish(1.6, mats, 0.9); sDish.position.y = 18; sDish.scale.setScalar(0.8); spire.add(sDish);
  const tip = sph(0.5, mats.energy.clone(), 12, 8); tip.position.y = 28.4; spire.add(tip);
  updatables.push((dt, t) => { tip.material.emissiveIntensity = 1.1 + Math.sin(t * 2.4) * 0.7; });
  spire.position.y = 14.4;
  g.add(spire);

  // ---------- 放射连廊 ×5（+z 留给入口广场，正 -z 偏西避开火箭港主路） ----------
  const corridorAngles = [-0.298, -2.915, -1.75, 0.95, 2.2];
  for (const a of corridorAngles) {
    const x1 = Math.cos(a) * 14, z1 = Math.sin(a) * 14;
    const x2 = Math.cos(a) * 33, z2 = Math.sin(a) * 33;
    g.add(corridor(x1, z1, x2, z2, mats, { r: 1.05, y: 3.0 }));
  }

  // ---------- 周边次级模块环（不对称布局） ----------
  const ringMods = [
    { a: 0.55, d: 40, build: () => habitat(7, 2.0, mats) },
    { a: 1.95, d: 38, build: () => towerModule(2.6, 6, mats) },
    { a: 2.75, d: 42, build: () => habitat(9, 2.3, mats) },
    { a: 3.6,  d: 39, build: () => towerModule(2.2, 4.5, mats) },
    { a: 4.6,  d: 41, build: () => habitat(6, 1.9, mats) },
    { a: 5.5,  d: 37, build: () => towerModule(2.8, 7, mats) },
  ];
  for (const m of ringMods) {
    const mod = m.build();
    mod.position.set(Math.cos(m.a) * m.d, 0, Math.sin(m.a) * m.d);
    mod.rotation.y = -m.a + Math.PI / 2;
    g.add(mod);
    // 模块与主平台的短连廊
    const cx = Math.cos(m.a), sz = Math.sin(m.a);
    g.add(corridor(cx * 27, sz * 27, cx * (m.d - 3), sz * (m.d - 3), mats, { r: 0.85, y: 2.6 }));
  }

  // ---------- 入口广场（朝向出生点 +z） ----------
  const plaza = new THREE.Group();
  // 台阶
  for (let i = 0; i < 3; i++) {
    const step = box(10 - i * 1.6, 0.5, 2.2, mats.white2);
    step.position.set(0, 0.25 + i * 0.5, 30.5 - i * 1.9);
    plaza.add(step);
  }
  // 门柱 + 标牌
  for (const px of [-4.2, 4.2]) {
    const post = box(0.7, 5.2, 0.7, mats.white);
    post.position.set(px, 2.6, 26);
    plaza.add(post);
  }
  const beam = box(9.6, 0.7, 0.8, mats.white);
  beam.position.set(0, 5.4, 26);
  plaza.add(beam);
  const sign = signBoard('月球前哨城市 · 2126', mats, 7.4, 1.5);
  sign.position.set(0, 4.1, 26.1);
  plaza.add(sign);
  // 欢迎终端（交互点原坐标 0,2,11）
  const termPad = cyl(2.6, 3.0, 0.5, mats.concrete, 24); termPad.position.set(0, 0.25, 11); plaza.add(termPad);
  const termRing = torus(2.3, 0.08, mats.energySoft); termRing.rotation.x = Math.PI / 2; termRing.position.set(0, 0.55, 11); plaza.add(termRing);
  const holoPillar = cyl(0.5, 0.7, 2.2, mats.dark, 12); holoPillar.position.set(0, 1.6, 11); plaza.add(holoPillar);
  const holo = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.0, 1),
    new THREE.MeshBasicMaterial({ color: 0x9fd8ff, wireframe: true, transparent: true, opacity: 0.75 })
  );
  holo.position.set(0, 4.1, 11); plaza.add(holo);
  updatables.push((dt, t) => { holo.rotation.y = t * 0.55; holo.rotation.x = t * 0.28; });
  g.add(plaza);

  // ---------- 中央广场增强：路线分流灯带 + 信息柱 + 服务亭 ----------
  // 四条地面导向灯带（从基座边缘指向四大方向，贴地形、不挡路）
  const guideDirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  for (const [gx, gz] of guideDirs) {
    const strip = box(gx === 0 ? 0.55 : 10, 0.07, gz === 0 ? 0.55 : 10, mats.energySoft);
    strip.position.set(gx * 39, 0.12, gz * 39);
    g.add(strip);
    const nodeTip = sph(0.22, mats.energy, 8, 6);
    nodeTip.position.set(gx * 44.5, 0.25, gz * 44.5);
    g.add(nodeTip);
  }
  // 信息柱 ×2（广场入口两侧）
  for (const px of [-8, 8]) {
    const pillar = box(0.5, 3.2, 0.5, mats.white);
    pillar.position.set(px, 1.6, 35);
    g.add(pillar);
    const screen = box(0.94, 0.7, 0.08, mats.energySoft);
    screen.position.set(px, 2.5, 35);
    screen.rotation.x = -0.2;
    g.add(screen);
  }
  // 服务亭（小型后勤节点）
  const kiosk = box(2.2, 2.0, 1.6, mats.white2);
  kiosk.position.set(-9, 1.0, 34);
  kiosk.rotation.y = 0.35;
  g.add(kiosk);
  const kioskBand = box(2.24, 0.4, 1.64, mats.warmSoft);
  kioskBand.position.set(-9, 1.5, 34);
  kioskBand.rotation.y = 0.35;
  g.add(kioskBand);

  // ---------- 地面三级细节 ----------
  // 灯柱环绕
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + 0.3;
    const pole = lightPole(mats);
    pole.position.set(Math.cos(a) * 29.5, 0, Math.sin(a) * 29.5);
    g.add(pole);
  }
  // 货箱堆 + 通讯杆 + 小天线
  const crates = [[-20, 18], [-22, 15.5], [-19, 14.8], [21, -16], [23, -14]];
  for (const [cx, cz] of crates) {
    const c0 = crate(mats, 0.9 + Math.random() * 0.3);
    c0.position.set(cx, 3.3, cz);
    c0.rotation.y = Math.random() * Math.PI;
    g.add(c0);
  }
  const mast = commMast(13, mats, updatables); mast.position.set(-24, 3.2, -8); g.add(mast);
  const smallDish = dish(2.0, mats, 0.7); smallDish.position.set(18, 3.2, 20); g.add(smallDish);

  enableShadows(g);
  scene.add(g);
  return g;
}
