/* 进入/离开地表城市
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L4312-4387，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { S } from '../core/state.js';
import { GlobalCompanion } from '../character/companion-global.js';
import { snpcClose } from '../character/npc-dialog.js';
import { PlayerController } from '../character/player.js';
import { camera, controls, renderPass, scene } from '../core/renderer.js';
import { syncVisor, visorEl, xd, xdReset, xdSay } from '../interaction/companion.js';
import { exploreAim, exploreHud, exploreLoc } from '../interaction/explore-state.js';
import { showToast } from '../interaction/ice-view.js';
import { backBtn, flyTo, hintEl } from '../interaction/modes.js';
import { stopTour } from '../interaction/tour.js';
import { CITY_SITES } from '../scene/terrain.js';
import { buildAurelia } from './aurelia.js';
import { SURFACE_INFO, newCity, refreshSurfaceObjective, sBeacon, surface, surfaceCache } from './common.js';
import { buildHephaestus } from './hephaestus.js';
import { buildVerde } from './verde.js';
import { infoPanel } from '../ui/info-panel.js';

/* ---------- 进入 / 离开地表城市 ---------- */
const SURFACE_BUILDERS = { capital:buildAurelia, eco:buildVerde, industrial:buildHephaestus };
function enterSurface(id){
  if(S.mode === 'surface' || !SURFACE_BUILDERS[id]) return;
  stopTour(); S.camAnim = null; S.landing = false;
  if(!surfaceCache[id]){
    const city = newCity(id);
    SURFACE_BUILDERS[id](city);
    sBeacon(city);
    surfaceCache[id] = city;
  }
  const city = surfaceCache[id];
  surface.id = id; surface.city = city;
  surface.talked.clear(); snpcClose();
  city.guide.forEach(g=>g.seen=false);          // 向导地标：本次进入重新可触发
  city.npcs.forEach(n=>{ n.introSeen=false; }); // NPC 介绍：本次进入重新可触发
  surface.guideCD = 0; surface.idleT = 0;
  // Global Companion：进入任何城市自动加载同一只星达（地表真实尺度 ×1）
  surface.avatar = GlobalCompanion.mount(city.scene, 1);
  if(!surface.player) surface.player = new PlayerController(surface.avatar);
  surface.avatar.setVisible(true);
  surface.player.teleport(city.spawn.x, city.spawn.z, city.spawn.yaw);
  surface.player.third = true; surface.player.dist = 5.4;
  surface.player.pitch = -0.22;   // 微俯视：星达周围地面可见，点击任意可见地面即可移动
  // 模式与渲染切换
  S.mode = 'surface'; S.currentCity = null;
  controls.enabled = false; controls.autoRotate = false;
  renderPass.scene = city.scene;
  camera.up.set(0,1,0);
  camera.fov = 50; camera.updateProjectionMatrix();
  // HUD
  backBtn.style.display = 'none';
  document.getElementById('nav').style.display = 'none';
  document.getElementById('actions').style.display = 'none';
  document.getElementById('stats').style.display = 'none';
  document.getElementById('titleBox').style.display = 'none';
  infoPanel.style.display = 'none'; surface.tabOpen = false;
  hintEl.style.display = 'none';
  exploreHud.classList.add('on');
  exploreLoc.textContent = SURFACE_INFO[id].name + ' · 地表';
  document.getElementById('exploreHint').textContent =
    'W A S D / 点击地面 移动 · 拖动 环视 · Shift 加速 · 空格 跳跃 · E 交互/交谈 · V 视角 · Tab 城市档案';
  syncVisor();
  xdReset();
  if(xd.char) xd.char.visible = false;   // 玩家就是星达，同伴模型不出场（独白保留）
  refreshSurfaceObjective();
  showToast('已着陆 · ' + SURFACE_INFO[id].name);
  xdSay(city.intro);
}
function exitSurface(){
  if(S.mode !== 'surface') return;
  S.mode = 'planet';
  const city = surface.city;
  surface.avatar.detach();
  snpcClose(); xdReset();
  exploreHud.classList.remove('on');
  exploreAim.classList.remove('on');
  visorEl.classList.remove('on');
  camera.fov = 48; camera.updateProjectionMatrix();
  renderPass.scene = scene;
  surface.id = null; surface.city = null;
  document.getElementById('nav').style.display = '';
  document.getElementById('actions').style.display = '';
  document.getElementById('stats').style.display = '';
  document.getElementById('titleBox').style.display = '';
  infoPanel.style.display = '';
  hintEl.style.display = '';
  hintEl.textContent = '拖动旋转 · 滚轮缩放 · 点击城市进入';
  controls.minDistance = 64; controls.maxDistance = 700;
  controls.target.set(0,0,0);
  // 回到该城市上空的轨道视角
  const site = CITY_SITES.find(s=>s.id === (city ? city.id : 'capital')) || CITY_SITES[0];
  flyTo(site.dir.clone().multiplyScalar(170).add(new THREE.Vector3(0,40,0)), new THREE.Vector3(0,0,0), 2.2,
    ()=>{ controls.autoRotate = true; });
}

export { SURFACE_BUILDERS, enterSurface, exitSurface };
