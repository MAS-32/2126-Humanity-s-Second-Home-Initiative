/* 城市6 奥林帕斯科研站
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L1663-1761，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { rand } from '../../core/random.js';
import { bEnergyTree, bStack, tagBuilding } from '../buildings.js';
import { addDrone, anchorCity, animated, pickables, put } from '../city-system.js';
import { addGlow, domeMat, makeDome, makeLabel, matCore, matDark, matMetal, matWhite } from '../materials.js';
import { addNPC } from '../surface-npc.js';
import { CITY_SITES } from '../terrain.js';

/* ---- 6. 奥林帕斯科研站 ---- */
{
  const g = anchorCity(CITY_SITES[5], 4.6, cg=>{
    // 基座平台
    const pad = new THREE.Mesh(new THREE.CircleGeometry(4.2, 40).rotateX(-Math.PI/2),
      new THREE.MeshStandardMaterial({ color:0x3a4148, roughness:0.7, metalness:0.4 }));
    pad.position.y = 0.02; cg.add(pad);
    // 巡天观测穹顶（半球玻璃罩 + 可俯仰望远镜）
    const obs = new THREE.Group();
    const od = makeDome(1.9, 0.22); obs.add(od);
    const mount = new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.22,0.9,10), matMetal);
    mount.position.y = 0.45; obs.add(mount);
    const scope = new THREE.Group();
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.2,1.6,12),
      new THREE.MeshStandardMaterial({ color:0xdfe6ec, roughness:0.3, metalness:0.6 }));
    tube.rotation.x = Math.PI/2 - 0.6; tube.position.y = 0.4; scope.add(tube);
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.17, 16), matCore);
    lens.position.set(0, 0.88, 0.62); lens.rotation.x = -0.6; scope.add(lens);
    scope.position.y = 0.9; obs.add(scope);
    obs.position.set(-1.2, 0, -0.8);
    cg.add(tagBuilding(obs, 'observatory')); cg.userData.buildings.push(obs);
    // 射电天线阵（三面碟形天线）
    [[2.2,-1.6,0.5],[3.1,-0.2,0.9],[2.4,1.4,1.3]].forEach(([x,z,ry])=>{
      const dish = new THREE.Group();
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.08,0.9,8), matMetal);
      mast.position.y = 0.45; dish.add(mast);
      const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.62, 20, 8, 0, Math.PI*2, 0, 0.62),
        new THREE.MeshStandardMaterial({ color:0xe6ecf2, roughness:0.35, metalness:0.5, side:THREE.DoubleSide }));
      bowl.position.y = 1.1; bowl.rotation.x = Math.PI + 0.7; dish.add(bowl);
      const feed = new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.012,0.5,6), matDark);
      feed.position.set(0, 1.25, 0.28); feed.rotation.x = 0.7; dish.add(feed);
      addGlow(dish, new THREE.Vector3(0, 1.28, 0.32), 0x9fe8ff, 0.5);
      dish.position.set(x, 0, z); dish.rotation.y = ry;
      cg.add(tagBuilding(dish, 'antenna')); cg.userData.buildings.push(dish);
    });
    // 综合实验舱 ×3（连接通道）
    const labPos = [[-2.6,1.2,0.3],[-1.4,2.2,-0.2],[-0.1,2.6,0.4]];
    labPos.forEach(([x,z,ry],i)=>{
      const lab = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 1.1, 4, 12).rotateZ(Math.PI/2), matWhite);
      lab.position.set(x, 0.42, z); lab.rotation.y = ry;
      cg.add(tagBuilding(lab, 'lab')); cg.userData.buildings.push(lab);
      if(i < labPos.length-1){
        const [nx,nz] = labPos[i+1];
        const len = Math.hypot(nx-x, nz-z);
        const link = new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.16,len,8), domeMat(0.3));
        link.position.set((x+nx)/2, 0.34, (z+nz)/2);
        link.rotation.z = Math.PI/2; link.rotation.y = -Math.atan2(nz-z, nx-x);
        cg.add(link);
      }
    });
    // 样本冷藏库（低温罐簇）
    const vault = new THREE.Group();
    for(let i=0;i<5;i++){
      const a = i/5*Math.PI*2;
      const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.14,0.14,0.55,10),
        new THREE.MeshStandardMaterial({ color:0xcfe4f0, roughness:0.25, metalness:0.7, emissive:0x2a7ab0, emissiveIntensity:0.5 }));
      tank.position.set(Math.cos(a)*0.3, 0.28, Math.sin(a)*0.3); vault.add(tank);
    }
    const vbase = new THREE.Mesh(new THREE.CylinderGeometry(0.55,0.6,0.14,16), matMetal);
    vbase.position.y = 0.07; vault.add(vbase);
    addGlow(vault, new THREE.Vector3(0, 0.62, 0), 0x6fc8ff, 0.9);
    vault.position.set(0.9, 0, -2.2);
    cg.add(tagBuilding(vault, 'sample')); cg.userData.buildings.push(vault);
    // 气象监测塔
    const wt = new THREE.Group();
    const wpole = new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.05,2.6,8), matMetal);
    wpole.position.y = 1.3; wt.add(wpole);
    const cross = new THREE.Mesh(new THREE.BoxGeometry(0.7,0.03,0.03), matDark);
    cross.position.y = 2.3; wt.add(cross);
    const wball = new THREE.Mesh(new THREE.SphereGeometry(0.09,10,8), matCore);
    wball.position.y = 2.66; wt.add(wball);
    addGlow(wt, new THREE.Vector3(0, 2.66, 0), 0x9fe8ff, 0.8);
    wt.position.set(-3.2, 0, -2.0);
    cg.add(tagBuilding(wt, 'weather')); cg.userData.buildings.push(wt);
    // 着陆坪
    const lp = new THREE.Group();
    const lpad = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.0, 0.1, 24), matDark);
    lpad.position.y = 0.05; lp.add(lpad);
    const lring = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.03, 6, 40).rotateX(Math.PI/2), matCore);
    lring.position.y = 0.11; lp.add(lring);
    lp.position.set(1.6, 0, 2.6);
    cg.add(tagBuilding(lp, 'landpad')); cg.userData.buildings.push(lp);
    // 居住小穹顶 + 能量树
    const hab = makeDome(1.1, 0.2); hab.position.set(-3.0, 0, 0.4); cg.add(hab);
    put(cg, bEnergyTree(1.2), 3.4, 2.2);
    put(cg, bStack(0.4, 0.9), -2.2, -2.8);
    for(let i=0;i<6;i++) addDrone(cg, 1.2+rand()*2.2, 1+rand()*1.6, 0.25+rand()*0.3, 0xa8d8ff);
    const label = makeLabel('奥林帕斯科研站', 9); label.position.set(0, 4.2, 0); cg.add(label);
    animated.glows.push(addGlow(cg, new THREE.Vector3(0, 2.2, 0), 0x9fd4ff, 7));
  });
  g.userData.infoKey = 'research';
  pickables.push(g);
  addNPC(g, 'researcher', -0.8, -1.4, 1.2, '林澈', '奥林帕斯科研站 · 站长',
    ['生态系统：站内气压 101.3 kPa，氧气由 Verde 生态城与本地水培舱共同维持。',
     '能源：白昼依赖太阳能薄膜，极夜与沙暴期间切换至微型裂变堆，储能可用 47 天。',
     '城市运行：六座主要定居点通过磁悬浮干线互联，物流由自动货运舱完成，人员通勤每日 42 班次。',
     '当前状态：所有穹顶气密性正常，水循环效率 99.2%，下一班地球补给船预计 3 个月后抵达。']);
}
