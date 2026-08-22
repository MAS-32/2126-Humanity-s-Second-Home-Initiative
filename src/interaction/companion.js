/* 星达引导层
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L2283-2936，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { S } from '../core/state.js';
import { GlobalCompanion } from '../character/companion-global.js';
import { clamp } from '../core/random.js';
import { R, camera, controls, renderer, scene } from '../core/renderer.js';
import { EXPLORE_NAMES, _eBM, _eE, _eF, _eN, aimD, aimT, explore, exploreAim, exploreHud, exploreLoc, exploreTargets, headlamp, keys, npcAvatar, npcDialog, npcLineEl, npcNameEl, npcRoleEl, targetWorld } from './explore-state.js';
import { showToast } from './ice-view.js';
import { backBtn, flyTo, hintEl } from './modes.js';
import { raycaster } from './picking.js';
import { stopTour } from './tour.js';
import { BINFO } from '../scene/buildings.js';
import { YARD } from '../scene/cities/meridian-yard.js';
import { statueWorld } from '../scene/cities/pioneer-plaza.js';
import { cityGroups, npcList } from '../scene/city-system.js';
import { addGlow } from '../scene/materials.js';
import { CITY_SITES, terrainH } from '../scene/terrain.js';
import { surface, xdDialogueTick } from '../surface/common.js';
import { exitSurface } from '../surface/enter-exit.js';
import { infoPanel } from '../ui/info-panel.js';

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
/* xdIdleT → S.xdIdleT（无操作计时） */
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
    beacon.visible = S.mode === 'explore';
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
  stopTour(); S.camAnim = null;
  const cdir = cityG ? cityG.position.clone().normalize() : camera.position.clone().normalize();
  tangentBasis(cdir);
  explore.dir.copy(cdir).addScaledVector(_eE, 0.16).addScaledVector(_eN, -0.13).normalize();
  _eT.copy(cdir).addScaledVector(explore.dir, -cdir.dot(explore.dir)).normalize();  // 指向城心
  tangentBasis(explore.dir);
  explore.yaw = Math.atan2(_eT.dot(_eE), _eT.dot(_eN));
  explore.pitch = 0.06;
  explore.clickDir = null;                 // 进入时清空点击移动目标
  S.mode = 'explore'; S.currentCity = null;
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
  S.exploreAvatar = GlobalCompanion.mount(scene, 0.21);   // Global Companion：同一只星达（球面探索尺度 ≈0.2m）
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
  if(S.mode!=='explore') return;
  S.mode = 'planet';
  exploreHud.classList.remove('on');
  exploreAim.classList.remove('on');
  npcDialog.classList.remove('on');
  S.activeNPC = null;
  visorEl.classList.remove('on');
  scene.fog = null;                 // 离开地表，恢复深空通透
  gDust.visible = false;
  S.jumpY = 0; S.jumpV = 0;
  camera.fov = 48; camera.updateProjectionMatrix();
  if(S.exploreAvatar) S.exploreAvatar.detach();
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
document.getElementById('btnSurface').onclick = ()=>{ if(S.mode==='surface') exitSurface(); else exitExplore(); };
// 登陆流程：轨道俯冲 → 减速接近地表 → 进入探索模式
/* landing → S.landing */
function landAt(cityG){
  if(S.landing || !cityG) return;
  S.landing = true;
  stopTour();
  showToast('进入大气层 · 减速着陆中…');
  const cdir = cityG.position.clone().normalize();
  tangentBasis(cdir);
  const landDir = cdir.clone().addScaledVector(_eE, 0.16).addScaledVector(_eN, -0.13).normalize();
  const approach = landDir.clone().multiplyScalar(R + terrainH(landDir) + 5.5).addScaledVector(_eN, 3.5);
  const tg = cdir.clone().multiplyScalar(R + terrainH(cdir) + 1.5);
  flyTo(approach, tg, 3.0, ()=>{
    S.landing = false;
    enterExplore(cityG);
  });
}
document.getElementById('btnLand').onclick = ()=>{
  if(S.mode==='explore' || S.landing) return;
  if(S.mode==='city' && S.currentCity){ landAt(S.currentCity); return; }
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
    S.walkPhase += dt * (keys['shift'] ? 14 : 9);
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
      S.walkPhase += dt * 9;
      moving = true;
    }
  }
  // 低重力跳跃（空格）
  if(S.jumpV !== 0 || S.jumpY > 0){
    S.jumpY += S.jumpV*dt;
    S.jumpV -= 1.35*dt;                 // 火星重力手感：起跳慢、落地缓
    if(S.jumpY <= 0){ S.jumpY = 0; S.jumpV = 0; }
  }
  const ground = R + terrainH(up);
  _eT.copy(_eF).multiplyScalar(Math.cos(explore.pitch)).addScaledVector(up, Math.sin(explore.pitch)); // 视线
  camera.up.copy(up);
  if(explore.third){
    if(S.exploreAvatar){
      S.exploreAvatar.setVisible(true);
      _eX.copy(up).multiplyScalar(ground + S.jumpY);
      S.exploreAvatar.setPosition(_eX);
      _eM.crossVectors(up, _eF);
      _eBM.makeBasis(_eM, up, _eF);                            // 星达面朝前方
      _q1.setFromRotationMatrix(_eBM);
      S.exploreAvatar.setQuaternion(_q1);
      S.exploreAvatar.setState(S.jumpY > 0 ? 'jump' : moving ? (keys['shift'] ? 'run' : 'walk') : 'idle');
      S.exploreAvatar.update(dt);
    }
    camera.position.copy(_eX).addScaledVector(_eF, -explore.dist).addScaledVector(up, explore.dist*0.5);
    _eM.copy(camera.position).normalize();                   // 防止相机钻入地形
    const minR = R + terrainH(_eM) + 0.1;
    if(camera.position.length() < minR) camera.position.copy(_eM.multiplyScalar(minR));
    _eM.copy(_eX).addScaledVector(up, 0.15).addScaledVector(_eF, 0.8);
    camera.lookAt(_eM);
  } else {
    if(S.exploreAvatar) S.exploreAvatar.setVisible(false);
    // 第一人称：视高 + 步伐起伏 + 跳跃
    const bob = moving ? Math.abs(Math.sin(S.walkPhase))*0.012 : 0;
    camera.position.copy(up).multiplyScalar(ground + 0.16 + S.jumpY + bob);
    _eM.copy(camera.position).add(_eT);
    camera.lookAt(_eM);
    if(moving) camera.rotateZ(Math.sin(S.walkPhase)*0.008);    // 行走微侧倾
  }
  // 冲刺视野外扩
  const targetFov = (keys['shift'] && moving) ? 55 : 48;
  if(Math.abs(camera.fov - targetFov) > 0.05){
    camera.fov += (targetFov - camera.fov)*Math.min(1, dt*6);
    camera.updateProjectionMatrix();
  }
  // —— 星达同伴：跟随 + 程序化动画（呼吸/眨眼/视线/触角/尾巴/表情动作）
  if(xd.char && xd.char.visible){
    _eX.copy(up).multiplyScalar(ground + S.jumpY);
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
    S.xdIdleT += dt;
    if(S.xdIdleT > 16 && !xdEmote.name){
      S.xdIdleT = 0;
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
  S.aimTimer -= dt;
  if(S.aimTimer <= 0){
    S.aimTimer = 0.18;
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
    if(S.activeNPC !== nearNPC){
      S.activeNPC = nearNPC;
      S.npcLineIdx = 0;
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
        S.npcLineIdx = (S.npcLineIdx + 1) % nearNPC.lines.length;
        npcLineEl.textContent = nearNPC.lines[S.npcLineIdx];
      }
    }
  } else if(S.activeNPC){
    S.activeNPC._timer = 0;
    S.activeNPC = null;
    npcDialog.classList.remove('on');
  }
  // 所在区域 & 发现判定：走入城市半径范围即「发现」
  S.locTimer -= dt;
  if(S.locTimer <= 0){
    S.locTimer = 0.5;
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
  (S.mode==='explore' && !explore.third) || (S.mode==='surface' && surface.player && !surface.player.third)); }
window.addEventListener('keydown', e=>{
  S.xdIdleT = 0;   // 有操作 → 星达保持陪伴状态
  const k = mapKey(e.key);
  keys[k] = true;
  if(S.mode==='explore' && k==='v' && !e.repeat){ explore.third = !explore.third; syncVisor(); }
  if(S.mode==='explore' && k===' ' && S.jumpY===0 && S.jumpV===0 && !e.repeat){ S.jumpV = 0.55; e.preventDefault(); }
  if(S.mode==='explore' && k==='f' && !e.repeat){
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
renderer.domElement.addEventListener('pointerdown', e=>{ if(S.mode==='explore') expDrag = [e.clientX, e.clientY]; });
window.addEventListener('pointermove', e=>{
  if(S.mode!=='explore' || !expDrag) return;
  explore.yaw += (e.clientX - expDrag[0]) * 0.004;
  explore.pitch = clamp(explore.pitch - (e.clientY - expDrag[1]) * 0.004, -1.15, 1.15);
  expDrag = [e.clientX, e.clientY];
});
window.addEventListener('pointerup', ()=>{ expDrag = null; });
// 滚轮：第三人称推拉距离；第一人称滚出→第三人称，滚入→回到第一人称
window.addEventListener('wheel', e=>{
  if(S.mode!=='explore') return;
  const dir = Math.sign(e.deltaY);
  if(dir > 0 && !explore.third){ explore.third = true; syncVisor(); return; }
  explore.dist = clamp(explore.dist + dir*0.14, 0.45, 2.4);
  if(dir < 0 && explore.third && explore.dist <= 0.5){ explore.third = false; explore.dist = 0.9; syncVisor(); }
}, { passive:true });

export { xdDialog, xdLineEl, objT, objC, discBanner, discName, xd, xdGaze, xdBlink, XD_CLICK, xdEmotePlay, xdEyeTexture, xdSay, xdReset, beacon, updateExplore, mapKey, visorEl, syncVisor };
