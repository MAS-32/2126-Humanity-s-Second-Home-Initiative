import * as THREE from 'three';
import {
  createSceneRuntimeAdapter,
  createTravelGate,
  disposeScene,
  patchWorldState,
} from './sceneHelpers.js';

// Moon Adapter: the standalone moon-outpost project supplied the world/content
// language, but its renderer, camera, pointer-lock input, RAF loop and iframe
// bridge are intentionally not migrated. This module only consumes Shared Core.

const PALETTE = {
  white: 0xdde5eb,
  metal: 0x65707a,
  glass: 0x73d9f2,
  cyan: 0x7fe9ff,
  amber: 0xffa66b,
};

function material(color, options = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.62, metalness: 0.24, ...options });
}

function addStars(scene) {
  const positions = new Float32Array(900 * 3);
  for (let i = 0; i < 900; i += 1) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(150 + (i % 7) * 18);
    v.y = Math.abs(v.y) + 22;
    positions.set([v.x, v.y, v.z], i * 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  scene.add(new THREE.Points(geometry, new THREE.PointsMaterial({
    color: 0xd7e8ff,
    size: 1.25,
    sizeAttenuation: false,
  })));
}

function addDome(scene, { name, position, radius, color = PALETTE.glass }) {
  const group = new THREE.Group();
  group.name = name;
  group.position.copy(position);
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 1.05, radius * 1.1, 0.65, 32),
    material(PALETTE.metal, { metalness: 0.55 }),
  );
  base.position.y = 0.32;
  group.add(base);
  const shell = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 32, 18, 0, Math.PI * 2, 0, Math.PI / 2),
    material(color, { transparent: true, opacity: 0.34, roughness: 0.16 }),
  );
  shell.position.y = 0.62;
  group.add(shell);
  const ribs = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.SphereGeometry(radius * 1.01, 16, 9, 0, Math.PI * 2, 0, Math.PI / 2)),
    new THREE.LineBasicMaterial({ color: 0xcfe7ef, transparent: true, opacity: 0.42 }),
  );
  ribs.position.y = 0.62;
  group.add(ribs);
  scene.add(group);
  return group;
}

function addCentralHub(scene) {
  const group = new THREE.Group();
  group.name = 'moon-central-hub';
  const base = new THREE.Mesh(new THREE.CylinderGeometry(6.2, 7.2, 1.4, 32), material(PALETTE.white));
  base.position.y = 0.7;
  group.add(base);
  const tower = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 3.5, 8, 24), material(PALETTE.white));
  tower.position.y = 4.7;
  group.add(tower);
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.8, 0.16, 10, 48),
    new THREE.MeshBasicMaterial({ color: PALETTE.cyan }),
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 5.4;
  group.add(ring);
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.25, 7, 10), material(PALETTE.metal));
  mast.position.y = 11;
  group.add(mast);
  scene.add(group);
  return { group, ring };
}

function addRocket(scene) {
  const group = new THREE.Group();
  group.name = 'moon-rocket';
  group.position.set(0, 0, -18);
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.15, 7.5, 18), material(0xe8edf0));
  body.position.y = 4.5;
  group.add(body);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.8, 2.2, 18), material(PALETTE.amber));
  nose.position.y = 9.35;
  group.add(nose);
  for (const side of [-1, 1]) {
    const booster = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.5, 5.2, 14), material(PALETTE.metal));
    booster.position.set(side * 1.15, 3.2, 0);
    group.add(booster);
  }
  scene.add(group);
  return group;
}

export function createMoonScene(ctx) {
  ctx.player.setFirstPerson?.();
  ctx.interaction.setProximitySource?.(null);

  const scene = new THREE.Scene();
  scene.name = 'moon';
  scene.background = new THREE.Color(0x040712);
  scene.fog = new THREE.FogExp2(0x090d18, 0.006);
  const spawn = new THREE.Vector3(0, 1.7, 12);
  const runtime = createSceneRuntimeAdapter(ctx, {
    bodyClass: 'scene-moon',
    camera: { fov: 64, near: 0.1, far: 700, yaw: 0, pitch: -0.04 },
    renderer: { toneMappingExposure: 1.12, shadows: true },
  });

  scene.add(new THREE.HemisphereLight(0x9dbbdd, 0x30333a, 1.05));
  const sun = new THREE.DirectionalLight(0xfff1da, 2.1);
  sun.position.set(-55, 95, 40);
  scene.add(sun);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(180, 180, 24, 24),
    material(0x858b94, { roughness: 1, metalness: 0 }),
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
  addStars(scene);

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(7.5, 40, 28),
    new THREE.MeshStandardMaterial({ color: 0x2f83cb, emissive: 0x12395f, emissiveIntensity: 0.45 }),
  );
  earth.position.set(-26, 32, -72);
  scene.add(earth);

  const hub = addCentralHub(scene);
  addDome(scene, { name: 'moon-eco-dome', position: new THREE.Vector3(19, 0, -8), radius: 5, color: 0x78efb0 });
  addDome(scene, { name: 'moon-research-village', position: new THREE.Vector3(-19, 0, -8), radius: 4.4 });
  const rocket = addRocket(scene);

  const observatory = addDome(scene, {
    name: 'moon-interaction',
    position: new THREE.Vector3(0, 0, 4),
    radius: 2.2,
    color: 0xa5c8ff,
  });
  const earthGate = createTravelGate({
    name: 'moon-earth-portal',
    color: 0x59bfff,
    position: new THREE.Vector3(-6, 0, 3),
    scale: 0.78,
  });
  const marsGate = createTravelGate({
    name: 'mars-portal',
    color: 0xff8657,
    position: new THREE.Vector3(6, 0, 3),
    scale: 0.78,
  });
  scene.add(earthGate, marsGate);

  ctx.interaction.add(observatory, {
    text: '进入太阳系观景台',
    distance: 8,
    onInteract() {
      ctx.state.set('talkedMoonScientist', true);
      patchWorldState(ctx.state, 'moon', { observatoryVisited: true });
      ctx.ui.flash('观景台：月球是离开地球后的第一座长期家园。');
    },
  });
  ctx.interaction.add(earthGate, {
    text: '返回地球',
    distance: 8,
    onInteract() { ctx.sceneManager.go('earth'); },
  });
  ctx.interaction.add(marsGate, {
    text: '观景台航线 · 前往火星',
    distance: 8,
    onInteract() {
      patchWorldState(ctx.state, 'moon', { marsRouteAuthorized: true });
      ctx.sceneManager.go('mars');
    },
  });
  ctx.interaction.add(rocket, {
    text: '搭乘深空运输舰前往火星',
    distance: 12,
    onInteract() {
      patchWorldState(ctx.state, 'moon', { marsRouteAuthorized: true });
      ctx.sceneManager.go('mars');
    },
  });

  let elapsed = 0;
  return {
    scene,
    spawn,
    enter() {
      runtime.enter();
      const moonState = ctx.state.get('moon');
      patchWorldState(ctx.state, 'moon', { visits: (moonState?.visits ?? 0) + 1 });
      ctx.state.set('arrivedMoon', true);
      ctx.ui.setScene('月球 · 静海前哨');
      ctx.ui.flash('WASD 探索 · E 交互——观景台可返航地球或前往火星');
    },
    update(dt) {
      elapsed += dt;
      earth.rotation.y += dt * 0.035;
      hub.ring.rotation.z += dt * 0.35;
      for (const gate of [earthGate, marsGate]) {
        const pulse = 1 + Math.sin(elapsed * 3 + gate.position.x) * 0.18;
        gate.userData.beacon.scale.setScalar(pulse);
      }
      rocket.position.y = Math.sin(elapsed * 0.7) * 0.035;
    },
    exit() {},
    dispose() {
      runtime.dispose();
      disposeScene(scene);
    },
  };
}
