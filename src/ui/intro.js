/* 入场
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L3079-3084，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { controls } from '../core/renderer.js';
import { flyTo } from '../interaction/modes.js';
import { capViewPos } from '../scene/terrain.js';

/* ---------- 入场 ---------- */
document.getElementById('enterBtn').onclick = ()=>{
  document.getElementById('intro').classList.add('hide');
  flyTo(capViewPos.clone(), new THREE.Vector3(0,0,0), 3.2, ()=>{ controls.autoRotate = true; });
};
