import * as THREE from 'three';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { GameState } from '../src/core/GameState.js';
import { InteractionSystem } from '../src/core/InteractionSystem.js';
import { createEarthScene } from '../src/scenes/EarthScene.js';

// jsdom 中不真实请求星达 GLB：loadAsync 永久挂起，星达保持青蓝占位体，测试保持确定
vi.mock('three/addons/loaders/GLTFLoader.js', () => ({
  GLTFLoader: class {
    loadAsync() {
      return new Promise(() => {});
    }
  },
}));

function makeCtx() {
  const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 500);
  const prompt = { show: vi.fn(), hide: vi.fn(), dispose: vi.fn() };
  const interaction = new InteractionSystem({ camera, promptAdapter: prompt });
  const state = new GameState();
  const player = {
    setEnabled: vi.fn(),
    setThirdPerson: vi.fn(),
    setFirstPerson: vi.fn(),
    setObstacles: vi.fn(),
    teleport: vi.fn(),
    keys: new Set(),
  };
  const ui = { setScene: vi.fn(), flash: vi.fn() };
  const sceneManager = { go: vi.fn() };
  return { camera, renderer: {}, player, interaction, state, sceneManager, ui };
}

const key = (code) => document.dispatchEvent(new KeyboardEvent('keydown', { code }));

describe('EarthScene', () => {
  let ctx;
  let earth;

  afterEach(() => {
    earth?.dispose();
    ctx?.interaction.dispose();
    earth = null;
    ctx = null;
  });

  it('registers xiaoman, hall guide, three NPCs and the space elevator', () => {
    ctx = makeCtx();
    earth = createEarthScene(ctx);

    expect(earth.scene.isScene).toBe(true);
    expect(earth.spawn.toArray()).toEqual([0, 1.7, 5]);
    expect(ctx.interaction.entries.size).toBe(6);
    ['earth-ai-companion', 'earth-interaction', 'moon-portal', 'npc-m07', 'npc-a12', 'npc-guide']
      .forEach((name) => expect(earth.scene.getObjectByName(name), name).toBeTruthy());
    // 星达作为第三人称化身注入 PlayerController（Core 不认识具体角色）
    expect(earth.scene.getObjectByName('xingda')).toBeTruthy();
    expect(ctx.player.setThirdPerson).toHaveBeenCalledWith(
      expect.objectContaining({ target: earth.scene.getObjectByName('xingda') }),
    );
    // 第三人称配套：碰撞障碍注入 + 交互候选源指向星达
    expect(ctx.player.setObstacles).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ r: expect.any(Number) })]));
    expect(ctx.interaction.proximitySource).toBe(earth.scene.getObjectByName('xingda'));
    // 目标引导 HUD 已创建
    expect(document.querySelector('.earth-objective')).toBeTruthy();
  });

  it('hall guide opens modal branch dialogue, marks visitedSolarSystem, restores input on close', () => {
    ctx = makeCtx();
    earth = createEarthScene(ctx);
    const consoleObject = earth.scene.getObjectByName('earth-interaction');
    ctx.interaction.entries.get(consoleObject).onInteract();

    expect(ctx.state.get('visitedSolarSystem')).toBe(true);
    expect(ctx.player.setEnabled).toHaveBeenLastCalledWith(false);
    expect(ctx.interaction.enabled).toBe(false);

    // 菜单有 3 个分支；按 1 进入第一支（4 轮台词），E 推进后回到菜单，Esc 关闭
    expect(document.querySelectorAll('.earth-dialog-branch').length).toBe(3);
    key('Digit1');
    for (let i = 0; i < 30 && document.querySelectorAll('.earth-dialog-branch').length === 0; i += 1) key('KeyE');
    expect(document.querySelectorAll('.earth-dialog-branch').length).toBe(3); // 回到菜单
    key('Escape');
    expect(document.querySelector('.earth-dialog')).toBeNull();
    expect(ctx.player.setEnabled).toHaveBeenLastCalledWith(true);
    expect(ctx.interaction.enabled).toBe(true);
  });

  it('NPC branch dialogues open and close cleanly', () => {
    ctx = makeCtx();
    earth = createEarthScene(ctx);
    ['npc-m07', 'npc-a12', 'npc-guide'].forEach((name) => {
      const npc = earth.scene.getObjectByName(name);
      ctx.interaction.entries.get(npc).onInteract();
      expect(document.querySelector('.earth-dialog')).toBeTruthy();
      expect(document.querySelectorAll('.earth-dialog-branch').length).toBe(3);
      key('Escape');
      expect(document.querySelector('.earth-dialog')).toBeNull();
      expect(ctx.interaction.enabled).toBe(true);
    });
  });

  it('elevator guide departure branch triggers the ascent cutscene', () => {
    ctx = makeCtx();
    earth = createEarthScene(ctx);
    const guide = earth.scene.getObjectByName('npc-guide');
    ctx.interaction.entries.get(guide).onInteract();

    key('Digit3'); // 登舱确认与行程启动
    for (let i = 0; i < 20 && document.querySelector('.earth-dialog'); i += 1) key('KeyE');
    expect(document.querySelector('.earth-dialog')).toBeNull();
    // 分支 action 触发演出：输入被演出接管
    expect(ctx.player.setEnabled).toHaveBeenLastCalledWith(false);
    expect(ctx.interaction.enabled).toBe(false);

    // 推进演出直到转场
    for (let i = 0; i < 120 && !ctx.sceneManager.go.mock.calls.length; i += 1) earth.update(0.1);
    expect(ctx.sceneManager.go).toHaveBeenCalledWith('moon');
    // 转场前输入已恢复（SceneManager 需要捕获 enabled=true）
    expect(ctx.player.setEnabled).toHaveBeenLastCalledWith(true);
    expect(ctx.interaction.enabled).toBe(true);
  });

  it('moon-portal starts ascent instead of instant teleport', () => {
    ctx = makeCtx();
    earth = createEarthScene(ctx);
    const portal = earth.scene.getObjectByName('moon-portal');
    const { text, onInteract } = ctx.interaction.entries.get(portal);

    expect(text).toBe('进入太空电梯');
    onInteract();
    expect(ctx.sceneManager.go).not.toHaveBeenCalled(); // 不再立即跳场景
    expect(document.querySelector('.earth-skip-hint')).toBeTruthy(); // 演出期间显示跳过提示
    for (let i = 0; i < 120 && !ctx.sceneManager.go.mock.calls.length; i += 1) earth.update(0.1);
    expect(ctx.sceneManager.go).toHaveBeenCalledWith('moon');
    expect(document.querySelector('.earth-skip-hint')).toBeNull(); // 演出结束提示移除
    // 演出创建了临时地月视觉对象（随 dispose 清理）
    expect(earth.scene.getObjectByName('ascent-moon')).toBeTruthy();
    expect(earth.scene.getObjectByName('ascent-earth')).toBeTruthy();
  });

  it('dispose is idempotent, restores first-person and cleans all DOM', () => {
    ctx = makeCtx();
    earth = createEarthScene(ctx);
    const robot = earth.scene.getObjectByName('earth-ai-companion');
    ctx.interaction.entries.get(robot).onInteract(); // 打开小满对话再销毁，验证强制清理

    expect(() => earth.update(0.016)).not.toThrow();
    earth.dispose();
    earth.dispose(); // 幂等

    expect(document.querySelector('.earth-dialog')).toBeNull();
    expect(document.querySelector('.earth-fade')).toBeNull();
    expect(document.querySelector('.earth-objective')).toBeNull(); // 引导 HUD 已移除
    expect(earth.scene.children.length).toBe(0);
    expect(ctx.player.setFirstPerson).toHaveBeenCalled();
    expect(ctx.player.setEnabled).toHaveBeenLastCalledWith(true);
    expect(ctx.interaction.enabled).toBe(true);
    expect(ctx.interaction.proximitySource).toBeNull(); // 候选源已归还，不泄漏到其他场景
  });

  it('repeated create/dispose cycles do not accumulate DOM or interaction entries', () => {
    ctx = makeCtx();
    for (let i = 0; i < 3; i += 1) {
      const instance = createEarthScene(ctx);
      // SceneManager 切换时会 clear()；每次重建后应恰好是 6 个交互项，不累积
      expect(ctx.interaction.entries.size).toBe(6);
      instance.dispose();
      ctx.interaction.clear();
    }
    expect(document.querySelector('.earth-dialog')).toBeNull();
    expect(document.querySelectorAll('.earth-fade').length).toBe(0);
  });
});
