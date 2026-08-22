// 2126 城市生命维持网络状态面板（P0-8：世界观可视化）。
// 常驻左下角的极简环境 UI：评委无需读说明，一眼理解这座城市由 AI 统一协调。
// 数值为表现层微波动（无后台），DOM 由本模块创建并在 dispose() 移除。

const SYSTEMS = [
  { key: 'energy', label: '能源网络', value: () => '稳定', tone: 'ok' },
  { key: 'water', label: '水循环', value: (t) => `${(98.6 + Math.sin(t * 0.23) * 0.9).toFixed(1)}%`, tone: 'ok' },
  { key: 'carbon', label: '碳循环', value: () => '稳定', tone: 'ok' },
  { key: 'air', label: '空气质量', value: () => '优', tone: 'ok' },
  { key: 'climate', label: '气候调节', value: () => '运行中', tone: 'ok' },
  { key: 'grid', label: 'AI 城市协调网络', value: () => 'ONLINE', tone: 'ai' },
];

export function createCityStatus() {
  const root = document.createElement('div');
  root.className = 'earth-city-status';
  root.innerHTML = `
    <div class="earth-city-status-title">2126 城市生命维持网络</div>
    <div class="earth-city-status-rows"></div>
  `;
  const rowsEl = root.querySelector('.earth-city-status-rows');
  const valueEls = SYSTEMS.map((system) => {
    const row = document.createElement('div');
    row.className = 'earth-city-status-row';
    const dot = document.createElement('span');
    dot.className = `earth-city-status-dot is-${system.tone}`;
    const label = document.createElement('span');
    label.className = 'earth-city-status-label';
    label.textContent = system.label;
    const value = document.createElement('span');
    value.className = 'earth-city-status-value';
    value.textContent = system.value(0);
    row.append(dot, label, value);
    rowsEl.append(row);
    return { system, value };
  });
  document.body.append(root);

  let elapsed = 0;
  let refreshAccum = 99; // 立即刷新一次
  return {
    /** dt 驱动：低频刷新数值（0.5s 一次，避免 DOM 抖动） */
    update(dt) {
      elapsed += dt;
      refreshAccum += dt;
      if (refreshAccum < 0.5) return;
      refreshAccum = 0;
      valueEls.forEach(({ system, value }) => {
        value.textContent = system.value(elapsed);
      });
    },
    dispose() {
      root.remove();
    },
  };
}
