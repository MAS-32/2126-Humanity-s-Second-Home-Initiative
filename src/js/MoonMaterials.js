// ============================================================
// MoonMaterials — 统一材质调色板 + 程序化贴图
// 目标：整座城市看起来像"同一个文明、同一套工业设计体系"
// 白 / 银灰 / 深灰 为主体，青蓝只做能源与导航，暖白只做室内灯
// ============================================================
import * as THREE from 'three';

function canvasTex(w, h, draw, opts = {}) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  if (opts.repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
  return t;
}

// 夜景窗带贴图（建筑外墙上成排亮灯的窗户）
function makeWindowTex() {
  return canvasTex(512, 64, (x, w, h) => {
    x.fillStyle = '#161b21'; x.fillRect(0, 0, w, h);
    const cols = 22, rows = 2;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const lit = Math.random() < 0.62;
        const wx = 6 + i * (w - 12) / cols, wy = 8 + j * (h - 16) / rows;
        x.fillStyle = lit ? (Math.random() < 0.85 ? '#ffd9a2' : '#bfe4ff') : '#20262d';
        x.fillRect(wx, wy, (w - 12) / cols - 7, (h - 16) / rows - 8);
      }
    }
  }, { repeat: true });
}

// 道路贴图（深沥青 + 边线 + 中央虚线）
function makeRoadTex() {
  return canvasTex(128, 256, (x, w, h) => {
    x.fillStyle = '#24272c'; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 500; i++) {           // 噪点
      x.fillStyle = `rgba(255,255,255,${Math.random() * 0.04})`;
      x.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
    }
    x.fillStyle = '#454b53'; x.fillRect(5, 0, 4, h); x.fillRect(w - 9, 0, 4, h); // 边线
    x.fillStyle = '#5c636c';                            // 中央虚线
    for (let y = 0; y < h; y += 34) x.fillRect(w / 2 - 2, y, 4, 18);
  }, { repeat: true });
}

// 停机坪 / 发射台顶面贴图
function makePadTex(label = 'LP-01') {
  return canvasTex(512, 512, (x, w, h) => {
    x.fillStyle = '#2c3035'; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 1200; i++) {
      x.fillStyle = `rgba(255,255,255,${Math.random() * 0.03})`;
      x.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }
    const cx = w / 2, cy = h / 2;
    x.strokeStyle = '#79828c'; x.lineWidth = 6;
    [0.44, 0.3].forEach(k => { x.beginPath(); x.arc(cx, cy, w * k, 0, Math.PI * 2); x.stroke(); });
    x.lineWidth = 3; x.strokeStyle = '#565e68';
    x.beginPath(); x.moveTo(cx, cy - w * 0.44); x.lineTo(cx, cy + w * 0.44); x.stroke();
    x.beginPath(); x.moveTo(cx - w * 0.44, cy); x.lineTo(cx + w * 0.44, cy); x.stroke();
    // 警示角弧
    x.strokeStyle = '#8f7f3e'; x.lineWidth = 8;
    for (let i = 0; i < 4; i++) {
      x.beginPath(); x.arc(cx, cy, w * 0.475, i * Math.PI / 2 + 0.15, i * Math.PI / 2 + Math.PI / 2 - 0.15); x.stroke();
    }
    x.fillStyle = '#8a929c'; x.font = '600 44px monospace'; x.textAlign = 'center';
    x.fillText(label, cx, cy + w * 0.36);
  });
}

// 太阳能板贴图
function makeSolarTex() {
  return canvasTex(256, 128, (x, w, h) => {
    const g = x.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#16294a'); g.addColorStop(1, '#0e1c33');
    x.fillStyle = g; x.fillRect(0, 0, w, h);
    x.strokeStyle = '#2c4a72'; x.lineWidth = 2;
    for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(i * w / 8, 0); x.lineTo(i * w / 8, h); x.stroke(); }
    for (let j = 0; j <= 4; j++) { x.beginPath(); x.moveTo(0, j * h / 4); x.lineTo(w, j * h / 4); x.stroke(); }
  });
}

// 标牌贴图（实体标牌，替代过去悬浮大字）
export function makeSignTex(text, accent = '#7fe9ff') {
  return canvasTex(512, 128, (x, w, h) => {
    x.fillStyle = 'rgba(10,18,28,0.92)'; x.fillRect(0, 0, w, h);
    x.strokeStyle = accent; x.lineWidth = 4; x.strokeRect(6, 6, w - 12, h - 12);
    x.fillStyle = accent; x.fillRect(16, h / 2 - 3, 30, 6); x.fillRect(w - 46, h / 2 - 3, 30, 6);
    x.fillStyle = '#eef6ff'; x.font = '600 46px -apple-system, "PingFang SC", sans-serif';
    x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillText(text, w / 2, h / 2 + 2);
  });
}

// 能量流动贴图（道路旁能量导管用）
export function makeFlowTex() {
  return canvasTex(64, 8, (x, w, h) => {
    for (let i = 0; i < w; i++) {
      const on = (i % 16 < 9);
      x.fillStyle = on ? 'rgba(150,225,255,0.9)' : 'rgba(110,180,230,0.10)';
      x.fillRect(i, 0, 1, h);
    }
  }, { repeat: true });
}

// 柔和光点贴图（标记点 / 光晕）
export function makeGlowTex(stops, size = 128) {
  return canvasTex(size, size, (x) => {
    const g = x.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    for (const [p, col] of stops) g.addColorStop(p, col);
    x.fillStyle = g; x.fillRect(0, 0, size, size);
  });
}

// ------------------------------------------------------------
// 主调色板
// ------------------------------------------------------------
export function createPalette() {
  const mats = {
    // 主体：白陶瓷外壳 / 浅银灰 / 银灰金属 / 深灰结构 / 黑机械
    white:  new THREE.MeshStandardMaterial({ color: 0xe9ebee, roughness: 0.60, metalness: 0.18 }),
    white2: new THREE.MeshStandardMaterial({ color: 0xd3d7dc, roughness: 0.68, metalness: 0.12 }),
    metal:  new THREE.MeshStandardMaterial({ color: 0x99a3ad, roughness: 0.40, metalness: 0.78 }),
    dark:   new THREE.MeshStandardMaterial({ color: 0x353a41, roughness: 0.62, metalness: 0.45 }),
    darker: new THREE.MeshStandardMaterial({ color: 0x22262b, roughness: 0.72, metalness: 0.38 }),

    // 玻璃（低透明、轻微蓝）与生态玻璃（微绿）
    glass: new THREE.MeshStandardMaterial({
      color: 0xa9cade, roughness: 0.08, metalness: 0.05,
      transparent: true, opacity: 0.20, side: THREE.DoubleSide, depthWrite: false
    }),
    glassGreen: new THREE.MeshStandardMaterial({
      color: 0xaad4c2, roughness: 0.10, metalness: 0.05,
      transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false
    }),

    // 能源青蓝（克制）与暖白室内灯
    energy:     new THREE.MeshStandardMaterial({ color: 0x0b141d, emissive: 0x5ec9ff, emissiveIntensity: 1.5, roughness: 0.4, metalness: 0.2 }),
    energySoft: new THREE.MeshStandardMaterial({ color: 0x0b141d, emissive: 0x5ec9ff, emissiveIntensity: 0.75, roughness: 0.4, metalness: 0.2 }),
    warm:       new THREE.MeshStandardMaterial({ color: 0x181410, emissive: 0xffc98a, emissiveIntensity: 1.15, roughness: 0.5, metalness: 0.1 }),
    warmSoft:   new THREE.MeshStandardMaterial({ color: 0x181410, emissive: 0xffc98a, emissiveIntensity: 0.6, roughness: 0.5, metalness: 0.1 }),

    // 生态
    plant:  new THREE.MeshStandardMaterial({ color: 0x3f9151, roughness: 0.85, emissive: 0x0d2c14, emissiveIntensity: 0.4 }),
    plant2: new THREE.MeshStandardMaterial({ color: 0x2f7a44, roughness: 0.9,  emissive: 0x0a2410, emissiveIntensity: 0.3 }),
    soil:   new THREE.MeshStandardMaterial({ color: 0x2e3527, roughness: 1.0, metalness: 0.0 }),
    water:  new THREE.MeshStandardMaterial({ color: 0x15506e, roughness: 0.15, metalness: 0.3, emissive: 0x0a2a3c, emissiveIntensity: 0.5 }),

    // 地表 / 道路 / 平台
    concrete: new THREE.MeshStandardMaterial({ color: 0x3a3f46, roughness: 0.92, metalness: 0.08 }),
  };

  const tex = {
    windows: makeWindowTex(),
    road: makeRoadTex(),
    solar: makeSolarTex(),
    flow: makeFlowTex(),
    pad: makePadTex('LP-01'),
    padRocket: makePadTex('DS-01'),
  };
  tex.road.wrapS = tex.road.wrapT = THREE.RepeatWrapping;

  // 共享几何体（供 InstancedMesh / 复用）
  const geo = {
    rock:  new THREE.DodecahedronGeometry(1, 0),
    plant: new THREE.ConeGeometry(0.34, 0.95, 6),
    panel: new THREE.BoxGeometry(4.2, 0.16, 2.6),
    pole:  new THREE.CylinderGeometry(0.1, 0.14, 1, 6),
    crate: new THREE.BoxGeometry(1, 1, 1),
  };

  // 窗带材质工厂（每栋建筑可独立 repeat）
  mats.windowBand = (repeat = 8) => {
    const t = tex.windows.clone();
    t.needsUpdate = true;
    t.wrapS = THREE.RepeatWrapping;
    t.repeat.set(repeat, 1);
    return new THREE.MeshStandardMaterial({
      color: 0x2a3138, roughness: 0.5, metalness: 0.3,
      map: t, emissive: 0xffffff, emissiveMap: t, emissiveIntensity: 1.8
    });
  };

  return { mats, tex, geo };
}
