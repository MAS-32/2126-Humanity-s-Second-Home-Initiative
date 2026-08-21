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
    if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
    else object.material?.dispose();
  });
  scene.clear();
}
