import { Game } from './core/Game.js';
import { OpeningScene } from './opening/OpeningScene.js';
import { shouldSkipOpening } from './opening/bootPolicy.js';
import './styles/main.css';
import './opening/OpeningScene.css';

const sceneLabel = document.querySelector('#scene-label');
const message = document.querySelector('#message');
const statePanel = document.querySelector('#state-panel');
let messageTimer;

// 状态面板是开发调试工具：默认隐藏，URL 带 #debug 时显示（演示模式不出现 JSON dump）
statePanel.hidden = !window.location.hash.includes('debug');

const ui = {
  setScene(text) { sceneLabel.textContent = text; },
  flash(text) {
    message.textContent = text;
    clearTimeout(messageTimer);
    messageTimer = setTimeout(() => { message.textContent = ''; }, 3000);
  },
  renderState(state) {
    if (statePanel.hidden) return;
    statePanel.textContent = JSON.stringify(state, null, 2);
  },
};

// 体验链第一环：开屏渲染（每次加载都完整播放）→ 进入地球关卡。
// 游戏在开场结束后才创建——避免地球环境音与开场音效叠播。
// enter() 会写入 sessionStorage.opening2126Seen：同标签页随后经太空电梯
// 落到前哨站（public/outpost/）时，moon-base.html 据此跳过自己的开场。
function bootGame() {
  const game = new Game({ mount: document.querySelector('#game'), ui });
  game.start().catch((error) => {
    console.error(error);
    ui.flash(`Failed to start: ${error.message}`);
  });

  // Small, intentional debug handle for hackathon teammates and browser smoke tests.
  window.__GAME__ = game;
}

if (shouldSkipOpening()) {
  // 枢纽「开始探索」回程：跳过开屏渲染直达地球。清掉 URL 参数，
  // 让随后的刷新回到「每次加载都播」的默认策略。
  history.replaceState(null, '', window.location.pathname + window.location.hash);
  bootGame();
} else {
  // 开场视频：NASA 阿波罗 17 号「蓝色弹珠」公版照片经 ffmpeg 生成的接近镜头
  //（替代原月面视频，无水印）。前哨站独立开场仍用其自带的月球视频。
  new OpeningScene({ video: 'assets/earth-civilization.mp4', onEnter: bootGame }).start();
}
