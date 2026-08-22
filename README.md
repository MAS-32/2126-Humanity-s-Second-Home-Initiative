# 2126 · 火星文明（Mars Civilization 2126）

> 《2126：人类第二家园计划》大型未来文明探索项目 · **火星章节独立子模块**
>
> 程序化生成的 Three.js 火星文明场景：行星轨道俯瞰、地下水冰透视、地表城市漫游、星达（Xingda）同伴互动。
> 既可**单独运行 / 部署**，也可作为总工程的**可集成模块**。

---

## 一、项目定位

| 项 | 说明 |
|---|---|
| 所属总工程 | 《2126：人类第二家园计划》（地球 / 月球 / 火星 / 太阳系档案 …） |
| 本模块 | 火星章节（Mars Civilization） |
| 渲染方式 | 全程序化生成，**无外部 3D 模型依赖**（角色在放入 GLB 前以代理模型运行） |
| 依赖 | 仅 `three`（npm） |
| 视觉基调 | 橙红荒漠 × 透明穹顶 × 青色生命光 × 金属轨道设施 |

---

## 二、工程结构

```
mars-civilization-2126/
├── index.html              # Vite 入口（HUD 标记 + 加载 /src/main.js）
├── src/
│   ├── main.js             # 【运行时】统一编排入口（源自已验证原型，保证独立运行稳定）
│   ├── index.js            # 【集成 API】总工程统一引入桶文件（Barrel）
│   ├── data/               # Data 模块：世界观 / 配置 / 资源路径（消除硬编码）
│   │   └── index.js
│   ├── core/               # 基础设施：renderer / config / state / random / assets
│   ├── scene/              # Scene 模块：地形 / 城市 / 大气 / 冰层 / 轨道
│   ├── character/          # Character 模块：玩家控制 / 星达适配器 / NPC
│   ├── interaction/        # Interaction 模块：镜头 / 漫游 / 导览 / 透视
│   ├── surface/            # 地表城市子场景构建
│   ├── animation/          # Animation 模块：动画循环
│   └── ui/                 # UI 模块：信息面板 / 引导
├── public/                 # 静态资源（Vite 原样拷贝，按 base 解析路径）
│   ├── textures/           # 火星表面 / 凹凸 / 雕像 / 头像贴图
│   └── assets/characters/  # 角色 GLB 放入处（缺失则自动回退代理模型）
├── docs/
│   └── mars-civilization-2126-design.md   # 章节设计案
├── .github/workflows/      # GitHub Pages 自动部署
├── vite.config.js
├── package.json
├── .env.example
├── README.md
├── deployment.md
├── vercel.json             # Vercel 部署配置（推荐）
└── netlify.toml            # Netlify 部署配置
```

**模块边界（与总工程对齐）**

| 模块 | 目录 | 职责 |
|---|---|---|
| Scene | `src/scene` | 星球 / 地貌 / 城市 / 大气 / 冰层 / 轨道 |
| Character | `src/character` | 玩家控制器、星达同伴、NPC |
| Interaction | `src/interaction` | 镜头补间、地表漫游、导览、地下水冰透视 |
| Animation | `src/animation` | 动画循环与状态驱动 |
| Data | `src/data` | 世界观数值、渲染配置、资源路径（全部集中，零硬编码） |

---

## 三、技术栈

- **渲染**：[Three.js](https://threejs.org/) `^0.160`（WebGL2）
- **后处理**：EffectComposer + UnrealBloomPass + OutputPass（泛光 / 色调映射）
- **构建**：[Vite](https://vitejs.dev/) `^5`（ESM、HMR、按 base 产出相对路径）
- **资产加载**：TextureLoader（贴图）、GLTFLoader（角色，动态 import，缺失容错）
- **程序化内容**：Simplex/FBM 噪声生成地形、陨石坑、城市、星云、卫星
- **运行环境**：现代浏览器（桌面 / 移动端均支持；移动端自动降像素比）

---

## 四、本地运行

```bash
# 1. 克隆
git clone https://github.com/xiyue6263-tech/mars-civilization-2126.git
cd mars-civilization-2126

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev          # 默认 http://localhost:5173

# 生产构建与本地预览
npm run build
npm run preview      # 默认 http://localhost:4173
```

> 要求 Node ≥ 18。首次 `npm install` 仅需联网获取 `three` 与 `vite`。

---

## 五、环境变量

复制 `.env.example` 为 `.env` 后按需修改（全部可选）：

| 变量 | 默认 | 说明 |
|---|---|---|
| `VITE_BASE` | `./` | 部署基础路径。`./` 适配任意子路径（GitHub Pages / 总工程嵌套）；`/` 用于域名根 |
| `VITE_APP_TITLE` | 2126 · MARS CIVILIZATION | 页面标题 |
| `VITE_SHOW_STATS` | `false` | 是否显示性能面板（FPS / drawcall） |
| `VITE_AVATAR_GLB` | `assets/characters/xingda.glb` | 星达角色 GLB 路径；放入即零代码替换代理模型 |
| `VITE_INTEGRATION_MODE` | `standalone` | 预留：总工程挂载时切换为子视图模式（隐藏独立 Intro 等） |

> 资源路径统一由 `src/core/assets.js` 经 `import.meta.env.BASE_URL` 解析，因此改动 base 无需改任何代码。

---

## 六、与总工程整合

本模块设计为**可进入总工程的开放模块**，而非封闭网页：

**方式 A · 作为 npm 依赖引入（推荐用于微前端 / 构建期整合）**

```js
// 总工程入口
import {
  CONFIG, WORLD, ASSETS,
  PlayerController, GlobalCompanion,
  marsGroup, enterSurface, flyTo,
} from 'mars-civilization-2126';

// 覆盖世界观数值以匹配总工程统一设定
CONFIG.civilization.population = 1_024_000;

// 将火星场景挂载进总工程的渲染器 / 路由
import { mountMars } from 'mars-civilization-2126'; // 见 src/index.js 扩展点
```

稳定 API 由 `src/index.js` 桶文件统一暴露（Scene / Character / Interaction / Data 全部覆盖）。

**方式 B · iframe / 路由跳转（最松耦合）**

总工程的导航直接跳转本模块的部署地址（或嵌套 iframe），通过 `postMessage` 传递「进入某城市 / 切换年份」等指令。

**集成约定（主工程需遵守）**
1. 场景容器需提供一个 `<canvas id="scene">`，本模块在挂载时接管其 WebGL 上下文。
2. 卸载前调用 `resetState()`（`src/core/state.js`）复位运行时状态，避免跨挂载污染。
3. 所有可调参数通过 `CONFIG` 注入，不要直接改 `src/` 内部魔法数字。
4. 跨模块共享内容（城市清单、文明数值、资源路径）已在 `src/data` 收敛，主工程应直接复用而非重复定义。

---

## 七、已知问题 / 限制

1. **星达角色为代理模型**：正式 `xingda.glb` 尚未放入 `public/assets/characters/`，当前以程序化代理造型运行（不影响功能）。放入 GLB 后自动替换，零代码改动。
2. **运行时与组件库的双轨**：独立运行以内核 `src/main.js`（已验证原型）保证稳定；`src/{scene,character,...}` 为对齐总工程的模块边界与集成 API。后续整合可逐步将 `main.js` 的编排改为调用这些模块。
3. **单页无客户端路由**：当前为单场景页面，刷新恒指向 `index.html`；若未来增加多章节子路由，需在总工程侧或 Vite 中补 SPA fallback（Vercel/Netlify 配置已含重写兜底）。
4. **包体偏大**：Three.js 全量约 720KB（gzip 206KB）。若需极致首屏，可后续做 three 按需 tree-shaking 或按章节拆分 chunk。
5. **移动端性能**：低重力漫游与地表城市为较高面数场景，低端机建议降低 `CONFIG.render.maxPixelRatio`。

---

## 八、许可证

本项目为《2126：人类第二家园计划》子模块，仅供项目内部整合与演示使用。
