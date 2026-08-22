# Opening Cinematic

《2126：人类第二家园计划》的开场位于 `opening/`，由原生 HTML、CSS、HTML5 Video 和 Web Audio API 构成，不增加构建步骤或第三方依赖。

## 文件

- `opening/OpeningScene.js`：12 秒阶段时间轴、视频控制、声音与进入回调。
- `opening/OpeningScene.css`：启动、月球 HUD、深空航线和标题视觉。
- `opening/OpeningScene.test.mjs`：阶段时间轴自检。
- `assets/moon-civilization.mp4`：月球文明节点视频。
- `moon-base.html`：主场景入口，只负责载入并启动开场组件。

## 运行

在 `moon-module/` 目录启动静态服务器：

```bash
python3 -m http.server 8123 --bind 127.0.0.1
```

访问 `http://127.0.0.1:8123/moon-base.html`。开场每个浏览器标签页会完整播放一次；同一标签页再次载入时保留原有的简版进入遮罩，便于快速回到主场景。

浏览器禁止未交互页面自动播放声音，所以视频会静音自动播放；用户点击“点击启用声音”或开场任意区域后，Web Audio 音效立即启用。点击“进入 2126”会关闭开场并直接请求进入 3D 探索控制。

时间轴自检：`node opening/OpeningScene.test.mjs`。
