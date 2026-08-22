/* 地表探索状态
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L2243-2282，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { scene } from '../core/renderer.js';
import { cityGroups, npcList } from '../scene/city-system.js';

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
/* exploreAvatar → S.exploreAvatar */

const _eN=new THREE.Vector3(), _eE=new THREE.Vector3(), _eF=new THREE.Vector3(),
      _eR=new THREE.Vector3(), _eM=new THREE.Vector3(), _eT=new THREE.Vector3(),
      _eX=new THREE.Vector3(), _eP=new THREE.Vector3(), _eC=new THREE.Vector2(0,0);
const _eBM=new THREE.Matrix4();
/* aimTimer / locTimer / walkPhase → S.*（跨模块共享，见 core/state.js） */
/* jumpY / jumpV → S.*（低重力跳跃状态） */
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
/* activeNPC / npcLineIdx → S.*（当前对话 NPC 与行号） */

// 探索头灯（夜面补光，仅在探索模式开启）
const headlamp = new THREE.PointLight(0xcfe8ff, 0, 5, 1.8);
scene.add(headlamp);

export { exploreHud, exploreLoc, exploreAim, aimT, aimD, explore, keys, exploreTargets, EXPLORE_NAMES, _eN, _eE, _eF, _eBM, targetWorld, npcDialog, npcAvatar, npcNameEl, npcRoleEl, npcLineEl, headlamp };
