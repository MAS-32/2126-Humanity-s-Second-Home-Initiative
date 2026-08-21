import * as THREE from 'three';
import { addCube, createBaseScene, disposeScene } from './sceneHelpers.js';

export function createMarsScene(ctx) {
  const scene = createBaseScene({ background: 0x37160f, ground: 0xaa4d32, name: 'mars' });
  const spawn = new THREE.Vector3(0, 1.7, 5);
  const earthPortal = addCube(scene, {
    name: 'earth-portal', color: 0x39a8db, position: new THREE.Vector3(0, 1, 0),
  });

  ctx.interaction.add(earthPortal, {
    text: 'Return to Earth',
    distance: 7,
    onInteract() { ctx.sceneManager.go('earth'); },
  });

  return {
    scene,
    spawn,
    enter() {
      ctx.state.set('arrivedMars', true);
      ctx.ui.setScene('MARS TEST SCENE');
      ctx.ui.flash('Mars reached: arrivedMars = true');
    },
    update() {},
    exit() {},
    dispose() { disposeScene(scene); },
  };
}
