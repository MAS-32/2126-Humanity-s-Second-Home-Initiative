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
  train: { speed: 9, slowRadius: 0.7, minFactor: 0.22, soundDistance: 16, soundCooldown: 3 },
};

// GLB 材质增强：在不动模型资产的前提下摆脱“灰色白模”。
// 按材质名精准调校（玻璃更透更亮、金属更冷、自发光更强），材质是共享的，改一次全城生效。
function upgradeMaterial(material) {
  if (!material?.isMeshStandardMaterial) return;
  switch (material.name) {
    case 'Blue Glass':
      material.roughness = 0.12;
      material.metalness = 0.45;
      material.emissive = new THREE.Color(0x10303e);
      material.emissiveIntensity = 0.85; // 玻璃幕墙泛出城市内光
      break;
    case 'Cyan Emissive':
      material.emissiveIntensity = 1.5;
      break;
    case 'Pearl White':
      material.roughness = 0.45;
      material.metalness = 0.12;
      break;
    case 'Silver Alloy':
      material.metalness = 0.75;
      material.roughness = 0.3;
      break;
    case 'Deep Blue':
      material.emissive = new THREE.Color(0x0a2032);
      material.emissiveIntensity = 0.7;
      break;
    case 'Living Green':
      material.roughness = 0.85;
      break;
    case 'Plaza Ceramic':
      material.roughness = 0.5;
      material.metalness = 0.1;
      break;
    default:
      break;
  }
  material.needsUpdate = true;
}

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

// ---- 磁悬浮列车与中央站（P0-08：让轨道交通一眼可懂）----

function trainBodyMaterial() {
  return new THREE.MeshStandardMaterial({ color: 0xeef4f6, roughness: 0.3, metalness: 0.5 });
}

/** 一列真正的磁悬浮列车：圆角车体 + 深色车窗带 + 底部辉光条 + 随车点光源（光影扫过建筑） */
function buildTrain() {
  const train = new THREE.Group();
  train.name = 'transit-train';
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.62, 3.6, 6, 14), trainBodyMaterial());
  body.rotation.x = Math.PI / 2; // 长度沿 Z 轴（行进方向）
  body.position.y = 0.62;
  train.add(body);
  // 深色环舱车窗带
  const windowBand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.63, 0.63, 2.6, 14, 1, true),
    new THREE.MeshStandardMaterial({ color: 0x14242e, roughness: 0.1, metalness: 0.4 }),
  );
  windowBand.rotation.x = Math.PI / 2;
  windowBand.position.y = 0.72;
  train.add(windowBand);
  // 车头灯
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), new THREE.MeshBasicMaterial({ color: 0xdff8ff }));
  nose.position.set(0, 0.62, 2.45);
  train.add(nose);
  // 底部磁悬浮辉光条
  const glow = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.08, 4.2),
    new THREE.MeshBasicMaterial({ color: 0x54d6e6, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  glow.position.y = 0.08;
  train.add(glow);
  // 随车点光源：列车经过时暖冷光扫过周边建筑
  const light = new THREE.PointLight(0x66d9ee, 5.5, 16, 1.8);
  light.position.y = 0.6;
  train.add(light);
  return train;
}

/** 磁悬浮中央站：架空站台 + 支撑柱 + 雨棚 + 发光站名牌，一眼可读的“这是车站” */
function buildStation(position, deckHeight) {
  const station = new THREE.Group();
  station.name = 'transit-station';
  station.position.copy(position);
  const structure = new THREE.MeshStandardMaterial({ color: 0xe6eef1, roughness: 0.45, metalness: 0.3 });
  const glowCyan = new THREE.MeshBasicMaterial({ color: 0x54d6e6 });

  // 架空站台（与轨道同高）
  const deck = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.35, 11), structure);
  deck.position.y = deckHeight;
  station.add(deck);
  // 站台边缘安全光带
  [-1, 1].forEach((side) => {
    const edge = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 11), glowCyan);
    edge.position.set(side * 1.6, deckHeight + 0.2, 0);
    station.add(edge);
  });
  // 四根落地支撑
  [-1, 1].forEach((sx) => {
    [-1, 1].forEach((sz) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, deckHeight, 8), structure);
      leg.position.set(sx * 1.3, deckHeight / 2, sz * 4.6);
      station.add(leg);
    });
  });
  // 雨棚（弧线感的薄板 + 发光檐口）
  const canopy = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.14, 7.5), structure);
  canopy.position.y = deckHeight + 2.6;
  station.add(canopy);
  const canopyGlow = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.06, 7.6), glowCyan);
  canopyGlow.position.y = deckHeight + 2.52;
  station.add(canopyGlow);
  [-1, 1].forEach((side) => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.4, 6), structure);
    post.position.set(side * 1.5, deckHeight + 1.4, 0);
    station.add(post);
  });
  // 站名牌（中文优先，英文仅作次级工程信息）
  const sign = makeStationSign();
  sign.position.y = deckHeight + 3.3;
  station.add(sign);
  return station;
}

function makeStationSign() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const g = canvas.getContext('2d');
  g.fillStyle = 'rgba(6, 30, 40, 0.7)';
  g.beginPath();
  g.roundRect(20, 22, 472, 84, 16);
  g.fill();
  g.strokeStyle = 'rgba(120, 230, 245, 0.7)';
  g.lineWidth = 3;
  g.stroke();
  g.fillStyle = '#aef4ff';
  g.font = '600 42px "PingFang SC", "Microsoft YaHei", sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('磁悬浮中央站 · CENTRAL', 256, 66);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  sprite.scale.set(4.2, 1.05, 1);
  return sprite;
}

function angleDiff(a, b) {
  let d = a - b;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return Math.abs(d);
}

export function loadFutureCity({ ctx, scene, onLoaded, audio = null }) {
  let disposed = false;
  let loaded = false;
  let loadingEl = null;
  let infoEl = null;
  let infoTimer = null;
  let elapsed = 0;
  const aircars = [];
  const trains = [];
  const removeInteractions = [];
  let emissiveMaterial = null; // 共享的 Cyan Emissive（城市灯带呼吸）
  const playerPos = new THREE.Vector3();

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

    // ---- 材质增强：摆脱“灰色白模”（共享材质，全城一次生效）----
    const seenMaterials = new Set();
    model.traverse((node) => {
      if (!node.isMesh) return;
      const materials = Array.isArray(node.material) ? node.material : [node.material];
      materials.forEach((material) => {
        if (!material || seenMaterials.has(material)) return;
        seenMaterials.add(material);
        upgradeMaterial(material);
        if (material.name === 'Cyan Emissive') emissiveMaterial = material;
      });
    });

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
      let tubeDeckHeight = 10;
      if (tube) {
        const tubeBox = new THREE.Box3().setFromObject(tube);
        proxyPos.set(tubeBox.max.x + 1.5, 0, (tubeBox.min.z + tubeBox.max.z) / 2);
        tubeDeckHeight = tubeBox.max.y - 0.15;
      }
      // 磁悬浮中央站：让“轨道交通”一眼可读的站台地标
      const station = buildStation(proxyPos, tubeDeckHeight);
      scene.add(station);
      const proxy = new THREE.Object3D();
      proxy.name = 'transit-proxy';
      proxy.position.copy(proxyPos);
      proxy.position.y = Math.max(tubeDeckHeight, 2); // 交互判定锚在站台高度
      scene.add(proxy);
      removeInteractions.push(ctx.interaction.add(proxy, {
        text: '查看磁悬浮交通网络',
        distance: 9,
        onInteract: () => showInfo(TRANSIT_INFO),
      }));

      // 真正的列车：两条环线各一列，双向对开，进站减速、离站加速
      ['TransitTube_0', 'TransitTube_1'].forEach((tubeName, tubeIndex) => {
        const tubeNode = model.getObjectByName(tubeName);
        if (!tubeNode) return;
        const box = new THREE.Box3().setFromObject(tubeNode);
        const center = box.getCenter(new THREE.Vector3());
        const radius = (box.max.x - box.min.x + (box.max.z - box.min.z)) / 4;
        if (!(radius > 1)) return;
        const train = buildTrain();
        scene.add(train);
        const direction = tubeIndex === 0 ? 1 : -1;
        const entry = {
          mesh: train,
          cx: center.x,
          cz: center.z,
          radius,
          y: box.max.y + 0.02,
          angle: tubeIndex * Math.PI * 0.7,
          direction,
          stationAngle: null, // 仅外环列车在中央站减速
          soundCooldown: 0,
          wasNear: false,
        };
        if (tubeIndex === 0) {
          entry.stationAngle = Math.atan2(proxyPos.x - center.x, proxyPos.z - center.z);
        }
        trains.push(entry);
      });
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
    /** 飞行器环城 + 列车运行 + 城市灯带呼吸：dt 驱动，复用预计算参数，不创建新对象 */
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

      // 列车：进站减速、离站加速（靠近中央站角度时平滑放慢）
      if (ctx.player.getPosition) playerPos.copy(ctx.player.getPosition());
      for (const train of trains) {
        let speedFactor = 1;
        if (train.stationAngle != null) {
          const toStation = angleDiff(train.angle, train.stationAngle);
          const k = THREE.MathUtils.clamp(toStation / CONFIG.train.slowRadius, 0, 1);
          speedFactor = CONFIG.train.minFactor + (1 - CONFIG.train.minFactor) * k * k;
        }
        train.angle += train.direction * (CONFIG.train.speed * speedFactor / train.radius) * dt;
        train.mesh.position.set(
          train.cx + Math.sin(train.angle) * train.radius,
          train.y,
          train.cz + Math.cos(train.angle) * train.radius,
        );
        // 切线朝向：前进方向为车头 +Z
        const tangentSign = train.direction;
        train.mesh.rotation.y = Math.atan2(
          Math.cos(train.angle) * tangentSign,
          -Math.sin(train.angle) * tangentSign,
        );
        // 列车驶近玩家时播放一次通过音（有冷却，不轰炸）
        train.soundCooldown = Math.max(0, train.soundCooldown - dt);
        const distance = Math.hypot(
          train.mesh.position.x - playerPos.x,
          train.mesh.position.z - playerPos.z,
        );
        const near = distance < CONFIG.train.soundDistance;
        if (near && !train.wasNear && train.soundCooldown === 0) {
          audio?.play('train');
          train.soundCooldown = CONFIG.train.soundCooldown;
        }
        train.wasNear = near;
      }

      // 城市灯带呼吸（共享自发光材质，全城同步的微光起伏）
      if (emissiveMaterial) {
        emissiveMaterial.emissiveIntensity = 1.5 + Math.sin(elapsed * 1.3) * 0.25;
      }
    },
    dispose() {
      disposed = true;
      hideLoading();
      hideInfo();
      removeInteractions.forEach((remove) => remove());
      removeInteractions.length = 0;
      aircars.length = 0;
      trains.length = 0;
      emissiveMaterial = null;
      // 模型本体、代理点、车站与列车留在 scene 中，由 disposeScene 统一释放
    },
  };
}
