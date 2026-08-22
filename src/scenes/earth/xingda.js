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
  move: { floatSpeed: 8, floatAmp: 0.035, lean: 0.09 },
  ringSpeed: 0.8, // 触角顶端行星环自转速度（rad/s）
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
    model.traverse((node) => {
      if (/^PlanetRing_/.test(node.name)) rings.push(node);
    });

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
     * + 行星环自转；moving 时浮动加快、身体轻微前倾。
     * 只动 visualRoot，绝不修改外层 group.position.x/z（归 PlayerController/演出管）。
     * GLB 的脸/眼/头是同级节点，不单独旋转 Head，避免五官与头部分离。
     */
    update(dt, moving = false) {
      elapsed += dt;
      const mode = moving ? CONFIG.move : CONFIG.idle;
      visualRoot.position.y = Math.abs(Math.sin(elapsed * mode.floatSpeed)) * mode.floatAmp;
      const breathe = 1 + Math.sin(elapsed * CONFIG.idle.breatheSpeed) * CONFIG.idle.breatheAmp;
      visualRoot.scale.setScalar(breathe); // 以脚底为原点缩放，脚不离地
      visualRoot.rotation.z = Math.sin(elapsed * 0.9) * (moving ? 0.018 : mode.swayAmp);
      visualRoot.rotation.x = moving ? CONFIG.move.lean : Math.sin(elapsed * 2.1) * 0.015;
      rings.forEach((ring, index) => {
        ring.rotateY(dt * CONFIG.ringSpeed * (index % 2 === 0 ? 1 : -1)); // 绕自身轴自转，保留原始倾斜
      });

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
    },
  };
}
