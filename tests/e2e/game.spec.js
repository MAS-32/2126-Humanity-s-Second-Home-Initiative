import { expect, test } from '@playwright/test';

test('real browser runs interactions and repeated Earth → Moon → Mars flow cleanly', async ({ page }) => {
  // 太空电梯上升演出约 9.4 秒/次，两轮循环需要更长的测试超时
  test.setTimeout(120_000);
  const errors = [];
  page.on('console', (message) => {
    const knownHeadlessGpuDiagnostic = /GL Driver Message.*GPU stall due to ReadPixels/.test(message.text());
    if (message.type() === 'error' || (message.type() === 'warning' && !knownHeadlessGpuDiagnostic)) {
      errors.push(message.text());
    }
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('/');
  await expect(page.locator('#scene-label')).toHaveText('2126 · 地球');
  await expect(page.locator('canvas')).toHaveCount(1);

  async function interactWith(objectName) {
    const activeName = await page.evaluate((name) => {
      const game = window.__GAME__;
      const scene = game.sceneManager.getCurrentScene().scene;
      const object = scene.getObjectByName(name);
      const worldPosition = object.getWorldPosition(new window.__THREE_VECTOR3__());
      // 第三人称：候选基于星达与目标的距离，先把星达移到目标旁
      const avatar = scene.getObjectByName('xingda');
      if (avatar) {
        avatar.position.set(worldPosition.x + 1.5, 0, worldPosition.z + 1.5);
        avatar.updateMatrixWorld(true);
      }
      game.camera.lookAt(worldPosition);
      game.camera.updateMatrixWorld(true);
      game.interaction.update();
      const active = game.interaction.active?.root?.name ?? null;
      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE' }));
      return active;
    }, objectName);
    expect(activeName).toBe(objectName);
  }

  // Give the page a tiny constructor hook without importing a second Three.js copy.
  await page.evaluate(() => {
    window.__THREE_VECTOR3__ = window.__GAME__.camera.position.constructor;
  });
  async function runCycle() {
    await interactWith('earth-interaction');
    await expect.poll(() => page.evaluate(() => window.__GAME__.state.get('visitedSolarSystem'))).toBe(true);
    // 展厅解说 AI 是模态分支对话：Esc 关闭后再继续
    await page.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' })));
    await interactWith('moon-portal'); // 触发太空电梯上升演出（约 9.4s）
    await expect(page.locator('#scene-label')).toHaveText('MOON TEST SCENE', { timeout: 30_000 });
    await interactWith('moon-interaction');
    await expect.poll(() => page.evaluate(() => window.__GAME__.state.get('talkedMoonScientist'))).toBe(true);
    await interactWith('mars-portal');
    await expect(page.locator('#scene-label')).toHaveText('MARS TEST SCENE');
    await expect.poll(() => page.evaluate(() => window.__GAME__.state.get('arrivedMars'))).toBe(true);
    await interactWith('earth-portal');
    await expect(page.locator('#scene-label')).toHaveText('2126 · 地球');
  }

  await runCycle();
  await runCycle();

  expect(await page.locator('canvas').count()).toBe(1);
  // Earth 现有 6 个交互项：小满、展厅解说、M-07、A-12、登舱引导员、太空电梯
  expect(await page.evaluate(() => window.__GAME__.interaction.entries.size)).toBe(6);
  expect(errors).toEqual([]);
});

test('pointer lock movement works and blur clears held movement', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#scene-label')).toHaveText('2126 · 地球');
  const canvas = page.locator('canvas');
  await canvas.click({ position: { x: 300, y: 300 } });
  await expect.poll(() => page.evaluate(() => document.pointerLockElement?.tagName)).toBe('CANVAS');
  const before = await page.evaluate(() => window.__GAME__.player.getPosition().z);
  await page.keyboard.down('w');
  await page.waitForTimeout(200);
  await page.evaluate(() => window.dispatchEvent(new Event('blur')));
  const blurred = await page.evaluate(() => window.__GAME__.player.getPosition().z);
  await page.waitForTimeout(200);
  const after = await page.evaluate(() => window.__GAME__.player.getPosition().z);
  await page.keyboard.up('w');
  expect(blurred).not.toBe(before);
  expect(after).toBeCloseTo(blurred, 3);
});
