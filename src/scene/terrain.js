/* 火星地形
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L352-513，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { ASSETS } from '../core/assets.js';
import { clamp, fbm, rand, snoise, sstep } from '../core/random.js';
import { R, camera, renderer, scene } from '../core/renderer.js';

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
  texLoader.load(ASSETS.marsColor, t=>{
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = THREE.RepeatWrapping; t.offset.x = 0.5;   // 对齐纹理与本星图经度
    t.anisotropy = maxAniso;
    surfMat.map = t; surfMat.vertexColors = false; surfMat.needsUpdate = true;
  });
  texLoader.load(ASSETS.marsBump, t=>{
    t.wrapS = THREE.RepeatWrapping; t.offset.x = 0.5;
    t.anisotropy = maxAniso;
    surfMat.bumpMap = t; surfMat.bumpScale = 1.1; surfMat.needsUpdate = true;
  });
}

export { dirFromLatLon, CITY_SITES, terrainH, marsGroup, surfMat, marsSurface, capViewPos };
