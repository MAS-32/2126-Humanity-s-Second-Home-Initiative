import * as THREE from 'three';

// 2126 清洁未来主义城市：约 150m x 150m 箱庭。
// 蓝 / 白 / 青绿主色，能源设施点缀暖橙；低模建筑 + 雾 + 发光道路 + 空中轨道 + 飞行器。

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ROAD_BEARINGS = [Math.atan2(-35, -30), Math.atan2(35, -35), 0]; // 展厅 / 电梯 / 南侧绿地
const HALL_POS = { x: -35, z: -30 };
const ELEVATOR_POS = { x: 35, z: -35 };

function angleDiff(a, b) {
  let d = a - b;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return Math.abs(d);
}

export function buildCity(scene) {
  const rand = mulberry32(2126);
  const animated = [];

  // ---- 地面与广场 ----
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(150, 150),
    new THREE.MeshStandardMaterial({ color: 0xd9e4e8, roughness: 0.95 }),
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const plaza = new THREE.Mesh(
    new THREE.CircleGeometry(12, 40),
    new THREE.MeshStandardMaterial({ color: 0xeef5f7, roughness: 0.7 }),
  );
  plaza.rotation.x = -Math.PI / 2;
  plaza.position.y = 0.02;
  scene.add(plaza);

  const guideMaterial = new THREE.MeshBasicMaterial({
    color: 0x39c8dc,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  [4.2, 8.4].forEach((radius) => {
    const ring = new THREE.Mesh(new THREE.RingGeometry(radius - 0.18, radius, 48), guideMaterial);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.04;
    scene.add(ring);
  });

  // ---- 发光引导道路（广场 → 展厅 / 电梯 / 南侧）----
  const roadMaterial = new THREE.MeshBasicMaterial({
    color: 0x2fb7cf,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  ROAD_BEARINGS.forEach((bearing) => {
    const length = 34;
    const road = new THREE.Mesh(new THREE.PlaneGeometry(2.4, length), roadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.rotation.z = -bearing;
    const mid = 12 + length / 2;
    road.position.set(Math.sin(bearing) * mid, 0.03, Math.cos(bearing) * mid);
    scene.add(road);
  });

  // ---- 低模建筑群（避开广场 / 道路 / 展厅 / 电梯）----
  const bodyPalette = [0xf2f6f8, 0xe3edf1, 0xd7e6ec, 0xcfe0e8];
  const windowMaterial = new THREE.MeshBasicMaterial({ color: 0x9fe8f2 });
  let built = 0;
  let attempts = 0;
  while (built < 64 && attempts < 400) {
    attempts += 1;
    const bearing = rand() * Math.PI * 2;
    const radius = 18 + rand() * 50;
    const x = Math.sin(bearing) * radius;
    const z = Math.cos(bearing) * radius;
    if (radius < 46 && ROAD_BEARINGS.some((b) => angleDiff(bearing, b) < 0.1)) continue;
    if (Math.hypot(x - HALL_POS.x, z - HALL_POS.z) < 13) continue;
    if (Math.hypot(x - ELEVATOR_POS.x, z - ELEVATOR_POS.z) < 14) continue;

    const distant = radius > 46;
    const width = 3 + rand() * 4;
    const depth = 3 + rand() * 4;
    const height = distant ? 14 + rand() * 26 : 5 + rand() * 14;
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({
        color: bodyPalette[Math.floor(rand() * bodyPalette.length)],
        roughness: 0.6,
        metalness: 0.15,
      }),
    );
    body.position.set(x, height / 2, z);
    body.rotation.y = rand() * Math.PI;
    scene.add(body);

    // 发光窗带：一条横贯立面的青色光带，低成本表达“有人居的未来”。
    if (rand() > 0.35) {
      const strip = new THREE.Mesh(new THREE.BoxGeometry(width * 0.9, 0.28, depth + 0.06), windowMaterial);
      strip.position.set(x, height * (0.35 + rand() * 0.45), z);
      strip.rotation.y = body.rotation.y;
      scene.add(strip);
    }
    built += 1;
  }

  // ---- 空中磁悬浮环 + 支撑塔 ----
  const rail = new THREE.Mesh(
    new THREE.TorusGeometry(55, 0.35, 8, 96),
    new THREE.MeshBasicMaterial({ color: 0x54d6e6 }),
  );
  rail.rotation.x = Math.PI / 2;
  rail.position.y = 22;
  scene.add(rail);

  const pylonMaterial = new THREE.MeshStandardMaterial({ color: 0xc8d8de, roughness: 0.5 });
  for (let i = 0; i < 6; i += 1) {
    const bearing = (i / 6) * Math.PI * 2;
    const pylon = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.55, 22, 6), pylonMaterial);
    pylon.position.set(Math.sin(bearing) * 55, 11, Math.cos(bearing) * 55);
    scene.add(pylon);
  }

  // ---- 空中飞行器（缓慢环绕，dt 驱动）----
  const craftGeometry = new THREE.BoxGeometry(1.7, 0.3, 0.75);
  const craftMaterials = [
    new THREE.MeshBasicMaterial({ color: 0xbdf3fa }),
    new THREE.MeshBasicMaterial({ color: 0xffc98a }),
  ];
  const crafts = [];
  for (let i = 0; i < 10; i += 1) {
    const craft = new THREE.Mesh(craftGeometry, craftMaterials[i % 2]);
    crafts.push({
      mesh: craft,
      radius: 26 + rand() * 36,
      height: 13 + rand() * 18,
      speed: (0.05 + rand() * 0.1) * (rand() > 0.5 ? 1 : -1),
      angle: rand() * Math.PI * 2,
    });
    scene.add(craft);
  }

  // ---- 能源塔（暖橙点缀）----
  const spireMaterial = new THREE.MeshStandardMaterial({ color: 0xe8eef0, roughness: 0.4 });
  const tipMaterial = new THREE.MeshBasicMaterial({ color: 0xff9a3c });
  const tips = [];
  [[52, 18], [60, -6], [48, -46]].forEach(([x, z]) => {
    const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 1.6, 26, 6), spireMaterial);
    spire.position.set(x, 13, z);
    scene.add(spire);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.9, 12, 10), tipMaterial);
    tip.position.set(x, 27, z);
    scene.add(tip);
    tips.push(tip);
  });

  // ---- 边界光环（箱庭边缘提示）----
  const fenceMaterial = new THREE.MeshBasicMaterial({ color: 0x7fdcec });
  for (let i = 0; i < 28; i += 1) {
    const bearing = (i / 28) * Math.PI * 2;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.6, 5), fenceMaterial);
    post.position.set(Math.sin(bearing) * 72, 1.3, Math.cos(bearing) * 72);
    scene.add(post);
  }

  let elapsed = 0;
  return {
    update(dt) {
      elapsed += dt;
      crafts.forEach((craft) => {
        craft.angle += craft.speed * dt;
        craft.mesh.position.set(
          Math.sin(craft.angle) * craft.radius,
          craft.height + Math.sin(elapsed * 0.8 + craft.radius) * 0.6,
          Math.cos(craft.angle) * craft.radius,
        );
        craft.mesh.rotation.y = craft.angle + (craft.speed > 0 ? 0 : Math.PI);
      });
      const pulse = 0.75 + Math.sin(elapsed * 2.2) * 0.25;
      tips.forEach((tip) => tip.scale.setScalar(pulse));
      guideMaterial.opacity = 0.6 + Math.sin(elapsed * 1.6) * 0.25;
    },
  };
}
