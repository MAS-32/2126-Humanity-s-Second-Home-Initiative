/* 城市系统基座
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L957-994，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { rand } from '../core/random.js';
import { R } from '../core/renderer.js';
import { addGlow, matWhite } from './materials.js';
import { marsGroup, terrainH } from './terrain.js';

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

export { pickables, animated, npcList, surfPointOf, cityGroups, anchorCity, put, instanced, addDrone };
