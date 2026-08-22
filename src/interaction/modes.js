/* 模式管理：星球/城市
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L2204-2242，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { S } from '../core/state.js';
import { camera, controls } from '../core/renderer.js';
import { capViewPos } from '../scene/terrain.js';
import { showInfo } from '../ui/info-panel.js';

/* ---------- 模式管理：星球 / 城市 ---------- */
/* mode → S.mode（见 core/state.js） */
/* currentCity → S.currentCity */
const backBtn = document.getElementById('backBtn');
const hintEl = document.getElementById('hint');

/* camAnim → S.camAnim */
const easeIO = t => t<0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;
function flyTo(pos, target, dur=2.2, cb){
  S.camAnim = { t:0, dur, fromP:camera.position.clone(), toP:pos.clone(),
    fromT:controls.target.clone(), toT:target.clone(), cb };
  controls.enabled = false; controls.autoRotate = false;
}
function cityView(cityG){
  const r = cityG.userData.radius;
  const pos = cityG.localToWorld(new THREE.Vector3(r*1.55, r*0.95, r*1.55));
  const tg  = cityG.localToWorld(new THREE.Vector3(0, r*0.28, 0));
  return { pos, tg };
}
function enterCity(cityG, key){
  if(key) showInfo(key);
  const v = cityView(cityG);
  S.mode = 'city'; S.currentCity = cityG;
  flyTo(v.pos, v.tg, 2.6, ()=>{
    controls.minDistance = 1.2;
    controls.maxDistance = cityG.userData.radius * 7;
    backBtn.style.display = 'block';
    hintEl.textContent = '拖动环视城市 · 滚轮缩放 · 点击建筑查看';
  });
}
function exitCity(){
  S.mode = 'planet'; S.currentCity = null;
  backBtn.style.display = 'none';
  hintEl.textContent = '拖动旋转 · 滚轮缩放 · 点击城市进入';
  controls.minDistance = 64; controls.maxDistance = 700;
  flyTo(capViewPos.clone().add(new THREE.Vector3(0,20,15)), new THREE.Vector3(0,0,0), 2.4, ()=>{ controls.autoRotate = true; });
}
backBtn.onclick = exitCity;

export { backBtn, hintEl, easeIO, flyTo, enterCity, exitCity };
