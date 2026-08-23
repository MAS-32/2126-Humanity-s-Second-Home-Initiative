// ============================================================
// MoonMarkers — 任务导航世界标记（距离感知 + 任务状态联动）
//  FAR  (>170m)  小光点 + 名称 + 距离，低透明度但永不消失
//  MID  (36-170) 名称清晰显示
//  NEAR (<36m)   全部淡出 → 交给 HUD 的 [E] 交互提示
//  完成态        ✓ 名称 + 降透明度；当前目标  光点脉冲 + 最高可见度
// ============================================================
import * as THREE from 'three';
import { MARKERS } from './MoonConfig.js';
import { makeGlowTex } from './MoonMaterials.js';

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (a, b, v) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t); };

// 文本标牌 sprite（支持换贴图：普通 / 完成态）
function makeLabel(text, { fs = 40, pad = 22, bg = 'rgba(8,16,28,0.42)', fg = 'rgba(210,235,255,0.92)', scale = 0.03 } = {}) {
  const c = document.createElement('canvas');
  const mctx = c.getContext('2d');
  mctx.font = `500 ${fs}px -apple-system, "PingFang SC", sans-serif`;
  const w = Math.ceil(mctx.measureText(text).width);
  c.width = w + pad * 2; c.height = fs + pad;
  const x = c.getContext('2d');
  x.font = `500 ${fs}px -apple-system, "PingFang SC", sans-serif`;
  x.fillStyle = bg;
  if (x.roundRect) { x.beginPath(); x.roundRect(0, 0, c.width, c.height, 12); x.fill(); }
  else x.fillRect(0, 0, c.width, c.height);
  x.fillStyle = fg; x.textBaseline = 'middle'; x.textAlign = 'center';
  x.fillText(text, c.width / 2, c.height / 2 + 2);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, opacity: 0 }));
  sp.scale.set(c.width * scale, c.height * scale, 1);
  return sp;
}

// 动态距离标签（距离变化 >4m 才重绘）
function makeDistLabel() {
  const c = document.createElement('canvas'); c.width = 200; c.height = 56;
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, opacity: 0 }));
  sp.scale.set(6.0, 1.68, 1);
  let last = -1;
  return {
    sp,
    update(d) {
      const v = Math.round(d);
      if (Math.abs(v - last) <= 4) return;
      last = v;
      const x = c.getContext('2d');
      x.clearRect(0, 0, c.width, c.height);
      x.font = '500 34px -apple-system, "SF Pro Text", sans-serif';
      x.textAlign = 'center'; x.textBaseline = 'middle';
      x.fillStyle = 'rgba(140,205,245,0.85)';
      x.fillText(`${v}m`, c.width / 2, c.height / 2);
      t.needsUpdate = true;
    }
  };
}

export function buildMarkers(ctx) {
  const { scene, camera, updatables, points } = ctx;
  const dotTex = makeGlowTex([[0, 'rgba(170,230,255,0.95)'], [0.35, 'rgba(110,190,255,0.4)'], [1, 'rgba(0,0,0,0)']]);
  const dotTexDone = makeGlowTex([[0, 'rgba(140,255,180,0.9)'], [0.35, 'rgba(90,220,150,0.35)'], [1, 'rgba(0,0,0,0)']]);

  const items = MARKERS.map((mk, i) => {
    const grp = new THREE.Group();
    grp.position.set(mk.pos.x, mk.pos.y, mk.pos.z);
    const dot = new THREE.Sprite(new THREE.SpriteMaterial({ map: dotTex, transparent: true, depthWrite: false, opacity: 0 }));
    dot.scale.set(2.6, 2.6, 1);
    grp.add(dot);
    const name = makeLabel(mk.name);
    name.position.y = 2.6;
    grp.add(name);
    const nameDone = makeLabel(`✓ ${mk.name}`, { fg: 'rgba(150,235,190,0.9)' });
    nameDone.position.y = 2.6; nameDone.visible = false;
    grp.add(nameDone);
    const dist = makeDistLabel();
    dist.sp.position.y = 0.9;
    grp.add(dist.sp);
    scene.add(grp);
    return { grp, dot, name, nameDone, dist, point: points ? points[i] : null, texNormal: dotTex, texDone: dotTexDone };
  });

  updatables.push((dt, t) => {
    // 当前目标：配置顺序中第一个未完成区域
    let nextIdx = -1;
    if (points) for (let i = 0; i < points.length; i++) { if (!points[i].done) { nextIdx = i; break; } }

    items.forEach((it, i) => {
      const done = it.point ? it.point.done : false;
      const isNext = i === nextIdx;
      const d = camera.position.distanceTo(it.grp.position);
      const nearF = smooth(22, 36, d);                    // 近处整体淡出
      const dim = done ? 0.35 : (isNext ? 1.0 : 0.55);    // 任务状态调光

      // 光点：永不因距离消失；当前目标轻微脉冲
      const pulse = isNext ? 0.72 + 0.28 * Math.sin(t * 2.6) : 1;
      it.dot.material.opacity = nearF * 0.8 * dim * pulse;
      it.dot.material.map = done ? it.texDone : it.texNormal;
      const ds = Math.min(7, Math.max(2.2, d * 0.02)) * (isNext ? 1.2 : 1);
      it.dot.scale.set(ds, ds, 1);

      // 名称：中距清晰，远距降为低透明度（配合距离标签保持可辨）
      const farF = d > 170 ? 0.55 : 0.95;
      it.name.visible = !done;
      it.nameDone.visible = done;
      (done ? it.nameDone : it.name).material.opacity = nearF * farF * (done ? 0.8 : dim);

      // 距离标签：>60m 且未完成时显示
      if (d > 60 && !done) {
        it.dist.update(d);
        it.dist.sp.material.opacity = nearF * (d > 170 ? 0.85 : 0.6) * dim;
      } else {
        it.dist.sp.material.opacity = 0;
      }
    });
  });
}
