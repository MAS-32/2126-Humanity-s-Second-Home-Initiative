import * as THREE from 'three';
import {
  createSceneRuntimeAdapter,
  createTravelGate,
  disposeScene,
  patchWorldState,
} from './sceneHelpers.js';

// Mars Adapter: the available Mars source was a static Aurora City brief rather
// than a second 3D runtime. Its validated content is represented here using the
// existing Shared Renderer, Camera, PlayerController and InteractionSystem.

function standard(color, options = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.72, metalness: 0.18, ...options });
}

function addDome(scene, position, radius, color) {
  const group = new THREE.Group();
  group.position.copy(position);
  const foundation = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 1.1, 0.7, 28), standard(0x6f5247));
  foundation.position.y = 0.35;
  group.add(foundation);
  const shell = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 28, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    standard(color, { transparent: true, opacity: 0.4, roughness: 0.18 }),
  );
  shell.position.y = 0.7;
  group.add(shell);
  const habitat = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.35, radius * 0.5, 2.4, 18), standard(0xd9c5b6));
  habitat.position.y = 1.6;
  group.add(habitat);
  scene.add(group);
  return group;
}

function addIndustrialTower(scene, x, z, height) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.25, height, 14), standard(0x8d6b5b, { metalness: 0.45 }));
  body.position.y = height / 2;
  group.add(body);
  const band = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.1, 8, 24),
    new THREE.MeshBasicMaterial({ color: 0xff9a5c }),
  );
  band.rotation.x = Math.PI / 2;
  band.position.y = height * 0.72;
  group.add(band);
  scene.add(group);
  return band;
}

function addArchive(scene) {
  const group = new THREE.Group();
  group.name = 'mars-archive';
  group.position.set(0, 0, 3.5);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.6, 0.5, 18), standard(0x4b3a35));
  base.position.y = 0.25;
  group.add(base);
  const holo = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.85, 1),
    new THREE.MeshBasicMaterial({ color: 0xffa16a, transparent: true, opacity: 0.62, wireframe: true }),
  );
  holo.position.y = 1.8;
  group.add(holo);
  group.userData.holo = holo;
  scene.add(group);
  return group;
}

export function createMarsScene(ctx) {
  ctx.player.setFirstPerson?.();
  ctx.interaction.setProximitySource?.(null);

  const scene = new THREE.Scene();
  scene.name = 'mars';
  scene.background = new THREE.Color(0x2b100b);
  scene.fog = new THREE.Fog(0x6c2d1d, 45, 185);
  const spawn = new THREE.Vector3(0, 1.7, 11);
  const runtime = createSceneRuntimeAdapter(ctx, {
    bodyClass: 'scene-mars',
    camera: { fov: 67, near: 0.1, far: 600, yaw: 0, pitch: -0.05 },
    renderer: { toneMappingExposure: 1.05, shadows: true },
  });

  scene.add(new THREE.HemisphereLight(0xffc5a0, 0x38140d, 1.15));
  const sun = new THREE.DirectionalLight(0xffe0bf, 2.2);
  sun.position.set(-45, 80, 30);
  scene.add(sun);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(190, 190, 32, 32),
    standard(0xa64c31, { roughness: 1, metalness: 0 }),
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Aurora City: ecological domes, underground agriculture skylights and an
  // equatorial ISRU industrial district, derived from the supplied Mars brief.
  addDome(scene, new THREE.Vector3(-17, 0, -7), 5.5, 0x83d8c0);
  addDome(scene, new THREE.Vector3(17, 0, -7), 5.5, 0xffc17c);
  addDome(scene, new THREE.Vector3(0, 0, -22), 7.5, 0x92c8e8);
  const industrialBands = [
    addIndustrialTower(scene, -29, -24, 11),
    addIndustrialTower(scene, 29, -24, 14),
    addIndustrialTower(scene, 25, -39, 9),
  ];
  for (let x = -12; x <= 12; x += 6) {
    const skylight = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 0.18, 10),
      new THREE.MeshBasicMaterial({ color: 0x86e9a8, transparent: true, opacity: 0.52 }),
    );
    skylight.position.set(x, 0.12, 20);
    scene.add(skylight);
  }

  const mountain = new THREE.Mesh(new THREE.ConeGeometry(38, 42, 48), standard(0x6f2d20));
  mountain.position.set(-58, 18, -110);
  scene.add(mountain);

  const archive = addArchive(scene);
  const earthGate = createTravelGate({
    name: 'earth-portal',
    color: 0x57c9ff,
    position: new THREE.Vector3(-5.5, 0, 3),
    scale: 0.8,
  });
  const moonGate = createTravelGate({
    name: 'mars-moon-portal',
    color: 0xe4e9ef,
    position: new THREE.Vector3(5.5, 0, 3),
    scale: 0.8,
  });
  scene.add(earthGate, moonGate);

  ctx.interaction.add(archive, {
    text: '查看曙光城档案',
    distance: 8,
    onInteract() {
      patchWorldState(ctx.state, 'mars', { archiveViewed: true });
      ctx.ui.flash('曙光城：生态穹顶、地下农业与原位资源工业正在三期扩建。');
    },
  });
  ctx.interaction.add(earthGate, {
    text: '快捷返回地球',
    distance: 8,
    onInteract() { ctx.sceneManager.go('earth'); },
  });
  ctx.interaction.add(moonGate, {
    text: '快捷返回月球前哨',
    distance: 8,
    onInteract() { ctx.sceneManager.go('moon'); },
  });

  let elapsed = 0;
  return {
    scene,
    spawn,
    enter() {
      runtime.enter();
      const marsState = ctx.state.get('mars');
      patchWorldState(ctx.state, 'mars', { visits: (marsState?.visits ?? 0) + 1 });
      ctx.state.set('arrivedMars', true);
      ctx.ui.setScene('火星 · 曙光城');
      ctx.ui.flash('WASD 探索 · E 交互——查看城市档案或选择返航目的地');
    },
    update(dt) {
      elapsed += dt;
      archive.userData.holo.rotation.y += dt * 0.7;
      archive.userData.holo.position.y = 1.8 + Math.sin(elapsed * 1.8) * 0.12;
      industrialBands.forEach((band, index) => {
        band.rotation.z += dt * (0.25 + index * 0.05);
      });
      for (const gate of [earthGate, moonGate]) {
        gate.userData.beacon.scale.setScalar(1 + Math.sin(elapsed * 3 + gate.position.x) * 0.16);
      }
    },
    exit() {},
    dispose() {
      runtime.dispose();
      disposeScene(scene);
    },
  };
}
