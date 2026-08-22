// ============================================================
// RocketPort — 火箭港 / 深空发射区（全图最强 Landmark）
// 大型深空运输舰（主船体+双助推+尾翼+引擎组）+ 双子塔架
// + 环形发射台 + 燃料区 + 服务建筑 + 远景太空电梯剪影
// 交互点 (-4,2,-168) 保留：发射控制终端
// ============================================================
import * as THREE from 'three';
import {
  cyl, box, sph, torus, latticeTower, pipeRun, crate, signBoard, enableShadows,
  towerModule, rover, vtol
} from './MoonBuilders.js';

export function buildRocketPort(ctx) {
  const { scene, heightAt, palette, updatables } = ctx;
  const { mats, tex } = palette;
  const CX = 0, CZ = -165;
  const g = new THREE.Group();
  g.position.set(CX, heightAt(CX, CZ), CZ);

  // ---------- 环形发射台 ----------
  const padBase = cyl(24, 26, 2.0, mats.concrete, 48); padBase.position.y = 1.0; g.add(padBase);
  const padTop = new THREE.Mesh(new THREE.CircleGeometry(23.4, 48), new THREE.MeshStandardMaterial({
    map: tex.padRocket, roughness: 0.85, metalness: 0.15
  }));
  padTop.rotation.x = -Math.PI / 2; padTop.position.y = 2.02; padTop.receiveShadow = true; g.add(padTop);
  const padRing = torus(23.6, 0.14, mats.energySoft); padRing.rotation.x = Math.PI / 2; padRing.position.y = 2.1; g.add(padRing);
  // 火焰导流槽
  const trench = box(14, 1.6, 3.2, mats.darker); trench.position.set(0, 1.4, 0); g.add(trench);

  // ---------- 深空运输舰（主角） ----------
  const ship = new THREE.Group();
  // 主船体
  const body = cyl(2.5, 2.9, 30, mats.white, 28); body.position.y = 21; ship.add(body);
  // 鼻锥（LatheGeometry 光滑卵形：底部接船体 → 顶部收尖）
  const nosePts = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    nosePts.push(new THREE.Vector2(Math.cos(t * Math.PI / 2) * 2.5, 36 + t * 6.5));
  }
  const nose = new THREE.Mesh(new THREE.LatheGeometry(nosePts, 24), mats.white);
  ship.add(nose);
  // 驾驶舱窗
  for (let i = 0; i < 3; i++) {
    const win = box(0.7, 0.5, 0.12, mats.darker);
    const a = (i - 1) * 0.5;
    win.position.set(Math.sin(a) * 2.45, 33.5, Math.cos(a) * 2.45);
    win.rotation.y = a;
    ship.add(win);
  }
  // 舷窗带
  const port = torus(2.56, 0.1, mats.energySoft); port.rotation.x = Math.PI / 2; port.position.y = 29; ship.add(port);
  // 尾部发动机舱
  const tail = cyl(3.1, 3.4, 4, mats.dark, 24); tail.position.y = 4; ship.add(tail);
  // 引擎喷口 ×3 + 柔和内辉
  const engineGlows = [];
  const engineFlames = [];   // 发射尾焰（平时隐藏，发射时由 moon-base 驱动 scale/opacity）
  const flameMat = () => new THREE.MeshBasicMaterial({
    color: 0xffa050, transparent: true, opacity: 0.0,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false
  });
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const noz = cyl(0.5, 0.95, 1.8, mats.darker, 14);
    noz.position.set(Math.cos(a) * 1.5, 1.5, Math.sin(a) * 1.5);
    ship.add(noz);
    const glow = cyl(0.42, 0.42, 0.08, mats.energy.clone(), 12);
    glow.position.set(Math.cos(a) * 1.5, 0.62, Math.sin(a) * 1.5);
    ship.add(glow);
    engineGlows.push(glow);
    // 尾焰：内芯（亮白橙）+ 外焰（橙红），锥体朝下
    const fx = Math.cos(a) * 1.5, fz = Math.sin(a) * 1.5;
    const core = new THREE.Mesh(new THREE.ConeGeometry(0.34, 3.2, 12), flameMat());
    core.rotation.x = Math.PI; core.position.set(fx, -1.0, fz); core.scale.set(1, 0.001, 1);
    ship.add(core);
    const plume = new THREE.Mesh(new THREE.ConeGeometry(0.62, 5.2, 12), flameMat());
    plume.material.color.set(0xff6a28); plume.rotation.x = Math.PI; plume.position.set(fx, -1.8, fz); plume.scale.set(1, 0.001, 1);
    ship.add(plume);
    engineFlames.push(core, plume);
  }
  // 双助推器 + 连接结构
  for (const sx of [-4.4, 4.4]) {
    const booster = cyl(1.15, 1.3, 22, mats.white2, 18);
    booster.position.set(sx, 15, 0);
    ship.add(booster);
    const bNose = sph(1.15, mats.white2, 16, 10); bNose.scale.y = 1.6; bNose.position.set(sx, 26.6, 0); ship.add(bNose);
    const bTail = cyl(1.3, 1.5, 2, mats.dark, 16); bTail.position.set(sx, 3, 0); ship.add(bTail);
    for (const sy of [9, 20]) {
      const strut = box(Math.abs(sx) - 2.4, 0.5, 0.9, mats.dark);
      strut.position.set(sx / 2, sy, 0);
      ship.add(strut);
    }
  }
  // 三角翼 + 垂尾
  for (const sx of [-1, 1]) {
    const wing = box(4.6, 0.28, 3.4, mats.white);
    wing.position.set(sx * 3.6, 7.5, -0.4);
    wing.rotation.z = sx * -0.16;
    ship.add(wing);
  }
  const fin = box(0.3, 5.2, 2.6, mats.white2);
  fin.position.set(0, 11, -2.9);
  fin.rotation.x = 0.25;
  ship.add(fin);
  // 地面支撑臂
  for (const a of [0.6, 2.2, 4.0, 5.4]) {
    const clamp = box(1.2, 3.2, 1.2, mats.dark);
    clamp.position.set(Math.cos(a) * 4.2, 3.4, Math.sin(a) * 4.2);
    g.add(clamp);
  }
  ship.position.y = 2.0;
  g.add(ship);
  // 引擎呼吸微光
  updatables.push((dt, t) => {
    for (const gl of engineGlows) gl.material.emissiveIntensity = 1.1 + Math.sin(t * 1.8) * 0.45;
  });

  // ---------- 双子塔架 ----------
  const towerL = latticeTower(44, 4.4, mats, { decks: [12, 24, 36], topBox: true });
  towerL.position.set(-10, 2.0, -3);
  g.add(towerL);
  const towerR = latticeTower(40, 4.0, mats, { decks: [11, 22, 33], topBox: true });
  towerR.position.set(10, 2.0, -3);
  g.add(towerR);
  // 塔顶航空障碍灯（缓慢闪烁，低成本动效）
  const towerBeacons = [];
  for (const [tx, ty] of [[-10, 47.6], [10, 43.6]]) {
    const bc = sph(0.32, new THREE.MeshStandardMaterial({ color: 0x1a0d08, emissive: 0xffb35e, emissiveIntensity: 1.2 }), 10, 8);
    bc.position.set(tx, ty, -3);
    g.add(bc);
    towerBeacons.push(bc);
  }
  updatables.push((dt, t) => {
    towerBeacons.forEach((bc, i) => { bc.material.emissiveIntensity = 0.4 + Math.max(0, Math.sin(t * 1.4 + i * 2.1)) * 1.6; });
  });
  // 服务臂（塔 → 船体）
  for (const [tx, hy] of [[-10, 24], [-10, 33], [10, 22]]) {
    const dir = tx < 0 ? 1 : -1;
    const arm = box(Math.abs(tx) - 2.2, 0.5, 1.1, mats.metal);
    arm.position.set(tx + dir * (Math.abs(tx) - 2.2) / 2, hy, -3);
    g.add(arm);
    const armTip = box(0.8, 1.6, 1.4, mats.dark);
    armTip.position.set(dir * 2.6, hy, -3);
    g.add(armTip);
  }
  // 塔顶吊车
  const craneArm = box(7, 0.4, 0.4, mats.metal);
  craneArm.position.set(10 + 2.5, 42.2, -3);
  g.add(craneArm);
  const craneCable = cyl(0.04, 0.04, 8, mats.darker, 6);
  craneCable.position.set(10 + 5.6, 38, -3);
  g.add(craneCable);

  // ---------- 燃料区 ----------
  for (let i = 0; i < 3; i++) {
    const tank = sph(3.0, mats.white2, 20, 14);
    tank.position.set(18 + (i % 2) * 7, 3.4 + Math.floor(i / 2) * 0, 8 - i * 6);
    g.add(tank);
    const stand = cyl(1.8, 2.2, 1.2, mats.dark, 12);
    stand.position.set(tank.position.x, 0.6, tank.position.z);
    g.add(stand);
  }
  g.add(pipeRun([[18, 2, 8], [12, 1.6, 4], [4, 2.2, 0]], 0.28, mats));
  g.add(pipeRun([[18, 2, 2], [10, 1.4, -2], [3.5, 2.0, -1]], 0.22, mats));

  // ---------- 服务建筑 + 货场 ----------
  const svc1 = box(8, 3.6, 5, mats.white); svc1.position.set(-18, 3.8, 10); g.add(svc1);
  const svc1Win = box(8.06, 0.9, 5.06, mats.windowBand(6)); svc1Win.position.set(-18, 4.4, 10); g.add(svc1Win);
  const svc2 = box(6, 3, 4.4, mats.white2); svc2.position.set(16, 3.5, -14); g.add(svc2);
  const svc2Win = box(6.06, 0.7, 4.46, mats.windowBand(5)); svc2Win.position.set(16, 4.0, -14); g.add(svc2Win);
  for (const [cx, cz, ry] of [[-16, 20, 0.3], [-13, 22, 1.2], [-19, 23, 0.8], [20, 18, 0.1]]) {
    const c0 = crate(mats, 1.0);
    c0.position.set(cx, 2.0, cz);
    c0.rotation.y = ry;
    g.add(c0);
  }
  // 发射控制楼标牌 + 楼顶天线
  const lcSign = signBoard('发射控制 · LAUNCH CONTROL', mats, 5.6, 1.1);
  lcSign.position.set(-18, 6.4, 12.6);
  g.add(lcSign);
  const lcMast = cyl(0.08, 0.12, 4.5, mats.metal, 8);
  lcMast.position.set(-18, 8.2, 10);
  g.add(lcMast);

  // ---------- Spaceport 配套（货柜区 / 维修棚 / 设备塔 / 着落坪） ----------
  // 集装箱排（成组码放，非随机散落）
  for (let i = 0; i < 4; i++) {
    const cont = box(3.4, 1.7, 1.7, i % 2 ? mats.metal : mats.white2);
    cont.position.set(12 + i * 4, 2.85, 20 + i * 2);
    cont.rotation.y = 0.45;
    g.add(cont);
    const contStripe = box(3.44, 0.2, 1.74, mats.dark);
    contStripe.position.copy(cont.position);
    contStripe.rotation.y = 0.45;
    g.add(contStripe);
  }
  // 维修棚（开敞框架：四柱 + 顶棚 + 侧灯）
  const bay = new THREE.Group();
  for (const [px, pz] of [[-4, -3], [4, -3], [-4, 3], [4, 3]]) {
    const post = box(0.5, 5.4, 0.5, mats.dark);
    post.position.set(px, 2.7, pz);
    bay.add(post);
  }
  const roof = box(9.4, 0.4, 7.4, mats.metal);
  roof.position.y = 5.6;
  bay.add(roof);
  const bayLight = box(8.6, 0.1, 0.5, mats.warmSoft);
  bayLight.position.y = 5.35;
  bay.add(bayLight);
  const benchB = box(3.0, 1.0, 0.9, mats.white2);
  benchB.position.set(-2, 0.5, -2.2);
  bay.add(benchB);
  bay.position.set(-26, 2.0, -8);
  g.add(bay);
  // 设备塔
  const eqTower = towerModule(2.2, 7, mats);
  eqTower.position.set(-24, 2.0, 4);
  g.add(eqTower);
  // 小着落坪 + 停放运输机（发射台东侧）
  const lp = new THREE.Group();
  const lpBase = cyl(5.5, 6.0, 0.5, mats.concrete, 28);
  lpBase.position.y = 0.25; lp.add(lpBase);
  const lpRing = torus(5.2, 0.08, mats.energySoft);
  lpRing.rotation.x = Math.PI / 2; lpRing.position.y = 0.52; lp.add(lpRing);
  const parked = vtol(mats);
  parked.position.set(0, 0.5, 0);
  parked.rotation.y = 0.9;
  lp.add(parked);
  lp.position.set(28, 0, 16);
  g.add(lp);
  // 运输车停靠
  const trv = rover(mats);
  trv.position.set(20, 2.0, -6);
  trv.rotation.y = -0.9;
  g.add(trv);

  // ---------- 泛光灯柱 ----------
  for (const a of [0.5, 2.1, 3.7, 5.3]) {
    const pole = cyl(0.14, 0.2, 9, mats.dark, 8);
    pole.position.set(Math.cos(a) * 27, 4.5, Math.sin(a) * 27);
    g.add(pole);
    const head = box(1.4, 0.3, 0.5, mats.warmSoft);
    head.position.set(Math.cos(a) * 27, 9.1, Math.sin(a) * 27);
    head.rotation.y = -a;
    g.add(head);
  }
  // 发射场冷光
  const padLight = new THREE.PointLight(0xa8ccff, 0.85, 60, 1.8);
  padLight.position.set(0, 16, 8);
  g.add(padLight);

  // ---------- 发射控制终端（交互点原坐标 → 局部 (-4,?,-3)） ----------
  const consoleBase = box(2.6, 1.3, 1.0, mats.dark); consoleBase.position.set(-4, 0.65, -3); g.add(consoleBase);
  const consoleScreen = box(2.2, 1.2, 0.08, mats.energySoft); consoleScreen.position.set(-4, 1.9, -3.2); consoleScreen.rotation.x = -0.3; g.add(consoleScreen);
  const holoRing = torus(1.1, 0.06, mats.energy); holoRing.position.set(-4, 3.4, -3); g.add(holoRing);
  updatables.push((dt, t) => { holoRing.rotation.y = t * 0.8; holoRing.position.y = 3.4 + Math.sin(t * 1.4) * 0.15; });
  // 小型"下一站：火星"指示（克制的叙事元素）
  const marsSign = signBoard('下一站 · 火星 MARS', mats, 5.2, 1.1, '#ffd27f');
  marsSign.position.set(-4, 5.2, -3);
  g.add(marsSign);

  // ---------- 远景：太空电梯剪影（背景地标） ----------
  const elevator = new THREE.Group();
  const tether = cyl(0.35, 0.5, 170, mats.metal, 8); tether.position.y = 85; elevator.add(tether);
  const eTop = sph(2.4, mats.dark, 12, 8); eTop.position.y = 172; elevator.add(eTop);
  const eBase = cyl(4, 5, 3, mats.concrete, 12); eBase.position.y = 1.5; elevator.add(eBase);
  const eLights = [];
  for (let i = 1; i <= 4; i++) {
    const l = sph(0.5, mats.energy.clone(), 8, 6);
    l.position.y = i * 38;
    elevator.add(l); eLights.push({ l, ph: i * 1.7 });
  }
  updatables.push((dt, t) => {
    for (const { l, ph } of eLights) l.material.emissiveIntensity = 0.6 + Math.max(0, Math.sin(t * 1.6 + ph)) * 1.4;
  });
  elevator.position.set(-70, 0, -185);
  g.add(elevator);

  enableShadows(g);
  scene.add(g);
  // 暴露发射所需引用：ship（运输舰本体，局部 y 起升）、engineGlows（引擎内辉）、
  // engineFlames（尾焰锥体对）、padTopY（台面局部高，供烟雾锚定）
  return { group: g, ship, engineGlows, engineFlames, padTopY: 2.0 };
}
