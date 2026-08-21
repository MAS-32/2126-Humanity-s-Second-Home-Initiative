import { describe, expect, it, vi } from 'vitest';
import { Game } from '../src/core/Game.js';

describe('Game disposal', () => {
  it('attempts all cleanup, removes listeners/canvas, nulls renderer, and remains idempotent after failures', async () => {
    const game = Object.create(Game.prototype);
    const canvas = document.createElement('canvas');
    document.body.append(canvas);
    const resizeListener = vi.fn();
    window.addEventListener('resize', resizeListener);
    const cleanup = {
      sceneManager: false,
      interaction: false,
      player: false,
      renderer: false,
      subscription: false,
    };

    const sceneManagerDispose = vi.fn(async () => {
      cleanup.sceneManager = true;
      throw new Error('scene manager failed');
    });
    const interactionDispose = vi.fn(() => {
      cleanup.interaction = true;
      throw new Error('interaction failed');
    });
    const playerDispose = vi.fn(() => {
      cleanup.player = true;
      throw new Error('player failed');
    });
    const rendererDispose = vi.fn(() => {
      cleanup.renderer = true;
      throw new Error('renderer failed');
    });
    const unsubscribeState = vi.fn(() => {
      cleanup.subscription = true;
      throw new Error('unsubscribe failed');
    });
    const cancelFrame = vi.fn(() => { throw new Error('cancel frame failed'); });
    vi.stubGlobal('cancelAnimationFrame', cancelFrame);

    game.disposed = false;
    game.running = true;
    game.frameId = 42;
    game.onResize = resizeListener;
    game.unsubscribeState = unsubscribeState;
    game.sceneManager = { dispose: sceneManagerDispose };
    game.interaction = { dispose: interactionDispose };
    game.player = { dispose: playerDispose };
    game.renderer = { dispose: rendererDispose, domElement: canvas };

    let disposalError;
    try {
      await game.dispose();
    } catch (error) {
      disposalError = error;
    }

    expect(disposalError).toBeInstanceOf(AggregateError);
    expect(disposalError.errors).toHaveLength(6);
    expect(cancelFrame).toHaveBeenCalledWith(42);
    expect(unsubscribeState).toHaveBeenCalledOnce();
    expect(sceneManagerDispose).toHaveBeenCalledOnce();
    expect(interactionDispose).toHaveBeenCalledOnce();
    expect(playerDispose).toHaveBeenCalledOnce();
    expect(rendererDispose).toHaveBeenCalledOnce();
    expect(cleanup).toEqual({
      sceneManager: true,
      interaction: true,
      player: true,
      renderer: true,
      subscription: true,
    });
    expect(game.disposed).toBe(true);
    expect(game.running).toBe(false);
    expect(game.frameId).toBeNull();
    expect(game.unsubscribeState).toBeNull();
    expect(game.renderer).toBeNull();
    expect(canvas.isConnected).toBe(false);
    window.dispatchEvent(new Event('resize'));
    expect(resizeListener).not.toHaveBeenCalled();

    await expect(game.dispose()).resolves.toBeUndefined();
    expect(sceneManagerDispose).toHaveBeenCalledOnce();
    expect(interactionDispose).toHaveBeenCalledOnce();
    vi.unstubAllGlobals();
  });
});
