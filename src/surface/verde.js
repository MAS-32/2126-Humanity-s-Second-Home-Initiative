/* 地表城市 VERDE
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L3905-4080，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { rand } from '../core/random.js';
import { xdSay } from '../interaction/companion.js';
import { showToast } from '../interaction/ice-view.js';
import { instanced } from '../scene/city-system.js';
import { addGlow, domeMat, makeDome, matDark, matEco, matLeaf2, matMetal, matWhite, texGrain } from '../scene/materials.js';
import { addInteract, addSurfaceNPC, addSurfaceWalker, completeTask, makeSurfaceScene, sBox, sGround, sLamp, sSign, sStrip, sTask } from './common.js';

/* ==================== 城市 02 · VERDE 翡绿生态城（LIFE ON MARS） ==================== */
function buildVerde(city){
  const sc = city.scene = makeSurfaceScene(0x14201a, 0x3d5c46, 60, 300, 0xe8f4d8);
  city.bounds = 98;
  city.spawn = { x:0, z:-84, yaw:0 };
  city.intro = [
    'Verde——红色荒漠里长出来的一整块森林。',
    '水、光、温度，是这座城的三根命脉。',
    '帮我个忙：把三处调节点都跑一遍，你就知道这座城是怎么呼吸的。',
  ];
  // 向导地标：靠近自动解说一句
  city.guide = [
    { x:0,   z:8,   r:16, text:'中央湖——整座城的水，从这里开始循环。' },
    { x:26,  z:30,  r:13, text:'垂直栽培塔。火星的蔬菜和氧气，大多来自这里。' },
    { x:-34, z:42,  r:12, text:'温控环。夜里它给整个穹顶保温，作物才熬得过火星的寒夜。' },
  ];
  city.idleHint = '中央湖、栽培塔、温控环——这座城的呼吸都在这几处，去转转吧。';
  const col = city.colliders;

  // 地面：草地 + 步道
  city.groundMesh = sGround(sc, 120, 0x5a4632);
  const lawn = new THREE.Mesh(new THREE.CircleGeometry(96, 64).rotateX(-Math.PI/2),
    new THREE.MeshStandardMaterial({ color:0x39543a, roughness:0.95, bumpMap:texGrain, bumpScale:0.02 }));
  lawn.position.y = 0.02; sc.add(lawn);
  const dome = makeDome(100, 0.1); sc.add(dome);

  // —— 人工水循环：中央湖 + 环形运河 + 水塔 + 泵站 ——
  const lakeMat = new THREE.MeshStandardMaterial({ color:0x2f9fe8, roughness:0.12, metalness:0.2,
    emissive:0x1a6fc0, emissiveIntensity:0.5 });
  const lake = new THREE.Mesh(new THREE.CircleGeometry(13, 40).rotateX(-Math.PI/2), lakeMat);
  lake.position.set(0, 0.06, 8); sc.add(lake);
  const canalMat = new THREE.MeshStandardMaterial({ color:0x2f9fe8, roughness:0.15,
    emissive:0x1a6fc0, emissiveIntensity:0.35 });
  const canal = new THREE.Mesh(new THREE.TorusGeometry(30, 1.5, 8, 72).rotateX(Math.PI/2), canalMat);
  canal.position.set(0, 0.08, 8); sc.add(canal);
  city.ticks.push((dt,t)=>{ lake.position.y = 0.06 + Math.sin(t*0.8)*0.015; canal.position.y = 0.08 + Math.sin(t*0.8+1)*0.012; });
  for(const [wx,wz] of [[16,16],[-16,16]]){
    const wt = new THREE.Group();
    const wb = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.9, 9, 12), matWhite); wb.position.y=4.5; wt.add(wb);
    for(let i=0;i<3;i++){
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.16, 6, 24).rotateX(Math.PI/2), canalMat);
      ring.position.y = 2.4+i*2.6; wt.add(ring);
    }
    wt.position.set(wx, 0, wz); sc.add(wt); col.push({ x:wx, z:wz, r:2.2, h:9 });
  }
  sSign(sc, '水循环塔', 16, 11, 16, 3.5);
  // 泵站（水循环阀 · 交互点）
  const pump = sBox(sc, col, 3.4, 2.6, 2.8, matMetal, 12, -4, 0.4);
  const pumpPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.3,7,8), matMetal);
  pumpPipe.position.set(8, 0.4, 1); pumpPipe.rotation.z = Math.PI/2; pumpPipe.rotation.y = 0.7; sc.add(pumpPipe);
  sSign(sc, '循环泵站', 12, 3.6, -4, 3);

  // —— 垂直农业：栽培塔 ×4（光谱灯阵 · 交互点） ——
  const shelfMats = [], growBars = [];
  const farmPos = [[26,30],[-26,30],[26,-16],[-26,-16]];
  farmPos.forEach(([fx,fz],fi)=>{
    const farm = new THREE.Group();
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.6,10,8), matMetal); core.position.y=5; farm.add(core);
    for(let i=0;i<7;i++){
      const sm = new THREE.MeshStandardMaterial({ color:0x3fae6f, emissive:0x2f9e5f, emissiveIntensity:0.7, roughness:0.7 });
      shelfMats.push(sm);
      const shelf = new THREE.Mesh(new THREE.CylinderGeometry(3.4-i*0.28, 3.4-i*0.28, 0.35, 16), sm);
      shelf.position.y = 1+i*1.3; farm.add(shelf);
      const bar = new THREE.Mesh(new THREE.TorusGeometry(3.1-i*0.28, 0.07, 6, 24).rotateX(Math.PI/2),
        new THREE.MeshStandardMaterial({ color:0x2a1a2a, emissive:0xc07aff, emissiveIntensity:0.8 }));
      bar.position.y = 1.32+i*1.3; farm.add(bar); growBars.push(bar.material);
    }
    farm.position.set(fx, 0, fz); sc.add(farm); col.push({ x:fx, z:fz, r:3.8, h:10.5 });
  });
  sSign(sc, '垂直栽培塔群', 26, 12, 30, 4.5);
  const lightConsole = sBox(sc, col, 1.6, 1.3, 0.8, matDark, 22, 26, -0.6);
  const lightScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.7),
    new THREE.MeshStandardMaterial({ color:0x1a0a20, emissive:0xc07aff, emissiveIntensity:1.1 }));
  lightScreen.position.set(22, 1.1, 25.55); lightScreen.rotation.y = -0.6+Math.PI; sc.add(lightScreen);

  // —— 植物培育区：田垄 + 温室链 ——
  const crops = [];
  for(let r=0;r<6;r++) for(let c=0;c<10;c++){
    crops.push({ p:new THREE.Vector3(20+c*2.6, 0.35, 44+r*3.2), s:new THREE.Vector3(0.5, 0.7+((r+c)%3)*0.2, 0.5) });
  }
  const cropMesh = instanced(new THREE.ConeGeometry(1,1,7), matLeaf2, crops);
  sc.add(cropMesh);
  for(let r=0;r<6;r++) sStrip(sc, 31.7, 44+r*3.2+1.6, 26, 0.5, 0, 0x49d7ff, 0.25);   // 灌溉带
  sSign(sc, '培育田 · 三号区', 32, 4, 54, 4);
  [[-36,-32],[-48,-16],[-32,-48]].forEach(([gx,gz])=>{
    const gd = makeDome(6, 0.18); gd.position.set(gx, 0, gz); sc.add(gd);
    const veg = new THREE.Mesh(new THREE.SphereGeometry(4.6, 14, 8, 0, Math.PI*2, 0, Math.PI/2), matEco);
    veg.scale.y = 0.4; veg.position.set(gx, 0.05, gz); sc.add(veg);
    col.push({ x:gx, z:gz, r:6.2, h:5 });
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.8,0.8,Math.hypot(gx,gz-8)-6,8), domeMat(0.22));
    tube.position.set(gx/2, 1, (gz-8)/2+4); tube.rotation.z = Math.PI/2; tube.rotation.y = -Math.atan2(gz-8, gx);
    sc.add(tube);
  });
  sSign(sc, '链式温室', -38, 7.5, -30, 4);

  // —— 气候控制塔（温控环 · 交互点） ——
  const clim = new THREE.Group();
  const climB = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.2, 14, 12), matWhite); climB.position.y=7; clim.add(climB);
  const climRings = [];
  for(let i=0;i<4;i++){
    const r = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.18, 8, 28).rotateX(Math.PI/2),
      new THREE.MeshStandardMaterial({ color:0x1a2a20, emissive:0x7dd8ff, emissiveIntensity:1.2 }));
    r.position.y = 3+i*3; clim.add(r); climRings.push(r.material);
  }
  clim.position.set(-34, 0, 42); sc.add(clim); col.push({ x:-34, z:42, r:2.6, h:14 });
  addGlow(sc, new THREE.Vector3(-34, 15, 42), 0x7dd8ff, 3);
  sSign(sc, '气候控制塔', -34, 16.5, 42, 4);

  // —— 居住空间：穹顶南居住荚 ——
  for(let i=0;i<6;i++){
    const hx = -16 + i*6.4, hz = -56 - (i%2)*6;
    const hab = new THREE.Mesh(new THREE.CapsuleGeometry(1.7, 3.4, 4, 12).rotateZ(Math.PI/2), matWhite);
    hab.position.set(hx, 1.7, hz); sc.add(hab); col.push({ x:hx, z:hz, r:3.2, h:3.4 });
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.8,0.5,0.1),
      new THREE.MeshStandardMaterial({ color:0x2a2418, emissive:0xffc978, emissiveIntensity:1.4 }));
    win.position.set(hx, 1.9, hz+1.75); sc.add(win);
  }
  sSign(sc, '湖岸居住荚', 0, 5.5, -58, 4);
  // 树木与花
  const trees = [];
  for(let i=0;i<160;i++){
    const a = rand()*Math.PI*2, rr = 36+Math.sqrt(rand())*56;
    trees.push({ p:new THREE.Vector3(Math.cos(a)*rr, 0.8, 8+Math.sin(a)*rr*0.9), s:new THREE.Vector3(0.6, 1.6+rand()*1.2, 0.6) });
  }
  sc.add(instanced(new THREE.ConeGeometry(1,1,7), matEco, trees));
  for(let i=0;i<10;i++){ const a=i/10*Math.PI*2; sLamp(sc, Math.cos(a)*24, 8+Math.sin(a)*24, false); }

  // NPC
  addSurfaceWalker(city, 0x8fb4d8, 0, 8, 19, 0.3);
  addSurfaceWalker(city, 0x9ab0a8, 0, 8, 21, -0.24, 2);
  addSurfaceNPC(city, 0x57c785, 24, 26, -2.4, '苔', '植物学家',
    '轻一点——这边的秧苗昨天刚醒。',
    [
      { q:'这些植物吃什么光？', a:'定制光谱，一种作物一档。红光管生长，蓝光管叶片——比地球上的太阳还讲究。' },
      { q:'火星土壤能种东西吗？', a:'能，但要先洗盐、调菌。你脚下这片田，五年前还是消毒过的风化层。' },
    ], 0x8fffbe, { xdIntro:'苔是植物学家。穹顶下这片绿意，大半是她的作品。' });
  addSurfaceNPC(city, 0x8fb4d8, 14, 12, 2.8, '沐', '生态工程师',
    '听到水泵的声音了吗？那是这座城的呼吸。',
    [
      { q:'水从哪里来？', a:'极地冰层，净化后进循环塔。城里每一滴水，一年要循环三百多次。' },
      { q:'系统会出故障吗？', a:'会，所以我们轮班守着。生态不是装好的机器，是每天都要照顾的活物。' },
    ], undefined, { xdIntro:'沐，生态工程师。这座城的水、光和温度，都是他在维持。' });
  addSurfaceNPC(city, 0xc8b8a8, -7, -8, 1.2, '阿禾', '居民',
    '我每天下班，都来湖边坐一会儿。',
    [
      { q:'住在穹顶里什么感觉？', a:'像住在一个巨大的温室里。抬头是玻璃，低头是泥土——但空气是甜的。' },
      { q:'想地球吗？', a:'我女儿出生在这里。对她来说，有树有湖的地方就是家，不用想。' },
    ], undefined, { wander:1.4, xdIntro:'阿禾住在湖岸居住荚。Verde 最普通的一天，就是这样的。' });

  // 三个调节交互（核心行为：调节生态系统）
  addInteract(city, 'water', 12, -4, 4, '水循环阀', '按 E · 增大循环流量', ()=>{
    canalMat.emissiveIntensity = 1.2; lakeMat.emissiveIntensity = 1.0;
    xdSay(['阀门开了——听，水声变大了。','这两万年前冻住的冰，现在是这座城的河。']);
    showToast('水循环流量 +40% · 运河水位上升');
    completeTask(city, 'water');
  });
  addInteract(city, 'light', 22, 26, 4, '光谱灯阵', '按 E · 校准作物流光光谱', ()=>{
    shelfMats.forEach(m=>m.emissiveIntensity = 1.6);
    growBars.forEach(m=>m.emissiveIntensity = 2.4);
    lightScreen.material.emissive.setHex(0x5ef2b8);
    xdSay(['光谱校准完成。这批生菜的收成，会比上周好一成。','在火星，阳光也是可以调出来的。']);
    showToast('光谱校准完成 · 栽培塔全功率运行');
    completeTask(city, 'light');
  });
  addInteract(city, 'temp', -34, 42, 4.4, '温控环', '按 E · 上调穹顶夜间温度', ()=>{
    climRings.forEach(m=>{ m.emissive.setHex(0xffb267); m.emissiveIntensity = 1.8; });
    sc.fog.color.setHex(0x5c5240); sc.background.setHex(0x201c12);
    xdSay(['温度上调两度。今晚，田里的作物可以睡个好觉。','你刚刚做的，就是 Verde 居民每天在做的事——亲手维持一个世界。']);
    showToast('穹顶温度 +2°C · 气候系统平衡');
    completeTask(city, 'temp');
  });
  sTask(city, 'water', '调节水循环阀', 12, -4);
  sTask(city, 'light', '校准光谱灯阵', 22, 26);
  sTask(city, 'temp', '调整温控环', -34, 42);
}

export { buildVerde };
