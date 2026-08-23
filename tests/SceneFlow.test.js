import * as THREE from 'three';
import { describe, expect, it, vi } from 'vitest';
import { GameState } from '../src/core/GameState.js';
import { InteractionSystem } from '../src/core/InteractionSystem.js';
import { SceneManager } from '../src/core/SceneManager.js';
import { createEarthScene } from '../src/scenes/EarthScene.js';
import { createMoonScene } from '../src/scenes/MoonScene.js';
import { createMarsScene } from '../src/scenes/MarsScene.js';

// jsdom 中不真实请求星达 GLB：loadAsync 永久挂起，星达保持占位体
vi.mock('three/addons/loaders/GLTFLoader.js', () => ({
  GLTFLoader: class {
    loadAsync() {
      return new Promise(() => {});
    }
  },
}));

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
      const scene = manager.getCurrentScene().scene;
      const object = scene.getObjectByName(name);
      object.updateWorldMatrix(true, true);
      const targetPos = object.getWorldPosition(new THREE.Vector3());
      // 第三人称：交互候选基于玩家（星达）与目标的距离，先把星达移到目标旁
      const avatar = scene.getObjectByName('xingda');
      if (avatar) {
        avatar.position.set(targetPos.x + 1.5, 0, targetPos.z + 1.5);
        avatar.updateMatrixWorld(true);
      } else {
        targetPos.y += 1.4;
        camera.position.set(targetPos.x, targetPos.y, targetPos.z + 4);
      }
      camera.lookAt(targetPos);
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
    expect(interaction.entries.size).toBe(4);
    await interact('moon-interaction');
    expect(state.get('talkedMoonScientist')).toBe(true);
    expect(state.get('moon').observatoryVisited).toBe(true);
    await interact('mars-portal');
    expect(state.get('currentScene')).toBe('mars');
    expect(state.get('arrivedMars')).toBe(true);
    expect(interaction.entries.size).toBe(3);
    await interact('mars-moon-portal');
    expect(state.get('currentScene')).toBe('moon');
    await interact('moon-earth-portal');
    expect(state.get('currentScene')).toBe('earth');

    // The moon rocket is a second route to Mars and reuses the same SceneManager.
    await manager.go('moon');
    await interact('moon-rocket');
    expect(state.get('currentScene')).toBe('mars');
    await interact('earth-portal');
    expect(state.get('currentScene')).toBe('earth');
    // Earth 现有 6 个交互项：小满、展厅解说、M-07、A-12、登舱引导员、太空电梯
    expect(interaction.entries.size).toBe(6);
    expect(camera.position.toArray()).toEqual([0, 1.7, 5]);
    expect(state.get('moon').visits).toBe(3);
    expect(state.get('mars').visits).toBe(2);

    await manager.dispose();
    interaction.dispose();
  });
});
