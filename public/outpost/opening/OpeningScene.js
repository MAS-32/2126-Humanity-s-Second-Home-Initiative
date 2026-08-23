export const PHASES = [
  [0, 'boot'],
  [2000, 'moon'],
  [8000, 'route'],
  [10000, 'title'],
];

export class OpeningScene {
  constructor({ video, onEnter }) {
    this.videoSrc = video;
    this.onEnter = onEnter;
    this.timers = [];
    this.audio = null;
  }

  start() {
    this.el = document.createElement('section');
    this.el.className = 'opening-scene';
    this.el.dataset.stage = 'boot';
    this.el.setAttribute('aria-label', '2126 人类第二家园计划开场');
    this.el.innerHTML = `
      <div class="opening-stage opening-boot">
        <div class="opening-scan"></div>
        <div class="opening-boot-copy">
          <div class="opening-year">2126</div>
          <div class="opening-boot-line"></div>
          <div class="opening-system">
            <p>人类文明系统启动</p>
            <p>生态网络连接中</p>
            <p>深空文明节点唤醒</p>
          </div>
        </div>
      </div>
      <div class="opening-stage opening-moon">
        <video class="opening-video" src="${this.videoSrc}" muted playsinline preload="auto"></video>
        <div class="opening-frame"></div>
        <div class="opening-hud">
          <div class="opening-hud-top"><b>2126</b><span>人类第二家园计划</span></div>
          <div class="opening-hud-left"><span class="opening-hud-label">文明节点</span><strong>月球</strong><br><span class="opening-live">运行中</span><br><br><span class="opening-hud-label">深空探索中心</span></div>
          <div class="opening-hud-right"><span class="opening-hud-label">文明目标</span><strong>建立人类第二家园</strong></div>
        </div>
        <div class="opening-scan"></div>
      </div>
      <div class="opening-stage opening-route">
        <div class="opening-route-map">
          <div class="opening-route-kicker">人类文明 · 深空航线</div>
          <div class="opening-nodes">
            <div class="opening-node"><span class="opening-dot"></span>地球<small>文明母星</small></div>
            <div class="opening-node"><span class="opening-dot"></span>月球<small>节点运行中</small></div>
            <div class="opening-node target"><span class="opening-dot"></span>火星<small>下一目标</small></div>
          </div>
        </div>
        <div class="opening-scan"></div>
      </div>
      <div class="opening-stage opening-title">
        <div class="opening-title-copy">
          <div class="opening-title-year">2126</div>
          <h1>人类第二家园计划</h1>
          <p>探索人类未来文明</p>
          <button class="opening-enter" type="button">进入 2126</button>
        </div>
      </div>
      <button class="opening-skip" type="button">跳过开场</button>
      <button class="opening-sound" type="button">点击启用声音</button>`;
    document.body.append(this.el);

    this.video = this.el.querySelector('video');
    this.soundButton = this.el.querySelector('.opening-sound');
    this.el.querySelector('.opening-enter').addEventListener('click', () => this.enter());
    this.el.querySelector('.opening-skip').addEventListener('click', () => this.showTitle());
    this.soundButton.addEventListener('click', () => this.enableSound());
    this.el.addEventListener('pointerdown', () => this.enableSound(), { once: true });

    this.video.addEventListener('loadedmetadata', () => {
      this.video.playbackRate = Math.max(.75, this.video.duration / 6);
    }, { once: true });

    PHASES.slice(1).forEach(([delay, stage]) => {
      this.timers.push(setTimeout(() => this.setStage(stage), delay));
    });
    return this;
  }

  setStage(stage) {
    if (!this.el || this.el.classList.contains('is-leaving')) return;
    this.el.dataset.stage = stage;
    if (stage === 'moon') this.video.play().catch(() => {});
    if (stage === 'route') this.video.pause();
    if (this.audio) this.cue(stage);
  }

  showTitle() {
    this.timers.forEach(clearTimeout);
    this.setStage('title');
  }

  enableSound() {
    if (this.audio) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      this.soundButton.remove();
      return;
    }
    const context = new AudioContext();
    const master = context.createGain();
    master.gain.value = .16;
    master.connect(context.destination);
    this.audio = { context, master, ambient: null };
    this.soundButton.textContent = '声音已启用';
    this.soundButton.classList.add('enabled');
    this.cue(this.el.dataset.stage);
  }

  tone(frequency, duration, gain = .16, type = 'sine', delay = 0) {
    const { context, master } = this.audio;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    const start = context.currentTime + delay;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    envelope.gain.setValueAtTime(.0001, start);
    envelope.gain.exponentialRampToValueAtTime(gain, start + .08);
    envelope.gain.exponentialRampToValueAtTime(.0001, start + duration);
    oscillator.connect(envelope).connect(master);
    oscillator.start(start);
    oscillator.stop(start + duration + .05);
  }

  cue(stage) {
    if (stage === 'boot') {
      this.tone(42, 3.2, .26);
      this.tone(84, 1.5, .08, 'sine', .35);
    }
    if (stage === 'moon') {
      this.tone(55, 6, .14);
      this.tone(880, .18, .07, 'sine', .1);
    }
    if (stage === 'route') {
      this.tone(70, 1.7, .22, 'sawtooth');
      this.tone(520, .8, .05, 'sine', .65);
    }
    if (stage === 'title') {
      [110, 164.8, 220].forEach((frequency, index) => this.tone(frequency, 3.4, .11, 'sine', index * .08));
    }
  }

  enter() {
    this.timers.forEach(clearTimeout);
    this.video.pause();
    if (this.audio) {
      const { context, master } = this.audio;
      master.gain.exponentialRampToValueAtTime(.0001, context.currentTime + .7);
      setTimeout(() => context.close(), 800);
    }
    sessionStorage.setItem('opening2126Seen', '1');
    this.el.classList.add('is-leaving');
    this.onEnter?.();
    setTimeout(() => this.el.remove(), 950);
  }
}
