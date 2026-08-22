import * as THREE from 'three';

// 隐形引导系统：不锁死玩家自由，用「目标 HUD + 目的地信标 + 交互高亮环」
// 让第一次玩的人自然知道下一步去哪。
// 目标序列：小满（了解城市）→ 深空规划馆（太阳系蓝图）→ 太空电梯（出发月球）。
// 所有 DOM/3D 对象由本模块创建，dispose() 清理 DOM，3D 对象随 disposeScene 释放。

function glowMaterial(color, opacity) {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}

export function createGuide({ ctx, scene, targets }) {
  // targets: { companion: Vector3, hall: Vector3, elevator: Vector3 }

  // ---- 目标 HUD（Earth 专属 DOM，dispose 移除）----
  const hud = document.createElement('div');
  hud.className = 'earth-objective';
  hud.innerHTML = `
    <div class="earth-objective-region">东亚城市生命维持系统 · 中央区</div>
    <div class="earth-objective-label">当前目标</div>
    <div class="earth-objective-text"></div>
  `;
  document.body.append(hud);
  const textEl = hud.querySelector('.earth-objective-text');

  // ---- 目的地信标：青色光柱 + 地面脉冲环 ----
  const beacon = new THREE.Group();
  const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 26, 12, 1, true), glowMaterial(0x54d6e6, 0.16));
  pillar.position.y = 13;
  beacon.add(pillar);
  const baseRing = new THREE.Mesh(new THREE.RingGeometry(1.1, 1.5, 40), glowMaterial(0x54d6e6, 0.7));
  baseRing.rotation.x = -Math.PI / 2;
  baseRing.position.y = 0.06;
  beacon.add(baseRing);
  scene.add(beacon);

  // ---- 交互高亮环：跟随当前候选交互对象脚下 ----
  const highlight = new THREE.Mesh(new THREE.RingGeometry(0.95, 1.2, 40), glowMaterial(0x8ff2ff, 0.85));
  highlight.rotation.x = -Math.PI / 2;
  highlight.position.y = 0.07;
  highlight.visible = false;
  scene.add(highlight);

  let elapsed = 0;
  let currentKey = '';
  const targetPos = new THREE.Vector3();
  const rootPos = new THREE.Vector3();

  function resolveObjective() {
    if (!ctx.state.get('talkedEarthAI')) {
      return { key: 'companion', text: '前往广场，与陪伴机器人小满交谈', pos: targets.companion };
    }
    if (!ctx.state.get('visitedSolarSystem')) {
      return { key: 'hall', text: '前往深空规划馆，查看太阳系文明蓝图', pos: targets.hall };
    }
    return { key: 'elevator', text: '前往太空电梯，登舱出发月球', pos: targets.elevator };
  }

  return {
    update(dt) {
      elapsed += dt;
      const objective = resolveObjective();
      if (objective.key !== currentKey) {
        currentKey = objective.key;
        textEl.textContent = objective.text;
        beacon.position.set(objective.pos.x, 0, objective.pos.z);
      }
      // 信标脉冲
      const pulse = 1 + Math.sin(elapsed * 2.4) * 0.18;
      baseRing.scale.setScalar(pulse);
      pillar.material.opacity = 0.12 + Math.sin(elapsed * 2.4) * 0.05;

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
