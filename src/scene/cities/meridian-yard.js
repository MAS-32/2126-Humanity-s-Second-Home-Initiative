/* 城郊 Meridian Yard
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L1762-1939，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { pBase, rand } from '../../core/random.js';
import { R } from '../../core/renderer.js';
import { tagBuilding } from '../buildings.js';
import { anchorCity, animated, instanced } from '../city-system.js';
import { addGlow, makeLabel, matCore, matDark, matFactory, matMetal, matSolar } from '../materials.js';
import { CITY_SITES, marsGroup, terrainH } from '../terrain.js';

/* ---- 7. Aurelia 城郊带 · Meridian Yard ----
   地表探索近景区：航天 / 能源 / 工业 / 交通 / 生活 / 火星环境 六大系统，
   与首都穹顶（远景地标）构成 近景作业带 → 中景城区 → 远景首都 的真实城市层级 */
const YARD = { id:'yard', radius:3.6, dir:null };
{
  const capDir = CITY_SITES[0].dir;
  const nN = new THREE.Vector3(0,1,0).addScaledVector(capDir, -capDir.y).normalize();   // 切平面「北」
  const nE = new THREE.Vector3().crossVectors(nN, capDir);                              // 切平面「东」
  YARD.dir = capDir.clone().addScaledVector(nE, 0.19).addScaledVector(nN, -0.155).normalize(); // 着陆点外侧

  anchorCity(YARD, YARD.radius, cg=>{
    const matConcrete = new THREE.MeshStandardMaterial({ color:0x8d857c, roughness:0.9, metalness:0.05 });
    const matRoad     = new THREE.MeshStandardMaterial({ color:0x2b3038, roughness:0.95 });
    const matHab      = new THREE.MeshStandardMaterial({ color:0xd9d2c6, roughness:0.6, metalness:0.1, emissive:0x3a3126, emissiveIntensity:0.4 });
    const matWindow   = new THREE.MeshStandardMaterial({ color:0x2a2418, emissive:0xffc978, emissiveIntensity:1.6, roughness:0.4 });

    // —— 交通系统：贴地路网（主干道 + 着陆场支路 + 路沿警示灯）
    const roadMain = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.05, 0.5), matRoad);
    roadMain.position.set(0.1, 0.028, 0.9); cg.add(roadMain);
    const roadPad = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 1.6), matRoad);
    roadPad.position.set(-1.6, 0.028, 1.5); cg.add(roadPad);
    const edgeLights=[];
    for(let i=0;i<9;i++) edgeLights.push({ p:new THREE.Vector3(-2.9+i*0.75, 0.09, 1.22), s:new THREE.Vector3(0.03,0.09,0.03) });
    cg.add(instanced(new THREE.BoxGeometry(1,1,1),
      new THREE.MeshStandardMaterial({ color:0x332a1a, emissive:0xffb050, emissiveIntensity:1.8 }), edgeLights));

    // —— 航天系统：A-3 着陆场 + 货运火箭 + 维修平台 + 运输飞船
    const pad = new THREE.Group();
    const padBase = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.25, 0.12, 28), matConcrete); padBase.position.y=0.06; pad.add(padBase);
    const padRing = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.035, 6, 48).rotateX(Math.PI/2), matCore); padRing.position.y=0.13; pad.add(padRing);
    for(let i=0;i<6;i++){ const a=i/6*Math.PI*2;
      const l = new THREE.Mesh(new THREE.BoxGeometry(0.05,0.05,0.05), matWindow);
      l.position.set(Math.cos(a)*1.05, 0.15, Math.sin(a)*1.05); pad.add(l); }
    pad.position.set(-1.6, 0, 2.3); cg.add(tagBuilding(pad,'landpad')); cg.userData.buildings.push(pad);
    const rocket = new THREE.Group();
    const rBody = new THREE.Mesh(new THREE.CylinderGeometry(0.24,0.26,1.6,14),
      new THREE.MeshStandardMaterial({ color:0xe8e4da, roughness:0.45, metalness:0.3 })); rBody.position.y=0.95; rocket.add(rBody);
    const rNose = new THREE.Mesh(new THREE.ConeGeometry(0.24,0.5,14), matDark); rNose.position.y=2.0; rocket.add(rNose);
    for(let i=0;i<4;i++){ const a=i/4*Math.PI*2+Math.PI/4;
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.04,0.5,6), matDark);
      leg.position.set(Math.cos(a)*0.36, 0.25, Math.sin(a)*0.36);
      leg.rotation.z = Math.cos(a)*0.28; leg.rotation.x = -Math.sin(a)*0.28; rocket.add(leg); }
    rocket.position.set(-1.6, 0.12, 2.3);
    cg.add(tagBuilding(rocket,'crocket')); cg.userData.buildings.push(rocket);
    const gantry = new THREE.Group();
    for(const s of [-1,1]){
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.09,1.5,0.09), matMetal);
      post.position.set(s*0.5, 0.75, 0); gantry.add(post); }
    const beam = new THREE.Mesh(new THREE.BoxGeometry(1.15,0.09,0.09), matFactory); beam.position.y=1.5; gantry.add(beam);
    const deck = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.05,0.4), matDark); deck.position.set(0,1.05,0.2); gantry.add(deck);
    const gArm = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.05,0.05), matFactory); gArm.position.set(-0.35,1.32,0); gantry.add(gArm);
    gantry.position.set(-0.55, 0, 2.6); gantry.rotation.y = 0.4;
    cg.add(tagBuilding(gantry,'mgantry')); cg.userData.buildings.push(gantry);
    const shuttlePad = new THREE.Group();
    const hull = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.7, 4, 10).rotateZ(Math.PI/2), matMetal); hull.position.y=0.32; shuttlePad.add(hull);
    const wing = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.03,0.55), matDark); wing.position.y=0.3; shuttlePad.add(wing);
    for(const s of [-1,1]){ const cradle = new THREE.Mesh(new THREE.BoxGeometry(0.08,0.2,0.3), matDark); cradle.position.set(s*0.3, 0.1, 0); shuttlePad.add(cradle); }
    shuttlePad.position.set(-2.6, 0, -0.7); shuttlePad.rotation.y = -0.5;
    cg.add(tagBuilding(shuttlePad,'cship')); cg.userData.buildings.push(shuttlePad);

    // —— 能源系统：光伏阵列 + 储能罐群 + 输能管线
    const pn=[], pp=[];
    for(let r=0;r<3;r++) for(let c=0;c<6;c++){
      pn.push({ p:new THREE.Vector3(1.4+c*0.5, 0.32, -2.4-r*0.45), s:new THREE.Vector3(0.42,0.04,0.32) });
      pp.push({ p:new THREE.Vector3(1.4+c*0.5, 0.15, -2.4-r*0.45), s:new THREE.Vector3(0.04,0.3,0.04) });
    }
    const solar2 = instanced(new THREE.BoxGeometry(1,1,1), matSolar, pn);
    cg.add(tagBuilding(solar2,'solarfarm')); cg.userData.buildings.push(solar2);
    cg.add(instanced(new THREE.CylinderGeometry(1,1,1,6), matDark, pp));
    const bat = new THREE.Group();
    for(let i=0;i<5;i++){
      const t2 = new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.16,0.6,10), matMetal);
      t2.position.set(i*0.42-0.84, 0.3, 0); bat.add(t2);
      const tl = new THREE.Mesh(new THREE.BoxGeometry(0.08,0.05,0.02), matWindow);
      tl.position.set(i*0.42-0.84, 0.42, 0.17); bat.add(tl); }
    bat.position.set(2.3, 0, 0.3); cg.add(tagBuilding(bat,'battery')); cg.userData.buildings.push(bat);
    const pline = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,3.05,6), matMetal);
    pline.position.set(1.15, 0.12, -0.7);
    pline.rotation.z = Math.PI/2; pline.rotation.y = -Math.atan2(-2.0, -2.3);
    cg.add(pline);

    // —— 工业系统：装配车间 + 作业机械臂 + 集装箱堆场
    const fab = new THREE.Group();
    const fHall = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.8, 1.1), matFactory); fHall.position.y=0.4; fab.add(fHall);
    const fRoof = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.08, 1.2), matDark); fRoof.position.y=0.84; fab.add(fRoof);
    for(let i=0;i<3;i++){
      const door = new THREE.Mesh(new THREE.BoxGeometry(0.4,0.5,0.03), matDark);
      door.position.set(-0.6+i*0.6, 0.25, 0.57); fab.add(door); }
    fab.position.set(0.0, 0, -1.8); cg.add(tagBuilding(fab,'fabhall')); cg.userData.buildings.push(fab);
    for(const mx of [-0.5, 0.5]){
      const rb = new THREE.Group();
      const rbase = new THREE.Mesh(new THREE.CylinderGeometry(0.09,0.12,0.25,8), matDark); rbase.position.y=0.12; rb.add(rbase);
      const arm1 = new THREE.Mesh(new THREE.BoxGeometry(0.07,0.55,0.07), matMetal); arm1.position.set(0,0.5,0); arm1.rotation.z=0.35; rb.add(arm1);
      const arm2 = new THREE.Mesh(new THREE.BoxGeometry(0.05,0.4,0.05), matFactory); arm2.position.set(0.16,0.78,0); arm2.rotation.z=-0.5; rb.add(arm2);
      rb.position.set(mx, 0, -1.1); cg.add(rb); }
    const ctn=[];
    for(let i=0;i<10;i++) ctn.push({ p:new THREE.Vector3(-1.5+(i%5)*0.4, 0.16+Math.floor(i/5)*0.26, -2.6),
      s:new THREE.Vector3(0.34,0.22,0.2), ry:(rand()-0.5)*0.1 });
    cg.add(instanced(new THREE.BoxGeometry(1,1,1), matFactory, ctn));

    // —— 城市生活：居住舱排 + 中央广场 + 行人
    for(let i=0;i<4;i++){
      const hab = new THREE.Group();
      const mod = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 0.5, 4, 10).rotateZ(Math.PI/2), matHab); mod.position.y=0.24; hab.add(mod);
      for(let w=0;w<3;w++){ const win = new THREE.Mesh(new THREE.BoxGeometry(0.06,0.06,0.02), matWindow);
        win.position.set(-0.2+w*0.2, 0.3, 0.24); hab.add(win); }
      hab.position.set(1.5+i*0.7, 0, 1.9); hab.rotation.y = -0.35;
      cg.add(tagBuilding(hab,'habmod')); cg.userData.buildings.push(hab); }
    const plaza = new THREE.Group();
    const pBase = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.9, 0.07, 24), matConcrete); pBase.position.y=0.035; plaza.add(pBase);
    const pCol = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.07,0.9,8), matMetal); pCol.position.y=0.45; plaza.add(pCol);
    const pLamp = new THREE.Mesh(new THREE.SphereGeometry(0.09,10,8), matCore); pLamp.position.y=0.95; plaza.add(pLamp);
    for(let i=0;i<4;i++){ const a=i/4*Math.PI*2+0.4;
      const bench = new THREE.Mesh(new THREE.BoxGeometry(0.3,0.06,0.12), matDark);
      bench.position.set(Math.cos(a)*0.55, 0.1, Math.sin(a)*0.55); bench.rotation.y=-a; plaza.add(bench); }
    plaza.position.set(0.5, 0, 1.6); cg.add(tagBuilding(plaza,'plaza')); cg.userData.buildings.push(plaza);
    addGlow(cg, new THREE.Vector3(0.5, 0.95, 1.6), 0x9fe8ff, 0.9);
    for(let i=0;i<3;i++){
      const person = new THREE.Group();
      const pBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.03,0.07,3,6), matHab); pBody.position.y=-0.22; person.add(pBody);
      cg.add(person);
      animated.walkers.push({ mesh:person, cx:0.5, cz:1.6, r:0.28+i*0.14, phase:rand()*6.28, speed:0.22+rand()*0.18 });
    }

    // —— 交通系统：磁悬浮接驳线（高架 + 运行中的车厢）+ 自动巡逻车
    const ml = new THREE.Group();
    for(const sz of [-1,1]){
      const tr = new THREE.Mesh(new THREE.BoxGeometry(6.4,0.06,0.07), matMetal);
      tr.position.set(0, 0.6, sz*0.13); ml.add(tr); }
    for(let i=0;i<5;i++){
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.045,0.6,6), matDark);
      post.position.set(-3+i*1.5, 0.3, 0); ml.add(post); }
    const mlCar = new THREE.Mesh(new THREE.CapsuleGeometry(0.08,0.42,4,8).rotateZ(Math.PI/2),
      new THREE.MeshStandardMaterial({ color:0xe8edf2, roughness:0.3, metalness:0.5, emissive:0x66d9ff, emissiveIntensity:0.4 }));
    mlCar.position.y=0.72; ml.add(mlCar);
    animated.pods.push({ mesh:mlCar, kind:'line', x0:-3, x1:3, y:0.72, speed:0.5, t:rand() });
    ml.position.set(0.1, 0, -0.6); cg.add(tagBuilding(ml,'maglev')); cg.userData.buildings.push(ml);
    for(const [rcx, rcz, rr] of [[-1.2, 1.2, 0.6],[0.9, -0.2, 0.8]]){
      const rover = new THREE.Group();
      const rvBase = new THREE.Mesh(new THREE.BoxGeometry(0.16,0.08,0.12), matDark); rvBase.position.y=-0.26; rover.add(rvBase);
      const rvTop = new THREE.Mesh(new THREE.BoxGeometry(0.1,0.04,0.09), matFactory); rvTop.position.y=-0.2; rover.add(rvTop);
      const rvEye = new THREE.Mesh(new THREE.SphereGeometry(0.02,6,6), matCore); rvEye.position.set(0.08,-0.24,0); rover.add(rvEye);
      cg.add(rover);
      animated.walkers.push({ mesh:rover, cx:rcx, cz:rcz, r:rr, phase:rand()*6.28, speed:0.4+rand()*0.2 });
    }

    // —— 火星环境：散布岩石（城郊未整平的自然地貌）
    const rocks=[];
    for(let i=0;i<22;i++){
      const a=rand()*Math.PI*2, rr=2.2+rand()*2.2;
      rocks.push({ p:new THREE.Vector3(Math.cos(a)*rr, 0.05+rand()*0.06, Math.sin(a)*rr),
        s:new THREE.Vector3(0.1+rand()*0.3, 0.08+rand()*0.2, 0.1+rand()*0.3), ry:rand()*3 });
    }
    cg.add(instanced(new THREE.DodecahedronGeometry(1,0),
      new THREE.MeshStandardMaterial({ color:0x7c4230, roughness:1 }), rocks));

    // —— 中文标识（人类活动痕迹）
    const sign1 = makeLabel('A-3 着陆场', 2.2); sign1.position.set(-1.6, 1.2, 3.4); cg.add(sign1);
    const sign2 = makeLabel('装配车间', 2.2);   sign2.position.set(0.0, 1.4, -1.8);  cg.add(sign2);
    const sign3 = makeLabel('中央广场', 2.2);   sign3.position.set(0.5, 1.6, 1.6);   cg.add(sign3);
    const sign4 = makeLabel('储能阵列', 2.2);   sign4.position.set(2.3, 1.1, 0.3);   cg.add(sign4);
    const label = makeLabel('Aurelia 城郊带 · Meridian Yard', 6); label.position.set(0, 3.6, 0); cg.add(label);
  });
}

// 输水管道：Glacies → Hephaestus
{
  const a = CITY_SITES[3].dir, b = CITY_SITES[1].dir;
  const pts = [];
  for(let i=0;i<=32;i++){
    const t = i/32;
    const dir = a.clone().lerp(b, t).normalize();
    pts.push(dir.clone().multiplyScalar(R + terrainH(dir) + 0.35));
  }
  marsGroup.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 64, 0.12, 6),
    new THREE.MeshStandardMaterial({ color:0x7fa8bc, roughness:0.4, metalness:0.7, emissive:0x1c4e68, emissiveIntensity:0.5 })));
}

export { YARD };
