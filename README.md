# Moon Outpost 2126 · 月球前哨城市模块

《2126：人类第二家园计划》大型未来文明探索项目中的**独立子模块**。包含四个页面闭环：

| 页面 | 文件 | 说明 |
|---|---|---|
| 月球前哨城市 | `moon-base.html` | 主场景：开场动画 → 3D 探索（四大区域 / 主线任务 / 轨道列车 / 人类 NPC / 火箭发射） |
| 太阳系枢纽 | `solar-hub.html` | Solar Hub：文明档案中心，可跳转月球 / 火星 |
| 火星曙光城 | `mars-city.html` | 火星殖民城市入口场景 |
| 入口 | `index.html` | 0 秒跳转 `moon-base.html` |

> 本项目可**单独启动、单独部署、零外部后端依赖**；同时预留了被《2126》总工程统一入口跳转 / iframe 嵌入的整合接口（见 [整合说明](#五总工程整合说明)）。

---

## 一、快速开始

```bash
git clone --branch feature/moon-outpost --single-branch https://github.com/MAS-32/2126-Humanity-s-Second-Home-Initiative.git moon-outpost-2126
cd moon-outpost-2126
npm install          # 零运行时依赖，立即完成
npm run dev          # 打开 http://127.0.0.1:8123/
```

| 命令 | 说明 |
|---|---|
| `npm run dev` | 开发服务器（端口 8123，禁用缓存，JS 改动即时生效） |
| `npm run build` | 语法自检 + 生成 `public/` 部署产物 |
| `npm run preview` | 本地预览构建产物（端口 4173，模拟线上静态托管） |
| `npm run check` | 全部 JS/MJS 语法健康检查 |
| `npm run test` | 碰撞可达性回归 + 开场时间轴自检 |

## 二、技术栈

- **纯前端、零构建、零运行时依赖**：无 npm 包、无打包器、无后端。
- **Three.js 0.160.0**（ES Module + importmap，jsDelivr CDN）。
- **原生 WebGL 着色器**（行星 / 地球 / 星空）+ 全程序化美术（建筑、角色、NPC、列车均为代码生成）。
- **零外部二进制资产**（唯一素材：开场视频 `assets/moon-civilization.mp4`）。
- 原生 Web Audio（火箭发射程序化轰鸣）。

## 三、目录结构

```
moon-outpost-2126/
├── src/                      # ★ 源码（= 站点根，dev 直接服务此目录）
│   ├── index.html            #   入口（跳转 moon-base.html）
│   ├── moon-base.html        #   月球主场景（MoonScene + 开场）
│   ├── solar-hub.html        #   太阳系枢纽
│   ├── mars-city.html        #   火星曙光城
│   ├── js/                   #   ES 模块（见「模块划分」）
│   ├── opening/              #   开场动画组件（js / css / test）
│   ├── assets/               #   静态素材（mp4）
│   └── test/                 #   回归测试与开发预览页
├── public/                   # 构建产物（npm run build 生成；部署根；不入库）
├── scripts/                  # 零依赖工具：dev / build / preview / check
├── docs/                     # HANDOFF.md（交接）· OPENING_SCENE.md（开场说明）
├── package.json
├── README.md
├── deployment.md             # 部署指南（Cloudflare / Vercel / Netlify）
└── .env.example              # 环境变量说明（本模块无必填项）
```

## 四、模块划分（Scene / Character / Interaction / Animation / Data）

| 类别 | 文件 | 职责 |
|---|---|---|
| **Data 数据配置** | `js/MoonConfig.js` | 区域 / 交互点 / 主线 / 车站 / 轨道 / NPC 台词 / **INTEGRATION 整合配置** |
| **Scene 场景组件** | `js/MoonTerrain.js` `MoonMaterials.js` `MoonBuilders.js` `CentralHub.js` `EcoDome.js` `ResearchVillage.js` `RocketPort.js` `MoonInfrastructure.js` `MoonCitySystems.js` | 地形 / 材质 / 零件库 / 四区建筑 / 城市设施 |
| **Character 角色** | `js/Xingda.js` | 星达（程序化模型 + 8 态情绪状态机 + GLB 替换预留接口） |
| | `js/MoonNPCs.js` | 人类 NPC（人形 + 待机 / 玩家感知 / 对话转身） |
| **Interaction 交互** | `js/MoonTransit.js`（列车）/ `js/MoonMarkers.js`（标记）/ `js/MoonColliders.js`（碰撞） | 玩法交互系统 |
| **Animation 动画** | `js/Xingda.js`（Animator）/ `opening/OpeningScene.js` | 角色动画 / 开场时间轴 |
| **Integration 整合** | `js/MoonIntegration.js` | 公共 API 工厂 + postMessage 桥（新增，本模块对外契约） |

**减少硬编码**：页面跳转 URL、跨场景地址集中在 `MoonConfig.js → INTEGRATION`；主场景回跳已改为读配置。

## 五、总工程整合说明

三种接入方式，任选其一：

1. **统一入口跳转（最简单）**：总工程导航直接指向本模块页面
   `https://<部署域名>/moon-base.html`（或 `/` 经 index 跳转）。

2. **iframe 嵌入 + postMessage（推荐）**：
   ```html
   <iframe src="https://<部署域名>/moon-base.html" id="moonFrame"></iframe>
   ```
   ```js
   const m = document.getElementById('moonFrame').contentWindow;
   m.postMessage({ type: 'moon:goto', page: 'mars' }, '*');    // 跳转场景
   m.postMessage({ type: 'moon:launch' }, '*');                // 触发火箭发射
   ```
   模块向父页面回报：`moon:ready` / `moon:quest`（主线完成）/ `moon:launched`（发射）。
   协议完整定义见 `src/js/MoonConfig.js → INTEGRATION` 注释。

3. **同页 API（高级）**：页面内 `window.MoonModule` 提供
   `getState() / getCurrentQuest() / goto(page) / launch() / completeQuest(id) / setViewMode(mode) / dispose()`。

## 六、已知问题

- **Pointer Lock**：无头浏览器 / 部分内嵌环境无法获取指针锁定，开场遮罩不会自动消失（真实桌面浏览器正常）。
- **浏览器自动播放策略**：开场视频静音自动播放；需用户点击后才启用音效（含发射轰鸣）。
- **移动端**：以桌面体验为主，未做完整触屏适配。
- **发射承接**：运输舰升空后淡出并在 12 秒后就位下一艘；真实火星航行承接（`mars-city.html`）为页面跳转形态，尚未做"飞行中"过场。
- **Three.js CDN**：`three@0.160.0` 走 jsDelivr，离线环境需本地化（见 `deployment.md`）。

## 七、交付地址

- GitHub：<https://github.com/MAS-32/2126-Humanity-s-Second-Home-Initiative/tree/feature/moon-outpost>
- 在线版本：<https://moon-outpost-2126.pages.dev/>
