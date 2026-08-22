// ============================================================
// MoonCitySystems — 城市功能设施（FUNCTION → LOCATION）
// 不是 Landmark，是让城市"运转"的器官：
// 能源分配 / 水处理 / 氧气循环 / 月壤资源 / 充电节点
// 每个设施带实体标牌，功能可读。全部贴合地形，不挡道路。
// ============================================================
import * as THREE from 'three';
import {
  cyl, box, sph, torus, pipeRun, crate, signBoard, enableShadows
} from './MoonBuilders.js';

export function buildCitySystems(ctx) {
  const { scene, heightAt, palette, updatables } = ctx;
  const { mats } = palette;
  const g = new THREE.Group();
  const place = (obj, x, z, ry = 0) => { obj.position.set(x, heightAt(x, z), z); obj.rotation.y = ry; g.add(obj); return obj; };

  // ---------- ENERGY：能源分配站 ×2（太阳能 → 城市的枢纽） ----------
  const substation = () => {
    const s = new THREE.Group();
    const main = box(4.6, 2.2, 2.6, mats.white2); main.position.y = 1.1; s.add(main);
    const band = box(4.66, 0.3, 2.66, mats.energySoft); band.position.y = 1.9; s.add(band);
    for (const ox of [-1.4, 0, 1.4]) {           // 变压器散热片
      const fin = box(0.5, 1.6, 2.7, mats.metal);
      fin.position.set(ox, 1.0, 0);
      s.add(fin);
    }
    const coil = cyl(0.5, 0.6, 1.8, mats.dark, 12); coil.position.set(2.8, 0.9, 0.6); s.add(coil);
    const coilTop = sph(0.3, mats.energySoft, 10, 8); coilTop.position.set(2.8, 2.0, 0.6); s.add(coilTop);
    const post = cyl(0.14, 0.2, 4.6, mats.dark, 8); post.position.set(-2.8, 2.3, -0.6); s.add(post);
    const arm = box(1.8, 0.1, 0.1, mats.metal); arm.position.set(-2.8, 4.4, -0.6); s.add(arm);
    return s;
  };
  place(substation(), 72, 14, 0.3);
  place(substation(), -58, 12, -0.2);
  const esA = signBoard('能源分配 · ENERGY GRID', mats, 5.6, 1.1);
  place(esA, 72, 17.6, 0.3); esA.position.y += 2.6;
  const esB = signBoard('能源分配 · ENERGY GRID', mats, 5.6, 1.1);
  place(esB, -58, 15.6, -0.2); esB.position.y += 2.6;

  // ---------- LIFE SUPPORT：水处理设施（生态舱与居住区之间） ----------
  const water = new THREE.Group();
  for (const [ox, r] of [[-3, 2.0], [3, 2.0]]) {
    const tank = cyl(r, r, 4.6, mats.white, 20); tank.position.set(ox, 2.3, 0); water.add(tank);
    const cap = sph(r, mats.white2, 16, 10); cap.scale.y = 0.5; cap.position.set(ox, 4.6, 0); water.add(cap);
    const wBand = cyl(r + 0.04, r + 0.04, 0.5, mats.energySoft, 20); wBand.position.set(ox, 1.4, 0); water.add(wBand);
  }
  const wProc = box(4.4, 2.4, 2.8, mats.white2); wProc.position.set(0, 1.2, 4); water.add(wProc);
  const wScr = box(1.4, 0.8, 0.08, mats.energySoft); wScr.position.set(-1, 1.8, 5.45); wScr.rotation.x = -0.2; water.add(wScr);
  water.add(pipeRun([[-3, 2.5, 0], [0, 2.8, 2], [0, 2.4, 4]], 0.14, mats));
  water.add(pipeRun([[3, 2.5, 0], [1, 2.8, 2], [0.6, 2.4, 4]], 0.14, mats));
  place(water, 64, -46);
  const ws = signBoard('水处理 · WATER RECYCLING', mats, 6.2, 1.1, '#7fd8ff');
  place(ws, 64, -39.4); ws.position.y += 2.8;

  // ---------- LIFE SUPPORT：氧气循环厂（科研区侧） ----------
  const oxy = new THREE.Group();
  for (const ox of [-3, 3]) {
    const tank = sph(1.8, mats.white2, 18, 12); tank.position.set(ox, 2.4, 0); oxy.add(tank);
    const stand = cyl(1.0, 1.3, 1.0, mats.dark, 12); stand.position.set(ox, 0.5, 0); oxy.add(stand);
  }
  const oProc = box(4.2, 2.6, 2.6, mats.white); oProc.position.set(0, 1.3, 4); oxy.add(oProc);
  // 换气扇（低成本动效）
  const fanFrame = box(1.6, 1.6, 0.3, mats.dark); fanFrame.position.set(0, 1.6, 5.4); oxy.add(fanFrame);
  const fan = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const blade = box(0.16, 1.2, 0.06, mats.metal);
    blade.position.y = 0.5;
    const holder = new THREE.Group(); holder.add(blade); holder.rotation.z = i * Math.PI * 2 / 3;
    fan.add(holder);
  }
  fan.position.set(0, 1.6, 5.6);
  oxy.add(fan);
  updatables.push((dt) => { fan.rotation.z += dt * 2.4; });
  oxy.add(pipeRun([[-3, 2.2, 0], [-1, 2.6, 2], [-0.6, 2.4, 4]], 0.12, mats));
  place(oxy, -64, -40);
  const os = signBoard('氧气循环 · O₂ RECOVERY', mats, 6.2, 1.1, '#7affb0');
  place(os, -64, -33.4); os.position.y += 2.8;

  // ---------- RESOURCE：月壤资源处理场（城市边缘，背景工业） ----------
  const res = new THREE.Group();
  const rProc = box(7, 3.4, 4.6, mats.white2); rProc.position.y = 1.7; res.add(rProc);
  const rBand = box(7.06, 0.4, 4.66, mats.warmSoft); rBand.position.y = 2.6; res.add(rBand);
  // 进料斗 + 传送臂
  const hopper = cyl(2.2, 0.8, 2.6, mats.metal, 4); hopper.rotation.y = Math.PI / 4; hopper.position.set(5.6, 3.2, -1); res.add(hopper);
  const conveyor = box(6.5, 0.5, 1.2, mats.dark); conveyor.position.set(4.2, 2.2, -1); conveyor.rotation.z = 0.28; res.add(conveyor);
  // 月壤堆
  const pile = sph(2.2, mats.concrete, 12, 8); pile.scale.y = 0.45; pile.position.set(7.6, 0.4, 2.6); res.add(pile);
  // 机械臂（缓慢摆动）
  const armBase = cyl(0.5, 0.7, 1.6, mats.dark, 10); armBase.position.set(-4.4, 0.8, 1.5); res.add(armBase);
  const armSeg = new THREE.Group();
  const a1 = box(0.4, 3.6, 0.4, mats.metal); a1.position.y = 1.8; armSeg.add(a1);
  const a2 = box(0.3, 2.6, 0.3, mats.metal); a2.position.set(0, 3.8, 0.9); a2.rotation.x = 0.6; armSeg.add(a2);
  armSeg.position.set(-4.4, 1.6, 1.5);
  res.add(armSeg);
  updatables.push((dt, t) => { armSeg.rotation.y = Math.sin(t * 0.35) * 0.7; });
  place(res, 150, -110, 0.4);
  const rs = signBoard('月壤资源 · REGOLITH', mats, 7.4, 1.1, '#ffd27f');
  place(rs, 150, -103.2); rs.position.y += 3.0;

  // ---------- LOGISTICS：月球车充电节点（后勤区 + 科研区车泊位旁） ----------
  for (const [cx, cz] of [[26, -90], [-136, -52]]) {
    const ch = new THREE.Group();
    const cPost = box(0.5, 2.0, 0.5, mats.dark); cPost.position.y = 1.0; ch.add(cPost);
    const cHead = box(0.7, 0.5, 0.7, mats.white2); cHead.position.y = 2.2; ch.add(cHead);
    const cLight = box(0.74, 0.14, 0.74, mats.energySoft); cLight.position.y = 2.5; ch.add(cLight);
    const cable = pipeRun([[0, 2.1, 0], [0.8, 1.2, 0.6], [1.4, 0.5, 0.9]], 0.05, mats, { mat: mats.darker });
    ch.add(cable);
    place(ch, cx, cz);
  }

  enableShadows(g);
  scene.add(g);
  return g;
}
