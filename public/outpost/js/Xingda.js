// ============================================================
// Xingda — 星达角色系统（CHARACTER SYSTEM）
//  XingdaAvatar        程序化精细星达模型（唯一视觉母版 = 三视图）
//  XingdaAnimator      情绪/动作状态机（耳/尾/触角/项圈/姿态表达）
//  XingdaController    位置·朝向·可见性·GLB 替换接口
// 设计原则：模型资源以后可直接换 GLB，移动/相机/动画/反馈不重写。
// ============================================================
import * as THREE from 'three';

// —— 视觉母版色板（取自三视图 COLOR PALETTE） ——
const C = {
  fur: 0x5fe6d8,       // 蓝绿毛发（主色，略柔化 #66F0E1）
  furDark: 0x3fc2b6,   // 毛发阴影
  cream: 0xfff6d6,     // 奶白脸/腹/耳内侧/尾球 #FFF6D6
  spot: 0xa7ff9b,      // 浅绿斑点 #A7FF9B
  iris: 0x39c6ff,      // 虹膜蓝 #39C6FF
  eye: 0x11262b,       // 眼珠近黑
  pink: 0xffb6d6,      // 鼻/嘴 #FFB6D6
  collar: 0x2c3e46,    // 项圈深灰蓝
  star: 0x7ff0e0,      // 项圈星形装置（青）
  planet: 0xd8ffd0,    // 触角能量星球（黄绿芯）
};

const M = {
  fur: new THREE.MeshStandardMaterial({ color: C.fur, roughness: 0.92, metalness: 0.0 }),
  furDark: new THREE.MeshStandardMaterial({ color: C.furDark, roughness: 0.95, metalness: 0.0 }),
  cream: new THREE.MeshStandardMaterial({ color: C.cream, roughness: 0.9, metalness: 0.0 }),
  spot: new THREE.MeshStandardMaterial({ color: C.spot, roughness: 0.85, emissive: 0x2a4d22, emissiveIntensity: 0.25 }),
  eye: new THREE.MeshStandardMaterial({ color: C.eye, roughness: 0.25, metalness: 0.1 }),
  iris: new THREE.MeshStandardMaterial({ color: C.iris, roughness: 0.2, emissive: 0x0a3a55, emissiveIntensity: 0.6 }),
  hl: new THREE.MeshBasicMaterial({ color: 0xffffff }),
  pink: new THREE.MeshStandardMaterial({ color: C.pink, roughness: 0.7, emissive: 0x3a1420, emissiveIntensity: 0.3 }),
  collar: new THREE.MeshStandardMaterial({ color: C.collar, roughness: 0.5, metalness: 0.6 }),
  star: new THREE.MeshStandardMaterial({ color: 0x0a2a28, emissive: C.star, emissiveIntensity: 1.4, roughness: 0.4 }),
  planet: new THREE.MeshStandardMaterial({ color: 0x2a4d20, emissive: C.planet, emissiveIntensity: 1.1, roughness: 0.3, transparent: true, opacity: 0.95 }),
};

const sph = (r, mat, w = 20, h = 16) => new THREE.Mesh(new THREE.SphereGeometry(r, w, h), mat);
const cyl = (rt, rb, h, mat, seg = 14) => new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);

// ============================================================
// XingdaAvatar — 程序化精细建模（面朝 +z，脚底 y=0，Q 版大头比例）
// 返回 { group, parts }，parts 供动画驱动
// ============================================================
export function buildXingdaAvatar() {
  const g = new THREE.Group();
  const P = {};   // 可动画部件

  // ---------- 腿 + 脚（两条小短腿） ----------
  for (const sx of [-1, 1]) {
    const leg = sph(0.13, M.fur, 14, 12); leg.scale.set(1, 1.25, 1); leg.position.set(sx * 0.13, 0.17, 0); g.add(leg);
    const foot = sph(0.14, M.cream, 14, 12); foot.scale.set(1.05, 0.6, 1.35); foot.position.set(sx * 0.13, 0.06, 0.05); g.add(foot);
  }

  // ---------- 身体（蓝绿椭圆） ----------
  const body = sph(0.34, M.fur, 28, 22); body.scale.set(1, 1.12, 0.9); body.position.y = 0.62; g.add(body);
  P.body = body;
  // 奶白腹部
  const belly = sph(0.26, M.cream, 24, 18); belly.scale.set(0.82, 0.98, 0.6); belly.position.set(0, 0.58, 0.16); g.add(belly);
  // 背部绿斑点（第三人称主要看背面 → 必须好看）
  const spotDefs = [
    [0, 0.78, -0.30, 0.05], [-0.16, 0.62, -0.30, 0.042], [0.17, 0.58, -0.30, 0.046],
    [-0.07, 0.44, -0.31, 0.038], [0.09, 0.72, -0.31, 0.036],
  ];
  for (const [x, y, z, r] of spotDefs) { const s = sph(r, M.spot, 10, 8); s.position.set(x, y, z); g.add(s); }

  // ---------- 手臂（短，末端奶白小手） ----------
  for (const sx of [-1, 1]) {
    const arm = new THREE.Group();
    const upper = sph(0.10, M.fur, 14, 12); upper.scale.set(1, 1.5, 1); upper.position.y = -0.12; arm.add(upper);
    const hand = sph(0.09, M.cream, 12, 10); hand.position.y = -0.28; arm.add(hand);
    const spot = sph(0.035, M.spot, 8, 6); spot.position.set(0, -0.05, sx > 0 ? 0.08 : -0.08 * 0); arm.add(spot);
    arm.position.set(sx * 0.33, 0.74, 0.04);
    arm.rotation.z = sx * -0.35;
    g.add(arm);
    if (sx < 0) P.armL = arm; else P.armR = arm;
  }

  // ---------- 尾巴（蓬松 + 奶白绒球） ----------
  const tail = new THREE.Group();
  const tailBase = sph(0.11, M.fur, 14, 12); tailBase.scale.set(1, 1, 1.5); tail.add(tailBase);
  const tailTip = sph(0.13, M.cream, 16, 12); tailTip.position.set(0, 0.06, -0.20); tail.add(tailTip);
  tail.position.set(0, 0.52, -0.32);
  g.add(tail);
  P.tail = tail; P.tailTip = tailTip;

  // ---------- 头（大球） ----------
  const head = new THREE.Group();
  head.position.y = 1.18;
  const skull = sph(0.43, M.fur, 32, 26); skull.scale.set(1, 0.98, 0.94); head.add(skull);
  // 奶白脸部（前脸大区域，包裹眼/鼻/嘴）
  const face = sph(0.36, M.cream, 28, 22); face.scale.set(0.88, 0.82, 0.62); face.position.set(0, -0.04, 0.20); head.add(face);
  // 头顶呆毛（几撮浅蓝绿绒毛）
  for (let i = 0; i < 3; i++) {
    const tuft = sph(0.06 - i * 0.012, M.furDark, 10, 8);
    tuft.scale.set(0.7, 1.6, 0.7);
    tuft.position.set((i - 1) * 0.07, 0.44 + i * 0.01, 0.02);
    tuft.rotation.z = (i - 1) * 0.3;
    head.add(tuft);
  }
  // 大眼睛（黑亮眼珠 + 青虹膜 + 双高光）
  for (const sx of [-1, 1]) {
    const eye = new THREE.Group();
    const ball = sph(0.10, M.eye, 18, 14); ball.scale.set(0.9, 1.15, 0.6); eye.add(ball);
    const iris = sph(0.055, M.iris, 14, 12); iris.position.set(0, 0.01, 0.045); eye.add(iris);
    const hl1 = sph(0.026, M.hl, 8, 6); hl1.position.set(0.028, 0.045, 0.075); eye.add(hl1);
    const hl2 = sph(0.013, M.hl, 6, 5); hl2.position.set(-0.02, -0.02, 0.078); eye.add(hl2);
    eye.position.set(sx * 0.165, 0.05, 0.40);
    head.add(eye);
    if (sx < 0) P.eyeL = eye; else P.eyeR = eye;
  }
  // 小鼻子 + 微笑嘴
  const nose = sph(0.028, M.pink, 10, 8); nose.position.set(0, -0.05, 0.46); head.add(nose);
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.012, 8, 16, Math.PI), M.pink);
  mouth.position.set(0, -0.12, 0.44); mouth.rotation.x = Math.PI; head.add(mouth);

  // 大耳朵（下垂软耳，蓝绿外侧 + 奶白内侧，可摆动）
  for (const sx of [-1, 1]) {
    const ear = new THREE.Group();
    const outer = sph(0.16, M.fur, 18, 14); outer.scale.set(0.55, 1.5, 0.8); outer.position.y = -0.18; ear.add(outer);
    const inner = sph(0.11, M.cream, 14, 12); inner.scale.set(0.4, 1.25, 0.55); inner.position.set(0, -0.18, 0.06); ear.add(inner);
    ear.position.set(sx * 0.30, 0.34, -0.02);
    ear.rotation.z = sx * 0.55;   // 自然下垂外展
    head.add(ear);
    if (sx < 0) P.earL = ear; else P.earR = ear;
  }

  // 双触角（细杆 + 顶端发光能量星球，可摆动）
  for (const sx of [-1, 1]) {
    const ant = new THREE.Group();
    const stalk = cyl(0.016, 0.022, 0.42, M.furDark, 8); stalk.position.y = 0.21; ant.add(stalk);
    const orb = sph(0.085, M.planet.clone(), 16, 12); orb.position.y = 0.46; ant.add(orb);
    const starCore = sph(0.032, M.hl, 8, 6); starCore.position.y = 0.46; ant.add(starCore);  // 星球内亮点
    ant.position.set(sx * 0.13, 0.40, 0);
    ant.rotation.z = sx * -0.18;
    head.add(ant);
    if (sx < 0) { P.antL = ant; P.antOrbL = orb; } else { P.antR = ant; P.antOrbR = orb; }
  }
  g.add(head);
  P.head = head;

  // ---------- 能量项圈（深灰环带 + 星形装置） ----------
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.05, 12, 28), M.collar);
  collar.rotation.x = Math.PI / 2; collar.position.y = 0.92; collar.scale.set(1, 1, 0.8); g.add(collar);
  const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.09, 0), M.star);
  star.position.set(0, 0.92, 0.26); g.add(star);
  P.collarStar = star;

  // 阴影
  g.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
  return { group: g, parts: P };
}

// ============================================================
// XingdaAnimator — 情绪/动作状态机
// 状态：IDLE WALK RUN CURIOUS THINKING HAPPY INTERACT CELEBRATE
// 情绪经 耳/尾/触角/触角星球/项圈/身体姿态/头部朝向 表达（背面可读）
// ============================================================
const lerp = (a, b, t) => a + (b - a) * t;
const damp = (a, b, l, dt) => lerp(a, b, 1 - Math.exp(-l * dt));

export class XingdaAnimator {
  constructor(parts) {
    this.P = parts;
    this.state = 'IDLE';
    this.t = 0;
    this.celebrateT = 0;    // 庆祝计时
    this.blinkT = 2 + Math.random() * 2;
    this.blink = 0;
    // 平滑姿态值
    this.cur = { earDroop: 0.55, antSway: 1, headTilt: 0, headYaw: 0, bounce: 0, tailWag: 0, orbGlow: 1 };
  }
  setState(s) {
    if (s === this.state) return;
    this.state = s;
    if (s === 'CELEBRATE') this.celebrateT = 0;
  }
  // 每帧驱动。opts: { moving, running, dt, t, lookYaw (头部目标朝向) }
  update(dt, t, opts = {}) {
    const P = this.P, c = this.cur;
    const moving = !!opts.moving, running = !!opts.running;
    // 自动状态：移动覆盖 IDLE
    let st = this.state;
    if (st === 'IDLE' || st === 'WALK' || st === 'RUN') st = moving ? (running ? 'RUN' : 'WALK') : 'IDLE';

    // 目标姿态
    let earDroop = 0.55, antSway = 1, headTilt = 0, bounce = 0, tailWag = 0.15, orbGlow = 1.0, headPitch = 0;
    if (st === 'IDLE') { earDroop = 0.55; antSway = 1; }
    else if (st === 'WALK') { earDroop = 0.5; bounce = 0.04; antSway = 1.4; tailWag = 0.4; }
    else if (st === 'RUN') { earDroop = 0.42; bounce = 0.08; antSway = 2.2; tailWag = 0.7; }
    else if (st === 'CURIOUS') { earDroop = 0.18; headTilt = 0.3; antSway = 2.6; orbGlow = 1.5; headPitch = -0.12; }
    else if (st === 'THINKING') { earDroop = 0.5; headTilt = 0.16; antSway = 0.5; orbGlow = 0.8; headPitch = 0.18; }
    else if (st === 'HAPPY') { earDroop = 0.3; bounce = 0.05; antSway = 2.0; tailWag = 1.2; orbGlow = 2.0; }
    else if (st === 'INTERACT') { earDroop = 0.3; antSway = 1.6; orbGlow = 1.6; }
    else if (st === 'CELEBRATE') { earDroop = 0.15; antSway = 3.0; tailWag = 1.6; orbGlow = 2.6; }

    // 平滑趋近
    c.earDroop = damp(c.earDroop, earDroop, 6, dt);
    c.antSway = damp(c.antSway, antSway, 6, dt);
    c.headTilt = damp(c.headTilt, headTilt, 6, dt);
    c.bounce = damp(c.bounce, bounce, 8, dt);
    c.tailWag = damp(c.tailWag, tailWag, 6, dt);
    c.orbGlow = damp(c.orbGlow, orbGlow, 5, dt);

    // 呼吸（所有状态）
    const breathe = 1 + Math.sin(t * 2.2) * 0.012;
    P.body.scale.set(1, 1.12 * breathe, 0.9);

    // 身体起伏（移动/庆祝）
    let bobY = 0;
    if (st === 'WALK' || st === 'RUN') bobY = Math.abs(Math.sin(t * (st === 'RUN' ? 11 : 7))) * c.bounce;
    if (st === 'CELEBRATE') { this.celebrateT += dt; bobY = Math.abs(Math.sin(this.celebrateT * 9)) * 0.12; }
    P.body.position.y = 0.62 + bobY;
    P.head.position.y = 1.18 + bobY * 1.1 + Math.sin(t * 2.2) * 0.006;

    // 耳朵：基准下垂 + 状态抬起 + 摆动
    const earSwing = Math.sin(t * 3.1) * 0.06 * c.antSway;
    P.earL.rotation.z = -c.earDroop + earSwing;
    P.earR.rotation.z = c.earDroop - earSwing;
    P.earL.rotation.x = Math.sin(t * 2.3) * 0.05 * c.antSway;
    P.earR.rotation.x = Math.sin(t * 2.3 + 1) * 0.05 * c.antSway;

    // 触角：持续轻摆，好奇/庆祝加剧
    const sw = Math.sin(t * 2.6) * 0.12 * c.antSway;
    P.antL.rotation.z = 0.18 + sw; P.antR.rotation.z = -0.18 - sw;
    P.antL.rotation.x = Math.cos(t * 2.1) * 0.1 * c.antSway;
    P.antR.rotation.x = Math.cos(t * 2.1 + 1.2) * 0.1 * c.antSway;
    // 触角星球亮度（情绪发光）
    const gl = c.orbGlow * (1 + Math.sin(t * 3) * 0.15);
    P.antOrbL.material.emissiveIntensity = gl; P.antOrbR.material.emissiveIntensity = gl;
    P.collarStar.material.emissiveIntensity = 0.9 + c.orbGlow * 0.5;
    P.collarStar.rotation.y = t * 1.2;

    // 尾巴：摆动
    P.tail.rotation.y = Math.sin(t * (st === 'HAPPY' || st === 'CELEBRATE' ? 9 : 4)) * 0.4 * c.tailWag;
    P.tail.rotation.x = Math.sin(t * 3) * 0.1;

    // 头部：倾斜 + 朝向（好奇/交互）
    P.head.rotation.z = c.headTilt + Math.sin(t * 1.8) * 0.02;
    P.head.rotation.x = headPitch;
    const targetYaw = opts.lookYaw !== undefined ? opts.lookYaw : 0;
    P.head.rotation.y = damp(P.head.rotation.y, targetYaw, 5, dt);

    // 眨眼（周期性闭合）
    this.blinkT -= dt;
    if (this.blinkT <= 0) { this.blink = 1; this.blinkT = 2.2 + Math.random() * 2.6; }
    this.blink = Math.max(0, this.blink - dt * 8);
    const eyeOpen = 1 - Math.min(1, this.blink) * 0.85;
    P.eyeL.scale.y = eyeOpen; P.eyeR.scale.y = eyeOpen;
  }
}

// ============================================================
// XingdaController — 位置/朝向/可见性/GLB 替换
// ============================================================
export class XingdaController {
  constructor(scene) {
    const { group, parts } = buildXingdaAvatar();
    this.group = group;
    this.parts = parts;
    this.animator = new XingdaAnimator(parts);
    this.heading = Math.PI;   // 初始面朝 -z（背对出生点第三人称相机）
    scene.add(group);
  }
  // 预留：以后用 GLB 替换程序化模型（动画/相机/控制不变）
  replaceWithGLTF(model) {
    this.group.clear();
    this.group.add(model);
  }
  setVisible(v) { this.group.visible = v; }
  setState(s) { this.animator.setState(s); }
  // playerPos: 玩家脚底世界位置；moveDir: 水平移动方向(可为0)；opts 透传动画
  update(dt, t, playerPos, moveDir, opts = {}) {
    // 位置：星达站在玩家脚底
    this.group.position.set(playerPos.x, playerPos.y, playerPos.z);
    // 朝向：朝移动方向（无移动保持），平滑转身
    if (moveDir && (moveDir.x * moveDir.x + moveDir.z * moveDir.z) > 1e-6) {
      const target = Math.atan2(moveDir.x, moveDir.z);
      let d = target - this.heading;
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      this.heading += d * Math.min(1, dt * 10);
    }
    this.group.rotation.y = this.heading;
    this.animator.update(dt, t, opts);
  }
}
