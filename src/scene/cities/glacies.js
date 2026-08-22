/* 城市4 Glacies
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L1608-1644，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { rand } from '../../core/random.js';
import { bEnergyTree, tagBuilding } from '../buildings.js';
import { anchorCity, animated, instanced, pickables, put } from '../city-system.js';
import { addGlow, makeDome, makeLabel, matDark, matFactory, matMetal, matWarm, matWhite } from '../materials.js';
import { CITY_SITES } from '../terrain.js';

/* ---- 4. 冰川矿城 Glacies ---- */
{
  const g = anchorCity(CITY_SITES[3], 5.0, cg=>{
    for(let i=0;i<2;i++){
      const rig = new THREE.Group(); const x = i*2.6-1.3;
      for(let l=0;l<3;l++){ const a=l/3*Math.PI*2;
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,1.9,6), matMetal);
        leg.position.set(x+Math.cos(a)*0.46, 0.9, Math.sin(a)*0.46);
        leg.rotation.z = Math.cos(a)*0.32; leg.rotation.x = -Math.sin(a)*0.32; rig.add(leg); }
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.44,0.44,0.44), matFactory); head.position.set(x,1.9,0); rig.add(head);
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.13,0.13,6.2,8), matMetal); pipe.position.set(x,-1.2,0); rig.add(pipe);
      addGlow(rig, new THREE.Vector3(x,-3.9,0), 0x5fd0ff, 2.4);
      cg.add(tagBuilding(rig,'drill')); cg.userData.buildings.push(rig);
    }
    const habs = [];
    for(let i=0;i<6;i++){ const a=rand()*Math.PI*2, rr=1.8+rand()*1.6;
      habs.push({ p:new THREE.Vector3(Math.cos(a)*rr, 0.32, Math.sin(a)*rr), s:new THREE.Vector3(0.75,0.6,0.55), ry:rand()*3 }); }
    cg.add(instanced(new THREE.BoxGeometry(1,1,1), matWarm, habs));
    // 地表巡视机器人
    for(let i=0;i<3;i++){
      const rov = new THREE.Group();
      const bd = new THREE.Mesh(new THREE.BoxGeometry(0.3,0.14,0.2), matWhite); rov.add(bd);
      for(let wx=-1;wx<=1;wx+=2) for(let wz=-1;wz<=1;wz+=2){
        const wh = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,0.04,8).rotateX(Math.PI/2), matDark);
        wh.position.set(wx*0.12,-0.09,wz*0.08); rov.add(wh); }
      const a=rand()*Math.PI*2; rov.position.set(Math.cos(a)*3.2, 0.12, Math.sin(a)*3.2);
      cg.add(rov);
    }
    const d = makeDome(1.7, 0.2); d.position.set(3.0, 0, 2.0); cg.add(d);
    put(cg, bEnergyTree(1.3), -2.8, 2.4);
    const label = makeLabel('冰川矿城 · Glacies', 9); label.position.set(0, 4.4, 0); cg.add(label);
    animated.glows.push(addGlow(cg, new THREE.Vector3(0, 2.4, 0), 0x6fc8ff, 8));
  });
  g.userData.infoKey = 'mining';
  pickables.push(g);
}
