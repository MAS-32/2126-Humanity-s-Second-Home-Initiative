import * as THREE from 'three';

const MOVEMENT_KEYS = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD']);

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

  update(dt) {
    if (!this.enabled || this.disposed || this.document.pointerLockElement !== this.domElement) return;
    const delta = Math.min(Math.max(dt, 0), 0.1);
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

  teleport(position) {
    if (!position) throw new Error('teleport(position) requires a position.');
    this.keys.clear();
    this.camera.position.copy(position);
    this.camera.updateMatrixWorld(true);
  }

  getPosition() {
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
