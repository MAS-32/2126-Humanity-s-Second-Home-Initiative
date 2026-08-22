/* 地表 NPC 点位
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L1016-1057，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { npcList } from './city-system.js';
import { addGlow } from './materials.js';

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

export { addNPC };
