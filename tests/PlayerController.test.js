import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { PlayerController } from '../src/core/PlayerController.js';

function setup() {
  const canvas = document.createElement('canvas');
  document.body.append(canvas);
  Object.defineProperty(document, 'pointerLockElement', { configurable: true, writable: true, value: null });
  const camera = new THREE.PerspectiveCamera();
  const player = new PlayerController({ camera, domElement: canvas, speed: 10 });
  return { camera, canvas, player };
}

describe('PlayerController', () => {
  it('teleports and returns a defensive position clone', () => {
    const { camera, player } = setup();
    player.teleport(new THREE.Vector3(1, 2, 3));
    const position = player.getPosition();
    position.x = 99;
    expect(camera.position.toArray()).toEqual([1, 2, 3]);
    player.dispose();
  });

  it('moves by delta time only while pointer locked and enabled', () => {
    const { camera, canvas, player } = setup();
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }));
    player.update(0.1);
    expect(camera.position.z).toBe(0);

    document.pointerLockElement = canvas;
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }));
    player.update(0.1);
    expect(camera.position.z).toBeCloseTo(-1);
    player.setEnabled(false);
    player.update(0.1);
    expect(camera.position.z).toBeCloseTo(-1);
    player.dispose();
  });

  it('clears held keys on blur and removes listeners on dispose', () => {
    const { camera, canvas, player } = setup();
    document.pointerLockElement = canvas;
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyD' }));
    window.dispatchEvent(new Event('blur'));
    player.update(0.1);
    expect(camera.position.x).toBe(0);
    player.dispose();
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }));
    player.update(0.1);
    expect(camera.position.z).toBe(0);
  });
});
