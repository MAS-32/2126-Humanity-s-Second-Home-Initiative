/* 地表城市 AURELIA
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L3690-3904，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { xdSay } from '../interaction/companion.js';
import { showToast } from '../interaction/ice-view.js';
import { addGlow, domeMat, makeDome, matCore, matDark, matHabFacade, matMetal, matSolar, matTowerGlass, matWhite, texGrain } from '../scene/materials.js';
import { matTube } from '../scene/transit.js';
import { addInteract, addSurfaceNPC, addSurfaceWalker, completeTask, makeSurfaceScene, sBox, sCyl, sGround, sLamp, sRoad, sSign, sStrip, sTask, sTree, surface } from './common.js';

/* ==================== 城市 01 · AURELIA 火星首都（NEW CIVILIZATION） ==================== */
function buildAurelia(city){
  const sc = city.scene = makeSurfaceScene(0x2c1a10, 0x6e452c, 70, 340);
  city.bounds = 112;
  city.spawn = { x:0, z:-92, yaw:0 };
  city.intro = [
    '到了——Aurelia，火星的首都。',
    '沿着主街往前走，尽头就是中央广场。',
    '先去登记亭接入城市网络吧，跟着光柱走。',
  ];
  // 向导地标：靠近自动解说一句
  city.guide = [
    { x:0,   z:14,  r:13, text:'拓荒纪念碑——连穹顶都没有的年代，就有人相信会有今天。' },
    { x:-26, z:46,  r:11, text:'医疗中心。在低重力和辐射里，它是这座城最不能停的地方。' },
    { x:-16, z:-68, r:13, text:'城市能源节点。这些日冕树，养着 Aurelia 的每一盏灯。' },
  ];
  city.idleHint = '主街尽头是中央广场，西侧还有医疗中心和行政塔——想去哪儿，跟着我。';
  const col = city.colliders;

  // 地面：风化层 + 城市铺装
  city.groundMesh = sGround(sc, 130, 0x6b4230);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(106, 64).rotateX(-Math.PI/2),
    new THREE.MeshStandardMaterial({ color:0x2b3038, roughness:0.85, bumpMap:texGrain, bumpScale:0.015 }));
  floor.position.y = 0.02; sc.add(floor);
  sc.add(makeDome(108, 0.06));   // 首都穹顶（ faint 围合感）

  // —— 主街（南城门 → 中央广场 → 北端）+ 横街 ——
  sRoad(sc, 0, 0, 12, 200);
  sStrip(sc, 0, 0, 0.5, 200, 0, 0x49d7ff, 0.8);
  for(const s of [-1,1]) sStrip(sc, s*6.6, 0, 1.6, 200, 0, 0xffc98a, 0.35);   // 两侧人行道
  sRoad(sc, 0, -32, 170, 8); sRoad(sc, 0, 36, 170, 8);
  sStrip(sc, 0, -32, 170, 0.4, 0, 0x49d7ff, 0.5); sStrip(sc, 0, 36, 170, 0.4, 0, 0x49d7ff, 0.5);

  // —— 中央广场（城市核心） ——
  const plaza = new THREE.Mesh(new THREE.CylinderGeometry(16, 16.5, 0.24, 48),
    new THREE.MeshStandardMaterial({ color:0x3a3f46, roughness:0.7, bumpMap:texGrain, bumpScale:0.01 }));
  plaza.position.set(0, 0.12, 14); sc.add(plaza);
  for(let i=0;i<3;i++){
    const ring = new THREE.Mesh(new THREE.TorusGeometry(13-i*3.2, 0.14, 6, 64).rotateX(Math.PI/2),
      new THREE.MeshStandardMaterial({ color:0x111820, emissive:0xffc98a, emissiveIntensity:0.9 }));
    ring.position.set(0, 0.26, 14); sc.add(ring);
  }
  // 拓荒纪念碑（城市地标）
  const mon = new THREE.Group();
  const mBase = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.8, 1, 24), matMetal); mBase.position.y=0.5; mon.add(mBase);
  const mSpire = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 1.6, 13, 8), matMetal); mSpire.position.y=7.5; mon.add(mSpire);
  const mCore = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.56, 13, 8),
    new THREE.MeshBasicMaterial({ color:0x7fe7ff, transparent:true, opacity:0.18, blending:THREE.AdditiveBlending }));
  mCore.position.y=7.5; mon.add(mCore);
  for(let i=0;i<2;i++){
    const r = new THREE.Mesh(new THREE.TorusGeometry(2.2+i*0.9, 0.12, 8, 48), matMetal);
    r.position.y = 5+i*3.4; r.rotation.x = Math.PI/2 + (i? -0.2 : 0.2); mon.add(r);
    city.ticks.push((dt)=>{ r.rotation.z += dt*0.3; });
  }
  const mTop = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 16), matCore); mTop.position.y=14.4; mon.add(mTop);
  addGlow(mon, new THREE.Vector3(0, 14.4, 0), 0x7fe7ff, 7);
  mon.position.set(0, 0.24, 14); sc.add(mon);
  col.push({ x:0, z:14, r:4.2, h:15 });
  sSign(sc, '中央广场 · 拓荒纪念碑', 0, 17.5, 14, 7);
  for(let i=0;i<6;i++){ const a=i/6*Math.PI*2+0.3;
    const bench = new THREE.Mesh(new THREE.BoxGeometry(1.6,0.14,0.5), matDark);
    bench.position.set(Math.cos(a)*10.5, 0.45, 14+Math.sin(a)*10.5); bench.rotation.y=-a; sc.add(bench);
    sLamp(sc, Math.cos(a)*13.5, 14+Math.sin(a)*13.5, i%2===0);
  }
  for(const s of [-1,1]){ sTree(sc, s*8, 24, 1.3); sTree(sc, s*11, 4, 1.1); }

  // —— 城市登记亭（核心行为：身份登记） ——
  const kiosk = new THREE.Group();
  const kBody = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.6, 2.0), matWhite); kBody.position.y=1.3; kiosk.add(kBody);
  const kRoof = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.16, 2.6), matDark); kRoof.position.y=2.72; kiosk.add(kRoof);
  const kScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.8),
    new THREE.MeshStandardMaterial({ color:0x0a2028, emissive:0x49d7ff, emissiveIntensity:1.2 }));
  kScreen.position.set(0, 1.5, 1.02); kiosk.add(kScreen);
  kiosk.position.set(10, 0, -4); kiosk.rotation.y = -0.5; sc.add(kiosk);
  col.push({ x:10, z:-4, r:1.9, h:2.8 });
  sSign(sc, '城市登记亭', 10, 3.8, -4, 3.2);
  addGlow(sc, new THREE.Vector3(10, 2.2, -4), 0x49d7ff, 2);
  addInteract(city, 'register', 10, -4, 4, '城市身份登记', '按 E · 接入 Aurelia 城市网络', ()=>{
    kScreen.material.emissive.setHex(0x5ef2b8);
    xdSay(['身份采集中……好了，很简单。','从现在起，你是 Aurelia 城市网络的访问者——门禁、磁悬浮、公共终端，都会认得你。']);
    showToast('身份登记完成 · 欢迎接入 Aurelia');
    completeTask(city, 'register');
  });

  // —— 东侧：居住组团（三处庭院 + 步行连接） ——
  const courtYards = [[34,-10],[42,28],[30,62]];
  courtYards.forEach(([cx,cz],ci)=>{
    for(let i=0;i<4;i++){
      const a = i/4*Math.PI*2 + ci*0.5;
      const h = 8 + ((ci*7+i*5)%13);
      sBox(sc, col, 5, h, 5, matHabFacade, cx+Math.cos(a)*9, cz+Math.sin(a)*9, a);
    }
    const yard = new THREE.Mesh(new THREE.CylinderGeometry(5.5, 5.5, 0.12, 24),
      new THREE.MeshStandardMaterial({ color:0x37402f, roughness:0.9 }));
    yard.position.set(cx, 0.06, cz); sc.add(yard);
    sTree(sc, cx-1.5, cz, 1.2); sTree(sc, cx+1.8, cz+1, 1);
    sLamp(sc, cx, cz-3.5, true);
    sStrip(sc, cx/2, cz/2+ (cz>0?7:-7), Math.abs(cx), 1.2, Math.atan2(cz, cx), 0xffc98a, 0.3);  // 步道连主街
  });
  sSign(sc, '居住组团 · 东三区', 36, 14, 28, 4.5);

  // —— 西侧：商业服务 / 医疗 / 行政 / 能源 ——
  sBox(sc, col, 7, 26, 7, matTowerGlass, -26, -12, 0.3);
  sBox(sc, col, 6, 20, 6, matTowerGlass, -34, 6, 0.9);
  sBox(sc, col, 5, 15, 5, matTowerGlass, -22, 18, 0.1);
  // 空中连廊（建筑之间的关系）
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(10, 1.4, 2.2), domeMat(0.35));
  bridge.position.set(-29, 12, -3); bridge.rotation.y = 0.75; sc.add(bridge);
  sSign(sc, '中央商业区', -27, 22, -4, 4.5);
  // 医疗中心（白 + 绿十字）
  const med = sBox(sc, col, 10, 9, 8, matWhite, -26, 46, 0.2);
  const cross1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 3.2, 0.2), new THREE.MeshStandardMaterial({ color:0x0d2818, emissive:0x5ef2b8, emissiveIntensity:1.6 }));
  cross1.position.set(-26, 6, 42.05); sc.add(cross1);
  const cross2 = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.9, 0.2), cross1.material);
  cross2.position.set(-26, 6, 42.0); sc.add(cross2);
  sSign(sc, 'Aurelia 医疗中心', -26, 11.5, 46, 4);
  // 行政塔
  const adm = sCyl(sc, col, 4.2, 32, matTowerGlass, -32, -46, { rTop:3.2 });
  const admRing = new THREE.Mesh(new THREE.TorusGeometry(4.6, 0.3, 8, 32).rotateX(Math.PI/2), matCore);
  admRing.position.set(-32, 24, -46); sc.add(admRing);
  sSign(sc, '市政行政塔', -32, 35, -46, 4.5);
  // 能源节点（日冕树 + 储能）
  for(let i=0;i<3;i++){
    const et = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14,0.24,5,6), matDark); trunk.position.y=2.5; et.add(trunk);
    for(let p=0;p<6;p++){ const a=p/6*Math.PI*2;
      const petal = new THREE.Mesh(new THREE.SphereGeometry(0.9,8,6), matSolar);
      petal.scale.set(1,0.16,0.55); petal.position.set(Math.cos(a)*0.9, 5.1, Math.sin(a)*0.9); petal.rotation.y=-a; et.add(petal);
    }
    et.position.set(-20+i*4.5, 0, -68); sc.add(et); col.push({ x:-20+i*4.5, z:-68, r:1.2, h:5.4 });
  }
  sBox(sc, col, 6, 2.4, 2.5, matMetal, -8, -70, 0.1);
  sSign(sc, '城市能源节点', -16, 7.5, -68, 4);

  // —— 环城磁悬浮（百万级城市交通：高架环 + 双向车厢 + 车站） ——
  const mlPts = [];
  for(let i=0;i<8;i++){ const a=i/8*Math.PI*2; mlPts.push(new THREE.Vector3(Math.cos(a)*46, 6.5, 10+Math.sin(a)*56)); }
  const mlCurve = new THREE.CatmullRomCurve3(mlPts, true);
  sc.add(new THREE.Mesh(new THREE.TubeGeometry(mlCurve, 96, 0.32, 8), matTube));
  sc.add(new THREE.Mesh(new THREE.TubeGeometry(mlCurve, 96, 0.07, 6), matCore));
  for(let i=0;i<8;i++){ const p = mlPts[i];
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.26,6.5,8), matMetal);
    post.position.set(p.x, 3.25, p.z); sc.add(post);
  }
  for(let k=0;k<3;k++){
    const pod = new THREE.Mesh(new THREE.CapsuleGeometry(0.5, 2.6, 4, 10),
      new THREE.MeshStandardMaterial({ color:0xe8edf2, roughness:0.3, metalness:0.5, emissive:0x66d9ff, emissiveIntensity:0.5 }));
    pod.rotation.z = Math.PI/2; sc.add(pod);
    const st = { t:k/3 };
    city.ticks.push((dt)=>{
      st.t = (st.t + dt*0.018 + 1) % 1;
      const p = mlCurve.getPoint(st.t), tan = mlCurve.getTangent(st.t);
      pod.position.copy(p); pod.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), tan.normalize());
    });
  }
  // 主街车站 ×2
  [[0,-32],[0,36]].forEach(([sx,sz])=>{
    const plat = new THREE.Mesh(new THREE.BoxGeometry(8, 0.4, 3), matMetal); plat.position.set(sx, 6.3, sz); sc.add(plat);
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(9, 0.2, 4), matDark); canopy.position.set(sx, 8.6, sz); sc.add(canopy);
    for(const s of [-1,1]){
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.12,8.6,6), matMetal);
      leg.position.set(sx+s*4, 4.3, sz); sc.add(leg);
    }
    const stLight = new THREE.Mesh(new THREE.BoxGeometry(7,0.08,0.2), matCore); stLight.position.set(sx,8.4,sz); sc.add(stLight);
  });
  sSign(sc, '环城磁悬浮 · 主街站', 0, 10.2, 36, 4);

  // 街道照明 + 城市边缘
  for(let z=-80; z<=90; z+=22){ sLamp(sc, -8.5, z, z%44===0); sLamp(sc, 8.5, z+11, z%44!==0); }
  for(let i=0;i<10;i++){ const a=i/10*Math.PI*2;
    sCyl(sc, col, 1.2, 3.5, matDark, Math.cos(a)*100, Math.sin(a)*100, { seg:8 });   // 边缘结构柱
  }
  // 南城门（出生点气闸意象）
  const gate = new THREE.Mesh(new THREE.TorusGeometry(5, 0.7, 10, 32), matMetal);
  gate.position.set(0, 5, -100); sc.add(gate);
  const gateGlow = new THREE.Mesh(new THREE.TorusGeometry(5, 0.2, 6, 32), matCore);
  gateGlow.position.set(0, 5, -100); sc.add(gateGlow);
  sSign(sc, 'Aurelia 南门 · 着陆区', 0, 11, -100, 4.5);

  // 人群与 NPC
  addSurfaceWalker(city, 0xc8b8a8, 0, 14, 9, 0.35);
  addSurfaceWalker(city, 0x8fa4b0, 0, 14, 11, -0.28, 2);
  addSurfaceWalker(city, 0xb89888, 34, -10, 3.4, 0.5, 1);
  addSurfaceWalker(city, 0x9ab0a8, -27, 0, 5, 0.4, 3);
  addSurfaceNPC(city, 0xd97b4a, 12.5, -1.5, -2.2, '安', '城市登记官',
    '欢迎来到 Aurelia。第一次来？先去登记亭按个印，城市才会认得你。',
    [
      { q:'登记有什么用？', a:'接入城市网络之后，门禁、磁悬浮、公共终端都会对你开放。一句话：从游客，变成客人。' },
      { q:'这座城市住了多少人？', a:'登记人口四十二万，火星最多。三代人在这里出生——对他们来说，地球才是远方。' },
      { q:'你在这里多久了？', a:'十一年。看着主街从一条临时通道，长成现在这个样子。' },
    ], undefined, { xdIntro:'这位是安，Aurelia 的城市登记官。每个新移民的第一站，都从她这里开始。' });
  addSurfaceNPC(city, 0xc8b8a8, 34, -4, 2.6, '陈栖', '火星居民 · Aurelia 第三代',
    '新面孔？坐早班电梯下来的吧。',
    [
      { q:'你出生在火星？', a:'嗯，第三号穹顶。小时候洗澡要计时，现在循环系统好了，能痛快淋浴。' },
      { q:'这里生活方便吗？', a:'吃穿住行都在穹顶里解决。下班去广场喝杯合成咖啡，看纪念碑的灯——这就是日常。' },
    ], undefined, { wander:1.4, xdIntro:'陈栖，在火星出生的第三代。对他来说，地球只是课本上的地方。' });
  addSurfaceNPC(city, 0x8fb4d8, -28, -42, 0.8, '岚', '城市服务 · 行政塔',
    '行政塔今天人不多，运气不错。',
    [
      { q:'你在管理什么？', a:'水、电、气的调度，还有磁悬浮的班次。城市不是机器，是一百万个待办事项。' },
      { q:'城市谁在做决定？', a:'居民议会加 AI 辅助。地球那一套搬过来改一改——火星有自己的规矩。' },
    ], undefined, { xdIntro:'岚负责行政塔的调度。整座城的水、电、气，都过她的手。' });

  // 任务：CITY WALK → 登记 → 交谈
  sTask(city, 'walk', '沿主街走到中央广场', 0, 14);
  sTask(city, 'register', '完成城市身份登记', 10, -4);
  sTask(city, 'talk', '与两位市民交谈', 34, -4);
  city.ticks.push(()=>{
    const t = city.tasks[0];
    if(!t.done && surface.player && Math.hypot(surface.player.pos.x, surface.player.pos.z-14) < 11)
      completeTask(city, 'walk');
  });
}

export { buildAurelia };
