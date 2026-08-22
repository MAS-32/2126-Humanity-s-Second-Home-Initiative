import * as THREE from 'three';
import { playFade } from './dialogue.js';

// 太空电梯地月上升演出（scripted cutscene，dt 驱动状态机）。
// 八阶段强节奏转场（约 10.8s），任何时刻画面里都有明确的视觉参照物：
//   登舱 → 城市缩小 → 穿云 → 大气变深 → 地球曲率 → 近地轨道设施掠过 → 月球建立 → 转场
// 绝不允许出现数秒没有视觉反馈的空白天空。
// 跳过：E / Esc 即按即快进；长按空格 0.6s 快进（防误触）。
// 演出期间玩家输入被禁用；结束前恢复输入（保证 SceneManager 捕获到 enabled=true）。
// 云/星/地球/空间站/月球都是临时视觉对象，随 Earth 场景 dispose 一并销毁，与 MoonScene 无关。

const ELEVATOR = new THREE.Vector3(35, 0, -35);
const PHASE = {
  boarding: 1.2, // 登舱确认 / 舱门关闭 / 能量系统上线
  liftoff: 3.4, // 城市快速缩小
  clouds: 4.8, // 穿过云层
  darken: 6.4, // 大气蓝逐渐变深，星空淡入
  curve: 8.6, // 地球曲率出现
  orbital: 9.8, // 近地轨道设施掠过
  moon: 10.6, // 月球方向建立
  end: 10.8, // 淡出并转场
};

const easeInCubic = (t) => t * t * t;
const easeInOut = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;
const phase01 = (t, start, end) => THREE.MathUtils.clamp((t - start) / (end - start), 0, 1);

// 柔和云朵 sprite（径向渐变）
function makeCloudSprite(scale, opacity) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const isJsdom = typeof navigator !== 'undefined' && navigator.userAgent?.includes('jsdom');
  const g = isJsdom ? null : canvas.getContext?.('2d');
  let material;
  if (g) {
    const gradient = g.createRadialGradient(128, 128, 10, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(0.5, 'rgba(245, 250, 255, 0.45)');
    gradient.addColorStop(1, 'rgba(240, 248, 255, 0)');
    g.fillStyle = gradient;
    g.fillRect(0, 0, 256, 256);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity, depthWrite: false });
  } else {
    material = new THREE.SpriteMaterial({ transparent: true, opacity: 0, depthWrite: false });
  }
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(scale, scale * 0.55, 1);
  return sprite;
}

export function createAscent({ ctx, scene, avatar, elevator = null, audio = null }) {
  let active = false;
  let t = 0;
  let fadeCleanup = null;
  let skyColor = null;
  let tempObjects = [];
  let finished = false;
  const flashed = {};

  const cameraStart = new THREE.Vector3();
  const avatarStart = new THREE.Vector3();
  const lookTarget = new THREE.Vector3();
  const CITY_CENTER = new THREE.Vector3(0, 4, 0);

  let mistEl = null;
  const showMist = () => {
    if (mistEl) return;
    mistEl = document.createElement('div');
    mistEl.className = 'earth-mist';
    document.body.append(mistEl);
  };
  const setMist = (opacity) => {
    if (!mistEl && opacity > 0) showMist();
    if (mistEl) mistEl.style.opacity = opacity.toFixed(3);
  };
  const hideMist = () => {
    mistEl?.remove();
    mistEl = null;
  };

  const buildSpaceProps = () => {
    // 星空（淡入，sizeAttenuation 关闭保持远距可读）
    const starPositions = new Float32Array(900 * 3);
    for (let i = 0; i < 900; i += 1) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(380);
      starPositions.set([v.x, v.y, v.z], i * 3);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({
      color: 0xcfe8ff,
      size: 1.4,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0,
    }));
    stars.name = 'ascent-stars';
    stars.position.set(ELEVATOR.x, 170, ELEVATOR.z);

    // 云层：环绕电梯的柔和云团（穿云阶段的核心参照物）
    const clouds = new THREE.Group();
    clouds.name = 'ascent-clouds';
    for (let i = 0; i < 34; i += 1) {
      const bearing = Math.random() * Math.PI * 2;
      const radius = 9 + Math.random() * 46;
      const cloud = makeCloudSprite(9 + Math.random() * 13, 0.55 + Math.random() * 0.3);
      cloud.position.set(
        ELEVATOR.x + Math.sin(bearing) * radius,
        58 + Math.random() * 42,
        ELEVATOR.z + Math.cos(bearing) * radius,
      );
      clouds.add(cloud);
    }

    // 地球（临时视觉：蓝色弹珠 + 大气边缘光）
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(26, 40, 30),
      new THREE.MeshBasicMaterial({ color: 0x2f7fd8 }),
    );
    earth.name = 'ascent-earth';
    const earthGlow = new THREE.Mesh(
      new THREE.SphereGeometry(27.4, 40, 30),
      new THREE.MeshBasicMaterial({ color: 0x6fc4f5, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    earth.add(earthGlow);

    // 近地轨道站（从视野中掠过的巨型结构：环体 + 太阳能板 + 警示灯）
    const station = new THREE.Group();
    station.name = 'ascent-station';
    const ringMaterial = new THREE.MeshStandardMaterial({ color: 0xdde8ec, roughness: 0.35, metalness: 0.6 });
    const stationRing = new THREE.Mesh(new THREE.TorusGeometry(5, 0.55, 10, 36), ringMaterial);
    station.add(stationRing);
    const hub = new THREE.Mesh(new THREE.SphereGeometry(1.1, 14, 10), ringMaterial);
    station.add(hub);
    for (let i = 0; i < 4; i += 1) {
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 5, 6), ringMaterial);
      spoke.rotation.z = (i / 4) * Math.PI * 2;
      spoke.position.set(Math.sin((i / 4) * Math.PI * 2) * 2.5, Math.cos((i / 4) * Math.PI * 2) * 2.5, 0);
      station.add(spoke);
    }
    const panelMaterial = new THREE.MeshStandardMaterial({ color: 0x2a4a7a, roughness: 0.25, metalness: 0.5, emissive: 0x0a1a30, emissiveIntensity: 0.6 });
    [-1, 1].forEach((side) => {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(7, 0.08, 2.2), panelMaterial);
      panel.position.set(0, 0, side * 4.6);
      station.add(panel);
    });
    const stationLight = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), new THREE.MeshBasicMaterial({ color: 0xff5a4a }));
    stationLight.position.y = 5.6;
    station.add(stationLight);
    station.userData.light = stationLight;

    // 月球（临时视觉：逐渐靠近变大）
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(6, 24, 18),
      new THREE.MeshStandardMaterial({ color: 0xc8cdd4, roughness: 0.95 }),
    );
    moon.name = 'ascent-moon';

    tempObjects = [stars, clouds, earth, station, moon];
    tempObjects.forEach((object) => scene.add(object));
    return { stars, clouds, earth, station, moon };
  };

  let props = null;
  let skipHint = null;
  let spaceHeld = false;
  let spaceHoldTime = 0;

  // 跳过设计：E / Esc 即按即快进；空格需长按 0.6s（防误触，黑客松演示友好）
  const SPACE_HOLD_TO_SKIP = 0.6;

  const skipToFinale = () => {
    t = Math.max(t, PHASE.orbital);
  };

  const onKeyDown = (event) => {
    if (!active) return;
    if (event.code === 'Space') {
      if (!event.repeat) {
        spaceHeld = true;
        spaceHoldTime = 0;
      }
      return;
    }
    if (event.code === 'KeyE' || event.code === 'Escape') skipToFinale();
  };
  const onKeyUp = (event) => {
    if (event.code === 'Space') {
      spaceHeld = false;
      spaceHoldTime = 0;
    }
  };

  const showSkipHint = () => {
    skipHint = document.createElement('div');
    skipHint.className = 'earth-skip-hint';
    skipHint.textContent = '按住 空格 跳过演出 · 按 E 快进';
    document.body.append(skipHint);
  };
  const hideSkipHint = () => {
    skipHint?.remove();
    skipHint = null;
  };

  const flashOnce = (key, text) => {
    if (flashed[key]) return;
    flashed[key] = true;
    ctx.ui.flash(text);
  };

  // 各阶段的镜头位姿：返回 { height, camOffset, look }
  const api = {
    isActive: () => active,

    start() {
      if (active || finished) return;
      active = true;
      t = 0;
      finished = false;
      Object.keys(flashed).forEach((key) => delete flashed[key]);

      ctx.player.setEnabled?.(false);
      ctx.interaction.setEnabled?.(false);
      ctx.ui.flash('赤道一号：登舱确认，舱门关闭——能源系统上线');
      audio?.play('door');
      audio?.play('elevator-energy');
      elevator?.setBoarding?.(true);
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('keyup', onKeyUp);
      spaceHeld = false;
      spaceHoldTime = 0;
      showSkipHint();

      cameraStart.copy(ctx.camera.position);
      avatarStart.copy(avatar.position);
      skyColor = scene.background?.isColor ? scene.background.clone() : null;
      props = buildSpaceProps();
      props.stars.visible = false;
      props.earth.visible = false;
      props.station.visible = false;
      props.moon.visible = false;
    },

    update(dt) {
      if (!active) return;
      t += dt;
      // 长按空格累计，达到阈值快进到最后阶段
      if (spaceHeld) {
        spaceHoldTime += dt;
        if (spaceHoldTime >= SPACE_HOLD_TO_SKIP) {
          spaceHeld = false;
          skipToFinale();
        }
      }
      const camera = ctx.camera;

      // 高度曲线：全程连续上升（分段插值）
      let height;
      if (t < PHASE.boarding) height = 2.05;
      else if (t < PHASE.liftoff) height = lerp(2.05, 70, easeInCubic(phase01(t, PHASE.boarding, PHASE.liftoff)));
      else if (t < PHASE.clouds) height = lerp(70, 95, easeInOut(phase01(t, PHASE.liftoff, PHASE.clouds)));
      else if (t < PHASE.darken) height = lerp(95, 130, easeInOut(phase01(t, PHASE.clouds, PHASE.darken)));
      else if (t < PHASE.curve) height = lerp(130, 160, easeInOut(phase01(t, PHASE.darken, PHASE.curve)));
      else if (t < PHASE.orbital) height = lerp(160, 175, easeInOut(phase01(t, PHASE.curve, PHASE.orbital)));
      else height = lerp(175, 185, easeInOut(phase01(t, PHASE.orbital, PHASE.end)));

      avatar.position.set(ELEVATOR.x, height, ELEVATOR.z);

      // 天空颜色：城市蓝 → 高层浅蓝 → 深蓝 → 太空黑
      if (skyColor) {
        const deep = new THREE.Color(0x24436b);
        const space = new THREE.Color(0x05070f);
        if (t < PHASE.clouds) {
          scene.background.lerpColors(skyColor, deep, phase01(t, PHASE.liftoff, PHASE.clouds) * 0.35);
        } else if (t < PHASE.darken) {
          scene.background.lerpColors(deep, new THREE.Color(0x101c34), phase01(t, PHASE.clouds, PHASE.darken));
        } else {
          scene.background.lerpColors(new THREE.Color(0x101c34), space, phase01(t, PHASE.darken, PHASE.curve));
        }
      }
      // 城市雾在穿云后彻底退场
      if (t > PHASE.clouds && scene.fog) scene.fog = null;

      // ---- 阶段演出 ----
      if (t < PHASE.boarding) {
        // 登舱：星达滑上平台，镜头拉到近顶俯视（避开锚定塔斜撑与周边建筑的视线遮挡）
        const k = easeInOut(t / PHASE.boarding);
        avatar.position.lerpVectors(avatarStart, new THREE.Vector3(ELEVATOR.x, 2.05, ELEVATOR.z), k);
        const camTarget = new THREE.Vector3(ELEVATOR.x + 2.5, 10, ELEVATOR.z + 2.5);
        camera.position.lerpVectors(cameraStart, camTarget, k);
        lookTarget.copy(avatar.position).add(new THREE.Vector3(0, 1, 0));
        camera.lookAt(lookTarget);
      } else if (t < PHASE.liftoff) {
        // 城市缩小：镜头保持大俯视——城市在脚下快速缩小（本阶段的核心画面）
        const k = phase01(t, PHASE.boarding, PHASE.liftoff);
        camera.position.set(ELEVATOR.x + 2.5, height + 8, ELEVATOR.z + 2.5);
        lookTarget.copy(avatar.position).add(new THREE.Vector3(0, 1, 0))
          .lerp(CITY_CENTER, 0.6 * easeInOut(k));
        camera.lookAt(lookTarget);
        flashOnce('liftoff', '运载舱加速中——城市正在脚下缩小');
        if (!flashed.liftoffSound) {
          flashed.liftoffSound = true;
          audio?.play('liftoff');
        }
      } else if (t < PHASE.clouds) {
        // 穿云：白雾遮罩呼吸一次，云团从镜头旁掠过
        const k = phase01(t, PHASE.liftoff, PHASE.clouds);
        setMist(Math.sin(k * Math.PI) * 0.85);
        camera.position.set(ELEVATOR.x + 7, height + 3, ELEVATOR.z + 7);
        lookTarget.copy(avatar.position).add(new THREE.Vector3(0, 1, 0));
        camera.lookAt(lookTarget);
        flashOnce('clouds', '正在穿过云层');
        if (!flashed.cloudSound) {
          flashed.cloudSound = true;
          audio?.play('cloud');
        }
      } else if (t < PHASE.darken) {
        // 大气变深：雾感消散，星空淡入
        setMist(0);
        props.stars.visible = true;
        props.stars.material.opacity = phase01(t, PHASE.clouds, PHASE.darken) * 0.9;
        camera.position.set(ELEVATOR.x + 7, height + 3, ELEVATOR.z + 7);
        lookTarget.copy(avatar.position).add(new THREE.Vector3(0, 1, 0));
        camera.lookAt(lookTarget);
        flashOnce('darken', '即将离开大气层');
        if (!flashed.spaceAmbience) {
          flashed.spaceAmbience = true;
          audio?.setAmbience('space');
        }
      } else if (t < PHASE.curve) {
        // 地球曲率：蓝色弹珠在画面下方显现（位置/尺寸按镜头视野校准过，绝不落空）
        const k = phase01(t, PHASE.darken, PHASE.curve);
        props.stars.material.opacity = 0.9;
        props.earth.visible = true;
        props.earth.position.set(ELEVATOR.x - 26, height - 58, ELEVATOR.z - 72);
        props.earth.scale.setScalar(lerp(0.85, 1.1, easeInOut(k)));
        camera.position.set(ELEVATOR.x + 6, height + 2, ELEVATOR.z + 6);
        // 视线从星达压向地球边缘——蓝色弧线进入画面下半部
        lookTarget.copy(avatar.position).add(new THREE.Vector3(0, 1, 0));
        lookTarget.lerp(new THREE.Vector3(ELEVATOR.x - 14, height - 24, ELEVATOR.z - 40), easeInOut(k));
        camera.lookAt(lookTarget);
        flashOnce('curve', '地球曲率可见——欢迎抵达近地空间');
      } else if (t < PHASE.moon) {
        // 近地轨道：空间站从侧方掠过；随后月球进入视野；地球挂在画面下方
        const k = phase01(t, PHASE.curve, PHASE.moon);
        props.stars.material.opacity = 1;
        props.earth.visible = true;
        props.earth.position.set(ELEVATOR.x - 30, height - 72, ELEVATOR.z - 80);
        props.earth.scale.setScalar(1.05);
        props.station.visible = true;
        // 空间站自右向左掠过（轨道段全程在运动，绝不静止）
        const sweep = phase01(t, PHASE.curve, PHASE.orbital);
        props.station.position.set(
          ELEVATOR.x + lerp(55, -45, sweep),
          height + lerp(-6, 3, sweep),
          ELEVATOR.z - lerp(35, 10, sweep),
        );
        props.station.rotation.x += dt * 0.15;
        props.station.rotation.y += dt * 0.1;
        props.station.userData.light.material.color.setHex(
          Math.sin(t * 6) > 0 ? 0xff5a4a : 0x551a14,
        );

        props.moon.visible = true;
        props.moon.position.set(ELEVATOR.x + 10, 235, ELEVATOR.z - 160);
        props.moon.scale.setScalar(lerp(1, 2.3, easeInOut(phase01(t, PHASE.orbital, PHASE.moon))));

        camera.position.set(ELEVATOR.x + 5, height + 2, ELEVATOR.z + 5);
        lookTarget.lerpVectors(
          new THREE.Vector3(ELEVATOR.x - 14, height - 24, ELEVATOR.z - 40),
          props.moon.position,
          easeInOut(Math.min(k * 1.5, 1)),
        );
        camera.lookAt(lookTarget);
        flashOnce('moon', '地球正在身后远去——前方，月球前哨');
      }

      if (t >= PHASE.end) api.finish();
    },

    finish() {
      if (!active || finished) return;
      finished = true;
      active = false;
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      hideSkipHint();
      hideMist();
      elevator?.setBoarding?.(false);
      fadeCleanup = playFade();
      // 先恢复输入，再转场：SceneManager 会捕获 enabled=true 并传递给下一场景
      ctx.player.setEnabled?.(true);
      ctx.interaction.setEnabled?.(true);
      ctx.sceneManager.go('moon');
    },

    dispose() {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      hideSkipHint();
      hideMist();
      elevator?.setBoarding?.(false);
      if (fadeCleanup) {
        fadeCleanup();
        fadeCleanup = null;
      }
      // 临时对象留在 scene 中，由 disposeScene 统一释放
      tempObjects = [];
      active = false;
    },
  };

  return api;
}
