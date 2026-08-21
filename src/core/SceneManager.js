export class SceneManager {
  constructor({ ctx, state, player, interaction }) {
    this.ctx = ctx;
    this.state = state;
    this.player = player;
    this.interaction = interaction;
    this.factories = new Map();
    this.current = null;
    this.currentName = null;
    this.disposed = false;
    this.queue = Promise.resolve();
  }

  register(name, factory) {
    if (!name || typeof factory !== 'function') throw new TypeError('register(name, factory) requires a scene factory.');
    this.factories.set(name, factory);
    return this;
  }

  go(name) {
    if (this.disposed) return Promise.reject(new Error('SceneManager is disposed.'));
    if (!this.factories.has(name)) return Promise.reject(new Error(`Unknown scene: "${name}".`));

    const transition = this.queue.then(() => this.performGo(name));
    this.queue = transition.catch(() => {});
    return transition;
  }

  async performGo(name) {
    const previous = this.current;
    const interactionWasEnabled = this.interaction.enabled !== false;

    // Stop stale E presses immediately. Registrations remain available to the
    // outgoing scene during exit/dispose, then are cleared in lifecycle order.
    this.interaction.setEnabled?.(false);
    this.current = null;
    this.currentName = null;
    this.state.set('currentScene', null);

    let next = null;

    try {
      if (previous) {
        let exitError = null;
        try {
          await previous.exit?.();
        } catch (error) {
          exitError = error;
        }

        try {
          await previous.dispose?.();
        } catch (disposeError) {
          if (exitError) {
            throw new AggregateError([exitError, disposeError], 'Scene exit and dispose both failed.');
          }
          throw disposeError;
        }
        if (exitError) throw exitError;
      }
      this.interaction.clear();

      next = await this.factories.get(name)(this.ctx);
      if (!next?.scene?.isScene || !next.spawn) {
        throw new Error(`Scene factory "${name}" must return { scene, spawn, ...lifecycle }.`);
      }

      this.current = next;
      this.currentName = name;
      this.state.set('currentScene', name);
      this.player.teleport(next.spawn);
      await next.enter?.();
      return next;
    } catch (error) {
      this.current = null;
      this.currentName = null;
      this.state.set('currentScene', null);
      this.interaction.clear();

      if (next?.dispose) {
        try {
          await next.dispose();
        } catch (cleanupError) {
          throw new AggregateError([error, cleanupError], `Scene "${name}" failed and cleanup also failed.`);
        }
      }
      throw error;
    } finally {
      if (!this.disposed) this.interaction.setEnabled?.(interactionWasEnabled);
    }
  }

  update(dt) {
    this.current?.update?.(dt);
  }

  getCurrentScene() {
    return this.current;
  }

  async dispose() {
    if (this.disposed) return;
    this.disposed = true;
    const errors = [];

    try {
      this.interaction.setEnabled?.(false);
    } catch (error) {
      errors.push(error);
    }

    try {
      await this.queue;
    } catch (error) {
      errors.push(error);
    }

    const current = this.current;
    this.current = null;
    this.currentName = null;
    try {
      this.state.set('currentScene', null);
    } catch (error) {
      errors.push(error);
    }

    if (current) {
      try {
        await current.exit?.();
      } catch (error) {
        errors.push(error);
      }
      try {
        await current.dispose?.();
      } catch (error) {
        errors.push(error);
      }
    }

    try {
      this.interaction.clear();
    } catch (error) {
      errors.push(error);
    }
    try {
      this.factories.clear();
    } catch (error) {
      errors.push(error);
    }

    // A cleanup callback may have changed this; disposal always leaves input off.
    try {
      this.interaction.setEnabled?.(false);
    } catch (error) {
      errors.push(error);
    }

    if (errors.length > 0) throw new AggregateError(errors, 'SceneManager disposal failed.');
  }
}
