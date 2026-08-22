// ============================================================
// MoonBuilders — 建筑零件库
// 原则：基础几何体 + 组合/切层/支撑/环形/外壳/灯带/管线 = ARCHITECTURE
// ============================================================
import * as THREE from 'three';
import { makeSignTex, makeFlowTex } from './MoonMaterials.js';

// ---------- 基础快捷件 ----------
export const cyl = (rt, rb, h, mat, seg = 24) => new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
export const box = (w, h, d, mat) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
export const sph = (r, mat, w = 20, hseg = 14) => new THREE.Mesh(new THREE.SphereGeometry(r, w, hseg), mat);
export const torus = (r, t, mat, arc = Math.PI * 2, tseg = 48) => new THREE.Mesh(new THREE.TorusGeometry(r, t, 10, tseg, arc), mat);

// 阴影统一设置（玻璃/透明件不投影）
export function enableShadows(root) {
  root.traverse(o => {
    if (o.isMesh) {
      const transparent = o.material && o.material.transparent;
      o.castShadow = !transparent;
      o.receiveShadow = true;
    }
  });
  return root;
}

// ---------- 玻璃穹顶（玻璃 + 经纬结构肋 + 金属基环） ----------
export function dome(r, mats, opts = {}) {
  const g = new THREE.Group();
  const glass = new THREE.Mesh(
    new THREE.SphereGeometry(r, 36, 20, 0, Math.PI * 2, 0, Math.PI / 2),
    opts.glassMat || mats.glass
  );
  g.add(glass);
  const ribs = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.SphereGeometry(r * 1.004, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2)),
    new THREE.LineBasicMaterial({ color: 0xd6dee4, transparent: true, opacity: 0.6 })
  );
  g.add(ribs);
  const ring = torus(r, Math.max(0.18, r * 0.03), mats.metal);
  ring.rotation.x = Math.PI / 2;
  g.add(ring);
  return g;
}

// ---------- 建筑窗带（夜景亮灯） ----------
export function windowBand(r, h, mats, repeat = 8) {
  const band = new THREE.Mesh(
    new THREE.CylinderGeometry(r, r, h, 32, 1, true),
    mats.windowBand(repeat)
  );
  return band;
}

// ---------- 加压连接通道（管道 + 玻璃顶条 + 支撑腿） ----------
export function corridor(x1, z1, x2, z2, mats, opts = {}) {
  const r = opts.r ?? 1.15, y = opts.y ?? 3.1;
  const dx = x2 - x1, dz = z2 - z1, len = Math.hypot(dx, dz);
  const g = new THREE.Group();
  const body = new THREE.Group();
  const tube = cyl(r, r, len, opts.mat || mats.white2, 16);
  tube.rotation.z = Math.PI / 2;
  body.add(tube);
  const strip = box(len, r * 0.45, r * 0.8, mats.glass);           // 顶部采光条
  strip.position.y = r * 0.72;
  body.add(strip);
  const lightLine = box(len, 0.07, 0.07, mats.energySoft);          // 侧灯带
  lightLine.position.set(0, -r * 0.35, r * 0.92);
  body.add(lightLine);
  const lightLine2 = lightLine.clone(); lightLine2.position.z = -r * 0.92;
  body.add(lightLine2);
  body.position.set((x1 + x2) / 2, y, (z1 + z2) / 2);
  body.rotation.y = -Math.atan2(dz, dx);
  g.add(body);
  // 端头环
  [x1, x2].forEach((ex, i) => {
    const cap = torus(r * 1.05, 0.14, mats.metal);
    cap.position.set(ex, y, i === 0 ? z1 : z2);
    cap.rotation.y = Math.PI / 2 + Math.atan2(dz, dx);
    g.add(cap);
  });
  // 支撑腿
  const n = Math.max(1, Math.round(len / 10));
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 1);
    const leg = cyl(0.14, 0.18, y - r, mats.dark, 8);
    leg.position.set(x1 + dx * t, (y - r) / 2, z1 + dz * t);
    g.add(leg);
  }
  return g;
}

// ---------- 桁架塔（火箭塔架 / 通讯塔通用） ----------
export function latticeTower(h, w, mats, opts = {}) {
  const g = new THREE.Group();
  const postG = new THREE.BoxGeometry(0.3, h, 0.3);
  for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
    const p = new THREE.Mesh(postG, mats.dark);
    p.position.set(sx * w / 2, h / 2, sz * w / 2);
    g.add(p);
  }
  const levels = Math.max(2, Math.floor(h / 4.5));
  for (let i = 1; i <= levels; i++) {
    const y = (i / (levels + 1)) * h;
    for (let s = 0; s < 4; s++) {                       // 每层方框
      const b = box(w + 0.3, 0.16, 0.16, mats.metal);
      b.position.y = y;
      b.rotation.y = s * Math.PI / 2;
      b.position.x = Math.cos(s * Math.PI / 2 + Math.PI / 2) * 0; // 保持居中
      const off = w / 2;
      if (s === 0) b.position.z = off;
      if (s === 1) { b.position.x = off; b.position.z = 0; }
      if (s === 2) b.position.z = -off;
      if (s === 3) { b.position.x = -off; b.position.z = 0; }
      g.add(b);
    }
    if (i < levels) {                                    // 斜撑
      for (let s = 0; s < 4; s++) {
        const d = box(0.12, h / (levels + 1) * 1.28, 0.12, mats.metal);
        d.position.y = y + h / (levels + 1) / 2;
        d.rotation.z = 0.42;
        const off = w / 2;
        if (s === 0) d.position.z = off;
        if (s === 1) { d.position.x = off; d.rotation.z = 0; d.rotation.x = -0.42; }
        if (s === 2) { d.position.z = -off; d.rotation.z = -0.42; }
        if (s === 3) { d.position.x = -off; d.rotation.z = 0; d.rotation.x = 0.42; }
        g.add(d);
      }
    }
  }
  for (const dy of (opts.decks || [])) {                 // 平台层
    const deck = box(w + 1.6, 0.28, w + 1.6, mats.metal);
    deck.position.y = dy;
    g.add(deck);
  }
  if (opts.topBox) {                                     // 顶部设备箱
    const tb = box(w * 0.8, 1.4, w * 0.8, mats.white2);
    tb.position.y = h + 0.7;
    g.add(tb);
  }
  return g;
}

// ---------- 卫星天线 ----------
export function dish(r, mats, tilt = 0.6) {
  const g = new THREE.Group();
  const mount = cyl(0.3, 0.42, 2.6, mats.dark, 10);
  mount.position.y = 1.3;
  g.add(mount);
  const bowl = new THREE.Mesh(
    new THREE.SphereGeometry(r, 24, 10, 0, Math.PI * 2, 0, 0.95),
    mats.white
  );
  bowl.material = mats.white;
  bowl.rotation.x = -Math.PI / 2 + tilt;
  bowl.position.y = 2.6 + r * 0.35;
  g.add(bowl);
  const feed = cyl(0.05, 0.05, r * 0.8, mats.dark, 6);
  feed.rotation.x = -Math.PI / 2 + tilt;
  feed.position.set(0, 2.6 + r * 0.35 + Math.cos(tilt) * r * 0.32, Math.sin(tilt) * r * 0.32);
  g.add(feed);
  const feedTip = box(0.3, 0.3, 0.3, mats.dark);
  feedTip.position.set(0, 2.6 + r * 0.35 + Math.cos(tilt) * r * 0.66, Math.sin(tilt) * r * 0.66);
  g.add(feedTip);
  return g;
}

// ---------- 太阳能阵列（InstancedMesh） ----------
export function solarArray(cols, rows, ctx) {
  const { palette } = ctx;
  const { mats, tex, geo } = palette;
  const g = new THREE.Group();
  const panelMat = new THREE.MeshStandardMaterial({ map: tex.solar, roughness: 0.35, metalness: 0.55 });
  const inst = new THREE.InstancedMesh(geo.panel, panelMat, cols * rows);
  const poles = new THREE.InstancedMesh(geo.pole, mats.dark, cols * rows);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3(1, 1, 1), p = new THREE.Vector3();
  const yaw = Math.atan2(-140, -170);                    // 朝太阳方位
  let k = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const px = (i - (cols - 1) / 2) * 5.4, pz = (j - (rows - 1) / 2) * 4.2;
      e.set(-0.46, yaw, 0, 'YXZ'); q.setFromEuler(e);
      p.set(px, 1.9, pz);
      m.compose(p, q, s); inst.setMatrixAt(k, m);
      e.set(0, 0, 0); q.setFromEuler(e); s.set(1, 1.8, 1);
      p.set(px, 0.9, pz);
      m.compose(p, q, s); poles.setMatrixAt(k, m);
      s.set(1, 1, 1);
      k++;
    }
  }
  inst.castShadow = true; inst.receiveShadow = true;
  g.add(inst, poles);
  return g;
}

// ---------- 道路（贴合地形的条带） ----------
export function roadRibbon(from, to, width, ctx, opts = {}) {
  const { heightAt, palette } = ctx;
  const { tex } = palette;
  const dx = to.x - from.x, dz = to.z - from.z;
  const len = Math.hypot(dx, dz);
  const n = Math.max(2, Math.ceil(len / 3));   // 加密采样：消除"洗衣板"段感
  const posArr = [], uvArr = [], idx = [];
  let dist = 0;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const px = from.x + dx * t, pz = from.z + dz * t;
    const nx = -dz / len, nz = dx / len;
    const y = heightAt(px, pz) + 0.14;
    posArr.push(px + nx * width / 2, y, pz + nz * width / 2, px - nx * width / 2, y, pz - nz * width / 2);
    if (i > 0) dist += len / n;
    uvArr.push(0, dist / 8, 1, dist / 8);
    if (i > 0) { const a = (i - 1) * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(posArr, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvArr, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  const roadTex = tex.road.clone(); roadTex.needsUpdate = true;
  const mesh = new THREE.Mesh(g, new THREE.MeshStandardMaterial({
    map: roadTex, roughness: 0.9, metalness: 0.1,
    polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2
  }));
  mesh.receiveShadow = true;
  return mesh;
}

// ---------- 能量导管（流动灯带 + 沿线电力节点） ----------
export function energyConduit(from, to, ctx, opts = {}) {
  const { heightAt, palette, updatables } = ctx;
  const { mats } = palette;
  const g = new THREE.Group();
  const dx = to.x - from.x, dz = to.z - from.z;
  const len = Math.hypot(dx, dz);
  const flowTex = makeFlowTex();
  flowTex.repeat.set(len / 5, 1);
  const ribbon = roadRibbon(from, to, opts.width ?? 0.55, ctx);
  ribbon.material = new THREE.MeshBasicMaterial({
    map: flowTex, transparent: true, opacity: 0.85,
    blending: THREE.AdditiveBlending, depthWrite: false,
    polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4
  });
  ribbon.position.y = 0.06;
  ribbon.castShadow = ribbon.receiveShadow = false;
  g.add(ribbon);
  updatables.push((dt) => { flowTex.offset.x -= dt * 0.3; });
  // 电力节点
  const nP = Math.max(2, Math.round(len / 26));
  for (let i = 1; i < nP; i++) {
    const t = i / nP;
    const px = from.x + dx * t, pz = from.z + dz * t;
    const pylon = new THREE.Group();
    const post = cyl(0.16, 0.22, 3.4, mats.dark, 8); post.position.y = 1.7; pylon.add(post);
    const arm = box(1.6, 0.1, 0.1, mats.metal); arm.position.y = 3.2; pylon.add(arm);
    const tip = sph(0.13, mats.energySoft, 8, 6); tip.position.y = 3.5; pylon.add(tip);
    pylon.position.set(px, heightAt(px, pz), pz);
    g.add(pylon);
  }
  return g;
}

// ---------- 弯管（燃料 / 水循环管线） ----------
export function pipeRun(points, r, mats, opts = {}) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(p[0], p[1], p[2])));
  const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, r, 8), opts.mat || mats.metal);
  return tube;
}

// ---------- 小型居住模块（卧式舱体 + 支架 + 窗带 + 气闸） ----------
export function habitat(len, r, mats, opts = {}) {
  const g = new THREE.Group();
  const body = cyl(r, r, len, mats.white, 20);
  body.rotation.z = Math.PI / 2;
  body.position.y = r + 0.8;
  g.add(body);
  const capL = sph(r, mats.white2, 16, 10); capL.scale.x = 0.5; capL.position.set(-len / 2, r + 0.8, 0); g.add(capL);
  const capR = capL.clone(); capR.position.x = len / 2; g.add(capR);
  const band = windowBand(r * 1.02, 0.7, mats, Math.max(3, Math.round(len / 2)));
  band.rotation.z = Math.PI / 2; band.position.y = r + 0.8;
  g.add(band);
  for (const lx of [-len * 0.32, len * 0.32]) {           // 支架
    const leg = box(0.5, 0.9, r * 1.6, mats.dark);
    leg.position.set(lx, 0.45, 0);
    g.add(leg);
  }
  if (opts.airlock !== false) {                           // 气闸
    const lock = box(1.6, 1.9, 1.4, mats.white2);
    lock.position.set(0, 0.95, r + 0.6);
    g.add(lock);
    const door = box(0.9, 1.3, 0.08, mats.dark);
    door.position.set(0, 0.85, r + 1.32);
    g.add(door);
  }
  return g;
}

// ---------- 立式舱段 ----------
export function towerModule(r, h, mats, opts = {}) {
  const g = new THREE.Group();
  const body = cyl(r, r * 1.08, h, mats.white, 20);
  body.position.y = h / 2;
  g.add(body);
  const cap = sph(r, opts.capMat || mats.white2, 20, 10);
  cap.scale.y = 0.55; cap.position.y = h;
  g.add(cap);
  const band = windowBand(r * 1.02, 0.9, mats, 6);
  band.position.y = h * 0.55;
  g.add(band);
  const base = cyl(r * 1.2, r * 1.35, 0.8, mats.dark, 20);
  base.position.y = 0.4;
  g.add(base);
  return g;
}

// ---------- 通讯杆 ----------
export function commMast(h, mats, updatables) {
  const g = new THREE.Group();
  const mast = cyl(0.16, 0.3, h, mats.metal, 8);
  mast.position.y = h / 2; g.add(mast);
  for (const fy of [0.55, 0.75]) {
    const ring = torus(0.8, 0.05, mats.metal); ring.rotation.x = Math.PI / 2; ring.position.y = h * fy; g.add(ring);
  }
  const beacon = sph(0.22, mats.energy.clone(), 8, 6);   // clone：避免共享材质全城同闪
  beacon.position.y = h + 0.2; g.add(beacon);
  if (updatables) updatables.push((dt, t) => { beacon.material.emissiveIntensity = 1.0 + Math.sin(t * 3.2) * 0.7; });
  return g;
}

// ---------- 灯柱 ----------
export function lightPole(mats, opts = {}) {
  const g = new THREE.Group();
  const pole = cyl(0.07, 0.1, 4.4, mats.dark, 6); pole.position.y = 2.2; g.add(pole);
  const head = box(0.5, 0.14, 0.28, opts.cool ? mats.energySoft : mats.warmSoft);
  head.position.y = 4.45; g.add(head);
  return g;
}

// ---------- 货箱 ----------
export function crate(mats, s = 1) {
  const g = new THREE.Group();
  const b = box(2.8 * s, 1.4 * s, 1.4 * s, Math.random() < 0.5 ? mats.white2 : mats.metal);
  b.position.y = 0.7 * s; g.add(b);
  const stripe = box(2.82 * s, 0.18 * s, 1.42 * s, mats.dark);
  stripe.position.y = 0.7 * s; g.add(stripe);
  return g;
}

// ---------- 月球车 ----------
export function rover(mats) {
  const g = new THREE.Group();
  const body = box(2.6, 0.9, 1.6, mats.white2); body.position.y = 1.0; g.add(body);
  const cab = box(1.2, 0.7, 1.3, mats.glass); cab.position.set(0.5, 1.75, 0); g.add(cab);
  for (const wx of [-0.95, 0, 0.95]) {
    for (const wz of [-0.85, 0.85]) {
      const wheel = cyl(0.44, 0.44, 0.3, mats.darker, 10);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(wx, 0.44, wz);
      g.add(wheel);
    }
  }
  const mast = cyl(0.04, 0.06, 1.4, mats.metal, 6); mast.position.set(-0.9, 2.0, 0); g.add(mast);
  const head = box(0.3, 0.12, 0.2, mats.warm); head.position.set(1.35, 1.1, 0); g.add(head);
  return g;
}

// ---------- 垂直起降飞行器（停机坪用） ----------
export function vtol(mats) {
  const g = new THREE.Group();
  const body = box(5, 1.5, 2.4, mats.white); body.position.y = 1.6; g.add(body);
  const nose = sph(1.1, mats.glass, 16, 10); nose.scale.set(1.2, 0.7, 1); nose.position.set(2.6, 1.7, 0); g.add(nose);
  const tail = box(1.6, 0.9, 1.6, mats.white2); tail.position.set(-2.9, 1.9, 0); g.add(tail);
  for (const [px, pz] of [[1.8, 1.6], [1.8, -1.6], [-1.8, 1.6], [-1.8, -1.6]]) {
    const pod = cyl(0.65, 0.75, 1.1, mats.dark, 12);
    pod.position.set(px, 1.5, pz); g.add(pod);
    const glow = cyl(0.5, 0.5, 0.06, mats.energySoft, 12);
    glow.position.set(px, 0.95, pz); g.add(glow);
  }
  for (const [px, pz] of [[1.6, 0.9], [1.6, -0.9], [-1.6, 0.9], [-1.6, -0.9]]) {
    const leg = cyl(0.07, 0.07, 0.9, mats.dark, 6); leg.position.set(px, 0.45, pz); g.add(leg);
  }
  return g;
}

// ---------- 实体标牌 ----------
export function signBoard(text, mats, w = 6, h = 1.5, accent) {
  const g = new THREE.Group();
  const tex = makeSignTex(text, accent);
  const board = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.55, roughness: 0.5 })
  );
  g.add(board);
  const back = box(w + 0.2, h + 0.2, 0.12, mats.dark);
  back.position.z = -0.08;
  g.add(back);
  return g;
}
