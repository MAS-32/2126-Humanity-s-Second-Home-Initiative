/* 太空电梯 + 轨道港
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L2009-2059，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { rand } from '../core/random.js';
import { animated, pickables, surfPointOf } from './city-system.js';
import { addGlow, matDark, matMetal, matSolar } from './materials.js';
import { CITY_SITES, marsGroup } from './terrain.js';

/* ---- 太空电梯 + 轨道空间港 ---- */
const elevatorTop = (()=> {
  const site = CITY_SITES[0];
  const surfP = surfPointOf(site);
  const topP = site.dir.clone().multiplyScalar(96);
  const len = topP.distanceTo(surfP);
  const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, len, 6),
    new THREE.MeshStandardMaterial({ color:0x9fb6c4, roughness:0.4, metalness:0.8, emissive:0x2c4a5e, emissiveIntensity:0.7 }));
  cable.position.copy(surfP).lerp(topP, 0.5);
  cable.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), site.dir);
  marsGroup.add(cable);
  const climber = new THREE.Mesh(new THREE.BoxGeometry(0.4,0.6,0.4),
    new THREE.MeshStandardMaterial({ color:0xdfe8ee, emissive:0x6ee7ff, emissiveIntensity:1.4 }));
  marsGroup.add(climber);
  animated.climber = { mesh:climber, a:surfP.clone(), b:topP.clone() };
  const st = new THREE.Group(); st.position.copy(topP);
  st.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), site.dir);
  st.add(new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.42, 10, 40).rotateX(Math.PI/2), matMetal));
  st.add(new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), matDark));
  for(let i=0;i<4;i++){
    const panel = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.06, 0.9), matSolar);
    const a = i*Math.PI/2; panel.position.set(Math.cos(a)*3.4, 0, Math.sin(a)*3.4); panel.rotation.y = -a;
    st.add(panel);
  }
  addGlow(st, new THREE.Vector3(0,0,0), 0x8fe8ff, 6);
  st.userData.infoKey = 'spaceport';
  marsGroup.add(st); pickables.push(st);
  return st;
})();

// 轨道船坞环 + 飞船
{
  const dock = new THREE.Mesh(new THREE.TorusGeometry(72, 0.22, 8, 128),
    new THREE.MeshStandardMaterial({ color:0x8a97a4, roughness:0.5, metalness:0.7, emissive:0x33506a, emissiveIntensity:0.6 }));
  dock.rotation.x = Math.PI/2 - 0.4; dock.rotation.z = 0.25;
  marsGroup.add(dock);
}
function makeShip(){
  const s = new THREE.Group();
  s.add(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 1.8, 10).rotateZ(Math.PI/2), matMetal));
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.55, 10).rotateZ(-Math.PI/2), matDark);
  nose.position.x = 1.15; s.add(nose);
  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 0.7), matDark); fin.position.x = -0.7; s.add(fin);
  addGlow(s, new THREE.Vector3(-1.05, 0, 0), 0x7fc8ff, 1.6);
  return s;
}
for(let i=0;i<6;i++){
  const ship = makeShip(); marsGroup.add(ship);
  animated.ships.push({ mesh:ship, r:78+i*8, speed:0.05+rand()*0.05, phase:rand()*Math.PI*2, tilt:0.3+i*0.22 });
}
