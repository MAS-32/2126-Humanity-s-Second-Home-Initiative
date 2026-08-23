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
  // 等待 GLB 未来城市模型异步加载完成（真实浏览器网络加载）
  await expect.poll(
    () => page.evaluate(() => window.__GAME__.state.get('earthCityModel')),
    { timeout: 20_000 },
  ).toBe(true);

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
      } else {
        worldPosition.y += 1.4;
        game.camera.position.set(worldPosition.x, worldPosition.y, worldPosition.z + 4);
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
  async function runCycle(returnViaMoon = false) {
    await interactWith('earth-interaction');
    await expect.poll(() => page.evaluate(() => window.__GAME__.state.get('visitedSolarSystem'))).toBe(true);
    // 展厅解说 AI 是模态分支对话：Esc 关闭后再继续
    await page.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' })));
    await interactWith('moon-portal'); // 触发太空电梯上升演出（约 9.4s）
    await expect(page.locator('#scene-label')).toHaveText('月球 · 静海前哨', { timeout: 30_000 });
    await interactWith('moon-interaction');
    await expect.poll(() => page.evaluate(() => window.__GAME__.state.get('talkedMoonScientist'))).toBe(true);
    await interactWith('mars-portal');
    await expect(page.locator('#scene-label')).toHaveText('火星 · 曙光城');
    await expect.poll(() => page.evaluate(() => window.__GAME__.state.get('arrivedMars'))).toBe(true);
    if (returnViaMoon) {
      await interactWith('mars-moon-portal');
      await expect(page.locator('#scene-label')).toHaveText('月球 · 静海前哨');
      await interactWith('moon-earth-portal');
    } else {
      await interactWith('earth-portal');
    }
    await expect(page.locator('#scene-label')).toHaveText('2126 · 地球');
  }

  await runCycle();
  await runCycle(true);

  expect(await page.locator('canvas').count()).toBe(1);
  // Earth 交互项 = 6 个原有（小满/展厅/M-07/A-12/引导员/电梯）+ GLB 模型的 20 个
  // （中央文明塔 + 磁悬浮网络代理点 + 18 架飞行器）= 26；只约束下界，给资产调整留弹性
  expect(await page.evaluate(() => window.__GAME__.interaction.entries.size)).toBeGreaterThanOrEqual(24);
  // 关键交互对象仍然存在且可寻址
  for (const name of ['earth-interaction', 'moon-portal', 'INTERACT_CentralSpire', 'INTERACT_TransitNetwork']) {
    expect(await page.evaluate((n) => Boolean(window.__GAME__.sceneManager.getCurrentScene().scene.getObjectByName(n)), name)).toBe(true);
  }
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
