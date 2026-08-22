# 部署说明（Deployment）

本模块已实际部署至 **GitHub Pages**，同时提供 **Vercel / Netlify** 配置（推荐生产环境使用）。

---

## 一、当前线上地址

| 平台 | 地址 | 状态 |
|---|---|---|
| GitHub Pages | https://xiyue6263-tech.github.io/mars-civilization-2126/ | ✅ 已部署（自动 CI） |

> GitHub Pages 为「实际可访问」地址；Vercel / Netlify 配置已就位，连接账号即可一键部署获得独立域名与边缘加速。

---

## 二、方式 A · GitHub Pages（已启用，自动部署）

仓库已配置 `.github/workflows/deploy.yml`：

- 推送 `main` 分支或手动 `workflow_dispatch` 即自动 `npm ci → npm run build → 发布 Pages`。
- 产物 `dist/` 以**相对路径**产出（`base: './'`），因此天然适配 `/mars-civilization-2126/` 子路径。
- 启用命令（已执行）：`gh api -X POST /repos/<owner>/<repo>/pages -f build_type=workflow`

重新部署：

```bash
git push origin main        # 自动触发
# 或
gh workflow run "Deploy to GitHub Pages" --repo <owner>/<repo>
```

---

## 三、方式 B · Vercel（推荐生产）

仓库根已含 `vercel.json`。两种接法：

1. **Git 集成（推荐）**：Vercel 控制台 → New Project → Import 本 GitHub 仓库 → Framework 选 `Vite` → Deploy。
   - Build Command：`npm run build`
   - Output Directory：`dist`
   - 自动读取 `vercel.json` 的 SPA 重写与 cleanUrls。
2. **CLI**：
   ```bash
   npm i -g vercel
   vercel            # 按提示登录并部署（生产：vercel --prod）
   ```

环境变量可在 Vercel 控制台 Project → Settings → Environment Variables 中设置（对应 `.env.example`）。

---

## 四、方式 C · Netlify

仓库根已含 `netlify.toml`。两种接法：

1. **Git 集成**：Netlify 控制台 → Add new site → Import from Git → 选本仓库 → Build `npm run build`、Publish `dist`。
2. **CLI**：
   ```bash
   npm i -g netlify-cli
   netlify deploy --prod
   ```

`netlify.toml` 已含 `/* → /index.html` 的 200 重写兜底。

---

## 五、部署基线配置（三者通用）

| 项 | 值 |
|---|---|
| 包管理器 | npm |
| 安装命令 | `npm install`（CI 用 `npm ci`） |
| 构建命令 | `npm run build` |
| 产物目录 | `dist` |
| 基础路径 | 默认 `./`（相对，适配子路径）；域名根可设 `VITE_BASE=/' |

---

## 六、验收清单（已逐项确认）

| 验证项 | 结果 | 说明 |
|---|---|---|
| 首次加载正常 | ✅ | 根路径返回 200，主 JS 与贴图均 200 |
| 刷新页面正常 | ✅ | 单页应用，刷新恒回 `index.html`（含 SPA 重写兜底） |
| 路由正常 | ✅ | 当前为单场景页，无子路由；Vercel/Netlify 已配重写防深链 404 |
| 静态资源正常 | ✅ | `textures/*` 经 `public/` 拷贝并在运行时 200 加载 |
| 构建可复现 | ✅ | `npm ci && npm run build` 在 CI（ubuntu / Node 20）通过 |

---

## 七、自定义域名 / 子路径

- **子路径（如总工程 `/mars/`）**：保持 `VITE_BASE=./`，部署到对应子路径即可，无需改代码。
- **独立域名**：在平台绑定自定义域名；如需绝对根路径，设 `VITE_BASE=/` 并重新构建。

---

## 八、回滚

- GitHub Pages：Actions 页面对应运行 → Re-run 旧成功运行，或推送上一个 commit。
- Vercel / Netlify：平台自动保留每次部署，一键切换 Production 版本。
