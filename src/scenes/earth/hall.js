import * as THREE from 'three';

// 深空规划馆：EarthScene 的主线地标与第一视觉高潮。
// 外观：圆形基座 + 柱廊 + 双层全息环 + 冲天光束 + 入口门廊——远远一眼就知道那里重要。
// 核心：放大的全息太阳系（八大行星缓慢公转、太阳体积光、戴森群、地月/地火实时航线、
// 中文标注、扫描环、轨道粒子流）。视觉表达优先于真实天文比例。
// 契约保持：consoleObject（name='earth-interaction'）、collider、blocker、update(dt)。

const HALL_POS = { x: -35, z: -30 };

function holoMaterial(color, opacity = 0.85) {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}

function makeOrbitLine(radius, color = 0x67e0ea, opacity = 0.4) {
  const points = [];
  for (let i = 0; i <= 72; i += 1) {
    const a = (i / 72) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return new THREE.Line(
    geometry,
    new THREE.LineBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
}

// 中文全息标签（CanvasTexture Sprite，jsdom 下退化为透明）
function makeHoloLabel(text, color = '#aef4ff') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 112;
  const isJsdom = typeof navigator !== 'undefined' && navigator.userAgent?.includes('jsdom');
  const g = isJsdom ? null : canvas.getContext?.('2d');
  let material;
  if (g) {
    g.clearRect(0, 0, canvas.width, canvas.height);
    g.fillStyle = color;
    g.font = '600 46px "PingFang SC", "Microsoft YaHei", sans-serif';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.shadowColor = color;
    g.shadowBlur = 14;
    g.fillText(text, 256, 58);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  } else {
    material = new THREE.SpriteMaterial({ transparent: true, opacity: 0, depthWrite: false });
  }
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.5, 0.33, 1);
  return sprite;
}

// 太阳的体积光晕（径向渐变 sprite）
function makeGlowSprite(color, scale, opacity = 0.55) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const isJsdom = typeof navigator !== 'undefined' && navigator.userAgent?.includes('jsdom');
  const g = isJsdom ? null : canvas.getContext?.('2d');
  let material;
  if (g) {
    const gradient = g.createRadialGradient(128, 128, 8, 128, 128, 128);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.35, color.replace('1)', '0.5)'));
    gradient.addColorStop(1, color.replace('1)', '0)'));
    g.fillStyle = gradient;
    g.fillRect(0, 0, 256, 256);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  } else {
    material = new THREE.SpriteMaterial({ transparent: true, opacity: 0, depthWrite: false });
  }
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(scale, scale, 1);
  return sprite;
}

function makeDysonSwarm() {
  // 三圈不同倾角的收集器点云：科学上合理的“戴森群”，而非封闭太阳的硬壳。
  const swarm = new THREE.Group();
  const material = new THREE.PointsMaterial({
    color: 0xffb45e,
    size: 0.05,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const rings = [
    { radius: 1.0, tilt: 0.12, count: 100, speed: 0.5 },
    { radius: 1.16, tilt: 0.45, count: 120, speed: -0.34 },
    { radius: 1.32, tilt: -0.3, count: 140, speed: 0.22 },
  ];
  const ringGroups = rings.map(({ radius, tilt, count, speed }) => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const a = (i / count) * Math.PI * 2 + Math.random() * 0.05;
      const r = radius + (Math.random() - 0.5) * 0.06;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      positions[i * 3 + 2] = Math.sin(a) * r;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const ring = new THREE.Group();
    ring.rotation.x = tilt;
    ring.add(new THREE.Points(geometry, material));
    swarm.add(ring);
    return { ring, speed };
  });
  return { swarm, ringGroups };
}

// 八大行星（风格化比例：视觉层级优先，不做真实天文比例）
const PLANETS = [
  { name: '水星', radius: 1.75, size: 0.07, color: 0xb8a89a, speed: 0.5 },
  { name: '金星', radius: 2.2, size: 0.13, color: 0xe8c98a, speed: 0.38 },
  { name: '地球', radius: 2.75, size: 0.2, color: 0x3fa8f5, speed: 0.3, label: '地球 · 家园', glow: true },
  { name: '火星', radius: 3.4, size: 0.14, color: 0xf27a4d, speed: 0.24, label: '火星 · 第二家园', glow: true },
  { name: '木星', radius: 4.15, size: 0.44, color: 0xd8a76a, speed: 0.15 },
  { name: '土星', radius: 4.85, size: 0.37, color: 0xe0c890, speed: 0.11, saturnRing: true },
  { name: '天王星', radius: 5.45, size: 0.25, color: 0x8ad8e0, speed: 0.08 },
  { name: '海王星', radius: 5.95, size: 0.24, color: 0x5a8af0, speed: 0.06 },
];

export function buildCivilizationHall(scene) {
  const group = new THREE.Group();
  group.position.set(HALL_POS.x, 0, HALL_POS.z);
  scene.add(group);

  const stoneMaterial = new THREE.MeshStandardMaterial({ color: 0xe9f1f3, roughness: 0.5, metalness: 0.15 });
  const glowCyan = new THREE.MeshBasicMaterial({ color: 0x4fdcec });

  // ---- 圆形基座 + 柱廊 + 顶部光环 ----
  const platform = new THREE.Mesh(new THREE.CylinderGeometry(9.6, 10.2, 0.5, 28), stoneMaterial);
  platform.position.y = 0.25;
  group.add(platform);
  // 基座顶面的发光内嵌环（进入仪式感）
  [6.4, 8.6].forEach((radius) => {
    const inlay = new THREE.Mesh(new THREE.RingGeometry(radius - 0.12, radius, 64), holoMaterial(0x4fdcec, 0.4));
    inlay.rotation.x = -Math.PI / 2;
    inlay.position.y = 0.52;
    group.add(inlay);
  });

  for (let i = 0; i < 8; i += 1) {
    const a = (i / 8) * Math.PI * 2;
    const column = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 4.6, 8), stoneMaterial);
    column.position.set(Math.cos(a) * 8.4, 2.8, Math.sin(a) * 8.4);
    group.add(column);
  }
  const roofRing = new THREE.Mesh(new THREE.TorusGeometry(8.4, 0.22, 8, 48), glowCyan);
  roofRing.rotation.x = Math.PI / 2;
  roofRing.position.y = 5.1;
  group.add(roofRing);

  // 顶部双层倾斜全息环（缓慢异速旋转，远看像一台运转中的仪器）
  const holoRingA = new THREE.Mesh(new THREE.TorusGeometry(6.6, 0.08, 6, 48), holoMaterial(0x6fe8f4, 0.5));
  holoRingA.position.y = 6.2;
  holoRingA.rotation.x = Math.PI / 2 + 0.22;
  group.add(holoRingA);
  const holoRingB = new THREE.Mesh(new THREE.TorusGeometry(5.2, 0.06, 6, 40), holoMaterial(0x8ff2ff, 0.4));
  holoRingB.position.y = 6.9;
  holoRingB.rotation.x = Math.PI / 2 - 0.3;
  group.add(holoRingB);

  // 冲天光束：远距地标，全图可见的“这里很重要”
  const skyBeam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 1.1, 70, 12, 1, true),
    holoMaterial(0x59e2f0, 0.08),
  );
  skyBeam.position.y = 40;
  group.add(skyBeam);

  // 入口门廊（朝向广场一侧）：双柱 + 发光门楣 + 地面引导光带
  const toPlaza = new THREE.Vector3(-HALL_POS.x, 0, -HALL_POS.z).normalize();
  const gateYaw = Math.atan2(toPlaza.x, toPlaza.z);
  const gate = new THREE.Group();
  gate.position.set(toPlaza.x * 9.2, 0, toPlaza.z * 9.2);
  gate.rotation.y = gateYaw;
  [-1, 1].forEach((side) => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 3.4, 8), stoneMaterial);
    post.position.set(side * 1.6, 1.7, 0);
    gate.add(post);
  });
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.22, 0.34), holoMaterial(0x4fdcec, 0.55));
  lintel.position.y = 3.4;
  gate.add(lintel);
  group.add(gate);
  const approach = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 6), holoMaterial(0x59e2f0, 0.22));
  approach.rotation.x = -Math.PI / 2;
  approach.rotation.z = -gateYaw;
  approach.position.set(toPlaza.x * 13.5, 0.045, toPlaza.z * 13.5);
  group.add(approach);

  // ---- 全息太阳系（视觉核心）----
  // 高度压到第三人称视线自然覆盖的区间（相机 lookHeight 约 1.15，全息核心 2.75）
  const hologram = new THREE.Group();
  hologram.position.y = 2.75;
  hologram.scale.setScalar(1.12); // 视觉权重放大：让玩家一进厅就撞上“太阳系”
  group.add(hologram);

  // 太阳：核心 + 双层辉光壳 + 大尺度体积光晕 sprite
  const sun = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 18), holoMaterial(0xffb03c, 0.95));
  hologram.add(sun);
  const sunGlow = new THREE.Mesh(new THREE.SphereGeometry(0.66, 24, 18), holoMaterial(0xffc578, 0.3));
  hologram.add(sunGlow);
  const sunHalo = makeGlowSprite('rgba(255, 178, 80, 1)', 3.4, 0.6);
  hologram.add(sunHalo);

  // 戴森群
  const { swarm, ringGroups } = makeDysonSwarm();
  hologram.add(swarm);

  // 行星系统：每条轨道一条淡线 + 轨道粒子流；行星挂在各自 pivot 上公转
  const planetPivots = [];
  PLANETS.forEach((spec, index) => {
    hologram.add(makeOrbitLine(spec.radius));
    const pivot = new THREE.Group();
    pivot.rotation.y = index * 0.9; // 初始相位错开
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(spec.size, 18, 14),
      holoMaterial(spec.color, spec.glow ? 0.95 : 0.8),
    );
    planet.position.x = spec.radius;
    pivot.add(planet);
    if (spec.glow) {
      const halo = makeGlowSprite(spec.color === 0x3fa8f5 ? 'rgba(80, 170, 245, 1)' : 'rgba(242, 122, 77, 1)', spec.size * 5.5, 0.5);
      halo.position.x = spec.radius;
      pivot.add(halo);
    }
    if (spec.saturnRing) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(spec.size * 1.7, 0.035, 6, 32), holoMaterial(0xe8d8a8, 0.7));
      ring.rotation.x = Math.PI / 2 - 0.35;
      ring.position.x = spec.radius;
      pivot.add(ring);
    }
    if (spec.label) {
      const label = makeHoloLabel(spec.label);
      label.position.set(spec.radius, spec.size + 0.42, 0);
      pivot.add(label);
    }
    hologram.add(pivot);
    planetPivots.push({ pivot, spec, angle: pivot.rotation.y });

    // 轨道粒子流（全息数据沿轨道缓慢流动的感觉）
    const flowCount = 5;
    const flowGeometry = new THREE.BufferGeometry();
    flowGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(flowCount * 3), 3));
    const flow = new THREE.Points(flowGeometry, new THREE.PointsMaterial({
      color: 0x8ff2ff,
      size: 0.07,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    hologram.add(flow);
    planetPivots[index].flow = flow;
    planetPivots[index].flowCount = flowCount;
  });

  // 地球系统：月球 pivot 挂在地球 pivot 上，跟随地球公转
  const earthEntry = planetPivots[2];
  const moonPivot = new THREE.Group();
  moonPivot.position.x = earthEntry.spec.radius;
  const moon = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), holoMaterial(0xcfd8dc, 0.95));
  moon.position.x = 0.38;
  moonPivot.add(moon);
  const moonLabel = makeHoloLabel('月球 · 前哨');
  moonLabel.position.set(0.38, 0.3, 0);
  moonPivot.add(moonLabel);
  earthEntry.pivot.add(moonPivot);

  // 文明航线：地球 → 月球 / 地球 → 火星（每帧按行星实时位置重算，永远连接）
  const ROUTE_POINTS = 26;
  function makeRoute(color) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(ROUTE_POINTS * 3), 3));
    const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    // 航线上的流动光点
    const streamGeometry = new THREE.BufferGeometry();
    streamGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6 * 3), 3));
    const stream = new THREE.Points(streamGeometry, new THREE.PointsMaterial({
      color,
      size: 0.1,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    hologram.add(line, stream);
    return { line, stream, curve: new THREE.QuadraticBezierCurve3(new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()) };
  }
  const routeMoon = makeRoute(0x8ff2ff);
  const routeMars = makeRoute(0xffb98a);

  const tmpFrom = new THREE.Vector3();
  const tmpTo = new THREE.Vector3();
  const tmpMid = new THREE.Vector3();
  function updateRoute(route, fromEntry, fromOffset, toEntry, toOffset, lift, elapsedTime) {
    fromEntry.pivot.localToWorld(tmpFrom.set(fromOffset.x, 0, fromOffset.z ?? 0));
    toEntry.pivot.localToWorld(tmpTo.set(toOffset.x, 0, toOffset.z ?? 0));
    hologram.worldToLocal(tmpFrom);
    hologram.worldToLocal(tmpTo);
    tmpMid.lerpVectors(tmpFrom, tmpTo, 0.5);
    tmpMid.y += lift;
    route.curve.v0.copy(tmpFrom);
    route.curve.v1.copy(tmpMid);
    route.curve.v2.copy(tmpTo);
    const positions = route.line.geometry.attributes.position;
    for (let i = 0; i < ROUTE_POINTS; i += 1) {
      const p = route.curve.getPoint(i / (ROUTE_POINTS - 1));
      positions.setXYZ(i, p.x, p.y, p.z);
    }
    positions.needsUpdate = true;
    const streamPositions = route.stream.geometry.attributes.position;
    for (let i = 0; i < 6; i += 1) {
      const p = route.curve.getPoint((elapsedTime * 0.25 + i / 6) % 1);
      streamPositions.setXYZ(i, p.x, p.y, p.z);
    }
    streamPositions.needsUpdate = true;
  }

  // 奥尼尔圆柱：成对反向自旋的太空栖息地
  const oneill = new THREE.Group();
  oneill.position.set(-1.6, 1.0, 1.8);
  const cylinderGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.66, 12, 1, true);
  const oneillA = new THREE.Mesh(cylinderGeometry, holoMaterial(0x9ff2e2, 0.6));
  const oneillB = new THREE.Mesh(cylinderGeometry, holoMaterial(0x9ff2e2, 0.6));
  oneillA.position.y = 0.12;
  oneillB.position.y = -0.12;
  oneill.add(oneillA, oneillB);
  hologram.add(oneill);

  // 底部投影锥 + 旋转发射环（全息“投影仪”）
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(2.6, 2.2, 24, 1, true),
    holoMaterial(0x3fc8dc, 0.1),
  );
  cone.position.y = 2.1;
  cone.rotation.x = Math.PI;
  group.add(cone);
  const emitter = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.1, 8, 32), glowCyan);
  emitter.rotation.x = Math.PI / 2;
  emitter.position.y = 1.0;
  group.add(emitter);

  // 扫描环：周期性从投影口升起并扩散，强化“全息在运行”
  const scanRing = new THREE.Mesh(new THREE.TorusGeometry(1, 0.05, 6, 40), holoMaterial(0x8ff2ff, 0.5));
  scanRing.rotation.x = Math.PI / 2;
  scanRing.position.y = 1.1;
  group.add(scanRing);

  // ---- 导览控制台（注册为 earth-interaction，供测试与玩家交互）----
  const consoleGroup = new THREE.Group();
  consoleGroup.name = 'earth-interaction';
  consoleGroup.position.set(toPlaza.x * 7.2, 0.55, toPlaza.z * 7.2);
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.42, 1.1, 10), stoneMaterial);
  consoleGroup.add(pedestal);
  const screen = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.62, 0.08), holoMaterial(0x59e2f0, 0.75));
  screen.position.set(0, 0.62, 0);
  screen.rotation.x = -0.5;
  consoleGroup.add(screen);
  consoleGroup.lookAt(new THREE.Vector3(toPlaza.x * 20, 0.55, toPlaza.z * 20));
  group.add(consoleGroup);

  // ---- 中文数据面板：玩家靠近全息模型时出现（DOM，dispose 移除）----
  let dataPanel = null;
  let panelVisible = false;
  const setPanel = (visible) => {
    if (visible === panelVisible) return;
    panelVisible = visible;
    if (visible && !dataPanel) {
      dataPanel = document.createElement('div');
      dataPanel.className = 'earth-holo-panel';
      dataPanel.innerHTML = `
        <div class="earth-holo-panel-title">太阳系文明蓝图 · 实时推演</div>
        <div>戴森群并网 <b>2.4%</b> · 地月通勤 <b>22 班次/日</b></div>
        <div>地球 ▸ 家园 ｜ 月球 ▸ 前哨 ｜ 火星 ▸ 第二家园</div>
        <div class="earth-holo-panel-next">下一站 ▸ 月球前哨</div>
      `;
      document.body.append(dataPanel);
    }
    if (dataPanel) dataPanel.classList.toggle('is-visible', visible);
  };

  let elapsed = 0;
  return {
    consoleObject: consoleGroup,
    collider: { x: HALL_POS.x, z: HALL_POS.z, r: 10.6 }, // 玩家不可穿入展厅基座
    blocker: platform, // 相机避障
    /** playerPos 可选：传入后用于数据面板的 proximity 显示 */
    update(dt, playerPos = null) {
      elapsed += dt;
      hologram.rotation.y += dt * 0.06;
      sun.rotation.y += dt * 0.4;
      ringGroups.forEach(({ ring, speed }) => { ring.rotation.y += dt * speed; });
      planetPivots.forEach((entry) => {
        entry.angle += dt * entry.spec.speed;
        entry.pivot.rotation.y = entry.angle;
        // 轨道粒子流：沿轨道缓慢循环的光点
        const positions = entry.flow.geometry.attributes.position;
        for (let i = 0; i < entry.flowCount; i += 1) {
          const a = entry.angle + (i / entry.flowCount) * Math.PI * 2 + elapsed * 0.15;
          positions.setXYZ(i, Math.cos(a) * entry.spec.radius, 0, Math.sin(a) * entry.spec.radius);
        }
        positions.needsUpdate = true;
      });
      moonPivot.rotation.y += dt * 1.4;
      oneillA.rotation.y += dt * 1.6;
      oneillB.rotation.y -= dt * 1.6;
      holoRingA.rotation.z += dt * 0.2;
      holoRingB.rotation.z -= dt * 0.14;
      emitter.rotation.z += dt * 0.8;

      // 太阳呼吸 + 光晕闪烁
      const breathe = 0.9 + Math.sin(elapsed * 1.5) * 0.1;
      sunGlow.scale.setScalar(breathe);
      sunHalo.material.opacity = 0.5 + Math.sin(elapsed * 2.3) * 0.1;
      skyBeam.material.opacity = 0.06 + Math.sin(elapsed * 1.1) * 0.025;

      // 扫描环：上升 + 扩散 + 淡出，3.2s 一个周期
      const scanT = (elapsed % 3.2) / 3.2;
      scanRing.position.y = 1.1 + scanT * 2.6;
      scanRing.scale.setScalar(1 + scanT * 4.6);
      scanRing.material.opacity = 0.5 * (1 - scanT);

      // 实时航线（地球与月球/火星都在动，航线每帧重连）
      updateRoute(routeMoon, earthEntry, { x: earthEntry.spec.radius }, { pivot: moonPivot }, { x: 0.38 }, 0.25, elapsed);
      updateRoute(routeMars, earthEntry, { x: earthEntry.spec.radius }, planetPivots[3], { x: planetPivots[3].spec.radius }, 0.9, elapsed);

      // 中文数据面板：靠近全息模型时出现
      if (playerPos) {
        const dx = playerPos.x - HALL_POS.x;
        const dz = playerPos.z - HALL_POS.z;
        setPanel(Math.hypot(dx, dz) < 13);
      }
    },
    dispose() {
      dataPanel?.remove();
      dataPanel = null;
      panelVisible = false;
    },
  };
}
