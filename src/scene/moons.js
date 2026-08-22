/* 火卫一 & 火卫二
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L2060-2086，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { fbm, mulberry32 } from '../core/random.js';
import { scene } from '../core/renderer.js';
import { animated } from './city-system.js';

/* ================= 火卫一 & 火卫二 ================= */
function makeMoon(radius, colorHex, seed){
  const r2 = mulberry32(seed);
  const geo = new THREE.IcosahedronGeometry(radius, 3);
  const pos = geo.attributes.position; const v = new THREE.Vector3();
  const dents = [];
  for(let i=0;i<9;i++){ dents.push({ d:new THREE.Vector3(r2()*2-1, r2()*2-1, r2()*2-1).normalize(), r:0.25+r2()*0.4, depth:0.12+r2()*0.14 }); }
  for(let i=0;i<pos.count;i++){
    v.fromBufferAttribute(pos, i);
    const dir = v.clone().normalize();
    let k = 1 + fbm(dir.x*2+seed, dir.y*2+seed, dir.z*2+seed, 3)*0.22;
    for(const c of dents){ const ang = dir.angleTo(c.d); if(ang < c.r){ k -= c.depth*(1 - ang/c.r); } }
    v.copy(dir).multiplyScalar(radius*k);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color:colorHex, roughness:0.95, metalness:0.02 }));
}
{
  const phobos = makeMoon(2.6, 0x6b615a, 101);
  const pv = new THREE.Group(); pv.add(phobos); phobos.position.set(132, 8, 0); pv.rotation.z = 0.06;
  scene.add(pv); animated.moons.push({ pivot:pv, mesh:phobos, speed:0.055, spin:0.15 });
  const deimos = makeMoon(1.6, 0x57504a, 202);
  const dv = new THREE.Group(); dv.add(deimos); deimos.position.set(-185, -14, 0); dv.rotation.z = -0.12;
  scene.add(dv); animated.moons.push({ pivot:dv, mesh:deimos, speed:0.028, spin:0.08 });
}
