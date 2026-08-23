import { expect, test } from '@playwright/test';
import { dismissOpening } from './helpers.js';

// 无头 Chromium 不授予指针锁定（Playwright/Chromium 已知限制，
// microsoft/playwright#20956），因此本文件顶层切换为有头模式验证真实锁定行为。
test.use({ headless: false });

test('pointer lock movement works and blur clears held movement', async ({ page }) => {
  await page.goto('/');
  await dismissOpening(page);
  await expect(page.locator('#scene-label')).toHaveText('2126 · 地球');
  // 有头窗口必须是最前台 OS 窗口，否则 Chrome 以误导性的 WrongDocumentError
  // 拒绝指针锁（document.hasFocus() 仍为 true）——点击画布前强制置前。
  await page.bringToFront();
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
