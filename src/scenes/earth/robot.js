import * as THREE from 'three';

// 原创陪伴型机器人「小满」：圆润、悬浮、亲切，不复刻任何既有角色。
export function buildCompanionRobot(scene) {
  const group = new THREE.Group();
  group.name = 'earth-ai-companion';
  group.position.set(-6, 1.15, -4);

  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xf6fafa, roughness: 0.35, metalness: 0.1 });
  const accentMaterial = new THREE.MeshStandardMaterial({ color: 0x35c4d9, roughness: 0.4 });
  const visorMaterial = new THREE.MeshBasicMaterial({ color: 0x1ef2d0 });

  // 身体：圆润胶囊感
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.42, 20, 16), bodyMaterial);
  body.scale.set(1, 1.15, 0.9);
  group.add(body);

  // 头部
  const head = new THREE.Group();
  head.position.y = 0.62;
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 16), bodyMaterial);
  head.add(skull);
  const visor = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12, -Math.PI / 3, (Math.PI * 2) / 3, Math.PI / 3.2, Math.PI / 3), visorMaterial);
  visor.position.z = 0.1;
  head.add(visor);
  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.22, 6), accentMaterial);
  antenna.position.y = 0.38;
  head.add(antenna);
  const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), visorMaterial);
  antennaTip.position.y = 0.5;
  head.add(antennaTip);
  group.add(head);

  // 侧翼（装饰性小浮翼）
  [-1, 1].forEach((side) => {
    const wing = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), accentMaterial);
    wing.scale.set(0.5, 0.8, 1.1);
    wing.position.set(side * 0.48, 0.05, 0);
    group.add(wing);
  });

  // 悬浮光环
  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.05, 8, 32),
    new THREE.MeshBasicMaterial({ color: 0x66e8f4, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = -0.62;
  group.add(halo);

  scene.add(group);

  let elapsed = 0;
  return {
    group,
    /** playerPos 可选：玩家靠近时小满平滑转身面向玩家，远离后恢复待机摇摆 */
    update(dt, playerPos = null) {
      elapsed += dt;
      group.position.y = 1.15 + Math.sin(elapsed * 1.8) * 0.09;
      let desiredYaw = Math.sin(elapsed * 0.6) * 0.35;
      if (playerPos) {
        const dx = playerPos.x - group.position.x;
        const dz = playerPos.z - group.position.z;
        if (Math.hypot(dx, dz) < 8) desiredYaw = Math.atan2(dx, dz);
      }
      let diff = desiredYaw - group.rotation.y;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      group.rotation.y += diff * (1 - Math.exp(-6 * dt));
      head.rotation.x = Math.sin(elapsed * 1.1) * 0.08;
      halo.rotation.z += dt * 1.4;
    },
  };
}
