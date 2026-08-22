import * as THREE from 'three';
import { playFade } from './dialogue.js';

// 太空电梯地月上升演出（scripted cutscene，dt 驱动状态机）。
// 阶段：登舱 → 加速上升 → 缆索尺度 → 地球远离/月球靠近 → 淡出转场。
// 演出期间玩家输入被禁用；结束前恢复输入（保证 SceneManager 捕获到 enabled=true）。
// 月球与地球只是临时视觉对象，随 Earth 场景 dispose 一并销毁，与 MoonScene 无关。

const ELEVATOR = new THREE.Vector3(35, 0, -35);
const PHASE = {
  boarding: 1.4, // 登舱 / 平台启动
  ascend: 4.6, // 加速上升
  scale: 6.6, // 缆索绷直 / 结构尺度
  space: 8.6, // 地球远离 / 月球靠近
  end: 9.4, // 淡出并转场
};

const easeInCubic = (t) => t * t * t;
const easeInOut = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;

export function createAscent({ ctx, scene, avatar }) {
  let active = false;
  let t = 0;
  let fadeCleanup = null;
  let skyColor = null;
  let tempObjects = [];
  let finished = false;
  let flashedAscend = false;
  let flashedSpace = false;

  const cameraStart = new THREE.Vector3();
  const avatarStart = new THREE.Vector3();
  const lookTarget = new THREE.Vector3();

  const buildSpaceProps = () => {
    // 星空
    const starPositions = new Float32Array(700 * 3);
    for (let i = 0; i < 700; i += 1) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(380);
      starPositions.set([v.x, v.y, v.z], i * 3);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xcfe8ff, size: 1.4, sizeAttenuation: false }));
    stars.name = 'ascent-stars';
    stars.position.set(ELEVATOR.x, 170, ELEVATOR.z);

    // 地球（临时视觉：蓝色弹珠 + 大气壳）
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(22, 32, 24),
      new THREE.MeshBasicMaterial({ color: 0x2f7fd8 }),
    );
    earth.name = 'ascent-earth';
    const earthGlow = new THREE.Mesh(
      new THREE.SphereGeometry(23.5, 32, 24),
      new THREE.MeshBasicMaterial({ color: 0x6fc4f5, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    earth.add(earthGlow);

    // 月球（临时视觉：逐渐靠近变大）
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(6, 24, 18),
      new THREE.MeshStandardMaterial({ color: 0xc8cdd4, roughness: 0.95 }),
    );
    moon.name = 'ascent-moon';

    tempObjects = [stars, earth, moon];
    tempObjects.forEach((object) => scene.add(object));
    return { stars, earth, moon };
  };

  let props = null;

  const onKeyDown = (event) => {
    if (!active) return;
    if (event.code === 'KeyE' || event.code === 'Space' || event.code === 'Escape') {
      // 允许跳过：直接快进到淡出阶段（黑客松演示友好）
      t = Math.max(t, PHASE.space);
    }
  };

  const api = {
    isActive: () => active,

    start() {
      if (active || finished) return;
      active = true;
      t = 0;
      finished = false;
      flashedAscend = false;
      flashedSpace = false;

      ctx.player.setEnabled?.(false);
      ctx.interaction.setEnabled?.(false);
      ctx.ui.flash('赤道一号：登舱确认，出发程序启动');
      document.addEventListener('keydown', onKeyDown);

      cameraStart.copy(ctx.camera.position);
      avatarStart.copy(avatar.position);
      skyColor = scene.background?.isColor ? scene.background.clone() : null;
      props = buildSpaceProps();
      props.stars.visible = false;
      props.earth.visible = false;
      props.moon.visible = false;
    },

    update(dt) {
      if (!active) return;
      t += dt;
      const camera = ctx.camera;

      if (t < PHASE.boarding) {
        // 登舱：星达滑上平台，镜头转到侧后方
        const k = easeInOut(t / PHASE.boarding);
        avatar.position.lerpVectors(avatarStart, new THREE.Vector3(ELEVATOR.x, 2.05, ELEVATOR.z), k);
        const camTarget = new THREE.Vector3(ELEVATOR.x + 7, 4.2, ELEVATOR.z + 7);
        camera.position.lerpVectors(cameraStart, camTarget, k);
        lookTarget.copy(avatar.position).add(new THREE.Vector3(0, 1, 0));
        camera.lookAt(lookTarget);
      } else if (t < PHASE.ascend) {
        // 加速上升：沿缆索爬升，城市在脚下缩小
        const k = easeInCubic((t - PHASE.boarding) / (PHASE.ascend - PHASE.boarding));
        const height = lerp(2.05, 120, k);
        avatar.position.set(ELEVATOR.x, height, ELEVATOR.z);
        camera.position.set(ELEVATOR.x + 7, height + 3, ELEVATOR.z + 7);
        lookTarget.copy(avatar.position).add(new THREE.Vector3(0, 1, 0));
        camera.lookAt(lookTarget);
        if (!flashedAscend && t > PHASE.boarding + 0.2) {
          flashedAscend = true;
          ctx.ui.flash('运载舱加速中——正在穿过对流层');
        }
      } else if (t < PHASE.scale) {
        // 缆索尺度：镜头沿缆索仰望，体现巨型结构
        const k = (t - PHASE.ascend) / (PHASE.scale - PHASE.ascend);
        const height = lerp(120, 165, easeInOut(k));
        avatar.position.set(ELEVATOR.x, height, ELEVATOR.z);
        camera.position.set(ELEVATOR.x + 5, height - 4, ELEVATOR.z + 5);
        lookTarget.set(ELEVATOR.x, 320, ELEVATOR.z); // 沿缆索看向高空
        camera.lookAt(lookTarget);
      } else if (t < PHASE.end) {
        // 地月过渡：背景转入太空，地球在下方远去，月球靠近
        const k = (t - PHASE.scale) / (PHASE.space - PHASE.scale);
        if (scene.fog) scene.fog = null;
        props.stars.visible = true;
        props.earth.visible = true;
        props.moon.visible = true;

        camera.position.set(ELEVATOR.x + 5, 168, ELEVATOR.z + 5);
        props.moon.position.set(ELEVATOR.x + 10, 235, ELEVATOR.z - 160);
        const moonScale = lerp(1, 2.6, easeInOut(Math.min(k, 1)));
        props.moon.scale.setScalar(moonScale);
        // 地球固定在镜头前下方，随月球靠近而显得远去
        props.earth.position.set(ELEVATOR.x - 6, 118, ELEVATOR.z - 70);
        props.earth.scale.setScalar(lerp(1, 0.82, Math.min(k, 1)));
        lookTarget.lerpVectors(
          new THREE.Vector3(ELEVATOR.x, 320, ELEVATOR.z),
          props.moon.position,
          easeInOut(Math.min(k * 1.4, 1)),
        );
        camera.lookAt(lookTarget);

        if (skyColor) {
          const fade = Math.min((t - PHASE.scale) / 1.2, 1);
          scene.background.lerpColors(skyColor, new THREE.Color(0x05070f), fade);
        }
        if (!flashedSpace && t > PHASE.space + 0.1) {
          flashedSpace = true;
          ctx.ui.flash('地球正在身后远去——前方，月球前哨');
        }
      }

      if (t >= PHASE.end) api.finish();
    },

    finish() {
      if (!active || finished) return;
      finished = true;
      active = false;
      document.removeEventListener('keydown', onKeyDown);
      fadeCleanup = playFade();
      // 先恢复输入，再转场：SceneManager 会捕获 enabled=true 并传递给下一场景
      ctx.player.setEnabled?.(true);
      ctx.interaction.setEnabled?.(true);
      ctx.sceneManager.go('moon');
    },

    dispose() {
      document.removeEventListener('keydown', onKeyDown);
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
