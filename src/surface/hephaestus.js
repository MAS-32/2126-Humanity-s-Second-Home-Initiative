/* 地表城市 HEPHAESTUS
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L4081-4311，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { rand } from '../core/random.js';
import { xdSay } from '../interaction/companion.js';
import { showToast } from '../interaction/ice-view.js';
import { instanced } from '../scene/city-system.js';
import { addGlow, matCore, matDark, matFactory, matMetal, texGrain } from '../scene/materials.js';
import { addInteract, addSurfaceNPC, completeTask, makeSurfaceScene, sBox, sCyl, sGround, sLamp, sRoad, sSign, sStrip, sTask } from './common.js';

/* ==================== 城市 03 · HEPHAESTUS 工业城（INDUSTRIAL CIVILIZATION） ==================== */
function buildHephaestus(city){
  const sc = city.scene = makeSurfaceScene(0x18100a, 0x54341e, 70, 360, 0xffd8b0);
  city.bounds = 112;
  city.spawn = { x:0, z:-88, yaw:0 };
  city.intro = [
    'Hephaestus——火星的锻造炉。',
    '看见那条产线了吗？红土进去，钢和燃料出来。',
    '来，亲手启动一次：原料 → 处理 → 输出。跟着光柱。',
  ];
  // 向导地标：靠近自动解说一句
  city.guide = [
    { x:0,  z:12, r:14, text:'聚变能源塔——这座城的心脏，也是半个火星的电源。' },
    { x:48, z:20, r:14, text:'星舰总装厂房。下一艘回地球的船，就在这里造。' },
    { x:34, z:52, r:13, text:'液氢储罐区。火星的工业血液，全存在这里。' },
  ];
  city.idleHint = '能源塔在东边，总装厂房在更东边。跟着光柱走，小心脚下的传送带。';
  const col = city.colliders;

  // 地面：工业平台 + 道路
  city.groundMesh = sGround(sc, 128, 0x4a3424);
  const plat = new THREE.Mesh(new THREE.CircleGeometry(104, 56).rotateX(-Math.PI/2),
    new THREE.MeshStandardMaterial({ color:0x2e2c2a, roughness:0.8, metalness:0.2, bumpMap:texGrain, bumpScale:0.02 }));
  plat.position.y = 0.02; sc.add(plat);
  sRoad(sc, 0, -40, 10, 100); sRoad(sc, 0, 10, 130, 8);
  sStrip(sc, 0, -40, 0.5, 100, 0, 0xff8c3a, 0.6); sStrip(sc, 0, 10, 130, 0.4, 0, 0xff8c3a, 0.5);

  // —— 聚变能源塔（城市心脏） ——
  const et = new THREE.Group();
  const etBody = new THREE.Mesh(new THREE.CylinderGeometry(3, 4.6, 30, 12), matMetal); etBody.position.y=15; et.add(etBody);
  const etCore = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 31, 10), matCore); etCore.position.y=15.5; et.add(etCore);
  const etCap = new THREE.Mesh(new THREE.TorusGeometry(3.8, 0.6, 8, 28).rotateX(Math.PI/2), matFactory); etCap.position.y=30.5; et.add(etCap);
  const etGlow = addGlow(et, new THREE.Vector3(0, 31, 0), 0x7fe7ff, 10);
  et.position.set(0, 0, 12); sc.add(et); col.push({ x:0, z:12, r:5.2, h:32 });
  sSign(sc, '聚变能源塔', 0, 35, 12, 6);
  city.ticks.push((dt,t)=>{ const s = 9 + Math.sin(t*(city.coreDone?5:2.2))*1.6; etGlow.scale.set(s,s,1); });

  // —— 原料输入站（交互 1） ——
  const hopper = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 3.2, 5, 4), matFactory);
  hopper.position.set(-46, 6.5, -20); hopper.rotation.y = Math.PI/4; sc.add(hopper);
  const hopperLegs = new THREE.Mesh(new THREE.BoxGeometry(4.4, 4, 4.4), matDark);
  hopperLegs.position.set(-46, 2, -20); sc.add(hopperLegs);
  col.push({ x:-46, z:-20, r:3.4, h:9 });
  const orePiles = [];
  for(let i=0;i<14;i++){ const a=rand()*Math.PI*2, rr=3.5+rand()*3;
    orePiles.push({ p:new THREE.Vector3(-46+Math.cos(a)*rr, 0.3+rand()*0.4, -26+Math.sin(a)*rr),
      s:new THREE.Vector3(0.6+rand()*0.8, 0.5+rand()*0.6, 0.6+rand()*0.8), ry:rand()*3 });
  }
  sc.add(instanced(new THREE.DodecahedronGeometry(1,0),
    new THREE.MeshStandardMaterial({ color:0x8a4a30, roughness:1 }), orePiles));
  const hopperLamp = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.3,0.5),
    new THREE.MeshStandardMaterial({ color:0x1a0d08, emissive:0xff8c3a, emissiveIntensity:0.6 }));
  hopperLamp.position.set(-46, 9.4, -20); sc.add(hopperLamp);
  sSign(sc, '原料输入站', -46, 11.5, -20, 4);

  // —— 传送带：原料 → 处理 ——
  const beltPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-43, 1.1, -18), new THREE.Vector3(-24, 1.1, -12), new THREE.Vector3(-6, 1.1, -6),
  ]);
  sc.add(new THREE.Mesh(new THREE.TubeGeometry(beltPath, 24, 0.7, 8), matDark));
  const oreBoxes = [];
  for(let i=0;i<6;i++){
    const ob = new THREE.Mesh(new THREE.BoxGeometry(0.8,0.6,0.8),
      new THREE.MeshStandardMaterial({ color:0x9a5a38, roughness:0.9 }));
    sc.add(ob); oreBoxes.push({ mesh:ob, t:i/6 });
  }
  let conveyorOn = false;
  city.ticks.push((dt)=>{
    if(!conveyorOn) return;
    for(const ob of oreBoxes){
      ob.t = (ob.t + dt*0.06) % 1;
      ob.mesh.position.copy(beltPath.getPoint(ob.t));
      ob.mesh.position.y += 0.75;
    }
  });

  // —— 处理中心 / 冶炼炉（交互 2） ——
  const smelter = sBox(sc, col, 12, 10, 9, matFactory, 2, -6, 0.1);
  const smeltGlowMat = new THREE.MeshStandardMaterial({ color:0x2a1408, emissive:0xff6a20, emissiveIntensity:0.7 });
  const smeltMouth = new THREE.Mesh(new THREE.PlaneGeometry(5, 3), smeltGlowMat);
  smeltMouth.position.set(2, 2.2, -10.56); smeltMouth.rotation.y = Math.PI; sc.add(smeltMouth);
  const chimney = sCyl(sc, col, 1.2, 16, matDark, 7, -3, { rTop:0.8 });
  const chimGlow = addGlow(sc, new THREE.Vector3(7, 16.5, -3), 0xff7040, 2.5);
  city.ticks.push((dt,t)=>{ const s = 2.2+Math.sin(t*7)*0.5; chimGlow.scale.set(s,s,1); });
  for(let i=0;i<4;i++){
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.35,0.35,10,8), matMetal);
    pipe.position.set(-4+i*3.4, 5.5, -0.5); pipe.rotation.x = Math.PI/2; sc.add(pipe);
  }
  sSign(sc, '资源处理中心', 2, 12.5, -6, 4.5);
  // 处理控制台
  const consoleB = sBox(sc, col, 2, 1.4, 1, matDark, 8, -12, 0.3);
  const consoleScr = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.8),
    new THREE.MeshStandardMaterial({ color:0x201008, emissive:0xff8c3a, emissiveIntensity:1.0 }));
  consoleScr.position.set(8, 1.35, -12.6); consoleScr.rotation.y = Math.PI+0.3; sc.add(consoleScr);

  // —— 输出平台（交互 3）+ 总装厂房 + 火箭 ——
  const outPlat = new THREE.Mesh(new THREE.CylinderGeometry(4, 4.4, 0.5, 20), matMetal);
  outPlat.position.set(30, 0.25, 2); sc.add(outPlat);
  sSign(sc, '能源输出平台', 30, 4.5, 2, 4);
  const hangar = new THREE.Mesh(new THREE.CylinderGeometry(7,7,16,20,1,false,0,Math.PI).rotateZ(Math.PI/2).rotateY(Math.PI/2), matDark);
  hangar.position.set(48, 0, 20); sc.add(hangar); col.push({ x:48, z:20, r:8.5, h:7 });
  const rk = new THREE.Group();
  const rkBody = new THREE.Mesh(new THREE.CylinderGeometry(1.6,1.6,12,14),
    new THREE.MeshStandardMaterial({ color:0xf2f4f6, roughness:0.35, metalness:0.4 })); rkBody.position.y=6; rk.add(rkBody);
  const rkNose = new THREE.Mesh(new THREE.ConeGeometry(1.6,3.5,14), matDark); rkNose.position.y=13.8; rk.add(rkNose);
  for(let i=0;i<4;i++){ const a=i/4*Math.PI*2+Math.PI/4;
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.28,3.4,6), matDark);
    leg.position.set(Math.cos(a)*2.4, 1.7, Math.sin(a)*2.4);
    leg.rotation.z = Math.cos(a)*0.3; leg.rotation.x = -Math.sin(a)*0.3; rk.add(leg);
  }
  const engineGlow = addGlow(rk, new THREE.Vector3(0, -0.5, 0), 0x7fc8ff, 0.01);
  rk.position.set(48, 0, 8); sc.add(rk); col.push({ x:48, z:8, r:3, h:15 });
  sSign(sc, '星舰总装厂房', 48, 12, 20, 5);

  // —— 燃料储罐区 + 管廊 ——
  for(let i=0;i<6;i++){
    const a = 0.4 + i/6*Math.PI*1.2;
    const tx = 34+Math.cos(a)*16, tz = 52+Math.sin(a)*12;
    const tk = new THREE.Group();
    const sph = new THREE.Mesh(new THREE.SphereGeometry(3.4, 16, 12), matMetal); sph.position.y=4.6; tk.add(sph);
    for(let l=0;l<3;l++){ const la=l/3*Math.PI*2;
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.24,0.24,2.6,6), matDark);
      leg.position.set(Math.cos(la)*2.2, 1.3, Math.sin(la)*2.2); tk.add(leg);
    }
    tk.position.set(tx, 0, tz); sc.add(tk); col.push({ x:tx, z:tz, r:3.8, h:8 });
  }
  sSign(sc, '液氢储罐区', 34, 10, 52, 4.5);
  const pipeMain = new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,36,8), matMetal);
  pipeMain.position.set(20, 1.2, 30); pipeMain.rotation.x = Math.PI/2.6; sc.add(pipeMain);

  // —— 货运磁悬浮（自动化物流） ——
  const crPts = [new THREE.Vector3(-62, 7, 66), new THREE.Vector3(0, 7.6, 70), new THREE.Vector3(62, 7, 66)];
  const crCurve = new THREE.CatmullRomCurve3(crPts);
  sc.add(new THREE.Mesh(new THREE.TubeGeometry(crCurve, 32, 0.3, 8), matMetal));
  for(let i=0;i<5;i++){
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.3,7,6), matDark);
    const p = crCurve.getPoint(i/4); post.position.set(p.x, 3.5, p.z); sc.add(post);
  }
  const cargo = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.6, 1.8), matFactory);
  sc.add(cargo);
  const cargoSt = { t:0 };
  city.ticks.push((dt)=>{
    cargoSt.t = (cargoSt.t + dt*0.05) % 1;
    const k = cargoSt.t < 0.5 ? cargoSt.t*2 : 2-cargoSt.t*2;
    cargo.position.copy(crCurve.getPoint(k)); cargo.position.y += 0.9;
  });
  sSign(sc, '真空货运线 · 4 号', 0, 10.5, 70, 4);

  // —— 塔吊 / 集装箱 / 排气塔 / 巡检机器人 ——
  for(const [cx,cz,cry] of [[-24,26,0.6],[18,34,2.4]]){
    const crane = new THREE.Group();
    const cp = new THREE.Mesh(new THREE.CylinderGeometry(0.4,0.55,14,8), matMetal); cp.position.y=7; crane.add(cp);
    const jib = new THREE.Mesh(new THREE.BoxGeometry(11,0.5,0.5), matFactory); jib.position.set(4,14,0); crane.add(jib);
    const hook = new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,4,4), matDark); hook.position.set(8,11.8,0); crane.add(hook);
    crane.position.set(cx,0,cz); crane.rotation.y = cry; sc.add(crane); col.push({ x:cx, z:cz, r:1.2, h:14 });
  }
  const ctns = [];
  for(let i=0;i<26;i++){
    ctns.push({ p:new THREE.Vector3(-30+(i%7)*2.6, 0.75+Math.floor(i/14)*1.55, 44+(Math.floor(i/7)%2)*2.4),
      s:new THREE.Vector3(2.2,1.4,1.2), ry:(rand()-0.5)*0.15 });
  }
  sc.add(instanced(new THREE.BoxGeometry(1,1,1), matFactory, ctns));
  col.push({ x:-22, z:45, r:10, h:3 });
  for(let i=0;i<3;i++){
    const ft = sCyl(sc, col, 0.8, 13, matDark, -58+i*5, 18+i*3, { rTop:0.5 });
    const fg = addGlow(sc, new THREE.Vector3(-58+i*5, 14, 18+i*3), 0xff9040, 2.4);
    city.ticks.push((dt,t)=>{ const s = 2+Math.sin(t*5+i*2.1)*0.7; fg.scale.set(s,s,1); });
  }
  for(let i=0;i<3;i++){
    const bot = new THREE.Group();
    const bb = new THREE.Mesh(new THREE.BoxGeometry(1.2,0.6,0.9), matFactory); bb.position.y=0.55; bot.add(bb);
    const be = new THREE.Mesh(new THREE.BoxGeometry(0.25,0.18,0.18), matCore); be.position.set(0.62,0.6,0); bot.add(be);
    for(const sx of [-1,1]) for(const sz of [-1,1]){
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07,0.07,0.5,5), matDark);
      leg.position.set(sx*0.45,0.22,sz*0.32); bot.add(leg);
    }
    sc.add(bot);
    city.walkers.push({ mesh:bot, cx:-10+i*14, cz:22, r:6, speed:0.4+i*0.12, phase:rand()*6 });
  }
  for(let z=-70; z<=60; z+=26){ sLamp(sc, -7, z, false); sLamp(sc, 7, z+13, false); }

  // NPC
  addSurfaceNPC(city, 0xd97b4a, 5, -11, 2.4, '卡尔', '冶炼工程师',
    '小心脚下的管线。今天炉子状态不错。',
    [
      { q:'这里在造什么？', a:'飞船构件、穹顶材料、机器人零件。八成原料来自火星本地——红土就是我们的矿。' },
      { q:'原料从哪来？', a:'西边矿带的风化层，还有 Glacies 的冰。进来是石头和冰，出去是钢和燃料。' },
    ], undefined, { xdIntro:'卡尔是冶炼工程师。红土变成钢，就是他每天的活。' });
  addSurfaceNPC(city, 0x8fb4d8, 10, -13.5, -0.6, '薇', '产线技术员',
    '控制台别乱碰——哦，你有权限？那行。',
    [
      { q:'这条产线多久出一批？', a:'七十二小时一批构件，全流程无人化。我只负责盯着数据，别打瞌睡。' },
      { q:'机器人比人多吗？', a:'多得多。这座城常住人口不到两万，机器人二十万。我们是来当脑子的。' },
    ], undefined, { xdIntro:'薇盯着这条产线。从原料到成品，一步都不能出错。' });
  addSurfaceNPC(city, 0xc8b8a8, 27, 7, -1.8, '诺', '物流调度员',
    '下一班货运舱，四十分钟后发车。',
    [
      { q:'货都运去哪？', a:'首都、Verde、轨道港。燃料北上，构件上电梯——火星的物流，一天都没停过。' },
      { q:'火箭多久发一次？', a:'每周三班往返 Areos Gate。你要是想上轨道，得提前三个月排队。' },
    ], undefined, { wander:1.2, xdIntro:'诺负责物流调度。整座城的物资流转，都在他脑子里。' });

  // 核心行为：资源 → 能源/制造 流程（有序三步）
  addInteract(city, 'input', -46, -20, 4.6, '原料输入站', '按 E · 投入风化层原料', ()=>{
    conveyorOn = true;
    hopperLamp.material.emissive.setHex(0x5ef2b8); hopperLamp.material.emissiveIntensity = 1.8;
    xdSay(['原料入线。听——传送带动起来了。','这些红色的石头，两个小时以后就是钢。']);
    showToast('原料已入线 · 传送系统启动');
    completeTask(city, 'input');
  });
  addInteract(city, 'process', 8, -12, 4, '处理控制台', '按 E · 启动冶炼流程', ()=>{
    smeltGlowMat.emissiveIntensity = 2.6;
    consoleScr.material.emissive.setHex(0x5ef2b8);
    smelter.material = matFactory.clone(); smelter.material.emissiveIntensity = 1.2;
    xdSay(['冶炼炉点火。1600 度——风化层正在分解、提纯、成型。','火星不伸手向地球要东西。它自己造。']);
    showToast('冶炼流程运行中 · 产出构件毛坯');
    completeTask(city, 'process');
  }, ()=>city.tasks.find(t=>t.id==='input').done);
  city.interact.at(-1).lockedText = '需要先在原料输入站投料（西边，跟着光柱）。';
  addInteract(city, 'output', 30, 2, 4.4, '能源输出平台', '按 E · 并网输出', ()=>{
    engineGlow.userData.base = 6;
    city.ticks.push((dt,t)=>{ const s = 5+Math.sin(t*9)*1.2; engineGlow.scale.set(s,s,1); });
    xdSay(['并网成功——这批能源，今晚会点亮 Aurelia 的主街。','石头、冰、阳光。这颗星球用自己的东西，养活了自己。']);
    showToast('能源并网输出 · 流程贯通');
    completeTask(city, 'output');
  }, ()=>city.tasks.find(t=>t.id==='process').done);
  city.interact.at(-1).lockedText = '需要先启动处理中心的冶炼流程。';
  sTask(city, 'input', '启动原料输入', -46, -20);
  sTask(city, 'process', '启动资源处理', 8, -12);
  sTask(city, 'output', '完成能源输出', 30, 2);
}

export { buildHephaestus };
