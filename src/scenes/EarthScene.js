import * as THREE from 'three';
import { addCube, createBaseScene, disposeScene } from './sceneHelpers.js';

export function createEarthScene(ctx) {
  const scene = createBaseScene({ background: 0x87bfe8, ground: 0x4d8c57, name: 'earth' });
  const spawn = new THREE.Vector3(0, 1.7, 5);
  const earthTest = addCube(scene, {
    name: 'earth-interaction', color: 0x29b765, position: new THREE.Vector3(0, 1, 0),
  });
  const moonPortal = addCube(scene, {
    name: 'moon-portal', color: 0x2980d9, position: new THREE.Vector3(3, 1, 0),
  });

  ctx.interaction.add(earthTest, {
    text: 'Test Earth Interaction',
    distance: 7,
    onInteract() {
      ctx.state.set('visitedSolarSystem', true);
      ctx.state.set('talkedEarthAI', true);
      ctx.ui.flash('Earth interaction complete: visitedSolarSystem = true');
    },
  });
  ctx.interaction.add(moonPortal, {
    text: 'Travel to Moon',
    distance: 7,
    onInteract() { ctx.sceneManager.go('moon'); },
  });

  return {
    scene,
    spawn,
    enter() { ctx.ui.setScene('EARTH TEST SCENE'); },
    update() {},
    exit() {},
    dispose() { disposeScene(scene); },
  };
}
