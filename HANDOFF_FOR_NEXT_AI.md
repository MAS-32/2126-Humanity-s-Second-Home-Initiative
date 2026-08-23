# HANDOFF FOR NEXT AI

## Current architecture

The repository's real implementation is JavaScript + Vite + Three.js. It is not React/TypeScript/R3F. The codebase truth takes precedence over older prompts.

`src/core/Game.js` owns the only WebGL renderer, perspective camera, `PlayerController`, `InteractionSystem`, `SceneManager`, `GameState`, resize listener and `requestAnimationFrame` loop. Scene modules receive these services through `ctx` and must never construct replacements.

## Completed integration

- Earth remains the P0-complete `feature/xingda-glb` implementation, including the real Xingda GLB, city GLB, third-person controller, interactions and elevator ascent.
- Moon is a Shared Core scene adapter. It preserves the standalone Moon branch's world concepts: Central Hub, eco dome, research village, solar-system observatory and deep-space rocket port.
- Mars is a Shared Core scene adapter based on the available Aurora City brief: ecological domes, underground agriculture, equatorial ISRU industry and city archive.
- Navigation is live through `SceneManager`: Earth → Moon; Moon → Earth/Mars; Mars → Earth/Moon. Moon's rocket is an additional Moon → Mars route.
- `GameState` now contains nested `earth`, `moon` and `mars` namespaces while retaining the existing compatibility flags.
- Scene camera/renderer presets are applied and restored by `createSceneRuntimeAdapter` in `src/scenes/sceneHelpers.js`.

## Shared Core red lines

Never add a scene-local main `WebGLRenderer`, main camera controller, `PlayerController`, `InteractionSystem`, `SceneManager`, global state store, pointer-lock input runtime or `requestAnimationFrame` loop. World animation must remain in the scene's `update(dt)` callback. Navigation must call `ctx.sceneManager.go(name)`.

## Moon adapter decision

The standalone `feature/moon-outpost` branch contains valuable modular environment builders, but also owns a renderer, camera, postprocessing pipeline, keyboard/mouse listeners, pointer lock, RAF loop, iframe/postMessage bridge and a separate Xingda implementation. Those duplicate runtime pieces were deliberately not merged. The integrated scene ports its stable world/content language into the existing runtime with no iframe.

## Mars adapter decision

No independent Mars 3D runtime was present in the fetched branches. `src/mars-city.html` on the Moon branch was a static dossier and explicitly described Mars exploration as under construction. The integrated Mars scene therefore uses that confirmed content and the Shared Core; do not claim a missing Mars game was migrated.

## Tests and verification

Run:

```bash
npm test
npm run build
npm run test:e2e
```

Key regression coverage lives in `tests/SceneFlow.test.js`, `tests/SceneAdapters.test.js` and `tests/e2e/game.spec.js`. The browser suite checks repeated switching, one canvas, the Earth GLB, console output and pointer-lock movement.

Results from the 2026-08-23 integration pass:

- Vitest: 9 files, 42 tests passed via the installed `vitest run` binary.
- Vite production build: passed; output includes both GLB files. Vite reports a non-blocking 685.93 kB chunk-size warning.
- Dev-server HTTP checks: `/`, Xingda GLB and future-city GLB all returned 200.
- E2E/browser: not completed in this environment. Playwright could not launch because Chromium was absent; the browser installer repeatedly received an empty/truncated archive. The cloud browser cannot access the container's localhost. Therefore console, WebGL, pointer-lock, audio overlap and repeated-switch browser assertions remain unverified here and must not be reported as passing.
- The `npm` wrapper itself was blocked by the execution environment before script launch. The exact installed binaries used by those scripts (`vitest`, `vite`, `playwright`) were invoked directly so the code-test results remain explicit.

## Next steps

1. Replace the current adapter geometry incrementally with selected Moon/Mars assets only after profiling.
2. Add scene-scoped audio presets if audio assets are supplied; pause/fade them in lifecycle cleanup.
3. Add a lightweight Opening overlay only if product owners confirm it belongs in this repository. The current real repository starts directly on Earth.
4. Keep scene-specific CSS under a body class or namespaced root.

## Do not break

- Earth movement, camera, Xingda, city GLB, interactions, UI and elevator ascent.
- One-canvas/one-loop ownership in `Game`.
- SceneManager's queued exit → dispose → clear → create → enter lifecycle.
- Interaction cleanup and Earth third-person teardown when changing worlds.
- Persisted Moon/Mars state across repeated visits.
