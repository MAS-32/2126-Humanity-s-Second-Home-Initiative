// EarthScene 专属 UI 组件：模态对话（机器人）与非模态信息面板（展厅导览）。
// 两者都只操作自己创建的 DOM / 定时器 / 监听器，destroy() 保证完全清理。

const TYPING_INTERVAL_MS = 22;

/**
 * 模态对话：打开时暂停玩家与场景交互，关闭后恢复。
 * 使用预设台词，不依赖任何在线 API。
 */
export function createDialogue({ ctx, speaker, lines, onOpen, onClose }) {
  let root = null;
  let textEl = null;
  let hintEl = null;
  let open = false;
  let lineIndex = 0;
  let typingTimer = null;
  let fullText = '';
  let destroyed = false;

  const stopTyping = () => {
    if (typingTimer !== null) {
      clearInterval(typingTimer);
      typingTimer = null;
    }
  };

  const typeLine = (text) => {
    stopTyping();
    fullText = text;
    let shown = 0;
    textEl.textContent = '';
    typingTimer = setInterval(() => {
      shown += 1;
      textEl.textContent = fullText.slice(0, shown);
      if (shown >= fullText.length) stopTyping();
    }, TYPING_INTERVAL_MS);
  };

  const onKeyDown = (event) => {
    if (!open) return;
    if (event.code === 'KeyE' || event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      api.advance();
    } else if (event.code === 'Escape') {
      event.preventDefault();
      api.close();
    }
  };

  const onClick = () => api.advance();

  const api = {
    isOpen: () => open,

    open() {
      if (open || destroyed) return;
      open = true;
      lineIndex = 0;

      // 暂停玩家移动与场景交互（E 键改由对话自身接管）。
      ctx.player.setEnabled?.(false);
      ctx.interaction.setEnabled?.(false);
      document.exitPointerLock?.();

      root = document.createElement('div');
      root.className = 'earth-dialog';
      const speakerEl = document.createElement('div');
      speakerEl.className = 'earth-dialog-speaker';
      speakerEl.textContent = speaker;
      textEl = document.createElement('div');
      textEl.className = 'earth-dialog-text';
      hintEl = document.createElement('div');
      hintEl.className = 'earth-dialog-hint';
      hintEl.textContent = 'E / 点击 继续 · Esc 结束对话';
      root.append(speakerEl, textEl, hintEl);
      root.addEventListener('click', onClick);
      document.body.append(root);
      document.addEventListener('keydown', onKeyDown);

      typeLine(lines[0]);
      onOpen?.();
    },

    advance() {
      if (!open) return;
      if (typingTimer !== null) {
        // 打字中：先补全当前行。
        stopTyping();
        textEl.textContent = fullText;
        return;
      }
      lineIndex += 1;
      if (lineIndex >= lines.length) {
        api.close();
      } else {
        typeLine(lines[lineIndex]);
      }
    },

    close() {
      if (!open) return;
      open = false;
      stopTyping();
      document.removeEventListener('keydown', onKeyDown);
      if (root) {
        root.removeEventListener('click', onClick);
        root.remove();
        root = null;
        textEl = null;
        hintEl = null;
      }
      // 恢复输入；若场景正在切换，SceneManager 会在其生命周期内再兜底。
      if (!destroyed) {
        ctx.player.setEnabled?.(true);
        ctx.interaction.setEnabled?.(true);
      }
      onClose?.();
    },

    destroy() {
      if (destroyed) return;
      // 场景销毁时无条件恢复输入，避免把禁用状态泄漏到下一个场景。
      const wasOpen = open;
      destroyed = true;
      if (wasOpen) {
        open = false;
        stopTyping();
        document.removeEventListener('keydown', onKeyDown);
        if (root) {
          root.removeEventListener('click', onClick);
          root.remove();
          root = null;
          textEl = null;
          hintEl = null;
        }
      }
      ctx.player.setEnabled?.(true);
      ctx.interaction.setEnabled?.(true);
    },
  };

  return api;
}

/**
 * 非模态信息面板：展厅全息导览。不暂停输入，重复交互翻页。
 */
export function createInfoPanel({ title, pages, hint = '对准控制台再按 E 翻页' }) {
  let root = null;
  let textEl = null;
  let pageIndex = -1;
  let destroyed = false;

  const api = {
    isVisible: () => root !== null,

    next() {
      if (destroyed) return;
      pageIndex = (pageIndex + 1) % pages.length;
      if (!root) {
        root = document.createElement('div');
        root.className = 'earth-info-panel';
        const titleEl = document.createElement('div');
        titleEl.className = 'earth-info-title';
        titleEl.textContent = title;
        textEl = document.createElement('div');
        textEl.className = 'earth-info-text';
        const hintEl = document.createElement('div');
        hintEl.className = 'earth-info-hint';
        hintEl.textContent = hint;
        root.append(titleEl, textEl, hintEl);
        document.body.append(root);
      }
      textEl.textContent = pages[pageIndex];
    },

    hide() {
      if (root) {
        root.remove();
        root = null;
        textEl = null;
      }
      pageIndex = -1;
    },

    destroy() {
      destroyed = true;
      api.hide();
    },
  };

  return api;
}

/**
 * 转场淡出遮罩：不阻塞场景切换，仅提供视觉反馈。
 * 返回清理函数（清除定时器并移除 DOM），可安全重复调用。
 */
export function playFade() {
  const el = document.createElement('div');
  el.className = 'earth-fade';
  document.body.append(el);
  requestAnimationFrame(() => el.classList.add('is-active'));
  const timer = setTimeout(() => el.remove(), 1200);
  let cleaned = false;
  return () => {
    if (cleaned) return;
    cleaned = true;
    clearTimeout(timer);
    el.remove();
  };
}
