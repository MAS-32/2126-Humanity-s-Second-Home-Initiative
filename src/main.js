import { Game } from './core/Game.js';
import './styles/main.css';

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

const game = new Game({ mount: document.querySelector('#game'), ui });
game.start().catch((error) => {
  console.error(error);
  ui.flash(`Failed to start: ${error.message}`);
});

// Small, intentional debug handle for hackathon teammates and browser smoke tests.
window.__GAME__ = game;
