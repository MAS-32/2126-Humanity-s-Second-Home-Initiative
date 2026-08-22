// ============================================================
// MoonIntegration — 月球模块 · 总工程整合层
//  目的：把 MoonScene 包装成可被《2126》统一入口/其他团队调用的
//        稳定公共 API（iframe 或同页嵌入），并提供 postMessage 桥。
//  用法（父工程）：
//    <iframe src="moon-outpost/…/moon-base.html" id="moon"></iframe>
//    moonEl.contentWindow.postMessage({ type:'moon:goto', page:'mars' }, '*');
//    moonEl.contentWindow.postMessage({ type:'moon:launch' }, '*');
//  或同页嵌入后读取 window.MoonModule 暴露的实例方法。
// ============================================================
import { INTEGRATION } from './MoonConfig.js';

export function mountMoonModule(moon) {
  // 状态事件 → 父页面（仅在有父窗口且开启桥时发送）
  const post = (payload) => {
    if (!INTEGRATION.msgBridge) return;
    try {
      if (window.parent && window.parent !== window) window.parent.postMessage(payload, '*');
    } catch (e) { /* 跨域静默 */ }
  };

  // 主线完成时上报（在 markVisited 中调用 notifyQuest）
  moon.notifyQuest = (p) => post({ type: 'moon:quest', id: p.id, done: true });
  // 发射成功上报（在 _updateLaunch 的 away 段调用 notifyLaunch）
  moon.notifyLaunch = () => post({ type: 'moon:launched' });

  // 父页面消息 → 驱动场景
  const onMessage = (e) => {
    if (e.source && e.source !== window.parent) return;
    const d = e && e.data;
    if (!d || typeof d.type !== 'string' || !d.type.startsWith('moon:')) return;
    switch (d.type) {
      case 'moon:goto': {
        const page = { moon: 'moon-base.html', hub: INTEGRATION.hubUrl, mars: INTEGRATION.marsUrl }[d.page];
        if (page && page !== location.pathname.split('/').pop()) window.location.href = page;
        break;
      }
      case 'moon:launch':
        if (typeof moon.launchRocket === 'function') moon.launchRocket();
        break;
      case 'moon:setQuest': {
        const q = moon.points && moon.points.find(p => (p.id === d.id || p.quest === d.id) && !p.sub);
        if (q) moon.completeQuest(q);
        break;
      }
    }
  };
  if (INTEGRATION.msgBridge) window.addEventListener('message', onMessage);

  // 稳定公共 API（对外契约，不随内部实现变化）
  const api = {
    id: 'moon-outpost-2126',
    version: '1.0.0',
    isReady: true,
    // 场景实例（高级用法，需内部结构知识）
    instance: moon,
    // —— 只读状态 ——
    getState: () => ({
      story: moon.story,
      quests: { done: [...moon.visited], progress: moon.visited.size },
      launch: moon.launchState ? moon.launchState() : 'idle',
      transit: moon.transit ? moon.transit.isOnline() : false,
    }),
    getCurrentQuest: () => {
      const q = moon.getCurrentQuest();
      return q ? { id: q.id, name: q.name, pos: { x: q.pos.x, z: q.pos.z } } : null;
    },
    // —— 指令 ——
    goto: (page) => onMessage({ data: { type: 'moon:goto', page } }),
    launch: () => moon.launchRocket && moon.launchRocket(),
    completeQuest: (id) => { const q = moon.points.find(p => (p.id === id || p.quest === id) && !p.sub); if (q) moon.completeQuest(q); },
    setViewMode: (mode) => { if (mode === 'first' || mode === 'third') { moon.viewMode = mode; moon.camera.fov = mode === 'third' ? moon.fovThird : moon.fovFirst; moon.camera.updateProjectionMatrix(); } },
    dispose: () => { window.removeEventListener('message', onMessage); if (moon.dispose) moon.dispose(); },
  };

  // 就绪上报
  post({ type: 'moon:ready', id: api.id });
  return api;
}
