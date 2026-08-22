/* 地表城市通用件
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L3484-3645，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { scene, sun } from '../core/renderer.js';
import { beacon, discBanner, discName, objC, objT, xd, xdDialog, xdLineEl } from '../interaction/companion.js';
import { addGlow, makeLabel, matDark, matLeaf2, texGrain } from '../scene/materials.js';

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

export { SURFACE_INFO, surfaceCache, surface, makeSurfaceScene, sGround, sBox, sCyl, sRoad, sStrip, sLamp, sTree, sSign, addSurfaceNPC, addSurfaceWalker, addInteract, sBeacon, newCity, sTask, completeTask, refreshSurfaceObjective, xdDialogueTick };
