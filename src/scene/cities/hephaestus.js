/* 城市3 Hephaestus
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L1469-1607，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { rand } from '../../core/random.js';
import { tagBuilding } from '../buildings.js';
import { addDrone, anchorCity, animated, instanced, pickables } from '../city-system.js';
import { addGlow, makeLabel, matCore, matDark, matFactory, matMetal, matSolar } from '../materials.js';
import { CITY_SITES } from '../terrain.js';

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
