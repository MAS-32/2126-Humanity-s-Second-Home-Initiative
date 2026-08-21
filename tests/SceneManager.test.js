import * as THREE from 'three';
import { describe, expect, it, vi } from 'vitest';
import { GameState } from '../src/core/GameState.js';
import { InteractionSystem } from '../src/core/InteractionSystem.js';
import { SceneManager } from '../src/core/SceneManager.js';

function createHarness() {
  const state = new GameState();
  const player = { teleport: vi.fn() };
  const interaction = { clear: vi.fn() };
  const ctx = { state };
  const manager = new SceneManager({ ctx, state, player, interaction });
  ctx.sceneManager = manager;
  return { state, player, interaction, ctx, manager };
}

function factory(name, log, state) {
  return () => {
    const scene = new THREE.Scene();
    scene.name = name;
    return {
      scene,
      spawn: new THREE.Vector3(name.length, 1, 2),
      enter: vi.fn(() => log.push(`${name}:enter`)),
      update: vi.fn(() => state.set(`${name}Updated`, true)),
      exit: vi.fn(() => log.push(`${name}:exit`)),
      dispose: vi.fn(() => log.push(`${name}:dispose`)),
    };
  };
}

describe('SceneManager', () => {
  it('runs Earth → Moon → Mars → Earth lifecycle in order with shared state', async () => {
    const { manager, state, player, interaction } = createHarness();
    const log = [];
    manager.register('earth', factory('earth', log, state));
    manager.register('moon', factory('moon', log, state));
    manager.register('mars', factory('mars', log, state));

    await manager.go('earth');
    const oldEarth = manager.getCurrentScene();
    state.set('visitedSolarSystem', true);
    await manager.go('moon');
    manager.update(0.016);
    expect(oldEarth.update).not.toHaveBeenCalled();
    expect(state.get('visitedSolarSystem')).toBe(true);
    expect(state.get('moonUpdated')).toBe(true);
    await manager.go('mars');
    await manager.go('earth');

    expect(log).toEqual([
      'earth:enter', 'earth:exit', 'earth:dispose',
      'moon:enter', 'moon:exit', 'moon:dispose',
      'mars:enter', 'mars:exit', 'mars:dispose', 'earth:enter',
    ]);
    expect(state.get('currentScene')).toBe('earth');
    expect(player.teleport).toHaveBeenCalledTimes(4);
    expect(interaction.clear).toHaveBeenCalledTimes(4);
    await manager.dispose();
  });

  it('rejects unknown scenes with a clear error and serializes rapid transitions', async () => {
    const { manager, state } = createHarness();
    const log = [];
    manager.register('earth', factory('earth', log, state));
    manager.register('moon', factory('moon', log, state));
    await expect(manager.go('not-exist')).rejects.toThrow('Unknown scene');
    await Promise.all([manager.go('earth'), manager.go('moon'), manager.go('earth')]);
    expect(manager.currentName).toBe('earth');
    await manager.dispose();
  });

  it('makes old interactions non-actionable before awaiting async exit', async () => {
    const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 100);
    const prompt = { show: vi.fn(), hide: vi.fn(), dispose: vi.fn() };
    const interaction = new InteractionSystem({ camera, promptAdapter: prompt });
    const state = new GameState();
    const player = { teleport: (position) => camera.position.copy(position) };
    const ctx = { camera, interaction, state, player, sceneManager: null };
    const manager = new SceneManager({ ctx, state, player, interaction });
    ctx.sceneManager = manager;
    let releaseExit;
    const exitGate = new Promise((resolve) => { releaseExit = resolve; });
    const staleAction = vi.fn();

    manager.register('earth', () => {
      const scene = new THREE.Scene();
      const target = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial());
      target.position.z = -3;
      scene.add(target);
      interaction.add(target, { distance: 4, onInteract: staleAction });
      return { scene, spawn: new THREE.Vector3(), exit: () => exitGate, dispose() {} };
    });
    manager.register('moon', () => ({ scene: new THREE.Scene(), spawn: new THREE.Vector3(), dispose() {} }));

    await manager.go('earth');
    interaction.update();
    expect(interaction.active).not.toBeNull();
    const transition = manager.go('moon');
    await Promise.resolve();
    expect(interaction.enabled).toBe(false);
    expect(interaction.active).toBeNull();
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE' }));
    expect(staleAction).not.toHaveBeenCalled();
    releaseExit();
    await transition;
    expect(interaction.enabled).toBe(true);

    await manager.dispose();
    interaction.dispose();
  });

  it('cleans registrations/resources after factory and enter failures, keeps state coherent, and recovers queue', async () => {
    const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 100);
    const prompt = { show: vi.fn(), hide: vi.fn(), dispose: vi.fn() };
    const interaction = new InteractionSystem({ camera, promptAdapter: prompt });
    const state = new GameState();
    const player = { teleport: vi.fn() };
    const ctx = { camera, interaction, state, player, sceneManager: null };
    const manager = new SceneManager({ ctx, state, player, interaction });
    ctx.sceneManager = manager;
    const failedEnterDispose = vi.fn();

    manager.register('factory-fail', () => {
      interaction.add(new THREE.Group(), { onInteract() {} });
      throw new Error('factory exploded');
    });
    manager.register('enter-fail', () => {
      interaction.add(new THREE.Group(), { onInteract() {} });
      return {
        scene: new THREE.Scene(),
        spawn: new THREE.Vector3(1, 2, 3),
        enter: () => Promise.reject(new Error('enter exploded')),
        dispose: failedEnterDispose,
      };
    });
    manager.register('earth', () => ({ scene: new THREE.Scene(), spawn: new THREE.Vector3(), dispose() {} }));

    await expect(manager.go('factory-fail')).rejects.toThrow('factory exploded');
    expect(interaction.entries.size).toBe(0);
    expect(interaction.enabled).toBe(true);
    expect(manager.getCurrentScene()).toBeNull();
    expect(state.get('currentScene')).toBeNull();

    await expect(manager.go('enter-fail')).rejects.toThrow('enter exploded');
    expect(failedEnterDispose).toHaveBeenCalledOnce();
    expect(interaction.entries.size).toBe(0);
    expect(interaction.enabled).toBe(true);
    expect(manager.getCurrentScene()).toBeNull();
    expect(state.get('currentScene')).toBeNull();

    await expect(manager.go('earth')).resolves.toMatchObject({ scene: expect.any(THREE.Scene) });
    expect(manager.currentName).toBe('earth');
    expect(state.get('currentScene')).toBe('earth');
    await manager.dispose();
    interaction.dispose();
  });

  it('attempts every disposal stage and clears registries when both exit and dispose throw', async () => {
    const state = new GameState();
    const player = { teleport: vi.fn() };
    const interaction = {
      enabled: true,
      entries: new Set(),
      setEnabled: vi.fn(function setEnabled(enabled) { this.enabled = enabled; }),
      clear: vi.fn(function clear() { this.entries.clear(); }),
    };
    const ctx = { state, player, interaction, sceneManager: null };
    const manager = new SceneManager({ ctx, state, player, interaction });
    ctx.sceneManager = manager;
    const exit = vi.fn(() => { throw new Error('exit cleanup failed'); });
    const dispose = vi.fn(() => { throw new Error('scene resource cleanup failed'); });

    manager.register('earth', () => {
      interaction.entries.add('earth-registration');
      return { scene: new THREE.Scene(), spawn: new THREE.Vector3(), exit, dispose };
    });
    manager.register('unused', () => ({ scene: new THREE.Scene(), spawn: new THREE.Vector3() }));
    await manager.go('earth');

    let disposalError;
    try {
      await manager.dispose();
    } catch (error) {
      disposalError = error;
    }

    expect(disposalError).toBeInstanceOf(AggregateError);
    expect(disposalError.errors).toHaveLength(2);
    expect(exit).toHaveBeenCalledOnce();
    expect(dispose).toHaveBeenCalledOnce();
    expect(interaction.clear).toHaveBeenCalled();
    expect(interaction.entries.size).toBe(0);
    expect(interaction.enabled).toBe(false);
    expect(manager.factories.size).toBe(0);
    expect(manager.getCurrentScene()).toBeNull();
    expect(manager.currentName).toBeNull();
    expect(state.get('currentScene')).toBeNull();
    await expect(manager.dispose()).resolves.toBeUndefined();
    expect(exit).toHaveBeenCalledOnce();
    expect(dispose).toHaveBeenCalledOnce();
  });
});
