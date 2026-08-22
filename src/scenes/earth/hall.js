import * as THREE from 'three';

// 未来文明展厅：开放式亭阁 + 全息太阳系。
// 内容：太阳、戴森群（Dyson Swarm，非封闭硬壳）、奥尼尔圆柱、地月火文明路线。
// 只做缓慢自转 / 公转展示动画，不做真实天体物理模拟。

const HALL_POS = { x: -35, z: -30 };

function makeOrbitLine(radius, color = 0x67e0ea, opacity = 0.55) {
  const points = [];
  for (let i = 0; i <= 64; i += 1) {
    const a = (i / 64) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return new THREE.Line(
    geometry,
    new THREE.LineBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
}

function makeDysonSwarm() {
  // 三圈不同倾角的收集器点云：科学上合理的“戴森群”，而非封闭太阳的硬壳。
  const swarm = new THREE.Group();
  const material = new THREE.PointsMaterial({
    color: 0xffb45e,
    size: 0.045,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const rings = [
    { radius: 0.95, tilt: 0.12, count: 90, speed: 0.5 },
    { radius: 1.1, tilt: 0.45, count: 110, speed: -0.34 },
    { radius: 1.25, tilt: -0.3, count: 130, speed: 0.22 },
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

export function buildCivilizationHall(scene) {
  const group = new THREE.Group();
  group.position.set(HALL_POS.x, 0, HALL_POS.z);
  scene.add(group);

  const stoneMaterial = new THREE.MeshStandardMaterial({ color: 0xe9f1f3, roughness: 0.55 });
  const glowCyan = new THREE.MeshBasicMaterial({ color: 0x4fdcec });

  // 圆形基座 + 柱廊 + 顶部光环
  const platform = new THREE.Mesh(new THREE.CylinderGeometry(9.6, 10.2, 0.5, 28), stoneMaterial);
  platform.position.y = 0.25;
  group.add(platform);

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

  // ---- 全息太阳系 ----
  const hologram = new THREE.Group();
  hologram.position.y = 3.1;
  group.add(hologram);

  const holoMaterial = (color, opacity = 0.85) => new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  // 太阳 + 辉光外壳
  const sun = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 18), holoMaterial(0xffa53c, 0.95));
  hologram.add(sun);
  const sunGlow = new THREE.Mesh(new THREE.SphereGeometry(0.62, 24, 18), holoMaterial(0xffc578, 0.28));
  hologram.add(sunGlow);

  // 戴森群
  const { swarm, ringGroups } = makeDysonSwarm();
  hologram.add(swarm);

  // 地球 / 月球 / 火星与轨道
  hologram.add(makeOrbitLine(1.9));
  hologram.add(makeOrbitLine(3.0));

  const earthOrbit = new THREE.Group();
  const earth = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12), holoMaterial(0x3fa8f5));
  earth.position.x = 1.9;
  earthOrbit.add(earth);
  const moonPivot = new THREE.Group();
  moonPivot.position.copy(earth.position);
  const moon = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), holoMaterial(0xcfd8dc));
  moon.position.x = 0.34;
  moonPivot.add(moon);
  earthOrbit.add(moonPivot);
  hologram.add(earthOrbit);

  const marsOrbit = new THREE.Group();
  const mars = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 12), holoMaterial(0xf27a4d));
  mars.position.x = 3.0;
  marsOrbit.add(mars);
  hologram.add(marsOrbit);

  // 文明路线：地球轨道 → 火星轨道的青色航线
  const routeCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(1.9, 0, 0),
    new THREE.Vector3(0, 0.7, -3.2),
    new THREE.Vector3(-3.0, 0, 0),
  );
  const route = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(routeCurve.getPoints(40)),
    new THREE.LineBasicMaterial({ color: 0x8ff2ff, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  hologram.add(route);

  // 奥尼尔圆柱：成对反向自旋的太空栖息地
  const oneill = new THREE.Group();
  oneill.position.set(-1.4, 0.9, 1.6);
  const cylinderGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.66, 12, 1, true);
  const oneillA = new THREE.Mesh(cylinderGeometry, holoMaterial(0x9ff2e2, 0.6));
  const oneillB = new THREE.Mesh(cylinderGeometry, holoMaterial(0x9ff2e2, 0.6));
  oneillA.position.y = 0.12;
  oneillB.position.y = -0.12;
  oneill.add(oneillA, oneillB);
  hologram.add(oneill);

  // 底部投影锥（全息“投影仪”视觉效果）
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(2.6, 2.2, 24, 1, true),
    holoMaterial(0x3fc8dc, 0.1),
  );
  cone.position.y = 2.0;
  cone.rotation.x = Math.PI;
  group.add(cone);

  // ---- 导览控制台（注册为 earth-interaction，供测试与玩家交互）----
  const consoleGroup = new THREE.Group();
  consoleGroup.name = 'earth-interaction';
  // 位于展厅朝向广场一侧的边缘
  const toPlaza = new THREE.Vector3(-HALL_POS.x, 0, -HALL_POS.z).normalize();
  consoleGroup.position.set(toPlaza.x * 7.2, 0.55, toPlaza.z * 7.2);
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.42, 1.1, 10), stoneMaterial);
  consoleGroup.add(pedestal);
  const screen = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.62, 0.08), holoMaterial(0x59e2f0, 0.75));
  screen.position.set(0, 0.62, 0);
  screen.rotation.x = -0.5;
  consoleGroup.add(screen);
  consoleGroup.lookAt(new THREE.Vector3(toPlaza.x * 20, 0.55, toPlaza.z * 20));
  group.add(consoleGroup);

  let elapsed = 0;
  return {
    consoleObject: consoleGroup,
    collider: { x: HALL_POS.x, z: HALL_POS.z, r: 10.6 }, // 玩家不可穿入展厅基座
    blocker: platform, // 相机避障
    update(dt) {
      elapsed += dt;
      hologram.rotation.y += dt * 0.12;
      sun.rotation.y += dt * 0.4;
      ringGroups.forEach(({ ring, speed }) => { ring.rotation.y += dt * speed; });
      earthOrbit.rotation.y += dt * 0.35;
      moonPivot.rotation.y += dt * 1.4;
      marsOrbit.rotation.y += dt * 0.22;
      oneillA.rotation.y += dt * 1.6;
      oneillB.rotation.y -= dt * 1.6;
      const breathe = 0.9 + Math.sin(elapsed * 1.5) * 0.1;
      sunGlow.scale.setScalar(breathe);
    },
  };
}
