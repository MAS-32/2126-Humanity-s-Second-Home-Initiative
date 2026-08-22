/* 地表主更新
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L4388-4550，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { S } from '../core/state.js';
import { snpcAnswer, snpcBubble, snpcClose, snpcOptions } from '../character/npc-dialog.js';
import { clamp } from '../core/random.js';
import { camera, renderer } from '../core/renderer.js';
import { mapKey, syncVisor, xd, xdSay } from '../interaction/companion.js';
import { aimD, aimT, exploreAim } from '../interaction/explore-state.js';
import { showToast } from '../interaction/ice-view.js';
import { SURFACE_INFO, surface, xdDialogueTick } from './common.js';
import { infoPanel } from '../ui/info-panel.js';

/* ---------- 地表主更新 ---------- */
const _sv = new THREE.Vector3();
function updateSurface(dt, t){
  const city = surface.city, player = surface.player;
  if(!city || !player) return;
  player.update(dt, city.colliders, city.bounds);
  player.updateCamera(camera, dt, city.colliders);
  // 城市动画件
  for(const fn of city.ticks) fn(dt, t);
  // 行人
  for(const w of city.walkers){
    w.phase += dt*w.speed;
    w.mesh.position.set(w.cx + Math.cos(w.phase)*w.r, Math.abs(Math.sin(w.phase*6))*0.03, w.cz + Math.sin(w.phase)*w.r);
    w.mesh.rotation.y = -w.phase;
  }
  // 光柱脉动
  if(city.beacon && city.beacon.visible){
    city.beacon.material.opacity = 0.08 + Math.sin(t*2.4)*0.04;
    city.beacon.rotation.y += dt*0.4;
  }
  // 交互点（先算：交互范围内不弹 NPC 气泡，避免对话抢占 E 导致设施永远点不动）
  let ni = null, nid = 4.2;
  for(const it of city.interact){
    const d = Math.hypot(player.pos.x - it.x, player.pos.z - it.z);
    if(d < (it.r || nid) && d < nid){ nid = d; ni = it; }
  }
  surface.nearInteract = ni;
  // —— 星达向导：靠近重要建筑自动解说一句（每地每次进入一次，全局冷却 + 等对话播完，不刷屏）——
  surface.guideCD = Math.max(0, (surface.guideCD||0) - dt);
  if(surface.guideCD <= 0 && !xd.queue.length && surface.snpcMode === 'none'){
    for(const g of city.guide){
      if(g.seen) continue;
      if(Math.hypot(player.pos.x-g.x, player.pos.z-g.z) < g.r){
        g.seen = true; xdSay(g.text); surface.guideCD = 7; break;
      }
    }
  }
  // —— 星达向导：停留过久偶尔提醒（低频；移动/对话播放/NPC交谈中不打扰）——
  if(player.vel.lengthSq() > 0.3 || surface.snpcMode !== 'none' || xd.queue.length) surface.idleT = 0;
  else surface.idleT = (surface.idleT||0) + dt;
  if(surface.idleT > 28 && !xd.queue.length){
    surface.idleT = 0;
    xdSay(city.idleHint || '附近还有地方值得看看。跟着我，或者随便逛逛。');
  }
  // NPC：工作动作（手臂摆动+身体起伏）· 简单移动（绕锚点踱步）· 面向玩家 · 星达介绍
  let nearest = null, nd = 3.6;
  for(const n of city.npcs){
    // 工作动作：手臂交替摆动 + 身体轻微起伏，站着也像在干活
    n.workPhase += dt;
    const arms = n.mesh.userData.arms;
    if(arms){
      arms[0].rotation.x = Math.sin(n.workPhase*1.6)*0.35;
      arms[1].rotation.x = Math.sin(n.workPhase*1.6+1.2)*0.35;
    }
    n.mesh.position.y = Math.abs(Math.sin(n.workPhase*2))*0.02;
    const d = Math.hypot(player.pos.x - n.x, player.pos.z - n.z);
    // 简单移动：玩家不在近旁时绕锚点小范围踱步，靠近则停步招呼
    if(n.wander > 0 && d > 6){
      n.movePhase += dt * n.wanderSpeed;
      n.x = n.hx + Math.cos(n.movePhase)*n.wander;
      n.z = n.hz + Math.sin(n.movePhase)*n.wander;
      n.mesh.position.x = n.x; n.mesh.position.z = n.z;
      if(d >= 8){
        const ty = Math.atan2(-Math.sin(n.movePhase), Math.cos(n.movePhase));   // 朝移动方向
        let dyy = ty - n.mesh.rotation.y;
        while(dyy > Math.PI) dyy -= Math.PI*2; while(dyy < -Math.PI) dyy += Math.PI*2;
        n.mesh.rotation.y += dyy * Math.min(1, dt*3);
      }
    }
    // 面向玩家（靠近时优先，覆盖踱步朝向）
    if(d < 8){
      _sv.set(player.pos.x - n.x, 0, player.pos.z - n.z);
      const ty = Math.atan2(_sv.x, _sv.z);
      let dy = ty - n.mesh.rotation.y;
      while(dy > Math.PI) dy -= Math.PI*2; while(dy < -Math.PI) dy += Math.PI*2;
      n.mesh.rotation.y += dy * Math.min(1, dt*5);
    }
    if(d < nd){ nd = d; nearest = n; }
    // 星达介绍：首次走近某个 NPC，星达主动介绍一句（冷却 + 等对话播完，不刷屏）
    if(n.xdIntro && !n.introSeen && d < 6){
      if(surface.guideCD <= 0 && !xd.queue.length && surface.snpcMode === 'none'){
        n.introSeen = true; xdSay(n.xdIntro); surface.guideCD = 6;
      }
    }
  }
  if(!ni){
    if(nearest){
      if(surface.snpc !== nearest && surface.snpcMode === 'none') snpcBubble(nearest);
      else if(surface.snpc !== nearest && surface.snpc) snpcBubble(nearest);
    }
  }
  if(surface.snpc && Math.hypot(player.pos.x - surface.snpc.x, player.pos.z - surface.snpc.z) > 4.6){
    snpcClose();
  }
  if(ni && surface.snpcMode === 'none'){
    const ok = !ni.enabledFn || ni.enabledFn();
    aimT.textContent = ni.title;
    aimD.textContent = ok ? ni.prompt : (ni.lockedText || '需要先完成前置步骤。');
    exploreAim.classList.add('on');
  } else if(surface.snpcMode === 'none'){
    exploreAim.classList.remove('on');
  }
  xdDialogueTick(dt);
}
/* 地表输入：E 交互/对话 · V 视角 · Tab 档案 · 1/2/3 选项 · 空格跳跃 */
window.addEventListener('keydown', e=>{
  if(S.mode !== 'surface') return;
  if(e.repeat) return;   // 忽略长按重复：E/V/Tab 只在首次按下触发
  const k = mapKey(e.key);
  if(window.__klog) __klog.push(k + '@' + surface.snpcMode);
  if(k === 'v'){
    surface.player.third = !surface.player.third;
    surface.avatar.setVisible(surface.player.third);
    syncVisor();
  }
  if(k === ' '){ surface.player.jump(); e.preventDefault(); }
  if(k === 'tab'){
    e.preventDefault();
    surface.tabOpen = !surface.tabOpen;
    if(surface.tabOpen){
      const info = SURFACE_INFO[surface.id];
      infoPanel.innerHTML = `<h3>${info.name}</h3><p>${info.tab}</p>`;
      infoPanel.style.display = 'block';
    } else infoPanel.style.display = 'none';
  }
  if(k === 'e'){
    if(surface.snpc){
      if(surface.snpcMode === 'bubble') snpcOptions(surface.snpc);
      else if(surface.snpcMode === 'answer') snpcOptions(surface.snpc);
      else snpcClose();
      return;
    }
    const it = surface.nearInteract;
    if(it){
      if(!it.enabledFn || it.enabledFn()) it.run();
      else if(it.lockedText) showToast(it.lockedText);
    }
  }
  if(surface.snpcMode === 'opts' && ['1','2','3'].includes(k)){
    const i = parseInt(k) - 1;
    if(surface.snpc && surface.snpc.options[i]) snpcAnswer(surface.snpc, i);
  }
});
/* 地表鼠标环视 / 滚轮距离 */
let sDrag = null;
renderer.domElement.addEventListener('pointerdown', e=>{ if(S.mode==='surface') sDrag = [e.clientX, e.clientY]; });
window.addEventListener('pointermove', e=>{
  if(S.mode!=='surface' || !sDrag) return;
  surface.player.yaw += (e.clientX - sDrag[0]) * 0.0042;
  surface.player.pitch = clamp(surface.player.pitch - (e.clientY - sDrag[1]) * 0.0038, -0.5, 1.2);
  sDrag = [e.clientX, e.clientY];
});
window.addEventListener('pointerup', ()=>{ sDrag = null; });
window.addEventListener('wheel', e=>{
  if(S.mode!=='surface') return;
  const dir = Math.sign(e.deltaY);
  if(dir > 0 && !surface.player.third){ surface.player.third = true; surface.avatar.setVisible(true); syncVisor(); return; }
  surface.player.dist = clamp(surface.player.dist + dir*0.6, 2.4, 10);
  if(dir < 0 && surface.player.third && surface.player.dist <= 2.5){
    surface.player.third = false; surface.avatar.setVisible(false); surface.player.dist = 5.4; syncVisor();
  }
}, { passive:true });

export { updateSurface };
