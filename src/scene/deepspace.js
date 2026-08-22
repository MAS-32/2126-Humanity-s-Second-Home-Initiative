/* 深空环境
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L2087-2174，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { rand } from '../core/random.js';
import { scene, sunDir } from '../core/renderer.js';
import { addGlow } from './materials.js';

/* ================= 深空环境（层次纵深） ================= */
function starCloud(count, rMin, rMax, size, opacity, band){
  const pos = new Float32Array(count*3), col = new Float32Array(count*3);
  const tilt = new THREE.Matrix4().makeRotationX(0.9).multiply(new THREE.Matrix4().makeRotationZ(0.5));
  const v = new THREE.Vector3();
  for(let i=0;i<count;i++){
    if(band){
      const a = rand()*Math.PI*2, rr = 1350 + (rand()+rand()-1)*130;
      v.set(Math.cos(a)*rr, (rand()+rand()-1)*70, Math.sin(a)*rr).applyMatrix4(tilt);
    } else {
      v.set(rand()*2-1, rand()*2-1, rand()*2-1).normalize().multiplyScalar(rMin + rand()*(rMax-rMin));
    }
    pos.set([v.x, v.y, v.z], i*3);
    const t = rand();
    const c = t<0.7 ? [1,1,1] : t<0.85 ? [0.75,0.85,1] : [1,0.85,0.7];
    const b = 0.5+rand()*0.5;
    col.set([c[0]*b, c[1]*b, c[2]*b], i*3);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
  geo.setAttribute('color', new THREE.BufferAttribute(col,3));
  return new THREE.Points(geo, new THREE.PointsMaterial({ size, vertexColors:true, transparent:true,
    opacity, blending:THREE.AdditiveBlending, depthWrite:false, sizeAttenuation:band, fog:false }));
}
scene.add(starCloud(6000, 1250, 1700, 1.7, 0.95, false));
scene.add(starCloud(5200, 0, 0, 3.6, 0.55, true));
// 球状星团 ×3（深空纵深）
for(let i=0;i<3;i++){
  const dir = new THREE.Vector3(rand()*2-1, rand()*2-1, rand()*2-1).normalize().multiplyScalar(1350+rand()*250);
  const n=260, cpos=new Float32Array(n*3);
  for(let j=0;j<n;j++){ cpos.set([dir.x+(rand()-0.5)*70, dir.y+(rand()-0.5)*70, dir.z+(rand()-0.5)*70], j*3); }
  const cg2=new THREE.BufferGeometry(); cg2.setAttribute('position', new THREE.BufferAttribute(cpos,3));
  scene.add(new THREE.Points(cg2, new THREE.PointsMaterial({ color:0xcfe2ff, size:2.2, transparent:true,
    opacity:0.8, blending:THREE.AdditiveBlending, depthWrite:false, fog:false })));
}

function nebulaTexture(hue, sat=70, lit=58){
  const cv=document.createElement('canvas'); cv.width=cv.height=256;
  const ctx=cv.getContext('2d');
  for(let i=0;i<16;i++){
    const x=40+rand()*176, y=40+rand()*176, r=18+rand()*72;
    const g=ctx.createRadialGradient(x,y,0,x,y,r);
    g.addColorStop(0,`hsla(${hue+rand()*44-22},${sat}%,${lit}%,.18)`);
    g.addColorStop(1,'hsla(0,0%,0%,0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r,0,7); ctx.fill();
  }
  return new THREE.CanvasTexture(cv);
}
// 多层星云：不同距离/大小/透明度 → 空间纵深
[[250,1500,900,0.7],[215,1380,620,0.55],[190,1620,1100,0.6],[25,1460,760,0.5],
 [280,1550,980,0.65],[200,1320,540,0.45],[320,1700,1150,0.5],[35,1580,820,0.4],
 [265,1420,700,0.5],[45,1660,1000,0.45]].forEach(([hue,rad,s0,op])=>{
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map:nebulaTexture(hue), transparent:true,
    opacity:op, blending:THREE.AdditiveBlending, depthWrite:false, fog:false }));
  const dir = new THREE.Vector3(rand()*2-1, (rand()*2-1)*0.55, rand()*2-1).normalize();
  sp.position.copy(dir.multiplyScalar(rad));
  const s = s0*(0.8+rand()*0.5); sp.scale.set(s, s, 1);
  scene.add(sp);
});
// 远景旋涡星系
function galaxyTexture(){
  const cv=document.createElement('canvas'); cv.width=cv.height=256;
  const ctx=cv.getContext('2d');
  const cx=128, cy=128;
  const core=ctx.createRadialGradient(cx,cy,0,cx,cy,26);
  core.addColorStop(0,'rgba(255,246,225,.95)'); core.addColorStop(1,'rgba(255,246,225,0)');
  ctx.fillStyle=core; ctx.beginPath(); ctx.arc(cx,cy,26,0,7); ctx.fill();
  for(let arm=0;arm<2;arm++){
    for(let i=0;i<380;i++){
      const t=i/380, ang=arm*Math.PI + t*4.6, rr=12+t*105;
      const x=cx+Math.cos(ang)*rr + (rand()-0.5)*8, y=cy+Math.sin(ang)*rr*0.55 + (rand()-0.5)*8;
      ctx.fillStyle=`hsla(${215+rand()*40},70%,${70+rand()*20}%,${(1-t)*0.5})`;
      ctx.fillRect(x,y,1.4,1.4);
    }
  }
  return new THREE.CanvasTexture(cv);
}
[[1480, 0.8, 0.3],[-1650, -0.4, -0.5]].forEach(([dist, ty, tz], i)=>{
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map:galaxyTexture(), transparent:true,
    opacity:0.7-i*0.2, blending:THREE.AdditiveBlending, depthWrite:false, fog:false }));
  const dir = new THREE.Vector3(i? -0.5:0.6, ty, i? 0.6:-0.5).normalize();
  sp.position.copy(dir.multiplyScalar(dist));
  sp.material.rotation = tz*2;
  const s = 300-i*80; sp.scale.set(s, s, 1);
  scene.add(sp);
});
addGlow(scene, sunDir.clone().multiplyScalar(1900), 0xfff2dd, 420).material.fog = false;   // 太阳光斑不受尘雾影响
