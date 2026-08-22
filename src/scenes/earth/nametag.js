import * as THREE from 'three';

// 悬浮名牌（CanvasTexture Sprite）：标注 NPC / 地标的 Chinese 名称，降低玩家认路成本。
// jsdom 测试环境没有 2D canvas，此时退化为透明 sprite，不影响单元测试。

export function makeNameTag(text, { color = '#9ff2ff', scale = 2.4 } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  // jsdom（单元测试环境）的 getContext 是 not-implemented 桩，调用会污染测试日志，直接跳过
  const isJsdom = typeof navigator !== 'undefined' && navigator.userAgent?.includes('jsdom');
  const g = isJsdom ? null : canvas.getContext?.('2d');

  let material;
  if (g) {
    g.clearRect(0, 0, canvas.width, canvas.height);
    // 半透明圆角底
    g.fillStyle = 'rgba(6, 30, 40, 0.62)';
    g.beginPath();
    g.roundRect(56, 26, 400, 76, 20);
    g.fill();
    g.strokeStyle = 'rgba(120, 230, 245, 0.55)';
    g.lineWidth = 3;
    g.stroke();
    // 文字
    g.fillStyle = color;
    g.font = '600 44px "PingFang SC", "Microsoft YaHei", sans-serif';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(text, 256, 66);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  } else {
    material = new THREE.SpriteMaterial({ transparent: true, opacity: 0, depthWrite: false });
  }

  const sprite = new THREE.Sprite(material);
  sprite.scale.set(scale, scale / 4, 1);
  return sprite;
}
