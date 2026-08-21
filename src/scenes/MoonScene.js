import * as THREE from 'three';
import { addCube, createBaseScene, disposeScene } from './sceneHelpers.js';

export function createMoonScene(ctx) {
  const scene = createBaseScene({ background: 0x080b16, ground: 0x9aa0a8, name: 'moon' });
  const spawn = new THREE.Vector3(0, 1.7, 5);
  const scientist = addCube(scene, {
    name: 'moon-interaction', color: 0xe8e8dc, position: new THREE.Vector3(0, 1, 0),
  });
  const marsPortal = addCube(scene, {
    name: 'mars-portal', color: 0xd65432, position: new THREE.Vector3(3, 1, 0),
  });

  ctx.interaction.add(scientist, {
    text: 'Talk to Moon Scientist',
    distance: 7,
    onInteract() {
      ctx.state.set('talkedMoonScientist', true);
      ctx.ui.flash('Moon scientist interaction complete');
    },
  });
  ctx.interaction.add(marsPortal, {
    text: 'Travel to Mars',
    distance: 7,
    onInteract() { ctx.sceneManager.go('mars'); },
  });

  return {
    scene,
    spawn,
    enter() {
      ctx.state.set('arrivedMoon', true);
      ctx.ui.setScene('MOON TEST SCENE');
    },
    update() {},
    exit() {},
    dispose() { disposeScene(scene); },
  };
}
