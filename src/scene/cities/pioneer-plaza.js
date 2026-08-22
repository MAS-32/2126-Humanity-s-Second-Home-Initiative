/* 开拓者广场
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L1189-1370，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { ASSETS } from '../../core/assets.js';
import { rand } from '../../core/random.js';
import { tagBuilding } from '../buildings.js';
import { addDrone, animated, cityGroups } from '../city-system.js';
import { addGlow, makeLabel, matCore, matDark, matMetal, texBrushed, texGrain } from '../materials.js';

/* ---- 1.5 开拓者广场：巨大马斯克纪念雕像 ----
   叙事分工：纪念碑（保留）= 2126 未来科技；青铜雕像 = 早期开拓的历史记忆。
   广场选址在首都内环磁悬浮线上（r=4.2），是天然的城市交通节点。 */
let statueWorld = null;
{
  const capG = cityGroups.capital;
  const matBronze  = new THREE.MeshStandardMaterial({ color:0x7a6248, roughness:1, metalness:0.92, roughnessMap:texBrushed, bumpMap:texGrain, bumpScale:0.012, emissive:0x2a1f12, emissiveIntensity:0.25, envMapIntensity:1.2 });
  const matBronzeD = new THREE.MeshStandardMaterial({ color:0x54432f, roughness:1, metalness:0.9, roughnessMap:texGrain, envMapIntensity:1.0 });
  const matStone   = new THREE.MeshStandardMaterial({ color:0x9a9186, roughness:1, metalness:0.05, roughnessMap:texGrain, bumpMap:texGrain, bumpScale:0.03, envMapIntensity:0.5 });
  const matStoneD  = new THREE.MeshStandardMaterial({ color:0x565049, roughness:1, roughnessMap:texGrain, bumpMap:texGrain, bumpScale:0.03, envMapIntensity:0.4 });
  const matAmber   = new THREE.MeshStandardMaterial({ color:0x332a1a, emissive:0xffc98a, emissiveIntensity:1.6 });

  const a0 = Math.PI/4, mcx = Math.cos(a0)*4.2, mcz = Math.sin(a0)*4.2;   // 内环磁悬浮穿过的节点
  const mem = new THREE.Group();
  mem.position.set(mcx, 0, mcz);
  mem.rotation.y = Math.PI/2 - a0;                                        // 雕像面向城外来客

  // —— 纪念广场：石材圆场 + 暖光环带
  const spGround = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.15, 0.12, 32), matStone);
  spGround.position.y = 0.06; mem.add(spGround);
  const spRing = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.045, 6, 64).rotateX(Math.PI/2),
    new THREE.MeshStandardMaterial({ color:0x111820, emissive:0xffc98a, emissiveIntensity:0.9 }));
  spRing.position.y = 0.13; mem.add(spRing);

  // —— 基座：三层台阶 + 高台 + 铭文铜牌
  const statue = new THREE.Group();
  const step1 = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.6, 0.16, 12), matStone); step1.position.y=0.2; statue.add(step1);
  const step2 = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.25, 0.16, 12), matStone); step2.position.y=0.36; statue.add(step2);
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.76, 1.1, 12), matStoneD); plinth.position.y=0.99; statue.add(plinth);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.6, 0.12, 12), matStone); cap.position.y=1.6; statue.add(cap);
  // —— 基座正面：青铜浮雕肖像章（纪念币式工艺，一眼可识别的面容）——
  const medal = new THREE.Group();
  const medalBase = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.05, 32).rotateX(Math.PI/2), matBronzeD);
  medal.add(medalBase);
  const medalRing = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.025, 8, 40), matBronze);
  medal.add(medalRing);
  const medalFace = new THREE.Mesh(new THREE.CircleGeometry(0.31, 32),
    new THREE.MeshStandardMaterial({ color:0xffffff, metalness:0.85, roughness:0.45, envMapIntensity:1.1 }));
  medalFace.position.z = 0.028; medal.add(medalFace);
  medal.position.set(0, 1.02, 0.72); medal.rotation.x = -0.1;
  statue.add(medal);

  // —— 青铜人物：西装演讲姿态（单手抬起，张开手掌）
  const fig = new THREE.Group();
  for(const s of [-1,1]){
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.75, 4, 8), matBronzeD);
    leg.position.set(s*0.17, 0.55, 0); fig.add(leg); }
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.46, 1.15, 12), matBronze); torso.position.y=1.55; fig.add(torso);
  const chest = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8), matBronze);
  chest.position.y=2.08; chest.scale.set(1.15, 0.7, 0.85); fig.add(chest);
  const armL = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.7, 4, 8), matBronze);
  armL.position.set(-0.42, 1.6, 0.02); armL.rotation.z = 0.18; fig.add(armL);
  const upperR = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.42, 4, 8), matBronze);
  upperR.position.set(0.5, 1.88, 0.06); upperR.rotation.z = -1.1; fig.add(upperR);
  const foreR = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.4, 4, 8), matBronze);
  foreR.position.set(0.86, 2.06, 0.1); foreR.rotation.z = -0.15; fig.add(foreR);
  const handR = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), matBronze);
  handR.position.set(0.92, 2.34, 0.12); handR.scale.set(0.8, 1.15, 0.35); fig.add(handR);
  // —— 头部：可识别的马斯克肖像（宽额头 · 眉弓眼窝 · 直鼻 · 方下颌 · 后梳短发）——
  const headG = new THREE.Group(); headG.position.y = 2.52;
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.21, 20, 16), matBronze);
  skull.scale.set(0.94, 1.06, 0.98); headG.add(skull);
  const jaw = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.155, 0.14, 12), matBronze);   // 方下颌
  jaw.position.set(0, -0.14, 0.03); jaw.scale.z = 0.9; headG.add(jaw);
  const chin = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), matBronze);              // 下巴
  chin.position.set(0, -0.19, 0.15); chin.scale.set(1, 0.7, 0.8); headG.add(chin);
  const brow = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.035, 0.06), matBronzeD);           // 眉弓
  brow.position.set(0, 0.045, 0.185); headG.add(brow);
  for(const s of [-1,1]){
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.032, 10, 8), matBronzeD);           // 眼窝凹陷
    eye.position.set(s*0.075, 0.005, 0.175); eye.scale.set(1, 0.7, 0.5); headG.add(eye);
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), matBronze);              // 耳
    ear.position.set(s*0.2, -0.02, 0); ear.scale.set(0.45, 0.9, 0.7); headG.add(ear);
  }
  const noseB = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.11, 0.05), matBronze);          // 直鼻梁
  noseB.position.set(0, -0.03, 0.2); noseB.rotation.x = 0.12; headG.add(noseB);
  const noseT = new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 8), matBronze);             // 鼻头
  noseT.position.set(0, -0.095, 0.21); headG.add(noseT);
  const lips = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.02, 0.03), matBronzeD);           // 唇线
  lips.position.set(0, -0.145, 0.185); headG.add(lips);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.14, 10), matBronzeD);  // 颈
  neck.position.y = -0.24; headG.add(neck);
  // 标志性后梳短发：顶部饱满后掠露出宽额头 + 后层收窄贴合
  const hairTop = new THREE.Mesh(new THREE.SphereGeometry(0.215, 18, 12, 0, Math.PI*2, 0, 1.05), matBronzeD);
  hairTop.position.set(0, 0.05, -0.02); hairTop.scale.set(0.98, 1, 1.06); hairTop.rotation.x = -0.2; headG.add(hairTop);
  const hairBack = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 10, 0, Math.PI*2, 0, 1.9), matBronzeD);
  hairBack.position.set(0, 0.01, -0.045); hairBack.scale.set(0.94, 1.02, 1); headG.add(hairBack);
  fig.add(headG);
  fig.position.y = 1.66;   // 立于台面
  statue.add(fig);
  mem.add(tagBuilding(statue, 'statue'));
  capG.userData.buildings.push(statue);

  // —— 仰望射灯 ×6（夜间把青铜打出暖金轮廓）
  for(let i=0;i<6;i++){
    const a=i/6*Math.PI*2+0.26;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.045,0.5,6), matStoneD);
    post.position.set(Math.cos(a)*1.62, 0.37, Math.sin(a)*1.62); mem.add(post);
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.07,0.05,0.07), matAmber);
    lamp.position.set(Math.cos(a)*1.62, 0.64, Math.sin(a)*1.62);
    lamp.lookAt(mem.position.clone().setY(3)); mem.add(lamp); }

  // —— 历史纪念设施：拓荒纪年碑 ×3 + 马斯克全息档案影像
  const steleG = new THREE.Group();
  for(let i=0;i<3;i++){
    const st = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.75, 0.08), matStoneD);
    st.position.set((i-1)*0.85, 0.5, -1.35 + Math.abs(i-1)*0.18); st.rotation.y = -(i-1)*0.35; steleG.add(st);
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.05, 0.02), matAmber);
    strip.position.set((i-1)*0.85, 0.82, -1.3 + Math.abs(i-1)*0.18); strip.rotation.y = -(i-1)*0.35; steleG.add(strip); }
  mem.add(tagBuilding(steleG, 'stele'));
  capG.userData.buildings.push(steleG);
  const holoG = new THREE.Group();
  // 大幅立式全息肖像：2126 年的历史档案投影，远观即识
  const holoBase = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.38, 0.1, 16), matStoneD);
  holoBase.position.y = -0.85; holoG.add(holoBase);
  const holoFrame = new THREE.Mesh(new THREE.BoxGeometry(0.98, 1.24, 0.02),
    new THREE.MeshBasicMaterial({ color:0x0a2028, transparent:true, opacity:0.5 }));
  holoG.add(holoFrame);
  const holo = new THREE.Mesh(new THREE.PlaneGeometry(0.88, 1.14),
    new THREE.MeshBasicMaterial({ color:0xbfe4ff, transparent:true, opacity:0.92, side:THREE.DoubleSide }));
  holo.position.z = 0.015; holoG.add(holo);
  new THREE.TextureLoader().load(ASSETS.muskPortrait, t=>{
    t.colorSpace = THREE.SRGBColorSpace;
    holo.material.map = t; holo.material.needsUpdate = true;
    // 青铜浮雕化处理：去色 → 古铜色调 → 贴上肖像章
    const cv = document.createElement('canvas'); cv.width = cv.height = 256;
    const cx = cv.getContext('2d');
    cx.drawImage(t.image, 0, 0, 256, 256);
    const d = cx.getImageData(0, 0, 256, 256), p = d.data;
    for(let i = 0; i < p.length; i += 4){
      const l = p[i]*0.3 + p[i+1]*0.55 + p[i+2]*0.15;
      p[i] = 40 + l*0.62; p[i+1] = 28 + l*0.44; p[i+2] = 18 + l*0.3;
    }
    cx.putImageData(d, 0, 0);
    const bt = new THREE.CanvasTexture(cv);
    bt.colorSpace = THREE.SRGBColorSpace;
    medalFace.material.map = bt; medalFace.material.needsUpdate = true;
  });
  holoG.position.set(0, 1.95, -1.5);
  mem.add(tagBuilding(holoG, 'holo'));
  capG.userData.buildings.push(holoG);
  animated.glows.push(addGlow(mem, new THREE.Vector3(0, 1.95, -1.5), 0x9fd4ff, 1.1));

  // —— 交通节点：广场磁悬浮站（4 号站台雨棚）
  const station = new THREE.Group();
  const stBase = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, 0.5), matStone); stBase.position.y=0.1; station.add(stBase);
  for(const s of [-1,1]){
    const sp2 = new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,0.6,6), matMetal);
    sp2.position.set(s*0.45, 0.4, 0); station.add(sp2); }
  const stRoof = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 0.6), matDark); stRoof.position.y=0.72; station.add(stRoof);
  const stLight = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.02, 0.06), matAmber); stLight.position.y=0.69; station.add(stLight);
  station.position.set(0, 0, 1.75);
  mem.add(tagBuilding(station, 'pstation'));
  capG.userData.buildings.push(station);

  // —— 游客 / 居民 ×4（绕场参观）+ 清洁机器人 ×2（自动化设备）
  for(let i=0;i<4;i++){
    const person = new THREE.Group();
    const pBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.03, 0.07, 3, 6),
      new THREE.MeshStandardMaterial({ color:[0xc8b8a8,0x8fa4b0,0xb89888,0x9ab0a8][i], roughness:0.7 }));
    pBody.position.y = -0.22; person.add(pBody);
    mem.add(person);
    animated.walkers.push({ mesh:person, cx:0, cz:0.4, r:1.15+i*0.18, phase:rand()*6.28, speed:(0.18+rand()*0.15)*(i%2?1:-1) });
  }
  for(const rr of [1.65, 1.45]){
    const bot = new THREE.Group();
    const bBase = new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.06,0.05,8), matDark); bBase.position.y=-0.27; bot.add(bBase);
    const bEye = new THREE.Mesh(new THREE.SphereGeometry(0.015,6,6), matCore); bEye.position.set(0.04,-0.25,0); bot.add(bEye);
    mem.add(bot);
    animated.walkers.push({ mesh:bot, cx:0, cz:0.2, r:rr, phase:rand()*6.28, speed:0.5+rand()*0.2 });
  }
  addDrone(capG, 4.0, 1.8, 0.3, 0xffc98a);
  addDrone(capG, 4.5, 2.4, -0.26, 0xffc98a);

  capG.add(mem);
  const lb = makeLabel('开拓者广场 · Pioneer Plaza', 5);
  lb.position.set(mcx, 5.6, mcz); capG.add(lb);
  animated.glows.push(addGlow(capG, new THREE.Vector3(mcx, 3.4, mcz), 0xffc98a, 4.5));
  statueWorld = new THREE.Vector3();
  statue.getWorldPosition(statueWorld);
}

export { statueWorld };
