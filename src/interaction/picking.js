/* 点击拾取
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L2937-3023，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { S } from '../core/state.js';
import { camera, controls, renderer } from '../core/renderer.js';
import { XD_CLICK, xd, xdBlink, xdEmotePlay, xdGaze, xdSay } from './companion.js';
import { explore } from './explore-state.js';
import { backBtn, enterCity, flyTo, hintEl } from './modes.js';
import { stopTour } from './tour.js';
import { cityGroups, pickables } from '../scene/city-system.js';
import { marsSurface } from '../scene/terrain.js';
import { surface } from '../surface/common.js';
import { SURFACE_BUILDERS, enterSurface } from '../surface/enter-exit.js';
import { showBuilding, showInfo } from '../ui/info-panel.js';

/* ---------- 点击 ---------- */
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const _groundPlane = new THREE.Plane(new THREE.Vector3(0,1,0), 0);   // 地表 y=0 平面
const _clickPt = new THREE.Vector3();
let downPos = null;
renderer.domElement.addEventListener('pointerdown', e=>{ downPos=[e.clientX,e.clientY]; S.xdIdleT = 0; });
renderer.domElement.addEventListener('pointerup', e=>{
  if(!downPos) return;
  const moved = Math.hypot(e.clientX-downPos[0], e.clientY-downPos[1]);
  downPos = null;
  if(moved > 6 || S.camAnim) return;
  pointer.set(e.clientX/innerWidth*2-1, -(e.clientY/innerHeight)*2+1);
  raycaster.setFromCamera(pointer, camera);


  if(S.mode === 'city' && S.currentCity){
    const hits = raycaster.intersectObjects(S.currentCity.userData.buildings, true);
    if(hits.length){
      let o = hits[0].object;
      while(o && !o.userData.btype) o = o.parent;
      if(o) showBuilding(o.userData.btype, S.currentCity.userData.buildings.indexOf(o)+1);
    }
    return;
  }
  if(S.mode === 'explore'){
    // 点击星达：即时反馈（看向玩家 · 眨眼 · 表情动作 · 说话）
    if(xd.char && xd.char.visible){
      raycaster.setFromCamera(pointer, camera);
      const xh = raycaster.intersectObject(xd.char, true);
      if(xh.length && xh[0].distance < 3){
        xdGaze.target.copy(camera.position); xdGaze.timer = 3;
        xdBlink.phase = 0.18;
        xdEmotePlay(['wave','happy','confused'][Math.floor(Math.random()*3)]);
        xdSay(XD_CLICK[Math.floor(Math.random()*XD_CLICK.length)]);
      }
    }
    // 点击火星地表 → Raycaster 打地形取交点，星达沿地表走向该点（X/Z 由地表对齐保持直立，仅偏航转向）
    raycaster.setFromCamera(pointer, camera);
    const gh = raycaster.intersectObject(marsSurface, false);
    if(gh.length) explore.clickDir = gh[0].point.clone().normalize();
    return;
  }
  if(S.mode === 'surface'){
    // 点击地面 → Raycaster 命中真实地面网格；目标保存后由 PlayerController 持续移动
    if(surface.player && surface.city){
      let hitGround = false;
      if(surface.city.groundMesh){
        const gh = raycaster.intersectObject(surface.city.groundMesh, false);
        if(gh.length){ _clickPt.copy(gh[0].point); hitGround = true; }
      } else if(raycaster.ray.intersectPlane(_groundPlane, _clickPt)){
        hitGround = true;                          // 老城市数据兜底：无地面网格时用 y=0 平面
      }
      if(hitGround) surface.player.setClickTarget(_clickPt.x, _clickPt.z, surface.city.colliders, surface.city.bounds);
    }
    return;
  }
  // 星球模式：点击城市 → 飞入
  const hits = raycaster.intersectObjects(pickables, true);
  if(hits.length){
    let o = hits[0].object;
    while(o && !o.userData.infoKey && !o.userData.btype) o = o.parent;
    if(!o) return;
    if(o.userData.btype === 'monument'){          // 纪念碑特写
      showBuilding('monument', 1);
      const m = new THREE.Vector3(); o.getWorldPosition(m);
      stopTour(); S.mode='city'; S.currentCity = cityGroups.capital;
      flyTo(m.clone().multiplyScalar(1.24).add(new THREE.Vector3(0,7,0)), m, 2.4, ()=>{
        controls.minDistance = 1.2; controls.maxDistance = 60;
        backBtn.style.display = 'block';
        hintEl.textContent = '拖动环视城市 · 滚轮缩放 · 点击建筑查看';
      });
      return;
    }
    if(o.userData.infoKey === 'spaceport'){
      showInfo('spaceport');
      const p = new THREE.Vector3(); o.getWorldPosition(p);
      stopTour();
      flyTo(p.clone().multiplyScalar(1.32).add(new THREE.Vector3(0,10,0)), p, 2.4,
        ()=>{ controls.autoRotate = true; });
      return;
    }
    if(o.userData.infoKey){
      stopTour();
      // 三座核心城市：真正装载独立地表场景（LOAD REAL SURFACE SCENE，非相机变焦）
      if(SURFACE_BUILDERS[o.userData.infoKey]){ enterSurface(o.userData.infoKey); return; }
      enterCity(o, o.userData.infoKey);
    }
  }
});

export { raycaster };
