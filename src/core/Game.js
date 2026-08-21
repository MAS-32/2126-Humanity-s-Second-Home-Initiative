import * as THREE from 'three';
import { GameState } from './GameState.js';
import { PlayerController } from './PlayerController.js';
import { InteractionSystem } from './InteractionSystem.js';
import { SceneManager } from './SceneManager.js';
import { createEarthScene } from '../scenes/EarthScene.js';
import { createMoonScene } from '../scenes/MoonScene.js';
import { createMarsScene } from '../scenes/MarsScene.js';

export class Game {
  constructor({ mount, ui }) {
    if (!mount) throw new Error('Game requires a mount element.');
    this.mount = mount;
    this.ui = ui;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.mount.append(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 500);
    this.state = new GameState();
    this.player = new PlayerController({ camera: this.camera, domElement: this.renderer.domElement });
    this.interaction = new InteractionSystem({
      camera: this.camera,
      promptElement: document.querySelector('#interaction-prompt'),
    });

    this.ctx = {
      camera: this.camera,
      renderer: this.renderer,
      player: this.player,
      interaction: this.interaction,
      state: this.state,
      sceneManager: null,
      ui: this.ui,
    };
    this.sceneManager = new SceneManager({
      ctx: this.ctx,
      state: this.state,
      player: this.player,
      interaction: this.interaction,
    });
    this.ctx.sceneManager = this.sceneManager;
    this.sceneManager
      .register('earth', createEarthScene)
      .register('moon', createMoonScene)
      .register('mars', createMarsScene);

    this.running = false;
    this.disposed = false;
    this.startPromise = null;
    this.frameId = null;
    this.lastTime = 0;
    this.onResize = () => this.resize();
    window.addEventListener('resize', this.onResize);
    this.unsubscribeState = this.state.subscribe('*', (snapshot) => this.ui.renderState(snapshot));
    this.ui.renderState(this.state.snapshot());
  }

  start() {
    if (this.disposed) return Promise.reject(new Error('Game is disposed.'));
    if (this.startPromise) return this.startPromise;
    this.startPromise = this.sceneManager.go('earth').then(() => {
      if (this.disposed) return;
      this.running = true;
      this.lastTime = performance.now();
      this.frameId = requestAnimationFrame((time) => this.tick(time));
    });
    return this.startPromise;
  }

  tick(time) {
    if (!this.running) return;
    const dt = Math.min((time - this.lastTime) / 1000, 0.1);
    this.lastTime = time;
    this.player.update(dt);
    this.sceneManager.update(dt);
    this.interaction.update();
    const activeScene = this.sceneManager.getCurrentScene()?.scene;
    if (activeScene) this.renderer.render(activeScene, this.camera);
    this.frameId = requestAnimationFrame((nextTime) => this.tick(nextTime));
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  setInputEnabled(enabled) {
    this.player.setEnabled(enabled);
    this.interaction.setEnabled(enabled);
  }

  async dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.running = false;
    const errors = [];
    const renderer = this.renderer;

    try {
      if (this.frameId !== null) cancelAnimationFrame(this.frameId);
    } catch (error) {
      errors.push(error);
    } finally {
      this.frameId = null;
    }

    try {
      window.removeEventListener('resize', this.onResize);
    } catch (error) {
      errors.push(error);
    }

    try {
      this.unsubscribeState?.();
    } catch (error) {
      errors.push(error);
    } finally {
      this.unsubscribeState = null;
    }

    try {
      await this.sceneManager.dispose();
    } catch (error) {
      errors.push(error);
    }
    try {
      this.interaction.dispose();
    } catch (error) {
      errors.push(error);
    }
    try {
      this.player.dispose();
    } catch (error) {
      errors.push(error);
    }
    try {
      renderer?.dispose();
    } catch (error) {
      errors.push(error);
    }
    try {
      renderer?.domElement?.remove();
    } catch (error) {
      errors.push(error);
    } finally {
      this.renderer = null;
    }

    if (errors.length > 0) throw new AggregateError(errors, 'Game disposal failed.');
  }
}
