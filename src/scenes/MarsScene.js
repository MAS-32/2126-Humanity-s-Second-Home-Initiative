import * as THREE from 'three';
import { addCube, createBaseScene, disposeScene } from './sceneHelpers.js';

export function createMarsScene(ctx) {
  const scene = createBaseScene({ background: 0x37160f, ground: 0xaa4d32, name: 'mars' });
  const spawn = new THREE.Vector3(0, 1.7, 5);
  const earthPortal = addCube(scene, {
    name: 'earth-portal', color: 0x39a8db, position: new THREE.Vector3(0, 1, 0),
  });

  ctx.interaction.add(earthPortal, {
    text: '返回地球',
    distance: 7,
    onInteract() { ctx.sceneManager.go('earth'); },
  });

  return {
    scene,
    spawn,
    enter() {
      ctx.state.set('arrivedMars', true);
      ctx.ui.setScene('火星 · 第二家园');
      ctx.ui.flash('已抵达火星前哨——第二家园建设进行中。');
    },
    update() {},
    exit() {},
    dispose() { disposeScene(scene); },
  };
}
