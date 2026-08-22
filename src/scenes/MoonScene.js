import * as THREE from 'three';
import { createBaseScene, disposeScene } from './sceneHelpers.js';

// 第二章「月球 · 静海前哨」（最小正式化版本）。
// 契约保持：交互对象名 'moon-interaction' / 'mars-portal'，状态位
// talkedMoonScientist / arrivedMoon，enter() 设置 arrivedMoon —— E2E 与主线依赖这些名字。
// 视觉只做到“不像测试场”：月面 + 星空 + 悬挂的地球 + 穹顶居住舱 + 火星航线信标门。
// 章节正式内容（基地内部/任务链）属于 MoonScene 自己的迭代，不在 Earth 收口范围内扩张。

export function createMoonScene(ctx) {
  const scene = createBaseScene({ background: 0x060a18, ground: 0x8f959e, name: 'moon' });
  const spawn = new THREE.Vector3(0, 1.7, 5);

  // ---- 星空（远距点云，关闭尺寸衰减保持可读）----
  const starPositions = new Float32Array(600 * 3);
  for (let i = 0; i < 600; i += 1) {
    const v = new THREE.Vector3().randomDirection();
    v.y = Math.abs(v.y) * 0.9 + 0.05; // 只铺天穹
    v.multiplyScalar(180);
    starPositions.set([v.x, v.y, v.z], i * 3);
  }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  scene.add(new THREE.Points(starGeometry, new THREE.PointsMaterial({
    color: 0xcfe0ff,
    size: 1.3,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0.9,
  })));

  // ---- 悬挂在月面天空的地球（第一章的来处，情绪锚点）----
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(7, 32, 24),
    new THREE.MeshBasicMaterial({ color: 0x3f8fd8 }),
  );
  earth.position.set(-28, 42, -70);
  scene.add(earth);
  const earthGlow = new THREE.Mesh(
    new THREE.SphereGeometry(7.6, 32, 24),
    new THREE.MeshBasicMaterial({ color: 0x7fc8f5, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  earthGlow.position.copy(earth.position);
  scene.add(earthGlow);

  // ---- 月面岩石点缀（低调、有错落）----
  const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x7a8089, roughness: 1 });
  [[-6, -4, 0.8], [5, -7, 0.55], [9, 3, 1.1], [-9, 6, 0.7], [2, -12, 0.9]].forEach(([x, z, s]) => {
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), rockMaterial);
    rock.position.set(x, s * 0.4, z);
    rock.rotation.set(x, z, x * z);
    scene.add(rock);
  });

  // ---- 前哨站穹顶居住舱（交互：研究员）----
  const scientist = new THREE.Group();
  scientist.name = 'moon-interaction';
  scientist.position.set(0, 0, 0);
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(1.6, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0xe8ecef, roughness: 0.35, metalness: 0.25 }),
  );
  scientist.add(dome);
  const domeBase = new THREE.Mesh(
    new THREE.CylinderGeometry(1.7, 1.8, 0.35, 24),
    new THREE.MeshStandardMaterial({ color: 0xb9c2c8, roughness: 0.6 }),
  );
  domeBase.position.y = 0.05;
  scientist.add(domeBase);
  const airlock = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.9, 0.5),
    new THREE.MeshStandardMaterial({ color: 0xd4dade, roughness: 0.5 }),
  );
  airlock.position.set(0, 0.45, 1.6);
  scientist.add(airlock);
  const domeLight = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 8, 6),
    new THREE.MeshBasicMaterial({ color: 0x6fe3f2 }),
  );
  domeLight.position.y = 1.75;
  scientist.add(domeLight);
  scene.add(scientist);

  // ---- 火星航线信标门（交互：前往火星）----
  const marsPortal = new THREE.Group();
  marsPortal.name = 'mars-portal';
  marsPortal.position.set(4, 0, 0);
  const gateMaterial = new THREE.MeshStandardMaterial({ color: 0xc8b8ae, roughness: 0.45, metalness: 0.3 });
  [-1, 1].forEach((side) => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 2.4, 8), gateMaterial);
    post.position.set(side * 0.9, 1.2, 0);
    marsPortal.add(post);
  });
  const gateBeam = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.16, 0.16), gateMaterial);
  gateBeam.position.y = 2.4;
  marsPortal.add(gateBeam);
  const marsGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.7, 2.4),
    new THREE.MeshBasicMaterial({ color: 0xff8a5a, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
  );
  marsGlow.position.y = 1.05; // 下沿没过地面，保证准星射线在任何角度看向门体都能命中
  marsPortal.add(marsGlow);
  const marsBeacon = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 10, 8),
    new THREE.MeshBasicMaterial({ color: 0xff7a4d }),
  );
  marsBeacon.position.y = 2.65;
  marsPortal.add(marsBeacon);
  scene.add(marsPortal);

  ctx.interaction.add(scientist, {
    text: '进入静海前哨居住舱',
    distance: 7,
    onInteract() {
      ctx.state.set('talkedMoonScientist', true);
      ctx.ui.flash('静海前哨：欢迎回家之外的第一个家。');
    },
  });
  ctx.interaction.add(marsPortal, {
    text: '前往火星 · 第二家园',
    distance: 7,
    onInteract() { ctx.sceneManager.go('mars'); },
  });

  let elapsed = 0;
  return {
    scene,
    spawn,
    enter() {
      ctx.state.set('arrivedMoon', true);
      ctx.ui.setScene('月球 · 静海前哨');
      ctx.ui.flash('已抵达月球静海前哨——地球就在头顶。');
    },
    update(dt) {
      elapsed += dt;
      domeLight.material.color.setHex(Math.sin(elapsed * 2.4) > -0.2 ? 0x6fe3f2 : 0x1a3a44);
      marsBeacon.scale.setScalar(1 + Math.sin(elapsed * 3) * 0.18);
      earth.rotation.y += dt * 0.05;
    },
    exit() {},
    dispose() { disposeScene(scene); },
  };
}
