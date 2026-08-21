import * as THREE from 'three';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { GameState } from '../src/core/GameState.js';
import { InteractionSystem } from '../src/core/InteractionSystem.js';
import { createEarthScene } from '../src/scenes/EarthScene.js';

function makeCtx() {
  const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 500);
  const prompt = { show: vi.fn(), hide: vi.fn(), dispose: vi.fn() };
  const interaction = new InteractionSystem({ camera, promptAdapter: prompt });
  const state = new GameState();
  const player = { setEnabled: vi.fn(), teleport: vi.fn() };
  const ui = { setScene: vi.fn(), flash: vi.fn() };
  const sceneManager = { go: vi.fn() };
  return { camera, renderer: {}, player, interaction, state, sceneManager, ui };
}

const pressE = () => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE' }));

describe('EarthScene', () => {
  let ctx;
  let earth;

  afterEach(() => {
    earth?.dispose();
    ctx?.interaction.dispose();
    earth = null;
    ctx = null;
  });

  it('registers companion robot, hall console and space elevator interactions', () => {
    ctx = makeCtx();
    earth = createEarthScene(ctx);

    expect(earth.scene.isScene).toBe(true);
    expect(earth.spawn.toArray()).toEqual([0, 1.7, 5]);
    expect(ctx.interaction.entries.size).toBe(3);
    expect(earth.scene.getObjectByName('earth-interaction')).toBeTruthy();
    expect(earth.scene.getObjectByName('moon-portal')).toBeTruthy();
    expect(earth.scene.getObjectByName('earth-ai-companion')).toBeTruthy();
  });

  it('hall console marks visitedSolarSystem and pages info panel without pausing input', () => {
    ctx = makeCtx();
    earth = createEarthScene(ctx);
    const consoleObject = earth.scene.getObjectByName('earth-interaction');
    const { onInteract } = ctx.interaction.entries.get(consoleObject);

    onInteract();
    expect(ctx.state.get('visitedSolarSystem')).toBe(true);
    expect(document.querySelector('.earth-info-panel')).toBeTruthy();
    // 非模态：不触碰玩家与交互系统
    expect(ctx.player.setEnabled).not.toHaveBeenCalled();
    expect(ctx.interaction.enabled).toBe(true);

    onInteract();
    onInteract();
    const text = document.querySelector('.earth-info-panel .earth-info-text').textContent;
    expect(text.length).toBeGreaterThan(0);
  });

  it('robot dialogue pauses input, advances with E, closes and restores input', () => {
    ctx = makeCtx();
    earth = createEarthScene(ctx);
    const robot = earth.scene.getObjectByName('earth-ai-companion');
    const { onInteract } = ctx.interaction.entries.get(robot);

    onInteract();
    expect(ctx.state.get('talkedEarthAI')).toBe(true);
    expect(ctx.player.setEnabled).toHaveBeenLastCalledWith(false);
    expect(ctx.interaction.enabled).toBe(false);
    expect(document.querySelector('.earth-dialog')).toBeTruthy();

    // E 键由对话接管：打字补全 → 翻页 → 直至关闭（8 行台词，每行至多两次按键）
    for (let i = 0; i < 20 && document.querySelector('.earth-dialog'); i += 1) pressE();
    expect(document.querySelector('.earth-dialog')).toBeNull();
    expect(ctx.player.setEnabled).toHaveBeenLastCalledWith(true);
    expect(ctx.interaction.enabled).toBe(true);
  });

  it('space elevator triggers fade and travels to moon', () => {
    ctx = makeCtx();
    earth = createEarthScene(ctx);
    const portal = earth.scene.getObjectByName('moon-portal');
    const { text, onInteract } = ctx.interaction.entries.get(portal);

    expect(text).toBe('进入太空电梯');
    onInteract();
    expect(ctx.ui.flash).toHaveBeenCalled();
    expect(ctx.sceneManager.go).toHaveBeenCalledWith('moon');
  });

  it('update(dt) animates without throwing and dispose is idempotent and leak-free', () => {
    ctx = makeCtx();
    earth = createEarthScene(ctx);
    const robot = earth.scene.getObjectByName('earth-ai-companion');
    ctx.interaction.entries.get(robot).onInteract(); // 打开对话再销毁，验证强制清理

    expect(() => earth.update(0.016)).not.toThrow();
    const keydownTarget = document;
    earth.dispose();
    earth.dispose(); // 幂等

    expect(document.querySelector('.earth-dialog')).toBeNull();
    expect(document.querySelector('.earth-info-panel')).toBeNull();
    expect(document.querySelector('.earth-fade')).toBeNull();
    expect(earth.scene.children.length).toBe(0);
    // dispose 后输入必须恢复，不能泄漏到下一个场景
    expect(ctx.player.setEnabled).toHaveBeenLastCalledWith(true);
    expect(ctx.interaction.enabled).toBe(true);
    expect(keydownTarget).toBeTruthy();
  });

  it('repeated create/dispose cycles do not accumulate DOM or interaction entries', () => {
    ctx = makeCtx();
    for (let i = 0; i < 3; i += 1) {
      const instance = createEarthScene(ctx);
      // SceneManager 切换时会 clear()；每次重建后应恰好是 3 个交互项，不累积
      expect(ctx.interaction.entries.size).toBe(3);
      instance.dispose();
      ctx.interaction.clear();
    }
    expect(document.querySelector('.earth-dialog')).toBeNull();
    expect(document.querySelector('.earth-info-panel')).toBeNull();
    expect(document.querySelectorAll('.earth-fade').length).toBe(0);
  });
});
