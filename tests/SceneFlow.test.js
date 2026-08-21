import * as THREE from 'three';
import { describe, expect, it, vi } from 'vitest';
import { GameState } from '../src/core/GameState.js';
import { InteractionSystem } from '../src/core/InteractionSystem.js';
import { SceneManager } from '../src/core/SceneManager.js';
import { createEarthScene } from '../src/scenes/EarthScene.js';
import { createMoonScene } from '../src/scenes/MoonScene.js';
import { createMarsScene } from '../src/scenes/MarsScene.js';

describe('actual scene integration flow', () => {
  it('uses one state/interaction manager through Earth → Moon → Mars → Earth', async () => {
    const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 100);
    const state = new GameState();
    const prompt = { show: vi.fn(), hide: vi.fn(), dispose: vi.fn() };
    const interaction = new InteractionSystem({ camera, promptAdapter: prompt });
    const player = {
      teleport(position) {
        camera.position.copy(position);
        camera.updateMatrixWorld(true);
      },
    };
    const ui = { setScene: vi.fn(), flash: vi.fn() };
    const ctx = { camera, renderer: {}, player, interaction, state, sceneManager: null, ui };
    const manager = new SceneManager({ ctx, state, player, interaction });
    ctx.sceneManager = manager;
    manager.register('earth', createEarthScene).register('moon', createMoonScene).register('mars', createMarsScene);

    const interact = async (name) => {
      const object = manager.getCurrentScene().scene.getObjectByName(name);
      object.updateWorldMatrix(true, true);
      camera.lookAt(object.getWorldPosition(new THREE.Vector3()));
      camera.updateMatrixWorld(true);
      interaction.update();
      expect(interaction.active?.root).toBe(object);
      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE' }));
      await manager.queue;
    };

    await manager.go('earth');
    expect(camera.position.toArray()).toEqual([0, 1.7, 5]);
    await interact('earth-interaction');
    expect(state.get('visitedSolarSystem')).toBe(true);
    await interact('moon-portal');
    expect(state.get('currentScene')).toBe('moon');
    expect(state.get('arrivedMoon')).toBe(true);
    expect(interaction.entries.size).toBe(2);
    await interact('moon-interaction');
    expect(state.get('talkedMoonScientist')).toBe(true);
    await interact('mars-portal');
    expect(state.get('currentScene')).toBe('mars');
    expect(state.get('arrivedMars')).toBe(true);
    expect(interaction.entries.size).toBe(1);
    await interact('earth-portal');
    expect(state.get('currentScene')).toBe('earth');
    expect(interaction.entries.size).toBe(2);
    expect(camera.position.toArray()).toEqual([0, 1.7, 5]);

    await manager.dispose();
    interaction.dispose();
  });
});
