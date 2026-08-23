import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { OpeningScene, PHASES } from '../src/opening/OpeningScene.js';
import { shouldSkipOpening } from '../src/opening/bootPolicy.js';

// jsdom 不实现媒体播放：开场只在 moon 阶段调 play()（带 .catch 兜底）、
// enter() 调 pause()，测试里统一打桩保持安静且确定。
beforeEach(() => {
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(() => Promise.resolve());
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  document.querySelector('.opening-scene')?.remove();
  sessionStorage.clear();
});

describe('boot policy', () => {
  it('skips the opening only when the hub earth entry flags ?skip-opening', () => {
    expect(shouldSkipOpening('?skip-opening')).toBe(true);
    expect(shouldSkipOpening('?debug=1&skip-opening')).toBe(true);
    expect(shouldSkipOpening('')).toBe(false);
    expect(shouldSkipOpening('?debug=1')).toBe(false);
  });
});

describe('OpeningScene', () => {
  it('exposes the staged cinematic timeline used by the intro', () => {
    expect(PHASES).toEqual([
      [0, 'boot'],
      [2000, 'moon'],
      [8000, 'route'],
      [10000, 'title'],
    ]);
  });

  it('starts at the boot stage with video, skip and enter controls', () => {
    const opening = new OpeningScene({ video: 'assets/earth-civilization.mp4', onEnter: vi.fn() });
    opening.start();

    const el = document.querySelector('.opening-scene');
    expect(el).toBeTruthy();
    expect(el.dataset.stage).toBe('boot');
    expect(el.querySelector('video.opening-video[src="assets/earth-civilization.mp4"]')).toBeTruthy();
    // 开场归属地球关卡：HUD 文明节点为地球（内部 stage 名 'moon' 仅为代码标识）
    expect(el.querySelector('.opening-hud-left strong').textContent).toBe('地球');
    expect(el.querySelector('.opening-skip')).toBeTruthy();
    expect(el.querySelector('.opening-enter')).toBeTruthy();
  });

  it('skip jumps straight to the title stage without entering', () => {
    const onEnter = vi.fn();
    const opening = new OpeningScene({ video: 'assets/earth-civilization.mp4', onEnter });
    opening.start();

    document.querySelector('.opening-skip').click();
    expect(document.querySelector('.opening-scene').dataset.stage).toBe('title');
    expect(onEnter).not.toHaveBeenCalled();
  });

  it('enter marks the session, fires onEnter and removes the overlay', () => {
    vi.useFakeTimers();
    try {
      const onEnter = vi.fn();
      const opening = new OpeningScene({ video: 'assets/earth-civilization.mp4', onEnter });
      opening.start();

      document.querySelector('.opening-enter').click();
      // 同标签页内随后落地前哨站（public/outpost/）靠这个标记跳过自己的开场
      expect(sessionStorage.getItem('opening2126Seen')).toBe('1');
      expect(onEnter).toHaveBeenCalledTimes(1);
      expect(document.querySelector('.opening-scene').classList.contains('is-leaving')).toBe(true);

      vi.advanceTimersByTime(1000);
      expect(document.querySelector('.opening-scene')).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });
});
