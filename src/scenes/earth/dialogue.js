// EarthScene 专属 UI 组件：线性模态对话（小满）、分支模态对话（NPC）、转场淡出。
// 所有组件只操作自己创建的 DOM / 定时器 / 监听器，destroy() 保证完全清理。
// 模态对话打开时暂停玩家与场景交互，关闭后恢复；E 键在对话期间由对话自身接管。

const TYPING_INTERVAL_MS = 22;

function createTypingEngine() {
  let timer = null;
  let fullText = '';
  return {
    type(el, text) {
      this.stop();
      fullText = text;
      let shown = 0;
      el.textContent = '';
      timer = setInterval(() => {
        shown += 1;
        el.textContent = fullText.slice(0, shown);
        if (shown >= fullText.length) this.stop();
      }, TYPING_INTERVAL_MS);
    },
    complete(el) {
      if (timer === null) return false;
      this.stop();
      el.textContent = fullText;
      return true;
    },
    stop() {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    },
    get typing() { return timer !== null; },
  };
}

/**
 * 线性模态对话：打开时暂停玩家与场景交互，关闭后恢复。
 */
export function createDialogue({ ctx, speaker, lines, onOpen, onClose }) {
  let root = null;
  let textEl = null;
  let open = false;
  let lineIndex = 0;
  let destroyed = false;
  const typing = createTypingEngine();

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
      const hintEl = document.createElement('div');
      hintEl.className = 'earth-dialog-hint';
      hintEl.textContent = 'E / 点击 继续 · Esc 结束对话';
      root.append(speakerEl, textEl, hintEl);
      root.addEventListener('click', onClick);
      document.body.append(root);
      document.addEventListener('keydown', onKeyDown);

      typing.type(textEl, lines[0]);
      onOpen?.();
    },

    advance() {
      if (!open) return;
      if (typing.complete(textEl)) return;
      lineIndex += 1;
      if (lineIndex >= lines.length) api.close();
      else typing.type(textEl, lines[lineIndex]);
    },

    close() {
      if (!open) return;
      open = false;
      typing.stop();
      document.removeEventListener('keydown', onKeyDown);
      if (root) {
        root.removeEventListener('click', onClick);
        root.remove();
        root = null;
        textEl = null;
      }
      if (!destroyed) {
        ctx.player.setEnabled?.(true);
        ctx.interaction.setEnabled?.(true);
      }
      onClose?.();
    },

    destroy() {
      if (destroyed) return;
      const wasOpen = open;
      destroyed = true;
      if (wasOpen) {
        open = false;
        typing.stop();
        document.removeEventListener('keydown', onKeyDown);
        if (root) {
          root.removeEventListener('click', onClick);
          root.remove();
          root = null;
          textEl = null;
        }
      }
      ctx.player.setEnabled?.(true);
      ctx.interaction.setEnabled?.(true);
    },
  };

  return api;
}

/**
 * 分支模态对话：主题菜单 + 每个主题 2-4 轮台词。
 * branches: [{ id, title, lines: [...], action?: string }]
 * onAction(action)：台词播完后触发（如 'startAscent' 启动太空电梯演出）。
 * 操作：菜单按 1/2/3 或点击选择分支；E/点击 推进台词；Esc 返回菜单 / 关闭。
 */
export function createBranchDialogue({ ctx, speaker, greeting, branches, onAction, onClose }) {
  let root = null;
  let textEl = null;
  let menuEl = null;
  let hintEl = null;
  let open = false;
  let destroyed = false;
  let activeBranch = -1; // -1 = 菜单
  let lineIndex = 0;
  const readBranches = new Set();
  const typing = createTypingEngine();

  const showMenu = () => {
    activeBranch = -1;
    menuEl.innerHTML = '';
    branches.forEach((branch, index) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'earth-dialog-branch';
      item.textContent = `${index + 1}. ${branch.title}${readBranches.has(index) ? ' ✓' : ''}`;
      item.addEventListener('click', (event) => {
        event.stopPropagation();
        selectBranch(index);
      });
      menuEl.append(item);
    });
    hintEl.textContent = '按 1/2/3 或点击选择话题 · Esc 离开';
    typing.type(textEl, greeting);
  };

  const showLine = () => {
    const branch = branches[activeBranch];
    menuEl.innerHTML = '';
    hintEl.textContent = 'E / 点击 继续 · Esc 返回话题';
    typing.type(textEl, branch.lines[lineIndex]);
  };

  const selectBranch = (index) => {
    if (index < 0 || index >= branches.length) return;
    activeBranch = index;
    lineIndex = 0;
    showLine();
  };

  const finishBranch = () => {
    const branch = branches[activeBranch];
    readBranches.add(activeBranch);
    if (branch.action) {
      api.close();
      onAction?.(branch.action);
      return;
    }
    showMenu();
  };

  const onKeyDown = (event) => {
    if (!open) return;
    if (event.code === 'Escape') {
      event.preventDefault();
      if (activeBranch >= 0) {
        typing.stop();
        showMenu();
      } else {
        api.close();
      }
      return;
    }
    if (activeBranch === -1 && event.code.startsWith('Digit')) {
      const index = Number(event.code.slice(5)) - 1;
      if (index >= 0 && index < branches.length) {
        event.preventDefault();
        selectBranch(index);
      }
      return;
    }
    if (event.code === 'KeyE' || event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      api.advance();
    }
  };
  const onClick = () => api.advance();

  const api = {
    isOpen: () => open,

    open() {
      if (open || destroyed) return;
      open = true;
      readBranches.clear();

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
      menuEl = document.createElement('div');
      menuEl.className = 'earth-dialog-menu';
      hintEl = document.createElement('div');
      hintEl.className = 'earth-dialog-hint';
      root.append(speakerEl, textEl, menuEl, hintEl);
      root.addEventListener('click', onClick);
      document.body.append(root);
      document.addEventListener('keydown', onKeyDown);

      showMenu();
    },

    advance() {
      if (!open || activeBranch === -1) return;
      if (typing.complete(textEl)) return;
      lineIndex += 1;
      if (lineIndex >= branches[activeBranch].lines.length) finishBranch();
      else showLine();
    },

    selectBranch,

    close() {
      if (!open) return;
      open = false;
      typing.stop();
      document.removeEventListener('keydown', onKeyDown);
      if (root) {
        root.removeEventListener('click', onClick);
        root.remove();
        root = null;
        textEl = null;
        menuEl = null;
        hintEl = null;
      }
      if (!destroyed) {
        ctx.player.setEnabled?.(true);
        ctx.interaction.setEnabled?.(true);
      }
      onClose?.();
    },

    destroy() {
      if (destroyed) return;
      const wasOpen = open;
      destroyed = true;
      if (wasOpen) {
        open = false;
        typing.stop();
        document.removeEventListener('keydown', onKeyDown);
        if (root) {
          root.removeEventListener('click', onClick);
          root.remove();
          root = null;
          textEl = null;
          menuEl = null;
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
