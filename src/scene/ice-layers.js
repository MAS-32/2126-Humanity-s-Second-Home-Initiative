/* 地下冰川系统
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L589-726，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { fbm, rand } from '../core/random.js';
import { CITY_SITES, dirFromLatLon, marsGroup } from './terrain.js';

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

export { iceGroup, glacierMat, floeMat, robots };
