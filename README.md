# 2126: Humanity's Second Home Initiative

Minimal Three.js shared gameplay core for a browser-based Earth → Moon → Mars hackathon game. The demo intentionally uses primitive geometry so scene developers can replace content without replacing the engine.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL, click the 3D world to enable pointer lock, move with WASD, aim with the mouse, and press E when prompted.

```bash
npm run build       # production build
npm test            # Vitest unit/integration suite
npm run test:e2e    # Playwright real-browser smoke suite
```

If Playwright has no local Chromium binary, install it once with `npx playwright install chromium`.

## Shared Core contract

There is one `Game`, renderer, camera, animation loop, `PlayerController`, `InteractionSystem`, `GameState`, and `SceneManager`. Every scene factory receives the same shared context:

```js
ctx = {
  camera,
  renderer,
  player,
  interaction,
  state,
  sceneManager,
  ui, // tiny setScene/flash adapter used by the demo
};
```

- `player`: `update(dt)`, `teleport(position)`, `getPosition()`, `setEnabled(boolean)`, `dispose()`
- `interaction`: `add(object, options)`, `remove(object)`, `clear()`, `update()`, `setEnabled(boolean)`, `dispose()`
- `sceneManager`: `register(name, factory)`, `go(name)`, `update(dt)`, `getCurrentScene()`, `dispose()`
- `state`: `get(key)`, `set(key, value)`, `reset()`, `snapshot()`, `subscribe(key, callback)`

Game state values must be compatible with the browser structured-clone algorithm (plain data, not functions or Three.js scene objects). Inputs, reads, defaults, resets, snapshots, and subscriber values are cloned so nested state cannot be mutated accidentally by another scene.

Call `game.setInputEnabled(false)` while a dialogue/modal is open, then re-enable it after closing.

## Create a scene

Create a factory in `src/scenes/` with this interface. A scene owns and disposes its own Three.js resources, but it must not create a renderer, camera, player, or animation loop.

```js
import * as THREE from 'three';

export function createMoonScene(ctx) {
  const scene = new THREE.Scene();
  const spawn = new THREE.Vector3(0, 1.7, 5);

  return {
    scene,
    spawn,
    enter() {},
    update(dt) {},
    exit() {},
    dispose() {
      // Dispose this scene's geometries, materials, textures and other resources.
    },
  };
}
```

Register it once in `Game.js`:

```js
sceneManager.register('moon', createMoonScene);
```

## Add an interaction

Register the top-level Group or Mesh. Recursive raycasting means a hit on a nested child still resolves to the registered ancestor. Registrations are automatically cleared during scene changes.

```js
ctx.interaction.add(rocket, {
  text: 'Enter Rocket',
  distance: 4,
  onInteract() {
    ctx.state.set('arrivedMars', true);
    ctx.sceneManager.go('mars');
  },
});
```

Do not import another scene from a scene. Communicate only through `ctx.state`, `ctx.interaction`, and `ctx.sceneManager`.
