// ============================================================
// MoonNPCs — 月球城市人类 NPC 系统
//  人属于场景：发射区工程师 / 生态舱农艺师 / 科研区研究员 / 居民
//  程序化人形 + 待机动作 + 朝向；两阶段对话的数据载体。
//  视觉以后可换 GLB，站位/对话/联动逻辑不变。
// ============================================================
import * as THREE from 'three';
import { NPCS } from './MoonConfig.js';

const sph = (r, mat, w = 18, h = 14) => new THREE.Mesh(new THREE.SphereGeometry(r, w, h), mat);
const cyl = (rt, rb, h, mat, seg = 14) => new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
const box = (w, h, d, mat) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);

// 世界锚定的浮动名牌 / 气泡（canvas sprite）
function makeTextSprite(text, { fs = 34, fg = 'rgba(225,242,255,0.95)', bg = 'rgba(10,18,32,0.55)', scale = 0.02 } = {}) {
  const c = document.createElement('canvas');
  const mctx = c.getContext('2d');
  mctx.font = `500 ${fs}px -apple-system, "PingFang SC", sans-serif`;
  const w = Math.ceil(mctx.measureText(text).width);
  c.width = w + 28; c.height = fs + 20;
  const x = c.getContext('2d');
  x.font = `500 ${fs}px -apple-system, "PingFang SC", sans-serif`;
  x.fillStyle = bg;
  if (x.roundRect) { x.beginPath(); x.roundRect(0, 0, c.width, c.height, 10); x.fill(); }
  else x.fillRect(0, 0, c.width, c.height);
  x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(text, c.width / 2, c.height / 2 + 1);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, opacity: 0 }));
  sp.scale.set(c.width * scale, c.height * scale, 1);
  return sp;
}

// 单个程序化人形（宇航服，面朝 +z）
function buildHuman(color) {
  const g = new THREE.Group();
  const suit = new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0.2 });
  const suitDark = new THREE.MeshStandardMaterial({ color: 0x2a3440, roughness: 0.6, metalness: 0.4 });
  const visor = new THREE.MeshStandardMaterial({ color: 0x0d1b26, roughness: 0.15, metalness: 0.6, emissive: 0x1a3a4d, emissiveIntensity: 0.5 });
  const skin = new THREE.MeshStandardMaterial({ color: 0xe8c39a, roughness: 0.7 });

  // 腿
  for (const sx of [-1, 1]) {
    const leg = cyl(0.09, 0.11, 0.62, suitDark, 10); leg.position.set(sx * 0.13, 0.31, 0); g.add(leg);
    const boot = box(0.16, 0.12, 0.26, suitDark); boot.position.set(sx * 0.13, 0.06, 0.03); g.add(boot);
  }
  // 躯干（宇航服）
  const torso = cyl(0.20, 0.24, 0.62, suit, 14); torso.position.y = 0.93; g.add(torso);
  const chest = box(0.30, 0.28, 0.08, suitDark); chest.position.set(0, 1.0, 0.20); g.add(chest); // 胸前控制盒
  // 背包（生命维持）
  const pack = box(0.26, 0.42, 0.16, suitDark); pack.position.set(0, 1.0, -0.24); g.add(pack);
  // 手臂
  const arms = [];
  for (const sx of [-1, 1]) {
    const arm = new THREE.Group();
    const upper = cyl(0.07, 0.08, 0.5, suit, 10); upper.position.y = -0.25; arm.add(upper);
    const glove = sph(0.07, suitDark, 10, 8); glove.position.y = -0.52; arm.add(glove);
    arm.position.set(sx * 0.28, 1.18, 0);
    arm.rotation.z = sx * 0.12;
    g.add(arm); arms.push(arm);
  }
  // 头盔 + 面窗
  const helmet = sph(0.19, suit, 20, 16); helmet.position.y = 1.44; g.add(helmet);
  const face = sph(0.15, visor, 18, 14); face.scale.set(0.9, 0.9, 0.7); face.position.set(0, 1.44, 0.08); g.add(face);
  // 头盔灯
  const lampMat = new THREE.MeshStandardMaterial({ color: 0x111111, emissive: color, emissiveIntensity: 1.2 });
  const lamp = box(0.06, 0.03, 0.02, lampMat); lamp.position.set(0, 1.58, 0.13); g.add(lamp);

  g.traverse(o => { if (o.isMesh) { o.castShadow = true; } });
  return { group: g, torso, helmet, arms };
}

export function buildNPCs(ctx) {
  const { scene, collision, updatables } = ctx;
  const list = [];
  const dampAngle = (cur, tgt, l, dt) => {
    let d = tgt - cur;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    return cur + d * Math.min(1, dt * l);
  };

  for (const cfg of NPCS) {
    const { group, torso, helmet, arms } = buildHuman(cfg.color);
    const gy = collision.ground(cfg.pos.x, cfg.pos.z);
    group.position.set(cfg.pos.x, gy, cfg.pos.z);
    group.rotation.y = cfg.faceYaw || 0;
    scene.add(group);

    // 名牌（小，近距可见）
    const nameTag = makeTextSprite(`${cfg.name} · ${cfg.role}`, { fs: 30, scale: 0.011 });
    nameTag.position.set(0, 2.05, 0);
    group.add(nameTag);

    const npc = {
      ...cfg,
      group, torso, helmet, arms, nameTag,
      pos: new THREE.Vector3(cfg.pos.x, gy, cfg.pos.z),
      baseYaw: cfg.faceYaw || 0,
      talked: false,          // 是否已正式交谈过
      facePlayer: false,      // 对话中：身体转向玩家
      phase: Math.random() * Math.PI * 2,   // 待机动作相位错开
    };
    list.push(npc);

    // 待机动作：呼吸起伏 + 手臂微摆 + 偶尔转头（成本低、有生命感）
    updatables.push((dt, t) => {
      const tt = t + npc.phase;
      torso.scale.y = 1 + Math.sin(tt * 1.8) * 0.02;
      helmet.position.y = 1.44 + Math.sin(tt * 1.8) * 0.008;
      arms[0].rotation.x = Math.sin(tt * 1.1) * 0.08;
      arms[1].rotation.x = Math.sin(tt * 1.1 + 1) * 0.08;

      // 玩家感知：近距离转头看向玩家；对话中整个身体转向玩家
      const pp = ctx.playerPos;
      if (pp) {
        const dx = pp.x - npc.pos.x, dz = pp.z - npc.pos.z;
        const d = Math.hypot(dx, dz);
        if (npc.facePlayer) {
          // 对话：身体正对玩家
          group.rotation.y = dampAngle(group.rotation.y, Math.atan2(dx, dz), 6, dt);
          helmet.rotation.y = dampAngle(helmet.rotation.y, 0, 6, dt);
        } else {
          // 平时回到基准朝向
          group.rotation.y = dampAngle(group.rotation.y, npc.baseYaw, 3, dt);
          if (d < 9) {
            // 相对身体的头部偏转（限幅 ±0.75，避免拧断）
            let rel = Math.atan2(dx, dz) - group.rotation.y;
            while (rel > Math.PI) rel -= Math.PI * 2;
            while (rel < -Math.PI) rel += Math.PI * 2;
            helmet.rotation.y = dampAngle(helmet.rotation.y, Math.max(-0.75, Math.min(0.75, rel)), 5, dt);
          } else {
            helmet.rotation.y = Math.sin(tt * 0.4) * 0.3;   // 缓慢张望
          }
        }
      } else {
        helmet.rotation.y = Math.sin(tt * 0.4) * 0.3;
      }
    });
  }

  return list;
}
