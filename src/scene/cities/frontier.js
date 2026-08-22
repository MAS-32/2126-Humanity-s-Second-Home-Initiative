/* 城市5 Frontier
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L1645-1662，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { rand } from '../../core/random.js';
import { bBio, bEnergyTree, bSpire, bStack } from '../buildings.js';
import { addDrone, anchorCity, animated, pickables, put } from '../city-system.js';
import { addGlow, makeDome, makeLabel, matEco } from '../materials.js';
import { CITY_SITES } from '../terrain.js';

/* ---- 5. 前哨城 Frontier ---- */
{
  const g = anchorCity(CITY_SITES[4], 4.4, cg=>{
    cg.add(makeDome(3.2, 0.16));
    put(cg, bSpire(1.7), -0.8, 0.5); put(cg, bBio(1.5, 0.4), 0.9, -0.7, 0.8);
    put(cg, bStack(0.45, 1.2), 1.3, 1.1); put(cg, bStack(0.4, 1.0), -1.4, -1.0);
    put(cg, bSpire(1.3, 0.24), 0.2, -1.6); put(cg, bBio(1.2, 0.36), -1.8, 1.2, 2.2);
    put(cg, bEnergyTree(1.3), 2.4, 0.4); put(cg, bEnergyTree(1.1), -2.4, -0.4);
    const gr = new THREE.Mesh(new THREE.CircleGeometry(0.8, 18).rotateX(-Math.PI/2), matEco);
    gr.position.set(0.2, 0.04, 1.6); cg.add(gr);
    for(let i=0;i<5;i++) addDrone(cg, 1+rand()*1.8, 1+rand()*1.6, 0.3+rand()*0.3);
    const label = makeLabel('前哨城 · Frontier', 9); label.position.set(0, 4.6, 0); cg.add(label);
    animated.glows.push(addGlow(cg, new THREE.Vector3(0, 2.6, 0), 0x9fe0ff, 8));
  });
  g.userData.infoKey = 'frontier';
  pickables.push(g);
}
