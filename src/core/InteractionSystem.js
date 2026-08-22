import * as THREE from 'three';

function createDomPrompt(element) {
  return {
    show(text) {
      element.textContent = `[E] ${text}`;
      element.hidden = false;
    },
    hide() {
      element.hidden = true;
      element.textContent = '';
    },
    dispose() {
      this.hide();
    },
  };
}

export class InteractionSystem {
  constructor({ camera, promptElement, promptAdapter, documentRef = document }) {
    if (!camera) throw new Error('InteractionSystem requires a camera.');
    if (!promptAdapter && !promptElement) {
      throw new Error('InteractionSystem requires promptElement or promptAdapter.');
    }

    this.camera = camera;
    this.document = documentRef;
    this.prompt = promptAdapter ?? createDomPrompt(promptElement);
    this.raycaster = new THREE.Raycaster();
    this.raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
    this.entries = new Map();
    this.active = null;
    this.enabled = true;
    this.disposed = false;
    // 第三人称候选源（通常是由场景注入的玩家化身）。设置后交互判定从
    // 「相机准星 raycast」切换为「与 source 的距离 + 相机/角色朝向打分」，
    // 解决第三人称下“站在 NPC 旁边按 E 却没反应”的问题。
    // 不设置时保持第一人称准星路径，Moon/Mars 与既有测试行为不变。
    this.proximitySource = null;
    this.tmpSourcePos = new THREE.Vector3();
    this.tmpEntryPos = new THREE.Vector3();
    this.tmpCameraForward = new THREE.Vector3();
    this.tmpDirection = new THREE.Vector3();

    this.onKeyDown = (event) => {
      if (event.code !== 'KeyE' || event.repeat || !this.enabled || !this.active) return;
      this.active.options.onInteract();
    };
    this.document.addEventListener('keydown', this.onKeyDown);
  }

  add(object, options) {
    if (!object?.isObject3D) throw new TypeError('interaction.add requires a THREE.Object3D.');
    if (typeof options?.onInteract !== 'function') throw new TypeError('interaction.add requires onInteract().');

    this.entries.set(object, {
      text: options.text ?? 'Interact',
      distance: options.distance ?? 4,
      onInteract: options.onInteract,
    });
    return () => this.remove(object);
  }

  remove(object) {
    const removed = this.entries.delete(object);
    if (this.active?.root === object) this.clearActive();
    return removed;
  }

  clear() {
    this.entries.clear();
    this.clearActive();
  }

  findRegisteredAncestor(object) {
    let current = object;
    while (current) {
      if (this.entries.has(current)) return current;
      current = current.parent;
    }
    return null;
  }

  /**
   * 设置第三人称交互候选源（场景注入的玩家化身），传 null 恢复准星模式。
   * 场景 dispose 时必须置 null，避免把化身引用泄漏到下一场景。
   */
  setProximitySource(object) {
    if (object != null && !object.isObject3D) {
      throw new TypeError('setProximitySource requires an Object3D or null.');
    }
    this.proximitySource = object ?? null;
    this.clearActive();
  }

  update() {
    if (!this.enabled || this.disposed || this.entries.size === 0) {
      this.clearActive();
      return;
    }

    this.camera.updateMatrixWorld(true);
    const roots = [...this.entries.keys()];
    roots.forEach((root) => root.updateWorldMatrix(true, true));

    if (this.proximitySource) {
      this.updateProximity(roots);
      return;
    }

    this.raycaster.setFromCamera({ x: 0, y: 0 }, this.camera);
    const hits = this.raycaster.intersectObjects(roots, true);
    const hit = hits[0];

    if (!hit) {
      this.clearActive();
      return;
    }

    const root = this.findRegisteredAncestor(hit.object);
    const options = this.entries.get(root);
    if (!root || hit.distance > options.distance) {
      this.clearActive();
      return;
    }
    this.active = { root, object: hit.object, distance: hit.distance, options };
    this.prompt.show(options.text);
  }

  /**
   * 第三人称候选：候选 = 与 source 的距离 ≤ entry.distance；
   * 在候选中按「相机朝向打分 − 距离惩罚」选最优。朝向只影响优先级，
   * 不是硬门槛——只要站得够近，背对也能交互（符合演示手感）。
   */
  updateProximity(roots) {
    this.proximitySource.updateWorldMatrix(true, false);
    this.proximitySource.getWorldPosition(this.tmpSourcePos);
    this.camera.getWorldDirection(this.tmpCameraForward);

    let best = null;
    let bestScore = -Infinity;
    for (const root of roots) {
      const options = this.entries.get(root);
      root.getWorldPosition(this.tmpEntryPos);
      const distance = this.tmpEntryPos.distanceTo(this.tmpSourcePos);
      if (distance > options.distance) continue;
      this.tmpDirection.copy(this.tmpEntryPos).sub(this.camera.position).normalize();
      const facing = this.tmpDirection.dot(this.tmpCameraForward);
      const score = facing * 2 - distance * 0.02;
      if (score > bestScore) {
        bestScore = score;
        best = { root, options, distance };
      }
    }

    if (!best) {
      this.clearActive();
      return;
    }
    this.active = { root: best.root, object: best.root, distance: best.distance, options: best.options };
    this.prompt.show(best.options.text);
  }

  clearActive() {
    this.active = null;
    this.prompt.hide();
  }

  setEnabled(enabled) {
    this.enabled = Boolean(enabled);
    if (!this.enabled) this.clearActive();
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.document.removeEventListener('keydown', this.onKeyDown);
    this.clear();
    this.prompt.dispose?.();
  }
}
