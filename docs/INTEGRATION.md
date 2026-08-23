# 总工程整合说明（mars-civilization-2126）

> 《2126：人类第二家园计划》· 火星章节 接入规范
>
> 本文档面向**总工程（统一入口 / 地球 / 月球 / 太阳系档案）**，说明如何把火星模块整合进主工程。
> 协议设计对齐总工程 `moon-outpost` 的 `moon:*` 消息范式。

---

## 一、两种整合方式

| 方式 | 适用场景 | 成本 |
| --- | --- | --- |
| **A. iframe + postMessage 桥**（推荐） | 总工程以 iframe 嵌入火星模块独立页面，跨模块导航/控制 | 零代码改动，部署即用 |
| **B. 源码级 barrel import** | 总工程与火星模块**同页共场景**，直接 import 命名模块 | 需同页共享 renderer 环境 |

### 方式 A：iframe 嵌入

```html
<iframe
  id="mars-module"
  src="https://<部署地址>/"
  style="width:100vw;height:100vh;border:0"
  allow="fullscreen"
></iframe>
```

```js
const mars = document.getElementById('mars-module');
// 等待 ready
window.addEventListener('message', (ev) => {
  if (ev.data && ev.data.type === 'mars:ready') {
    // 火星模块已就绪，可发送控制指令
    mars.contentWindow.postMessage({ type: 'mars:tour', on: true }, '*');
  }
});
```

### 方式 B：源码级 import

```js
import { marsGroup, CITY_SITES, terrainH, flyTo,
         enterCity, exitCity, enterSurface, exitSurface,
         PlayerController, GlobalCompanion, CONFIG } from 'mars-civilization-2126';
```

> ⚠️ 本模块当前为**单例架构**（renderer/scene/城市状态为模块级共享）。同页共场景时请确保仅实例化一次，
> 且 `src/core/renderer.js` 会读取页面中的 `#scene` 画布。若总工程需要**同页多实例**或
> `createMarsScene(ctx)` 工厂契约（shared-core 规范），参考实现见共享仓库
> `MAS-32/2126-Humanity-s-Second-Home-Initiative` 的 `feature/mars` 分支早期重构，或联系模块维护者做上下文化改造。

---

## 二、postMessage 协议（`mars:*`）

父页面 → 火星 iframe，`postMessage` 负载格式：

```js
{ type: '<消息>', ...参数 }
```

| 消息 | 参数 | 行为 |
| --- | --- | --- |
| `mars:ready` | — | **火星 → 父**：模块就绪广播（`{ id, version }`） |
| `mars:enterCity` | `city: 'capital'` | 飞入指定城市（capital/eco/industrial/mining/frontier/research） |
| `mars:exitCity` | — | 返回行星轨道 |
| `mars:tour` | `on: true/false` | 开/关城市巡览 |
| `mars:xray` | `on: true/false` | 开/关地下水冰透视 |
| `mars:explore` | `on: true/false` | 进入/退出地表探索 |
| `mars:land` | `city: 'verde'` | 着陆到指定城市地表 |
| `mars:setViewMode` | `mode: 'first'/'third'` | 切换探索视角 |
| `mars:goto` | `page: 'earth'/'moon'/'hub'` | 跨模块跳转（需配置跳转地址） |

示例：

```js
mars.contentWindow.postMessage({ type: 'mars:enterCity', city: 'capital' }, '*');
mars.contentWindow.postMessage({ type: 'mars:xray', on: true }, '*');
mars.contentWindow.postMessage({ type: 'mars:explore', on: true }, '*');
```

---

## 三、同页全局 API（`window.MarsModule`）

火星模块在独立页面内暴露稳定 API，父页面同源时可直接调用：

```js
window.MarsModule = {
  id: 'mars-civilization-2126',
  version: '1.0.0',
  ready: true,
  enterCity(key),        // 飞入城市
  exitCity(),            // 返回轨道
  tour(on),              // 巡览开关
  xray(on),              // 透视开关
  explore(on),           // 地表探索开关
  land(key),             // 着陆城市
  setViewMode(mode),     // first / third
  goto(page),            // earth / moon / hub
};
```

---

## 四、跨模块跳转配置

父页面可注入跳转地址（三选一）：

1. **页面级注入**（iframe 嵌入前，在火星页面的父窗口设置）：
   ```js
   // 若父页面与火星模块同源，可在 iframe 加载后注入
   // 更可靠：iframe 的 sandbox 允许下，用 postMessage 传 env（见下）
   ```

2. **postMessage 传递 env**（推荐，无需改部署）：
   ```js
   mars.contentWindow.postMessage({
     type: 'mars:env',
     env: { hubUrl: 'https://hub.example.com/',
            earthUrl: 'https://earth.example.com/',
            moonUrl: 'https://moon.example.com/' }
   }, '*');
   ```
   > 当前版本为方便直接读取全局变量，也可在部署前将跳转地址写入
   > `window.MARS_INTEGRATION_ENV = { hubUrl, earthUrl, moonUrl }`（部署时在 `index.html` 内联）。

3. **构建期环境变量**（本模块自身支持 Vite 环境变量）：
   ```bash
   VITE_HUB_URL=https://hub.example.com/ npm run build
   ```

---

## 五、部署注意事项

- `vite.config.js` 使用相对 base（`'./'`），iframe / 子路径部署资源路径正确。
- 单页应用，无后端路由，无需 SPA fallback；`vercel.json` / `netlify.toml` 已含兜底。
- iframe 嵌入时建议 `allow="fullscreen"`，火星模块自身不使用 Pointer Lock。
- 纹理为真实 NASA 图片（`public/textures/`），体积约百 KB 级。

---

## 六、验证清单（总工程接入后）

1. iframe 加载 → 收到 `mars:ready`。
2. 发送 `mars:enterCity` → 画面飞入对应城市。
3. 发送 `mars:tour` / `mars:xray` / `mars:explore` → 各模式正常切换。
4. 发送 `mars:goto` → 跳转到配置的目标章节（无配置时仅提示）。
5. 刷新页面 → 模块恢复初始状态，无 404。
