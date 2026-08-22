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
    // 展厅解说 AI 是模态分支对话：关闭后才能继续其他交互
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
    await interact('moon-portal'); // 触发太空电梯上升演出（约 9.4s 的 dt 驱动序列）
    // 演出在场景 update(dt) 中推进：模拟帧推进直到转场完成
    for (let i = 0; i < 160 && state.get('currentScene') !== 'moon'; i += 1) {
      manager.getCurrentScene()?.update(0.1);
      await manager.queue;
    }
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
    // Earth 现有 6 个交互项：小满、展厅解说、M-07、A-12、登舱引导员、太空电梯
    expect(interaction.entries.size).toBe(6);
    expect(camera.position.toArray()).toEqual([0, 1.7, 5]);

    await manager.dispose();
    interaction.dispose();
  });
});
