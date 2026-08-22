import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 星达：玩家在第三人称中的可见化身（真实 GLB 建模资产，非 NPC）。
// 结构约定：
//   xingda group（世界坐标/旋转/碰撞根，PlayerController 与演出的唯一控制对象）
//   └── visualRoot（只负责显示：缩放归一化、方向修正、待机浮动/前倾等程序动画）
//       └── xingda_web.glb scene（加载成功后替换青蓝占位体）
// 加载是异步的：buildXingda 立即返回稳定的外层 Group，EarthScene 无需等待。
// 资源随 Earth 场景 disposeScene 统一释放；dispose 之后才完成的加载会被直接销毁。

const MODEL_URL = `${import.meta.env.BASE_URL}models/xingda/xingda_web.glb`;

// 集中可配置参数（后续调整只改这里）
const CONFIG = {
  targetHeight: 1.55, // 归一化后的世界高度，匹配第三人称相机与 playerRadius: 0.45
  // 模型正面已是 +Z（与 PlayerController 移动朝向约定一致），无需方向修正。
  // 若更换模型导致正反不一致，只改这一个值（作用于 visualRoot.rotation.y）。
  yawOffset: 0,
  idle: { floatSpeed: 1.9, floatAmp: 0.022, breatheSpeed: 1.6, breatheAmp: 0.008, swayAmp: 0.028 },
  move: { floatSpeed: 8, floatAmp: 0.035, lean: 0.09, bounceAmp: 0.02 },
  ringSpeed: 0.8, // 触角顶端行星环自转速度（rad/s）
  turnLag: { gain: 5.5, damping: 9, max: 0.32 }, // 转身时身体的弹性滞后
  antenna: { idleAmp: 0.06, moveAmp: 0.16, speed: 2.6, phaseLag: 0.55 }, // 触角摆动（沿链节节延迟）
  tail: { idleAmp: 0.08, moveAmp: 0.22, idleSpeed: 1.4, moveSpeed: 6.5 }, // 尾巴摇摆
  ear: { amp: 0.05, speed: 1.7 }, // 耳朵微动
  blink: { minInterval: 2.6, maxInterval: 4.6, duration: 0.16 }, // 眨眼
};

/** 直接释放一个加载完成但未挂载的模型资源（场景已销毁的迟到加载用） */
function disposeModelResources(root) {
  root.traverse((object) => {
    object.geometry?.dispose();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => {
      if (!material) return;
      ['map', 'emissiveMap', 'normalMap', 'roughnessMap', 'alphaMap'].forEach((key) => {
        material[key]?.dispose?.();
      });
      material.dispose();
    });
  });
}

export function buildXingda(scene) {
  const group = new THREE.Group();
  group.name = 'xingda';

  const visualRoot = new THREE.Group();
  visualRoot.name = 'xingda-visual';
  visualRoot.rotation.y = CONFIG.yawOffset; // 方向修正只在这里发生一次
  group.add(visualRoot);

  // 青蓝占位体：GLB 加载期间与加载失败时的兜底显示，绝不白屏、绝不显示旧程序化星达
  const placeholder = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.32, 0.91, 6, 16),
    new THREE.MeshStandardMaterial({ color: 0x46bcc8, roughness: 0.85 }),
  );
  placeholder.name = 'xingda-placeholder';
  placeholder.position.y = CONFIG.targetHeight / 2; // 脚底落在 y=0
  placeholder.castShadow = true;
  visualRoot.add(placeholder);

  scene.add(group);

  let disposed = false;
  let ready = false;
  let elapsed = 0;
  let faceYaw = null; // 对话时由场景设置的目标朝向
  let rings = []; // GLB 内的 PlanetRing_* 节点（加载后收集）
  // 生命感部件：记录节点与其出厂旋转/缩放，动画只做小幅度偏移叠加
  let antennaChains = []; // [[seg0, seg1, seg2], ...]
  let tailChain = [];
  let ears = [];
  let eyeParts = [];
  let blinkTimer = 2.2; // 距下次眨眼
  let blinkPhase = -1; // >=0 表示正在眨眼（0..1）
  let lastGroupYaw = 0; // 转身弹性滞后的上一帧朝向
  let turnLag = 0;

  const rememberBase = (node) => {
    node.userData.baseRotation = node.rotation.clone();
    node.userData.baseScale = node.scale.clone();
    return node;
  };

  const removePlaceholder = () => {
    visualRoot.remove(placeholder);
    placeholder.geometry.dispose();
    placeholder.material.dispose();
  };

  const attachModel = (model) => {
    // Box3 归一化：目标高度 1.55、XZ 居中、脚底 Y=0（不悬空、不陷地）
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    if (!(size.y > 0)) {
      console.error(`[EarthScene] 星达模型包围盒异常（${MODEL_URL}），使用占位体继续`);
      disposeModelResources(model);
      return;
    }
    const center = box.getCenter(new THREE.Vector3());
    const scale = CONFIG.targetHeight / size.y;
    model.scale.setScalar(scale);
    model.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);

    // 阴影与视锥剔除标志；保留 GLB 自带 PBR 材质，不覆盖、不重建
    model.traverse((object) => {
      if (!object.isMesh) return;
      object.castShadow = true;
      object.receiveShadow = true;
      object.frustumCulled = true;
    });

    // 行星环节点（触角顶端小星球的环）：收集起来做缓慢自转
    rings = [];
    // 生命感部件收集（名字来自 GLB 节点约定；找不到的部件自动跳过，不报错）
    antennaChains = [];
    tailChain = [];
    ears = [];
    eyeParts = [];
    const antennaSides = { '-1': [], '1': [] };
    model.traverse((node) => {
      const name = node.name ?? '';
      if (/^PlanetRing_/.test(name)) rings.push(node);
      const antenna = name.match(/^Antenna_(-?1)_(\d)$/);
      if (antenna) antennaSides[antenna[1]].push([Number(antenna[2]), node]);
      if (/^Tail_\d$/.test(name)) tailChain.push([Number(name.slice(5)), node]);
      if (/^Ear_-?1$/.test(name)) ears.push(node);
      if (/^(EyeWhite|IrisCyan|Pupil|EyeHighlightBig|EyeHighlightSmall|EyeStar)_/.test(name)) eyeParts.push(node);
    });
    antennaChains = Object.values(antennaSides)
      .map((segments) => segments.sort((a, b) => a[0] - b[0]).map(([, node]) => rememberBase(node)))
      .filter((segments) => segments.length > 0);
    tailChain = tailChain.sort((a, b) => a[0] - b[0]).map(([, node]) => rememberBase(node));
    ears = ears.map(rememberBase);
    eyeParts = eyeParts.map(rememberBase);

    removePlaceholder(); // 先移除占位体再挂载，任何时刻只有一个星达
    visualRoot.add(model);
    ready = true;
  };

  new GLTFLoader().loadAsync(MODEL_URL).then((gltf) => {
    if (disposed) {
      // 场景已销毁：直接释放迟到模型，不挂载、不泄漏
      disposeModelResources(gltf.scene);
      return;
    }
    attachModel(gltf.scene);
  }).catch((error) => {
    // 加载失败：清晰报错，占位体继续兜底，游戏照常进行
    console.error(`[EarthScene] 星达模型加载失败（${MODEL_URL}），使用占位体继续：`, error?.message ?? error);
  });

  return {
    group,
    /** GLB 是否已加载并挂载完成 */
    get ready() {
      return ready;
    },
    /** 对话/演出时让星达面向某个世界坐标；传 null 取消 */
    faceToward(worldPosition) {
      if (!worldPosition) {
        faceYaw = null;
        return;
      }
      faceYaw = Math.atan2(
        worldPosition.x - group.position.x,
        worldPosition.z - group.position.z,
      );
    },
    /**
     * dt 驱动轻量程序动画（GLB 无骨骼动画）：idle 缓慢浮动 + 呼吸缩放 + 左右摇摆
     * + 行星环自转 + 触角/尾巴/耳朵的次级动作 + 眨眼 + 转身弹性滞后。
     * 只动 visualRoot 与部件自身的小幅旋转偏移，绝不修改外层 group.position.x/z
     * （归 PlayerController/演出管）。GLB 的脸/眼/头是同级节点，不单独旋转 Head。
     */
    update(dt, moving = false) {
      elapsed += dt;
      const mode = moving ? CONFIG.move : CONFIG.idle;
      visualRoot.position.y = Math.abs(Math.sin(elapsed * mode.floatSpeed)) * mode.floatAmp;
      const breathe = 1 + Math.sin(elapsed * CONFIG.idle.breatheSpeed) * CONFIG.idle.breatheAmp
        + (moving ? Math.sin(elapsed * CONFIG.move.floatSpeed) * CONFIG.move.bounceAmp : 0);
      visualRoot.scale.setScalar(breathe); // 以脚底为原点缩放，脚不离地
      visualRoot.rotation.z = Math.sin(elapsed * 0.9) * (moving ? 0.018 : mode.swayAmp);
      visualRoot.rotation.x = moving ? CONFIG.move.lean : Math.sin(elapsed * 2.1) * 0.015;
      rings.forEach((ring, index) => {
        ring.rotateY(dt * CONFIG.ringSpeed * (index % 2 === 0 ? 1 : -1)); // 绕自身轴自转，保留原始倾斜
      });

      // 转身弹性：group 被 PlayerController/faceToward 转动时，身体（visualRoot）
      // 带一点滞后的回转，像生物转头而不是机械转台
      let yawDelta = group.rotation.y - lastGroupYaw;
      while (yawDelta > Math.PI) yawDelta -= Math.PI * 2;
      while (yawDelta < -Math.PI) yawDelta += Math.PI * 2;
      lastGroupYaw = group.rotation.y;
      const lagTarget = THREE.MathUtils.clamp(-yawDelta * CONFIG.turnLag.gain, -CONFIG.turnLag.max, CONFIG.turnLag.max);
      turnLag += (lagTarget - turnLag) * (1 - Math.exp(-CONFIG.turnLag.damping * dt));
      visualRoot.rotation.y = CONFIG.yawOffset + turnLag;

      // 触角：沿链节节相位延迟的摆动，移动时幅度加大（像被气流吹动）
      const antennaAmp = moving ? CONFIG.antenna.moveAmp : CONFIG.antenna.idleAmp;
      antennaChains.forEach((segments, side) => {
        segments.forEach((node, depth) => {
          const base = node.userData.baseRotation;
          const phase = elapsed * CONFIG.antenna.speed - depth * CONFIG.antenna.phaseLag + side * 1.3;
          node.rotation.set(
            base.x + Math.sin(phase) * antennaAmp * (0.5 + depth * 0.35),
            base.y,
            base.z + Math.cos(phase * 0.8) * antennaAmp * 0.6 * (side === 0 ? -1 : 1),
          );
        });
      });

      // 尾巴：待机轻摆，移动时欢快加速
      const tailAmp = moving ? CONFIG.tail.moveAmp : CONFIG.tail.idleAmp;
      const tailSpeed = moving ? CONFIG.tail.moveSpeed : CONFIG.tail.idleSpeed;
      tailChain.forEach((node, depth) => {
        const base = node.userData.baseRotation;
        node.rotation.set(
          base.x,
          base.y + Math.sin(elapsed * tailSpeed - depth * 0.7) * tailAmp,
          base.z,
        );
      });

      // 耳朵：极轻的双耳不同步微动（生命力来自不对称）
      ears.forEach((node, index) => {
        const base = node.userData.baseRotation;
        node.rotation.set(
          base.x,
          base.y,
          base.z + Math.sin(elapsed * CONFIG.ear.speed + index * 2.4) * CONFIG.ear.amp,
        );
      });

      // 眨眼：随机间隔，一次 0.16s 的快速闭眼
      if (blinkPhase < 0) {
        blinkTimer -= dt;
        if (blinkTimer <= 0 && eyeParts.length > 0) {
          blinkPhase = 0;
          blinkTimer = CONFIG.blink.minInterval
            + Math.random() * (CONFIG.blink.maxInterval - CONFIG.blink.minInterval);
        }
      } else {
        blinkPhase += dt / CONFIG.blink.duration;
        const closed = Math.sin(Math.min(blinkPhase, 1) * Math.PI) * 0.85;
        eyeParts.forEach((node) => {
          const base = node.userData.baseScale;
          node.scale.set(base.x, base.y * (1 - closed), base.z);
        });
        if (blinkPhase >= 1) {
          blinkPhase = -1;
          eyeParts.forEach((node) => node.scale.copy(node.userData.baseScale));
        }
      }

      if (!moving && faceYaw != null) {
        let diff = faceYaw - group.rotation.y;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        group.rotation.y += diff * (1 - Math.exp(-8 * dt));
      }
    },
    /**
     * 幂等。group 及其内容物由 disposeScene(scene) 统一释放；
     * 若 GLB 在 dispose 后才加载完成，then 回调会检测到 disposed 并直接销毁模型资源。
     */
    dispose() {
      if (disposed) return;
      disposed = true;
      faceYaw = null;
      rings = [];
      antennaChains = [];
      tailChain = [];
      ears = [];
      eyeParts = [];
    },
  };
}
