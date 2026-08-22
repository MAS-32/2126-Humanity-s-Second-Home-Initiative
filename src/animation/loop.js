/* 主循环
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L4551-4644，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { S } from '../core/state.js';
import { GlobalCompanion } from '../character/companion-global.js';
import { snpcBubble } from '../character/npc-dialog.js';
import { camera, composer, controls, renderer } from '../core/renderer.js';
import { updateExplore } from '../interaction/companion.js';
import { explore } from '../interaction/explore-state.js';
import { easeIO } from '../interaction/modes.js';
import { raycaster } from '../interaction/picking.js';
import { cloudMat, clouds, dust } from '../scene/atmosphere.js';
import { animated } from '../scene/city-system.js';
import { floeMat, glacierMat, iceGroup, robots } from '../scene/ice-layers.js';
import { capMat } from '../scene/polar-caps.js';
import { surfMat } from '../scene/terrain.js';
import { surface } from '../surface/common.js';
import { enterSurface, exitSurface } from '../surface/enter-exit.js';
import { updateSurface } from '../surface/update.js';

/* ================= 主循环 ================= */
const clock = new THREE.Clock();
function animate(){
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;

  if(S.camAnim){
    S.camAnim.t += dt/S.camAnim.dur;
    const k = easeIO(Math.min(S.camAnim.t, 1));
    camera.position.lerpVectors(S.camAnim.fromP, S.camAnim.toP, k);
    controls.target.lerpVectors(S.camAnim.fromT, S.camAnim.toT, k);
    if(S.camAnim.t >= 1){ const cb = S.camAnim.cb; S.camAnim = null; controls.enabled = true; if(cb) cb(); }
  }
  controls.update();


  // 透视过渡
  S.xrayCur += (S.xrayTarget - S.xrayCur)*Math.min(1, dt*3.5);
  if(Math.abs(S.xrayTarget - S.xrayCur) < 0.002) S.xrayCur = S.xrayTarget;
  iceGroup.visible = S.xrayCur > 0.02;
  surfMat.opacity = 1 - 0.8*S.xrayCur;
  capMat.opacity = 1 - 0.85*S.xrayCur;
  cloudMat.opacity = 0.55*(1 - S.xrayCur);
  glacierMat.opacity = 0.62*S.xrayCur;
  floeMat.opacity = 0.5*S.xrayCur;
  if(S.xrayCur === 0 && surfMat.transparent){ surfMat.transparent = false; surfMat.opacity = 1; surfMat.needsUpdate = true; }
  iceGroup.rotation.y += dt*0.015;
  robots.forEach((r,i)=>{ r.userData.arm.rotation.z = -0.7 + Math.sin(t*1.4+i)*0.25; });

  // 大气动态
  clouds.rotation.y += dt*0.004;
  dust.rotation.y += dt*0.006;

  // 动态元素
  animated.rings.forEach((r,i)=>{ r.rotation.z += dt*(0.25+i*0.12); });
  animated.glows.forEach((g,i)=>{ const s = g.userData.base*(1 + Math.sin(t*2+i*1.7)*0.07); g.scale.set(s, s, 1); });
  animated.drones.forEach(d=>{
    d.phase += dt*d.speed;
    d.mesh.position.set(Math.cos(d.phase)*d.r, d.y + Math.sin(t*0.8+d.phase)*0.15, Math.sin(d.phase)*d.r);
    d.mesh.rotation.y = -d.phase;
  });
  animated.pods.forEach(p=>{
    p.t = (p.t + dt*p.speed*0.15) % 1;
    if(p.kind === 'circle'){
      const a = p.t*Math.PI*2;
      p.mesh.position.set(Math.cos(a)*p.r, p.y, Math.sin(a)*p.r);
      p.mesh.rotation.y = -a;
    } else {
      const k = p.t<0.5 ? p.t*2 : 2-p.t*2;
      p.mesh.position.x = p.x0 + (p.x1-p.x0)*k;
    }
  });
  animated.liners.forEach(l=>{
    l.t = (l.t + dt*l.speed + 1) % 1;
    const tan = l.curve.getTangent(l.t);
    l.mesh.position.copy(l.curve.getPoint(l.t));
    l.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), tan.normalize());
  });
  animated.walkers.forEach(w=>{
    w.phase += dt*w.speed;
    w.mesh.position.set(w.cx + Math.cos(w.phase)*w.r, 0.3 + Math.abs(Math.sin(w.phase*6))*0.03, w.cz + Math.sin(w.phase)*w.r);
    w.mesh.rotation.y = -w.phase;
  });
  if(animated.climber){
    const k = (Math.sin(t*0.25)+1)/2;
    animated.climber.mesh.position.lerpVectors(animated.climber.a, animated.climber.b, k);
  }
  animated.ships.forEach(s=>{
    s.phase += dt*s.speed;
    const x = Math.cos(s.phase)*s.r, z = Math.sin(s.phase)*s.r;
    s.mesh.position.set(x, Math.sin(s.phase*2)*s.r*Math.sin(s.tilt)*0.2 + 8, z);
    s.mesh.rotation.y = -s.phase;
  });
  animated.moons.forEach(m=>{ m.pivot.rotation.y += dt*m.speed; m.mesh.rotation.y += dt*m.spin; });

  if(S.mode==='explore') updateExplore(dt, t);
  else if(S.mode==='surface') updateSurface(dt, t);

  composer.render();
}
animate();

/* 调试/测试钩子 */
window.__mars = { enterSurface, exitSurface, surface, snpcBubble, camera, raycaster, get mode(){ return S.mode; }, get explore(){ return explore; }, get xingda(){ return GlobalCompanion.avatar; } };
window.__errs = [];
window.addEventListener('error', e=>__errs.push(String(e.message)));

addEventListener('resize', ()=>{
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
});
