import * as THREE from 'three';

const MOVEMENT_KEYS = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD']);
// 鼠标事件尖峰阈值：焦点恢复 / 系统级跳变时 movement 会出现巨大值，直接丢弃该帧
const MOUSE_SPIKE_THRESHOLD = 150;

const DEFAULT_TP_OPTIONS = {
  distance: 6, // 相机到角色的基础距离
  height: 2.2, // 相机基础高度偏移
  lookHeight: 1.2, // 注视点相对角色原点的高度
  rotateSensitivity: 0.0022,
  cameraDamping: 9, // 越大跟随越紧；基于 1 - exp(-damping * dt) 的帧率无关阻尼
  turnDamping: 12, // 角色朝向移动方向的平滑转向阻尼
  minPitch: -0.35, // 最低俯角（略微平视下方）
  maxPitch: 1.15, // 最高仰角（避免翻到地底/天顶）
  defaultPitch: 0.34,
  moveSpeed: null, // 缺省沿用 speed
  cameraObstacles: null, // 可选：相机避障 mesh 列表（场景注入的主要建筑）
  playerRadius: 0.45, // 角色碰撞半径（配合 setObstacles 推挤）
  // 相机避障距离平滑：拉近要急（防穿模），恢复要慢（防弹跳感）
  collisionSnapDamping: 18,
  collisionRecoverDamping: 4.5,
};

export class PlayerController {
  constructor({
    camera,
    domElement,
    speed = 5,
    lookSensitivity = 0.002,
    documentRef = document,
    windowRef = window,
  }) {
    if (!camera || !domElement) throw new Error('PlayerController requires camera and domElement.');

    this.camera = camera;
    this.domElement = domElement;
    this.speed = speed;
    this.lookSensitivity = lookSensitivity;
    this.document = documentRef;
    this.window = windowRef;
    this.enabled = true;
    this.disposed = false;
    this.keys = new Set();
    this.camera.rotation.order = 'YXZ';

    // ---- 第三人称模式状态（默认关闭，保持第一人称行为不变）----
    this.mode = 'first-person';
    this.tp = null;
    this.orbitYaw = 0;
    this.orbitPitch = DEFAULT_TP_OPTIONS.defaultPitch;
    // 玩家圆形障碍推挤（场景注入，[{x, z, r}]；默认空 = 无碰撞）
    this.obstacles = [];
    // 相机避障 raycast 的复用对象（仅第三人称且注入 cameraObstacles 时使用）
    this.cameraRaycaster = new THREE.Raycaster();
    this.tmpLook = new THREE.Vector3();
    this.tmpDir = new THREE.Vector3();

    this.onCanvasClick = () => {
      if (this.enabled && this.document.pointerLockElement !== this.domElement) {
        this.domElement.requestPointerLock?.();
      }
    };
    this.onPointerLockChange = () => {
      if (this.document.pointerLockElement !== this.domElement) this.keys.clear();
    };
    this.onMouseMove = (event) => {
      if (!this.enabled || this.document.pointerLockElement !== this.domElement) return;
      // 过滤输入焦点恢复时的鼠标跳变，避免视角突然甩动
      if (Math.abs(event.movementX) > MOUSE_SPIKE_THRESHOLD || Math.abs(event.movementY) > MOUSE_SPIKE_THRESHOLD) return;
      if (this.mode === 'third-person' && this.tp) {
        this.orbitYaw -= event.movementX * this.tp.rotateSensitivity;
        this.orbitPitch = THREE.MathUtils.clamp(
          this.orbitPitch + event.movementY * this.tp.rotateSensitivity,
          this.tp.minPitch,
          this.tp.maxPitch,
        );
        return;
      }
      this.camera.rotation.y -= event.movementX * this.lookSensitivity;
      this.camera.rotation.x -= event.movementY * this.lookSensitivity;
      this.camera.rotation.x = THREE.MathUtils.clamp(this.camera.rotation.x, -Math.PI / 2, Math.PI / 2);
    };
    this.onKeyDown = (event) => {
      if (this.enabled && this.document.pointerLockElement === this.domElement && MOVEMENT_KEYS.has(event.code)) {
        this.keys.add(event.code);
      }
    };
    this.onKeyUp = (event) => this.keys.delete(event.code);
    this.clearKeys = () => this.keys.clear();

    this.domElement.addEventListener('click', this.onCanvasClick);
    this.document.addEventListener('pointerlockchange', this.onPointerLockChange);
    this.document.addEventListener('mousemove', this.onMouseMove);
    this.document.addEventListener('keydown', this.onKeyDown);
    this.document.addEventListener('keyup', this.onKeyUp);
    this.window.addEventListener('blur', this.clearKeys);
  }

  /**
   * 切换到第三人称：相机从后上方跟随 target（场景提供的可见角色）。
   * Core 不认识任何具体角色，target 由场景注入，保持通用。
   */
  setThirdPerson({ target, ...options }) {
    if (!target?.isObject3D) throw new TypeError('setThirdPerson requires a target Object3D.');
    this.tp = { ...DEFAULT_TP_OPTIONS, ...options, target };
    this.mode = 'third-person';
    this.orbitYaw = this.camera.rotation.y;
    this.orbitPitch = this.tp.defaultPitch;
    this.tpSmoothedDistance = null; // 避障距离平滑状态，切换模式时重置
    // 立即把相机摆到跟随位置，避免切换瞬间视角跳变
    this.snapCameraToTarget();
  }

  /** 恢复第一人称（场景退出时必须调用，避免影响其他场景）。 */
  setFirstPerson() {
    this.mode = 'first-person';
    this.tp = null;
    this.tpSmoothedDistance = null;
    this.obstacles = [];
    this.keys.clear();
    this.camera.rotation.order = 'YXZ';
  }

  /**
   * 设置玩家圆形障碍（简单推挤碰撞，[{x, z, r}]）。
   * 只覆盖主要不可穿越建筑；空数组 = 无碰撞。场景 dispose 时随 setFirstPerson 清空。
   */
  setObstacles(obstacles) {
    this.obstacles = Array.isArray(obstacles) ? obstacles : [];
  }

  /** 更新第三人称相机避障列表（如 GLB 城市异步加载完成后替换避让对象）。 */
  setCameraObstacles(obstacles) {
    if (this.tp) this.tp.cameraObstacles = Array.isArray(obstacles) ? obstacles : null;
  }

  snapCameraToTarget() {
    if (!this.tp) return;
    const desired = this.getDesiredCameraPosition(new THREE.Vector3());
    this.camera.position.copy(desired);
    this.camera.lookAt(this.getLookTarget(new THREE.Vector3()));
    this.camera.updateMatrixWorld(true);
  }

  getDesiredCameraPosition(out) {
    const { target, distance, height } = this.tp;
    const cosPitch = Math.cos(this.orbitPitch);
    out.set(
      target.position.x + Math.sin(this.orbitYaw) * cosPitch * distance,
      target.position.y + height + Math.sin(this.orbitPitch) * distance,
      target.position.z + Math.cos(this.orbitYaw) * cosPitch * distance,
    );
    return out;
  }

  getLookTarget(out) {
    out.copy(this.tp.target.position);
    out.y += this.tp.lookHeight;
    return out;
  }

  update(dt) {
    if (!this.enabled || this.disposed) return;
    const delta = Math.min(Math.max(dt, 0), 0.1);

    if (this.mode === 'third-person' && this.tp) {
      this.updateThirdPerson(delta);
      return;
    }

    if (this.document.pointerLockElement !== this.domElement) return;
    let forward = Number(this.keys.has('KeyW')) - Number(this.keys.has('KeyS'));
    let right = Number(this.keys.has('KeyD')) - Number(this.keys.has('KeyA'));
    const length = Math.hypot(forward, right);
    if (length === 0) return;

    forward /= length;
    right /= length;
    const yaw = this.camera.rotation.y;
    this.camera.position.x += (right * Math.cos(yaw) - forward * Math.sin(yaw)) * this.speed * delta;
    this.camera.position.z += (-right * Math.sin(yaw) - forward * Math.cos(yaw)) * this.speed * delta;
  }

  updateThirdPerson(delta) {
    const tp = this.tp;
    const locked = this.document.pointerLockElement === this.domElement;

    // 角色移动（仅 pointer lock 时接受按键，与第一人称一致）
    if (locked) {
      let forward = Number(this.keys.has('KeyW')) - Number(this.keys.has('KeyS'));
      let right = Number(this.keys.has('KeyD')) - Number(this.keys.has('KeyA'));
      const length = Math.hypot(forward, right);
      if (length > 0) {
        forward /= length;
        right /= length;
        const yaw = this.orbitYaw;
        const moveX = (right * Math.cos(yaw) - forward * Math.sin(yaw));
        const moveZ = (-right * Math.sin(yaw) - forward * Math.cos(yaw));
        const moveSpeed = tp.moveSpeed ?? this.speed;
        tp.target.position.x += moveX * moveSpeed * delta;
        tp.target.position.z += moveZ * moveSpeed * delta;
        // 简单碰撞：把角色推出圆形障碍（覆盖主要建筑即可，不做完整物理）
        if (this.obstacles.length > 0) {
          const p = tp.target.position;
          const min = tp.playerRadius;
          for (const obstacle of this.obstacles) {
            const dx = p.x - obstacle.x;
            const dz = p.z - obstacle.z;
            const dist = Math.hypot(dx, dz);
            const limit = obstacle.r + min;
            if (dist < limit && dist > 1e-4) {
              p.x = obstacle.x + (dx / dist) * limit;
              p.z = obstacle.z + (dz / dist) * limit;
            }
          }
        }
        // 角色朝向移动方向（短弧平滑插值，停止时不抽搐）
        const desiredYaw = Math.atan2(moveX, moveZ);
        let diff = desiredYaw - tp.target.rotation.y;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        tp.target.rotation.y += diff * (1 - Math.exp(-tp.turnDamping * delta));
      }
    }

    // 相机阻尼跟随：帧率无关的指数平滑，目标静止时收敛不抽搐
    const desired = this.getDesiredCameraPosition(new THREE.Vector3());
    // 相机避障：从注视点向期望机位做 raycast，被建筑挡住则把相机拉近。
    // 拉近/恢复经过非对称平滑：拉近快（绝不穿模）、恢复慢（不弹跳）。
    if (tp.cameraObstacles?.length) {
      const look = this.getLookTarget(this.tmpLook);
      this.tmpDir.copy(desired).sub(look);
      const fullDistance = this.tmpDir.length();
      if (fullDistance > 1e-4) {
        this.tmpDir.normalize();
        let clampedDistance = fullDistance;
        this.cameraRaycaster.set(look, this.tmpDir);
        this.cameraRaycaster.far = fullDistance;
        const hits = this.cameraRaycaster.intersectObjects(tp.cameraObstacles, true);
        if (hits.length > 0) {
          clampedDistance = Math.max(hits[0].distance - 0.35, 1.2);
        }
        if (this.tpSmoothedDistance == null) this.tpSmoothedDistance = clampedDistance;
        const smoothing = clampedDistance < this.tpSmoothedDistance
          ? tp.collisionSnapDamping
          : tp.collisionRecoverDamping;
        this.tpSmoothedDistance += (clampedDistance - this.tpSmoothedDistance)
          * (1 - Math.exp(-smoothing * delta));
        desired.copy(look).addScaledVector(
          this.tmpDir,
          Math.min(this.tpSmoothedDistance, fullDistance),
        );
      }
    } else {
      this.tpSmoothedDistance = null;
    }
    const alpha = 1 - Math.exp(-tp.cameraDamping * delta);
    this.camera.position.lerp(desired, alpha);
    this.camera.lookAt(this.getLookTarget(new THREE.Vector3()));
  }

  teleport(position) {
    if (!position) throw new Error('teleport(position) requires a position.');
    this.keys.clear();
    if (this.mode === 'third-person' && this.tp) {
      // position 语义是“出生观察点”：角色落点在地面（y=0），相机由跟随逻辑接管
      this.tp.target.position.set(position.x, 0, position.z);
      this.snapCameraToTarget();
      return;
    }
    this.camera.position.copy(position);
    this.camera.updateMatrixWorld(true);
  }

  getPosition() {
    if (this.mode === 'third-person' && this.tp) return this.tp.target.position.clone();
    return this.camera.position.clone();
  }

  setEnabled(enabled) {
    this.enabled = Boolean(enabled);
    if (!this.enabled) this.keys.clear();
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.keys.clear();
    this.domElement.removeEventListener('click', this.onCanvasClick);
    this.document.removeEventListener('pointerlockchange', this.onPointerLockChange);
    this.document.removeEventListener('mousemove', this.onMouseMove);
    this.document.removeEventListener('keydown', this.onKeyDown);
    this.document.removeEventListener('keyup', this.onKeyUp);
    this.window.removeEventListener('blur', this.clearKeys);
  }
}
