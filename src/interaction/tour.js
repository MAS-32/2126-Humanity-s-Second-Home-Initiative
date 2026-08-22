/* 城市巡览
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L3024-3045，模块化拆分后保持行为等价。
 */
import { controls } from '../core/renderer.js';
import { enterCity, exitCity } from './modes.js';
import { cityGroups } from '../scene/city-system.js';

/* ---------- 城市巡览 ---------- */
let tourIdx = -1, tourTimer = null, tourOn = false;
const btnTour = document.getElementById('btnTour');
function stopTour(){ tourOn=false; btnTour.classList.remove('on'); if(tourTimer){ clearTimeout(tourTimer); tourTimer=null; } }
const tourList = ['capital','eco','industrial','mining','frontier','research'];
function nextStop(){
  if(!tourOn) return;
  tourIdx++;
  if(tourIdx >= tourList.length){
    stopTour(); exitCity();
    return;
  }
  const key = tourList[tourIdx];
  enterCity(cityGroups[key], key);
  tourTimer = setTimeout(nextStop, 6500);
}
btnTour.onclick = ()=>{
  if(tourOn){ stopTour(); exitCity(); }
  else { tourOn=true; btnTour.classList.add('on'); tourIdx=-1; nextStop(); }
};
controls.addEventListener('start', ()=>{ if(tourOn){ stopTour(); } });

export { stopTour };
