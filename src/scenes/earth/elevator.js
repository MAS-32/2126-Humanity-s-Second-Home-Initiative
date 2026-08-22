import * as THREE from 'three';

// 太空电梯：原创外观的轨道运输设施。
// 六边形基座 + 锚定塔 + 直入云霄的碳纳米管缆绳 + 往返的运载舱光点。

const ELEVATOR_POS = { x: 35, z: -35 };
const TETHER_HEIGHT = 320;

export function buildSpaceElevator(scene) {
  // 注册根节点：玩家与测试都以 'moon-portal' 找到它
  const portal = new THREE.Group();
  portal.name = 'moon-portal';
  portal.position.set(ELEVATOR_POS.x, 1, ELEVATOR_POS.z);
  scene.add(portal);

  const structureMaterial = new THREE.MeshStandardMaterial({ color: 0xe6eef1, roughness: 0.45, metalness: 0.2 });
  const glowMaterial = new THREE.MeshBasicMaterial({ color: 0x59e2f0 });

  // 六边形基座平台
  const platform = new THREE.Mesh(new THREE.CylinderGeometry(9, 10.5, 2, 6), structureMaterial);
  platform.position.y = 0; // 相对 portal 原点（y=1），平台占世界坐标 y 0..2
  portal.add(platform);

  // 入口发光门环（朝向广场一侧）
  const gate = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.16, 10, 32), glowMaterial);
  const toPlaza = new THREE.Vector3(-ELEVATOR_POS.x, 0, -ELEVATOR_POS.z).normalize();
  gate.position.set(toPlaza.x * 8.2, 1.6, toPlaza.z * 8.2);
  gate.lookAt(gate.position.clone().add(toPlaza));
  portal.add(gate);

  // 锚定塔（收分棱柱）
  const anchor = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 4.2, 15, 6), structureMaterial);
  anchor.position.y = 8.5;
  portal.add(anchor);

  // 缆绳：极细发光柱体直入天空，靠雾淡出制造尺度感
  const tether = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, TETHER_HEIGHT, 8),
    new THREE.MeshBasicMaterial({ color: 0xcdf4fa }),
  );
  tether.position.y = 16 + TETHER_HEIGHT / 2;
  portal.add(tether);

  // 缆绳上的运载舱光点（上下往返）
  const climberMaterial = new THREE.MeshBasicMaterial({ color: 0xffb45e });
  const climbers = [];
  for (let i = 0; i < 3; i += 1) {
    const climber = new THREE.Mesh(new THREE.SphereGeometry(0.55, 10, 8), climberMaterial);
    portal.add(climber);
    climbers.push({ mesh: climber, offset: i / 3, speed: 0.02 + i * 0.006 });
  }

  // 顶部信标
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.8, 12, 10), new THREE.MeshBasicMaterial({ color: 0xff9a3c }));
  beacon.position.y = 16.6;
  portal.add(beacon);

  let elapsed = 0;
  return {
    portal,
    collider: { x: ELEVATOR_POS.x, z: ELEVATOR_POS.z, r: 10.8 }, // 基座平台不可穿越
    blocker: anchor, // 相机避障
    update(dt) {
      elapsed += dt;
      climbers.forEach(({ mesh, offset, speed }) => {
        // 0..1 循环爬升，y 从塔顶延伸到雾中
        const t = (elapsed * speed + offset) % 1;
        mesh.position.y = 16 + t * (TETHER_HEIGHT * 0.55);
      });
      const pulse = 0.85 + Math.sin(elapsed * 2.6) * 0.15;
      beacon.scale.setScalar(pulse);
      gate.rotation.z += dt * 0.5;
    },
  };
}
