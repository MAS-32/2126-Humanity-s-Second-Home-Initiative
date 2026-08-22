import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 2126 未来城市 GLB（真实建模资产）接入模块。
// 职责：异步加载（不阻塞主循环）→ SPAWN_Player 对齐出生点、COLLIDER_Ground 顶面落地
// → 按节点名注册 INTERACT_* 到现有 InteractionSystem → 飞行器环城动画（GLB 无动画，程序化驱动）
// → 加载失败清晰报错并回退到程序化城市，绝不白屏。
// 资源随 Earth 场景 disposeScene 统一释放；dispose 之后才完成的加载会被直接销毁。

const MODEL_URL = `${import.meta.env.BASE_URL}models/future_city_2126_interactive.glb`;

// 集中可配置参数（后续调整只改这里）
const CONFIG = {
  scale: 0.72, // 模型统一缩放：R91 建筑环（半径 91m）→ 世界约 66m，适配 150m 箱庭
  spawnTarget: { x: 0, z: 5 }, // SPAWN_Player 对齐目标（星达出生落点；y 由落地校准决定）
  spireColliderRadius: 8, // 中央文明塔碰撞半径（世界单位）
  aircar: { baseSpeed: 0.045, speedStep: 0.014, bobAmplitude: 0.6, bobSpeed: 0.9 },
};

const SPIRE_INFO = {
  title: '中央文明塔 · Central Spire',
  text: '2126 地球中央文明塔：城市能源、交通、气候与公共服务的综合协调中心。',
};
const TRANSIT_INFO = {
  title: '磁悬浮交通网络 · Transit Network',
  text: '两条环城磁悬浮轨道由城市 AI 统一调度，全天候运转。2126 年，“拥堵”已经是历史名词。',
};
const AIRCAR_INFO = {
  title: '城际飞行器 · Aircar',
  text: '沿磁悬浮环线巡航的轻型载具，航路由交通网络自动分配。头顶这些光点，就是城市活着的证据。',
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

export function loadFutureCity({ ctx, scene, onLoaded }) {
  let disposed = false;
  let loaded = false;
  let loadingEl = null;
  let infoEl = null;
  let infoTimer = null;
  let elapsed = 0;
  const aircars = [];
  const removeInteractions = [];

  // ---- 最小加载提示 / 信息面板（模块自管的 DOM，dispose 必清理）----
  const showLoading = () => {
    if (loadingEl) return;
    loadingEl = document.createElement('div');
    loadingEl.className = 'earth-loading';
    loadingEl.textContent = '正在加载 2126 城市模型…';
    document.body.append(loadingEl);
  };
  const hideLoading = () => {
    loadingEl?.remove();
    loadingEl = null;
  };
  const hideInfo = () => {
    if (infoTimer !== null) {
      clearTimeout(infoTimer);
      infoTimer = null;
    }
    infoEl?.remove();
    infoEl = null;
  };
  const showInfo = ({ title, text }) => {
    hideInfo();
    infoEl = document.createElement('div');
    infoEl.className = 'earth-info-panel';
    const titleEl = document.createElement('div');
    titleEl.className = 'earth-info-title';
    titleEl.textContent = title;
    const textEl = document.createElement('div');
    textEl.textContent = text;
    infoEl.append(titleEl, textEl);
    document.body.append(infoEl);
    infoTimer = setTimeout(hideInfo, 5000);
  };

  const attach = (model) => {
    // 统一缩放（Y 轴向上、米单位，GLB 已符合）
    model.scale.setScalar(CONFIG.scale);
    scene.add(model);
    model.updateMatrixWorld(true);

    // SPAWN_Player 对齐到星达出生落点（模型作者标记的出生位置）
    const spawnNode = model.getObjectByName('SPAWN_Player');
    if (spawnNode) {
      const spawnWorld = spawnNode.getWorldPosition(new THREE.Vector3());
      model.position.x += CONFIG.spawnTarget.x - spawnWorld.x;
      model.position.z += CONFIG.spawnTarget.z - spawnWorld.z;
      model.updateMatrixWorld(true);
    }

    // 落地校准：COLLIDER_Ground 顶面对齐 y=0（不悬空、不陷地）
    const groundNode = model.getObjectByName('COLLIDER_Ground');
    if (groundNode) {
      const groundBox = new THREE.Box3().setFromObject(groundNode);
      model.position.y -= groundBox.max.y;
      model.updateMatrixWorld(true);
    }

    // Box3 尺寸校验（资产体检，供调参参考）
    const size = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());
    console.info(`[EarthScene] 未来城市模型已加载：${size.x.toFixed(1)}m × ${size.y.toFixed(1)}m × ${size.z.toFixed(1)}m，缩放 ${CONFIG.scale}`);

    // ---- 按节点名接入现有交互系统（proximity 模式，点任何子部位都算同一对象）----
    const spire = model.getObjectByName('INTERACT_CentralSpire');
    if (spire) {
      removeInteractions.push(ctx.interaction.add(spire, {
        text: '了解中央文明塔',
        distance: 12,
        onInteract: () => showInfo(SPIRE_INFO),
      }));
    }

    // 磁悬浮网络：root 在模型原点（塔位），玩家不可达——在轨道环东侧地面放代理交互点
    const transit = model.getObjectByName('INTERACT_TransitNetwork');
    if (transit) {
      const tube = model.getObjectByName('TransitTube_0');
      const proxyPos = new THREE.Vector3(30, 0, -61); // 兜底：城市中心东侧
      if (tube) {
        const tubeBox = new THREE.Box3().setFromObject(tube);
        proxyPos.set(tubeBox.max.x + 1.5, 0, (tubeBox.min.z + tubeBox.max.z) / 2);
      }
      const proxy = new THREE.Object3D();
      proxy.name = 'transit-proxy';
      proxy.position.copy(proxyPos);
      scene.add(proxy);
      removeInteractions.push(ctx.interaction.add(proxy, {
        text: '查看磁悬浮交通网络',
        distance: 8,
        onInteract: () => showInfo(TRANSIT_INFO),
      }));
    }

    // 飞行器：注册交互 + 预计算环城轨道参数（不每帧创建对象）
    model.traverse((node) => {
      if (!node.name?.startsWith('INTERACT_Aircar_')) return;
      aircars.push({
        node,
        radius: Math.hypot(node.position.x, node.position.z),
        angle: Math.atan2(node.position.x, node.position.z),
        height: node.position.y,
        // 确定性差异速度，方向交替
        speed: (CONFIG.aircar.baseSpeed + (aircars.length % 5) * CONFIG.aircar.speedStep)
          * (aircars.length % 2 === 0 ? 1 : -1),
        bobPhase: aircars.length * 1.7,
      });
      removeInteractions.push(ctx.interaction.add(node, {
        text: '城际飞行器',
        distance: 6,
        onInteract: () => showInfo(AIRCAR_INFO),
      }));
    });

    loaded = true;
    hideLoading();
    ctx.state.set('earthCityModel', true);

    // 回报给场景：碰撞与相机避障切换到 GLB 建筑
    const spireWorld = spire?.getWorldPosition(new THREE.Vector3());
    onLoaded?.({
      colliders: spireWorld ? [{ x: spireWorld.x, z: spireWorld.z, r: CONFIG.spireColliderRadius }] : [],
      cameraBlockers: [spire, model.getObjectByName('Districts')].filter(Boolean),
    });
  };

  // jsdom（单元测试环境）无真实网络/WebGL，跳过加载，保持程序化城市
  const isJsdom = typeof navigator !== 'undefined' && navigator.userAgent?.includes('jsdom');
  if (!isJsdom) {
    showLoading();
    new GLTFLoader().loadAsync(MODEL_URL).then((gltf) => {
      if (disposed) {
        // 场景已销毁：直接释放，不挂载
        disposeModelResources(gltf.scene);
        return;
      }
      attach(gltf.scene);
    }).catch((error) => {
      console.error(`[EarthScene] 未来城市模型加载失败（${MODEL_URL}）：`, error?.message ?? error);
      hideLoading();
      if (!disposed) ctx.ui.flash('城市模型加载失败，已使用备用城市'); // 程序化城市仍在，游戏继续
    });
  }

  return {
    isLoaded: () => loaded,
    /** 飞行器环城动画：dt 驱动，复用预计算参数，不创建新对象 */
    update(dt) {
      if (!loaded) return;
      elapsed += dt;
      for (const car of aircars) {
        car.angle += car.speed * dt;
        car.node.position.set(
          Math.sin(car.angle) * car.radius,
          car.height + Math.sin(elapsed * CONFIG.aircar.bobSpeed + car.bobPhase) * CONFIG.aircar.bobAmplitude,
          Math.cos(car.angle) * car.radius,
        );
        // 朝向运动切线方向
        const dir = Math.sign(car.speed);
        car.node.rotation.y = Math.atan2(Math.cos(car.angle) * dir, -Math.sin(car.angle) * dir);
      }
    },
    dispose() {
      disposed = true;
      hideLoading();
      hideInfo();
      removeInteractions.forEach((remove) => remove());
      removeInteractions.length = 0;
      aircars.length = 0;
      // 模型本体与代理点留在 scene 中，由 disposeScene 统一释放
    },
  };
}
