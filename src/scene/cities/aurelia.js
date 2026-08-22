/* 城市1 Aurelia
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L1058-1188，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { rand } from '../../core/random.js';
import { bBio, bEnergyTree, bFloat, bRingB, bSpire, bStack, tagBuilding } from '../buildings.js';
import { addDrone, anchorCity, animated, instanced, pickables, put } from '../city-system.js';
import { addGlow, makeDome, makeLabel, matCore, matDark, matEco, matHabFacade, matMetal, matWarm } from '../materials.js';
import { addNPC } from '../surface-npc.js';
import { CITY_SITES } from '../terrain.js';
import { addSkyway } from '../transit.js';

/* ---- 1. 火星首都 Aurelia（未来纽约） ---- */
{
  const g = anchorCity(CITY_SITES[0], 8.2, cg=>{
    const ground = new THREE.Mesh(new THREE.CircleGeometry(7.6, 56).rotateX(-Math.PI/2), matDark);
    ground.position.y = 0.02; cg.add(ground);
    // 中央广场
    for(let i=0;i<3;i++){
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.7-i*0.45, 0.045, 6, 56).rotateX(Math.PI/2),
        new THREE.MeshStandardMaterial({ color:0x111820, emissive:0xffc98a, emissiveIntensity:0.8 }));
      ring.position.y = 0.05; cg.add(tagBuilding(ring, 'plaza'));
      cg.userData.buildings.push(ring);
    }
    // 环路 + 放射街道网
    [4.2, 6.1].forEach(rr=>{
      const road = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.05, 6, 72).rotateX(Math.PI/2),
        new THREE.MeshStandardMaterial({ color:0x111820, emissive:0x49d7ff, emissiveIntensity:0.9 }));
      road.position.y = 0.05; cg.add(road);
    });
    const matStreet = new THREE.MeshStandardMaterial({ color:0x111820, emissive:0x49d7ff, emissiveIntensity:0.5 });
    for(let i=0;i<6;i++){ const a=i/6*Math.PI*2;
      const road = new THREE.Mesh(new THREE.BoxGeometry(4.6,0.04,0.09), matStreet);
      road.position.set(Math.cos(a)*4.6, 0.045, Math.sin(a)*4.6); road.rotation.y=-a; cg.add(road); }
    // 磁悬浮车厢 + 地面车流
    const pod = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.24, 4, 8).rotateZ(Math.PI/2), matCore);
    cg.add(pod); animated.pods.push({ mesh:pod, kind:'circle', r:4.2, y:0.12, speed:0.5, t:0 });
    const pod2 = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 0.2, 4, 8).rotateZ(Math.PI/2), matCore);
    cg.add(pod2); animated.pods.push({ mesh:pod2, kind:'circle', r:4.2, y:0.12, speed:-0.42, t:0.5 });
    for(let i=0;i<4;i++){
      const car = new THREE.Mesh(new THREE.CapsuleGeometry(0.05,0.18,4,6).rotateZ(Math.PI/2), matWarm);
      cg.add(car);
      animated.pods.push({ mesh:car, kind:'circle', r:6.1, y:0.1, speed:(0.3+rand()*0.3)*(i%2?1:-1), t:rand() });
    }
    // 建筑群
    const defs = [];
    for(let i=0;i<9;i++){ const a=i/9*Math.PI*2+0.2; defs.push([bSpire(2.2+rand()*2.0), Math.cos(a)*3.3, Math.sin(a)*3.3]); }
    for(let i=0;i<8;i++){ const a=i/8*Math.PI*2+0.55, rr=4.6+rand()*0.8;
      defs.push([rand()>0.5?bStack(0.5+rand()*0.2,1.4+rand()*0.8):bBio(1.6+rand()*1.2), Math.cos(a)*rr, Math.sin(a)*rr]); }
    for(let i=0;i<7;i++){ const a=i/7*Math.PI*2+0.1, rr=6.3+rand()*0.7;
      defs.push([bSpire(1.4+rand()*1.6, 0.26), Math.cos(a)*rr, Math.sin(a)*rr]); }
    defs.push([bRingB(1.05), 5.2, -3.4]);
    defs.push([bFloat(0.65, 2.6), -4.4, 3.6]);
    defs.forEach(([b,x,z])=>put(cg, b, x, z, rand()*Math.PI*2));
    // 加密：内圈住宅环 + 中圈混合填充
    for(let i=0;i<10;i++){ const a=i/10*Math.PI*2+0.32;
      put(cg, bStack(0.42+rand()*0.2, 1.1+rand()*0.7), Math.cos(a)*2.5, Math.sin(a)*2.5, rand()*3); }
    for(let i=0;i<10;i++){ const a=rand()*Math.PI*2, rr=3.7+rand()*2.8;
      put(cg, rand()>0.5?bSpire(1.3+rand()*1.4,0.26):bBio(1.4+rand()*1.1,0.42), Math.cos(a)*rr, Math.sin(a)*rr, rand()*3); }
    for(let i=0;i<5;i++){ const a=i/5*Math.PI*2+0.4; put(cg, bEnergyTree(1.4+rand()*0.5), Math.cos(a)*7.1, Math.sin(a)*7.1); }
    // 城市公园树群
    const parkTrees=[];
    for(let i=0;i<90;i++){ const a=rand()*Math.PI*2, rr=2.2+Math.sqrt(rand())*4.8, h=0.12+rand()*0.2;
      parkTrees.push({ p:new THREE.Vector3(Math.cos(a)*rr, h/2+0.04, Math.sin(a)*rr), s:new THREE.Vector3(0.05+rand()*0.04,h,0.05+rand()*0.04) }); }
    cg.add(instanced(new THREE.ConeGeometry(1,1,7), matEco, parkTrees));
    // 第三环线 + 外环居住区（百万人级城市外延）
    const road3 = new THREE.Mesh(new THREE.TorusGeometry(7.25, 0.045, 6, 80).rotateX(Math.PI/2),
      new THREE.MeshStandardMaterial({ color:0x111820, emissive:0x49d7ff, emissiveIntensity:0.7 }));
    road3.position.y = 0.05; cg.add(road3);
    for(let i=0;i<5;i++){
      const car = new THREE.Mesh(new THREE.CapsuleGeometry(0.045,0.16,4,6).rotateZ(Math.PI/2), matWarm);
      cg.add(car);
      animated.pods.push({ mesh:car, kind:'circle', r:7.25, y:0.1, speed:(0.25+rand()*0.3)*(i%2?1:-1), t:rand() });
    }
    const outskirts=[];
    for(let i=0;i<44;i++){ const a=rand()*Math.PI*2, rr=6.6+rand()*0.85, h=0.5+rand()*0.9;
      outskirts.push({ p:new THREE.Vector3(Math.cos(a)*rr, h/2+0.03, Math.sin(a)*rr),
        s:new THREE.Vector3(0.22+rand()*0.14, h, 0.22+rand()*0.14), ry:rand()*3 }); }
    const outskirtsMesh = instanced(new THREE.BoxGeometry(1,1,1), matHabFacade, outskirts);
    cg.add(tagBuilding(outskirtsMesh, 'stack')); cg.userData.buildings.push(outskirtsMesh);
    // 城市窗灯（百万灯火）
    const winPts=[], winCols=[];
    for(let i=0;i<520;i++){
      const a=rand()*Math.PI*2, rr=Math.sqrt(rand())*7.3, h=0.15+Math.pow(rand(),1.6)*2.6;
      winPts.push(Math.cos(a)*rr, h, Math.sin(a)*rr);
      const c = rand()>0.4 ? [1,0.79,0.54] : [0.56,0.91,1];
      const b=0.3+rand()*0.7; winCols.push(c[0]*b, c[1]*b, c[2]*b);
    }
    const wg=new THREE.BufferGeometry();
    wg.setAttribute('position', new THREE.Float32BufferAttribute(winPts,3));
    wg.setAttribute('color', new THREE.Float32BufferAttribute(winCols,3));
    cg.add(new THREE.Points(wg, new THREE.PointsMaterial({ size:0.07, vertexColors:true, transparent:true,
      opacity:0.95, blending:THREE.AdditiveBlending, depthWrite:false })));
    // 空中交通层：两条高架真空管道斜穿城市上空（参考图6）
    addSkyway(cg, new THREE.Vector3(-4.6, 1.6, -3.2), new THREE.Vector3(4.8, 2.2, 3.0), 1.6);
    addSkyway(cg, new THREE.Vector3(-5.4, 2.0, 2.6), new THREE.Vector3(5.4, 1.7, -3.6), 1.3);
    // 第二座巨型环形地标（外环门户，参考图5.4）
    const ring2 = bRingB(1.5); ring2.rotation.z = 0.1;
    put(cg, ring2, -5.8, -4.2, 0.7);
    // 空中交通层
    for(let i=0;i<22;i++) addDrone(cg, 2.4+rand()*4.4, 2+rand()*3.5, (0.2+rand()*0.35)*(rand()>0.5?1:-1));
    cg.add(makeDome(8.0, 0.15));
  });
  // Musk 纪念碑：全城最高视觉中心
  const mon = new THREE.Group(); mon.userData.btype = 'monument';
  const plaza = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.4, 0.35, 24), matMetal);
  plaza.position.y = 0.18; mon.add(plaza);
  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 1.05, 8.2, 6), matMetal);
  spire.position.y = 4.4; mon.add(spire);
  const core = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 8.2, 6),
    new THREE.MeshBasicMaterial({ color:0x7fe7ff, transparent:true, opacity:0.2, blending:THREE.AdditiveBlending }));
  core.position.y = 4.4; mon.add(core);
  for(let i=0;i<3;i++){
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.3+i*0.6, 0.08, 8, 48), matMetal);
    ring.position.y = 2.8+i*2.0; ring.rotation.x = Math.PI/2 + (i-1)*0.26;
    mon.add(ring); animated.rings.push(ring);
  }
  const top = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 20), matCore);
  top.position.y = 8.7; mon.add(top);
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.45, 16, 8, 1, true),
    new THREE.MeshBasicMaterial({ color:0x8feaff, transparent:true, opacity:0.18, blending:THREE.AdditiveBlending, side:THREE.DoubleSide, depthWrite:false }));
  beam.position.y = 15.5; mon.add(beam);
  for(let i=0;i<6;i++){ // 广场光柱
    const a=i/6*Math.PI*2;
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,1.1,6), matCore);
    pillar.position.set(Math.cos(a)*2.1, 0.55, Math.sin(a)*2.1); mon.add(pillar);
  }
  addGlow(mon, new THREE.Vector3(0, 8.7, 0), 0x7fe7ff, 9);
  const mlabel = makeLabel('马斯克拓荒纪念碑', 10); mlabel.position.y = 10.6; mon.add(mlabel);
  mon.scale.setScalar(1.35);          // 全城最高，轨道可见
  g.add(mon); g.userData.buildings.push(mon);
  g.userData.monument = mon;
  const label = makeLabel('火星首都 · Aurelia', 11); label.position.set(0, 9.6, -6.4); g.add(label);
  animated.glows.push(addGlow(g, new THREE.Vector3(0, 4.6, 0), 0x86e8ff, 13));
  g.userData.infoKey = 'capital';
  pickables.push(g);
  addNPC(g, 'resident', 1.8, 1.2, -2.4, '陈栖', '火星居民 · Aurelia 第三代',
    ['我出生在 Aurelia 的第三号穹顶，小时候抬头只能看见一层玻璃和红色的天。',
     '那时候水比金子贵，洗澡要计时。现在好了，循环系统让我们能用上真正的淋浴。',
     '这座城市是从熔岩管里长出来的。第一批定居者住在地下，用了三十年才把穹顶盖到地表。',
     '别被外面的荒凉骗了——穹顶里有河流、有公园，还有全火星最好的咖啡。']);
}
