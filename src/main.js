import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

try {

/* ================= 基础 ================= */
const R = 50;
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x02040a);

const camera = new THREE.PerspectiveCamera(48, innerWidth/innerHeight, 0.05, 8000);
camera.position.set(-40, 90, 340);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 64;
controls.maxDistance = 700;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.45;
// 电脑端：左键拖动旋转 / 滚轮缩放；移动端：单指旋转 / 双指捏合缩放
controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);   // 地表城市模式会切换 renderPass.scene
composer.addPass(renderPass);
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.5, 0.45, 0.82);
composer.addPass(bloom);
composer.addPass(new OutputPass());

const sunDir = new THREE.Vector3(0.78, 0.32, 0.54).normalize();
const sun = new THREE.DirectionalLight(0xfff0dd, 2.4);
sun.position.copy(sunDir).multiplyScalar(400);
scene.add(sun);
scene.add(new THREE.AmbientLight(0x46536a, 0.32));
scene.add(new THREE.HemisphereLight(0x8fb4d8, 0x3a2418, 0.35));

/* ---- 环境反射（IBL）：程序化火星环境贴图——金属/玻璃获得真实反射，消灭塑料感 ---- */
function makeEnvEquirect(){
  const c = document.createElement('canvas'); c.width = 1024; c.height = 512;
  const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0.0, '#04060d');   // 天顶深空
  g.addColorStop(0.42, '#0d1420');
  g.addColorStop(0.55, '#332016');  // 地平线尘光
  g.addColorStop(0.62, '#6e4126');
  g.addColorStop(0.72, '#3c2415');  // 地表反照
  g.addColorStop(1.0, '#1c100a');
  x.fillStyle = g; x.fillRect(0, 0, 1024, 512);
  const s = x.createRadialGradient(612, 206, 4, 612, 206, 95);   // 低角度暖阳（与 sunDir 同方位）
  s.addColorStop(0, 'rgba(255,236,214,1)');
  s.addColorStop(0.25, 'rgba(255,214,170,.55)');
  s.addColorStop(1, 'rgba(255,200,150,0)');
  x.fillStyle = s; x.beginPath(); x.arc(612, 206, 95, 0, 7); x.fill();
  const t = new THREE.CanvasTexture(c);
  t.mapping = THREE.EquirectangularReflectionMapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
{
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromEquirectangular(makeEnvEquirect()).texture;
  pmrem.dispose();
}

/* ================= 随机数 & 噪声 ================= */
function mulberry32(a){ return function(){ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a);
  t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
const rand = mulberry32(2126);
const clamp = (v,a,b)=>Math.max(a,Math.min(b,v));
const sstep = (a,b,x)=>{ const t = clamp((x-a)/(b-a),0,1); return t*t*(3-2*t); };

const grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
const pBase = new Uint8Array(256); for(let i=0;i<256;i++) pBase[i]=i;
for(let i=255;i>0;i--){ const j=(rand()*(i+1))|0; const t=pBase[i]; pBase[i]=pBase[j]; pBase[j]=t; }
const perm = new Uint8Array(512), permMod12 = new Uint8Array(512);
for(let i=0;i<512;i++){ perm[i]=pBase[i&255]; permMod12[i]=perm[i]%12; }
const F3=1/3, G3=1/6;
function snoise(x,y,z){
  const s=(x+y+z)*F3, i=Math.floor(x+s), j=Math.floor(y+s), k=Math.floor(z+s);
  const t=(i+j+k)*G3, x0=x-(i-t), y0=y-(j-t), z0=z-(k-t);
  let i1,j1,k1,i2,j2,k2;
  if(x0>=y0){ if(y0>=z0){i1=1;j1=0;k1=0;i2=1;j2=1;k2=0;} else if(x0>=z0){i1=1;j1=0;k1=0;i2=1;j2=0;k2=1;} else {i1=0;j1=0;k1=1;i2=1;j2=0;k2=1;} }
  else { if(y0<z0){i1=0;j1=0;k1=1;i2=0;j2=1;k2=1;} else if(x0<z0){i1=0;j1=1;k1=0;i2=0;j2=1;k2=1;} else {i1=0;j1=1;k1=0;i2=1;j2=1;k2=0;} }
  const x1=x0-i1+G3,y1=y0-j1+G3,z1=z0-k1+G3, x2=x0-i2+2*G3,y2=y0-j2+2*G3,z2=z0-k2+2*G3, x3=x0-1+3*G3,y3=y0-1+3*G3,z3=z0-1+3*G3;
  const ii=i&255, jj=j&255, kk=k&255;
  let n=0, t0=0.6-x0*x0-y0*y0-z0*z0;
  if(t0>0){ const g=grad3[permMod12[ii+perm[jj+perm[kk]]]]; t0*=t0; n+=t0*t0*(g[0]*x0+g[1]*y0+g[2]*z0); }
  let t1=0.6-x1*x1-y1*y1-z1*z1;
  if(t1>0){ const g=grad3[permMod12[ii+i1+perm[jj+j1+perm[kk+k1]]]]; t1*=t1; n+=t1*t1*(g[0]*x1+g[1]*y1+g[2]*z1); }
  let t2=0.6-x2*x2-y2*y2-z2*z2;
  if(t2>0){ const g=grad3[permMod12[ii+i2+perm[jj+j2+perm[kk+k2]]]]; t2*=t2; n+=t2*t2*(g[0]*x2+g[1]*y2+g[2]*z2); }
  let t3=0.6-x3*x3-y3*y3-z3*z3;
  if(t3>0){ const g=grad3[permMod12[ii+1+perm[jj+1+perm[kk+1]]]]; t3*=t3; n+=t3*t3*(g[0]*x3+g[1]*y3+g[2]*z3); }
  return 32*n;
}
function fbm(x,y,z,oct){ let a=0, amp=0.5, f=1; for(let o=0;o<oct;o++){ a+=amp*snoise(x*f,y*f,z*f); amp*=0.5; f*=2.03; } return a; }

/* ================= 火星地形 ================= */
const D2R = Math.PI/180;
function dirFromLatLon(lat, lon){
  const la=lat*D2R, lo=lon*D2R;
  return new THREE.Vector3(Math.cos(la)*Math.cos(lo), Math.sin(la), Math.cos(la)*Math.sin(lo));
}

const CITY_SITES = [
  { id:'capital',    lat: 14, lon: -38 },
  { id:'industrial', lat: -6, lon:  32 },
  { id:'eco',        lat: 26, lon: 102 },
  { id:'mining',     lat: 52, lon: -96 },
  { id:'frontier',   lat:-28, lon: 158 },
  { id:'research',   lat:  8, lon:-122 },   // 奥林帕斯山麓
];
CITY_SITES.forEach(c=>c.dir = dirFromLatLon(c.lat, c.lon));

// 陨石坑：大型 110 + 小型 300
const craters = [];
let guard = 0;
while(craters.length < 110 && guard++ < 4000){
  const lat = (rand()*2-1)*58, lon = rand()*360-180;
  const r = rand()>0.93 ? 6.5+rand()*4 : 0.8+Math.pow(rand(),2.4)*6;
  const d = dirFromLatLon(lat, lon);
  let ok = true;
  for(const c of CITY_SITES){ if(d.angleTo(c.dir)/D2R < r+9){ ok=false; break; } }
  if(!ok) continue;
  const depth = 0.22 + r*0.15;
  craters.push({ x:d.x, y:d.y, z:d.z, rRad:r*D2R, cosR:Math.cos(r*D2R), depth, rim:depth*0.5, peak: r>4 ? depth*0.35 : 0 });
}
guard = 0;
while(craters.length < 410 && guard++ < 6000){
  const lat = (rand()*2-1)*60, lon = rand()*360-180;
  const r = 0.25+rand()*1.3;
  const d = dirFromLatLon(lat, lon);
  let ok = true;
  for(const c of CITY_SITES){ if(d.angleTo(c.dir)/D2R < r+8){ ok=false; break; } }
  if(!ok) continue;
  const depth = 0.1 + r*0.14;
  craters.push({ x:d.x, y:d.y, z:d.z, rRad:r*D2R, cosR:Math.cos(r*D2R), depth, rim:depth*0.55, peak:0 });
}

const OLY = dirFromLatLon(18.4, -133.8);
const THA = dirFromLatLon(-2, -108);
const HEL = dirFromLatLon(-43, 69);
const DUNE = new THREE.Vector3(0.72, 0.25, 0.64).normalize();

function terrainH(dir){
  const lat = Math.asin(clamp(dir.y,-1,1))/D2R;
  const lon = Math.atan2(dir.z, dir.x)/D2R;
  let h = fbm(dir.x*2.3, dir.y*2.3, dir.z*2.3, 4)*1.7
        + fbm(dir.x*6.5+13.7, dir.y*6.5+13.7, dir.z*6.5+13.7, 3)*0.55
        + fbm(dir.x*14+47.3, dir.y*14+47.3, dir.z*14+47.3, 2)*0.28;   // 小山丘

  // 沙丘带（中纬度定向波纹）
  const duneBand = sstep(6,16,Math.abs(lat))*(1-sstep(52,62,Math.abs(lat)));
  h += 0.07*Math.sin(dir.dot(DUNE)*170 + fbm(dir.x*4+9, dir.y*4+9, dir.z*4+9, 2)*7)*duneBand;

  // 陨石坑（含坑壁阶梯纹理）
  for(let i=0;i<craters.length;i++){
    const c = craters[i];
    const dot = dir.x*c.x + dir.y*c.y + dir.z*c.z;
    if(dot < c.cosR) continue;
    const t = Math.acos(clamp(dot,-1,1)) / c.rRad;
    const rimK = (t-1)*3.2;
    h += Math.exp(-rimK*rimK) * c.rim;
    if(t < 1){
      h -= (1 - t*t) * c.depth;
      h += 0.06*Math.sin(t*22)*Math.max(0, 1-t)*c.depth;   // 坑壁阶地
      if(c.peak){ const pk = t*3.4; h += Math.exp(-pk*pk) * c.peak; }
    }
  }

  // 水手号大峡谷
  if(lon > -110 && lon < -10){
    const t = (lon+110)/100;
    const latc = -13 + 5*Math.sin(t*Math.PI*2.2);
    const dl = (lat - latc)/5.5;
    if(Math.abs(dl) < 1){
      const ends = sstep(0,0.1,t)*sstep(1,0.9,t);
      const prof = Math.pow(Math.cos(dl*Math.PI/2), 2);
      h -= 3.1*prof*ends;
      h += 0.4*fbm(dir.x*24, dir.y*24, dir.z*24, 2)*prof*ends;
      h += 0.12*Math.sin(dl*9)*prof*ends;                  // 谷壁层理
    }
  }

  const dO = Math.acos(clamp(dir.dot(OLY),-1,1))/D2R;
  if(dO < 14) h += 3.3*Math.exp(-Math.pow(dO/6.8, 2));
  if(dO < 2.2) h -= 1.1*(1 - Math.pow(dO/2.2, 2));
  const dT = Math.acos(clamp(dir.dot(THA),-1,1))/D2R;
  h += 1.3*Math.exp(-Math.pow(dT/26, 2));
  const dH = Math.acos(clamp(dir.dot(HEL),-1,1))/D2R;
  h -= 2.4*Math.exp(-Math.pow(dH/16, 2));

  const pf = sstep(64, 80, Math.abs(lat));
  h *= (1 - 0.85*pf);
  h += 0.7*pf;
  return h;
}

function terrainColor(dir, h, lat){
  const n1 = fbm(dir.x*3+31, dir.y*3+31, dir.z*3+31, 3)*0.5+0.5;
  const n2 = snoise(dir.x*9+57, dir.y*9+57, dir.z*9+57)*0.5+0.5;
  const n3 = snoise(dir.x*16+91, dir.y*16+91, dir.z*16+91)*0.5+0.5;
  const n4 = snoise(dir.x*5+7,  dir.y*5+7,  dir.z*5+7 )*0.5+0.5;
  let r = 0.62 + (0.72-0.62)*n1, g = 0.28 + (0.36-0.28)*n1, b = 0.19 + (0.24-0.19)*n1;
  if(n2 > 0.58){ const k = Math.min(1,(n2-0.58)*2.4); r+=(0.36-r)*k; g+=(0.16-g)*k; b+=(0.12-b)*k; }
  if(n3 > 0.68){ const k = Math.min(1,(n3-0.68)*3.2); r+=(0.29-r)*k; g+=(0.25-g)*k; b+=(0.22-b)*k; }
  if(n4 > 0.64){ const k = Math.min(1,(n4-0.64)*2.8); r+=(0.85-r)*k; g+=(0.66-g)*k; b+=(0.49-b)*k; }
  const shade = 0.72 + 0.5*sstep(-2.2, 3.2, h);
  r*=shade; g*=shade; b*=shade;
  if(h < -0.9){ r*=0.8; g*=0.8; b*=0.8; }
  const pf = sstep(66, 78, Math.abs(lat));
  r+=(0.91-r)*pf*0.5; g+=(0.88-g)*pf*0.5; b+=(0.84-b)*pf*0.5;
  return [clamp(r,0,1), clamp(g,0,1), clamp(b,0,1)];
}

const marsGroup = new THREE.Group();
scene.add(marsGroup);

const surfGeo = new THREE.SphereGeometry(R, 256, 256);
{
  const pos = surfGeo.attributes.position;
  const colors = new Float32Array(pos.count*3);
  const v = new THREE.Vector3();
  for(let i=0;i<pos.count;i++){
    v.fromBufferAttribute(pos, i);
    const dir = v.clone().normalize();
    const h = terrainH(dir);
    v.copy(dir).multiplyScalar(R + h);
    pos.setXYZ(i, v.x, v.y, v.z);
    const lat = Math.asin(clamp(dir.y,-1,1))/D2R;
    const c = terrainColor(dir, h, lat);
    colors[i*3]=c[0]; colors[i*3+1]=c[1]; colors[i*3+2]=c[2];
  }
  surfGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  surfGeo.computeVertexNormals();
}
const surfMat = new THREE.MeshStandardMaterial({ vertexColors:true, roughness:0.96, metalness:0.02, envMapIntensity:0.22 });
const marsSurface = new THREE.Mesh(surfGeo, surfMat);
marsGroup.add(marsSurface);

// 真实火星地表（NASA 数据纹理，本地化避免跨域/断网）
const capViewPos = CITY_SITES[0].dir.clone().multiplyScalar(150).add(new THREE.Vector3(0,26,0));
camera.position.copy(CITY_SITES[0].dir.clone().multiplyScalar(330).add(new THREE.Vector3(0,85,0)));
{
  const texLoader = new THREE.TextureLoader();
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  texLoader.load('textures/mars_color.jpg', t=>{
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = THREE.RepeatWrapping; t.offset.x = 0.5;   // 对齐纹理与本星图经度
    t.anisotropy = maxAniso;
    surfMat.map = t; surfMat.vertexColors = false; surfMat.needsUpdate = true;
  });
  texLoader.load('textures/mars_bump.jpg', t=>{
    t.wrapS = THREE.RepeatWrapping; t.offset.x = 0.5;
    t.anisotropy = maxAniso;
    surfMat.bumpMap = t; surfMat.bumpScale = 1.1; surfMat.needsUpdate = true;
  });
}

/* ---------- 极地冰盖 ---------- */
function capAlphaTexture(){
  const w=512, h=256, cv=document.createElement('canvas'); cv.width=w; cv.height=h;
  const ctx=cv.getContext('2d'); const img=ctx.createImageData(w,h);
  for(let y=0;y<h;y++) for(let x=0;x<w;x++){
    const lat = (0.5 - y/h)*180;
    const n = Math.sin(x*0.09)*Math.sin(y*0.13) + Math.sin(x*0.023+y*0.05)*1.6;
    const a = sstep(73, 80, Math.abs(lat) + n*2.2)*255;
    const idx=(y*w+x)*4; img.data[idx]=255; img.data[idx+1]=255; img.data[idx+2]=255; img.data[idx+3]=a;
  }
  ctx.putImageData(img,0,0);
  return new THREE.CanvasTexture(cv);
}
const capGeo = new THREE.SphereGeometry(R, 128, 128);
{
  const pos = capGeo.attributes.position; const v = new THREE.Vector3();
  for(let i=0;i<pos.count;i++){
    v.fromBufferAttribute(pos, i);
    const dir = v.clone().normalize();
    v.copy(dir).multiplyScalar(R + terrainH(dir) + 0.14);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  capGeo.computeVertexNormals();
}
const capMat = new THREE.MeshStandardMaterial({ color:0xeef3f6, roughness:0.28, metalness:0.05,
  transparent:true, alphaMap:capAlphaTexture() });
marsGroup.add(new THREE.Mesh(capGeo, capMat));

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

/* ================= 地下冰川系统（真实分层） ================= */
const iceGroup = new THREE.Group(); iceGroup.visible=false; marsGroup.add(iceGroup);

function glacierTexture(){
  const w=1024, h=512, cv=document.createElement('canvas'); cv.width=w; cv.height=h;
  const ctx=cv.getContext('2d');
  const bg=ctx.createLinearGradient(0,0,0,h);
  bg.addColorStop(0,'#bfe6fa'); bg.addColorStop(0.5,'#6fb6e6'); bg.addColorStop(1,'#8ccdf0');
  ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
  // 冰体噪声斑块
  for(let i=0;i<120;i++){
    const x=rand()*w, y=rand()*h, r=10+rand()*50;
    const g=ctx.createRadialGradient(x,y,0,x,y,r);
    const dark = rand()>0.5;
    g.addColorStop(0, dark?'rgba(40,100,155,.3)':'rgba(235,250,255,.35)');
    g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r,0,7); ctx.fill();
  }
  // 冰裂纹（随机游走分支线，深色裂隙 + 白色挤压脊）
  for(let pass=0;pass<2;pass++){
    ctx.strokeStyle = pass===0 ? 'rgba(14,58,96,.62)' : 'rgba(230,250,255,.4)';
    const count = pass===0 ? 110 : 46;
    for(let i=0;i<count;i++){
      let x=rand()*w, y=rand()*h, a=rand()*Math.PI*2;
      ctx.lineWidth = pass===0 ? 0.6+rand()*1.8 : 0.4+rand()*0.8;
      ctx.beginPath(); ctx.moveTo(x,y);
      const steps=8+(rand()*14|0);
      for(let s=0;s<steps;s++){
        a += (rand()-0.5)*1.1;
        x += Math.cos(a)*(6+rand()*14); y += Math.sin(a)*(6+rand()*14);
        ctx.lineTo(x,y);
        if(rand()>0.75){ ctx.moveTo(x,y); }
      }
      ctx.stroke();
    }
  }
  return new THREE.CanvasTexture(cv);
}
function blotchAlphaTexture(cover){
  const w=512, h=256, cv=document.createElement('canvas'); cv.width=w; cv.height=h;
  const ctx=cv.getContext('2d');
  ctx.fillStyle='#000'; ctx.fillRect(0,0,w,h);
  for(let i=0;i<260;i++){
    const x=rand()*w, y=rand()*h, r=6+rand()*26;
    const g=ctx.createRadialGradient(x,y,0,x,y,r);
    g.addColorStop(0,`rgba(255,255,255,${cover})`); g.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r,0,7); ctx.fill();
  }
  return new THREE.CanvasTexture(cv);
}

// 第 1 层：基岩
const bedrock = new THREE.Mesh(new THREE.SphereGeometry(46.6, 96, 96),
  new THREE.MeshStandardMaterial({ color:0x33200f, roughness:1 }));
iceGroup.add(bedrock);
// 深层储水区
for(let i=0;i<7;i++){
  const dir = i<3 ? CITY_SITES[3].dir.clone().add(new THREE.Vector3((rand()-0.5)*0.5,(rand()-0.5)*0.5,(rand()-0.5)*0.5)).normalize()
                  : dirFromLatLon((rand()*2-1)*45, rand()*360-180);
  const blob = new THREE.Mesh(new THREE.SphereGeometry(1.0+rand()*0.8, 16, 16),
    new THREE.MeshStandardMaterial({ color:0x66c8ff, emissive:0x2288ff, emissiveIntensity:1.8, transparent:true, opacity:0.9 }));
  blob.position.copy(dir.multiplyScalar(46.1+rand()*0.6));
  iceGroup.add(blob);
}
// 岩石夹层（斑驳）
const rockLayer = new THREE.Mesh(new THREE.SphereGeometry(47.3, 96, 96),
  new THREE.MeshStandardMaterial({ color:0x4a3020, roughness:1, transparent:true, alphaMap:blotchAlphaTexture(0.9) }));
iceGroup.add(rockLayer);
// 第 2 层：连续冰川（带裂纹 + 冰面起伏）
const glacierTex = glacierTexture();
const glacierMat = new THREE.MeshPhysicalMaterial({ map:glacierTex, bumpMap:glacierTex, bumpScale:0.5,
  transparent:true, opacity:0.62, roughness:0.12, metalness:0, emissive:0x14496e, emissiveIntensity:0.55 });
const glacierGeo = new THREE.SphereGeometry(47.9, 128, 128);
{
  const pos = glacierGeo.attributes.position; const v=new THREE.Vector3();
  for(let i=0;i<pos.count;i++){
    v.fromBufferAttribute(pos,i);
    const d=v.clone().normalize();
    v.copy(d).multiplyScalar(47.9 + fbm(d.x*5+3, d.y*5+3, d.z*5+3, 3)*0.5);  // 冰川厚度起伏
    pos.setXYZ(i,v.x,v.y,v.z);
  }
  glacierGeo.computeVertexNormals();
}
iceGroup.add(new THREE.Mesh(glacierGeo, glacierMat));
// 第 2.5 层：浮冰碎冰层（破碎补丁）
const floeMat = new THREE.MeshPhysicalMaterial({ color:0xd8f2ff, transparent:true, opacity:0.5,
  alphaMap:blotchAlphaTexture(0.75), roughness:0.08, emissive:0x2a7ab0, emissiveIntensity:0.5 });
iceGroup.add(new THREE.Mesh(new THREE.SphereGeometry(48.6, 96, 96), floeMat));

// 深层辉光（冰层纵深）+ 矿区冰崖碎块
iceGroup.add(new THREE.Mesh(new THREE.SphereGeometry(47.0, 64, 64),
  new THREE.MeshBasicMaterial({ color:0x123f66, transparent:true, opacity:0.4, blending:THREE.AdditiveBlending, side:THREE.BackSide })));
for(let i=0;i<6;i++){
  const d = CITY_SITES[3].dir.clone().add(new THREE.Vector3((rand()-0.5)*0.5,(rand()-0.5)*0.5,(rand()-0.5)*0.5)).normalize();
  const slab = new THREE.Mesh(new THREE.BoxGeometry(0.9+rand()*0.8, 0.5+rand()*0.6, 0.12),
    new THREE.MeshPhysicalMaterial({ color:0xcfeaf8, roughness:0.12, transparent:true, opacity:0.85,
      emissive:0x2a7ab0, emissiveIntensity:0.4 }));
  slab.position.copy(d.clone().multiplyScalar(48.0));
  slab.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1), d);
  slab.rotateZ(rand()*3);
  iceGroup.add(slab);
}

// 采冰机器人 + 地下采矿基地（Glacies 正下方）
const robots = [];
{
  const base = CITY_SITES[3].dir;
  for(let i=0;i<5;i++){
    const rover = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.34,0.16,0.22),
      new THREE.MeshStandardMaterial({ color:0xc8d2d8, roughness:0.4, metalness:0.7, emissive:0x39b9ff, emissiveIntensity:0.5 }));
    rover.add(body);
    for(let wx=-1;wx<=1;wx+=2) for(let wz=-1;wz<=1;wz+=2){
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.06,0.05,8).rotateX(Math.PI/2),
        new THREE.MeshStandardMaterial({ color:0x22282e, roughness:0.8 }));
      wheel.position.set(wx*0.14, -0.1, wz*0.09); rover.add(wheel);
    }
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.03,0.3,6),
      new THREE.MeshStandardMaterial({ color:0x9fb2bd, metalness:0.8, roughness:0.3 }));
    arm.position.set(0.14, 0.14, 0); arm.rotation.z = -0.7; rover.add(arm);
    rover.userData.arm = arm;
    const d = base.clone().add(new THREE.Vector3((rand()-0.5)*0.35,(rand()-0.5)*0.35,(rand()-0.5)*0.35)).normalize();
    rover.position.copy(d.multiplyScalar(48.35));
    rover.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), d.clone().normalize());
    rover.rotateY(rand()*Math.PI*2);
    iceGroup.add(rover); robots.push(rover);
  }
  // 地下基地模块
  for(let i=0;i<3;i++){
    const d = base.clone().add(new THREE.Vector3((rand()-0.5)*0.2,(rand()-0.5)*0.2,(rand()-0.5)*0.2)).normalize();
    const mod = new THREE.Mesh(new THREE.BoxGeometry(0.7,0.4,0.5),
      new THREE.MeshStandardMaterial({ color:0x8a949c, roughness:0.5, metalness:0.6, emissive:0xffc98a, emissiveIntensity:0.7 }));
    mod.position.copy(d.multiplyScalar(47.0));
    mod.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), d.clone().normalize());
    iceGroup.add(mod);
  }
}

/* ================= 贴图 & 材质 ================= */
function glowTexture(){
  const cv=document.createElement('canvas'); cv.width=cv.height=128;
  const ctx=cv.getContext('2d');
  const g=ctx.createRadialGradient(64,64,0,64,64,64);
  g.addColorStop(0,'rgba(255,255,255,1)'); g.addColorStop(0.35,'rgba(255,255,255,.45)'); g.addColorStop(1,'rgba(255,255,255,0)');
  ctx.fillStyle=g; ctx.fillRect(0,0,128,128);
  return new THREE.CanvasTexture(cv);
}
const glowTex = glowTexture();
function addGlow(parent, pos, color, size){
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTex, color, transparent:true,
    blending:THREE.AdditiveBlending, depthWrite:false }));
  sp.position.copy(pos); sp.scale.set(size, size, 1);
  sp.userData.base = size; parent.add(sp); return sp;
}
function makeLabel(text, scale=9){
  const cv=document.createElement('canvas'); cv.width=512; cv.height=112;
  const ctx=cv.getContext('2d');
  ctx.fillStyle='rgba(6,16,26,.62)';
  ctx.beginPath(); ctx.roundRect(6,14,500,84,26); ctx.fill();
  ctx.strokeStyle='rgba(110,231,255,.65)'; ctx.lineWidth=3; ctx.stroke();
  ctx.font='500 40px "PingFang SC","Microsoft YaHei",sans-serif';
  ctx.fillStyle='#d8f3ff'; ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText(text, 256, 58);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map:new THREE.CanvasTexture(cv), transparent:true, depthWrite:false }));
  sp.scale.set(scale, scale*112/512, 1); return sp;
}

/* ---- 程序化微表面纹理：粗糙度/凹凸噪声，消除纯色平涂的玩具感 ---- */
function makeMicroTex(base, amp, streak){
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const x = c.getContext('2d');
  x.fillStyle = `rgb(${base},${base},${base})`; x.fillRect(0, 0, 256, 256);
  const n = streak ? 700 : 5200;
  for(let i = 0; i < n; i++){
    const v = Math.max(0, Math.min(255, base + (Math.random()*2-1)*amp)) | 0;
    x.fillStyle = `rgba(${v},${v},${v},${streak ? 0.3 : 0.16})`;
    if(streak) x.fillRect(0, Math.random()*256, 256, Math.random()*1.4 + 0.3);   // 拉丝
    else x.fillRect(Math.random()*256, Math.random()*256, Math.random()*2.2 + 0.4, Math.random()*2.2 + 0.4);   // 细颗粒
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}
const texBrushed = makeMicroTex(150, 42, true);    // 拉丝金属
const texGrain   = makeMicroTex(132, 36, false);   // 细颗粒（喷涂料/混凝土/岩面）

/* ---- 建筑立面纹理：窗格 + 内部灯光（emissive 通道），让建筑「有人住」 ---- */
function makeFacade(base, dark, winCols, winRows, litRatio){
  const W = 256, H = 512;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d');
  x.fillStyle = base; x.fillRect(0, 0, W, H);
  const e = document.createElement('canvas'); e.width = W; e.height = H;
  const xe = e.getContext('2d');
  xe.fillStyle = '#000'; xe.fillRect(0, 0, W, H);
  const cw = W/winCols, ch = H/winRows;
  for(let i=0;i<winCols;i++) for(let j=0;j<winRows;j++){
    const lit = Math.random() < litRatio, warm = Math.random() < 0.62;
    x.fillStyle = lit ? (warm ? '#ffc98a' : '#9fe4ff') : dark;
    x.fillRect(i*cw+1.5, j*ch+1.5, cw-3, ch-3);
    if(lit){
      const b = 0.45 + Math.random()*0.55;
      xe.fillStyle = warm ? `rgba(255,201,138,${b})` : `rgba(159,228,255,${b})`;
      xe.fillRect(i*cw+1.5, j*ch+1.5, cw-3, ch-3);
    }
  }
  const map = new THREE.CanvasTexture(c); map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.colorSpace = THREE.SRGBColorSpace;
  const em = new THREE.CanvasTexture(e); em.wrapS = em.wrapT = THREE.RepeatWrapping;
  em.colorSpace = THREE.SRGBColorSpace;
  return { map, em };
}
const facGlass = makeFacade('#202b36', '#141c26', 12, 24, 0.42);   // 玻璃幕墙塔楼
facGlass.map.repeat.set(2, 4); facGlass.em.repeat.set(2, 4);
const facHab = makeFacade('#3a3630', '#2b2823', 8, 14, 0.5);       // 居住模块
facHab.map.repeat.set(1.5, 2.5); facHab.em.repeat.set(1.5, 2.5);
const matTowerGlass = new THREE.MeshStandardMaterial({ map:facGlass.map, emissiveMap:facGlass.em,
  emissive:0xffffff, emissiveIntensity:0.85, color:0xcfd8e2, metalness:0.65, roughness:0.24, envMapIntensity:1.3 });
const matHabFacade = new THREE.MeshStandardMaterial({ map:facHab.map, emissiveMap:facHab.em,
  emissive:0xffffff, emissiveIntensity:0.8, color:0xd8cfc2, metalness:0.15, roughness:0.7,
  envMapIntensity:0.6, bumpMap:texGrain, bumpScale:0.015 });

const matMetal  = new THREE.MeshStandardMaterial({ color:0xb9c4cc, roughness:1, metalness:0.9, roughnessMap:texBrushed, bumpMap:texGrain, bumpScale:0.015, envMapIntensity:1.15 });
const matDark   = new THREE.MeshStandardMaterial({ color:0x39424c, roughness:1, metalness:0.55, roughnessMap:texGrain, bumpMap:texGrain, bumpScale:0.02, envMapIntensity:0.7 });
const matWhite  = new THREE.MeshStandardMaterial({ color:0xe6ecf2, roughness:1, metalness:0.35, roughnessMap:texGrain, bumpMap:texGrain, bumpScale:0.012, emissive:0x2c4a5e, emissiveIntensity:0.22, envMapIntensity:0.85 });
const matWarm   = new THREE.MeshStandardMaterial({ color:0xdcd4c4, roughness:1, metalness:0.3, roughnessMap:texGrain, bumpMap:texGrain, bumpScale:0.012, emissive:0xffb267, emissiveIntensity:0.5, envMapIntensity:0.75 });
const matCore   = new THREE.MeshStandardMaterial({ color:0xbff3ff, emissive:0x5fe3ff, emissiveIntensity:2.2, roughness:0.2 });
const matSolar  = new THREE.MeshStandardMaterial({ color:0x1d3a5f, roughness:0.3, metalness:0.7, emissive:0x16345c, emissiveIntensity:0.7, envMapIntensity:1.25 });
const matEco    = new THREE.MeshStandardMaterial({ color:0x2f9e5f, roughness:0.9, emissive:0x1d5c38, emissiveIntensity:0.35, envMapIntensity:0.35 });
const matLeaf2  = new THREE.MeshStandardMaterial({ color:0x57c785, roughness:0.9, emissive:0x2a7a4c, emissiveIntensity:0.3, envMapIntensity:0.35 });
const matLake   = new THREE.MeshStandardMaterial({ color:0x2f9fe8, roughness:0.12, metalness:0.2, emissive:0x1a6fc0, emissiveIntensity:0.7, envMapIntensity:1.35 });
const matFactory= new THREE.MeshStandardMaterial({ color:0x4a5058, roughness:1, metalness:0.5, roughnessMap:texGrain, bumpMap:texGrain, bumpScale:0.02, emissive:0xff8c3a, emissiveIntensity:0.45, envMapIntensity:0.9 });
function domeMat(op){ return new THREE.MeshPhysicalMaterial({ color:0xbfe8ff, transparent:true, opacity:op,
  roughness:0.08, metalness:0.1, side:THREE.DoubleSide, emissive:0x2a5a78, emissiveIntensity:0.22, envMapIntensity:1.3 }); }

function makeDome(r, op=0.2){
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.SphereGeometry(r, 40, 20, 0, Math.PI*2, 0, Math.PI/2), domeMat(op)));
  const ribs = new THREE.Mesh(new THREE.SphereGeometry(r*1.005, 20, 10, 0, Math.PI*2, 0, Math.PI/2),
    new THREE.MeshBasicMaterial({ wireframe:true, color:0x9fdcff, transparent:true, opacity:0.12 }));
  g.add(ribs);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(r, r*0.025, 8, 64), matMetal);
  ring.rotation.x = Math.PI/2; g.add(ring);
  return g;
}

/* ================= 建筑原型（未来 100 年形态） ================= */
const BINFO = {
  spire:{ name:'苍穹塔', desc:'居住与办公综合体。智能玻璃幕墙按日照自动调节透光率，外墙藻类涂层参与城市氧气循环。' },
  bio:{ name:'生长塔', desc:'原位 3D 打印的仿生曲面建筑——结构像植物一样生长成型，同强度下减重 40%，露台层叠绿化。' },
  ring:{ name:'光环枢纽', desc:'巨型环形建筑：磁悬浮环线换乘中心，环体内部是空中花园与步行长廊。' },
  etree:{ name:'日冕收集树', desc:'顶部花瓣阵列收集太阳能与轨道微波输电，单株日发电量可供 300 户家庭。' },
  stack:{ name:'层叠居所', desc:'模块化住宅单元，可整体吊装替换；每户配备独立生态阳台与水循环单元。' },
  float:{ name:'悬浮平台', desc:'磁悬浮公共观景平台，低速巡航于城市上空，是 2126 年最受欢迎的日落观景点。' },
  etower:{ name:'赫菲斯托斯之芯', desc:'聚变-裂变混合能源塔，为整座工业城与火箭发射场供能，核心温度 1.2 亿度。' },
  htank:{ name:'液氢储罐', desc:'水冰裂解产物储存设施，-253°C 低温系统全天候运行，供星舰燃料加注。' },
  iceplant:{ name:'水冰加工厂', desc:'地下冰浆在此过滤、电解、分流——饮用水进城，氢氧进罐，氧气入穹顶。' },
  hangar:{ name:'星舰总装厂房', desc:'每 72 小时总装一艘货运飞船，从龙骨到加注全流程无人化。' },
  robotline:{ name:'机器人产线', desc:'建造与维护火星城市的机器人，在这里被它们自己制造。' },
  rail:{ name:'货运轨道', desc:'真空管道磁悬浮货运线，连接工业城与首都，时速 1200 km。' },
  crocket:{ name:'「天舟」货运火箭', desc:'可回收地表-轨道货运火箭，每周三班往返 Areos Gate 空间港。货舱里是刚总装的设备，和来自地球的邮件。' },
  cship:{ name:'地表运输飞船', desc:'短程弹跳式运输器，负责城际大件转运。此刻它正在检修支架上，等待下一个点火窗口。' },
  mgantry:{ name:'维修平台', desc:'火箭勤务塔架：加注、检测、更换发动机都在这里完成，平台机械臂 24 小时待命。' },
  battery:{ name:'储能阵列', desc:'白昼储存光伏与聚变余电。沙暴季来临，它能维持城郊带满负荷运转 21 天。' },
  fabhall:{ name:'装配车间', desc:'火星原位制造：风化层提取金属粉末，3D 打印城市构件——你身边的建筑，八成原料来自脚下的红土。' },
  habmod:{ name:'居住舱区', desc:'城郊工程师的轮值宿舍。双层气密壳体，窗里的暖光，是 2126 年最普通的日常。' },
  plaza:{ name:'中央广场', desc:'城郊带的公共客厅。下班后的工程师在这里喝一杯合成咖啡，看首都方向的天际线。' },
  maglev:{ name:'磁悬浮接驳线', desc:'城郊与首都穹顶之间的通勤干线，每 4 分钟一班，全程 90 秒。' },
  statue:{ name:'马斯克纪念雕像', desc:'青铜铸造，高 42 米，纪念第一位把人类送上火星的开拓者。基座铭文：「让人类成为多行星物种。」——他说了一辈子，说到它成真。' },
  stele:{ name:'拓荒纪年碑', desc:'记载 2024—2089 火星开拓大事记：首次着陆、熔岩管基地、穹顶封顶、人口破百万。碑石取自水手号峡谷岩层。' },
  holo:{ name:'全息档案影像', desc:'2024 年，他在地球上谈论火星。2126 年，你站在火星上看着他——这颗星球，成了他身后最辽阔的背景。' },
  pstation:{ name:'广场磁悬浮站', desc:'首都内环 4 号站。本地居民管它叫「雕像站」——每个初到 Aurelia 的人，第一站都是这里。' },
  farm:{ name:'垂直农场', desc:'40 层无土栽培架，LED 光谱按作物定制，单位面积产量是地球农田的 350 倍。' },
  watertower:{ name:'水循环塔', desc:'穹顶内每一滴水在此净化循环，年损耗率低于 0.3%。' },
  canal:{ name:'生态运河', desc:'人工河流调节穹顶湿度与温度，也是居民的划船道。' },
  greenhouse:{ name:'穹顶外壳', desc:'40 cm 复合智能玻璃：挡辐射、锁温度、透阳光——内外是两个世界。' },
  drill:{ name:'冰层钻塔', desc:'深入地下冰层 2.4 km，采冰机器人全天候作业，火星文明的水龙头。' },
  plaza:{ name:'中央广场', desc:'首都的心脏。第一代移民在这里降落，第一百万个火星婴儿在这里取名。' },
  solarfarm:{ name:'赤道光伏田', desc:'数十万平方米薄膜光伏阵列，日间峰值功率 2.4 GW，与轨道微波输电共同构成火星电网的主干。' },
  walker:{ name:'巡检机器人', desc:'自主巡检单元，沿产线与储罐区全天候巡逻，实时回传设备健康数据，故障响应时间小于 90 秒。' },
  cropring:{ name:'环形农田', desc:'穹顶外的加压种植环，种植耐低氧转基因作物，直接利用火星日照，由灌溉管网供水。' },
  agri:{ name:'温室农场', desc:'链式温室穹顶，水培作物在人工气候下全年生长，是生态城的粮仓。' },
  monument:{ name:'马斯克拓荒纪念碑', desc:'高 312 m，火星文明最高地标。纪念一个世纪前把「让人类成为多行星物种」从口号变成工程图纸的拓荒者们。' },
  observatory:{ name:'巡天观测穹顶', desc:'火星干燥稀薄的空气让这里的星空比地球清晰十倍。穹顶内的深空望远镜同时承担地火通信的光学校准。' },
  antenna:{ name:'射电天线阵', desc:'碟形天线组成的干涉阵列，监听深空探测器回传信号，也是科研站与轨道空间港之间的通信主干。' },
  lab:{ name:'综合实验舱', desc:'加压实验舱：地质分析、生物培养、材料测试三大分区。样本经气闸进出，全程无污染。' },
  sample:{ name:'样本冷藏库', desc:'低温保存钻探岩芯与冰芯样本，等待下一班返回地球的货运飞船。' },
  weather:{ name:'气象监测塔', desc:'全天候记录气压、温度、尘暴与辐射数据，为五座穹顶城市提供气候预警。' },
  landpad:{ name:'着陆坪', desc:'科研补给着陆坪。每月一班货运舱在此降落，送来设备，带走数据与样本。' },
};
function tagBuilding(g, btype){ g.userData.btype = btype; return g; }

function bSpire(h=2.4, r=0.32){
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(r*0.5, r, h, 6), matTowerGlass);
  body.position.y = h/2; g.add(body);
  const band = new THREE.Mesh(new THREE.TorusGeometry(r*0.68, 0.025, 6, 24).rotateX(Math.PI/2), matCore);
  band.position.y = h*0.68; g.add(band);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(r*0.22, 10, 10), matCore);
  tip.position.y = h + r*0.2; g.add(tip);
  return tagBuilding(g, 'spire');
}
function bBio(h=2.2, r=0.5){
  const g = new THREE.Group();
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-r*0.6, 0, 0), new THREE.Vector3(r*1.4, h*0.55, 0), new THREE.Vector3(0, h, 0));
  const trunk = new THREE.Mesh(new THREE.TubeGeometry(curve, 16, r*0.28, 8), matWhite);
  g.add(trunk);
  for(let i=1;i<=3;i++){
    const t = i/4, p = curve.getPoint(t);
    const terrace = new THREE.Mesh(new THREE.CylinderGeometry(r*(0.9-t*0.4), r*(0.9-t*0.4), 0.06, 12), matEco);
    terrace.position.copy(p); terrace.position.y += 0.05; g.add(terrace);
  }
  return tagBuilding(g, 'bio');
}
function bRingB(r=1.1){
  const g = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(r, r*0.16, 10, 40), matTowerGlass);
  ring.position.y = r*1.25; g.add(ring);
  const glowRing = new THREE.Mesh(new THREE.TorusGeometry(r, r*0.05, 6, 40), matCore);
  glowRing.position.y = r*1.25; g.add(glowRing);
  for(const sx of [-1,1]){
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(r*0.09, r*0.13, r*1.3, 8), matMetal);
    leg.position.set(sx*r*0.86, r*0.62, 0); g.add(leg);
  }
  return tagBuilding(g, 'ring');
}
function bEnergyTree(h=1.6){
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.1, h, 6), matDark);
  trunk.position.y = h/2; g.add(trunk);
  for(let i=0;i<6;i++){
    const a = i/6*Math.PI*2;
    const petal = new THREE.Mesh(new THREE.SphereGeometry(0.34, 10, 6), matSolar);
    petal.scale.set(1, 0.16, 0.55);
    petal.position.set(Math.cos(a)*0.32, h+0.05, Math.sin(a)*0.32);
    petal.rotation.y = -a; petal.rotation.z = 0.28;
    g.add(petal);
  }
  const bud = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), matCore);
  bud.position.y = h+0.12; g.add(bud);
  return tagBuilding(g, 'etree');
}
function bStack(w=0.5, h=1.6){
  const g = new THREE.Group();
  let y = 0;
  for(let i=0;i<3;i++){
    const hh = h*(0.4 - i*0.06), ww = w*(1 - i*0.18);
    const box = new THREE.Mesh(new THREE.BoxGeometry(ww, hh, ww), matHabFacade);
    box.position.set((rand()-0.5)*0.16, y+hh/2, (rand()-0.5)*0.16);
    box.rotation.y = (rand()-0.5)*0.5;
    y += hh; g.add(box);
  }
  return tagBuilding(g, 'stack');
}
function bFloat(r=0.7, y=2.2){
  const g = new THREE.Group();
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(r, r*1.12, 0.14, 20), matWhite);
  disc.position.y = y; g.add(disc);
  const garden = new THREE.Mesh(new THREE.CylinderGeometry(r*0.8, r*0.8, 0.1, 20), matEco);
  garden.position.y = y+0.12; g.add(garden);
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.32, y, 10, 1, true),
    new THREE.MeshBasicMaterial({ color:0x8feaff, transparent:true, opacity:0.14, blending:THREE.AdditiveBlending, side:THREE.DoubleSide, depthWrite:false }));
  beam.position.y = y/2; g.add(beam);
  addGlow(g, new THREE.Vector3(0, y-0.2, 0), 0x7fe7ff, 1.6);
  return tagBuilding(g, 'float');
}

/* ================= 城市系统 ================= */
const pickables = [];
const animated = { rings:[], ships:[], moons:[], glows:[], drones:[], pods:[], liners:[], walkers:[], climber:null };
const npcList = [];   // 地表 NPC：{ mesh, name, role, lines, worldPos }
const surfPointOf = c => c.dir.clone().multiplyScalar(R + terrainH(c.dir));
const cityGroups = {};

function anchorCity(site, radius, build){
  const g = new THREE.Group();
  g.position.copy(surfPointOf(site));
  g.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), site.dir);
  g.userData.radius = radius;
  g.userData.buildings = [];
  build(g);
  marsGroup.add(g);
  cityGroups[site.id] = g;
  return g;
}
function put(cityG, building, x, z, ry=0){
  building.position.set(x, 0, z); building.rotation.y = ry;
  cityG.add(building); cityG.userData.buildings.push(building);
  return building;
}
function instanced(geo, mat, list){
  const inst = new THREE.InstancedMesh(geo, mat, list.length);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  list.forEach((it,i)=>{ e.set(0, it.ry||0, 0); q.setFromEuler(e); m.compose(it.p, q, it.s); inst.setMatrixAt(i, m); });
  return inst;
}
function addDrone(cityG, r, y, speed, color=0x9fe8ff){
  const d = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.04, 0.08), matWhite);
  d.add(body);
  addGlow(d, new THREE.Vector3(-0.1, 0, 0), color, 0.5);
  cityG.add(d);
  animated.drones.push({ mesh:d, r, y, speed, phase:rand()*Math.PI*2 });
}

/* ---- 空中交通层：高架真空磁悬浮管道（透明管体 + 发光导轨 + 支架 + 对向巡航车厢）——参考图6 ---- */
const matTube = new THREE.MeshPhysicalMaterial({ color:0xbfe8ff, transparent:true, opacity:0.2,
  roughness:0.08, metalness:0.1, envMapIntensity:1.4, side:THREE.DoubleSide, depthWrite:false });
function addSkyway(cg, a, b, lift){
  const mid = a.clone().add(b).multiplyScalar(0.5); mid.y += lift;
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  cg.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.085, 10), matTube));   // 透明真空管道
  cg.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.018, 6), matCore));    // 管内发光导轨
  for(const tt of [0.28, 0.72]){                                                   // 支架塔
    const p = curve.getPoint(tt);
    const sup = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, p.y, 6), matMetal);
    sup.position.set(p.x, p.y/2, p.z); cg.add(sup);
  }
  for(let k=0;k<2;k++){                                                            // 巡航车厢（对向运行）
    const pod = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.2, 4, 8),
      new THREE.MeshBasicMaterial({ color:0xdff4ff }));
    cg.add(pod);
    animated.liners.push({ mesh:pod, curve, speed:(0.05+rand()*0.03)*(k?-1:1), t:rand() });
  }
}

/* ---- 地表 NPC ---- */
function makeResident(){
  const g = new THREE.Group();
  const suit = new THREE.MeshStandardMaterial({ color:0xd97b4a, roughness:0.6, metalness:0.1 });
  const skin = new THREE.MeshStandardMaterial({ color:0xd8b8a0, roughness:0.5 });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.028,0.05,4,10), suit); body.position.y=0.078; g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.024,12,10), skin); head.position.y=0.138; g.add(head);
  const visor = new THREE.Mesh(new THREE.SphereGeometry(0.02,10,8,-0.6,1.2,1.0,0.8),
    new THREE.MeshStandardMaterial({ color:0x2a1a12, roughness:0.2, metalness:0.6 }));
  visor.position.set(0,0.138,0.006); g.add(visor);
  for(const s of [-1,1]){
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.01,0.035,4,6), suit);
    leg.position.set(s*0.014,0.022,0); g.add(leg);
  }
  addGlow(g, new THREE.Vector3(0,0.16,0), 0xffb27a, 0.45);
  return g;
}
function makeResearcher(){   // 科研人员（人类）：青灰工作服
  const g = new THREE.Group();
  const suit = new THREE.MeshStandardMaterial({ color:0x8fb4d8, roughness:0.6, metalness:0.1 });
  const skin = new THREE.MeshStandardMaterial({ color:0xd8b8a0, roughness:0.5 });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.028,0.05,4,10), suit); body.position.y=0.078; g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.024,12,10), skin); head.position.y=0.138; g.add(head);
  const visor = new THREE.Mesh(new THREE.SphereGeometry(0.02,10,8,-0.6,1.2,1.0,0.8),
    new THREE.MeshStandardMaterial({ color:0x2a1a12, roughness:0.2, metalness:0.6 }));
  visor.position.set(0,0.138,0.006); g.add(visor);
  for(const s of [-1,1]){
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.01,0.035,4,6), suit);
    leg.position.set(s*0.014,0.022,0); g.add(leg);
  }
  addGlow(g, new THREE.Vector3(0,0.16,0), 0x9fd4ff, 0.45);
  return g;
}
function addNPC(cityG, kind, x, z, ry, name, role, lines){
  const mesh = kind==='resident' ? makeResident() : makeResearcher();
  mesh.position.set(x, 0, z);
  mesh.rotation.y = ry;
  cityG.add(mesh);
  npcList.push({ mesh, name, role, lines, worldPos:new THREE.Vector3() });
  return mesh;
}

/* ---- 1. 火星首都 Aurelia（未来纽约） ---- */
{
  const g = anchorCity(CITY_SITES[0], 8.2, cg=>{
    const ground = new THREE.Mesh(new THREE.CircleGeometry(7.6, 56).rotateX(-Math.PI/2), matDark);
    ground.position.y = 0.02; cg.add(ground);
    // 中央广场
    for(let i=0;i<3;i++){
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.7-i*0.45, 0.045, 6, 56).rotateX(Math.PI/2),
        new THREE.MeshStandardMaterial({ color:0x111820, emissive:0xffc98a, emissiveIntensity:0.8 }));
      ring.position.y = 0.05; cg.add(tagBuilding(ring, 'plaza'));
      cg.userData.buildings.push(ring);
    }
    // 环路 + 放射街道网
    [4.2, 6.1].forEach(rr=>{
      const road = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.05, 6, 72).rotateX(Math.PI/2),
        new THREE.MeshStandardMaterial({ color:0x111820, emissive:0x49d7ff, emissiveIntensity:0.9 }));
      road.position.y = 0.05; cg.add(road);
    });
    const matStreet = new THREE.MeshStandardMaterial({ color:0x111820, emissive:0x49d7ff, emissiveIntensity:0.5 });
    for(let i=0;i<6;i++){ const a=i/6*Math.PI*2;
      const road = new THREE.Mesh(new THREE.BoxGeometry(4.6,0.04,0.09), matStreet);
      road.position.set(Math.cos(a)*4.6, 0.045, Math.sin(a)*4.6); road.rotation.y=-a; cg.add(road); }
    // 磁悬浮车厢 + 地面车流
    const pod = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.24, 4, 8).rotateZ(Math.PI/2), matCore);
    cg.add(pod); animated.pods.push({ mesh:pod, kind:'circle', r:4.2, y:0.12, speed:0.5, t:0 });
    const pod2 = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 0.2, 4, 8).rotateZ(Math.PI/2), matCore);
    cg.add(pod2); animated.pods.push({ mesh:pod2, kind:'circle', r:4.2, y:0.12, speed:-0.42, t:0.5 });
    for(let i=0;i<4;i++){
      const car = new THREE.Mesh(new THREE.CapsuleGeometry(0.05,0.18,4,6).rotateZ(Math.PI/2), matWarm);
      cg.add(car);
      animated.pods.push({ mesh:car, kind:'circle', r:6.1, y:0.1, speed:(0.3+rand()*0.3)*(i%2?1:-1), t:rand() });
    }
    // 建筑群
    const defs = [];
    for(let i=0;i<9;i++){ const a=i/9*Math.PI*2+0.2; defs.push([bSpire(2.2+rand()*2.0), Math.cos(a)*3.3, Math.sin(a)*3.3]); }
    for(let i=0;i<8;i++){ const a=i/8*Math.PI*2+0.55, rr=4.6+rand()*0.8;
      defs.push([rand()>0.5?bStack(0.5+rand()*0.2,1.4+rand()*0.8):bBio(1.6+rand()*1.2), Math.cos(a)*rr, Math.sin(a)*rr]); }
    for(let i=0;i<7;i++){ const a=i/7*Math.PI*2+0.1, rr=6.3+rand()*0.7;
      defs.push([bSpire(1.4+rand()*1.6, 0.26), Math.cos(a)*rr, Math.sin(a)*rr]); }
    defs.push([bRingB(1.05), 5.2, -3.4]);
    defs.push([bFloat(0.65, 2.6), -4.4, 3.6]);
    defs.forEach(([b,x,z])=>put(cg, b, x, z, rand()*Math.PI*2));
    // 加密：内圈住宅环 + 中圈混合填充
    for(let i=0;i<10;i++){ const a=i/10*Math.PI*2+0.32;
      put(cg, bStack(0.42+rand()*0.2, 1.1+rand()*0.7), Math.cos(a)*2.5, Math.sin(a)*2.5, rand()*3); }
    for(let i=0;i<10;i++){ const a=rand()*Math.PI*2, rr=3.7+rand()*2.8;
      put(cg, rand()>0.5?bSpire(1.3+rand()*1.4,0.26):bBio(1.4+rand()*1.1,0.42), Math.cos(a)*rr, Math.sin(a)*rr, rand()*3); }
    for(let i=0;i<5;i++){ const a=i/5*Math.PI*2+0.4; put(cg, bEnergyTree(1.4+rand()*0.5), Math.cos(a)*7.1, Math.sin(a)*7.1); }
    // 城市公园树群
    const parkTrees=[];
    for(let i=0;i<90;i++){ const a=rand()*Math.PI*2, rr=2.2+Math.sqrt(rand())*4.8, h=0.12+rand()*0.2;
      parkTrees.push({ p:new THREE.Vector3(Math.cos(a)*rr, h/2+0.04, Math.sin(a)*rr), s:new THREE.Vector3(0.05+rand()*0.04,h,0.05+rand()*0.04) }); }
    cg.add(instanced(new THREE.ConeGeometry(1,1,7), matEco, parkTrees));
    // 第三环线 + 外环居住区（百万人级城市外延）
    const road3 = new THREE.Mesh(new THREE.TorusGeometry(7.25, 0.045, 6, 80).rotateX(Math.PI/2),
      new THREE.MeshStandardMaterial({ color:0x111820, emissive:0x49d7ff, emissiveIntensity:0.7 }));
    road3.position.y = 0.05; cg.add(road3);
    for(let i=0;i<5;i++){
      const car = new THREE.Mesh(new THREE.CapsuleGeometry(0.045,0.16,4,6).rotateZ(Math.PI/2), matWarm);
      cg.add(car);
      animated.pods.push({ mesh:car, kind:'circle', r:7.25, y:0.1, speed:(0.25+rand()*0.3)*(i%2?1:-1), t:rand() });
    }
    const outskirts=[];
    for(let i=0;i<44;i++){ const a=rand()*Math.PI*2, rr=6.6+rand()*0.85, h=0.5+rand()*0.9;
      outskirts.push({ p:new THREE.Vector3(Math.cos(a)*rr, h/2+0.03, Math.sin(a)*rr),
        s:new THREE.Vector3(0.22+rand()*0.14, h, 0.22+rand()*0.14), ry:rand()*3 }); }
    const outskirtsMesh = instanced(new THREE.BoxGeometry(1,1,1), matHabFacade, outskirts);
    cg.add(tagBuilding(outskirtsMesh, 'stack')); cg.userData.buildings.push(outskirtsMesh);
    // 城市窗灯（百万灯火）
    const winPts=[], winCols=[];
    for(let i=0;i<520;i++){
      const a=rand()*Math.PI*2, rr=Math.sqrt(rand())*7.3, h=0.15+Math.pow(rand(),1.6)*2.6;
      winPts.push(Math.cos(a)*rr, h, Math.sin(a)*rr);
      const c = rand()>0.4 ? [1,0.79,0.54] : [0.56,0.91,1];
      const b=0.3+rand()*0.7; winCols.push(c[0]*b, c[1]*b, c[2]*b);
    }
    const wg=new THREE.BufferGeometry();
    wg.setAttribute('position', new THREE.Float32BufferAttribute(winPts,3));
    wg.setAttribute('color', new THREE.Float32BufferAttribute(winCols,3));
    cg.add(new THREE.Points(wg, new THREE.PointsMaterial({ size:0.07, vertexColors:true, transparent:true,
      opacity:0.95, blending:THREE.AdditiveBlending, depthWrite:false })));
    // 空中交通层：两条高架真空管道斜穿城市上空（参考图6）
    addSkyway(cg, new THREE.Vector3(-4.6, 1.6, -3.2), new THREE.Vector3(4.8, 2.2, 3.0), 1.6);
    addSkyway(cg, new THREE.Vector3(-5.4, 2.0, 2.6), new THREE.Vector3(5.4, 1.7, -3.6), 1.3);
    // 第二座巨型环形地标（外环门户，参考图5.4）
    const ring2 = bRingB(1.5); ring2.rotation.z = 0.1;
    put(cg, ring2, -5.8, -4.2, 0.7);
    // 空中交通层
    for(let i=0;i<22;i++) addDrone(cg, 2.4+rand()*4.4, 2+rand()*3.5, (0.2+rand()*0.35)*(rand()>0.5?1:-1));
    cg.add(makeDome(8.0, 0.15));
  });
  // Musk 纪念碑：全城最高视觉中心
  const mon = new THREE.Group(); mon.userData.btype = 'monument';
  const plaza = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.4, 0.35, 24), matMetal);
  plaza.position.y = 0.18; mon.add(plaza);
  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 1.05, 8.2, 6), matMetal);
  spire.position.y = 4.4; mon.add(spire);
  const core = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 8.2, 6),
    new THREE.MeshBasicMaterial({ color:0x7fe7ff, transparent:true, opacity:0.2, blending:THREE.AdditiveBlending }));
  core.position.y = 4.4; mon.add(core);
  for(let i=0;i<3;i++){
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.3+i*0.6, 0.08, 8, 48), matMetal);
    ring.position.y = 2.8+i*2.0; ring.rotation.x = Math.PI/2 + (i-1)*0.26;
    mon.add(ring); animated.rings.push(ring);
  }
  const top = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 20), matCore);
  top.position.y = 8.7; mon.add(top);
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.45, 16, 8, 1, true),
    new THREE.MeshBasicMaterial({ color:0x8feaff, transparent:true, opacity:0.18, blending:THREE.AdditiveBlending, side:THREE.DoubleSide, depthWrite:false }));
  beam.position.y = 15.5; mon.add(beam);
  for(let i=0;i<6;i++){ // 广场光柱
    const a=i/6*Math.PI*2;
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,1.1,6), matCore);
    pillar.position.set(Math.cos(a)*2.1, 0.55, Math.sin(a)*2.1); mon.add(pillar);
  }
  addGlow(mon, new THREE.Vector3(0, 8.7, 0), 0x7fe7ff, 9);
  const mlabel = makeLabel('马斯克拓荒纪念碑', 10); mlabel.position.y = 10.6; mon.add(mlabel);
  mon.scale.setScalar(1.35);          // 全城最高，轨道可见
  g.add(mon); g.userData.buildings.push(mon);
  g.userData.monument = mon;
  const label = makeLabel('火星首都 · Aurelia', 11); label.position.set(0, 9.6, -6.4); g.add(label);
  animated.glows.push(addGlow(g, new THREE.Vector3(0, 4.6, 0), 0x86e8ff, 13));
  g.userData.infoKey = 'capital';
  pickables.push(g);
  addNPC(g, 'resident', 1.8, 1.2, -2.4, '陈栖', '火星居民 · Aurelia 第三代',
    ['我出生在 Aurelia 的第三号穹顶，小时候抬头只能看见一层玻璃和红色的天。',
     '那时候水比金子贵，洗澡要计时。现在好了，循环系统让我们能用上真正的淋浴。',
     '这座城市是从熔岩管里长出来的。第一批定居者住在地下，用了三十年才把穹顶盖到地表。',
     '别被外面的荒凉骗了——穹顶里有河流、有公园，还有全火星最好的咖啡。']);
}

/* ---- 1.5 开拓者广场：巨大马斯克纪念雕像 ----
   叙事分工：纪念碑（保留）= 2126 未来科技；青铜雕像 = 早期开拓的历史记忆。
   广场选址在首都内环磁悬浮线上（r=4.2），是天然的城市交通节点。 */
let statueWorld = null;
{
  const capG = cityGroups.capital;
  const matBronze  = new THREE.MeshStandardMaterial({ color:0x7a6248, roughness:1, metalness:0.92, roughnessMap:texBrushed, bumpMap:texGrain, bumpScale:0.012, emissive:0x2a1f12, emissiveIntensity:0.25, envMapIntensity:1.2 });
  const matBronzeD = new THREE.MeshStandardMaterial({ color:0x54432f, roughness:1, metalness:0.9, roughnessMap:texGrain, envMapIntensity:1.0 });
  const matStone   = new THREE.MeshStandardMaterial({ color:0x9a9186, roughness:1, metalness:0.05, roughnessMap:texGrain, bumpMap:texGrain, bumpScale:0.03, envMapIntensity:0.5 });
  const matStoneD  = new THREE.MeshStandardMaterial({ color:0x565049, roughness:1, roughnessMap:texGrain, bumpMap:texGrain, bumpScale:0.03, envMapIntensity:0.4 });
  const matAmber   = new THREE.MeshStandardMaterial({ color:0x332a1a, emissive:0xffc98a, emissiveIntensity:1.6 });

  const a0 = Math.PI/4, mcx = Math.cos(a0)*4.2, mcz = Math.sin(a0)*4.2;   // 内环磁悬浮穿过的节点
  const mem = new THREE.Group();
  mem.position.set(mcx, 0, mcz);
  mem.rotation.y = Math.PI/2 - a0;                                        // 雕像面向城外来客

  // —— 纪念广场：石材圆场 + 暖光环带
  const spGround = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.15, 0.12, 32), matStone);
  spGround.position.y = 0.06; mem.add(spGround);
  const spRing = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.045, 6, 64).rotateX(Math.PI/2),
    new THREE.MeshStandardMaterial({ color:0x111820, emissive:0xffc98a, emissiveIntensity:0.9 }));
  spRing.position.y = 0.13; mem.add(spRing);

  // —— 基座：三层台阶 + 高台 + 铭文铜牌
  const statue = new THREE.Group();
  const step1 = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.6, 0.16, 12), matStone); step1.position.y=0.2; statue.add(step1);
  const step2 = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.25, 0.16, 12), matStone); step2.position.y=0.36; statue.add(step2);
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.76, 1.1, 12), matStoneD); plinth.position.y=0.99; statue.add(plinth);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.6, 0.12, 12), matStone); cap.position.y=1.6; statue.add(cap);
  // —— 基座正面：青铜浮雕肖像章（纪念币式工艺，一眼可识别的面容）——
  const medal = new THREE.Group();
  const medalBase = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.05, 32).rotateX(Math.PI/2), matBronzeD);
  medal.add(medalBase);
  const medalRing = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.025, 8, 40), matBronze);
  medal.add(medalRing);
  const medalFace = new THREE.Mesh(new THREE.CircleGeometry(0.31, 32),
    new THREE.MeshStandardMaterial({ color:0xffffff, metalness:0.85, roughness:0.45, envMapIntensity:1.1 }));
  medalFace.position.z = 0.028; medal.add(medalFace);
  medal.position.set(0, 1.02, 0.72); medal.rotation.x = -0.1;
  statue.add(medal);

  // —— 青铜人物：西装演讲姿态（单手抬起，张开手掌）
  const fig = new THREE.Group();
  for(const s of [-1,1]){
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.75, 4, 8), matBronzeD);
    leg.position.set(s*0.17, 0.55, 0); fig.add(leg); }
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.46, 1.15, 12), matBronze); torso.position.y=1.55; fig.add(torso);
  const chest = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8), matBronze);
  chest.position.y=2.08; chest.scale.set(1.15, 0.7, 0.85); fig.add(chest);
  const armL = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.7, 4, 8), matBronze);
  armL.position.set(-0.42, 1.6, 0.02); armL.rotation.z = 0.18; fig.add(armL);
  const upperR = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.42, 4, 8), matBronze);
  upperR.position.set(0.5, 1.88, 0.06); upperR.rotation.z = -1.1; fig.add(upperR);
  const foreR = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.4, 4, 8), matBronze);
  foreR.position.set(0.86, 2.06, 0.1); foreR.rotation.z = -0.15; fig.add(foreR);
  const handR = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), matBronze);
  handR.position.set(0.92, 2.34, 0.12); handR.scale.set(0.8, 1.15, 0.35); fig.add(handR);
  // —— 头部：可识别的马斯克肖像（宽额头 · 眉弓眼窝 · 直鼻 · 方下颌 · 后梳短发）——
  const headG = new THREE.Group(); headG.position.y = 2.52;
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.21, 20, 16), matBronze);
  skull.scale.set(0.94, 1.06, 0.98); headG.add(skull);
  const jaw = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.155, 0.14, 12), matBronze);   // 方下颌
  jaw.position.set(0, -0.14, 0.03); jaw.scale.z = 0.9; headG.add(jaw);
  const chin = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), matBronze);              // 下巴
  chin.position.set(0, -0.19, 0.15); chin.scale.set(1, 0.7, 0.8); headG.add(chin);
  const brow = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.035, 0.06), matBronzeD);           // 眉弓
  brow.position.set(0, 0.045, 0.185); headG.add(brow);
  for(const s of [-1,1]){
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.032, 10, 8), matBronzeD);           // 眼窝凹陷
    eye.position.set(s*0.075, 0.005, 0.175); eye.scale.set(1, 0.7, 0.5); headG.add(eye);
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), matBronze);              // 耳
    ear.position.set(s*0.2, -0.02, 0); ear.scale.set(0.45, 0.9, 0.7); headG.add(ear);
  }
  const noseB = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.11, 0.05), matBronze);          // 直鼻梁
  noseB.position.set(0, -0.03, 0.2); noseB.rotation.x = 0.12; headG.add(noseB);
  const noseT = new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 8), matBronze);             // 鼻头
  noseT.position.set(0, -0.095, 0.21); headG.add(noseT);
  const lips = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.02, 0.03), matBronzeD);           // 唇线
  lips.position.set(0, -0.145, 0.185); headG.add(lips);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.14, 10), matBronzeD);  // 颈
  neck.position.y = -0.24; headG.add(neck);
  // 标志性后梳短发：顶部饱满后掠露出宽额头 + 后层收窄贴合
  const hairTop = new THREE.Mesh(new THREE.SphereGeometry(0.215, 18, 12, 0, Math.PI*2, 0, 1.05), matBronzeD);
  hairTop.position.set(0, 0.05, -0.02); hairTop.scale.set(0.98, 1, 1.06); hairTop.rotation.x = -0.2; headG.add(hairTop);
  const hairBack = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 10, 0, Math.PI*2, 0, 1.9), matBronzeD);
  hairBack.position.set(0, 0.01, -0.045); hairBack.scale.set(0.94, 1.02, 1); headG.add(hairBack);
  fig.add(headG);
  fig.position.y = 1.66;   // 立于台面
  statue.add(fig);
  mem.add(tagBuilding(statue, 'statue'));
  capG.userData.buildings.push(statue);

  // —— 仰望射灯 ×6（夜间把青铜打出暖金轮廓）
  for(let i=0;i<6;i++){
    const a=i/6*Math.PI*2+0.26;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.045,0.5,6), matStoneD);
    post.position.set(Math.cos(a)*1.62, 0.37, Math.sin(a)*1.62); mem.add(post);
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.07,0.05,0.07), matAmber);
    lamp.position.set(Math.cos(a)*1.62, 0.64, Math.sin(a)*1.62);
    lamp.lookAt(mem.position.clone().setY(3)); mem.add(lamp); }

  // —— 历史纪念设施：拓荒纪年碑 ×3 + 马斯克全息档案影像
  const steleG = new THREE.Group();
  for(let i=0;i<3;i++){
    const st = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.75, 0.08), matStoneD);
    st.position.set((i-1)*0.85, 0.5, -1.35 + Math.abs(i-1)*0.18); st.rotation.y = -(i-1)*0.35; steleG.add(st);
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.05, 0.02), matAmber);
    strip.position.set((i-1)*0.85, 0.82, -1.3 + Math.abs(i-1)*0.18); strip.rotation.y = -(i-1)*0.35; steleG.add(strip); }
  mem.add(tagBuilding(steleG, 'stele'));
  capG.userData.buildings.push(steleG);
  const holoG = new THREE.Group();
  // 大幅立式全息肖像：2126 年的历史档案投影，远观即识
  const holoBase = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.38, 0.1, 16), matStoneD);
  holoBase.position.y = -0.85; holoG.add(holoBase);
  const holoFrame = new THREE.Mesh(new THREE.BoxGeometry(0.98, 1.24, 0.02),
    new THREE.MeshBasicMaterial({ color:0x0a2028, transparent:true, opacity:0.5 }));
  holoG.add(holoFrame);
  const holo = new THREE.Mesh(new THREE.PlaneGeometry(0.88, 1.14),
    new THREE.MeshBasicMaterial({ color:0xbfe4ff, transparent:true, opacity:0.92, side:THREE.DoubleSide }));
  holo.position.z = 0.015; holoG.add(holo);
  new THREE.TextureLoader().load('textures/musk.jpg', t=>{
    t.colorSpace = THREE.SRGBColorSpace;
    holo.material.map = t; holo.material.needsUpdate = true;
    // 青铜浮雕化处理：去色 → 古铜色调 → 贴上肖像章
    const cv = document.createElement('canvas'); cv.width = cv.height = 256;
    const cx = cv.getContext('2d');
    cx.drawImage(t.image, 0, 0, 256, 256);
    const d = cx.getImageData(0, 0, 256, 256), p = d.data;
    for(let i = 0; i < p.length; i += 4){
      const l = p[i]*0.3 + p[i+1]*0.55 + p[i+2]*0.15;
      p[i] = 40 + l*0.62; p[i+1] = 28 + l*0.44; p[i+2] = 18 + l*0.3;
    }
    cx.putImageData(d, 0, 0);
    const bt = new THREE.CanvasTexture(cv);
    bt.colorSpace = THREE.SRGBColorSpace;
    medalFace.material.map = bt; medalFace.material.needsUpdate = true;
  });
  holoG.position.set(0, 1.95, -1.5);
  mem.add(tagBuilding(holoG, 'holo'));
  capG.userData.buildings.push(holoG);
  animated.glows.push(addGlow(mem, new THREE.Vector3(0, 1.95, -1.5), 0x9fd4ff, 1.1));

  // —— 交通节点：广场磁悬浮站（4 号站台雨棚）
  const station = new THREE.Group();
  const stBase = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, 0.5), matStone); stBase.position.y=0.1; station.add(stBase);
  for(const s of [-1,1]){
    const sp2 = new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,0.6,6), matMetal);
    sp2.position.set(s*0.45, 0.4, 0); station.add(sp2); }
  const stRoof = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 0.6), matDark); stRoof.position.y=0.72; station.add(stRoof);
  const stLight = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.02, 0.06), matAmber); stLight.position.y=0.69; station.add(stLight);
  station.position.set(0, 0, 1.75);
  mem.add(tagBuilding(station, 'pstation'));
  capG.userData.buildings.push(station);

  // —— 游客 / 居民 ×4（绕场参观）+ 清洁机器人 ×2（自动化设备）
  for(let i=0;i<4;i++){
    const person = new THREE.Group();
    const pBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.03, 0.07, 3, 6),
      new THREE.MeshStandardMaterial({ color:[0xc8b8a8,0x8fa4b0,0xb89888,0x9ab0a8][i], roughness:0.7 }));
    pBody.position.y = -0.22; person.add(pBody);
    mem.add(person);
    animated.walkers.push({ mesh:person, cx:0, cz:0.4, r:1.15+i*0.18, phase:rand()*6.28, speed:(0.18+rand()*0.15)*(i%2?1:-1) });
  }
  for(const rr of [1.65, 1.45]){
    const bot = new THREE.Group();
    const bBase = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.06,0.05,8), matDark); bBase.position.y=-0.27; bot.add(bBase);
    const bEye = new THREE.Mesh(new THREE.SphereGeometry(0.015,6,6), matCore); bEye.position.set(0.04,-0.25,0); bot.add(bEye);
    mem.add(bot);
    animated.walkers.push({ mesh:bot, cx:0, cz:0.2, r:rr, phase:rand()*6.28, speed:0.5+rand()*0.2 });
  }
  addDrone(capG, 4.0, 1.8, 0.3, 0xffc98a);
  addDrone(capG, 4.5, 2.4, -0.26, 0xffc98a);

  capG.add(mem);
  const lb = makeLabel('开拓者广场 · Pioneer Plaza', 5);
  lb.position.set(mcx, 5.6, mcz); capG.add(lb);
  animated.glows.push(addGlow(capG, new THREE.Vector3(mcx, 3.4, mcz), 0xffc98a, 4.5));
  statueWorld = new THREE.Vector3();
  statue.getWorldPosition(statueWorld);
}

/* ---- 2. 翡绿生态城 Verde（火星新加坡） ---- */
{
  const g = anchorCity(CITY_SITES[2], 6.2, cg=>{
    // 主穹顶：森林 + 摩天生态塔 + 运河
    const forestFloor = new THREE.Mesh(new THREE.CircleGeometry(4.4, 40).rotateX(-Math.PI/2), matEco);
    forestFloor.position.y = 0.02; cg.add(forestFloor);
    const trees = [];
    for(let i=0;i<220;i++){
      const a=rand()*Math.PI*2, rr=0.6+Math.sqrt(rand())*3.6, h=0.14+rand()*0.26;
      trees.push({ p:new THREE.Vector3(Math.cos(a)*rr, h/2+0.04, Math.sin(a)*rr), s:new THREE.Vector3(0.06+rand()*0.04,h,0.06+rand()*0.04) });
    }
    cg.add(instanced(new THREE.ConeGeometry(1,1,7), matLeaf2, trees));
    const flowers = [];
    for(let i=0;i<80;i++){
      const a=rand()*Math.PI*2, rr=Math.sqrt(rand())*3.8;
      flowers.push({ p:new THREE.Vector3(Math.cos(a)*rr, 0.05, Math.sin(a)*rr), s:new THREE.Vector3(0.1,0.02,0.1) });
    }
    cg.add(instanced(new THREE.CylinderGeometry(1,1,1,8),
      new THREE.MeshStandardMaterial({ color:0xe88bb0, emissive:0xb0456f, emissiveIntensity:0.6, roughness:0.8 }), flowers));
    const canal = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.16, 8, 56).rotateX(Math.PI/2), matLake);
    canal.position.y = 0.06; cg.add(tagBuilding(canal, 'canal')); cg.userData.buildings.push(canal);
    const lake = new THREE.Mesh(new THREE.CircleGeometry(0.9, 24).rotateX(-Math.PI/2), matLake);
    lake.position.set(1.6, 0.07, 1.2); cg.add(lake);
    // 生态塔群
    put(cg, bBio(2.6, 0.55), -1.2, -1.4);
    put(cg, bBio(2.1, 0.5), 1.8, -1.8, 1.2);
    put(cg, bBio(2.2, 0.5), -2.6, -2.2, 2.1);
    put(cg, bSpire(2.4, 0.3), 0.4, -2.6);
    put(cg, bSpire(1.9, 0.26), 2.6, -0.6);
    put(cg, bStack(0.55, 1.5), -2.4, 1.6);
    put(cg, bRingB(0.75), -3.2, 0.6);
    put(cg, bFloat(0.5, 2.0), 1.2, 2.2);
    // 垂直农场
    const farm = new THREE.Group();
    for(let i=0;i<6;i++){
      const shelf = new THREE.Mesh(new THREE.CylinderGeometry(0.55-i*0.05, 0.55-i*0.05, 0.1, 14),
        new THREE.MeshStandardMaterial({ color:0x3fae6f, emissive:0x2f9e5f, emissiveIntensity:0.9, roughness:0.7 }));
      shelf.position.y = 0.25+i*0.32; farm.add(shelf);
    }
    farm.position.set(-0.6, 0, 2.8); cg.add(tagBuilding(farm, 'farm')); cg.userData.buildings.push(farm);
    // 水循环塔
    const wt = new THREE.Group();
    const wbody = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.42, 1.9, 10), matWhite); wbody.position.y=0.95; wt.add(wbody);
    for(let i=0;i<3;i++){
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.035, 6, 20).rotateX(Math.PI/2), matLake);
      ring.position.y = 0.5+i*0.55; wt.add(ring);
    }
    wt.position.set(2.9, 0, 2.4); cg.add(tagBuilding(wt, 'watertower')); cg.userData.buildings.push(wt);
    const dome1 = makeDome(4.6, 0.16); cg.add(dome1);
    // 副穹顶（温室）
    [[5.6,1.4,2.2],[-4.6,3.4,1.8]].forEach(([x,z,r])=>{
      const d = makeDome(r, 0.2); d.position.set(x,0,z); cg.add(d);
      const veg = new THREE.Mesh(new THREE.SphereGeometry(r*0.8, 16, 10, 0, Math.PI*2, 0, Math.PI/2), matEco);
      veg.scale.y = 0.42; veg.position.set(x, 0.03, z); cg.add(veg);
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.2,Math.hypot(x,z),10), domeMat(0.28));
      tube.position.set(x/2, 0.32, z/2); tube.rotation.z = Math.PI/2; tube.rotation.y = -Math.atan2(z, x);
      cg.add(tube);
    });
    // 温室链（三座链式温室穹顶）
    [[3.4,-4.8],[5.2,-4.0],[7.0,-2.8]].forEach(([x,z])=>{
      const d=makeDome(1.5,0.2); d.position.set(x,0,z); cg.add(d);
      const crop=new THREE.Mesh(new THREE.SphereGeometry(1.15,14,8,0,Math.PI*2,0,Math.PI/2), matLeaf2);
      crop.scale.y=0.4; crop.position.set(x,0.03,z);
      cg.add(tagBuilding(crop,'agri')); cg.userData.buildings.push(crop);
      const tube=new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.16,Math.hypot(x,z),8), domeMat(0.28));
      tube.position.set(x/2,0.3,z/2); tube.rotation.z=Math.PI/2; tube.rotation.y=-Math.atan2(z,x);
      cg.add(tube);
    });
    // 外部环形农田 + 灌溉管网
    [[8.2,1.5],[6.8,6.2],[-7.6,4.4]].forEach(([x,z])=>{
      const ring=new THREE.Mesh(new THREE.CylinderGeometry(1.3,1.3,0.08,24),
        new THREE.MeshStandardMaterial({ color:0x3fae6f, emissive:0x2f9e5f, emissiveIntensity:0.8, roughness:0.8 }));
      ring.position.set(x,0.06,z); cg.add(tagBuilding(ring,'cropring')); cg.userData.buildings.push(ring);
      const ir=new THREE.Mesh(new THREE.TorusGeometry(0.8,0.05,6,28).rotateX(Math.PI/2), matLake);
      ir.position.set(x,0.14,z); cg.add(ir);
      const len=Math.hypot(x,z);
      const pipe=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.06,len,6),
        new THREE.MeshStandardMaterial({ color:0x3a6a8a, emissive:0x1a6fc0, emissiveIntensity:0.8, roughness:0.4, metalness:0.5 }));
      pipe.position.set(x/2,0.1,z/2); pipe.rotation.z=Math.PI/2; pipe.rotation.y=-Math.atan2(z,x);
      cg.add(tagBuilding(pipe,'watertower')); cg.userData.buildings.push(pipe);
    });
    // 扩展垂直农场 + 水循环塔
    [[2.2,3.4],[-3.0,2.6]].forEach(([x,z])=>{
      const f2=farm.clone(); f2.position.set(x,0,z);
      cg.add(tagBuilding(f2,'farm')); cg.userData.buildings.push(f2);
    });
    [[-3.6,-3.4],[4.2,3.2]].forEach(([x,z])=>{
      const wt2=wt.clone(); wt2.position.set(x,0,z);
      cg.add(tagBuilding(wt2,'watertower')); cg.userData.buildings.push(wt2);
    });
    for(let i=0;i<14;i++) addDrone(cg, 1.5+rand()*4, 1.2+rand()*2.4, (0.25+rand()*0.3)*(rand()>0.5?1:-1), 0x8fffBE);
  });
  const label = makeLabel('翡绿生态城 · Verde', 10); label.position.set(0, 6.4, 0); g.add(label);
  animated.glows.push(addGlow(g, new THREE.Vector3(0, 3, 0), 0x7dffb0, 10));
  g.userData.infoKey = 'eco';
  pickables.push(g);
}

/* ---- 3. 赫菲斯托斯工业能源城 ---- */
{
  const g = anchorCity(CITY_SITES[1], 6.8, cg=>{
    const platform = new THREE.Mesh(new THREE.CylinderGeometry(5.6, 5.9, 0.3, 48), matDark);
    platform.position.y = 0.15; cg.add(platform);
    // 能源塔 ×2
    [[-1.6,0.6],[1.8,-1.2]].forEach(([x,z])=>{
      const et = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.75, 3.4, 10), matMetal); body.position.y=1.7; et.add(body);
      const coreC = new THREE.Mesh(new THREE.CylinderGeometry(0.24,0.24,3.6,8), matCore); coreC.position.y=1.8; et.add(coreC);
      const cap = new THREE.Mesh(new THREE.TorusGeometry(0.62,0.09,8,24).rotateX(Math.PI/2), matFactory); cap.position.y=3.5; et.add(cap);
      addGlow(et, new THREE.Vector3(0,3.6,0), 0x7fe7ff, 2.2);
      et.position.set(x,0.3,z); cg.add(tagBuilding(et,'etower')); cg.userData.buildings.push(et);
    });
    // 液氢储罐 ×4
    for(let i=0;i<4;i++){
      const a = 0.5 + i/4*Math.PI*2;
      const tk = new THREE.Group();
      const sph = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 12), matMetal); sph.position.y=0.85; tk.add(sph);
      for(let l=0;l<3;l++){ const la=l/3*Math.PI*2;
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,0.7,6), matDark);
        leg.position.set(Math.cos(la)*0.35, 0.35, Math.sin(la)*0.35); tk.add(leg); }
      tk.position.set(Math.cos(a)*3.6, 0.3, Math.sin(a)*3.6);
      cg.add(tagBuilding(tk,'htank')); cg.userData.buildings.push(tk);
    }
    // 水冰加工厂：长厂房 + 管阵列
    const plant = new THREE.Group();
    const hall = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.9, 1.1), matFactory); hall.position.y=0.45; plant.add(hall);
    for(let i=0;i<5;i++){
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.06,1.3,6).rotateX(Math.PI/2), matMetal);
      pipe.position.set(-1.05+i*0.52, 1.0, 0); plant.add(pipe);
    }
    plant.position.set(0, 0.3, 3.4); cg.add(tagBuilding(plant,'iceplant')); cg.userData.buildings.push(plant);
    // 星舰总装厂房 + 火箭
    const hg = new THREE.Group();
    const hangar = new THREE.Mesh(new THREE.CylinderGeometry(1.0,1.0,2.6,16,1,false,0,Math.PI).rotateZ(Math.PI/2).rotateY(Math.PI/2), matDark);
    hangar.position.y=0.2; hg.add(hangar);
    const rk = new THREE.Group();
    const rbody = new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.22,1.7,12),
      new THREE.MeshStandardMaterial({ color:0xf2f4f6, roughness:0.35, metalness:0.4 }));
    rbody.position.y=0.85; rk.add(rbody);
    const rnose = new THREE.Mesh(new THREE.ConeGeometry(0.22,0.55,12),
      new THREE.MeshStandardMaterial({ color:0x20262c, roughness:0.4, metalness:0.5 }));
    rnose.position.y=1.95; rk.add(rnose);
    rk.position.set(0,0.1,-2.0); hg.add(rk);
    hg.position.set(-3.2, 0.3, 2.6); hg.rotation.y = 0.6;
    cg.add(tagBuilding(hg,'hangar')); cg.userData.buildings.push(hg);
    // 机器人产线
    const line = new THREE.Group();
    for(let i=0;i<6;i++){
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.07,0.5,6), matMetal);
      post.position.set(i*0.4-1, 0.25, 0); line.add(post);
      const armB = new THREE.Mesh(new THREE.BoxGeometry(0.3,0.06,0.06), matFactory);
      armB.position.set(i*0.4-1+0.12, 0.55, 0); line.add(armB);
    }
    const belt = new THREE.Mesh(new THREE.BoxGeometry(2.8,0.06,0.4), matDark); belt.position.y=0.1; line.add(belt);
    line.position.set(0.4, 0.3, -3.6); cg.add(tagBuilding(line,'robotline')); cg.userData.buildings.push(line);
    // 货运轨道（高架 + 移动车厢）
    const rail = new THREE.Group();
    for(const sz of [-1,1]){
      const track = new THREE.Mesh(new THREE.BoxGeometry(9, 0.07, 0.08), matMetal);
      track.position.set(0, 0.75, sz*0.16); rail.add(track);
    }
    for(let i=0;i<6;i++){
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.05,0.75,6), matDark);
      post.position.set(-4+i*1.6, 0.37, 0); rail.add(post);
    }
    const cargo = new THREE.Mesh(new THREE.CapsuleGeometry(0.09,0.4,4,8).rotateZ(Math.PI/2), matFactory);
    cargo.position.y=0.85; rail.add(cargo);
    animated.pods.push({ mesh:cargo, kind:'line', x0:-4.2, x1:4.2, y:0.85, speed:0.35, t:rand() });
    rail.position.set(0, 0.3, -5.6); cg.add(tagBuilding(rail,'rail')); cg.userData.buildings.push(rail);
    // 火炬塔
    for(let i=0;i<3;i++){ const a=i/3*Math.PI*2+0.3;
      const t = new THREE.Mesh(new THREE.CylinderGeometry(0.07,0.11,2.4,8), matDark);
      t.position.set(Math.cos(a)*4.9, 1.5, Math.sin(a)*4.9); cg.add(t);
      animated.glows.push(addGlow(cg, t.position.clone().add(new THREE.Vector3(0,1.4,0)), 0xff9040, 2.4)); }
    // 集装箱堆场
    const containers=[];
    for(let i=0;i<24;i++){
      containers.push({ p:new THREE.Vector3(2.0+(i%6)*0.44, 0.42+Math.floor(i/12)*0.27, -2.4+(Math.floor(i/6)%2)*0.52),
        s:new THREE.Vector3(0.38,0.24,0.2), ry:(rand()-0.5)*0.12 });
    }
    cg.add(instanced(new THREE.BoxGeometry(1,1,1), matFactory, containers));
    // 塔吊
    const crane=new THREE.Group();
    const cpost=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.08,2.2,6), matMetal); cpost.position.y=1.1; crane.add(cpost);
    const jib=new THREE.Mesh(new THREE.BoxGeometry(1.8,0.07,0.07), matFactory); jib.position.set(0.7,2.2,0); crane.add(jib);
    const hook=new THREE.Mesh(new THREE.CylinderGeometry(0.015,0.015,0.6,4), matDark); hook.position.set(1.4,1.9,0); crane.add(hook);
    crane.position.set(-2.2,0.3,1.2); cg.add(crane);
    // 小型储罐阵列
    const tanks2=[];
    for(let i=0;i<6;i++){ const a=1.1+i/6*Math.PI*0.9;
      tanks2.push({ p:new THREE.Vector3(Math.cos(a)*4.7,0.75,Math.sin(a)*4.7), s:new THREE.Vector3(0.32,0.9,0.32) }); }
    cg.add(instanced(new THREE.CylinderGeometry(1,1,1,10), matMetal, tanks2));
    // 赤道光伏田（平台外阵列）
    const panels=[], posts=[];
    for(let row=0;row<5;row++) for(let col=0;col<10;col++){
      const x=-6.3+col*0.85, z=6.6+row*0.7;
      panels.push({ p:new THREE.Vector3(x, 0.58, z), s:new THREE.Vector3(0.7,0.05,0.5) });
      posts.push({ p:new THREE.Vector3(x, 0.27, z), s:new THREE.Vector3(0.05,0.54,0.05) });
    }
    const solarMesh = instanced(new THREE.BoxGeometry(1,1,1), matSolar, panels);
    cg.add(tagBuilding(solarMesh,'solarfarm')); cg.userData.buildings.push(solarMesh);
    cg.add(instanced(new THREE.CylinderGeometry(1,1,1,6), matDark, posts));
    // 扩展燃料储罐阵
    const tanks3=[];
    for(let i=0;i<8;i++){
      tanks3.push({ p:new THREE.Vector3(-4.6+(i%4)*0.85, 0.75, -6.5-Math.floor(i/4)*0.9), s:new THREE.Vector3(0.34,0.9,0.34) });
    }
    const tanks3Mesh = instanced(new THREE.CylinderGeometry(1,1,1,10), matMetal, tanks3);
    cg.add(tagBuilding(tanks3Mesh,'htank')); cg.userData.buildings.push(tanks3Mesh);
    // 排气塔
    for(let i=0;i<2;i++){
      const ch=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.2,2.8,8), matDark);
      ch.position.set(4.6-i*1.1, 1.7, 3.8+i*0.9); cg.add(tagBuilding(ch,'iceplant')); cg.userData.buildings.push(ch);
      animated.glows.push(addGlow(cg, ch.position.clone().add(new THREE.Vector3(0,1.6,0)), 0xff5040, 1.2));
    }
    // 巡检机器人（自动化巡逻）
    for(let i=0;i<4;i++){
      const w=new THREE.Group();
      const body=new THREE.Mesh(new THREE.BoxGeometry(0.26,0.14,0.18), matFactory); body.position.y=0.18; w.add(body);
      const eye=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.04,0.04), matCore); eye.position.set(0.14,0.2,0); w.add(eye);
      for(const sx of [-1,1]) for(const sz of [-1,1]){
        const leg=new THREE.Mesh(new THREE.CylinderGeometry(0.018,0.018,0.2,5), matDark);
        leg.position.set(sx*0.1,0.07,sz*0.07); w.add(leg);
      }
      const cx=1.5+(rand()-0.5)*3, cz=-1.5+(rand()-0.5)*3;
      w.position.set(cx,0.3,cz);
      cg.add(tagBuilding(w,'walker')); cg.userData.buildings.push(w);
      animated.walkers.push({ mesh:w, cx, cz, r:0.8+rand()*1.2, speed:0.4+rand()*0.3, phase:rand()*6 });
    }
    for(let i=0;i<12;i++) addDrone(cg, 2+rand()*3.4, 1.5+rand()*2.5, (0.3+rand()*0.3)*(rand()>0.5?1:-1), 0xffb060);
  });
  const label = makeLabel('赫菲斯托斯工业城', 10); label.position.set(0, 6.2, 0); g.add(label);
  animated.glows.push(addGlow(g, new THREE.Vector3(0, 3.4, 0), 0xffa050, 11));
  g.userData.infoKey = 'industrial';
  pickables.push(g);
}

/* ---- 4. 冰川矿城 Glacies ---- */
{
  const g = anchorCity(CITY_SITES[3], 5.0, cg=>{
    for(let i=0;i<2;i++){
      const rig = new THREE.Group(); const x = i*2.6-1.3;
      for(let l=0;l<3;l++){ const a=l/3*Math.PI*2;
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,1.9,6), matMetal);
        leg.position.set(x+Math.cos(a)*0.46, 0.9, Math.sin(a)*0.46);
        leg.rotation.z = Math.cos(a)*0.32; leg.rotation.x = -Math.sin(a)*0.32; rig.add(leg); }
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.44,0.44,0.44), matFactory); head.position.set(x,1.9,0); rig.add(head);
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.13,0.13,6.2,8), matMetal); pipe.position.set(x,-1.2,0); rig.add(pipe);
      addGlow(rig, new THREE.Vector3(x,-3.9,0), 0x5fd0ff, 2.4);
      cg.add(tagBuilding(rig,'drill')); cg.userData.buildings.push(rig);
    }
    const habs = [];
    for(let i=0;i<6;i++){ const a=rand()*Math.PI*2, rr=1.8+rand()*1.6;
      habs.push({ p:new THREE.Vector3(Math.cos(a)*rr, 0.32, Math.sin(a)*rr), s:new THREE.Vector3(0.75,0.6,0.55), ry:rand()*3 }); }
    cg.add(instanced(new THREE.BoxGeometry(1,1,1), matWarm, habs));
    // 地表巡视机器人
    for(let i=0;i<3;i++){
      const rov = new THREE.Group();
      const bd = new THREE.Mesh(new THREE.BoxGeometry(0.3,0.14,0.2), matWhite); rov.add(bd);
      for(let wx=-1;wx<=1;wx+=2) for(let wz=-1;wz<=1;wz+=2){
        const wh = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,0.04,8).rotateX(Math.PI/2), matDark);
        wh.position.set(wx*0.12,-0.09,wz*0.08); rov.add(wh); }
      const a=rand()*Math.PI*2; rov.position.set(Math.cos(a)*3.2, 0.12, Math.sin(a)*3.2);
      cg.add(rov);
    }
    const d = makeDome(1.7, 0.2); d.position.set(3.0, 0, 2.0); cg.add(d);
    put(cg, bEnergyTree(1.3), -2.8, 2.4);
    const label = makeLabel('冰川矿城 · Glacies', 9); label.position.set(0, 4.4, 0); cg.add(label);
    animated.glows.push(addGlow(cg, new THREE.Vector3(0, 2.4, 0), 0x6fc8ff, 8));
  });
  g.userData.infoKey = 'mining';
  pickables.push(g);
}

/* ---- 5. 前哨城 Frontier ---- */
{
  const g = anchorCity(CITY_SITES[4], 4.4, cg=>{
    cg.add(makeDome(3.2, 0.16));
    put(cg, bSpire(1.7), -0.8, 0.5); put(cg, bBio(1.5, 0.4), 0.9, -0.7, 0.8);
    put(cg, bStack(0.45, 1.2), 1.3, 1.1); put(cg, bStack(0.4, 1.0), -1.4, -1.0);
    put(cg, bSpire(1.3, 0.24), 0.2, -1.6); put(cg, bBio(1.2, 0.36), -1.8, 1.2, 2.2);
    put(cg, bEnergyTree(1.3), 2.4, 0.4); put(cg, bEnergyTree(1.1), -2.4, -0.4);
    const gr = new THREE.Mesh(new THREE.CircleGeometry(0.8, 18).rotateX(-Math.PI/2), matEco);
    gr.position.set(0.2, 0.04, 1.6); cg.add(gr);
    for(let i=0;i<5;i++) addDrone(cg, 1+rand()*1.8, 1+rand()*1.6, 0.3+rand()*0.3);
    const label = makeLabel('前哨城 · Frontier', 9); label.position.set(0, 4.6, 0); cg.add(label);
    animated.glows.push(addGlow(cg, new THREE.Vector3(0, 2.6, 0), 0x9fe0ff, 8));
  });
  g.userData.infoKey = 'frontier';
  pickables.push(g);
}

/* ---- 6. 奥林帕斯科研站 ---- */
{
  const g = anchorCity(CITY_SITES[5], 4.6, cg=>{
    // 基座平台
    const pad = new THREE.Mesh(new THREE.CircleGeometry(4.2, 40).rotateX(-Math.PI/2),
      new THREE.MeshStandardMaterial({ color:0x3a4148, roughness:0.7, metalness:0.4 }));
    pad.position.y = 0.02; cg.add(pad);
    // 巡天观测穹顶（半球玻璃罩 + 可俯仰望远镜）
    const obs = new THREE.Group();
    const od = makeDome(1.9, 0.22); obs.add(od);
    const mount = new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.22,0.9,10), matMetal);
    mount.position.y = 0.45; obs.add(mount);
    const scope = new THREE.Group();
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.2,1.6,12),
      new THREE.MeshStandardMaterial({ color:0xdfe6ec, roughness:0.3, metalness:0.6 }));
    tube.rotation.x = Math.PI/2 - 0.6; tube.position.y = 0.4; scope.add(tube);
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.17, 16), matCore);
    lens.position.set(0, 0.88, 0.62); lens.rotation.x = -0.6; scope.add(lens);
    scope.position.y = 0.9; obs.add(scope);
    obs.position.set(-1.2, 0, -0.8);
    cg.add(tagBuilding(obs, 'observatory')); cg.userData.buildings.push(obs);
    // 射电天线阵（三面碟形天线）
    [[2.2,-1.6,0.5],[3.1,-0.2,0.9],[2.4,1.4,1.3]].forEach(([x,z,ry])=>{
      const dish = new THREE.Group();
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.08,0.9,8), matMetal);
      mast.position.y = 0.45; dish.add(mast);
      const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.62, 20, 8, 0, Math.PI*2, 0, 0.62),
        new THREE.MeshStandardMaterial({ color:0xe6ecf2, roughness:0.35, metalness:0.5, side:THREE.DoubleSide }));
      bowl.position.y = 1.1; bowl.rotation.x = Math.PI + 0.7; dish.add(bowl);
      const feed = new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.012,0.5,6), matDark);
      feed.position.set(0, 1.25, 0.28); feed.rotation.x = 0.7; dish.add(feed);
      addGlow(dish, new THREE.Vector3(0, 1.28, 0.32), 0x9fe8ff, 0.5);
      dish.position.set(x, 0, z); dish.rotation.y = ry;
      cg.add(tagBuilding(dish, 'antenna')); cg.userData.buildings.push(dish);
    });
    // 综合实验舱 ×3（连接通道）
    const labPos = [[-2.6,1.2,0.3],[-1.4,2.2,-0.2],[-0.1,2.6,0.4]];
    labPos.forEach(([x,z,ry],i)=>{
      const lab = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 1.1, 4, 12).rotateZ(Math.PI/2), matWhite);
      lab.position.set(x, 0.42, z); lab.rotation.y = ry;
      cg.add(tagBuilding(lab, 'lab')); cg.userData.buildings.push(lab);
      if(i < labPos.length-1){
        const [nx,nz] = labPos[i+1];
        const len = Math.hypot(nx-x, nz-z);
        const link = new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.16,len,8), domeMat(0.3));
        link.position.set((x+nx)/2, 0.34, (z+nz)/2);
        link.rotation.z = Math.PI/2; link.rotation.y = -Math.atan2(nz-z, nx-x);
        cg.add(link);
      }
    });
    // 样本冷藏库（低温罐簇）
    const vault = new THREE.Group();
    for(let i=0;i<5;i++){
      const a = i/5*Math.PI*2;
      const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.14,0.14,0.55,10),
        new THREE.MeshStandardMaterial({ color:0xcfe4f0, roughness:0.25, metalness:0.7, emissive:0x2a7ab0, emissiveIntensity:0.5 }));
      tank.position.set(Math.cos(a)*0.3, 0.28, Math.sin(a)*0.3); vault.add(tank);
    }
    const vbase = new THREE.Mesh(new THREE.CylinderGeometry(0.55,0.6,0.14,16), matMetal);
    vbase.position.y = 0.07; vault.add(vbase);
    addGlow(vault, new THREE.Vector3(0, 0.62, 0), 0x6fc8ff, 0.9);
    vault.position.set(0.9, 0, -2.2);
    cg.add(tagBuilding(vault, 'sample')); cg.userData.buildings.push(vault);
    // 气象监测塔
    const wt = new THREE.Group();
    const wpole = new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.05,2.6,8), matMetal);
    wpole.position.y = 1.3; wt.add(wpole);
    const cross = new THREE.Mesh(new THREE.BoxGeometry(0.7,0.03,0.03), matDark);
    cross.position.y = 2.3; wt.add(cross);
    const wball = new THREE.Mesh(new THREE.SphereGeometry(0.09,10,8), matCore);
    wball.position.y = 2.66; wt.add(wball);
    addGlow(wt, new THREE.Vector3(0, 2.66, 0), 0x9fe8ff, 0.8);
    wt.position.set(-3.2, 0, -2.0);
    cg.add(tagBuilding(wt, 'weather')); cg.userData.buildings.push(wt);
    // 着陆坪
    const lp = new THREE.Group();
    const lpad = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.0, 0.1, 24), matDark);
    lpad.position.y = 0.05; lp.add(lpad);
    const lring = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.03, 6, 40).rotateX(Math.PI/2), matCore);
    lring.position.y = 0.11; lp.add(lring);
    lp.position.set(1.6, 0, 2.6);
    cg.add(tagBuilding(lp, 'landpad')); cg.userData.buildings.push(lp);
    // 居住小穹顶 + 能量树
    const hab = makeDome(1.1, 0.2); hab.position.set(-3.0, 0, 0.4); cg.add(hab);
    put(cg, bEnergyTree(1.2), 3.4, 2.2);
    put(cg, bStack(0.4, 0.9), -2.2, -2.8);
    for(let i=0;i<6;i++) addDrone(cg, 1.2+rand()*2.2, 1+rand()*1.6, 0.25+rand()*0.3, 0xa8d8ff);
    const label = makeLabel('奥林帕斯科研站', 9); label.position.set(0, 4.2, 0); cg.add(label);
    animated.glows.push(addGlow(cg, new THREE.Vector3(0, 2.2, 0), 0x9fd4ff, 7));
  });
  g.userData.infoKey = 'research';
  pickables.push(g);
  addNPC(g, 'researcher', -0.8, -1.4, 1.2, '林澈', '奥林帕斯科研站 · 站长',
    ['生态系统：站内气压 101.3 kPa，氧气由 Verde 生态城与本地水培舱共同维持。',
     '能源：白昼依赖太阳能薄膜，极夜与沙暴期间切换至微型裂变堆，储能可用 47 天。',
     '城市运行：六座主要定居点通过磁悬浮干线互联，物流由自动货运舱完成，人员通勤每日 42 班次。',
     '当前状态：所有穹顶气密性正常，水循环效率 99.2%，下一班地球补给船预计 3 个月后抵达。']);
}

/* ---- 7. Aurelia 城郊带 · Meridian Yard ----
   地表探索近景区：航天 / 能源 / 工业 / 交通 / 生活 / 火星环境 六大系统，
   与首都穹顶（远景地标）构成 近景作业带 → 中景城区 → 远景首都 的真实城市层级 */
const YARD = { id:'yard', radius:3.6, dir:null };
{
  const capDir = CITY_SITES[0].dir;
  const nN = new THREE.Vector3(0,1,0).addScaledVector(capDir, -capDir.y).normalize();   // 切平面「北」
  const nE = new THREE.Vector3().crossVectors(nN, capDir);                              // 切平面「东」
  YARD.dir = capDir.clone().addScaledVector(nE, 0.19).addScaledVector(nN, -0.155).normalize(); // 着陆点外侧

  anchorCity(YARD, YARD.radius, cg=>{
    const matConcrete = new THREE.MeshStandardMaterial({ color:0x8d857c, roughness:0.9, metalness:0.05 });
    const matRoad     = new THREE.MeshStandardMaterial({ color:0x2b3038, roughness:0.95 });
    const matHab      = new THREE.MeshStandardMaterial({ color:0xd9d2c6, roughness:0.6, metalness:0.1, emissive:0x3a3126, emissiveIntensity:0.4 });
    const matWindow   = new THREE.MeshStandardMaterial({ color:0x2a2418, emissive:0xffc978, emissiveIntensity:1.6, roughness:0.4 });

    // —— 交通系统：贴地路网（主干道 + 着陆场支路 + 路沿警示灯）
    const roadMain = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.05, 0.5), matRoad);
    roadMain.position.set(0.1, 0.028, 0.9); cg.add(roadMain);
    const roadPad = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 1.6), matRoad);
    roadPad.position.set(-1.6, 0.028, 1.5); cg.add(roadPad);
    const edgeLights=[];
    for(let i=0;i<9;i++) edgeLights.push({ p:new THREE.Vector3(-2.9+i*0.75, 0.09, 1.22), s:new THREE.Vector3(0.03,0.09,0.03) });
    cg.add(instanced(new THREE.BoxGeometry(1,1,1),
      new THREE.MeshStandardMaterial({ color:0x332a1a, emissive:0xffb050, emissiveIntensity:1.8 }), edgeLights));

    // —— 航天系统：A-3 着陆场 + 货运火箭 + 维修平台 + 运输飞船
    const pad = new THREE.Group();
    const padBase = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.25, 0.12, 28), matConcrete); padBase.position.y=0.06; pad.add(padBase);
    const padRing = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.035, 6, 48).rotateX(Math.PI/2), matCore); padRing.position.y=0.13; pad.add(padRing);
    for(let i=0;i<6;i++){ const a=i/6*Math.PI*2;
      const l = new THREE.Mesh(new THREE.BoxGeometry(0.05,0.05,0.05), matWindow);
      l.position.set(Math.cos(a)*1.05, 0.15, Math.sin(a)*1.05); pad.add(l); }
    pad.position.set(-1.6, 0, 2.3); cg.add(tagBuilding(pad,'landpad')); cg.userData.buildings.push(pad);
    const rocket = new THREE.Group();
    const rBody = new THREE.Mesh(new THREE.CylinderGeometry(0.24,0.26,1.6,14),
      new THREE.MeshStandardMaterial({ color:0xe8e4da, roughness:0.45, metalness:0.3 })); rBody.position.y=0.95; rocket.add(rBody);
    const rNose = new THREE.Mesh(new THREE.ConeGeometry(0.24,0.5,14), matDark); rNose.position.y=2.0; rocket.add(rNose);
    for(let i=0;i<4;i++){ const a=i/4*Math.PI*2+Math.PI/4;
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.04,0.5,6), matDark);
      leg.position.set(Math.cos(a)*0.36, 0.25, Math.sin(a)*0.36);
      leg.rotation.z = Math.cos(a)*0.28; leg.rotation.x = -Math.sin(a)*0.28; rocket.add(leg); }
    rocket.position.set(-1.6, 0.12, 2.3);
    cg.add(tagBuilding(rocket,'crocket')); cg.userData.buildings.push(rocket);
    const gantry = new THREE.Group();
    for(const s of [-1,1]){
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.09,1.5,0.09), matMetal);
      post.position.set(s*0.5, 0.75, 0); gantry.add(post); }
    const beam = new THREE.Mesh(new THREE.BoxGeometry(1.15,0.09,0.09), matFactory); beam.position.y=1.5; gantry.add(beam);
    const deck = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.05,0.4), matDark); deck.position.set(0,1.05,0.2); gantry.add(deck);
    const gArm = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.05,0.05), matFactory); gArm.position.set(-0.35,1.32,0); gantry.add(gArm);
    gantry.position.set(-0.55, 0, 2.6); gantry.rotation.y = 0.4;
    cg.add(tagBuilding(gantry,'mgantry')); cg.userData.buildings.push(gantry);
    const shuttlePad = new THREE.Group();
    const hull = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.7, 4, 10).rotateZ(Math.PI/2), matMetal); hull.position.y=0.32; shuttlePad.add(hull);
    const wing = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.03,0.55), matDark); wing.position.y=0.3; shuttlePad.add(wing);
    for(const s of [-1,1]){ const cradle = new THREE.Mesh(new THREE.BoxGeometry(0.08,0.2,0.3), matDark); cradle.position.set(s*0.3, 0.1, 0); shuttlePad.add(cradle); }
    shuttlePad.position.set(-2.6, 0, -0.7); shuttlePad.rotation.y = -0.5;
    cg.add(tagBuilding(shuttlePad,'cship')); cg.userData.buildings.push(shuttlePad);

    // —— 能源系统：光伏阵列 + 储能罐群 + 输能管线
    const pn=[], pp=[];
    for(let r=0;r<3;r++) for(let c=0;c<6;c++){
      pn.push({ p:new THREE.Vector3(1.4+c*0.5, 0.32, -2.4-r*0.45), s:new THREE.Vector3(0.42,0.04,0.32) });
      pp.push({ p:new THREE.Vector3(1.4+c*0.5, 0.15, -2.4-r*0.45), s:new THREE.Vector3(0.04,0.3,0.04) });
    }
    const solar2 = instanced(new THREE.BoxGeometry(1,1,1), matSolar, pn);
    cg.add(tagBuilding(solar2,'solarfarm')); cg.userData.buildings.push(solar2);
    cg.add(instanced(new THREE.CylinderGeometry(1,1,1,6), matDark, pp));
    const bat = new THREE.Group();
    for(let i=0;i<5;i++){
      const t2 = new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.16,0.6,10), matMetal);
      t2.position.set(i*0.42-0.84, 0.3, 0); bat.add(t2);
      const tl = new THREE.Mesh(new THREE.BoxGeometry(0.08,0.05,0.02), matWindow);
      tl.position.set(i*0.42-0.84, 0.42, 0.17); bat.add(tl); }
    bat.position.set(2.3, 0, 0.3); cg.add(tagBuilding(bat,'battery')); cg.userData.buildings.push(bat);
    const pline = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,3.05,6), matMetal);
    pline.position.set(1.15, 0.12, -0.7);
    pline.rotation.z = Math.PI/2; pline.rotation.y = -Math.atan2(-2.0, -2.3);
    cg.add(pline);

    // —— 工业系统：装配车间 + 作业机械臂 + 集装箱堆场
    const fab = new THREE.Group();
    const fHall = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.8, 1.1), matFactory); fHall.position.y=0.4; fab.add(fHall);
    const fRoof = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.08, 1.2), matDark); fRoof.position.y=0.84; fab.add(fRoof);
    for(let i=0;i<3;i++){
      const door = new THREE.Mesh(new THREE.BoxGeometry(0.4,0.5,0.03), matDark);
      door.position.set(-0.6+i*0.6, 0.25, 0.57); fab.add(door); }
    fab.position.set(0.0, 0, -1.8); cg.add(tagBuilding(fab,'fabhall')); cg.userData.buildings.push(fab);
    for(const mx of [-0.5, 0.5]){
      const rb = new THREE.Group();
      const rbase = new THREE.Mesh(new THREE.CylinderGeometry(0.09,0.12,0.25,8), matDark); rbase.position.y=0.12; rb.add(rbase);
      const arm1 = new THREE.Mesh(new THREE.BoxGeometry(0.07,0.55,0.07), matMetal); arm1.position.set(0,0.5,0); arm1.rotation.z=0.35; rb.add(arm1);
      const arm2 = new THREE.Mesh(new THREE.BoxGeometry(0.05,0.4,0.05), matFactory); arm2.position.set(0.16,0.78,0); arm2.rotation.z=-0.5; rb.add(arm2);
      rb.position.set(mx, 0, -1.1); cg.add(rb); }
    const ctn=[];
    for(let i=0;i<10;i++) ctn.push({ p:new THREE.Vector3(-1.5+(i%5)*0.4, 0.16+Math.floor(i/5)*0.26, -2.6),
      s:new THREE.Vector3(0.34,0.22,0.2), ry:(rand()-0.5)*0.1 });
    cg.add(instanced(new THREE.BoxGeometry(1,1,1), matFactory, ctn));

    // —— 城市生活：居住舱排 + 中央广场 + 行人
    for(let i=0;i<4;i++){
      const hab = new THREE.Group();
      const mod = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 0.5, 4, 10).rotateZ(Math.PI/2), matHab); mod.position.y=0.24; hab.add(mod);
      for(let w=0;w<3;w++){ const win = new THREE.Mesh(new THREE.BoxGeometry(0.06,0.06,0.02), matWindow);
        win.position.set(-0.2+w*0.2, 0.3, 0.24); hab.add(win); }
      hab.position.set(1.5+i*0.7, 0, 1.9); hab.rotation.y = -0.35;
      cg.add(tagBuilding(hab,'habmod')); cg.userData.buildings.push(hab); }
    const plaza = new THREE.Group();
    const pBase = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.9, 0.07, 24), matConcrete); pBase.position.y=0.035; plaza.add(pBase);
    const pCol = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.07,0.9,8), matMetal); pCol.position.y=0.45; plaza.add(pCol);
    const pLamp = new THREE.Mesh(new THREE.SphereGeometry(0.09,10,8), matCore); pLamp.position.y=0.95; plaza.add(pLamp);
    for(let i=0;i<4;i++){ const a=i/4*Math.PI*2+0.4;
      const bench = new THREE.Mesh(new THREE.BoxGeometry(0.3,0.06,0.12), matDark);
      bench.position.set(Math.cos(a)*0.55, 0.1, Math.sin(a)*0.55); bench.rotation.y=-a; plaza.add(bench); }
    plaza.position.set(0.5, 0, 1.6); cg.add(tagBuilding(plaza,'plaza')); cg.userData.buildings.push(plaza);
    addGlow(cg, new THREE.Vector3(0.5, 0.95, 1.6), 0x9fe8ff, 0.9);
    for(let i=0;i<3;i++){
      const person = new THREE.Group();
      const pBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.03,0.07,3,6), matHab); pBody.position.y=-0.22; person.add(pBody);
      cg.add(person);
      animated.walkers.push({ mesh:person, cx:0.5, cz:1.6, r:0.28+i*0.14, phase:rand()*6.28, speed:0.22+rand()*0.18 });
    }

    // —— 交通系统：磁悬浮接驳线（高架 + 运行中的车厢）+ 自动巡逻车
    const ml = new THREE.Group();
    for(const sz of [-1,1]){
      const tr = new THREE.Mesh(new THREE.BoxGeometry(6.4,0.06,0.07), matMetal);
      tr.position.set(0, 0.6, sz*0.13); ml.add(tr); }
    for(let i=0;i<5;i++){
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.045,0.6,6), matDark);
      post.position.set(-3+i*1.5, 0.3, 0); ml.add(post); }
    const mlCar = new THREE.Mesh(new THREE.CapsuleGeometry(0.08,0.42,4,8).rotateZ(Math.PI/2),
      new THREE.MeshStandardMaterial({ color:0xe8edf2, roughness:0.3, metalness:0.5, emissive:0x66d9ff, emissiveIntensity:0.4 }));
    mlCar.position.y=0.72; ml.add(mlCar);
    animated.pods.push({ mesh:mlCar, kind:'line', x0:-3, x1:3, y:0.72, speed:0.5, t:rand() });
    ml.position.set(0.1, 0, -0.6); cg.add(tagBuilding(ml,'maglev')); cg.userData.buildings.push(ml);
    for(const [rcx, rcz, rr] of [[-1.2, 1.2, 0.6],[0.9, -0.2, 0.8]]){
      const rover = new THREE.Group();
      const rvBase = new THREE.Mesh(new THREE.BoxGeometry(0.16,0.08,0.12), matDark); rvBase.position.y=-0.26; rover.add(rvBase);
      const rvTop = new THREE.Mesh(new THREE.BoxGeometry(0.1,0.04,0.09), matFactory); rvTop.position.y=-0.2; rover.add(rvTop);
      const rvEye = new THREE.Mesh(new THREE.SphereGeometry(0.02,6,6), matCore); rvEye.position.set(0.08,-0.24,0); rover.add(rvEye);
      cg.add(rover);
      animated.walkers.push({ mesh:rover, cx:rcx, cz:rcz, r:rr, phase:rand()*6.28, speed:0.4+rand()*0.2 });
    }

    // —— 火星环境：散布岩石（城郊未整平的自然地貌）
    const rocks=[];
    for(let i=0;i<22;i++){
      const a=rand()*Math.PI*2, rr=2.2+rand()*2.2;
      rocks.push({ p:new THREE.Vector3(Math.cos(a)*rr, 0.05+rand()*0.06, Math.sin(a)*rr),
        s:new THREE.Vector3(0.1+rand()*0.3, 0.08+rand()*0.2, 0.1+rand()*0.3), ry:rand()*3 });
    }
    cg.add(instanced(new THREE.DodecahedronGeometry(1,0),
      new THREE.MeshStandardMaterial({ color:0x7c4230, roughness:1 }), rocks));

    // —— 中文标识（人类活动痕迹）
    const sign1 = makeLabel('A-3 着陆场', 2.2); sign1.position.set(-1.6, 1.2, 3.4); cg.add(sign1);
    const sign2 = makeLabel('装配车间', 2.2);   sign2.position.set(0.0, 1.4, -1.8);  cg.add(sign2);
    const sign3 = makeLabel('中央广场', 2.2);   sign3.position.set(0.5, 1.6, 1.6);   cg.add(sign3);
    const sign4 = makeLabel('储能阵列', 2.2);   sign4.position.set(2.3, 1.1, 0.3);   cg.add(sign4);
    const label = makeLabel('Aurelia 城郊带 · Meridian Yard', 6); label.position.set(0, 3.6, 0); cg.add(label);
  });
}

// 输水管道：Glacies → Hephaestus
{
  const a = CITY_SITES[3].dir, b = CITY_SITES[1].dir;
  const pts = [];
  for(let i=0;i<=32;i++){
    const t = i/32;
    const dir = a.clone().lerp(b, t).normalize();
    pts.push(dir.clone().multiplyScalar(R + terrainH(dir) + 0.35));
  }
  marsGroup.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 64, 0.12, 6),
    new THREE.MeshStandardMaterial({ color:0x7fa8bc, roughness:0.4, metalness:0.7, emissive:0x1c4e68, emissiveIntensity:0.5 })));
}

/* ================= 文明网络：全球城市灯光 + 前哨定居点 + 城际磁悬浮干线 ================= */
{
  const pts=[], cols=[];
  const cWarm=[1,0.79,0.54], cCyan=[0.56,0.91,1];
  const pushLight=(p,c,b)=>{ pts.push(p.x,p.y,p.z); cols.push(c[0]*b,c[1]*b,c[2]*b); };
  // 主城灯光簇（首都最密）
  CITY_SITES.forEach((site,si)=>{
    const n = si===0 ? 1000 : si===5 ? 140 : 480, spread = si===0 ? 0.17 : si===5 ? 0.05 : 0.1;
    for(let i=0;i<n;i++){
      const d = site.dir.clone().add(new THREE.Vector3((rand()-0.5)*spread,(rand()-0.5)*spread,(rand()-0.5)*spread)).normalize();
      pushLight(d.multiplyScalar(R+terrainH(d)+0.12), rand()>0.45?cWarm:cCyan, 0.25+rand()*0.5);
    }
  });
  // 前哨定居点 ×14（小穹顶 + 居住舱 + 信标）
  const hamletDirs=[];
  let hGuard=0;
  while(hamletDirs.length<14 && hGuard++<400){
    const d=dirFromLatLon((rand()*2-1)*52, rand()*360-180);
    let ok=true;
    for(const c of CITY_SITES){ if(d.angleTo(c.dir)<0.4){ ok=false; break; } }
    if(ok) for(const h of hamletDirs){ if(d.angleTo(h)<0.3){ ok=false; break; } }
    if(ok) hamletDirs.push(d);
  }
  hamletDirs.forEach(d=>{
    for(let i=0;i<70;i++){
      const dd=d.clone().add(new THREE.Vector3((rand()-0.5)*0.05,(rand()-0.5)*0.05,(rand()-0.5)*0.05)).normalize();
      pushLight(dd.multiplyScalar(R+terrainH(dd)+0.1), rand()>0.5?cWarm:cCyan, 0.25+rand()*0.5);
    }
    const g=new THREE.Group();
    g.position.copy(d.clone().multiplyScalar(R+terrainH(d)));
    g.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), d);
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.55,16,8,0,Math.PI*2,0,Math.PI/2), domeMat(0.3)));
    for(let k=0;k<3;k++){
      const hb=new THREE.Mesh(new THREE.BoxGeometry(0.4+rand()*0.2,0.22,0.3), matWarm);
      const a=rand()*Math.PI*2;
      hb.position.set(Math.cos(a)*(0.8+rand()*0.5),0.11,Math.sin(a)*(0.8+rand()*0.5));
      hb.rotation.y=rand()*3; g.add(hb);
    }
    addGlow(g, new THREE.Vector3(0,0.7,0), 0xffd9a0, 1.5);
    marsGroup.add(g);
  });
  // 城际磁悬浮干线 ×5（发光管道 + 巡航列车 + 沿线灯火）
  const corridors=[[0,1],[0,2],[0,3],[1,4],[2,4],[3,5]];
  corridors.forEach(([ia,ib])=>{
    const a=CITY_SITES[ia].dir, b=CITY_SITES[ib].dir;
    const cps=[];
    for(let i=0;i<=48;i++){
      const d=a.clone().lerp(b,i/48).normalize();
      cps.push(d.multiplyScalar(R+terrainH(d)+0.28));
    }
    const curve=new THREE.CatmullRomCurve3(cps);
    marsGroup.add(new THREE.Mesh(new THREE.TubeGeometry(curve,72,0.06,6),
      new THREE.MeshStandardMaterial({ color:0x2a3a46, roughness:0.5, metalness:0.6, emissive:0x49d7ff, emissiveIntensity:0.7 })));
    for(let i=0;i<80;i++) pushLight(curve.getPoint(rand()), cCyan, 0.2+rand()*0.35);
    for(let k=0;k<2;k++){
      const train=new THREE.Mesh(new THREE.CapsuleGeometry(0.07,0.55,4,8),
        new THREE.MeshBasicMaterial({ color:0xbff3ff }));
      marsGroup.add(train);
      animated.liners.push({ mesh:train, curve, speed:(0.014+rand()*0.012)*(k?-1:1), t:rand() });
    }
  });
  // 全球灯光层（夜面可见的「地球夜光」效果）
  const lg=new THREE.BufferGeometry();
  lg.setAttribute('position', new THREE.Float32BufferAttribute(pts,3));
  lg.setAttribute('color', new THREE.Float32BufferAttribute(cols,3));
  marsGroup.add(new THREE.Points(lg, new THREE.PointsMaterial({ size:0.34, vertexColors:true, transparent:true,
    opacity:0.72, blending:THREE.AdditiveBlending, depthWrite:false })));
}

/* ---- 太空电梯 + 轨道空间港 ---- */
const elevatorTop = (()=> {
  const site = CITY_SITES[0];
  const surfP = surfPointOf(site);
  const topP = site.dir.clone().multiplyScalar(96);
  const len = topP.distanceTo(surfP);
  const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, len, 6),
    new THREE.MeshStandardMaterial({ color:0x9fb6c4, roughness:0.4, metalness:0.8, emissive:0x2c4a5e, emissiveIntensity:0.7 }));
  cable.position.copy(surfP).lerp(topP, 0.5);
  cable.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), site.dir);
  marsGroup.add(cable);
  const climber = new THREE.Mesh(new THREE.BoxGeometry(0.4,0.6,0.4),
    new THREE.MeshStandardMaterial({ color:0xdfe8ee, emissive:0x6ee7ff, emissiveIntensity:1.4 }));
  marsGroup.add(climber);
  animated.climber = { mesh:climber, a:surfP.clone(), b:topP.clone() };
  const st = new THREE.Group(); st.position.copy(topP);
  st.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), site.dir);
  st.add(new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.42, 10, 40).rotateX(Math.PI/2), matMetal));
  st.add(new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), matDark));
  for(let i=0;i<4;i++){
    const panel = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.06, 0.9), matSolar);
    const a = i*Math.PI/2; panel.position.set(Math.cos(a)*3.4, 0, Math.sin(a)*3.4); panel.rotation.y = -a;
    st.add(panel);
  }
  addGlow(st, new THREE.Vector3(0,0,0), 0x8fe8ff, 6);
  st.userData.infoKey = 'spaceport';
  marsGroup.add(st); pickables.push(st);
  return st;
})();

// 轨道船坞环 + 飞船
{
  const dock = new THREE.Mesh(new THREE.TorusGeometry(72, 0.22, 8, 128),
    new THREE.MeshStandardMaterial({ color:0x8a97a4, roughness:0.5, metalness:0.7, emissive:0x33506a, emissiveIntensity:0.6 }));
  dock.rotation.x = Math.PI/2 - 0.4; dock.rotation.z = 0.25;
  marsGroup.add(dock);
}
function makeShip(){
  const s = new THREE.Group();
  s.add(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 1.8, 10).rotateZ(Math.PI/2), matMetal));
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.55, 10).rotateZ(-Math.PI/2), matDark);
  nose.position.x = 1.15; s.add(nose);
  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 0.7), matDark); fin.position.x = -0.7; s.add(fin);
  addGlow(s, new THREE.Vector3(-1.05, 0, 0), 0x7fc8ff, 1.6);
  return s;
}
for(let i=0;i<6;i++){
  const ship = makeShip(); marsGroup.add(ship);
  animated.ships.push({ mesh:ship, r:78+i*8, speed:0.05+rand()*0.05, phase:rand()*Math.PI*2, tilt:0.3+i*0.22 });
}

/* ================= 火卫一 & 火卫二 ================= */
function makeMoon(radius, colorHex, seed){
  const r2 = mulberry32(seed);
  const geo = new THREE.IcosahedronGeometry(radius, 3);
  const pos = geo.attributes.position; const v = new THREE.Vector3();
  const dents = [];
  for(let i=0;i<9;i++){ dents.push({ d:new THREE.Vector3(r2()*2-1, r2()*2-1, r2()*2-1).normalize(), r:0.25+r2()*0.4, depth:0.12+r2()*0.14 }); }
  for(let i=0;i<pos.count;i++){
    v.fromBufferAttribute(pos, i);
    const dir = v.clone().normalize();
    let k = 1 + fbm(dir.x*2+seed, dir.y*2+seed, dir.z*2+seed, 3)*0.22;
    for(const c of dents){ const ang = dir.angleTo(c.d); if(ang < c.r){ k -= c.depth*(1 - ang/c.r); } }
    v.copy(dir).multiplyScalar(radius*k);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color:colorHex, roughness:0.95, metalness:0.02 }));
}
{
  const phobos = makeMoon(2.6, 0x6b615a, 101);
  const pv = new THREE.Group(); pv.add(phobos); phobos.position.set(132, 8, 0); pv.rotation.z = 0.06;
  scene.add(pv); animated.moons.push({ pivot:pv, mesh:phobos, speed:0.055, spin:0.15 });
  const deimos = makeMoon(1.6, 0x57504a, 202);
  const dv = new THREE.Group(); dv.add(deimos); deimos.position.set(-185, -14, 0); dv.rotation.z = -0.12;
  scene.add(dv); animated.moons.push({ pivot:dv, mesh:deimos, speed:0.028, spin:0.08 });
}

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

/* ================= 信息 & 交互 ================= */
const INFO = {
  capital: { title:'火星首都 · Aurelia', body:'人口 42 万，火星最大城市。直径 8 km 的巨型穹顶之下：摩天塔群、中央广场、光环磁悬浮、空中交通层与整片生态绿地——火星版未来纽约。',
    npc:['城市规划师 · 岚','"地球上城市消耗自然，这里的城市本身就是自然——氧气、水、温度，全部由我们亲手维持。这不是殖民地，是家。"'] },
  eco: { title:'翡绿生态城 · Verde', body:'火星版新加坡。主穹顶内是人工森林、生态运河与垂直农场，副穹顶是温室农田。红色荒漠与绿色生命只隔一层 40 cm 的复合玻璃。',
    npc:['生态工程师 · 苔','"每一片叶子的光照、每一滴水的循环都由 AI 气候系统照料。我们把地下两万年的冰，变成了流动的河。"'] },
  industrial: { title:'赫菲斯托斯工业城', body:'火星赤道工业带核心：聚变能源塔、液氢储罐、水冰加工厂、星舰总装厂房、机器人产线与真空货运轨道。每 72 小时，一艘货运飞船在这里总装完成。',
    npc:['火箭工程师 · 卡尔','"月球是跳板，火星是船坞。从这里出发的飞船，用的是火星的冰、火星的燃料、火星造的引擎。"'] },
  mining: { title:'冰川矿城 · Glacies', body:'建立在北纬 52° 富冰带之上。钻塔深入地下冰层 2.4 km，采冰机器人全天候作业，冰浆经管道输往赤道——火星文明的水龙头。',
    npc:['采矿监督 AI · W-7','"今日产冰 12,400 吨。提醒：这颗星球 60% 的饮用水，经过我的钻头。"'] },
  frontier: { title:'前哨城 · Frontier', body:'南半球最新落成的居住穹顶，容纳 6 万新移民。打印机器人 + 预制穹顶 + 成熟生态模板，让「造一座城」只需要 14 个月。',
    npc:['新移民 · 阿梨','"我出生在地球，但我女儿出生在这里。对她来说，火星不是远方，是故乡。"'] },
  spaceport: { title:'轨道空间港 · Areos Gate', body:'太空电梯顶端枢纽，客运舱 6 小时直达轨道。货运飞船在此补给燃料，前往地球、月球与正在施工的外太阳系航路。',
    npc:['塔台管制员','"欢迎回家。下一次地火转移窗口在 14 个月后——船票已经排到明年了。"'] },
  research: { title:'奥林帕斯科研站', body:'坐落于奥林帕斯山麓的综合科研基地：巡天观测穹顶、射电天线阵、综合实验舱与样本冷藏库。火星的地质、气候与生命科学数据，都在这里被逐条破译。',
    npc:['科研站站长 · 林澈','"今日风速 34 m/s，气压 612 Pa，观测条件：极佳。晨线之后能看到奥林帕斯山——值得一看。"'] },
};
const infoPanel = document.getElementById('info');
function showInfo(key){
  const d = INFO[key]; if(!d) return;
  infoPanel.innerHTML = `<h3>${d.title}</h3><p>${d.body}</p>
    <div class="npc"><b>${d.npc[0]}</b><br>${d.npc[1]}</div>`;
}
function showBuilding(btype, idx){
  const d = BINFO[btype]; if(!d) return;
  infoPanel.innerHTML = `<span class="tag">BUILDING ${String(idx).padStart(2,'0')}</span>
    <h3>${d.name}</h3><p>${d.desc}</p>`;
}

/* ---------- 模式管理：星球 / 城市 ---------- */
let mode = 'planet';            // 'planet' | 'city'
let currentCity = null;
const backBtn = document.getElementById('backBtn');
const hintEl = document.getElementById('hint');

let camAnim = null;
const easeIO = t => t<0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;
function flyTo(pos, target, dur=2.2, cb){
  camAnim = { t:0, dur, fromP:camera.position.clone(), toP:pos.clone(),
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
  mode = 'city'; currentCity = cityG;
  flyTo(v.pos, v.tg, 2.6, ()=>{
    controls.minDistance = 1.2;
    controls.maxDistance = cityG.userData.radius * 7;
    backBtn.style.display = 'block';
    hintEl.textContent = '拖动环视城市 · 滚轮缩放 · 点击建筑查看';
  });
}
function exitCity(){
  mode = 'planet'; currentCity = null;
  backBtn.style.display = 'none';
  hintEl.textContent = '拖动旋转 · 滚轮缩放 · 点击城市进入';
  controls.minDistance = 64; controls.maxDistance = 700;
  flyTo(capViewPos.clone().add(new THREE.Vector3(0,20,15)), new THREE.Vector3(0,0,0), 2.4, ()=>{ controls.autoRotate = true; });
}
backBtn.onclick = exitCity;

/* ---------- 地表探索模式（第一/第三人称） ---------- */
const exploreHud  = document.getElementById('exploreHud');
const exploreLoc  = document.getElementById('exploreLoc');
const exploreAim  = document.getElementById('exploreAim');
const aimT = document.getElementById('aimT');
const aimD = document.getElementById('aimD');

const explore = { dir:new THREE.Vector3(0,0,1), yaw:0, pitch:0, third:true, dist:0.9, clickDir:null };
const keys = {};
const exploreTargets = [];
Object.keys(cityGroups).forEach(k=>exploreTargets.push(...(cityGroups[k].userData.buildings||[])));
const EXPLORE_NAMES = { capital:'火星首都 · Aurelia', industrial:'赫菲斯托斯工业城', eco:'翡绿生态城 · Verde',
  mining:'冰川矿城 · Glacies', frontier:'前哨城 · Frontier', research:'奥林帕斯科研站' };

// 玩家角色：星达适配器（探索模式实例，首次着陆时创建）——视觉与行走逻辑解耦，见 XingdaAvatarAdapter
let exploreAvatar = null;

const _eN=new THREE.Vector3(), _eE=new THREE.Vector3(), _eF=new THREE.Vector3(),
      _eR=new THREE.Vector3(), _eM=new THREE.Vector3(), _eT=new THREE.Vector3(),
      _eX=new THREE.Vector3(), _eP=new THREE.Vector3(), _eC=new THREE.Vector2(0,0);
const _eBM=new THREE.Matrix4();
let aimTimer=0, locTimer=0, walkPhase=0;
let jumpY=0, jumpV=0;               // 低重力跳跃
// 建筑世界坐标缓存（近距自动查看用，场景静止只需算一次）
const targetWorld = exploreTargets.map(o=>({ o, p:new THREE.Vector3() }));
targetWorld.forEach(t=>t.o.getWorldPosition(t.p));
// NPC 世界坐标缓存
npcList.forEach(n=>n.mesh.getWorldPosition(n.worldPos));
// NPC 对话 DOM
const npcDialog = document.getElementById('npcDialog');
const npcAvatar = document.getElementById('npcAvatar');
const npcNameEl = document.getElementById('npcName');
const npcRoleEl = document.getElementById('npcRole');
const npcLineEl = document.getElementById('npcLine');
let activeNPC = null, npcLineIdx = 0;

// 探索头灯（夜面补光，仅在探索模式开启）
const headlamp = new THREE.PointLight(0xcfe8ff, 0, 5, 1.8);
scene.add(headlamp);

/* ---------- 星达引导层：同伴 / 发现 / 目标 ---------- */
const xdDialog = document.getElementById('xdDialog');
const xdLineEl = document.getElementById('xdLine');
const objT = document.getElementById('objT');
const objC = document.getElementById('objC');
const discBanner = document.getElementById('discBanner');
const discName = document.getElementById('discName');

// 星达同伴：程序化 3D 角色（毛绒蓝绿身体 / 星空大眼 / 触角星球 / 发光项圈 / 尾巴）
const xd = { char:null, queue:[], typed:0, lineTimer:0, hold:4.4 };
const xdGaze  = { target:new THREE.Vector3(), timer:0 };   // 视线系统
const xdBlink = { timer:2.5, phase:0 };                    // 眨眼
const xdEmote = { name:null, t:0, dur:0 };                 // 表情动作：wave/happy/confused/think
const _m4 = new THREE.Matrix4(), _q1 = new THREE.Quaternion(), _q2 = new THREE.Quaternion();
const XD_CLICK = ['嗯？你叫我吗？','嘿嘿，我在呢。','戳我干嘛啦……要问路的话，按 F 就好。','哇！吓我一跳。','喜欢我触角上的小星球吗？'];
const XD_IDLE = ['（张望）今天的风很温柔，适合去纪念碑那边走走。','你听——远处的磁悬浮，是这座城市的脉搏。','不急。火星的一天有 24 小时 39 分钟，我们慢慢来。'];
// 环境行为：设施类别首次靠近 → 星达关注/介绍（一次性）
const XD_FAC = {
  aero:  { types:['crocket','cship','mgantry'], line:'看那些火箭——每 72 小时，就有一艘从这里点火升空。将来你去轨道港，坐的就是它。' },
  energy:{ types:['battery','solarfarm','etree'], line:'这片是城市的充电宝。火星的白天很长，沙暴季更长——没有它们，穹顶里的灯撑不过三天。' },
  life:  { types:['habmod','plaza'], line:'有人住的地方就有光。工程师下班会去广场喝一杯——火星咖啡，喝一口，少一口地球味。' },
  maker: { types:['fabhall'], line:'这座车间里的东西，八成是用火星土造的。我们不从地球搬房子——我们在这里「种」房子。' },
  ice:   { types:['iceplant','watertower','drill'], line:'你呼吸的氧、喝的水，都来自脚下 2.4 公里的冰层。生命维持系统，是这颗星球的心跳——别只把它当工厂看。' },
};
const xdPointTarget = new THREE.Vector3();
const xdFacSeen = new Set();
let xdAllDone = false;
let xdIdleT = 0;   // 无操作计时
let xdNoticeT = 0;   // 被注视察觉的冷却
const XD_NOTICE = ['（对上视线）嗯？我脸上有东西吗？','（注意到你）在看什么？带我一个。','（歪头）你一直盯着我看的时候，触角会紧张的。'];
function xdFacCheck(btype, obj){
  for(const k in XD_FAC){
    const f = XD_FAC[k];
    if(!f.types.includes(btype) || xdFacSeen.has(k)) continue;
    xdFacSeen.add(k);
    obj.getWorldPosition(xdPointTarget);
    xdGaze.target.copy(xdPointTarget); xdGaze.timer = 3.5;
    xdEmotePlay('point');
    xdSay(f.line);
    return;
  }
}
function xdEmotePlay(name){
  xdEmote.name = name; xdEmote.t = 0;
  xdEmote.dur = { wave:2.2, happy:2.6, confused:2.8, think:3.2, point:2.4 }[name] || 2.5;
}

function xdEyeTexture(){
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const x = c.getContext('2d');
  const grd = x.createRadialGradient(64, 72, 10, 64, 64, 64);
  grd.addColorStop(0, '#1c3f66'); grd.addColorStop(0.55, '#0e2140'); grd.addColorStop(1, '#050c1c');
  x.fillStyle = grd; x.fillRect(0, 0, 128, 128);
  for(let i=0;i<26;i++){   // 眼底星空
    x.fillStyle = ['#ffffff','#ffe27a','#8fd8ff'][i%3];
    x.beginPath(); x.arc(Math.random()*128, Math.random()*128, Math.random()*1.5+0.6, 0, 7); x.fill(); }
  x.fillStyle = 'rgba(255,255,255,.95)'; x.beginPath(); x.arc(46, 42, 13, 0, 7); x.fill();   // 大高光
  x.fillStyle = 'rgba(255,255,255,.65)'; x.beginPath(); x.arc(82, 68, 6, 0, 7); x.fill();
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;   // 允许贴图偏移——眼神移动用
  return tex;
}

function makeXingda(){
  const g = new THREE.Group();
  const matBody  = new THREE.MeshStandardMaterial({ color:0x3ec2b4, roughness:0.95, metalness:0 });
  const matBodyD = new THREE.MeshStandardMaterial({ color:0x32a89b, roughness:0.95 });
  const matCream = new THREE.MeshStandardMaterial({ color:0xf6f1e7, roughness:0.9 });
  const matBlush = new THREE.MeshBasicMaterial({ color:0xf7a8b8, transparent:true, opacity:0.75 });
  const matEye   = new THREE.MeshBasicMaterial({ map:xdEyeTexture() });
  const matMouth = new THREE.MeshBasicMaterial({ color:0x8a3b42 });
  const matOrb   = new THREE.MeshBasicMaterial({ color:0xe4f78a });
  const matCollar= new THREE.MeshStandardMaterial({ color:0xb9c4cc, roughness:0.3, metalness:0.85 });
  const matGem   = new THREE.MeshBasicMaterial({ color:0xffe27a });

  // 身体（呼吸缩放对象）
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.026, 0.03, 4, 12), matBody);
  body.position.y = 0.045; g.add(body);
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.02, 12, 10), matCream);
  belly.position.set(0, 0.042, 0.013); belly.scale.set(1, 1.15, 0.62); g.add(belly);
  for(const s of [-1,1]){   // 脚
    const foot = new THREE.Mesh(new THREE.CapsuleGeometry(0.009, 0.012, 4, 8), matBodyD);
    foot.position.set(s*0.012, 0.01, 0.004); g.add(foot); }
  // 手臂（肩部枢轴，右臂可挥动 / 左臂思考托腮）
  const armL = new THREE.Group(); armL.position.set(-0.024, 0.056, 0); g.add(armL);
  const armLm = new THREE.Mesh(new THREE.CapsuleGeometry(0.008, 0.02, 4, 8), matBodyD);
  armLm.position.y = -0.014; armL.add(armLm); armL.rotation.z = 0.3;
  const armR = new THREE.Group(); armR.position.set(0.024, 0.056, 0); g.add(armR);
  const armRm = armLm.clone(); armRm.position.y = -0.014; armR.add(armRm); armR.rotation.z = -0.3;
  // 尾巴（根部枢轴，可摇摆）
  const tail = new THREE.Group(); tail.position.set(0, 0.034, -0.024); g.add(tail);
  const tailM = new THREE.Mesh(new THREE.CapsuleGeometry(0.006, 0.02, 4, 8), matBodyD);
  tailM.position.set(0, 0.012, -0.012); tailM.rotation.x = 0.8; tail.add(tailM);
  const tailTip = new THREE.Mesh(new THREE.SphereGeometry(0.011, 10, 8), matCream);
  tailTip.position.set(0, 0.026, -0.026); tail.add(tailTip);

  // 头部（视线转动对象）
  const head = new THREE.Group(); head.position.y = 0.09; g.add(head);
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.036, 18, 14), matBody);
  skull.scale.set(1.05, 0.95, 0.95); head.add(skull);
  const face = new THREE.Mesh(new THREE.SphereGeometry(0.03, 16, 12), matCream);
  face.position.set(0, -0.004, 0.013); face.scale.set(0.95, 0.8, 0.55); head.add(face);
  // 星空大眼（眨眼缩放对象）
  const eyeGeo = new THREE.SphereGeometry(0.011, 14, 10);
  const eyeL = new THREE.Group(); eyeL.position.set(-0.016, 0.004, 0.024); head.add(eyeL);
  const eyeLm = new THREE.Mesh(eyeGeo, matEye); eyeLm.scale.set(1, 1.25, 0.45); eyeL.add(eyeLm);
  const eyeR = new THREE.Group(); eyeR.position.set(0.016, 0.004, 0.024); head.add(eyeR);
  const eyeRm = new THREE.Mesh(eyeGeo, matEye); eyeRm.scale.set(1, 1.25, 0.45); eyeR.add(eyeRm);
  for(const s of [-1,1]){   // 腮红
    const bl = new THREE.Mesh(new THREE.SphereGeometry(0.005, 8, 6), matBlush);
    bl.position.set(s*0.023, -0.007, 0.02); bl.scale.set(1, 0.7, 0.4); head.add(bl); }
  // 嘴（表情组：微笑 / 开心 / 疑惑 / 思考）
  const mouths = {};
  const mSmile = new THREE.Mesh(new THREE.TorusGeometry(0.007, 0.0016, 6, 12, Math.PI), matMouth);
  mSmile.rotation.z = Math.PI; mouths.smile = mSmile;
  const mOpen = new THREE.Mesh(new THREE.SphereGeometry(0.005, 8, 6), matMouth);
  mOpen.scale.set(1, 1.3, 0.5); mouths.open = mOpen;
  mouths.flat = new THREE.Mesh(new THREE.BoxGeometry(0.009, 0.0018, 0.0018), matMouth);
  mouths.o = new THREE.Mesh(new THREE.TorusGeometry(0.0035, 0.0014, 6, 10), matMouth);
  Object.values(mouths).forEach(m=>{ m.position.set(0, -0.013, 0.028); m.visible=false; head.add(m); });
  mouths.smile.visible = true;
  // 触角 ×2（顶端星球）
  function antenna(side){
    const p = new THREE.Group(); p.position.set(side*0.014, 0.03, 0);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.0025, 0.003, 0.032, 6), matBodyD);
    stem.position.y = 0.016; p.add(stem);
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.0075, 10, 8), matOrb);
    orb.position.y = 0.036; p.add(orb);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.011, 0.0012, 6, 16).rotateX(Math.PI/2.4), matGem);
    ring.position.y = 0.036; p.add(ring);
    p.rotation.z = side*-0.28;
    head.add(p); return p;
  }
  const antL = antenna(-1), antR = antenna(1);
  // 发光项圈
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.024, 0.004, 8, 20).rotateX(Math.PI/2), matCollar);
  collar.position.y = 0.066; g.add(collar);
  const gem = new THREE.Mesh(new THREE.SphereGeometry(0.006, 10, 8), matGem);
  gem.position.set(0, 0.064, 0.023); g.add(gem);
  addGlow(g, new THREE.Vector3(0, 0.064, 0.026), 0xffe27a, 0.35);

  g.visible = false;
  scene.add(g);
  return { g, body, head, eyeL, eyeR, mouths, antL, antR, armL, armR, tail };
}
const XD3D = makeXingda();
xd.char = XD3D.g;
const xdEyeMat = XD3D.eyeL.children[0].material;   // 双眼共用材质：偏移贴图实现眼神移动

// 星达对白：队列 + 打字机（条目可携带 act，在该句开始打字时执行动作）
function xdSay(items){ (Array.isArray(items) ? items : [items]).forEach(l=>xd.queue.push(typeof l === 'string' ? { t:l } : l)); }
function xdReset(){ xd.queue.length = 0; xd.typed = 0; xd.lineTimer = 0; xdDialog.classList.remove('on'); }

const XD_LINES = {
  capital:   '这就是 Aurelia——火星的心脏。看到那根最高的尖塔了吗？那是 Musk 纪念碑，全火星最高的建筑。走近它，你会读到一段铭文。',
  eco:       'Verde 到了。红色荒漠里的一整块森林——穹顶里面，连空气都是甜的。',
  industrial:'Hephaestus 工业城。听见了吗？每 72 小时，这里就有一艘新船点火升空。',
  mining:    'Glacies，火星的水龙头。你脚下 2.4 公里深处，冰层正在变成整颗星球的饮用水。',
  frontier:  'Frontier——最新的一座城。14 个月前这里还只有风。现在，6 万人管这里叫家。',
  research:  '奥林帕斯科研站。天气好的话抬头看看——太阳系最高的山，就在你旁边。',
};

// 发现系统：城市初始未发现，走近才揭示（探索节奏核心）
const discovered = new Set();
let yardSeen = false;   // 城郊带首次抵达
let statueSeen = false; // 马斯克雕像首次仰望
let objective = null;   // 当前目标 site

// 目标引导光柱（仅探索模式可见）
const beacon = new THREE.Mesh(
  new THREE.CylinderGeometry(0.32, 0.55, 15, 12, 1, true),
  new THREE.MeshBasicMaterial({ color:0x7df2c9, transparent:true, opacity:0.13,
    blending:THREE.AdditiveBlending, side:THREE.DoubleSide, depthWrite:false }));
beacon.visible = false; beacon.renderOrder = 4;
scene.add(beacon);

// —— 探索模式大气：暖色尘雾（仅地表开启）+ 漂浮沙尘——地表的「空气感」与纵深 ——
const EXPLORE_FOG = new THREE.FogExp2(0x9a6238, 0.05);
const dustN = 260, dustPos = new Float32Array(dustN*3);
for(let i=0;i<dustN;i++){
  dustPos[i*3]   = (Math.random()-0.5)*6;
  dustPos[i*3+1] = Math.random()*1.1 + 0.05;
  dustPos[i*3+2] = (Math.random()-0.5)*6;
}
const dustGeo = new THREE.BufferGeometry();
dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
const gDust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color:0xd9a06a, size:0.02,
  transparent:true, opacity:0.38, depthWrite:false }));
gDust.visible = false;
scene.add(gDust);
const DUST_UP = new THREE.Vector3(0, 1, 0);

function updateObjective(){
  let best = null, bd = 1e9;
  for(const s of CITY_SITES){
    if(discovered.has(s.id)) continue;
    const d = explore.dir.angleTo(s.dir);
    if(d < bd){ bd = d; best = s; }
  }
  objective = best;
  objT.textContent = best ? `目标 · 前往 ${EXPLORE_NAMES[best.id]}` : '目标 · 自由探索——这颗星球已经是你的了';
  objC.textContent = `已发现区域 ${discovered.size} / ${CITY_SITES.length}`;
  if(best){
    beacon.position.copy(cityGroups[best.id].position).addScaledVector(best.dir, 7.5);
    beacon.visible = mode === 'explore';
  } else {
    beacon.visible = false;
    if(!xdAllDone && discovered.size === CITY_SITES.length){   // 完成全部探索 → 星达开心庆祝
      xdAllDone = true;
      xdEmotePlay('happy');
      xdSay('六个区域都走过了。旅行者——你现在比 90% 的新移民，更懂这颗星球。');
    }
  }
}

function onDiscover(id){
  discName.textContent = '已发现 · ' + EXPLORE_NAMES[id];
  discBanner.classList.remove('pop'); void discBanner.offsetWidth; discBanner.classList.add('pop');
  xdGaze.target.copy(cityGroups[id].position); xdGaze.timer = 3;   // 星达先看向新发现
  xdEmotePlay('happy');                                            // 发现城市 → 兴奋
  xdSay(XD_LINES[id]);
  updateObjective();
}

function tangentBasis(up){
  _eN.set(0,1,0).addScaledVector(up, -up.y).normalize();   // 切平面「北」
  _eE.crossVectors(_eN, up);                               // 切平面「东」
}

function enterExplore(cityG){
  stopTour(); camAnim = null;
  const cdir = cityG ? cityG.position.clone().normalize() : camera.position.clone().normalize();
  tangentBasis(cdir);
  explore.dir.copy(cdir).addScaledVector(_eE, 0.16).addScaledVector(_eN, -0.13).normalize();
  _eT.copy(cdir).addScaledVector(explore.dir, -cdir.dot(explore.dir)).normalize();  // 指向城心
  tangentBasis(explore.dir);
  explore.yaw = Math.atan2(_eT.dot(_eE), _eT.dot(_eN));
  explore.pitch = 0.06;
  explore.clickDir = null;                 // 进入时清空点击移动目标
  mode = 'explore'; currentCity = null;
  controls.enabled = false; controls.autoRotate = false;
  backBtn.style.display = 'none';
  document.getElementById('nav').style.display = 'none';
  document.getElementById('actions').style.display = 'none';
  document.getElementById('stats').style.display = 'none';
  document.getElementById('titleBox').style.display = 'none';
  infoPanel.style.display = 'none';
  hintEl.style.display = 'none';
  exploreHud.classList.add('on');
  syncVisor();
  scene.fog = EXPLORE_FOG;          // 地表尘雾开启
  gDust.visible = true;
  exploreAvatar = GlobalCompanion.mount(scene, 0.21);   // Global Companion：同一只星达（球面探索尺度 ≈0.2m）
  // 显示 NPC（居民穿便服，科研人员着青灰工作服——火星上没有机器人角色，星达是唯一的智能生命体）
  npcList.forEach(n=>{ n.mesh.visible = true; });
  headlamp.intensity = 1.8;
  showToast('已着陆 · 地表探索模式');
  // 星达登场：玩家即星达——同伴模型不出场，只保留独白与情绪系统
  xdReset();
  if(xd.char){
    xd.char.visible = false;
    xd.char.position.copy(explore.dir).multiplyScalar(R + terrainH(explore.dir) + 0.34);
    xdGaze.target.copy(camera.position); xdGaze.timer = 3;
  }
  xdSay([
    { t:'着陆确认。欢迎来到火星，旅行者。', act:()=>xdEmotePlay('wave') },
    { t:'这里是 2126 年的火星——人类的第二家园。' },
    { t:'那边就是首都 Aurelia。跟我来，我们走过去。', act:()=>{
      if(objective){ xdPointTarget.copy(cityGroups[objective.id].position); xdEmotePlay('point'); }
    } },
  ]);
  updateObjective();
  // 注：探索模式不锁定鼠标（禁止 Pointer Lock），保持正常网页交互
}

function exitExplore(){
  if(mode!=='explore') return;
  mode = 'planet';
  exploreHud.classList.remove('on');
  exploreAim.classList.remove('on');
  npcDialog.classList.remove('on');
  activeNPC = null;
  visorEl.classList.remove('on');
  scene.fog = null;                 // 离开地表，恢复深空通透
  gDust.visible = false;
  jumpY = 0; jumpV = 0;
  camera.fov = 48; camera.updateProjectionMatrix();
  if(exploreAvatar) exploreAvatar.detach();
  headlamp.intensity = 0;
  xdReset();
  if(xd.char){ xd.char.visible = false; xdEmote.name = null; }
  beacon.visible = false;
  camera.up.set(0,1,0);
  document.getElementById('nav').style.display = '';
  document.getElementById('actions').style.display = '';
  document.getElementById('stats').style.display = '';
  document.getElementById('titleBox').style.display = '';
  infoPanel.style.display = '';
  hintEl.style.display = '';
  hintEl.textContent = '拖动旋转 · 滚轮缩放 · 点击城市进入';
  controls.minDistance = 64; controls.maxDistance = 700;
  controls.target.set(0,0,0);
  flyTo(explore.dir.clone().multiplyScalar(180), new THREE.Vector3(0,0,0), 2.2, ()=>{ controls.autoRotate = true; });
}
document.getElementById('btnSurface').onclick = ()=>{ if(mode==='surface') exitSurface(); else exitExplore(); };
// 登陆流程：轨道俯冲 → 减速接近地表 → 进入探索模式
let landing = false;
function landAt(cityG){
  if(landing || !cityG) return;
  landing = true;
  stopTour();
  showToast('进入大气层 · 减速着陆中…');
  const cdir = cityG.position.clone().normalize();
  tangentBasis(cdir);
  const landDir = cdir.clone().addScaledVector(_eE, 0.16).addScaledVector(_eN, -0.13).normalize();
  const approach = landDir.clone().multiplyScalar(R + terrainH(landDir) + 5.5).addScaledVector(_eN, 3.5);
  const tg = cdir.clone().multiplyScalar(R + terrainH(cdir) + 1.5);
  flyTo(approach, tg, 3.0, ()=>{
    landing = false;
    enterExplore(cityG);
  });
}
document.getElementById('btnLand').onclick = ()=>{
  if(mode==='explore' || landing) return;
  if(mode==='city' && currentCity){ landAt(currentCity); return; }
  const cd = camera.position.clone().normalize();
  let best=null, bd=1e9;
  for(const k in cityGroups){
    const d = cityGroups[k].position.clone().normalize().angleTo(cd);
    if(d<bd){ bd=d; best=cityGroups[k]; }
  }
  landAt(best);
};

function updateExplore(dt, t){
  const up = explore.dir;
  headlamp.position.copy(up).multiplyScalar(R + terrainH(up) + 0.3);
  tangentBasis(up);
  _eF.copy(_eN).applyAxisAngle(up, -explore.yaw);           // 前方
  _eR.copy(_eF).applyAxisAngle(up, -Math.PI/2);             // 右方
  // WASD 移动（贴合地形起伏）
  _eM.set(0,0,0);
  if(keys['w']) _eM.add(_eF);
  if(keys['s']) _eM.sub(_eF);
  if(keys['d']) _eM.add(_eR);
  if(keys['a']) _eM.sub(_eR);
  let moving = false;
  if(_eM.lengthSq() > 0){
    moving = true;
    explore.clickDir = null;               // 键盘接管，立即取消点击目标
    _eM.normalize();
    const ang = (keys['shift'] ? 3.2 : 1.15) * dt / (R + terrainH(up));
    up.multiplyScalar(Math.cos(ang)).addScaledVector(_eM, Math.sin(ang)).normalize();
    walkPhase += dt * (keys['shift'] ? 14 : 9);
  }
  // 点击地面移动：无键盘输入时沿地表走向点击点（不瞬移，接近减速停止；身体始终直立、仅绕地表法线转向=Y轴）
  if(!moving && explore.clickDir){
    const angTo = up.angleTo(explore.clickDir);
    const arriveAng = Math.max(0.004, 0.2/(R + terrainH(up)));   // 约 20cm，按角色尺度到达才停
    if(angTo < arriveAng){ explore.clickDir = null; }
    else{
      _eM.copy(explore.clickDir).addScaledVector(up, -up.dot(explore.clickDir)).normalize(); // 目标在切平面上的方向
      explore.yaw = Math.atan2(_eM.dot(_eE), _eM.dot(_eN));   // 身体朝目标（仅偏航，不倾覆）
      const ang = Math.min(angTo, 1.15 * dt / (R + terrainH(up)));
      up.multiplyScalar(Math.cos(ang)).addScaledVector(_eM, Math.sin(ang)).normalize();
      walkPhase += dt * 9;
      moving = true;
    }
  }
  // 低重力跳跃（空格）
  if(jumpV !== 0 || jumpY > 0){
    jumpY += jumpV*dt;
    jumpV -= 1.35*dt;                 // 火星重力手感：起跳慢、落地缓
    if(jumpY <= 0){ jumpY = 0; jumpV = 0; }
  }
  const ground = R + terrainH(up);
  _eT.copy(_eF).multiplyScalar(Math.cos(explore.pitch)).addScaledVector(up, Math.sin(explore.pitch)); // 视线
  camera.up.copy(up);
  if(explore.third){
    if(exploreAvatar){
      exploreAvatar.setVisible(true);
      _eX.copy(up).multiplyScalar(ground + jumpY);
      exploreAvatar.setPosition(_eX);
      _eM.crossVectors(up, _eF);
      _eBM.makeBasis(_eM, up, _eF);                            // 星达面朝前方
      _q1.setFromRotationMatrix(_eBM);
      exploreAvatar.setQuaternion(_q1);
      exploreAvatar.setState(jumpY > 0 ? 'jump' : moving ? (keys['shift'] ? 'run' : 'walk') : 'idle');
      exploreAvatar.update(dt);
    }
    camera.position.copy(_eX).addScaledVector(_eF, -explore.dist).addScaledVector(up, explore.dist*0.5);
    _eM.copy(camera.position).normalize();                   // 防止相机钻入地形
    const minR = R + terrainH(_eM) + 0.1;
    if(camera.position.length() < minR) camera.position.copy(_eM.multiplyScalar(minR));
    _eM.copy(_eX).addScaledVector(up, 0.15).addScaledVector(_eF, 0.8);
    camera.lookAt(_eM);
  } else {
    if(exploreAvatar) exploreAvatar.setVisible(false);
    // 第一人称：视高 + 步伐起伏 + 跳跃
    const bob = moving ? Math.abs(Math.sin(walkPhase))*0.012 : 0;
    camera.position.copy(up).multiplyScalar(ground + 0.16 + jumpY + bob);
    _eM.copy(camera.position).add(_eT);
    camera.lookAt(_eM);
    if(moving) camera.rotateZ(Math.sin(walkPhase)*0.008);    // 行走微侧倾
  }
  // 冲刺视野外扩
  const targetFov = (keys['shift'] && moving) ? 55 : 48;
  if(Math.abs(camera.fov - targetFov) > 0.05){
    camera.fov += (targetFov - camera.fov)*Math.min(1, dt*6);
    camera.updateProjectionMatrix();
  }
  // —— 星达同伴：跟随 + 程序化动画（呼吸/眨眼/视线/触角/尾巴/表情动作）
  if(xd.char && xd.char.visible){
    _eX.copy(up).multiplyScalar(ground + jumpY);
    _eM.copy(_eX).addScaledVector(_eF, 0.5).addScaledVector(_eR, -0.3).addScaledVector(up, 0.34 + Math.sin(t*2.2)*0.02);
    if(xdEmote.name === 'happy') _eM.addScaledVector(up, Math.abs(Math.sin(xdEmote.t*7))*0.05);   // 开心弹跳
    const xdGap = xd.char.position.distanceTo(_eM);
    if(xdGap > 0.45) _eM.addScaledVector(up, Math.abs(Math.sin(t*11))*0.05);     // 被甩开时小跳追赶
    xd.char.position.lerp(_eM, Math.min(1, dt*(xdGap > 0.45 ? 6 : 3.5)));        // 落后时加速跟上
    // 身体慢速转向玩家（头部先行、身体随后——活物的转身节奏）
    _eP.copy(_eX).addScaledVector(up, 0.16);
    _m4.lookAt(_eP, xd.char.position, up);
    _q1.setFromRotationMatrix(_m4);
    xd.char.quaternion.slerp(_q1, Math.min(1, dt*2.2));
    xd.char.rotation.y += Math.sin(t*0.5)*0.1;                                    // 轻微游移，不永远正面
    xd.char.rotation.z = xdEmote.name === 'confused' ? 0.14 : Math.sin(t*0.8)*0.03;   // 疑惑歪头 / 常态重心微摆
    // 呼吸
    XD3D.body.scale.y = 1 + Math.sin(t*2.4)*0.045;
    // 眨眼
    xdBlink.timer -= dt;
    if(xdBlink.timer <= 0){ xdBlink.phase = 0.18; xdBlink.timer = 2 + Math.random()*3.5; }
    let eyeSY = 1;
    if(xdBlink.phase > 0){ xdBlink.phase -= dt; eyeSY = 1 - 0.92*Math.max(0, 1 - Math.abs(xdBlink.phase-0.09)/0.09); }
    // 情绪眼型：开心/挥手睁大，思考微眯
    const eyeWide = (xdEmote.name==='happy' || xdEmote.name==='wave') ? 1.12 : xdEmote.name==='think' ? 0.82 : 1;
    XD3D.eyeL.scale.set(eyeWide, eyeSY*eyeWide, 1); XD3D.eyeR.scale.set(eyeWide, eyeSY*eyeWide, 1);
    // 眼神移动：眼底星空随视线目标偏移（瞳孔追踪）
    XD3D.head.updateWorldMatrix(true, false);
    _eP.copy(xdGaze.target); XD3D.head.worldToLocal(_eP);
    const exOff = clamp(_eP.x*0.12, -0.05, 0.05), eyOff = clamp(_eP.y*0.12, -0.04, 0.04);
    xdEyeMat.map.offset.x += (exOff - xdEyeMat.map.offset.x)*Math.min(1, dt*5);
    xdEyeMat.map.offset.y += (eyOff - xdEyeMat.map.offset.y)*Math.min(1, dt*5);
    // 触角摆动
    XD3D.antL.rotation.x = Math.sin(t*1.7)*0.12;
    XD3D.antR.rotation.x = Math.sin(t*1.7+1.3)*0.12;
    // 尾巴摇摆（开心时加速）
    const wagK = xdEmote.name === 'happy' ? 2.2 : 1;
    XD3D.tail.rotation.y = Math.sin(t*3.2*wagK)*0.35*wagK;
    // 视线变化：看玩家 / 看远处城市 / 看雕像 / 看地面
    xdGaze.timer -= dt;
    if(xdGaze.timer <= 0){
      xdGaze.timer = 3.5 + Math.random()*3.5;
      const r = Math.random();
      if(r < 0.5) xdGaze.target.copy(camera.position);
      else if(r < 0.68 && objective) xdGaze.target.copy(cityGroups[objective.id].position);
      else if(r < 0.8 && statueWorld) xdGaze.target.copy(statueWorld);
      else xdGaze.target.copy(xd.char.position).addScaledVector(_eF, 1.2).addScaledVector(up, -0.25);
      if(r >= 0.8 && Math.random() < 0.4 && !xdEmote.name) xdEmotePlay('confused');               // 看地面时偶尔疑惑
    }
    if(xdEmote.name === 'think') xdGaze.target.copy(xd.char.position).addScaledVector(up, 1.5).addScaledVector(_eR, 0.6);
    // 头部平滑转向视线目标
    XD3D.head.getWorldPosition(_eP);
    _m4.lookAt(xdGaze.target, _eP, up);
    _q1.setFromRotationMatrix(_m4);
    XD3D.head.parent.getWorldQuaternion(_q2).invert();
    _q1.premultiply(_q2);
    XD3D.head.quaternion.slerp(_q1, Math.min(1, dt*4));
    // 表情动作执行与结束
    if(xdEmote.name){
      xdEmote.t += dt;
      if(xdEmote.name === 'wave') XD3D.armR.rotation.z = -2.2 + Math.sin(t*9)*0.3;
      if(xdEmote.name === 'think'){ XD3D.armL.rotation.z = 1.1; XD3D.antR.rotation.z = -0.6; }
      if(xdEmote.name === 'point'){                                 // 指向动作：手臂伸展 + 视线锁定目标
        XD3D.armR.rotation.z = -1.5;
        xdGaze.target.copy(xdPointTarget);
      }
      if(xdEmote.t >= xdEmote.dur){
        xdEmote.name = null;
        XD3D.armR.rotation.z = -0.3; XD3D.armL.rotation.z = 0.3; XD3D.antR.rotation.z = -0.28;
      }
    } else if(Math.random() < dt/10){
      xdEmotePlay(['wave','happy','think'][Math.floor(Math.random()*3)]);
    }
    // 嘴型随表情切换
    const mk = (xdEmote.name === 'happy' || xdEmote.name === 'wave') ? 'open'
      : xdEmote.name === 'confused' ? 'flat' : xdEmote.name === 'think' ? 'o' : 'smile';
    for(const key in XD3D.mouths) XD3D.mouths[key].visible = (key === mk);
    // 玩家注视星达（近距离对视）→ 星达察觉：回望 + 眨眼 + 小动作 + 偶尔搭话
    xdNoticeT -= dt;
    if(xdNoticeT <= 0 && !xdEmote.name){
      _eP.copy(xd.char.position).sub(camera.position);
      const xdD = _eP.length();
      if(xdD < 3.2 && _eT.dot(_eP.normalize()) > 0.94){
        xdNoticeT = 14;
        xdGaze.target.copy(camera.position); xdGaze.timer = 2.5;
        xdBlink.phase = 0.18;
        xdEmotePlay(Math.random() < 0.5 ? 'wave' : 'happy');
        if(Math.random() < 0.4) xdSay(XD_NOTICE[Math.floor(Math.random()*XD_NOTICE.length)]);
      } else if(xdD < 3.2) xdNoticeT = 0.5;   // 在身旁但未对视：稍后再检测
    }
    // 被动行为：长时间无操作 → 星达自己观察环境、自发表情与独白
    xdIdleT += dt;
    if(xdIdleT > 16 && !xdEmote.name){
      xdIdleT = 0;
      xdEmotePlay(['think','confused','wave'][Math.floor(Math.random()*3)]);
      if(Math.random() < 0.5) xdSay(XD_IDLE[Math.floor(Math.random()*XD_IDLE.length)]);
    }
  }
  // 星达对白：打字机 + 队列轮播（与地表城市共用）
  xdDialogueTick(dt);
  // 目标光柱脉动
  if(beacon.visible){
    beacon.material.opacity = 0.11 + Math.sin(t*2.4)*0.05;
    beacon.rotation.y += dt*0.4;
  }
  // 沙尘：随玩家贴地移动，随风缓旋
  if(gDust.visible){
    gDust.position.copy(up).multiplyScalar(ground);
    gDust.quaternion.setFromUnitVectors(DUST_UP, up);
    gDust.rotateY(t*0.05);
    gDust.position.addScaledVector(_eR, Math.sin(t*0.23)*0.4);   // 风向缓移
  }
  // 准星指向建筑 → 显示介绍
  aimTimer -= dt;
  if(aimTimer <= 0){
    aimTimer = 0.18;
    raycaster.setFromCamera(_eC, camera);
    const hits = raycaster.intersectObjects(exploreTargets, true);
    let found = null;
    for(const h of hits){
      if(h.distance > 14) break;
      let o = h.object;
      while(o && !o.userData.btype) o = o.parent;
      if(o){ found = o.userData.btype; break; }
    }
    if(found && BINFO[found]){
      aimT.textContent = BINFO[found].name;
      aimD.textContent = BINFO[found].desc;
      exploreAim.classList.add('on');
    } else {
      // 近距自动查看：无需瞄准，走近建筑即显示
      _eP.copy(up).multiplyScalar(ground);
      let near = null, nd = 3.4;
      for(const t of targetWorld){
        const d = t.p.distanceTo(_eP);
        if(d < nd){ nd = d; near = t.o; }
      }
      const nb = near && near.userData.btype;
      if(nb) xdFacCheck(nb, near);   // 星达环境行为：首次靠近某类设施 → 关注/介绍
      if(nb && BINFO[nb]){
        aimT.textContent = BINFO[nb].name;
        aimD.textContent = BINFO[nb].desc;
        exploreAim.classList.add('on');
      } else exploreAim.classList.remove('on');
    }
  }
  // NPC 对话：靠近弹出，轮播台词
  _eP.copy(up).multiplyScalar(ground);
  let nearNPC = null, npcDist = 2.4;
  for(const n of npcList){
    const d = n.worldPos.distanceTo(_eP);
    if(d < npcDist){ npcDist = d; nearNPC = n; }
  }
  if(nearNPC){
    if(activeNPC !== nearNPC){
      activeNPC = nearNPC;
      npcLineIdx = 0;
      npcNameEl.textContent = nearNPC.name;
      npcRoleEl.textContent = nearNPC.role;
      npcAvatar.classList.toggle('ai', nearNPC.mesh === undefined ? false : nearNPC.role.includes('AI'));
      npcLineEl.textContent = nearNPC.lines[0];
      npcDialog.classList.add('on');
    } else {
      // 每 4 秒轮播下一句
      if(!nearNPC._timer) nearNPC._timer = 0;
      nearNPC._timer += dt;
      if(nearNPC._timer > 4){
        nearNPC._timer = 0;
        npcLineIdx = (npcLineIdx + 1) % nearNPC.lines.length;
        npcLineEl.textContent = nearNPC.lines[npcLineIdx];
      }
    }
  } else if(activeNPC){
    activeNPC._timer = 0;
    activeNPC = null;
    npcDialog.classList.remove('on');
  }
  // 所在区域 & 发现判定：走入城市半径范围即「发现」
  locTimer -= dt;
  if(locTimer <= 0){
    locTimer = 0.5;
    let best=null, bd=1e9;
    for(const s of CITY_SITES){ const d = up.angleTo(s.dir); if(d<bd){ bd=d; best=s; } }
    exploreLoc.textContent = `${EXPLORE_NAMES[best.id]} · 相距约 ${(bd*R).toFixed(1)} km`;
    const radius = cityGroups[best.id].userData.radius;
    if(!discovered.has(best.id) && bd*R < radius*0.95) onDiscover(best.id);
    // 城郊带首次抵达解说
    if(!yardSeen && up.angleTo(YARD.dir)*R < YARD.radius){
      yardSeen = true;
      xdSay('这里是 Aurelia 城郊带——起降场、储能站、装配车间都在这片。别看它不如首都气派，整座城市的吃穿用度，都是从这里流转出去的。');
    }
    // 马斯克雕像首次仰望
    if(!statueSeen && statueWorld){
      _eP.copy(up).multiplyScalar(ground);
      if(_eP.distanceTo(statueWorld) < 3.4){
        statueSeen = true;
        xdSay('抬起头——那就是马斯克雕像，开拓者广场的心脏。他在连穹顶都没有的年代，就相信会有今天。基座上那句话，现在刻在每个火星孩子的心里。');
      }
    }
  }
}

// 键盘
function mapKey(k){
  k = k.toLowerCase();
  return { arrowup:'w', arrowdown:'s', arrowleft:'a', arrowright:'d' }[k] || k;
}
const visorEl = document.getElementById('visor');
function syncVisor(){ visorEl.classList.toggle('on',
  (mode==='explore' && !explore.third) || (mode==='surface' && surface.player && !surface.player.third)); }
window.addEventListener('keydown', e=>{
  xdIdleT = 0;   // 有操作 → 星达保持陪伴状态
  const k = mapKey(e.key);
  keys[k] = true;
  if(mode==='explore' && k==='v' && !e.repeat){ explore.third = !explore.third; syncVisor(); }
  if(mode==='explore' && k===' ' && jumpY===0 && jumpV===0 && !e.repeat){ jumpV = 0.55; e.preventDefault(); }
  if(mode==='explore' && k==='f' && !e.repeat){
    if(objective){
      const d = (explore.dir.angleTo(objective.dir)*R).toFixed(1);
      xdSay(`${EXPLORE_NAMES[objective.id]}在光柱的方向，大约 ${d} 公里。跟着光走，别迷路——火星上没有路标，只有我。`);
    } else {
      xdSay('所有区域都已发现。想聊聊的话，去找陈栖或林澈——他们比我更懂这颗星球。');
    }
  }
});
window.addEventListener('keyup', e=>{ keys[mapKey(e.key)] = false; });
// 拖动环视（探索模式不使用 Pointer Lock，鼠标光标始终可见）
let expDrag = null;
renderer.domElement.addEventListener('pointerdown', e=>{ if(mode==='explore') expDrag = [e.clientX, e.clientY]; });
window.addEventListener('pointermove', e=>{
  if(mode!=='explore' || !expDrag) return;
  explore.yaw += (e.clientX - expDrag[0]) * 0.004;
  explore.pitch = clamp(explore.pitch - (e.clientY - expDrag[1]) * 0.004, -1.15, 1.15);
  expDrag = [e.clientX, e.clientY];
});
window.addEventListener('pointerup', ()=>{ expDrag = null; });
// 滚轮：第三人称推拉距离；第一人称滚出→第三人称，滚入→回到第一人称
window.addEventListener('wheel', e=>{
  if(mode!=='explore') return;
  const dir = Math.sign(e.deltaY);
  if(dir > 0 && !explore.third){ explore.third = true; syncVisor(); return; }
  explore.dist = clamp(explore.dist + dir*0.14, 0.45, 2.4);
  if(dir < 0 && explore.third && explore.dist <= 0.5){ explore.third = false; explore.dist = 0.9; syncVisor(); }
}, { passive:true });

/* ---------- 点击 ---------- */
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const _groundPlane = new THREE.Plane(new THREE.Vector3(0,1,0), 0);   // 地表 y=0 平面
const _clickPt = new THREE.Vector3();
let downPos = null;
renderer.domElement.addEventListener('pointerdown', e=>{ downPos=[e.clientX,e.clientY]; xdIdleT = 0; });
renderer.domElement.addEventListener('pointerup', e=>{
  if(!downPos) return;
  const moved = Math.hypot(e.clientX-downPos[0], e.clientY-downPos[1]);
  downPos = null;
  if(moved > 6 || camAnim) return;
  pointer.set(e.clientX/innerWidth*2-1, -(e.clientY/innerHeight)*2+1);
  raycaster.setFromCamera(pointer, camera);


  if(mode === 'city' && currentCity){
    const hits = raycaster.intersectObjects(currentCity.userData.buildings, true);
    if(hits.length){
      let o = hits[0].object;
      while(o && !o.userData.btype) o = o.parent;
      if(o) showBuilding(o.userData.btype, currentCity.userData.buildings.indexOf(o)+1);
    }
    return;
  }
  if(mode === 'explore'){
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
  if(mode === 'surface'){
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
      stopTour(); mode='city'; currentCity = cityGroups.capital;
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

/* ---------- 地下水冰透视 ---------- */
let xrayTarget = 0, xrayCur = 0;
const btnIce = document.getElementById('btnIce');
btnIce.onclick = ()=>{
  xrayTarget = xrayTarget ? 0 : 1;
  btnIce.classList.toggle('on', !!xrayTarget);
  if(xrayTarget){
    surfMat.transparent = true; surfMat.needsUpdate = true;
    showToast('地下水冰透视：基岩 / 冰川层 / 储水区');
    infoPanel.innerHTML = `<h3>地下水冰系统</h3><p>透视显示火星地下结构：深褐基岩层、带冰裂纹的连续冰川层、浅层浮冰与深层液态储水区。Glacies 矿城正下方可见采冰机器人与地下采矿基地——2126 年火星文明的生命线。</p>
      <div class="npc"><b>地质学家 · 岩</b><br>"选火星不是因为它是红色的——是因为红色下面，藏着足够多的水。"</div>`;
  }
};

document.getElementById('btnReset').onclick = ()=>{
  stopTour(); xrayTarget = 0; btnIce.classList.remove('on');
  mode='planet'; currentCity=null; backBtn.style.display='none';
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

/* ---------- 入场 ---------- */
document.getElementById('enterBtn').onclick = ()=>{
  document.getElementById('intro').classList.add('hide');
  flyTo(capViewPos.clone(), new THREE.Vector3(0,0,0), 3.2, ()=>{ controls.autoRotate = true; });
};

/* ============================================================================
   LAYER B · 地表城市探索系统（SURFACE CITY SYSTEM）
   结构：PlayerController（位置/移动/碰撞/状态）
          ↓ 只面向接口编程，不认识任何具体模型
        AvatarAdapter（setPosition/setYaw/setVisible/setState/update/dispose）
          ↓
        XingdaAvatarAdapter（优先加载 assets/characters/xingda.glb，
          不存在则使用 TEMP XINGDA PROXY——未来放入 GLB 即零代码替换）
============================================================================ */

/* ---------- AvatarAdapter：角色视觉统一接口（约定，不实例化） ----------
   setPosition(v3) / setYaw(rad) / setQuaternion(q) / setVisible(bool)
   setState('idle'|'walk'|'run'|'jump') / update(dt,t) / attachTo(scene) / detach() / dispose() */
class AvatarAdapter {
  setPosition(){} setYaw(){} setQuaternion(){} setVisible(){} setState(){}
  update(){} attachTo(){} detach(){} dispose(){}
  get object3d(){ return null; } get height(){ return 1; }
}

/* ---------- 星达角色适配器 ---------- */
class XingdaAvatarAdapter extends AvatarAdapter {
  constructor(opts={}){
    super();
    this.heightTarget = opts.height || 0.95;   // 星达设定约 110cm
    this.state = 'idle';
    this.glbReady = false;
    this.mixer = null; this.actions = {}; this._curAction = null;
    this.group = new THREE.Group();            // 外部只接触这个根节点
    this.group.userData.isAvatar = true;
    this.inner = new THREE.Group();            // 视觉层：自动 Ground Alignment，脚底 = 根节点原点
    this.group.add(this.inner);
    this._t = 0; this._blink = 2.5; this._blinkPhase = 0;
    this._modelYaw = 0; this._stepPhase = 0;
    this._buildProxy();
    this._tryLoadGLB();
  }
  get object3d(){ return this.group; }
  get height(){ return this.heightTarget; }

  /* TEMP AVATAR — REPLACE WITH XINGDA GLB（assets/characters/xingda.glb）
     仅用于验证第三人称比例/相机/移动/动画状态，参考设定图：蓝绿毛绒、大头身比、
     能量星球触角 ×2、蓬松尾巴、发光星形项圈、星空大眼。 */
  _buildProxy(){
    const u = this.heightTarget / 0.95;
    const g = new THREE.Group();
    const matBody  = new THREE.MeshStandardMaterial({ color:0x46d0bf, roughness:0.92, metalness:0.02 });
    const matBodyD = new THREE.MeshStandardMaterial({ color:0x34ada0, roughness:0.92 });
    const matCream = new THREE.MeshStandardMaterial({ color:0xfff6d6, roughness:0.85 });
    const matEye   = new THREE.MeshBasicMaterial({ map:xdEyeTexture() });
    const matMouth = new THREE.MeshBasicMaterial({ color:0x8a3b42 });
    const matOrb   = new THREE.MeshBasicMaterial({ color:0xe4f78a });
    const matGem   = new THREE.MeshBasicMaterial({ color:0xffe27a });
    const matCollar= new THREE.MeshStandardMaterial({ color:0xb9c4cc, roughness:0.3, metalness:0.85 });

    // 身体
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.155*u, 0.17*u, 6, 14), matBody);
    body.position.y = 0.335*u; g.add(body);
    const belly = new THREE.Mesh(new THREE.SphereGeometry(0.115*u, 14, 12), matCream);
    belly.position.set(0, 0.31*u, 0.075*u); belly.scale.set(1, 1.2, 0.6); g.add(belly);
    // 脚（可交替摆动）
    const footL = new THREE.Group(); footL.position.set(-0.075*u, 0.055*u, 0.01*u); g.add(footL);
    const footR = new THREE.Group(); footR.position.set( 0.075*u, 0.055*u, 0.01*u); g.add(footR);
    for(const f of [footL, footR]){
      const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.05*u, 0.06*u, 4, 10), matBodyD);
      m.position.z = 0.02*u; f.add(m);
    }
    // 手臂（肩部枢轴）
    const armL = new THREE.Group(); armL.position.set(-0.155*u, 0.42*u, 0); g.add(armL);
    const armR = new THREE.Group(); armR.position.set( 0.155*u, 0.42*u, 0); g.add(armR);
    for(const [a, s] of [[armL, 1], [armR, -1]]){
      const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.042*u, 0.11*u, 4, 10), matBodyD);
      m.position.y = -0.08*u; a.add(m); a.rotation.z = s*0.25;
    }
    // 尾巴（根部枢轴 + 绒球）
    const tail = new THREE.Group(); tail.position.set(0, 0.24*u, -0.14*u); g.add(tail);
    const tailM = new THREE.Mesh(new THREE.CapsuleGeometry(0.032*u, 0.12*u, 4, 8), matBodyD);
    tailM.position.set(0, 0.05*u, -0.06*u); tailM.rotation.x = 0.85; tail.add(tailM);
    const pom = new THREE.Mesh(new THREE.SphereGeometry(0.06*u, 10, 8), matCream);
    pom.position.set(0, 0.11*u, -0.13*u); tail.add(pom);
    // 头
    const head = new THREE.Group(); head.position.y = 0.62*u; g.add(head);
    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.21*u, 20, 16), matBody);
    skull.scale.set(1.06, 0.94, 0.96); head.add(skull);
    const face = new THREE.Mesh(new THREE.SphereGeometry(0.17*u, 16, 12), matCream);
    face.position.set(0, -0.03*u, 0.075*u); face.scale.set(0.95, 0.78, 0.55); head.add(face);
    // 星空大眼
    const eyeGeo = new THREE.SphereGeometry(0.06*u, 14, 10);
    const eyeL = new THREE.Group(); eyeL.position.set(-0.085*u, 0.02*u, 0.145*u); head.add(eyeL);
    const eyeR = new THREE.Group(); eyeR.position.set( 0.085*u, 0.02*u, 0.145*u); head.add(eyeR);
    for(const e of [eyeL, eyeR]){
      const m = new THREE.Mesh(eyeGeo, matEye); m.scale.set(1, 1.3, 0.45); e.add(m);
    }
    // 腮红 + 嘴
    for(const s of [-1, 1]){
      const bl = new THREE.Mesh(new THREE.SphereGeometry(0.028*u, 8, 6),
        new THREE.MeshBasicMaterial({ color:0xf7a8b8, transparent:true, opacity:0.7 }));
      bl.position.set(s*0.125*u, -0.045*u, 0.12*u); bl.scale.set(1, 0.7, 0.4); head.add(bl);
    }
    const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.038*u, 0.009*u, 6, 14, Math.PI), matMouth);
    mouth.position.set(0, -0.075*u, 0.16*u); mouth.rotation.z = Math.PI; head.add(mouth);
    // 柔软大耳（两侧下垂）
    const earGeo = new THREE.SphereGeometry(0.11*u, 12, 10);
    const earL = new THREE.Group(); earL.position.set(-0.2*u, 0.06*u, -0.01*u); head.add(earL);
    const earR = new THREE.Group(); earR.position.set( 0.2*u, 0.06*u, -0.01*u); head.add(earR);
    for(const [e, s] of [[earL, 1], [earR, -1]]){
      const m = new THREE.Mesh(earGeo, matBodyD);
      m.scale.set(0.55, 1.25, 0.4); m.position.set(s*-0.04*u, -0.11*u, 0);
      e.add(m); e.rotation.z = s*0.5;
      const inner = new THREE.Mesh(new THREE.SphereGeometry(0.07*u, 10, 8), matCream);
      inner.scale.set(0.5, 1.1, 0.3); inner.position.set(s*-0.03*u, -0.1*u, 0.03*u); e.add(inner);
    }
    // 能量星球触角 ×2
    const mkAnt = side=>{
      const p = new THREE.Group(); p.position.set(side*0.075*u, 0.17*u, 0);
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.013*u, 0.016*u, 0.17*u, 6), matBodyD);
      stem.position.y = 0.085*u; p.add(stem);
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.042*u, 12, 10), matOrb);
      orb.position.y = 0.19*u; p.add(orb);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.06*u, 0.007*u, 6, 18).rotateX(Math.PI/2.4), matGem);
      ring.position.y = 0.19*u; p.add(ring);
      p.rotation.z = side*-0.3; head.add(p); return p;
    };
    const antL = mkAnt(-1), antR = mkAnt(1);
    addGlow(head, new THREE.Vector3(-0.1*u, 0.22*u, 0), 0xe4f78a, 0.5*u);
    addGlow(head, new THREE.Vector3( 0.1*u, 0.22*u, 0), 0xe4f78a, 0.5*u);
    // 发光星形项圈
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.135*u, 0.02*u, 8, 22).rotateX(Math.PI/2), matCollar);
    collar.position.y = 0.49*u; g.add(collar);
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.032*u), matGem);
    gem.position.set(0, 0.47*u, 0.135*u); g.add(gem);
    addGlow(g, new THREE.Vector3(0, 0.47*u, 0.15*u), 0xffe27a, 0.4*u);

    this.proxy = g;
    // 自动 Ground Alignment：包围盒底面对齐根原点——出生即双脚站地，不埋地、不漂浮
    const pbox = new THREE.Box3().setFromObject(g);   // g 尚未挂父级：局部即世界
    if(isFinite(pbox.min.y)) this.inner.position.y = -pbox.min.y;
    this.inner.add(g);
    this.parts = { body, head, eyeL, eyeR, armL, armR, footL, footR, tail, antL, antR, earL, earR, mouth };
  }

  /* 正式资源接入：存在 assets/characters/xingda.glb 时自动替换代理，上层零改动 */
  async _tryLoadGLB(){
    try{
      const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
      new GLTFLoader().load('assets/characters/xingda.glb', gltf=>{
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const h = (box.max.y - box.min.y) || 1;
        const s = this.heightTarget / h;
        model.scale.setScalar(s);
        model.position.y = -box.min.y * s;          // Ground Alignment：脚底对齐根原点
        model.rotation.x = 0; model.rotation.z = 0; // 旋转修正：X/Z 恒 0，只允许 Y 轴朝向
        this.proxy.visible = false;
        this.inner.position.y = 0;                  // GLB 已自带落地对齐，取消代理脚补
        this.inner.add(model);
        this.glb = model; this.glbReady = true;
        if(gltf.animations && gltf.animations.length){
          this.mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach(c=>{
            const n = c.name.toLowerCase();
            if(/idle|stand|待机/.test(n)) this.actions.idle = this.mixer.clipAction(c);
            else if(/walk|行走/.test(n))   this.actions.walk = this.mixer.clipAction(c);
            else if(/run|奔跑|跑/.test(n)) this.actions.run  = this.mixer.clipAction(c);
            else if(/jump|跳/.test(n))     this.actions.jump = this.mixer.clipAction(c);
          });
          if(!this.actions.idle) this.actions.idle = this.mixer.clipAction(gltf.animations[0]);
          this._curAction = this.actions.idle; this._curAction.play();
        }
      }, undefined, ()=>{ /* GLB 不存在：静默保持 TEMP 代理，不报错不崩溃 */ });
    }catch(e){ /* GLTFLoader 不可用：保持 TEMP 代理 */ }
  }

  setPosition(v){ this.group.position.copy(v); }
  setYaw(y){ this._modelYaw = y; this.group.rotation.set(0, y, 0); }   // 旋转修正：X/Z 恒 0，身体永远垂直，只允许 Y 轴控制方向
  setQuaternion(q){ this.group.quaternion.copy(q); }
  setVisible(b){ this.group.visible = b; }
  attachTo(sc){ sc.add(this.group); }
  detach(){ if(this.group.parent) this.group.parent.remove(this.group); }

  setState(s){
    if(this.state === s) return;
    this.state = s;
    if(this.glbReady && this.mixer){
      const next = this.actions[s] || this.actions.idle;
      if(next && next !== this._curAction){
        next.reset().fadeIn(0.18).play();
        if(this._curAction) this._curAction.fadeOut(0.18);
        this._curAction = next;
      }
    }
  }

  update(dt, speed=0){
    this._t += dt;
    if(this.mixer) this.mixer.update(dt);
    if(this.glbReady || !this.proxy) return;
    const P = this.parts, tt = this._t, u = this.heightTarget/0.95;
    const moving = this.state==='walk' || this.state==='run';
    // 脚步相位：有速度信息时随位移同步（走多快摆多快）；否则按状态用匹配步频（球面探索等无速度场景）
    this._stepPhase += (speed > 0 ? speed * 2.4 : (this.state==='run' ? 18 : 10)) * dt;
    const ph = this._stepPhase;
    const amp = this.state==='run' ? 0.6 : 0.38;
    const sw = moving ? Math.sin(ph) : 0;
    // 呼吸 + 步伐起伏
    P.body.scale.y = 1 + Math.sin(tt*2.4)*0.03;
    this.proxy.position.y = moving ? Math.abs(Math.cos(ph))*0.05*u : 0;
    // 四肢（随脚步相位摆动）
    P.armL.rotation.x = sw*amp; P.armR.rotation.x = -sw*amp;
    P.footL.position.y = (0.055 + Math.max(0, sw)*0.06)*u;
    P.footR.position.y = (0.055 + Math.max(0,-sw)*0.06)*u;
    if(this.state==='jump'){
      P.armL.rotation.z = 0.9; P.armR.rotation.z = -0.9;
      P.footL.position.y = P.footR.position.y = 0.12*u;
    } else { P.armL.rotation.z = 0.25 + Math.sin(tt*1.8)*0.05; P.armR.rotation.z = -0.25 - Math.sin(tt*1.8)*0.05; }
    // 尾巴 / 触角 / 耳朵
    P.tail.rotation.y = Math.sin(tt*(moving?8:3.2))*0.4;
    P.antL.rotation.x = Math.sin(tt*1.7)*0.12; P.antR.rotation.x = Math.sin(tt*1.7+1.3)*0.12;
    P.earL.rotation.x = Math.sin(tt*2.1)*0.08; P.earR.rotation.x = Math.sin(tt*2.1+0.9)*0.08;
    // 眨眼
    this._blink -= dt;
    if(this._blink <= 0){ this._blinkPhase = 0.16; this._blink = 2 + Math.random()*3.5; }
    let eyeSY = 1;
    if(this._blinkPhase > 0){ this._blinkPhase -= dt; eyeSY = 1 - 0.9*Math.max(0, 1-Math.abs(this._blinkPhase-0.08)/0.08); }
    P.eyeL.scale.y = eyeSY; P.eyeR.scale.y = eyeSY;
    // 头部与身体：移动时平稳+重心侧摆；待机时环境观察（左右张望，不做雕像）
    if(moving){
      P.head.rotation.y = Math.sin(tt*0.6)*0.05;
      P.head.rotation.x = Math.sin(tt*0.9)*0.03;
      this.proxy.rotation.y = 0;
      this.proxy.rotation.z = Math.sin(ph)*0.03;                 // 行走重心轻微侧摆
    } else {
      const lt = tt*0.32;
      P.head.rotation.y = (Math.sin(lt) + Math.sin(lt*0.43+1.3)*0.7) * 0.4;  // 周期性张望
      P.head.rotation.x = 0.04 + Math.sin(tt*0.5)*0.05;
      this.proxy.rotation.y = Math.sin(lt*0.6)*0.08;             // 身体随观察微转
      this.proxy.rotation.z = Math.sin(tt*0.8)*0.02;             // 待机重心轻摇
    }
  }

  dispose(){
    this.detach();
    this.group.traverse(o=>{
      if(o.geometry) o.geometry.dispose();
      if(o.material){ (Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{ if(m.map) m.map.dispose(); m.dispose(); }); }
    });
  }
}

/* ---------- Global Companion：全局统一星达 ----------
   单例。星达不绑定任何单一 Scene——进入任何场景（地表城市/球面探索/未来新增）
   都复用这同一只，通过 mount 场景 + 尺度适配实现跨场景存在，永不因切换而消失。 */
const GlobalCompanion = {
  avatar: null,
  /* 获取（首次创建）全局唯一星达。height 以地表真实尺度 0.95m 为基准 */
  ensure(){
    if(!this.avatar) this.avatar = new XingdaAvatarAdapter({ height:0.95 });
    return this.avatar;
  },
  /* 挂载到目标场景并适配尺度。scale=1 地表城市；≈0.21 球面探索（星球 R=50） */
  mount(scene, scale=1){
    const a = this.ensure();
    a.group.scale.setScalar(scale);
    // 出生姿态重置：清除上一场景残留朝向（球面探索的空间对齐四元数），防止出生躺下/倾斜/头入地
    a.group.quaternion.identity();
    a.attachTo(scene);
    return a;
  },
  unmount(){ if(this.avatar) this.avatar.detach(); }
};

/* ---------- PlayerController：只管位置/旋转/移动/碰撞/状态，不碰任何模型 ---------- */
class PlayerController {
  constructor(avatar){
    this.avatar = avatar;                       // AvatarAdapter，可任意替换
    this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    this.yaw = 0; this.pitch = 0.16;
    this.vy = 0; this.jumpY = 0;
    this.third = true;
    this.dist = 5.4;
    this.eyeH = avatar.height * 0.88;
    this._f = new THREE.Vector3(); this._r = new THREE.Vector3(); this._m = new THREE.Vector3();
    this._head = new THREE.Vector3(); this._look = new THREE.Vector3(); this._dir = new THREE.Vector3();
    this._camD = null; this._modelYaw = 0;
    this._camYaw = 0; this._camPitch = 0.16;     // 相机朝向（阻尼平滑用）
    this.clickTarget = new THREE.Vector3();      // 点击地面移动目标（最终目标，持续保存）
    this.hasClickTarget = false;
    this._waypoint = new THREE.Vector3();        // 绕行碰撞体时的临时目标
    this._hasWaypoint = false;
    // 自然旋转系统：静止后的观察/互动转身（只写 _modelYaw → Y 轴，X/Z 恒 0）
    this._idleT = 0;                             // 连续静止时长
    this._faceCam = false;                       // 是否正在缓动转向镜头
    this._camPos = new THREE.Vector3();          // 最近一帧相机位置（updateCamera 记录）
    this._hasCamPos = false;
  }
  teleport(x, z, yaw=0){
    this.pos.set(x, 0, z); this.vel.set(0,0,0);
    this.yaw = yaw; this.vy = 0; this.jumpY = 0; this._camD = null; this._modelYaw = yaw;
    this._camYaw = yaw;
    this.hasClickTarget = false;
    this._hasWaypoint = false;
    this._idleT = 0; this._faceCam = false;
  }
  /* 点击地面移动：设置/取消目标。PlayerController 内部平滑趋近，朝向随速度自动对准目标 */
  setClickTarget(x, z, colliders=null, bound=0){
    this.clickTarget.set(x, 0, z);
    if(colliders) this._pushOutOfColliders(this.clickTarget, colliders, 0.82);
    if(bound > 0){
      const b = Math.max(1, bound - 0.6), r = Math.hypot(this.clickTarget.x, this.clickTarget.z);
      if(r > b){ this.clickTarget.x *= b/r; this.clickTarget.z *= b/r; }
    }
    this.hasClickTarget = true;
    this._hasWaypoint = false;
  }
  clearClickTarget(){ this.hasClickTarget = false; this._hasWaypoint = false; }
  _pushOutOfColliders(v, colliders, margin){
    for(const c of colliders){
      const rr = c.r + margin, dx = v.x - c.x, dz = v.z - c.z, d2 = dx*dx + dz*dz;
      if(d2 >= rr*rr) continue;
      const d = Math.sqrt(d2);
      if(d > 1e-4){ v.x = c.x + dx/d*rr; v.z = c.z + dz/d*rr; }
      else { v.x = c.x + rr; v.z = c.z; }
    }
  }
  _segmentBlocker(x1, z1, x2, z2, colliders){
    const dx = x2 - x1, dz = z2 - z1, lenSq = dx*dx + dz*dz;
    if(lenSq < 1e-6) return null;
    let hit = null, bestT = Infinity;
    for(const c of colliders){
      const rr = c.r + 0.58;
      let t = ((c.x-x1)*dx + (c.z-z1)*dz) / lenSq;
      t = Math.max(0, Math.min(1, t));
      const px = x1 + dx*t, pz = z1 + dz*t;
      const ox = c.x - px, oz = c.z - pz;
      if(ox*ox + oz*oz < rr*rr && t > 0.01 && t < 0.99 && t < bestT){ hit = c; bestT = t; }
    }
    return hit;
  }
  _planWaypoint(colliders){
    const blocker = this._segmentBlocker(this.pos.x, this.pos.z, this.clickTarget.x, this.clickTarget.z, colliders);
    if(!blocker){ this._hasWaypoint = false; return; }
    const rr = blocker.r + 0.76;
    const ox = this.pos.x - blocker.x, oz = this.pos.z - blocker.z;
    const d = Math.hypot(ox, oz);
    if(d < rr + 0.05){
      const a = d > 1e-4 ? Math.atan2(oz, ox) : 0;
      this._waypoint.set(blocker.x + Math.cos(a)*(rr+0.4), 0, blocker.z + Math.sin(a)*(rr+0.4));
    } else {
      const base = Math.atan2(oz, ox), alpha = Math.acos(Math.min(1, rr/d));
      const a1 = base + alpha, a2 = base - alpha;
      const x1 = blocker.x + Math.cos(a1)*rr, z1 = blocker.z + Math.sin(a1)*rr;
      const x2 = blocker.x + Math.cos(a2)*rr, z2 = blocker.z + Math.sin(a2)*rr;
      const s1 = Math.hypot(x1-this.pos.x, z1-this.pos.z) + Math.hypot(this.clickTarget.x-x1, this.clickTarget.z-z1);
      const s2 = Math.hypot(x2-this.pos.x, z2-this.pos.z) + Math.hypot(this.clickTarget.x-x2, this.clickTarget.z-z2);
      this._waypoint.set(s1 <= s2 ? x1 : x2, 0, s1 <= s2 ? z1 : z2);
    }
    this._pushOutOfColliders(this._waypoint, colliders, 0.72);
    this._hasWaypoint = true;
  }
  jump(){ if(this.jumpY === 0 && this.vy === 0) this.vy = 4.4; }

  update(dt, colliders, bound){
    // 输入 → 期望速度（相机相对）
    this._f.set(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    this._r.set(-this._f.z, 0, this._f.x);
    this._m.set(0,0,0);
    if(keys['w']) this._m.add(this._f);
    if(keys['s']) this._m.sub(this._f);
    if(keys['d']) this._m.add(this._r);
    if(keys['a']) this._m.sub(this._r);
    const run = !!keys['shift'];
    let moving = this._m.lengthSq() > 0;
    let clickSlow = 1;
    // 点击移动：最终目标持续保存；遇建筑先走临时 waypoint，键盘接管才取消
    if(!moving && this.hasClickTarget){
      let dx = this.clickTarget.x - this.pos.x, dz = this.clickTarget.z - this.pos.z;
      let dist = Math.hypot(dx, dz);
      if(dist < 0.22){ this.clearClickTarget(); }
      else{
        if(this._hasWaypoint){
          const wDist = Math.hypot(this._waypoint.x-this.pos.x, this._waypoint.z-this.pos.z);
          if(wDist < 0.42 || !this._segmentBlocker(this.pos.x, this.pos.z, this.clickTarget.x, this.clickTarget.z, colliders))
            this._hasWaypoint = false;
        }
        if(!this._hasWaypoint && this._segmentBlocker(this.pos.x, this.pos.z, this.clickTarget.x, this.clickTarget.z, colliders))
          this._planWaypoint(colliders);
        if(this._hasWaypoint){
          dx = this._waypoint.x - this.pos.x; dz = this._waypoint.z - this.pos.z;
          dist = Math.hypot(dx, dz);
          if(dist < 0.32) this._hasWaypoint = false;
        }
        if(this._hasWaypoint || dist >= 0.22){
          this._m.set(dx, 0, dz); moving = true;
          clickSlow = this._hasWaypoint ? 1 : Math.min(1, Math.max(0.28, dist/0.9));
        }
      }
    } else if(moving){
      this.clearClickTarget();                     // 键盘接管，立即取消点击目标
    }
    const target = moving ? this._m.normalize().multiplyScalar((run ? 7.6 : 4.2) * clickSlow) : this._m.set(0,0,0);
    this.vel.lerp(target, Math.min(1, dt*(moving ? 10 : 12)));
    this.pos.addScaledVector(this.vel, dt);
    // 跳跃（火星重力手感）
    if(this.vy !== 0 || this.jumpY > 0){
      this.jumpY += this.vy*dt; this.vy -= 6.8*dt;
      if(this.jumpY <= 0){ this.jumpY = 0; this.vy = 0; }
    }
    // 建筑碰撞（圆柱推挤）
    for(const c of colliders){
      if(this.jumpY > c.h) continue;
      const dx = this.pos.x - c.x, dz = this.pos.z - c.z, rr = c.r + 0.42;
      const d2 = dx*dx + dz*dz;
      if(d2 < rr*rr && d2 > 1e-6){ const d = Math.sqrt(d2), k = (rr-d)/d; this.pos.x += dx*k; this.pos.z += dz*k; }
    }
    // 城市边界
    const rr = Math.hypot(this.pos.x, this.pos.z);
    if(rr > bound){ this.pos.x *= bound/rr; this.pos.z *= bound/rr; }
    // 角色朝向：移动时随速度方向（已有，保持）；静止时进入观察/互动转身
    if(moving){
      const ty = Math.atan2(this.vel.x, this.vel.z);
      let dy = ty - this._modelYaw;
      while(dy > Math.PI) dy -= Math.PI*2; while(dy < -Math.PI) dy += Math.PI*2;
      this._modelYaw += dy * Math.min(1, dt*10);
      this._idleT = 0; this._faceCam = false;
    } else if(this._hasCamPos){
      // 观察/互动旋转：相机在身后或侧后停留片刻 → 星达自然缓动转身面向镜头
      // 缓动 lerp，无瞬间 180°；到位即停，不锁死镜头方向；允许自然背对
      this._idleT += dt;
      const cdx = this._camPos.x - this.pos.x, cdz = this._camPos.z - this.pos.z;
      const camDist = Math.hypot(cdx, cdz);
      if(camDist > 0.6){
        const cy = Math.atan2(cdx, cdz);
        let dy = cy - this._modelYaw;
        while(dy > Math.PI) dy -= Math.PI*2; while(dy < -Math.PI) dy += Math.PI*2;
        if(this._faceCam){
          this._modelYaw += dy * Math.min(1, dt*2.4);          // 慢速缓动转身
          if(Math.abs(dy) < 0.1){ this._faceCam = false; this._idleT = 0; }  // 面向到位即停 + 冷却
        } else {
          const near = camDist < 3.4;                          // 玩家（镜头）贴近 → 互动转身更敏感
          if(this._idleT > (near ? 0.45 : 1.1) && Math.abs(dy) > (near ? 0.55 : 1.05))
            this._faceCam = true;
        }
      }
    }
    // 输出到 AvatarAdapter（不感知模型内部）
    this._m.copy(this.pos); this._m.y += this.jumpY;
    this.avatar.setPosition(this._m);
    this.avatar.setYaw(this.third ? this._modelYaw : this.yaw);
    this.avatar.setState(this.jumpY > 0 ? 'jump' : moving ? (run ? 'run' : 'walk') : 'idle');
    this.avatar.update(dt, this.vel.length());
  }

  /* 第三人称平滑跟随 + 相机防穿墙；第一人称隐藏星达 */
  updateCamera(camera, dt, colliders){
    // 相机朝向阻尼：第三人称平滑跟随鼠标视角，不突然旋转；第一人称即时（防晕）
    const k = this.third ? Math.min(1, dt*10) : 1;
    let dyaw = this.yaw - this._camYaw;
    while(dyaw > Math.PI) dyaw -= Math.PI*2; while(dyaw < -Math.PI) dyaw += Math.PI*2;
    this._camYaw += dyaw * k;
    this._camPitch += (this.pitch - this._camPitch) * k;
    this._head.copy(this.pos);
    this._head.y += (this.third ? 1.15 : this.eyeH) + this.jumpY;
    const cp = Math.cos(this._camPitch), sp = Math.sin(this._camPitch);
    this._dir.set(Math.sin(this._camYaw)*cp, sp, Math.cos(this._camYaw)*cp);
    if(!this.third){
      camera.position.copy(this._head);
      this._look.copy(this._head).addScaledVector(this._dir, 4);
      camera.lookAt(this._look);
      this._camPos.copy(camera.position); this._hasCamPos = true;
      return;
    }
    // 期望臂长，按建筑碰撞收缩
    let d = this.dist;
    const hx = this._head.x, hy = this._head.y, hz = this._head.z;
    const cx = hx - this._dir.x*d, cy = hy - this._dir.y*d, cz = hz - this._dir.z*d;
    const segLen = Math.hypot(cx-hx, cy-hy, cz-hz) || 1;
    for(const c of colliders){
      // 2D 线段-圆相交 + 高度检查
      const dx = (cx-hx)/segLen, dz = (cz-hz)/segLen;
      const ox = hx - c.x, oz = hz - c.z;
      const b = ox*dx + oz*dz, cc = ox*ox + oz*oz - (c.r+0.3)*(c.r+0.3);
      const disc = b*b - cc;
      if(disc <= 0) continue;
      const tHit = -b - Math.sqrt(disc);
      if(tHit < 0 || tHit > segLen) continue;
      const yAt = hy + (cy-hy)*(tHit/segLen);
      if(yAt < c.h + 0.25) d = Math.min(d, Math.max(0.9, tHit - 0.5));
    }
    if(this._camD === null) this._camD = d;
    this._camD += (d - this._camD) * Math.min(1, dt*(d < this._camD ? 14 : 3.5));  // 收缩快、恢复慢
    camera.position.set(
      hx - this._dir.x*this._camD,
      Math.max(0.4, hy - this._dir.y*this._camD + 0.25),
      hz - this._dir.z*this._camD);
    this._look.copy(this._head).addScaledVector(this._dir, 2.4);
    camera.lookAt(this._look);
    this._camPos.copy(camera.position); this._hasCamPos = true;
  }
}

/* ---------- 地表城市通用件 ---------- */
const SURFACE_INFO = {
  capital:    { name:'火星首都 · Aurelia', short:'首都 Aurelia', core:'你已成为 Aurelia 城市网络的访问者',
                tab:'Aurelia，人口 42 万，火星的首都。这里不是科研前哨——主街、中央广场、居住组团、医疗与行政塔、环城磁悬浮，都在说明同一件事：火星已经开始形成自己的社会。' },
  eco:        { name:'翡绿生态城 · Verde', short:'生态城 Verde', core:'生态平衡达成 · Verde 的脉搏在你手中',
                tab:'Verde，火星的绿肺。巨型穹顶之下是人工水循环、垂直农场与整片培育林。红色荒漠与绿色生命只隔一层复合玻璃——而维持这层平衡的，是人。' },
  industrial: { name:'赫菲斯托斯工业城', short:'工业城 Hephaestus', core:'产线贯通 · 火星资源正在变成文明',
                tab:'Hephaestus，赤道工业带的心脏。聚变能源塔、原料处理线、燃料储罐与星舰总装厂房昼夜不息——这座城证明：火星文明能用本地的资源独立运转。' },
};
const surfaceCache = {};
const surface = {
  id:null, city:null, player:null, avatar:null,
  snpc:null, snpcMode:'none', talked:new Set(), nearInteract:null, tabOpen:false,
};

function makeSurfaceScene(sky, fogColor, fogNear, fogFar, sunColor=0xffe8d0){
  const sc = new THREE.Scene();
  sc.background = new THREE.Color(sky);
  sc.fog = new THREE.Fog(fogColor, fogNear, fogFar);
  sc.environment = scene.environment;   // 共享火星 IBL，金属/玻璃不塑料
  const sun = new THREE.DirectionalLight(sunColor, 2.2); sun.position.set(60, 90, 40); sc.add(sun);
  sc.add(new THREE.AmbientLight(0x8a97a8, 0.5));
  sc.add(new THREE.HemisphereLight(0xbfd4e8, 0x4a2c1c, 0.5));
  return sc;
}
/* 城市构建工具 */
function sGround(sc, size, color){
  const g = new THREE.Mesh(new THREE.CircleGeometry(size, 64).rotateX(-Math.PI/2),
    new THREE.MeshStandardMaterial({ color, roughness:0.95, metalness:0.03, bumpMap:texGrain, bumpScale:0.02 }));
  g.position.y = 0; sc.add(g); return g;
}
function sBox(sc, col, w,h,d, mat, x,z, ry=0, opts={}){
  const m = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), mat);
  m.position.set(x, (opts.y||0)+h/2, z); m.rotation.y = ry; sc.add(m);
  if(opts.collide !== false) col.push({ x, z, r:Math.hypot(w,d)/2, h:(opts.y||0)+h });
  return m;
}
function sCyl(sc, col, r,h, mat, x,z, opts={}){
  const m = new THREE.Mesh(new THREE.CylinderGeometry(opts.rTop!==undefined?opts.rTop:r, r, h, opts.seg||14), mat);
  m.position.set(x, (opts.y||0)+h/2, z); sc.add(m);
  if(opts.collide !== false) col.push({ x, z, r:r+0.1, h:(opts.y||0)+h });
  return m;
}
function sRoad(sc, x, z, w, d, ry=0, color=0x141a22, glow=0x49d7ff){
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.06, d),
    new THREE.MeshStandardMaterial({ color, roughness:0.9, emissive:glow, emissiveIntensity:0.12 }));
  m.position.set(x, 0.03, z); m.rotation.y = ry; sc.add(m); return m;
}
function sStrip(sc, x, z, w, d, ry, color, inten=0.9){
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.03, d),
    new THREE.MeshStandardMaterial({ color:0x111820, emissive:color, emissiveIntensity:inten }));
  m.position.set(x, 0.05, z); m.rotation.y = ry; sc.add(m); return m;
}
function sLamp(sc, x, z, warm=true){
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.07,3.4,6), matDark); pole.position.y=1.7; g.add(pole);
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.12,8,8),
    new THREE.MeshStandardMaterial({ color:0x332a1a, emissive:warm?0xffc98a:0x9fe4ff, emissiveIntensity:2.2 }));
  lamp.position.y = 3.45; g.add(lamp);
  addGlow(g, new THREE.Vector3(0,3.45,0), warm?0xffc98a:0x9fe4ff, 1.1);
  g.position.set(x,0,z); sc.add(g); return g;
}
function sTree(sc, x, z, s=1){
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.06*s,0.09*s,0.7*s,6), matDark); trunk.position.y=0.35*s; g.add(trunk);
  const crown = new THREE.Mesh(new THREE.ConeGeometry(0.42*s, 1.1*s, 8), matLeaf2); crown.position.y=1.1*s; g.add(crown);
  g.position.set(x,0,z); sc.add(g); return g;
}
function sSign(sc, text, x, y, z, scale=4){
  const sp = makeLabel(text, scale); sp.position.set(x, y, z); sc.add(sp); return sp;
}
/* 地表人物（约 1.05m） */
function sPerson(color=0xd97b4a, glowC=0xffb27a){
  const g = new THREE.Group();
  const suit = new THREE.MeshStandardMaterial({ color, roughness:0.65, metalness:0.08 });
  const skin = new THREE.MeshStandardMaterial({ color:0xd8b8a0, roughness:0.5 });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.17,0.32,4,10), suit); body.position.y=0.48; g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.14,12,10), skin); head.position.y=0.86; g.add(head);
  const visor = new THREE.Mesh(new THREE.SphereGeometry(0.115,10,8,-0.6,1.2,1.0,0.8),
    new THREE.MeshStandardMaterial({ color:0x2a1a12, roughness:0.2, metalness:0.6 }));
  visor.position.set(0,0.86,0.035); g.add(visor);
  const arms = [];
  for(const s of [-1,1]){
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.06,0.2,4,6), suit);
    leg.position.set(s*0.085,0.14,0); g.add(leg);
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.05,0.22,4,6), suit);
    arm.position.set(s*0.23,0.5,0); g.add(arm); arms.push(arm);
  }
  g.userData.arms = arms;
  addGlow(g, new THREE.Vector3(0,1.0,0), glowC, 0.8);
  return g;
}
function addSurfaceNPC(city, color, x, z, ry, name, role, greet, options, glowC, opts={}){
  const mesh = sPerson(color, glowC);
  mesh.position.set(x, 0, z); mesh.rotation.y = ry;
  city.scene.add(mesh);
  city.npcs.push({ id:name, mesh, x, z, hx:x, hz:z, name, role, greet, options,
    xdIntro: opts.xdIntro || null,           // 星达靠近时的介绍语
    wander: opts.wander || 0,                // 踱步半径（0=站立工作）
    wanderSpeed: 0.5 + Math.random()*0.3,
    workPhase: Math.random()*6.28, movePhase: Math.random()*6.28, introSeen:false });
  return mesh;
}
function addSurfaceWalker(city, color, cx, cz, r, speed, phase=0){
  const mesh = sPerson(color);
  city.scene.add(mesh);
  city.walkers.push({ mesh, cx, cz, r, speed, phase });
  return mesh;
}
function addInteract(city, id, x, z, r, title, prompt, run, enabledFn=null){
  city.interact.push({ id, x, z, r, title, prompt, run, enabledFn, done:false });
}
function sBeacon(city){
  const b = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.85, 22, 12, 1, true),
    new THREE.MeshBasicMaterial({ color:0x7df2c9, transparent:true, opacity:0.1,
      blending:THREE.AdditiveBlending, side:THREE.DoubleSide, depthWrite:false }));
  b.renderOrder = 4; city.scene.add(b); city.beacon = b; return b;
}
function newCity(id){
  return { id, scene:null, colliders:[], npcs:[], walkers:[], interact:[], ticks:[],
    tasks:[], spawn:{x:0,z:-90,yaw:0}, bounds:115, coreDone:false, beacon:null,
    groundMesh:null, guide:[], idleHint:null };
}
function sTask(city, id, label, tx, tz){ city.tasks.push({ id, label, tx, tz, done:false }); }
function completeTask(city, id){
  const t = city.tasks.find(t=>t.id===id);
  if(!t || t.done) return;
  t.done = true;
  refreshSurfaceObjective();
  if(city.tasks.every(t=>t.done) && !city.coreDone){
    city.coreDone = true;
    discName.textContent = SURFACE_INFO[city.id].core;
    discBanner.classList.remove('pop'); void discBanner.offsetWidth; discBanner.classList.add('pop');
  }
}
function refreshSurfaceObjective(){
  const city = surface.city; if(!city) return;
  const done = city.tasks.filter(t=>t.done).length;
  objT.textContent = `${SURFACE_INFO[city.id].short} · 城市接入 ${done}/${city.tasks.length}`;
  objC.textContent = city.tasks.map(t=>(t.done?'✓ ':'○ ')+t.label).join('　');
  const next = city.tasks.find(t=>!t.done);
  if(city.beacon){
    if(next){ city.beacon.visible = true; city.beacon.position.set(next.tx, 11, next.tz); }
    else city.beacon.visible = false;
  }
}
/* 星达独白打字机（探索/地表共用） */
function xdDialogueTick(dt){
  if(xd.lineTimer > 0) xd.lineTimer -= dt;
  if(xd.queue.length && xd.lineTimer <= 0){
    const item = xd.queue[0];
    if(xd.typed === 0 && item.act) item.act();
    if(xd.typed < item.t.length){
      xd.typed += dt*24;
      xdLineEl.textContent = item.t.slice(0, Math.floor(xd.typed));
      xdDialog.classList.add('on');
    } else { xd.lineTimer = xd.hold; xd.queue.shift(); xd.typed = 0; }
  } else if(!xd.queue.length && xd.lineTimer <= 0){
    xdDialog.classList.remove('on');
  }
}

/* ---------- NPC 对话（气泡 → E 选项 → 简答） ---------- */
const npcOptsEl = document.getElementById('npcOpts');
const npcNextEl = document.getElementById('npcNext');
function snpcBubble(n){
  surface.snpc = n; surface.snpcMode = 'bubble';
  npcNameEl.textContent = n.name; npcRoleEl.textContent = n.role;
  npcAvatar.classList.toggle('ai', /AI|系统/.test(n.role));
  npcLineEl.textContent = n.greet;
  npcOptsEl.classList.remove('on'); npcOptsEl.innerHTML = '';
  npcNextEl.textContent = '按 E 交谈';
  npcDialog.classList.add('on');
}
function snpcOptions(n){
  surface.snpcMode = 'opts';
  npcLineEl.textContent = '想聊点什么？';
  npcOptsEl.innerHTML = '';
  n.options.forEach((o, i)=>{
    const b = document.createElement('button');
    b.innerHTML = `<b>${i+1}</b>${o.q}`;
    b.onclick = ()=>snpcAnswer(n, i);
    npcOptsEl.appendChild(b);
  });
  npcOptsEl.classList.add('on');
  npcNextEl.textContent = '按 1/2/3 或点击选择 · E 结束';
}
function snpcAnswer(n, i){
  surface.snpcMode = 'answer';
  surface.talked.add(n.id);
  npcLineEl.textContent = n.options[i].a;
  npcOptsEl.classList.remove('on'); npcOptsEl.innerHTML = '';
  npcNextEl.textContent = 'E 继续交谈 · 离开结束';
  const city = surface.city;
  if(city && city.id === 'capital'){
    const t = city.tasks.find(t=>t.id==='talk');
    if(t && !t.done && surface.talked.size >= 2) completeTask(city, 'talk');
    else refreshSurfaceObjective();
  }
}
function snpcClose(){
  surface.snpc = null; surface.snpcMode = 'none';
  npcDialog.classList.remove('on');
  npcOptsEl.classList.remove('on'); npcOptsEl.innerHTML = '';
}

/* ==================== 城市 01 · AURELIA 火星首都（NEW CIVILIZATION） ==================== */
function buildAurelia(city){
  const sc = city.scene = makeSurfaceScene(0x2c1a10, 0x6e452c, 70, 340);
  city.bounds = 112;
  city.spawn = { x:0, z:-92, yaw:0 };
  city.intro = [
    '到了——Aurelia，火星的首都。',
    '沿着主街往前走，尽头就是中央广场。',
    '先去登记亭接入城市网络吧，跟着光柱走。',
  ];
  // 向导地标：靠近自动解说一句
  city.guide = [
    { x:0,   z:14,  r:13, text:'拓荒纪念碑——连穹顶都没有的年代，就有人相信会有今天。' },
    { x:-26, z:46,  r:11, text:'医疗中心。在低重力和辐射里，它是这座城最不能停的地方。' },
    { x:-16, z:-68, r:13, text:'城市能源节点。这些日冕树，养着 Aurelia 的每一盏灯。' },
  ];
  city.idleHint = '主街尽头是中央广场，西侧还有医疗中心和行政塔——想去哪儿，跟着我。';
  const col = city.colliders;

  // 地面：风化层 + 城市铺装
  city.groundMesh = sGround(sc, 130, 0x6b4230);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(106, 64).rotateX(-Math.PI/2),
    new THREE.MeshStandardMaterial({ color:0x2b3038, roughness:0.85, bumpMap:texGrain, bumpScale:0.015 }));
  floor.position.y = 0.02; sc.add(floor);
  sc.add(makeDome(108, 0.06));   // 首都穹顶（ faint 围合感）

  // —— 主街（南城门 → 中央广场 → 北端）+ 横街 ——
  sRoad(sc, 0, 0, 12, 200);
  sStrip(sc, 0, 0, 0.5, 200, 0, 0x49d7ff, 0.8);
  for(const s of [-1,1]) sStrip(sc, s*6.6, 0, 1.6, 200, 0, 0xffc98a, 0.35);   // 两侧人行道
  sRoad(sc, 0, -32, 170, 8); sRoad(sc, 0, 36, 170, 8);
  sStrip(sc, 0, -32, 170, 0.4, 0, 0x49d7ff, 0.5); sStrip(sc, 0, 36, 170, 0.4, 0, 0x49d7ff, 0.5);

  // —— 中央广场（城市核心） ——
  const plaza = new THREE.Mesh(new THREE.CylinderGeometry(16, 16.5, 0.24, 48),
    new THREE.MeshStandardMaterial({ color:0x3a3f46, roughness:0.7, bumpMap:texGrain, bumpScale:0.01 }));
  plaza.position.set(0, 0.12, 14); sc.add(plaza);
  for(let i=0;i<3;i++){
    const ring = new THREE.Mesh(new THREE.TorusGeometry(13-i*3.2, 0.14, 6, 64).rotateX(Math.PI/2),
      new THREE.MeshStandardMaterial({ color:0x111820, emissive:0xffc98a, emissiveIntensity:0.9 }));
    ring.position.set(0, 0.26, 14); sc.add(ring);
  }
  // 拓荒纪念碑（城市地标）
  const mon = new THREE.Group();
  const mBase = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.8, 1, 24), matMetal); mBase.position.y=0.5; mon.add(mBase);
  const mSpire = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 1.6, 13, 8), matMetal); mSpire.position.y=7.5; mon.add(mSpire);
  const mCore = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.56, 13, 8),
    new THREE.MeshBasicMaterial({ color:0x7fe7ff, transparent:true, opacity:0.18, blending:THREE.AdditiveBlending }));
  mCore.position.y=7.5; mon.add(mCore);
  for(let i=0;i<2;i++){
    const r = new THREE.Mesh(new THREE.TorusGeometry(2.2+i*0.9, 0.12, 8, 48), matMetal);
    r.position.y = 5+i*3.4; r.rotation.x = Math.PI/2 + (i? -0.2 : 0.2); mon.add(r);
    city.ticks.push((dt)=>{ r.rotation.z += dt*0.3; });
  }
  const mTop = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 16), matCore); mTop.position.y=14.4; mon.add(mTop);
  addGlow(mon, new THREE.Vector3(0, 14.4, 0), 0x7fe7ff, 7);
  mon.position.set(0, 0.24, 14); sc.add(mon);
  col.push({ x:0, z:14, r:4.2, h:15 });
  sSign(sc, '中央广场 · 拓荒纪念碑', 0, 17.5, 14, 7);
  for(let i=0;i<6;i++){ const a=i/6*Math.PI*2+0.3;
    const bench = new THREE.Mesh(new THREE.BoxGeometry(1.6,0.14,0.5), matDark);
    bench.position.set(Math.cos(a)*10.5, 0.45, 14+Math.sin(a)*10.5); bench.rotation.y=-a; sc.add(bench);
    sLamp(sc, Math.cos(a)*13.5, 14+Math.sin(a)*13.5, i%2===0);
  }
  for(const s of [-1,1]){ sTree(sc, s*8, 24, 1.3); sTree(sc, s*11, 4, 1.1); }

  // —— 城市登记亭（核心行为：身份登记） ——
  const kiosk = new THREE.Group();
  const kBody = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.6, 2.0), matWhite); kBody.position.y=1.3; kiosk.add(kBody);
  const kRoof = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.16, 2.6), matDark); kRoof.position.y=2.72; kiosk.add(kRoof);
  const kScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.8),
    new THREE.MeshStandardMaterial({ color:0x0a2028, emissive:0x49d7ff, emissiveIntensity:1.2 }));
  kScreen.position.set(0, 1.5, 1.02); kiosk.add(kScreen);
  kiosk.position.set(10, 0, -4); kiosk.rotation.y = -0.5; sc.add(kiosk);
  col.push({ x:10, z:-4, r:1.9, h:2.8 });
  sSign(sc, '城市登记亭', 10, 3.8, -4, 3.2);
  addGlow(sc, new THREE.Vector3(10, 2.2, -4), 0x49d7ff, 2);
  addInteract(city, 'register', 10, -4, 4, '城市身份登记', '按 E · 接入 Aurelia 城市网络', ()=>{
    kScreen.material.emissive.setHex(0x5ef2b8);
    xdSay(['身份采集中……好了，很简单。','从现在起，你是 Aurelia 城市网络的访问者——门禁、磁悬浮、公共终端，都会认得你。']);
    showToast('身份登记完成 · 欢迎接入 Aurelia');
    completeTask(city, 'register');
  });

  // —— 东侧：居住组团（三处庭院 + 步行连接） ——
  const courtYards = [[34,-10],[42,28],[30,62]];
  courtYards.forEach(([cx,cz],ci)=>{
    for(let i=0;i<4;i++){
      const a = i/4*Math.PI*2 + ci*0.5;
      const h = 8 + ((ci*7+i*5)%13);
      sBox(sc, col, 5, h, 5, matHabFacade, cx+Math.cos(a)*9, cz+Math.sin(a)*9, a);
    }
    const yard = new THREE.Mesh(new THREE.CylinderGeometry(5.5, 5.5, 0.12, 24),
      new THREE.MeshStandardMaterial({ color:0x37402f, roughness:0.9 }));
    yard.position.set(cx, 0.06, cz); sc.add(yard);
    sTree(sc, cx-1.5, cz, 1.2); sTree(sc, cx+1.8, cz+1, 1);
    sLamp(sc, cx, cz-3.5, true);
    sStrip(sc, cx/2, cz/2+ (cz>0?7:-7), Math.abs(cx), 1.2, Math.atan2(cz, cx), 0xffc98a, 0.3);  // 步道连主街
  });
  sSign(sc, '居住组团 · 东三区', 36, 14, 28, 4.5);

  // —— 西侧：商业服务 / 医疗 / 行政 / 能源 ——
  sBox(sc, col, 7, 26, 7, matTowerGlass, -26, -12, 0.3);
  sBox(sc, col, 6, 20, 6, matTowerGlass, -34, 6, 0.9);
  sBox(sc, col, 5, 15, 5, matTowerGlass, -22, 18, 0.1);
  // 空中连廊（建筑之间的关系）
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(10, 1.4, 2.2), domeMat(0.35));
  bridge.position.set(-29, 12, -3); bridge.rotation.y = 0.75; sc.add(bridge);
  sSign(sc, '中央商业区', -27, 22, -4, 4.5);
  // 医疗中心（白 + 绿十字）
  const med = sBox(sc, col, 10, 9, 8, matWhite, -26, 46, 0.2);
  const cross1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 3.2, 0.2), new THREE.MeshStandardMaterial({ color:0x0d2818, emissive:0x5ef2b8, emissiveIntensity:1.6 }));
  cross1.position.set(-26, 6, 42.05); sc.add(cross1);
  const cross2 = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.9, 0.2), cross1.material);
  cross2.position.set(-26, 6, 42.0); sc.add(cross2);
  sSign(sc, 'Aurelia 医疗中心', -26, 11.5, 46, 4);
  // 行政塔
  const adm = sCyl(sc, col, 4.2, 32, matTowerGlass, -32, -46, { rTop:3.2 });
  const admRing = new THREE.Mesh(new THREE.TorusGeometry(4.6, 0.3, 8, 32).rotateX(Math.PI/2), matCore);
  admRing.position.set(-32, 24, -46); sc.add(admRing);
  sSign(sc, '市政行政塔', -32, 35, -46, 4.5);
  // 能源节点（日冕树 + 储能）
  for(let i=0;i<3;i++){
    const et = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14,0.24,5,6), matDark); trunk.position.y=2.5; et.add(trunk);
    for(let p=0;p<6;p++){ const a=p/6*Math.PI*2;
      const petal = new THREE.Mesh(new THREE.SphereGeometry(0.9,8,6), matSolar);
      petal.scale.set(1,0.16,0.55); petal.position.set(Math.cos(a)*0.9, 5.1, Math.sin(a)*0.9); petal.rotation.y=-a; et.add(petal);
    }
    et.position.set(-20+i*4.5, 0, -68); sc.add(et); col.push({ x:-20+i*4.5, z:-68, r:1.2, h:5.4 });
  }
  sBox(sc, col, 6, 2.4, 2.5, matMetal, -8, -70, 0.1);
  sSign(sc, '城市能源节点', -16, 7.5, -68, 4);

  // —— 环城磁悬浮（百万级城市交通：高架环 + 双向车厢 + 车站） ——
  const mlPts = [];
  for(let i=0;i<8;i++){ const a=i/8*Math.PI*2; mlPts.push(new THREE.Vector3(Math.cos(a)*46, 6.5, 10+Math.sin(a)*56)); }
  const mlCurve = new THREE.CatmullRomCurve3(mlPts, true);
  sc.add(new THREE.Mesh(new THREE.TubeGeometry(mlCurve, 96, 0.32, 8), matTube));
  sc.add(new THREE.Mesh(new THREE.TubeGeometry(mlCurve, 96, 0.07, 6), matCore));
  for(let i=0;i<8;i++){ const p = mlPts[i];
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.26,6.5,8), matMetal);
    post.position.set(p.x, 3.25, p.z); sc.add(post);
  }
  for(let k=0;k<3;k++){
    const pod = new THREE.Mesh(new THREE.CapsuleGeometry(0.5, 2.6, 4, 10),
      new THREE.MeshStandardMaterial({ color:0xe8edf2, roughness:0.3, metalness:0.5, emissive:0x66d9ff, emissiveIntensity:0.5 }));
    pod.rotation.z = Math.PI/2; sc.add(pod);
    const st = { t:k/3 };
    city.ticks.push((dt)=>{
      st.t = (st.t + dt*0.018 + 1) % 1;
      const p = mlCurve.getPoint(st.t), tan = mlCurve.getTangent(st.t);
      pod.position.copy(p); pod.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), tan.normalize());
    });
  }
  // 主街车站 ×2
  [[0,-32],[0,36]].forEach(([sx,sz])=>{
    const plat = new THREE.Mesh(new THREE.BoxGeometry(8, 0.4, 3), matMetal); plat.position.set(sx, 6.3, sz); sc.add(plat);
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(9, 0.2, 4), matDark); canopy.position.set(sx, 8.6, sz); sc.add(canopy);
    for(const s of [-1,1]){
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.12,8.6,6), matMetal);
      leg.position.set(sx+s*4, 4.3, sz); sc.add(leg);
    }
    const stLight = new THREE.Mesh(new THREE.BoxGeometry(7,0.08,0.2), matCore); stLight.position.set(sx,8.4,sz); sc.add(stLight);
  });
  sSign(sc, '环城磁悬浮 · 主街站', 0, 10.2, 36, 4);

  // 街道照明 + 城市边缘
  for(let z=-80; z<=90; z+=22){ sLamp(sc, -8.5, z, z%44===0); sLamp(sc, 8.5, z+11, z%44!==0); }
  for(let i=0;i<10;i++){ const a=i/10*Math.PI*2;
    sCyl(sc, col, 1.2, 3.5, matDark, Math.cos(a)*100, Math.sin(a)*100, { seg:8 });   // 边缘结构柱
  }
  // 南城门（出生点气闸意象）
  const gate = new THREE.Mesh(new THREE.TorusGeometry(5, 0.7, 10, 32), matMetal);
  gate.position.set(0, 5, -100); sc.add(gate);
  const gateGlow = new THREE.Mesh(new THREE.TorusGeometry(5, 0.2, 6, 32), matCore);
  gateGlow.position.set(0, 5, -100); sc.add(gateGlow);
  sSign(sc, 'Aurelia 南门 · 着陆区', 0, 11, -100, 4.5);

  // 人群与 NPC
  addSurfaceWalker(city, 0xc8b8a8, 0, 14, 9, 0.35);
  addSurfaceWalker(city, 0x8fa4b0, 0, 14, 11, -0.28, 2);
  addSurfaceWalker(city, 0xb89888, 34, -10, 3.4, 0.5, 1);
  addSurfaceWalker(city, 0x9ab0a8, -27, 0, 5, 0.4, 3);
  addSurfaceNPC(city, 0xd97b4a, 12.5, -1.5, -2.2, '安', '城市登记官',
    '欢迎来到 Aurelia。第一次来？先去登记亭按个印，城市才会认得你。',
    [
      { q:'登记有什么用？', a:'接入城市网络之后，门禁、磁悬浮、公共终端都会对你开放。一句话：从游客，变成客人。' },
      { q:'这座城市住了多少人？', a:'登记人口四十二万，火星最多。三代人在这里出生——对他们来说，地球才是远方。' },
      { q:'你在这里多久了？', a:'十一年。看着主街从一条临时通道，长成现在这个样子。' },
    ], undefined, { xdIntro:'这位是安，Aurelia 的城市登记官。每个新移民的第一站，都从她这里开始。' });
  addSurfaceNPC(city, 0xc8b8a8, 34, -4, 2.6, '陈栖', '火星居民 · Aurelia 第三代',
    '新面孔？坐早班电梯下来的吧。',
    [
      { q:'你出生在火星？', a:'嗯，第三号穹顶。小时候洗澡要计时，现在循环系统好了，能痛快淋浴。' },
      { q:'这里生活方便吗？', a:'吃穿住行都在穹顶里解决。下班去广场喝杯合成咖啡，看纪念碑的灯——这就是日常。' },
    ], undefined, { wander:1.4, xdIntro:'陈栖，在火星出生的第三代。对他来说，地球只是课本上的地方。' });
  addSurfaceNPC(city, 0x8fb4d8, -28, -42, 0.8, '岚', '城市服务 · 行政塔',
    '行政塔今天人不多，运气不错。',
    [
      { q:'你在管理什么？', a:'水、电、气的调度，还有磁悬浮的班次。城市不是机器，是一百万个待办事项。' },
      { q:'城市谁在做决定？', a:'居民议会加 AI 辅助。地球那一套搬过来改一改——火星有自己的规矩。' },
    ], undefined, { xdIntro:'岚负责行政塔的调度。整座城的水、电、气，都过她的手。' });

  // 任务：CITY WALK → 登记 → 交谈
  sTask(city, 'walk', '沿主街走到中央广场', 0, 14);
  sTask(city, 'register', '完成城市身份登记', 10, -4);
  sTask(city, 'talk', '与两位市民交谈', 34, -4);
  city.ticks.push(()=>{
    const t = city.tasks[0];
    if(!t.done && surface.player && Math.hypot(surface.player.pos.x, surface.player.pos.z-14) < 11)
      completeTask(city, 'walk');
  });
}

/* ==================== 城市 02 · VERDE 翡绿生态城（LIFE ON MARS） ==================== */
function buildVerde(city){
  const sc = city.scene = makeSurfaceScene(0x14201a, 0x3d5c46, 60, 300, 0xe8f4d8);
  city.bounds = 98;
  city.spawn = { x:0, z:-84, yaw:0 };
  city.intro = [
    'Verde——红色荒漠里长出来的一整块森林。',
    '水、光、温度，是这座城的三根命脉。',
    '帮我个忙：把三处调节点都跑一遍，你就知道这座城是怎么呼吸的。',
  ];
  // 向导地标：靠近自动解说一句
  city.guide = [
    { x:0,   z:8,   r:16, text:'中央湖——整座城的水，从这里开始循环。' },
    { x:26,  z:30,  r:13, text:'垂直栽培塔。火星的蔬菜和氧气，大多来自这里。' },
    { x:-34, z:42,  r:12, text:'温控环。夜里它给整个穹顶保温，作物才熬得过火星的寒夜。' },
  ];
  city.idleHint = '中央湖、栽培塔、温控环——这座城的呼吸都在这几处，去转转吧。';
  const col = city.colliders;

  // 地面：草地 + 步道
  city.groundMesh = sGround(sc, 120, 0x5a4632);
  const lawn = new THREE.Mesh(new THREE.CircleGeometry(96, 64).rotateX(-Math.PI/2),
    new THREE.MeshStandardMaterial({ color:0x39543a, roughness:0.95, bumpMap:texGrain, bumpScale:0.02 }));
  lawn.position.y = 0.02; sc.add(lawn);
  const dome = makeDome(100, 0.1); sc.add(dome);

  // —— 人工水循环：中央湖 + 环形运河 + 水塔 + 泵站 ——
  const lakeMat = new THREE.MeshStandardMaterial({ color:0x2f9fe8, roughness:0.12, metalness:0.2,
    emissive:0x1a6fc0, emissiveIntensity:0.5 });
  const lake = new THREE.Mesh(new THREE.CircleGeometry(13, 40).rotateX(-Math.PI/2), lakeMat);
  lake.position.set(0, 0.06, 8); sc.add(lake);
  const canalMat = new THREE.MeshStandardMaterial({ color:0x2f9fe8, roughness:0.15,
    emissive:0x1a6fc0, emissiveIntensity:0.35 });
  const canal = new THREE.Mesh(new THREE.TorusGeometry(30, 1.5, 8, 72).rotateX(Math.PI/2), canalMat);
  canal.position.set(0, 0.08, 8); sc.add(canal);
  city.ticks.push((dt,t)=>{ lake.position.y = 0.06 + Math.sin(t*0.8)*0.015; canal.position.y = 0.08 + Math.sin(t*0.8+1)*0.012; });
  for(const [wx,wz] of [[16,16],[-16,16]]){
    const wt = new THREE.Group();
    const wb = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.9, 9, 12), matWhite); wb.position.y=4.5; wt.add(wb);
    for(let i=0;i<3;i++){
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.16, 6, 24).rotateX(Math.PI/2), canalMat);
      ring.position.y = 2.4+i*2.6; wt.add(ring);
    }
    wt.position.set(wx, 0, wz); sc.add(wt); col.push({ x:wx, z:wz, r:2.2, h:9 });
  }
  sSign(sc, '水循环塔', 16, 11, 16, 3.5);
  // 泵站（水循环阀 · 交互点）
  const pump = sBox(sc, col, 3.4, 2.6, 2.8, matMetal, 12, -4, 0.4);
  const pumpPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.3,7,8), matMetal);
  pumpPipe.position.set(8, 0.4, 1); pumpPipe.rotation.z = Math.PI/2; pumpPipe.rotation.y = 0.7; sc.add(pumpPipe);
  sSign(sc, '循环泵站', 12, 3.6, -4, 3);

  // —— 垂直农业：栽培塔 ×4（光谱灯阵 · 交互点） ——
  const shelfMats = [], growBars = [];
  const farmPos = [[26,30],[-26,30],[26,-16],[-26,-16]];
  farmPos.forEach(([fx,fz],fi)=>{
    const farm = new THREE.Group();
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.6,10,8), matMetal); core.position.y=5; farm.add(core);
    for(let i=0;i<7;i++){
      const sm = new THREE.MeshStandardMaterial({ color:0x3fae6f, emissive:0x2f9e5f, emissiveIntensity:0.7, roughness:0.7 });
      shelfMats.push(sm);
      const shelf = new THREE.Mesh(new THREE.CylinderGeometry(3.4-i*0.28, 3.4-i*0.28, 0.35, 16), sm);
      shelf.position.y = 1+i*1.3; farm.add(shelf);
      const bar = new THREE.Mesh(new THREE.TorusGeometry(3.1-i*0.28, 0.07, 6, 24).rotateX(Math.PI/2),
        new THREE.MeshStandardMaterial({ color:0x2a1a2a, emissive:0xc07aff, emissiveIntensity:0.8 }));
      bar.position.y = 1.32+i*1.3; farm.add(bar); growBars.push(bar.material);
    }
    farm.position.set(fx, 0, fz); sc.add(farm); col.push({ x:fx, z:fz, r:3.8, h:10.5 });
  });
  sSign(sc, '垂直栽培塔群', 26, 12, 30, 4.5);
  const lightConsole = sBox(sc, col, 1.6, 1.3, 0.8, matDark, 22, 26, -0.6);
  const lightScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.7),
    new THREE.MeshStandardMaterial({ color:0x1a0a20, emissive:0xc07aff, emissiveIntensity:1.1 }));
  lightScreen.position.set(22, 1.1, 25.55); lightScreen.rotation.y = -0.6+Math.PI; sc.add(lightScreen);

  // —— 植物培育区：田垄 + 温室链 ——
  const crops = [];
  for(let r=0;r<6;r++) for(let c=0;c<10;c++){
    crops.push({ p:new THREE.Vector3(20+c*2.6, 0.35, 44+r*3.2), s:new THREE.Vector3(0.5, 0.7+((r+c)%3)*0.2, 0.5) });
  }
  const cropMesh = instanced(new THREE.ConeGeometry(1,1,7), matLeaf2, crops);
  sc.add(cropMesh);
  for(let r=0;r<6;r++) sStrip(sc, 31.7, 44+r*3.2+1.6, 26, 0.5, 0, 0x49d7ff, 0.25);   // 灌溉带
  sSign(sc, '培育田 · 三号区', 32, 4, 54, 4);
  [[-36,-32],[-48,-16],[-32,-48]].forEach(([gx,gz])=>{
    const gd = makeDome(6, 0.18); gd.position.set(gx, 0, gz); sc.add(gd);
    const veg = new THREE.Mesh(new THREE.SphereGeometry(4.6, 14, 8, 0, Math.PI*2, 0, Math.PI/2), matEco);
    veg.scale.y = 0.4; veg.position.set(gx, 0.05, gz); sc.add(veg);
    col.push({ x:gx, z:gz, r:6.2, h:5 });
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.8,0.8,Math.hypot(gx,gz-8)-6,8), domeMat(0.22));
    tube.position.set(gx/2, 1, (gz-8)/2+4); tube.rotation.z = Math.PI/2; tube.rotation.y = -Math.atan2(gz-8, gx);
    sc.add(tube);
  });
  sSign(sc, '链式温室', -38, 7.5, -30, 4);

  // —— 气候控制塔（温控环 · 交互点） ——
  const clim = new THREE.Group();
  const climB = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.2, 14, 12), matWhite); climB.position.y=7; clim.add(climB);
  const climRings = [];
  for(let i=0;i<4;i++){
    const r = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.18, 8, 28).rotateX(Math.PI/2),
      new THREE.MeshStandardMaterial({ color:0x1a2a20, emissive:0x7dd8ff, emissiveIntensity:1.2 }));
    r.position.y = 3+i*3; clim.add(r); climRings.push(r.material);
  }
  clim.position.set(-34, 0, 42); sc.add(clim); col.push({ x:-34, z:42, r:2.6, h:14 });
  addGlow(sc, new THREE.Vector3(-34, 15, 42), 0x7dd8ff, 3);
  sSign(sc, '气候控制塔', -34, 16.5, 42, 4);

  // —— 居住空间：穹顶南居住荚 ——
  for(let i=0;i<6;i++){
    const hx = -16 + i*6.4, hz = -56 - (i%2)*6;
    const hab = new THREE.Mesh(new THREE.CapsuleGeometry(1.7, 3.4, 4, 12).rotateZ(Math.PI/2), matWhite);
    hab.position.set(hx, 1.7, hz); sc.add(hab); col.push({ x:hx, z:hz, r:3.2, h:3.4 });
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.8,0.5,0.1),
      new THREE.MeshStandardMaterial({ color:0x2a2418, emissive:0xffc978, emissiveIntensity:1.4 }));
    win.position.set(hx, 1.9, hz+1.75); sc.add(win);
  }
  sSign(sc, '湖岸居住荚', 0, 5.5, -58, 4);
  // 树木与花
  const trees = [];
  for(let i=0;i<160;i++){
    const a = rand()*Math.PI*2, rr = 36+Math.sqrt(rand())*56;
    trees.push({ p:new THREE.Vector3(Math.cos(a)*rr, 0.8, 8+Math.sin(a)*rr*0.9), s:new THREE.Vector3(0.6, 1.6+rand()*1.2, 0.6) });
  }
  sc.add(instanced(new THREE.ConeGeometry(1,1,7), matEco, trees));
  for(let i=0;i<10;i++){ const a=i/10*Math.PI*2; sLamp(sc, Math.cos(a)*24, 8+Math.sin(a)*24, false); }

  // NPC
  addSurfaceWalker(city, 0x8fb4d8, 0, 8, 19, 0.3);
  addSurfaceWalker(city, 0x9ab0a8, 0, 8, 21, -0.24, 2);
  addSurfaceNPC(city, 0x57c785, 24, 26, -2.4, '苔', '植物学家',
    '轻一点——这边的秧苗昨天刚醒。',
    [
      { q:'这些植物吃什么光？', a:'定制光谱，一种作物一档。红光管生长，蓝光管叶片——比地球上的太阳还讲究。' },
      { q:'火星土壤能种东西吗？', a:'能，但要先洗盐、调菌。你脚下这片田，五年前还是消毒过的风化层。' },
    ], 0x8fffbe, { xdIntro:'苔是植物学家。穹顶下这片绿意，大半是她的作品。' });
  addSurfaceNPC(city, 0x8fb4d8, 14, 12, 2.8, '沐', '生态工程师',
    '听到水泵的声音了吗？那是这座城的呼吸。',
    [
      { q:'水从哪里来？', a:'极地冰层，净化后进循环塔。城里每一滴水，一年要循环三百多次。' },
      { q:'系统会出故障吗？', a:'会，所以我们轮班守着。生态不是装好的机器，是每天都要照顾的活物。' },
    ], undefined, { xdIntro:'沐，生态工程师。这座城的水、光和温度，都是他在维持。' });
  addSurfaceNPC(city, 0xc8b8a8, -7, -8, 1.2, '阿禾', '居民',
    '我每天下班，都来湖边坐一会儿。',
    [
      { q:'住在穹顶里什么感觉？', a:'像住在一个巨大的温室里。抬头是玻璃，低头是泥土——但空气是甜的。' },
      { q:'想地球吗？', a:'我女儿出生在这里。对她来说，有树有湖的地方就是家，不用想。' },
    ], undefined, { wander:1.4, xdIntro:'阿禾住在湖岸居住荚。Verde 最普通的一天，就是这样的。' });

  // 三个调节交互（核心行为：调节生态系统）
  addInteract(city, 'water', 12, -4, 4, '水循环阀', '按 E · 增大循环流量', ()=>{
    canalMat.emissiveIntensity = 1.2; lakeMat.emissiveIntensity = 1.0;
    xdSay(['阀门开了——听，水声变大了。','这两万年前冻住的冰，现在是这座城的河。']);
    showToast('水循环流量 +40% · 运河水位上升');
    completeTask(city, 'water');
  });
  addInteract(city, 'light', 22, 26, 4, '光谱灯阵', '按 E · 校准作物流光光谱', ()=>{
    shelfMats.forEach(m=>m.emissiveIntensity = 1.6);
    growBars.forEach(m=>m.emissiveIntensity = 2.4);
    lightScreen.material.emissive.setHex(0x5ef2b8);
    xdSay(['光谱校准完成。这批生菜的收成，会比上周好一成。','在火星，阳光也是可以调出来的。']);
    showToast('光谱校准完成 · 栽培塔全功率运行');
    completeTask(city, 'light');
  });
  addInteract(city, 'temp', -34, 42, 4.4, '温控环', '按 E · 上调穹顶夜间温度', ()=>{
    climRings.forEach(m=>{ m.emissive.setHex(0xffb267); m.emissiveIntensity = 1.8; });
    sc.fog.color.setHex(0x5c5240); sc.background.setHex(0x201c12);
    xdSay(['温度上调两度。今晚，田里的作物可以睡个好觉。','你刚刚做的，就是 Verde 居民每天在做的事——亲手维持一个世界。']);
    showToast('穹顶温度 +2°C · 气候系统平衡');
    completeTask(city, 'temp');
  });
  sTask(city, 'water', '调节水循环阀', 12, -4);
  sTask(city, 'light', '校准光谱灯阵', 22, 26);
  sTask(city, 'temp', '调整温控环', -34, 42);
}

/* ==================== 城市 03 · HEPHAESTUS 工业城（INDUSTRIAL CIVILIZATION） ==================== */
function buildHephaestus(city){
  const sc = city.scene = makeSurfaceScene(0x18100a, 0x54341e, 70, 360, 0xffd8b0);
  city.bounds = 112;
  city.spawn = { x:0, z:-88, yaw:0 };
  city.intro = [
    'Hephaestus——火星的锻造炉。',
    '看见那条产线了吗？红土进去，钢和燃料出来。',
    '来，亲手启动一次：原料 → 处理 → 输出。跟着光柱。',
  ];
  // 向导地标：靠近自动解说一句
  city.guide = [
    { x:0,  z:12, r:14, text:'聚变能源塔——这座城的心脏，也是半个火星的电源。' },
    { x:48, z:20, r:14, text:'星舰总装厂房。下一艘回地球的船，就在这里造。' },
    { x:34, z:52, r:13, text:'液氢储罐区。火星的工业血液，全存在这里。' },
  ];
  city.idleHint = '能源塔在东边，总装厂房在更东边。跟着光柱走，小心脚下的传送带。';
  const col = city.colliders;

  // 地面：工业平台 + 道路
  city.groundMesh = sGround(sc, 128, 0x4a3424);
  const plat = new THREE.Mesh(new THREE.CircleGeometry(104, 56).rotateX(-Math.PI/2),
    new THREE.MeshStandardMaterial({ color:0x2e2c2a, roughness:0.8, metalness:0.2, bumpMap:texGrain, bumpScale:0.02 }));
  plat.position.y = 0.02; sc.add(plat);
  sRoad(sc, 0, -40, 10, 100); sRoad(sc, 0, 10, 130, 8);
  sStrip(sc, 0, -40, 0.5, 100, 0, 0xff8c3a, 0.6); sStrip(sc, 0, 10, 130, 0.4, 0, 0xff8c3a, 0.5);

  // —— 聚变能源塔（城市心脏） ——
  const et = new THREE.Group();
  const etBody = new THREE.Mesh(new THREE.CylinderGeometry(3, 4.6, 30, 12), matMetal); etBody.position.y=15; et.add(etBody);
  const etCore = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 31, 10), matCore); etCore.position.y=15.5; et.add(etCore);
  const etCap = new THREE.Mesh(new THREE.TorusGeometry(3.8, 0.6, 8, 28).rotateX(Math.PI/2), matFactory); etCap.position.y=30.5; et.add(etCap);
  const etGlow = addGlow(et, new THREE.Vector3(0, 31, 0), 0x7fe7ff, 10);
  et.position.set(0, 0, 12); sc.add(et); col.push({ x:0, z:12, r:5.2, h:32 });
  sSign(sc, '聚变能源塔', 0, 35, 12, 6);
  city.ticks.push((dt,t)=>{ const s = 9 + Math.sin(t*(city.coreDone?5:2.2))*1.6; etGlow.scale.set(s,s,1); });

  // —— 原料输入站（交互 1） ——
  const hopper = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 3.2, 5, 4), matFactory);
  hopper.position.set(-46, 6.5, -20); hopper.rotation.y = Math.PI/4; sc.add(hopper);
  const hopperLegs = new THREE.Mesh(new THREE.BoxGeometry(4.4, 4, 4.4), matDark);
  hopperLegs.position.set(-46, 2, -20); sc.add(hopperLegs);
  col.push({ x:-46, z:-20, r:3.4, h:9 });
  const orePiles = [];
  for(let i=0;i<14;i++){ const a=rand()*Math.PI*2, rr=3.5+rand()*3;
    orePiles.push({ p:new THREE.Vector3(-46+Math.cos(a)*rr, 0.3+rand()*0.4, -26+Math.sin(a)*rr),
      s:new THREE.Vector3(0.6+rand()*0.8, 0.5+rand()*0.6, 0.6+rand()*0.8), ry:rand()*3 });
  }
  sc.add(instanced(new THREE.DodecahedronGeometry(1,0),
    new THREE.MeshStandardMaterial({ color:0x8a4a30, roughness:1 }), orePiles));
  const hopperLamp = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.3,0.5),
    new THREE.MeshStandardMaterial({ color:0x1a0d08, emissive:0xff8c3a, emissiveIntensity:0.6 }));
  hopperLamp.position.set(-46, 9.4, -20); sc.add(hopperLamp);
  sSign(sc, '原料输入站', -46, 11.5, -20, 4);

  // —— 传送带：原料 → 处理 ——
  const beltPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-43, 1.1, -18), new THREE.Vector3(-24, 1.1, -12), new THREE.Vector3(-6, 1.1, -6),
  ]);
  sc.add(new THREE.Mesh(new THREE.TubeGeometry(beltPath, 24, 0.7, 8), matDark));
  const oreBoxes = [];
  for(let i=0;i<6;i++){
    const ob = new THREE.Mesh(new THREE.BoxGeometry(0.8,0.6,0.8),
      new THREE.MeshStandardMaterial({ color:0x9a5a38, roughness:0.9 }));
    sc.add(ob); oreBoxes.push({ mesh:ob, t:i/6 });
  }
  let conveyorOn = false;
  city.ticks.push((dt)=>{
    if(!conveyorOn) return;
    for(const ob of oreBoxes){
      ob.t = (ob.t + dt*0.06) % 1;
      ob.mesh.position.copy(beltPath.getPoint(ob.t));
      ob.mesh.position.y += 0.75;
    }
  });

  // —— 处理中心 / 冶炼炉（交互 2） ——
  const smelter = sBox(sc, col, 12, 10, 9, matFactory, 2, -6, 0.1);
  const smeltGlowMat = new THREE.MeshStandardMaterial({ color:0x2a1408, emissive:0xff6a20, emissiveIntensity:0.7 });
  const smeltMouth = new THREE.Mesh(new THREE.PlaneGeometry(5, 3), smeltGlowMat);
  smeltMouth.position.set(2, 2.2, -10.56); smeltMouth.rotation.y = Math.PI; sc.add(smeltMouth);
  const chimney = sCyl(sc, col, 1.2, 16, matDark, 7, -3, { rTop:0.8 });
  const chimGlow = addGlow(sc, new THREE.Vector3(7, 16.5, -3), 0xff7040, 2.5);
  city.ticks.push((dt,t)=>{ const s = 2.2+Math.sin(t*7)*0.5; chimGlow.scale.set(s,s,1); });
  for(let i=0;i<4;i++){
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.35,0.35,10,8), matMetal);
    pipe.position.set(-4+i*3.4, 5.5, -0.5); pipe.rotation.x = Math.PI/2; sc.add(pipe);
  }
  sSign(sc, '资源处理中心', 2, 12.5, -6, 4.5);
  // 处理控制台
  const consoleB = sBox(sc, col, 2, 1.4, 1, matDark, 8, -12, 0.3);
  const consoleScr = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.8),
    new THREE.MeshStandardMaterial({ color:0x201008, emissive:0xff8c3a, emissiveIntensity:1.0 }));
  consoleScr.position.set(8, 1.35, -12.6); consoleScr.rotation.y = Math.PI+0.3; sc.add(consoleScr);

  // —— 输出平台（交互 3）+ 总装厂房 + 火箭 ——
  const outPlat = new THREE.Mesh(new THREE.CylinderGeometry(4, 4.4, 0.5, 20), matMetal);
  outPlat.position.set(30, 0.25, 2); sc.add(outPlat);
  sSign(sc, '能源输出平台', 30, 4.5, 2, 4);
  const hangar = new THREE.Mesh(new THREE.CylinderGeometry(7,7,16,20,1,false,0,Math.PI).rotateZ(Math.PI/2).rotateY(Math.PI/2), matDark);
  hangar.position.set(48, 0, 20); sc.add(hangar); col.push({ x:48, z:20, r:8.5, h:7 });
  const rk = new THREE.Group();
  const rkBody = new THREE.Mesh(new THREE.CylinderGeometry(1.6,1.6,12,14),
    new THREE.MeshStandardMaterial({ color:0xf2f4f6, roughness:0.35, metalness:0.4 })); rkBody.position.y=6; rk.add(rkBody);
  const rkNose = new THREE.Mesh(new THREE.ConeGeometry(1.6,3.5,14), matDark); rkNose.position.y=13.8; rk.add(rkNose);
  for(let i=0;i<4;i++){ const a=i/4*Math.PI*2+Math.PI/4;
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.28,3.4,6), matDark);
    leg.position.set(Math.cos(a)*2.4, 1.7, Math.sin(a)*2.4);
    leg.rotation.z = Math.cos(a)*0.3; leg.rotation.x = -Math.sin(a)*0.3; rk.add(leg);
  }
  const engineGlow = addGlow(rk, new THREE.Vector3(0, -0.5, 0), 0x7fc8ff, 0.01);
  rk.position.set(48, 0, 8); sc.add(rk); col.push({ x:48, z:8, r:3, h:15 });
  sSign(sc, '星舰总装厂房', 48, 12, 20, 5);

  // —— 燃料储罐区 + 管廊 ——
  for(let i=0;i<6;i++){
    const a = 0.4 + i/6*Math.PI*1.2;
    const tx = 34+Math.cos(a)*16, tz = 52+Math.sin(a)*12;
    const tk = new THREE.Group();
    const sph = new THREE.Mesh(new THREE.SphereGeometry(3.4, 16, 12), matMetal); sph.position.y=4.6; tk.add(sph);
    for(let l=0;l<3;l++){ const la=l/3*Math.PI*2;
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.24,0.24,2.6,6), matDark);
      leg.position.set(Math.cos(la)*2.2, 1.3, Math.sin(la)*2.2); tk.add(leg);
    }
    tk.position.set(tx, 0, tz); sc.add(tk); col.push({ x:tx, z:tz, r:3.8, h:8 });
  }
  sSign(sc, '液氢储罐区', 34, 10, 52, 4.5);
  const pipeMain = new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,36,8), matMetal);
  pipeMain.position.set(20, 1.2, 30); pipeMain.rotation.x = Math.PI/2.6; sc.add(pipeMain);

  // —— 货运磁悬浮（自动化物流） ——
  const crPts = [new THREE.Vector3(-62, 7, 66), new THREE.Vector3(0, 7.6, 70), new THREE.Vector3(62, 7, 66)];
  const crCurve = new THREE.CatmullRomCurve3(crPts);
  sc.add(new THREE.Mesh(new THREE.TubeGeometry(crCurve, 32, 0.3, 8), matMetal));
  for(let i=0;i<5;i++){
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.3,7,6), matDark);
    const p = crCurve.getPoint(i/4); post.position.set(p.x, 3.5, p.z); sc.add(post);
  }
  const cargo = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.6, 1.8), matFactory);
  sc.add(cargo);
  const cargoSt = { t:0 };
  city.ticks.push((dt)=>{
    cargoSt.t = (cargoSt.t + dt*0.05) % 1;
    const k = cargoSt.t < 0.5 ? cargoSt.t*2 : 2-cargoSt.t*2;
    cargo.position.copy(crCurve.getPoint(k)); cargo.position.y += 0.9;
  });
  sSign(sc, '真空货运线 · 4 号', 0, 10.5, 70, 4);

  // —— 塔吊 / 集装箱 / 排气塔 / 巡检机器人 ——
  for(const [cx,cz,cry] of [[-24,26,0.6],[18,34,2.4]]){
    const crane = new THREE.Group();
    const cp = new THREE.Mesh(new THREE.CylinderGeometry(0.4,0.55,14,8), matMetal); cp.position.y=7; crane.add(cp);
    const jib = new THREE.Mesh(new THREE.BoxGeometry(11,0.5,0.5), matFactory); jib.position.set(4,14,0); crane.add(jib);
    const hook = new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,4,4), matDark); hook.position.set(8,11.8,0); crane.add(hook);
    crane.position.set(cx,0,cz); crane.rotation.y = cry; sc.add(crane); col.push({ x:cx, z:cz, r:1.2, h:14 });
  }
  const ctns = [];
  for(let i=0;i<26;i++){
    ctns.push({ p:new THREE.Vector3(-30+(i%7)*2.6, 0.75+Math.floor(i/14)*1.55, 44+(Math.floor(i/7)%2)*2.4),
      s:new THREE.Vector3(2.2,1.4,1.2), ry:(rand()-0.5)*0.15 });
  }
  sc.add(instanced(new THREE.BoxGeometry(1,1,1), matFactory, ctns));
  col.push({ x:-22, z:45, r:10, h:3 });
  for(let i=0;i<3;i++){
    const ft = sCyl(sc, col, 0.8, 13, matDark, -58+i*5, 18+i*3, { rTop:0.5 });
    const fg = addGlow(sc, new THREE.Vector3(-58+i*5, 14, 18+i*3), 0xff9040, 2.4);
    city.ticks.push((dt,t)=>{ const s = 2+Math.sin(t*5+i*2.1)*0.7; fg.scale.set(s,s,1); });
  }
  for(let i=0;i<3;i++){
    const bot = new THREE.Group();
    const bb = new THREE.Mesh(new THREE.BoxGeometry(1.2,0.6,0.9), matFactory); bb.position.y=0.55; bot.add(bb);
    const be = new THREE.Mesh(new THREE.BoxGeometry(0.25,0.18,0.18), matCore); be.position.set(0.62,0.6,0); bot.add(be);
    for(const sx of [-1,1]) for(const sz of [-1,1]){
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07,0.07,0.5,5), matDark);
      leg.position.set(sx*0.45,0.22,sz*0.32); bot.add(leg);
    }
    sc.add(bot);
    city.walkers.push({ mesh:bot, cx:-10+i*14, cz:22, r:6, speed:0.4+i*0.12, phase:rand()*6 });
  }
  for(let z=-70; z<=60; z+=26){ sLamp(sc, -7, z, false); sLamp(sc, 7, z+13, false); }

  // NPC
  addSurfaceNPC(city, 0xd97b4a, 5, -11, 2.4, '卡尔', '冶炼工程师',
    '小心脚下的管线。今天炉子状态不错。',
    [
      { q:'这里在造什么？', a:'飞船构件、穹顶材料、机器人零件。八成原料来自火星本地——红土就是我们的矿。' },
      { q:'原料从哪来？', a:'西边矿带的风化层，还有 Glacies 的冰。进来是石头和冰，出去是钢和燃料。' },
    ], undefined, { xdIntro:'卡尔是冶炼工程师。红土变成钢，就是他每天的活。' });
  addSurfaceNPC(city, 0x8fb4d8, 10, -13.5, -0.6, '薇', '产线技术员',
    '控制台别乱碰——哦，你有权限？那行。',
    [
      { q:'这条产线多久出一批？', a:'七十二小时一批构件，全流程无人化。我只负责盯着数据，别打瞌睡。' },
      { q:'机器人比人多吗？', a:'多得多。这座城常住人口不到两万，机器人二十万。我们是来当脑子的。' },
    ], undefined, { xdIntro:'薇盯着这条产线。从原料到成品，一步都不能出错。' });
  addSurfaceNPC(city, 0xc8b8a8, 27, 7, -1.8, '诺', '物流调度员',
    '下一班货运舱，四十分钟后发车。',
    [
      { q:'货都运去哪？', a:'首都、Verde、轨道港。燃料北上，构件上电梯——火星的物流，一天都没停过。' },
      { q:'火箭多久发一次？', a:'每周三班往返 Areos Gate。你要是想上轨道，得提前三个月排队。' },
    ], undefined, { wander:1.2, xdIntro:'诺负责物流调度。整座城的物资流转，都在他脑子里。' });

  // 核心行为：资源 → 能源/制造 流程（有序三步）
  addInteract(city, 'input', -46, -20, 4.6, '原料输入站', '按 E · 投入风化层原料', ()=>{
    conveyorOn = true;
    hopperLamp.material.emissive.setHex(0x5ef2b8); hopperLamp.material.emissiveIntensity = 1.8;
    xdSay(['原料入线。听——传送带动起来了。','这些红色的石头，两个小时以后就是钢。']);
    showToast('原料已入线 · 传送系统启动');
    completeTask(city, 'input');
  });
  addInteract(city, 'process', 8, -12, 4, '处理控制台', '按 E · 启动冶炼流程', ()=>{
    smeltGlowMat.emissiveIntensity = 2.6;
    consoleScr.material.emissive.setHex(0x5ef2b8);
    smelter.material = matFactory.clone(); smelter.material.emissiveIntensity = 1.2;
    xdSay(['冶炼炉点火。1600 度——风化层正在分解、提纯、成型。','火星不伸手向地球要东西。它自己造。']);
    showToast('冶炼流程运行中 · 产出构件毛坯');
    completeTask(city, 'process');
  }, ()=>city.tasks.find(t=>t.id==='input').done);
  city.interact.at(-1).lockedText = '需要先在原料输入站投料（西边，跟着光柱）。';
  addInteract(city, 'output', 30, 2, 4.4, '能源输出平台', '按 E · 并网输出', ()=>{
    engineGlow.userData.base = 6;
    city.ticks.push((dt,t)=>{ const s = 5+Math.sin(t*9)*1.2; engineGlow.scale.set(s,s,1); });
    xdSay(['并网成功——这批能源，今晚会点亮 Aurelia 的主街。','石头、冰、阳光。这颗星球用自己的东西，养活了自己。']);
    showToast('能源并网输出 · 流程贯通');
    completeTask(city, 'output');
  }, ()=>city.tasks.find(t=>t.id==='process').done);
  city.interact.at(-1).lockedText = '需要先启动处理中心的冶炼流程。';
  sTask(city, 'input', '启动原料输入', -46, -20);
  sTask(city, 'process', '启动资源处理', 8, -12);
  sTask(city, 'output', '完成能源输出', 30, 2);
}

/* ---------- 进入 / 离开地表城市 ---------- */
const SURFACE_BUILDERS = { capital:buildAurelia, eco:buildVerde, industrial:buildHephaestus };
function enterSurface(id){
  if(mode === 'surface' || !SURFACE_BUILDERS[id]) return;
  stopTour(); camAnim = null; landing = false;
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
  mode = 'surface'; currentCity = null;
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
    'W A S D / 点击地面 移动 · 鼠标移动 环视 · Shift 加速 · 空格 跳跃 · E 交互/交谈 · V 视角 · Tab 城市档案';
  syncVisor();
  xdReset();
  if(xd.char) xd.char.visible = false;   // 玩家就是星达，同伴模型不出场（独白保留）
  refreshSurfaceObjective();
  showToast('已着陆 · ' + SURFACE_INFO[id].name);
  xdSay(city.intro);
}
function exitSurface(){
  if(mode !== 'surface') return;
  mode = 'planet';
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
  if(mode !== 'surface') return;
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
/* 地表第三人称自由环视：鼠标在画布上移动即绕星达旋转（无需拖拽/指针锁定）。
   平滑由 PlayerController.updateCamera 的朝向阻尼完成（_camYaw/_camPitch），
   跟随与建筑碰撞收缩也在 updateCamera 内——这里只写目标 yaw/pitch。 */
let sLookLast = null;
renderer.domElement.addEventListener('pointermove', e=>{
  if(mode!=='surface' || !surface.player){ sLookLast = null; return; }
  const dx = e.movementX ?? (sLookLast ? e.clientX - sLookLast[0] : 0);
  const dy = e.movementY ?? (sLookLast ? e.clientY - sLookLast[1] : 0);
  sLookLast = [e.clientX, e.clientY];
  surface.player.yaw += dx * 0.0042;
  surface.player.pitch = clamp(surface.player.pitch - dy * 0.0038, -0.5, 1.2);
});
renderer.domElement.addEventListener('pointerleave', ()=>{ sLookLast = null; });
window.addEventListener('wheel', e=>{
  if(mode!=='surface') return;
  const dir = Math.sign(e.deltaY);
  if(dir > 0 && !surface.player.third){ surface.player.third = true; surface.avatar.setVisible(true); syncVisor(); return; }
  surface.player.dist = clamp(surface.player.dist + dir*0.6, 2.4, 10);
  if(dir < 0 && surface.player.third && surface.player.dist <= 2.5){
    surface.player.third = false; surface.avatar.setVisible(false); surface.player.dist = 5.4; syncVisor();
  }
}, { passive:true });

/* ================= 主循环 ================= */
const clock = new THREE.Clock();
function animate(){
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;

  if(camAnim){
    camAnim.t += dt/camAnim.dur;
    const k = easeIO(Math.min(camAnim.t, 1));
    camera.position.lerpVectors(camAnim.fromP, camAnim.toP, k);
    controls.target.lerpVectors(camAnim.fromT, camAnim.toT, k);
    if(camAnim.t >= 1){ const cb = camAnim.cb; camAnim = null; controls.enabled = true; if(cb) cb(); }
  }
  controls.update();


  // 透视过渡
  xrayCur += (xrayTarget - xrayCur)*Math.min(1, dt*3.5);
  if(Math.abs(xrayTarget - xrayCur) < 0.002) xrayCur = xrayTarget;
  iceGroup.visible = xrayCur > 0.02;
  surfMat.opacity = 1 - 0.8*xrayCur;
  capMat.opacity = 1 - 0.85*xrayCur;
  cloudMat.opacity = 0.55*(1 - xrayCur);
  glacierMat.opacity = 0.62*xrayCur;
  floeMat.opacity = 0.5*xrayCur;
  if(xrayCur === 0 && surfMat.transparent){ surfMat.transparent = false; surfMat.opacity = 1; surfMat.needsUpdate = true; }
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

  if(mode==='explore') updateExplore(dt, t);
  else if(mode==='surface') updateSurface(dt, t);

  composer.render();
}
animate();

/* 调试/测试钩子 */
window.__mars = { enterSurface, exitSurface, surface, snpcBubble, camera, raycaster, get mode(){ return mode; }, get explore(){ return explore; }, get xingda(){ return GlobalCompanion.avatar; } };
window.__errs = [];
window.addEventListener('error', e=>__errs.push(String(e.message)));

addEventListener('resize', ()=>{
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
});

} catch(err){
  const el = document.getElementById('err');
  el.style.display = 'flex';
  el.textContent = '场景初始化失败：' + err.message;
  console.error(err);
}
