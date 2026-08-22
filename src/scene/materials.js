/* 贴图 & 材质
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L727-834，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';

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

export { addGlow, makeLabel, texBrushed, texGrain, matTowerGlass, matHabFacade, matMetal, matDark, matWhite, matWarm, matCore, matSolar, matEco, matLeaf2, matLake, matFactory, domeMat, makeDome };
