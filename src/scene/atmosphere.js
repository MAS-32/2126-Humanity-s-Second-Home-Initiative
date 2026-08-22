/* 稀薄大气/云/尘埃
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L542-588，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { rand } from '../core/random.js';
import { R } from '../core/renderer.js';
import { marsGroup } from './terrain.js';

/* ---------- 稀薄大气：边缘辉光 + 高空云 + 尘埃 ---------- */
const atmoMat = new THREE.ShaderMaterial({
  uniforms:{ glowColor:{ value:new THREE.Color(0xff9a70) } },
  vertexShader:`varying vec3 vN; void main(){ vN = normalize(normalMatrix*normal);
    gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader:`varying vec3 vN; uniform vec3 glowColor;
    void main(){ float i = pow(0.6 - dot(vN, vec3(0.,0.,1.)), 3.0);
    gl_FragColor = vec4(glowColor,1.0)*i*0.9; }`,
  side:THREE.BackSide, blending:THREE.AdditiveBlending, transparent:true, depthWrite:false
});
marsGroup.add(new THREE.Mesh(new THREE.SphereGeometry(R*1.16, 64, 64), atmoMat));

function cloudAlphaTexture(){
  const w=1024, h=512, cv=document.createElement('canvas'); cv.width=w; cv.height=h;
  const ctx=cv.getContext('2d');
  for(let i=0;i<70;i++){
    const x=rand()*w, y=h*0.2+rand()*h*0.6;              // 中低纬度
    const len=40+rand()*160, wid=3+rand()*9, ang=(rand()-0.5)*0.6;
    ctx.save(); ctx.translate(x,y); ctx.rotate(ang);
    const g=ctx.createLinearGradient(-len/2,0,len/2,0);
    g.addColorStop(0,'rgba(255,255,255,0)');
    g.addColorStop(0.5,`rgba(255,255,255,${0.05+rand()*0.09})`);
    g.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=g;
    ctx.beginPath(); ctx.ellipse(0,0,len/2,wid,0,0,7); ctx.fill();
    ctx.restore();
  }
  return new THREE.CanvasTexture(cv);
}
const cloudMat = new THREE.MeshStandardMaterial({ color:0xe8c9b8, transparent:true, opacity:0.55,
  alphaMap:cloudAlphaTexture(), depthWrite:false, roughness:1 });
const clouds = new THREE.Mesh(new THREE.SphereGeometry(R*1.025, 96, 96), cloudMat);
marsGroup.add(clouds);

// 大气尘埃微粒
const dust = (()=> {
  const n=600, pos=new Float32Array(n*3);
  for(let i=0;i<n;i++){
    const v=new THREE.Vector3(rand()*2-1,rand()*2-1,rand()*2-1).normalize().multiplyScalar(R*(1.04+rand()*0.22));
    pos.set([v.x,v.y,v.z], i*3);
  }
  const g=new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos,3));
  const pts = new THREE.Points(g, new THREE.PointsMaterial({ color:0xd8a583, size:0.55, transparent:true,
    opacity:0.28, blending:THREE.AdditiveBlending, depthWrite:false }));
  marsGroup.add(pts); return pts;
})();

export { cloudMat, clouds, dust };
