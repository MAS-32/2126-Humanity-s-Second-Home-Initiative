/* 空中交通层
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L995-1015，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { rand } from '../core/random.js';
import { animated } from './city-system.js';
import { matCore, matMetal } from './materials.js';

/* ---- 空中交通层：高架真空磁悬浮管道（透明管体 + 发光导轨 + 支架 + 对向巡航车厢）——参考图6 ---- */
const matTube = new THREE.MeshPhysicalMaterial({ color:0xbfe8ff, transparent:true, opacity:0.2,
  roughness:0.08, metalness:0.1, envMapIntensity:1.4, side:THREE.DoubleSide, depthWrite:false });
function addSkyway(cg, a, b, lift){
  const mid = a.clone().add(b).multiplyScalar(0.5); mid.y += lift;
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  cg.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.085, 10), matTube));   // 透明真空管道
  cg.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.018, 6), matCore));    // 管内发光导轨
  for(const tt of [0.28, 0.72]){                                                   // 支架塔
    const p = curve.getPoint(tt);
    const sup = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, p.y, 6), matMetal);
    sup.position.set(p.x, p.y/2, p.z); cg.add(sup);
  }
  for(let k=0;k<2;k++){                                                            // 巡航车厢（对向运行）
    const pod = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.2, 4, 8),
      new THREE.MeshBasicMaterial({ color:0xdff4ff }));
    cg.add(pod);
    animated.liners.push({ mesh:pod, curve, speed:(0.05+rand()*0.03)*(k?-1:1), t:rand() });
  }
}

export { matTube, addSkyway };
