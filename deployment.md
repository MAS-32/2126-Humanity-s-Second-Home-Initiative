# 部署指南（deployment.md）

本模块为纯静态站点：构建产物在 `public/`（`npm run build` 生成），任何静态托管平台均可直接部署。

## 0. 构建

```bash
npm install        # 无依赖，瞬时完成
npm run build      # 语法自检 + 生成 public/（部署根）
npm run preview    # 本地验证 http://127.0.0.1:4173/
```

## 1. Cloudflare Pages（当前线上方案）

- 部署目录：`public`
- 构建命令：`npm run build`；输出目录：`public`
- 项目名固定为 **`moon-outpost-2126`**，线上地址稳定：
  **https://moon-outpost-2126.pages.dev/**
- 重新发布请保持项目名不变，否则公开 URL 会变。
- 已连接 GitHub 仓库后，可在 Cloudflare Dashboard 配置自动构建（push main 即发布）。

## 2. Vercel（备选）

1. 导入 GitHub 仓库（`moon-outpost-2126`）。
2. Framework Preset：`Other`。
3. Build Command：`npm run build`；Output Directory：`public`。
4. 无环境变量需要配置。
5. 部署完成即得 `https://<project>.vercel.app`，可绑定自定义域名。

## 3. Netlify（备选）

1. New site from Git → 选择本仓库。
2. Build command：`npm run build`；Publish directory：`public`。
3. 部署完成即得 `https://<site>.netlify.app`。

## 4. 路由与刷新说明

- 本模块为**多页静态站点**（`index.html` / `moon-base.html` / `solar-hub.html` / `mars-city.html`），
  无客户端路由，直接访问任意 `.html` 路径均可；刷新不会 404。
- 页面跳转均为站内相对链接，部署在任意子路径下也能正常工作（相对路径，非绝对路径）。

## 5. 环境变量

- **无运行时环境变量**（纯前端，无后端）。
- 可选构建期注入（`MOON_BACK_URL` / `MOON_MARS_URL` 等）说明见 `.env.example`；
  如需注入，在 CI/部署平台 Build 中设置并替换 `src/js/MoonConfig.js → INTEGRATION` 的默认值即可。

## 6. 离线 / 内网部署注意

- 唯一外部依赖为 CDN 的 `three@0.160.0`（`importmap` 指向 jsDelivr）。
- 内网 / 完全离线环境：将 `three.module.js` 与 `examples/jsm/` 的
  `EffectComposer / RenderPass / UnrealBloomPass / SimplexNoise` 下载后放入 `src/vendor/`，
  并把各文件顶部 `three` / `three/addons/` 导入改为相对路径（本模块全部为 ES Module import，替换点集中）。
