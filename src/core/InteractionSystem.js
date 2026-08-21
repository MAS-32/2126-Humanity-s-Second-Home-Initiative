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

  update() {
    if (!this.enabled || this.disposed || this.entries.size === 0) {
      this.clearActive();
      return;
    }

    this.camera.updateMatrixWorld(true);
    const roots = [...this.entries.keys()];
    roots.forEach((root) => root.updateWorldMatrix(true, true));
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
