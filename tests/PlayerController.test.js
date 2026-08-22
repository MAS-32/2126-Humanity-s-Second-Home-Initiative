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

function mouseMove(movementX, movementY) {
  const event = new MouseEvent('mousemove');
  Object.defineProperty(event, 'movementX', { value: movementX });
  Object.defineProperty(event, 'movementY', { value: movementY });
  document.dispatchEvent(event);
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

describe('PlayerController third-person mode', () => {
  it('moves the avatar relative to orbit yaw and follows with damped camera', () => {
    const { camera, canvas, player } = setup();
    const avatar = new THREE.Group();
    avatar.position.set(0, 0, 5);
    player.setThirdPerson({ target: avatar });
    // 切换瞬间相机立即吸附到角色后上方，无跳变
    expect(camera.position.z).toBeGreaterThan(5);
    expect(camera.position.y).toBeGreaterThan(1);

    document.pointerLockElement = canvas;
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }));
    player.update(0.1);
    expect(avatar.position.z).toBeCloseTo(4); // speed 10 × 0.1，朝 -z
    player.update(0.1);
    expect(camera.position.z).toBeGreaterThan(avatar.position.z); // 相机在角色身后
    player.dispose();
  });

  it('clamps orbit pitch and ignores mouse spikes', () => {
    const { canvas, player } = setup();
    const avatar = new THREE.Group();
    player.setThirdPerson({ target: avatar, minPitch: -0.3, maxPitch: 0.5, rotateSensitivity: 0.01 });
    document.pointerLockElement = canvas;
    for (let i = 0; i < 100; i += 1) mouseMove(0, 10);
    expect(player.orbitPitch).toBe(0.5); // 被 maxPitch 钳制
    mouseMove(500, 0); // 焦点恢复尖峰被过滤
    expect(player.orbitYaw).toBe(0);
    player.dispose();
  });

  it('teleport grounds the avatar, getPosition returns a defensive avatar clone', () => {
    const { camera, player } = setup();
    const avatar = new THREE.Group();
    player.setThirdPerson({ target: avatar });
    player.teleport(new THREE.Vector3(3, 1.7, -2));
    expect(avatar.position.toArray()).toEqual([3, 0, -2]); // 角色落地，y=0
    const position = player.getPosition();
    position.x = 99;
    expect(avatar.position.x).toBe(3);
    expect(camera.position.z).toBeGreaterThan(-2); // 相机已吸附到身后

    player.setFirstPerson();
    player.teleport(new THREE.Vector3(1, 2, 3));
    expect(camera.position.toArray()).toEqual([1, 2, 3]); // 第一人称行为恢复
    player.dispose();
  });

  it('setThirdPerson requires an Object3D target', () => {
    const { player } = setup();
    expect(() => player.setThirdPerson({ target: null })).toThrow(TypeError);
    player.dispose();
  });
});
