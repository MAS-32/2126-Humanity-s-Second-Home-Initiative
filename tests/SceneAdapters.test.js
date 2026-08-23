import * as THREE from 'three';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { GameState } from '../src/core/GameState.js';
import { createMarsScene } from '../src/scenes/MarsScene.js';
import { createMoonScene } from '../src/scenes/MoonScene.js';

function createContext() {
  const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 500);
  const renderer = { toneMappingExposure: 1, shadowMap: { enabled: false } };
  const interaction = {
    add: vi.fn(),
    setProximitySource: vi.fn(),
  };
  const player = { setFirstPerson: vi.fn() };
  const state = new GameState();
  return {
    camera,
    renderer,
    interaction,
    player,
    state,
    sceneManager: { go: vi.fn() },
    ui: { setScene: vi.fn(), flash: vi.fn() },
  };
}

afterEach(() => {
  document.body.className = '';
});

describe('Moon and Mars scene adapters', () => {
  it.each([
    ['moon', createMoonScene, 64, 700, 4],
    ['mars', createMarsScene, 67, 600, 3],
  ])('%s consumes shared runtime settings and restores them on dispose', (
    world,
    factory,
    expectedFov,
    expectedFar,
    expectedInteractions,
  ) => {
    const ctx = createContext();
    const module = factory(ctx);

    expect(ctx.player.setFirstPerson).toHaveBeenCalledOnce();
    expect(ctx.interaction.setProximitySource).toHaveBeenCalledWith(null);
    expect(ctx.interaction.add).toHaveBeenCalledTimes(expectedInteractions);

    module.enter();
    module.update(0.016);
    expect(ctx.camera.fov).toBe(expectedFov);
    expect(ctx.camera.far).toBe(expectedFar);
    expect(ctx.renderer.shadowMap.enabled).toBe(true);
    expect(document.body.classList.contains(`scene-${world}`)).toBe(true);
    expect(ctx.state.get(world).visits).toBe(1);

    module.dispose();
    expect(ctx.camera.fov).toBe(70);
    expect(ctx.camera.far).toBe(500);
    expect(ctx.renderer.toneMappingExposure).toBe(1);
    expect(ctx.renderer.shadowMap.enabled).toBe(false);
    expect(document.body.classList.contains(`scene-${world}`)).toBe(false);
    expect(module.scene.children).toHaveLength(0);
  });
});
