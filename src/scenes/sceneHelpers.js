import * as THREE from 'three';

export function createBaseScene({ background, ground, name }) {
  const scene = new THREE.Scene();
  scene.name = name;
  scene.background = new THREE.Color(background);

  const ambient = new THREE.HemisphereLight(0xffffff, 0x334455, 1.5);
  scene.add(ambient);
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(4, 8, 5);
  scene.add(sun);

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({ color: ground, roughness: 0.9 }),
  );
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);
  return scene;
}

export function addCube(scene, { name, color, position }) {
  const group = new THREE.Group();
  group.name = name;
  group.position.copy(position);
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2, 1.5),
    new THREE.MeshStandardMaterial({ color }),
  );
  mesh.name = `${name}-mesh`;
  group.add(mesh);
  scene.add(group);
  return group;
}

export function disposeScene(scene) {
  scene.traverse((object) => {
    object.geometry?.dispose();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => {
      if (!material) return;
      // 一并释放材质引用的纹理（如 CanvasTexture 名牌），避免显存泄漏
      ['map', 'emissiveMap', 'normalMap', 'roughnessMap', 'alphaMap'].forEach((key) => {
        material[key]?.dispose?.();
      });
      material.dispose();
    });
  });
  scene.clear();
}

/**
 * Applies scene-owned camera/renderer settings without creating another runtime.
 * The returned cleanup restores every shared setting when the scene is left.
 */
export function createSceneRuntimeAdapter(ctx, {
  bodyClass,
  camera = {},
  renderer = {},
} = {}) {
  const sharedCamera = ctx.camera;
  const sharedRenderer = ctx.renderer;
  const previous = {
    fov: sharedCamera.fov,
    near: sharedCamera.near,
    far: sharedCamera.far,
    toneMappingExposure: sharedRenderer?.toneMappingExposure,
    shadowEnabled: sharedRenderer?.shadowMap?.enabled,
  };
  let active = false;

  return {
    enter() {
      if (active) return;
      active = true;
      if (camera.fov != null) sharedCamera.fov = camera.fov;
      if (camera.near != null) sharedCamera.near = camera.near;
      if (camera.far != null) sharedCamera.far = camera.far;
      sharedCamera.rotation.set(camera.pitch ?? 0, camera.yaw ?? 0, 0, 'YXZ');
      sharedCamera.updateProjectionMatrix();
      if (renderer.toneMappingExposure != null && sharedRenderer) {
        sharedRenderer.toneMappingExposure = renderer.toneMappingExposure;
      }
      if (renderer.shadows != null && sharedRenderer?.shadowMap) {
        sharedRenderer.shadowMap.enabled = renderer.shadows;
      }
      if (bodyClass) document.body.classList.add(bodyClass);
    },

    dispose() {
      if (!active) return;
      active = false;
      sharedCamera.fov = previous.fov;
      sharedCamera.near = previous.near;
      sharedCamera.far = previous.far;
      sharedCamera.updateProjectionMatrix();
      if (sharedRenderer && previous.toneMappingExposure != null) {
        sharedRenderer.toneMappingExposure = previous.toneMappingExposure;
      }
      if (sharedRenderer?.shadowMap && previous.shadowEnabled != null) {
        sharedRenderer.shadowMap.enabled = previous.shadowEnabled;
      }
      if (bodyClass) document.body.classList.remove(bodyClass);
    },
  };
}

export function patchWorldState(state, world, values) {
  state.set(world, { ...(state.get(world) ?? {}), ...values });
}

export function createTravelGate({ name, color, position, scale = 1 }) {
  const group = new THREE.Group();
  group.name = name;
  group.position.copy(position);

  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x8d9aaa,
    roughness: 0.36,
    metalness: 0.72,
  });
  const glowMaterial = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  for (const side of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.16, 2.8, 10), frameMaterial);
    post.position.set(side * 1.05, 1.4, 0);
    group.add(post);
  }
  const beam = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.18, 0.2), frameMaterial);
  beam.position.y = 2.8;
  group.add(beam);
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(1.95, 2.65), glowMaterial);
  glow.position.y = 1.35;
  group.add(glow);
  const beacon = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 12, 8),
    new THREE.MeshBasicMaterial({ color }),
  );
  beacon.position.y = 3.1;
  group.add(beacon);
  group.scale.setScalar(scale);
  group.userData.beacon = beacon;
  return group;
}
