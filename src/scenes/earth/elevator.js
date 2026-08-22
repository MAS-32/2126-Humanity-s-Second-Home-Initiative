import * as THREE from 'three';

// 太空电梯「赤道一号」：把人类直接送出地表的超级工程。
// 构成：六边形地面站 + 环形登舱平台 + 四根斜撑 + 锚定塔 + 直入云霄的双层缆索
// + 上下往返的运载舱光点 + 登舱门（能量场）。登舱演出时能量系统会整体增强（setBoarding）。
// 契约保持：portal（name='moon-portal'）、collider、blocker、update(dt)。

const ELEVATOR_POS = { x: 35, z: -35 };
const TETHER_HEIGHT = 320;

function glowMaterial(color, opacity) {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}

export function buildSpaceElevator(scene) {
  // 注册根节点：玩家与测试都以 'moon-portal' 找到它
  const portal = new THREE.Group();
  portal.name = 'moon-portal';
  portal.position.set(ELEVATOR_POS.x, 1, ELEVATOR_POS.z);
  scene.add(portal);

  const structureMaterial = new THREE.MeshStandardMaterial({ color: 0xe6eef1, roughness: 0.4, metalness: 0.35 });
  const glowCyan = new THREE.MeshBasicMaterial({ color: 0x59e2f0 });
  const warmGlow = new THREE.MeshBasicMaterial({ color: 0xffb45e });

  // ---- 六边形地面站 ----
  const platform = new THREE.Mesh(new THREE.CylinderGeometry(9, 10.5, 2, 6), structureMaterial);
  platform.position.y = 0; // 相对 portal 原点（y=1），平台占世界坐标 y 0..2
  portal.add(platform);
  // 平台边缘发光描边 + 上层登舱环
  const edgeRing = new THREE.Mesh(new THREE.TorusGeometry(9.4, 0.12, 8, 6), glowCyan);
  edgeRing.rotation.x = Math.PI / 2;
  edgeRing.position.y = 1.02;
  portal.add(edgeRing);
  const deckRing = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.1, 8, 40), glowCyan);
  deckRing.rotation.x = Math.PI / 2;
  deckRing.position.y = 1.06;
  portal.add(deckRing);
  // 四条放射能量导管（地面发光槽，指向城市方向）
  for (let i = 0; i < 4; i += 1) {
    const bearing = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const conduit = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 7.5), glowMaterial(0x59e2f0, 0.35));
    conduit.rotation.x = -Math.PI / 2;
    conduit.rotation.z = -bearing;
    conduit.position.set(Math.sin(bearing) * 5.6, 1.04, Math.cos(bearing) * 5.6);
    portal.add(conduit);
  }
  // 角落灯桩
  for (let i = 0; i < 6; i += 1) {
    const bearing = (i / 6) * Math.PI * 2;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 1.4, 6), structureMaterial);
    post.position.set(Math.sin(bearing) * 8.6, 1.7, Math.cos(bearing) * 8.6);
    portal.add(post);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), warmGlow);
    tip.position.set(Math.sin(bearing) * 8.6, 2.45, Math.cos(bearing) * 8.6);
    portal.add(tip);
  }

  // ---- 登舱门（朝向广场）：门框 + 能量场 ----
  const toPlaza = new THREE.Vector3(-ELEVATOR_POS.x, 0, -ELEVATOR_POS.z).normalize();
  const gateYaw = Math.atan2(toPlaza.x, toPlaza.z);
  const gate = new THREE.Group();
  gate.position.set(toPlaza.x * 8.2, 1, toPlaza.z * 8.2);
  gate.rotation.y = gateYaw;
  [-1, 1].forEach((side) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.2, 0.3), structureMaterial);
    post.position.set(side * 1.7, 1.6, 0);
    gate.add(post);
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.8, 0.34), glowCyan);
    strip.position.set(side * 1.7, 1.6, 0);
    gate.add(strip);
  });
  const beam = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.34, 0.4), structureMaterial);
  beam.position.y = 3.3;
  gate.add(beam);
  const beamGlow = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.1, 0.42), warmGlow);
  beamGlow.position.y = 3.12;
  gate.add(beamGlow);
  // 能量场门帘（透明发光面，登舱时变亮）
  const field = new THREE.Mesh(new THREE.PlaneGeometry(3.1, 2.9), glowMaterial(0x7fe8f4, 0.12));
  field.position.y = 1.6;
  gate.add(field);
  portal.add(gate);

  // ---- 锚定塔（收分棱柱 + 斜撑 + 发光能量缝）----
  const anchor = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 4.2, 15, 6), structureMaterial);
  anchor.position.y = 8.5;
  portal.add(anchor);
  for (let i = 0; i < 4; i += 1) {
    const bearing = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.4, 10.5, 6), structureMaterial);
    strut.position.set(Math.sin(bearing) * 4.6, 5.2, Math.cos(bearing) * 4.6);
    strut.rotation.x = Math.cos(bearing) * 0.42;
    strut.rotation.z = -Math.sin(bearing) * 0.42;
    portal.add(strut);
  }
  // 塔身发光竖缝（能源在塔内流动的视觉）
  const seams = [];
  for (let i = 0; i < 3; i += 1) {
    const bearing = (i / 3) * Math.PI * 2;
    const seam = new THREE.Mesh(new THREE.BoxGeometry(0.1, 12, 0.1), glowMaterial(0x59e2f0, 0.5));
    seam.position.set(Math.sin(bearing) * 2.5, 8.5, Math.cos(bearing) * 2.5);
    portal.add(seam);
    seams.push(seam);
  }

  // ---- 缆索：实体芯 + 发光护套，直入天空 ----
  const tether = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, TETHER_HEIGHT, 8),
    new THREE.MeshBasicMaterial({ color: 0xcdf4fa }),
  );
  tether.position.y = 16 + TETHER_HEIGHT / 2;
  portal.add(tether);
  const tetherSheath = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, TETHER_HEIGHT, 8, 1, true),
    glowMaterial(0x59e2f0, 0.14),
  );
  tetherSheath.position.y = tether.position.y;
  portal.add(tetherSheath);

  // 缆索上的运载舱光点（上下往返）
  const climbers = [];
  for (let i = 0; i < 3; i += 1) {
    const climber = new THREE.Mesh(new THREE.SphereGeometry(0.55, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffb45e }));
    portal.add(climber);
    climbers.push({ mesh: climber, offset: i / 3, speed: 0.02 + i * 0.006 });
  }
  // 缆索能量脉冲（快速向上的亮斑，体现“能源在输送”）
  const pulses = [];
  for (let i = 0; i < 4; i += 1) {
    const pulseDot = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 6), glowMaterial(0x9ff2ff, 0.9));
    portal.add(pulseDot);
    pulses.push({ mesh: pulseDot, offset: i / 4 });
  }

  // 顶部信标
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.8, 12, 10), new THREE.MeshBasicMaterial({ color: 0xff9a3c }));
  beacon.position.y = 16.6;
  portal.add(beacon);

  let elapsed = 0;
  let boarding = false; // 登舱演出期间能量系统整体增强

  return {
    portal,
    collider: { x: ELEVATOR_POS.x, z: ELEVATOR_POS.z, r: 10.8 }, // 基座平台不可穿越
    blocker: anchor, // 相机避障
    /** 登舱演出开始/结束：能量场、光缝、脉冲整体增强 */
    setBoarding(active) {
      boarding = Boolean(active);
    },
    update(dt) {
      elapsed += dt;
      const energy = boarding ? 2.2 : 1; // 登舱时整体增亮加速

      climbers.forEach(({ mesh, offset, speed }) => {
        const t = (elapsed * speed + offset) % 1;
        mesh.position.y = 16 + t * (TETHER_HEIGHT * 0.55);
      });
      pulses.forEach(({ mesh, offset }) => {
        const t = (elapsed * 0.09 * energy + offset) % 1;
        mesh.position.y = 16 + t * (TETHER_HEIGHT * 0.7);
        mesh.material.opacity = (0.35 + Math.sin(t * Math.PI) * 0.55) * (boarding ? 1 : 0.7);
      });
      const beaconPulse = 0.85 + Math.sin(elapsed * 2.6 * energy) * 0.15;
      beacon.scale.setScalar(beaconPulse);
      field.material.opacity = boarding
        ? 0.3 + Math.sin(elapsed * 6) * 0.12
        : 0.1 + Math.sin(elapsed * 1.8) * 0.04;
      seams.forEach((seam, i) => {
        seam.material.opacity = (0.35 + Math.sin(elapsed * 2.2 * energy + i * 2.1) * 0.2) * energy * 0.55;
      });
      deckRing.rotation.z += dt * 0.3 * energy;
      edgeRing.material.color.setHex(boarding ? 0x8ff2ff : 0x59e2f0);
    },
  };
}
