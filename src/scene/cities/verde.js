/* 城市2 Verde
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L1371-1468，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { rand } from '../../core/random.js';
import { bBio, bFloat, bRingB, bSpire, bStack, tagBuilding } from '../buildings.js';
import { addDrone, anchorCity, animated, instanced, pickables, put } from '../city-system.js';
import { addGlow, domeMat, makeDome, makeLabel, matEco, matLake, matLeaf2, matWhite } from '../materials.js';
import { CITY_SITES } from '../terrain.js';

/* ---- 2. 翡绿生态城 Verde（火星新加坡） ---- */
{
  const g = anchorCity(CITY_SITES[2], 6.2, cg=>{
    // 主穹顶：森林 + 摩天生态塔 + 运河
    const forestFloor = new THREE.Mesh(new THREE.CircleGeometry(4.4, 40).rotateX(-Math.PI/2), matEco);
    forestFloor.position.y = 0.02; cg.add(forestFloor);
    const trees = [];
    for(let i=0;i<220;i++){
      const a=rand()*Math.PI*2, rr=0.6+Math.sqrt(rand())*3.6, h=0.14+rand()*0.26;
      trees.push({ p:new THREE.Vector3(Math.cos(a)*rr, h/2+0.04, Math.sin(a)*rr), s:new THREE.Vector3(0.06+rand()*0.04,h,0.06+rand()*0.04) });
    }
    cg.add(instanced(new THREE.ConeGeometry(1,1,7), matLeaf2, trees));
    const flowers = [];
    for(let i=0;i<80;i++){
      const a=rand()*Math.PI*2, rr=Math.sqrt(rand())*3.8;
      flowers.push({ p:new THREE.Vector3(Math.cos(a)*rr, 0.05, Math.sin(a)*rr), s:new THREE.Vector3(0.1,0.02,0.1) });
    }
    cg.add(instanced(new THREE.CylinderGeometry(1,1,1,8),
      new THREE.MeshStandardMaterial({ color:0xe88bb0, emissive:0xb0456f, emissiveIntensity:0.6, roughness:0.8 }), flowers));
    const canal = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.16, 8, 56).rotateX(Math.PI/2), matLake);
    canal.position.y = 0.06; cg.add(tagBuilding(canal, 'canal')); cg.userData.buildings.push(canal);
    const lake = new THREE.Mesh(new THREE.CircleGeometry(0.9, 24).rotateX(-Math.PI/2), matLake);
    lake.position.set(1.6, 0.07, 1.2); cg.add(lake);
    // 生态塔群
    put(cg, bBio(2.6, 0.55), -1.2, -1.4);
    put(cg, bBio(2.1, 0.5), 1.8, -1.8, 1.2);
    put(cg, bBio(2.2, 0.5), -2.6, -2.2, 2.1);
    put(cg, bSpire(2.4, 0.3), 0.4, -2.6);
    put(cg, bSpire(1.9, 0.26), 2.6, -0.6);
    put(cg, bStack(0.55, 1.5), -2.4, 1.6);
    put(cg, bRingB(0.75), -3.2, 0.6);
    put(cg, bFloat(0.5, 2.0), 1.2, 2.2);
    // 垂直农场
    const farm = new THREE.Group();
    for(let i=0;i<6;i++){
      const shelf = new THREE.Mesh(new THREE.CylinderGeometry(0.55-i*0.05, 0.55-i*0.05, 0.1, 14),
        new THREE.MeshStandardMaterial({ color:0x3fae6f, emissive:0x2f9e5f, emissiveIntensity:0.9, roughness:0.7 }));
      shelf.position.y = 0.25+i*0.32; farm.add(shelf);
    }
    farm.position.set(-0.6, 0, 2.8); cg.add(tagBuilding(farm, 'farm')); cg.userData.buildings.push(farm);
    // 水循环塔
    const wt = new THREE.Group();
    const wbody = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.42, 1.9, 10), matWhite); wbody.position.y=0.95; wt.add(wbody);
    for(let i=0;i<3;i++){
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.035, 6, 20).rotateX(Math.PI/2), matLake);
      ring.position.y = 0.5+i*0.55; wt.add(ring);
    }
    wt.position.set(2.9, 0, 2.4); cg.add(tagBuilding(wt, 'watertower')); cg.userData.buildings.push(wt);
    const dome1 = makeDome(4.6, 0.16); cg.add(dome1);
    // 副穹顶（温室）
    [[5.6,1.4,2.2],[-4.6,3.4,1.8]].forEach(([x,z,r])=>{
      const d = makeDome(r, 0.2); d.position.set(x,0,z); cg.add(d);
      const veg = new THREE.Mesh(new THREE.SphereGeometry(r*0.8, 16, 10, 0, Math.PI*2, 0, Math.PI/2), matEco);
      veg.scale.y = 0.42; veg.position.set(x, 0.03, z); cg.add(veg);
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.2,Math.hypot(x,z),10), domeMat(0.28));
      tube.position.set(x/2, 0.32, z/2); tube.rotation.z = Math.PI/2; tube.rotation.y = -Math.atan2(z, x);
      cg.add(tube);
    });
    // 温室链（三座链式温室穹顶）
    [[3.4,-4.8],[5.2,-4.0],[7.0,-2.8]].forEach(([x,z])=>{
      const d=makeDome(1.5,0.2); d.position.set(x,0,z); cg.add(d);
      const crop=new THREE.Mesh(new THREE.SphereGeometry(1.15,14,8,0,Math.PI*2,0,Math.PI/2), matLeaf2);
      crop.scale.y=0.4; crop.position.set(x,0.03,z);
      cg.add(tagBuilding(crop,'agri')); cg.userData.buildings.push(crop);
      const tube=new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.16,Math.hypot(x,z),8), domeMat(0.28));
      tube.position.set(x/2,0.3,z/2); tube.rotation.z=Math.PI/2; tube.rotation.y=-Math.atan2(z,x);
      cg.add(tube);
    });
    // 外部环形农田 + 灌溉管网
    [[8.2,1.5],[6.8,6.2],[-7.6,4.4]].forEach(([x,z])=>{
      const ring=new THREE.Mesh(new THREE.CylinderGeometry(1.3,1.3,0.08,24),
        new THREE.MeshStandardMaterial({ color:0x3fae6f, emissive:0x2f9e5f, emissiveIntensity:0.8, roughness:0.8 }));
      ring.position.set(x,0.06,z); cg.add(tagBuilding(ring,'cropring')); cg.userData.buildings.push(ring);
      const ir=new THREE.Mesh(new THREE.TorusGeometry(0.8,0.05,6,28).rotateX(Math.PI/2), matLake);
      ir.position.set(x,0.14,z); cg.add(ir);
      const len=Math.hypot(x,z);
      const pipe=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.06,len,6),
        new THREE.MeshStandardMaterial({ color:0x3a6a8a, emissive:0x1a6fc0, emissiveIntensity:0.8, roughness:0.4, metalness:0.5 }));
      pipe.position.set(x/2,0.1,z/2); pipe.rotation.z=Math.PI/2; pipe.rotation.y=-Math.atan2(z,x);
      cg.add(tagBuilding(pipe,'watertower')); cg.userData.buildings.push(pipe);
    });
    // 扩展垂直农场 + 水循环塔
    [[2.2,3.4],[-3.0,2.6]].forEach(([x,z])=>{
      const f2=farm.clone(); f2.position.set(x,0,z);
      cg.add(tagBuilding(f2,'farm')); cg.userData.buildings.push(f2);
    });
    [[-3.6,-3.4],[4.2,3.2]].forEach(([x,z])=>{
      const wt2=wt.clone(); wt2.position.set(x,0,z);
      cg.add(tagBuilding(wt2,'watertower')); cg.userData.buildings.push(wt2);
    });
    for(let i=0;i<14;i++) addDrone(cg, 1.5+rand()*4, 1.2+rand()*2.4, (0.25+rand()*0.3)*(rand()>0.5?1:-1), 0x8fffBE);
  });
  const label = makeLabel('翡绿生态城 · Verde', 10); label.position.set(0, 6.4, 0); g.add(label);
  animated.glows.push(addGlow(g, new THREE.Vector3(0, 3, 0), 0x7dffb0, 10));
  g.userData.infoKey = 'eco';
  pickables.push(g);
}
