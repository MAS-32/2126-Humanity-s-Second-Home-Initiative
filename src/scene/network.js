/* 文明网络/前哨/磁悬浮干线
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L1940-2008，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { rand } from '../core/random.js';
import { R } from '../core/renderer.js';
import { animated } from './city-system.js';
import { addGlow, domeMat, matWarm } from './materials.js';
import { CITY_SITES, dirFromLatLon, marsGroup, terrainH } from './terrain.js';

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
