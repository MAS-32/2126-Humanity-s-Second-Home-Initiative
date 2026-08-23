import { expect } from '@playwright/test';

export function collectConsoleErrors(page, errors) {
  // 无头环境两类已知噪音:GPU stall 警告、指针锁定拒绝(文档焦点限制,见 pointer-lock.spec)
  const knownHeadlessNoise = /GL Driver Message.*GPU stall due to ReadPixels|pointer lock/i;
  page.on('console', (message) => {
    if (message.type() === 'error' || (message.type() === 'warning' && !knownHeadlessNoise.test(message.text()))) {
      if (!knownHeadlessNoise.test(message.text())) errors.push(message.text());
    }
  });
  page.on('pageerror', (error) => {
    if (!knownHeadlessNoise.test(error.message)) errors.push(error.message);
  });
}

// 主入口每次加载都完整播放开屏渲染：跳过直达标题屏 → 进入 2126。
// 游戏本体（canvas / __GAME__）在 enter 之后才创建。
export async function dismissOpening(page) {
  const opening = page.locator('.opening-scene');
  await expect(opening).toBeVisible();
  await page.locator('.opening-skip').click();
  await page.locator('.opening-enter').click();
  await expect(opening).toHaveCount(0, { timeout: 5_000 });
}
