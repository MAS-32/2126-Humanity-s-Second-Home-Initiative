import * as THREE from 'three';

// 主线导航系统（三层）：
//   A. 任务 HUD——始终只显示当前唯一核心任务（标题 + 子目标 + 实时距离）
//   B. 世界空间目标标记——目的地上方悬浮「◇ 名称 · 距离」标签 + 克制的信标光柱
//   C. 动态光轨——琥珀色能量箭头沿主线路径流动，与城市的青色灯带明确区分；
//      只在「刚获得新任务 / 明显偏航 / 距离较远」时加强，靠近目标后逐渐隐没。
// 目标序列：小满（了解城市）→ 深空规划馆（太阳系蓝图）→ 太空电梯（出发月球）。
// DOM 由本模块创建并在 dispose() 移除；3D 对象随 disposeScene 统一释放。

const GUIDE_COLOR = 0xffc46b; // 引导金（区别于城市青）
const TRAIL_COLOR = 0xff9a2a; // 光轨实心橙（亮地面上 additive 会发白，必须实心）
const TRAIL_COUNT = 12; // 光轨箭头池
const TRAIL_SPACING = 2.4; // 箭头间距（米）
const TRAIL_NEAR = 9; // 距离小于此值时光轨完全隐没
const TRAIL_FAR = 16; // 距离大于此值时光轨开始显现
const BOOST_DURATION = 4; // 新任务/偏航时的加强时长（秒）

function glowMaterial(color, opacity) {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}

// 世界空间目标标签（CanvasTexture Sprite，jsdom 下退化为透明）
function makeMarkerSprite() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const isJsdom = typeof navigator !== 'undefined' && navigator.userAgent?.includes('jsdom');
  const g = isJsdom ? null : canvas.getContext?.('2d');
  let material;
  let texture = null;
  if (g) {
    texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  } else {
    material = new THREE.SpriteMaterial({ transparent: true, opacity: 0, depthWrite: false });
  }
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(4.6, 1.44, 1);

  let lastText = '';
  return {
    sprite,
    setText(name, distance) {
      if (!g) return;
      const text = `◇ ${name} · ${Math.round(distance)} m`;
      if (text === lastText) return;
      lastText = text;
      g.clearRect(0, 0, canvas.width, canvas.height);
      g.fillStyle = 'rgba(28, 22, 6, 0.55)';
      g.beginPath();
      g.roundRect(66, 40, 380, 76, 18);
      g.fill();
      g.strokeStyle = 'rgba(255, 196, 107, 0.65)';
      g.lineWidth = 3;
      g.stroke();
      g.fillStyle = '#ffd9a0';
      g.font = '600 40px "PingFang SC", "Microsoft YaHei", sans-serif';
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillText(text, 256, 80);
      texture.needsUpdate = true;
    },
  };
}

export function createGuide({ ctx, scene, targets }) {
  // targets: { companion: Vector3, hall: Vector3, elevator: Vector3 }

  // ---- 层级 A：任务 HUD ----
  const hud = document.createElement('div');
  hud.className = 'earth-objective';
  hud.innerHTML = `
    <div class="earth-objective-region">东亚城市生命维持系统 · 中央区</div>
    <div class="earth-objective-label">当前任务</div>
    <div class="earth-objective-text"></div>
    <div class="earth-objective-sub"></div>
  `;
  document.body.append(hud);
  const textEl = hud.querySelector('.earth-objective-text');
  const subEl = hud.querySelector('.earth-objective-sub');

  // ---- 层级 B：世界空间目标标记（标签 + 细光柱 + 地面脉冲环）----
  const beacon = new THREE.Group();
  const pillar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, 30, 10, 1, true),
    glowMaterial(GUIDE_COLOR, 0.16),
  );
  pillar.position.y = 15;
  beacon.add(pillar);
  const baseRing = new THREE.Mesh(new THREE.RingGeometry(1.0, 1.35, 40), glowMaterial(GUIDE_COLOR, 0.55));
  baseRing.rotation.x = -Math.PI / 2;
  baseRing.position.y = 0.06;
  beacon.add(baseRing);
  const marker = makeMarkerSprite();
  marker.sprite.position.y = 5.4; // 进入第三人称俯视视野上沿
  beacon.add(marker.sprite);
  scene.add(beacon);

  // ---- 层级 C：动态光轨（实心橙色箭头链，从玩家流向目标）----
  // 注意：城市地面是高亮浅色，additive 金色会被冲成白色——箭头必须实心材质才读得出。
  const trailGroup = new THREE.Group();
  const chevronGeometry = new THREE.ConeGeometry(0.42, 1.15, 3);
  chevronGeometry.rotateX(Math.PI / 2); // 尖头朝 +Z，平躺地面
  const chevrons = [];
  for (let i = 0; i < TRAIL_COUNT; i += 1) {
    const chevron = new THREE.Mesh(
      chevronGeometry,
      new THREE.MeshBasicMaterial({ color: TRAIL_COLOR, transparent: true, opacity: 0, depthWrite: false }),
    );
    chevron.position.y = 0.12;
    trailGroup.add(chevron);
    chevrons.push(chevron);
  }
  scene.add(trailGroup);

  // ---- 交互高亮环：跟随当前候选交互对象脚下 ----
  const highlight = new THREE.Mesh(new THREE.RingGeometry(0.95, 1.2, 40), glowMaterial(0x8ff2ff, 0.85));
  highlight.rotation.x = -Math.PI / 2;
  highlight.position.y = 0.07;
  highlight.visible = false;
  scene.add(highlight);

  let elapsed = 0;
  let currentKey = '';
  let boostUntil = 0; // 光轨加强截止时间
  let offCourseTime = 0; // 持续偏航时长
  let trailStrength = 0; // 光轨强度（平滑）
  let lastDistance = -1;
  const targetPos = new THREE.Vector3();
  const rootPos = new THREE.Vector3();
  const playerPos = new THREE.Vector3();
  const lastPlayerPos = new THREE.Vector3();
  const toTarget = new THREE.Vector3();
  const step = new THREE.Vector3();

  function resolveObjective() {
    if (!ctx.state.get('talkedEarthAI')) {
      return {
        key: 'companion',
        title: '与「小满」交谈',
        sub: '了解 2126 年的这座城市',
        name: '中央广场 · 小满',
        pos: targets.companion,
      };
    }
    if (!ctx.state.get('visitedSolarSystem')) {
      return {
        key: 'hall',
        title: '前往深空规划馆',
        sub: '查看「太阳系文明蓝图」',
        name: '深空规划馆',
        pos: targets.hall,
      };
    }
    return {
      key: 'elevator',
      title: '前往太空电梯',
      sub: '登舱出发 · 下一站：月球前哨',
      name: '太空电梯 · 赤道一号',
      pos: targets.elevator,
    };
  }

  return {
    update(dt) {
      elapsed += dt;
      const objective = resolveObjective();
      if (objective.key !== currentKey) {
        currentKey = objective.key;
        textEl.textContent = objective.title;
        beacon.position.set(objective.pos.x, 0, objective.pos.z);
        boostUntil = elapsed + BOOST_DURATION; // 新任务：光轨加强出现
        lastDistance = -1; // 强制刷新 HUD 距离与世界标记文本
      }

      // 玩家位置与距离
      if (ctx.player.getPosition) playerPos.copy(ctx.player.getPosition());
      toTarget.set(objective.pos.x - playerPos.x, 0, objective.pos.z - playerPos.z);
      const distance = toTarget.length();

      // HUD 距离（变化 ≥1m 才刷新，避免 DOM 抖动）
      if (Math.abs(distance - lastDistance) >= 1) {
        lastDistance = distance;
        subEl.textContent = `${objective.sub} · ${Math.round(distance)} m`;
        marker.setText(objective.name, distance);
      }

      // 信标脉冲（克制但可见）
      const pulse = 1 + Math.sin(elapsed * 2.4) * 0.16;
      baseRing.scale.setScalar(pulse);
      pillar.material.opacity = 0.13 + Math.sin(elapsed * 2.4) * 0.05;

      // 偏航检测：玩家在移动，但移动方向持续背离目标
      const moved = playerPos.distanceToSquared(lastPlayerPos) > 1e-6;
      if (moved && distance > TRAIL_FAR) {
        step.copy(playerPos).sub(lastPlayerPos).normalize();
        toTarget.normalize();
        if (step.dot(toTarget) < -0.15) offCourseTime += dt;
        else offCourseTime = Math.max(0, offCourseTime - dt * 2);
        if (offCourseTime > 1.5) {
          boostUntil = elapsed + BOOST_DURATION;
          offCourseTime = 0;
        }
      }
      lastPlayerPos.copy(playerPos);

      // 光轨强度：距离驱动 + 任务/偏航加强，平滑过渡
      const distanceFactor = THREE.MathUtils.clamp(
        (distance - TRAIL_NEAR) / (TRAIL_FAR - TRAIL_NEAR), 0, 1,
      );
      const boostFactor = elapsed < boostUntil ? 1 : 0.55;
      const targetStrength = distanceFactor * boostFactor;
      trailStrength += (targetStrength - trailStrength) * (1 - Math.exp(-4 * dt));

      // 光轨布点：从玩家前方 3m 起，沿直线指向目标
      if (trailStrength > 0.02 && distance > 4) {
        toTarget.normalize();
        const yaw = Math.atan2(toTarget.x, toTarget.z);
        for (let i = 0; i < TRAIL_COUNT; i += 1) {
          const d = 3 + i * TRAIL_SPACING;
          const chevron = chevrons[i];
          if (d > distance - 2) {
            chevron.material.opacity = 0;
            continue;
          }
          chevron.position.set(
            playerPos.x + toTarget.x * d,
            0.12 + Math.sin(elapsed * 3 + i * 0.7) * 0.03,
            playerPos.z + toTarget.z * d,
          );
          chevron.rotation.y = yaw;
          // 流动波：亮度沿路径向目标方向依次传播
          const wave = 0.5 + 0.5 * Math.sin(elapsed * 4.5 - i * 0.85);
          chevron.material.opacity = trailStrength * (0.3 + 0.6 * wave);
        }
      } else {
        chevrons.forEach((chevron) => { chevron.material.opacity = 0; });
      }

      // 交互高亮环跟随候选对象
      const root = ctx.interaction.active?.root;
      if (root) {
        root.getWorldPosition(rootPos);
        highlight.position.set(rootPos.x, 0.07, rootPos.z);
        highlight.visible = true;
        highlight.scale.setScalar(1 + Math.sin(elapsed * 3.2) * 0.08);
      } else {
        highlight.visible = false;
      }
    },
    dispose() {
      hud.remove();
    },
  };
}
