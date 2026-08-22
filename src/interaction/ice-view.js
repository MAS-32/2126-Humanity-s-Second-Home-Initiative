/* 地下水冰透视
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L3046-3078，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { S } from '../core/state.js';
import { controls } from '../core/renderer.js';
import { backBtn, flyTo, hintEl } from './modes.js';
import { stopTour } from './tour.js';
import { capViewPos, surfMat } from '../scene/terrain.js';
import { infoPanel } from '../ui/info-panel.js';

/* ---------- 地下水冰透视 ---------- */
/* xrayTarget / xrayCur → S.*（地下水冰透视过渡量） */
const btnIce = document.getElementById('btnIce');
btnIce.onclick = ()=>{
  S.xrayTarget = S.xrayTarget ? 0 : 1;
  btnIce.classList.toggle('on', !!S.xrayTarget);
  if(S.xrayTarget){
    surfMat.transparent = true; surfMat.needsUpdate = true;
    showToast('地下水冰透视：基岩 / 冰川层 / 储水区');
    infoPanel.innerHTML = `<h3>地下水冰系统</h3><p>透视显示火星地下结构：深褐基岩层、带冰裂纹的连续冰川层、浅层浮冰与深层液态储水区。Glacies 矿城正下方可见采冰机器人与地下采矿基地——2126 年火星文明的生命线。</p>
      <div class="npc"><b>地质学家 · 岩</b><br>"选火星不是因为它是红色的——是因为红色下面，藏着足够多的水。"</div>`;
  }
};

document.getElementById('btnReset').onclick = ()=>{
  stopTour(); S.xrayTarget = 0; btnIce.classList.remove('on');
  S.mode='planet'; S.currentCity=null; backBtn.style.display='none';
  controls.minDistance=64; controls.maxDistance=700;
  hintEl.textContent = '拖动旋转 · 滚轮缩放 · 点击城市进入';
  flyTo(capViewPos.clone(), new THREE.Vector3(0,0,0), 2, ()=>{ controls.autoRotate = true; });
};

const toast = document.getElementById('toast');
let toastTimer = null;
function showToast(msg){
  toast.textContent = msg; toast.style.opacity = 1;
  if(toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toast.style.opacity = 0, 2200);
}
document.querySelectorAll('#nav button[data-nav]').forEach(b=>{
  b.onclick = ()=>showToast(b.dataset.nav==='earth' ? '地球章节：由队友页面接入' : '月球章节：由队友页面接入');
});

export { showToast };
