import * as THREE from 'three';

// 2126 清洁未来主义主城（约 150m x 150m 箱庭）。
// 设计关键词：未来、秩序、洁净、宏伟、城市即生命维持系统。
// 布局：中央天枢塔 + 环形/辐射发光路网 + 流线型主塔群 + 双层空中交通环 + 远景天际线。

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

const HALL_POS = { x: -35, z: -30 };
const ELEVATOR_POS = { x: 35, z: -35 };
export const WEATHER_STATION_POS = { x: 20, z: -8 };
export const FARM_TOWER_POS = { x: 6, z: 32 };
const TOWER_POS = { x: 0, z: -6 };

// 辐射道路：展厅 / 电梯 / 南侧农场 / 东侧能源区
const ROAD_BEARINGS = [
  Math.atan2(HALL_POS.x, HALL_POS.z),
  Math.atan2(ELEVATOR_POS.x, ELEVATOR_POS.z),
  Math.atan2(FARM_TOWER_POS.x, FARM_TOWER_POS.z),
  Math.atan2(52, 18),
];

function angleDiff(a, b) {
  let d = a - b;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return Math.abs(d);
}

function nearReserved(x, z) {
  return Math.hypot(x - HALL_POS.x, z - HALL_POS.z) < 13
    || Math.hypot(x - ELEVATOR_POS.x, z - ELEVATOR_POS.z) < 14
    || Math.hypot(x - WEATHER_STATION_POS.x, z - WEATHER_STATION_POS.z) < 6
    || Math.hypot(x - FARM_TOWER_POS.x, z - FARM_TOWER_POS.z) < 7
    || Math.hypot(x - TOWER_POS.x, z - TOWER_POS.z) < 9;
}

function glowMaterial(color, opacity) {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}

export function buildCity(scene) {
  const rand = mulberry32(2126);

  const silver = new THREE.MeshStandardMaterial({ color: 0xeef4f6, roughness: 0.35, metalness: 0.25 });
  const white = new THREE.MeshStandardMaterial({ color: 0xf6fafb, roughness: 0.5, metalness: 0.1 });
  const cyanGlow = glowMaterial(0x3fd2e4, 0.85);
  const warmGlow = glowMaterial(0xffa54d, 0.9);

  // ---- 地面与中央广场 ----
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(150, 150),
    new THREE.MeshStandardMaterial({ color: 0xdbe6ea, roughness: 0.95 }),
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const plaza = new THREE.Mesh(
    new THREE.CircleGeometry(14, 48),
    new THREE.MeshStandardMaterial({ color: 0xf0f6f8, roughness: 0.65 }),
  );
  plaza.rotation.x = -Math.PI / 2;
  plaza.position.y = 0.02;
  scene.add(plaza);

  // 广场同心光环
  const guideMaterial = glowMaterial(0x39c8dc, 0.8);
  [4.2, 8.4, 13.2].forEach((radius) => {
    const ring = new THREE.Mesh(new THREE.RingGeometry(radius - 0.18, radius, 64), guideMaterial);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.04;
    scene.add(ring);
  });
  // 广场辐射发光辐条（8 条，强化秩序感与方向引导）
  for (let i = 0; i < 8; i += 1) {
    const bearing = (i / 8) * Math.PI * 2;
    const spoke = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 9), guideMaterial);
    spoke.rotation.x = -Math.PI / 2;
    spoke.rotation.z = -bearing;
    spoke.position.set(Math.sin(bearing) * 8.8, 0.045, Math.cos(bearing) * 8.8);
    scene.add(spoke);
  }
  // 广场外圈灌木绿环（生态点缀：科技系统与生态协同）
  const hedge = new THREE.Mesh(
    new THREE.TorusGeometry(14.6, 0.55, 8, 64),
    new THREE.MeshStandardMaterial({ color: 0x4da877, roughness: 0.85 }),
  );
  hedge.rotation.x = Math.PI / 2;
  hedge.scale.y = 0.55;
  hedge.position.y = 0.28;
  scene.add(hedge);
  // 生态水池（广场东南侧，青色半透明）
  const pool = new THREE.Mesh(
    new THREE.CircleGeometry(3.1, 28),
    new THREE.MeshStandardMaterial({ color: 0x59c8de, roughness: 0.15, metalness: 0.35, transparent: true, opacity: 0.85 }),
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.set(10.5, 0.03, 9);
  scene.add(pool);
  const poolRim = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.14, 8, 36), white);
  poolRim.rotation.x = Math.PI / 2;
  poolRim.position.set(10.5, 0.06, 9);
  scene.add(poolRim);

  // ---- 环形路网（城市即系统的秩序感）----
  const ringRoadMaterial = glowMaterial(0x2fb7cf, 0.4);
  [18, 28, 40].forEach((radius) => {
    const road = new THREE.Mesh(new THREE.RingGeometry(radius - 0.9, radius + 0.9, 96), ringRoadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.position.y = 0.03;
    scene.add(road);
  });

  // ---- 辐射道路 ----
  const radialRoadMaterial = glowMaterial(0x2fb7cf, 0.5);
  ROAD_BEARINGS.forEach((bearing) => {
    const length = 36;
    const road = new THREE.Mesh(new THREE.PlaneGeometry(2.2, length), radialRoadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.rotation.z = -bearing;
    const mid = 14 + length / 2;
    road.position.set(Math.sin(bearing) * mid, 0.035, Math.cos(bearing) * mid);
    scene.add(road);
  });

  // ---- 中央天枢塔（城市调度中枢，标志性垂直地标，参考图 C 位）----
  const tower = new THREE.Group();
  tower.position.set(TOWER_POS.x, 0, TOWER_POS.z);
  // 流线喇叭基座（Lathe 曲线收分，摆脱“圆柱堆叠”感）
  const baseProfile = [
    new THREE.Vector2(6.4, 0),
    new THREE.Vector2(5.6, 1.6),
    new THREE.Vector2(4.2, 4.2),
    new THREE.Vector2(3.1, 7.5),
    new THREE.Vector2(2.6, 10),
  ];
  const towerBase = new THREE.Mesh(new THREE.LatheGeometry(baseProfile, 20), silver);
  tower.add(towerBase);
  // 蓝色能量核心柱（贯穿塔身的发光中轴）
  const energyCore = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.7, 52, 10), glowMaterial(0x35c8ee, 0.75));
  energyCore.position.y = 26;
  tower.add(energyCore);
  const towerMid = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 3.0, 22, 12), white);
  towerMid.position.y = 21;
  tower.add(towerMid);
  const towerTop = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 2.2, 16, 12), silver);
  towerTop.position.y = 40;
  tower.add(towerTop);
  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.5, 10, 6), cyanGlow);
  spire.position.y = 53;
  tower.add(spire);
  // 三道发光环带 + 环形观景平台（数据流转的视觉隐喻）
  [10, 24, 38].forEach((y, i) => {
    const band = new THREE.Mesh(new THREE.TorusGeometry(3.9 - i * 0.9, 0.14, 8, 40), cyanGlow);
    band.rotation.x = Math.PI / 2;
    band.position.y = y;
    tower.add(band);
  });
  const deck = new THREE.Mesh(new THREE.CylinderGeometry(4.6, 4.6, 0.5, 20), white);
  deck.position.y = 12.5;
  tower.add(deck);
  const deckGlow = new THREE.Mesh(new THREE.TorusGeometry(4.6, 0.1, 8, 48), cyanGlow);
  deckGlow.rotation.x = Math.PI / 2;
  deckGlow.position.y = 12.75;
  tower.add(deckGlow);
  scene.add(tower);

  // ---- 流线型主塔群（6 座，Lathe 曲线收分 + 发光腰带）----
  const mainTowerBearings = [0.6, 1.5, 2.5, 3.6, 4.6, 5.5];
  const mainTowerTops = [];
  mainTowerBearings.forEach((bearing, i) => {
    const radius = 27 + (i % 3) * 6;
    const x = Math.sin(bearing) * radius;
    const z = Math.cos(bearing) * radius;
    if (nearReserved(x, z)) return;
    const height = 22 + (i * 7) % 20;
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    if (i % 2 === 0) {
      // 流线塔：底粗腰细顶圆润的 Lathe 轮廓
      const profile = [
        new THREE.Vector2(2.8, 0),
        new THREE.Vector2(2.2, height * 0.2),
        new THREE.Vector2(1.5, height * 0.55),
        new THREE.Vector2(1.2, height * 0.8),
        new THREE.Vector2(1.5, height * 0.96),
        new THREE.Vector2(0.01, height),
      ];
      g.add(new THREE.Mesh(new THREE.LatheGeometry(profile, 14), silver));
    } else {
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.6, height, 10), white);
      shaft.position.y = height / 2;
      g.add(shaft);
      const cap = new THREE.Mesh(new THREE.SphereGeometry(1.6, 12, 10), silver);
      cap.position.y = height;
      g.add(cap);
    }
    const belt = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.1, 6, 28), cyanGlow);
    belt.rotation.x = Math.PI / 2;
    belt.position.y = height * 0.62;
    g.add(belt);
    scene.add(g);
    mainTowerTops.push({ x, z, height, group: g });
  });
  // 空中连桥（相邻主塔之间的细梁 + 发光下沿，立体城市感）
  for (let i = 0; i + 1 < mainTowerTops.length; i += 2) {
    const a = mainTowerTops[i];
    const b = mainTowerTops[i + 1];
    const midX = (a.x + b.x) / 2;
    const midZ = (a.z + b.z) / 2;
    const len = Math.hypot(b.x - a.x, b.z - a.z);
    const bridgeY = Math.min(a.height, b.height) * 0.55;
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, len), white);
    bridge.position.set(midX, bridgeY, midZ);
    bridge.lookAt(b.x, bridgeY, b.z);
    scene.add(bridge);
    const glowStrip = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.08, len), cyanGlow);
    glowStrip.position.set(midX, bridgeY - 0.29, midZ);
    glowStrip.lookAt(b.x, bridgeY - 0.29, b.z);
    scene.add(glowStrip);
  }

  // ---- 中层建筑群 ----
  const bodyPalette = [0xf2f6f8, 0xe3edf1, 0xd7e6ec, 0xcfe0e8];
  const windowMaterial = new THREE.MeshBasicMaterial({ color: 0x9fe8f2 });
  let built = 0;
  let attempts = 0;
  while (built < 52 && attempts < 500) {
    attempts += 1;
    const bearing = rand() * Math.PI * 2;
    const radius = 19 + rand() * 38;
    const x = Math.sin(bearing) * radius;
    const z = Math.cos(bearing) * radius;
    if (nearReserved(x, z)) continue;
    if (radius < 42 && ROAD_BEARINGS.some((b) => angleDiff(bearing, b) < 0.08)) continue;

    const width = 2.6 + rand() * 3.6;
    const depth = 2.6 + rand() * 3.6;
    const height = 5 + rand() * 13;
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({
        color: bodyPalette[Math.floor(rand() * bodyPalette.length)],
        roughness: 0.55,
        metalness: 0.18,
      }),
    );
    body.position.set(x, height / 2, z);
    body.rotation.y = rand() * Math.PI;
    scene.add(body);

    if (rand() > 0.3) {
      const strip = new THREE.Mesh(new THREE.BoxGeometry(width * 0.9, 0.26, depth + 0.06), windowMaterial);
      strip.position.set(x, height * (0.35 + rand() * 0.45), z);
      strip.rotation.y = body.rotation.y;
      scene.add(strip);
    }
    // 约 1/3 的中层建筑加圆顶冠，打破“平顶方盒”重复感
    if (rand() > 0.66) {
      const crown = new THREE.Mesh(new THREE.SphereGeometry(Math.min(width, depth) * 0.42, 10, 8), silver);
      crown.scale.y = 0.6;
      crown.position.set(x, height + 0.1, z);
      scene.add(crown);
    }
    built += 1;
  }

  // ---- 远景天际线（低成本体块扩展城市规模感）----
  const skylineMaterial = new THREE.MeshStandardMaterial({ color: 0xc3d6de, roughness: 0.8 });
  for (let i = 0; i < 26; i += 1) {
    const bearing = (i / 26) * Math.PI * 2 + rand() * 0.12;
    const radius = 58 + rand() * 14;
    const height = 16 + rand() * 26;
    const slab = new THREE.Mesh(new THREE.BoxGeometry(3 + rand() * 3, height, 3 + rand() * 3), skylineMaterial);
    slab.position.set(Math.sin(bearing) * radius, height / 2, Math.cos(bearing) * radius);
    scene.add(slab);
  }

  // ---- 双层空中交通环 + 支撑塔 ----
  [
    { radius: 42, y: 18 },
    { radius: 58, y: 26 },
  ].forEach(({ radius, y }) => {
    const rail = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.32, 8, 96), new THREE.MeshBasicMaterial({ color: 0x54d6e6 }));
    rail.rotation.x = Math.PI / 2;
    rail.position.y = y;
    scene.add(rail);
    for (let i = 0; i < 6; i += 1) {
      const b = (i / 6) * Math.PI * 2;
      const pylon = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.5, y, 6), silver);
      pylon.position.set(Math.sin(b) * radius, y / 2, Math.cos(b) * radius);
      scene.add(pylon);
    }
  });

  // ---- 空中飞行器（沿双环穿梭，dt 驱动）----
  const craftGeometry = new THREE.BoxGeometry(1.7, 0.3, 0.75);
  const craftMaterials = [new THREE.MeshBasicMaterial({ color: 0xbdf3fa }), new THREE.MeshBasicMaterial({ color: 0xffc98a })];
  const crafts = [];
  for (let i = 0; i < 14; i += 1) {
    const ring = i % 2 === 0 ? { radius: 42, y: 18 } : { radius: 58, y: 26 };
    const craft = new THREE.Mesh(craftGeometry, craftMaterials[i % 2]);
    crafts.push({
      mesh: craft,
      radius: ring.radius,
      height: ring.y + (rand() - 0.5) * 2,
      speed: (0.06 + rand() * 0.1) * (rand() > 0.5 ? 1 : -1),
      angle: rand() * Math.PI * 2,
    });
    scene.add(craft);
  }

  // ---- 能源塔（暖橙点缀）----
  const tips = [];
  [[52, 18], [60, -6], [48, -46]].forEach(([x, z]) => {
    const spireMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 1.6, 26, 6), white);
    spireMesh.position.set(x, 13, z);
    scene.add(spireMesh);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.9, 12, 10), warmGlow);
    tip.position.set(x, 27, z);
    scene.add(tip);
    tips.push(tip);
  });

  // ---- 气象站（M-07 值守）：穹顶 + 旋转天线碟 ----
  const weather = new THREE.Group();
  weather.position.set(WEATHER_STATION_POS.x, 0, WEATHER_STATION_POS.z);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(2.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), white);
  weather.add(dome);
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3.4, 6), silver);
  mast.position.y = 3.4;
  weather.add(mast);
  const dish = new THREE.Mesh(new THREE.SphereGeometry(0.9, 12, 8, 0, Math.PI * 2, 0, Math.PI / 3), silver);
  dish.position.y = 5.1;
  dish.rotation.x = Math.PI / 3;
  weather.add(dish);
  scene.add(weather);

  // ---- 垂直农场塔（A-12 值守）：玻璃绿塔 + 层叠种植环 ----
  const farm = new THREE.Group();
  farm.position.set(FARM_TOWER_POS.x, 0, FARM_TOWER_POS.z);
  const glassMaterial = new THREE.MeshStandardMaterial({
    color: 0xa8e6c8, roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.55,
  });
  const farmShaft = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.8, 16, 10), glassMaterial);
  farmShaft.position.y = 8;
  farm.add(farmShaft);
  const planterMaterial = new THREE.MeshStandardMaterial({ color: 0x4da877, roughness: 0.7 });
  [3.5, 7, 10.5, 14].forEach((y) => {
    const planter = new THREE.Mesh(new THREE.TorusGeometry(2.75, 0.32, 8, 24), planterMaterial);
    planter.rotation.x = Math.PI / 2;
    planter.position.y = y;
    farm.add(planter);
  });
  scene.add(farm);

  // ---- 绿植点缀（广场环带 + 南区）----
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8a6f52, roughness: 0.9 });
  const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x58b08c, roughness: 0.8 });
  for (let i = 0; i < 22; i += 1) {
    const bearing = rand() * Math.PI * 2;
    const radius = i < 12 ? 14.5 + rand() * 3 : 20 + rand() * 30;
    const x = Math.sin(bearing) * radius;
    const z = Math.cos(bearing) * radius;
    if (nearReserved(x, z)) continue;
    const tree = new THREE.Group();
    tree.position.set(x, 0, z);
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.13, 0.9, 6), trunkMaterial);
    trunk.position.y = 0.45;
    tree.add(trunk);
    const crown = new THREE.Mesh(new THREE.ConeGeometry(0.65, 1.6, 8), leafMaterial);
    crown.position.y = 1.6;
    tree.add(crown);
    scene.add(tree);
  }

  // ---- 边界光环 ----
  const fenceMaterial = new THREE.MeshBasicMaterial({ color: 0x7fdcec });
  for (let i = 0; i < 28; i += 1) {
    const bearing = (i / 28) * Math.PI * 2;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.6, 5), fenceMaterial);
    post.position.set(Math.sin(bearing) * 72, 1.3, Math.cos(bearing) * 72);
    scene.add(post);
  }

  let elapsed = 0;
  return {
    // 玩家圆形障碍（简单推挤碰撞，只覆盖主要不可穿越建筑）
    colliders: [
      { x: TOWER_POS.x, z: TOWER_POS.z, r: 6.2 }, // 中央天枢塔
      ...mainTowerTops.map(({ x, z }) => ({ x, z, r: 2.9 })), // 主塔群
      { x: WEATHER_STATION_POS.x, z: WEATHER_STATION_POS.z, r: 2.6 }, // 气象站
      { x: FARM_TOWER_POS.x, z: FARM_TOWER_POS.z, r: 3.2 }, // 农场塔
      { x: 10.5, z: 9, r: 3.3 }, // 生态水池
      { x: 52, z: 18, r: 1.8 },
      { x: 60, z: -6, r: 1.8 },
      { x: 48, z: -46, r: 1.8 }, // 能源塔
    ],
    // 相机避障对象（体量足以遮挡第三人称机位的建筑）
    cameraBlockers: [tower, ...mainTowerTops.map(({ group }) => group)],
    update(dt) {
      elapsed += dt;
      crafts.forEach((craft) => {
        craft.angle += craft.speed * dt;
        craft.mesh.position.set(
          Math.sin(craft.angle) * craft.radius,
          craft.height + Math.sin(elapsed * 0.8 + craft.radius) * 0.5,
          Math.cos(craft.angle) * craft.radius,
        );
        craft.mesh.rotation.y = craft.angle + (craft.speed > 0 ? 0 : Math.PI);
      });
      const pulse = 0.75 + Math.sin(elapsed * 2.2) * 0.25;
      tips.forEach((tip) => tip.scale.setScalar(pulse));
      guideMaterial.opacity = 0.55 + Math.sin(elapsed * 1.6) * 0.25;
      dish.rotation.y += dt * 0.5;
    },
  };
}
