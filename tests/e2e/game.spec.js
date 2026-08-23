import { expect, test } from '@playwright/test';
import { collectConsoleErrors, dismissOpening } from './helpers.js';

async function bootEarthGame(page, { checkOpening = false } = {}) {
  await page.goto('/');
  if (checkOpening) {
    // 开屏渲染每次加载都播放：标题屏文案存在（处于隐藏舞台，文本仍可断言）
    await expect(page.locator('.opening-scene .opening-title h1')).toHaveText('人类第二家园计划');
    // 开场归属地球：HUD 文明节点为地球
    await expect(page.locator('.opening-hud-left strong')).toHaveText('地球');
  }
  // 跳过开场 → 进入 2126 → 地球关卡在其后才创建
  await dismissOpening(page);
  await expect(page.locator('#scene-label')).toHaveText('2126 · 地球');
  await expect(page.locator('canvas')).toHaveCount(1);
  // 等待 GLB 未来城市模型异步加载完成（真实浏览器网络加载）
  await expect.poll(
    () => page.evaluate(() => window.__GAME__.state.get('earthCityModel')),
    { timeout: 20_000 },
  ).toBe(true);
  // Give the page a tiny constructor hook without importing a second Three.js copy.
  await page.evaluate(() => {
    window.__THREE_VECTOR3__ = window.__GAME__.camera.position.constructor;
  });
}

async function interactWith(page, objectName) {
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

test('full triangle: Earth → outpost rocket → Mars chapter → back via hub', async ({ page }) => {
  // 开屏渲染 + 电梯升空演出 + 火箭发射演出 + 月面转场,全链路需要更长超时
  test.setTimeout(240_000);
  const errors = [];
  collectConsoleErrors(page, errors);

  await bootEarthGame(page, { checkOpening: true });
  await interactWith(page, 'earth-interaction');
  await expect.poll(() => page.evaluate(() => window.__GAME__.state.get('visitedSolarSystem'))).toBe(true);
  // 展厅解说 AI 是模态分支对话：Esc 关闭后再继续
  await page.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' })));
  await interactWith(page, 'moon-portal'); // 触发太空电梯上升演出
  // 演出结束 + 白场章节标题停留后，整页跳转到独立月球前哨站（public/outpost/ 静态站）
  await page.waitForURL('**/outpost/moon-base.html', { timeout: 30_000 });
  await expect(page.locator('#backBtn')).toBeVisible();

  // 对接一：月球火箭发射演出落幕 → 火星章节（auto-enter + auto-land 直达地表探索）。
  // 前哨站世界构建需要时间：等发射状态机进入 idle 再点火。点火后同步快进
  // _updateLaunch——无头渲染负载会把 dt 驱动的演出拖慢数倍，直接以固定步长
  // 推进状态机直到触发跨页交接（handoff），不依赖渲染帧率。
  await page.waitForFunction(
    () => window.moon?.launchState?.() === 'idle',
    null,
    { timeout: 30_000 },
  );
  const launchEnd = await page.evaluate(() => {
    const m = window.moon;
    if (!m.launchRocket()) return 'not-started';
    for (let i = 0; i < 6000 && m._launch && !m._launch.handoff; i += 1) m._updateLaunch(0.05);
    return m._launch?.state ?? 'gone';
  });
  expect(launchEnd).toBe('cooldown');
  await page.waitForURL(/\/mars\/index\.html/, { timeout: 30_000 });
  await page.waitForFunction(() => window.MarsModule?.ready === true, null, { timeout: 20_000 });
  await expect(page.locator('#exploreHud')).toBeVisible({ timeout: 15_000 }); // auto-land 进入地表探索

  // 对接三：探索模式下导航面板隐藏——先「返回轨道」，再同页跳回月球前哨站
  await page.evaluate(() => document.getElementById('btnSurface')?.click());
  await page.waitForFunction(
    () => getComputedStyle(document.getElementById('nav')).display !== 'none',
    null,
    { timeout: 10_000 },
  );
  await page.evaluate(() => document.querySelector('#nav button[data-nav="moon"]').click());
  await page.waitForURL('**/outpost/moon-base.html', { timeout: 15_000 });

  // 月面视频转场：枢纽 → 月球「开始探索」→ 转场覆盖层 → 前哨站
  await page.evaluate(() => document.getElementById('backBtn').click());
  await page.waitForURL('**/outpost/solar-hub.html', { timeout: 10_000 });
  await page.evaluate(() => document.querySelector('#missionList .msn[data-m="moon"]').click());
  await page.waitForSelector('#moonJump video', { timeout: 5_000 });
  await expect(page.locator('#moonJump .moon-jump-skip')).toBeVisible();
  await page.locator('#moonJump .moon-jump-skip').click();
  await page.waitForURL('**/outpost/moon-base.html', { timeout: 10_000 });

  // 对接二 + 回程闭环：枢纽 → 火星「开始探索」直达火星章节;再回枢纽 → 地球直达(不重播开屏)
  await page.evaluate(() => document.getElementById('backBtn').click());
  await page.waitForURL('**/outpost/solar-hub.html', { timeout: 10_000 });
  await page.evaluate(() => document.querySelector('#missionList .msn[data-m="mars"]').click());
  await page.waitForURL(/\/mars\/index\.html/, { timeout: 15_000 });
  await page.waitForFunction(() => window.MarsModule?.ready === true, null, { timeout: 20_000 });
  // 此入口无 auto 参数：模块显示自己的标题过场（不强制进入），导航按钮仍可用
  await page.evaluate(() => document.querySelector('#nav button[data-nav="earth"]').click());
  await page.waitForURL((url) => url.pathname === '/' && url.searchParams.has('skip-opening'), { timeout: 15_000 });
  await expect(page.locator('#scene-label')).toHaveText('2126 · 地球', { timeout: 10_000 });
  await expect(page.locator('.opening-scene')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('in-page Earth → Moon → Mars adapter switching stays on one canvas', async ({ page }) => {
  // 电梯已改为跨页交接；适配器版月球/火星的浏览器回归经 SceneManager 直达
  test.setTimeout(120_000);
  const errors = [];
  collectConsoleErrors(page, errors);

  await bootEarthGame(page);
  await page.evaluate(() => window.__GAME__.sceneManager.go('moon'));
  await expect(page.locator('#scene-label')).toHaveText('月球 · 静海前哨');
  await interactWith(page, 'moon-interaction');
  await expect.poll(() => page.evaluate(() => window.__GAME__.state.get('talkedMoonScientist'))).toBe(true);
  await interactWith(page, 'mars-portal');
  await expect(page.locator('#scene-label')).toHaveText('火星 · 曙光城');
  await expect.poll(() => page.evaluate(() => window.__GAME__.state.get('arrivedMars'))).toBe(true);
  // 往返一轮回到地球，验证反复切换与单画布所有权
  await page.evaluate(() => window.__GAME__.sceneManager.go('moon'));
  await expect(page.locator('#scene-label')).toHaveText('月球 · 静海前哨');
  await interactWith(page, 'moon-earth-portal');
  await expect(page.locator('#scene-label')).toHaveText('2126 · 地球');

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

// 指针锁定用例移至 pointer-lock.spec.js：无头 Chromium 不授予指针锁定
//（Playwright/Chromium 已知限制，microsoft/playwright#20956），需单独有头运行。
