// EarthScene 程序化音效引擎（WebAudio 合成，零外部音频资源）。
// 风格：未来、干净、低频、克制。所有声音由振荡器 + 噪声实时合成。
// AudioContext 在首次用户手势（pointerdown/keydown）时才创建，满足浏览器自动播放策略。
// jsdom 测试环境没有 AudioContext：整模块退化为 no-op，不产生任何报错。

const MASTER_VOLUME = 0.42;

export function createEarthAudio() {
  const AudioCtor = typeof window !== 'undefined'
    ? (window.AudioContext ?? window.webkitAudioContext)
    : null;

  let ac = null;
  let master = null;
  let noiseBuffer = null;
  let ambience = null; // { name, nodes: [...], gain }
  let disposed = false;

  const ready = () => Boolean(ac) && !disposed;

  function ensureContext() {
    if (disposed || !AudioCtor) return;
    if (!ac) {
      ac = new AudioCtor();
      master = ac.createGain();
      master.gain.value = MASTER_VOLUME;
      master.connect(ac.destination);
      // 2 秒白噪声缓冲，所有噪声类音源共用
      const length = ac.sampleRate * 2;
      noiseBuffer = ac.createBuffer(1, length, ac.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
      // 如果创建时已有手势上下文则恢复环境音
      if (pendingAmbience) startAmbience(pendingAmbience);
    }
    if (ac.state === 'suspended') ac.resume().catch(() => {});
  }

  // 首次手势才创建上下文；此后每次手势都尝试 resume（浏览器可能再次挂起）
  const onGesture = () => ensureContext();
  if (AudioCtor && typeof document !== 'undefined') {
    document.addEventListener('pointerdown', onGesture);
    document.addEventListener('keydown', onGesture);
  }

  // ---- 基础合成工具 ----

  function tone({ type = 'sine', freq = 440, freqEnd = null, duration = 0.2, gain = 0.1, attack = 0.01, curve = 2 }) {
    if (!ready()) return;
    const t0 = ac.currentTime;
    const osc = ac.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (freqEnd != null) osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 1), t0 + duration);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + attack);
    g.gain.setTargetAtTime(0.0001, t0 + attack, duration / curve);
    osc.connect(g).connect(master);
    osc.start(t0);
    osc.stop(t0 + duration + 0.4);
  }

  function noise({ duration = 0.5, gain = 0.08, attack = 0.05, filterType = 'bandpass', freq = 800, freqEnd = null, q = 1 }) {
    if (!ready()) return;
    const t0 = ac.currentTime;
    const src = ac.createBufferSource();
    src.buffer = noiseBuffer;
    src.loop = true;
    const filter = ac.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.setValueAtTime(freq, t0);
    if (freqEnd != null) filter.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 10), t0 + duration);
    filter.Q.value = q;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + attack);
    g.gain.setTargetAtTime(0.0001, t0 + duration * 0.55, duration / 4);
    src.connect(filter).connect(g).connect(master);
    src.start(t0);
    src.stop(t0 + duration + 0.5);
  }

  // ---- 环境音床（持续循环，可交叉淡入淡出）----
  let pendingAmbience = null;

  function startAmbience(name) {
    if (!ready()) { pendingAmbience = name; return; }
    pendingAmbience = null;
    if (ambience?.name === name) return;
    stopAmbience(1.2);
    const t0 = ac.currentTime;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(1, t0 + 1.6); // 淡入
    g.connect(master);
    const nodes = [];

    const addHum = (freq, level) => {
      const osc = ac.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const og = ac.createGain();
      og.gain.value = level;
      osc.connect(og).connect(g);
      osc.start(t0);
      nodes.push(osc);
    };
    const addNoise = (filterType, freq, level, q = 0.8) => {
      const src = ac.createBufferSource();
      src.buffer = noiseBuffer;
      src.loop = true;
      const filter = ac.createBiquadFilter();
      filter.type = filterType;
      filter.frequency.value = freq;
      filter.Q.value = q;
      const ng = ac.createGain();
      ng.gain.value = level;
      src.connect(filter).connect(ng).connect(g);
      src.start(t0);
      nodes.push(src);
    };

    if (name === 'city') {
      addNoise('lowpass', 240, 0.05); // 城市低频底噪
      addHum(52, 0.028); // 能源网低鸣
      addHum(104, 0.012);
    } else if (name === 'hall') {
      addNoise('lowpass', 150, 0.045); // 更深的室内低鸣
      addHum(44, 0.034);
      addHum(660, 0.006); // 全息高频微光
    } else if (name === 'space') {
      addNoise('highpass', 900, 0.012); // 空旷的气感
      addHum(36, 0.03); // 运载舱低频
      addHum(72, 0.014);
    }
    ambience = { name, nodes, gain: g };
  }

  function stopAmbience(fade = 0.8) {
    if (!ambience || !ready()) { ambience = null; return; }
    const t0 = ac.currentTime;
    const { nodes, gain } = ambience;
    gain.gain.setTargetAtTime(0.0001, t0, fade / 3);
    nodes.forEach((node) => {
      try { node.stop(t0 + fade + 0.3); } catch { /* 已停止 */ }
    });
    ambience = null;
  }

  // ---- 具名一次性音效 ----
  const oneShots = {
    'ui-hover': () => tone({ type: 'sine', freq: 720, freqEnd: 560, duration: 0.07, gain: 0.035 }),
    'ui-confirm': () => {
      tone({ type: 'sine', freq: 520, duration: 0.09, gain: 0.05 });
      tone({ type: 'sine', freq: 780, duration: 0.14, gain: 0.045 });
    },
    dialog: () => tone({ type: 'triangle', freq: 460, freqEnd: 380, duration: 0.1, gain: 0.05 }),
    'hall-on': () => {
      tone({ type: 'sine', freq: 70, freqEnd: 160, duration: 1.4, gain: 0.12, attack: 0.3 });
      noise({ duration: 1.2, gain: 0.03, freq: 500, freqEnd: 1800, q: 3 });
    },
    holo: () => {
      [880, 1174, 1568].forEach((f, i) => setTimeout(() => tone({ type: 'sine', freq: f, duration: 0.35, gain: 0.02 }), i * 90));
    },
    'elevator-energy': () => {
      tone({ type: 'sine', freq: 48, freqEnd: 96, duration: 2.2, gain: 0.14, attack: 0.4 });
      noise({ duration: 2.0, gain: 0.04, filterType: 'lowpass', freq: 180, freqEnd: 420 });
    },
    door: () => {
      tone({ type: 'sine', freq: 95, freqEnd: 55, duration: 0.32, gain: 0.16, attack: 0.005 });
      noise({ duration: 0.18, gain: 0.05, filterType: 'lowpass', freq: 300 });
    },
    liftoff: () => {
      tone({ type: 'sine', freq: 60, freqEnd: 130, duration: 2.6, gain: 0.13, attack: 0.25 });
      noise({ duration: 2.4, gain: 0.06, filterType: 'bandpass', freq: 240, freqEnd: 900, q: 1.4 });
    },
    cloud: () => noise({ duration: 1.6, gain: 0.09, filterType: 'bandpass', freq: 1200, freqEnd: 500, q: 0.7, attack: 0.3 }),
    train: () => {
      noise({ duration: 1.4, gain: 0.07, filterType: 'bandpass', freq: 500, freqEnd: 1500, q: 2.2, attack: 0.25 });
      tone({ type: 'sine', freq: 210, freqEnd: 320, duration: 1.1, gain: 0.03, attack: 0.2 });
    },
  };

  return {
    /** 播放一次性音效；未手势激活时静默跳过 */
    play(name) {
      if (!ready()) return;
      oneShots[name]?.();
    },
    /** 切换环境音床：'city' | 'hall' | 'space' | null */
    setAmbience(name) {
      if (disposed) return;
      if (name == null) { stopAmbience(); pendingAmbience = null; return; }
      startAmbience(name);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      if (AudioCtor && typeof document !== 'undefined') {
        document.removeEventListener('pointerdown', onGesture);
        document.removeEventListener('keydown', onGesture);
      }
      stopAmbience(0.15);
      ac?.close?.().catch(() => {});
      ac = null;
    },
  };
}
