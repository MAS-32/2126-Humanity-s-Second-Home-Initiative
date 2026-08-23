# HANDOFF FOR NEXT AI

## Current architecture

The repository's real implementation is JavaScript + Vite + Three.js. It is not React/TypeScript/R3F. The codebase truth takes precedence over older prompts.

`src/core/Game.js` owns the only WebGL renderer, perspective camera, `PlayerController`, `InteractionSystem`, `SceneManager`, `GameState`, resize listener and `requestAnimationFrame` loop. Scene modules receive these services through `ctx` and must never construct replacements.

## Completed integration

- Earth remains the P0-complete `feature/xingda-glb` implementation, including the real Xingda GLB, city GLB, third-person controller, interactions and elevator ascent.
- The space elevator ascent no longer enters the Shared Core Moon adapter. After the white chapter title holds ~1.25s, the page navigates to the standalone moon outpost at `public/outpost/moon-base.html` (see "Elevator handoff" below).
- Moon is a Shared Core scene adapter. It preserves the standalone Moon branch's world concepts: Central Hub, eco dome, research village, solar-system observatory and deep-space rocket port.
- Mars is a Shared Core scene adapter based on the available Aurora City brief: ecological domes, underground agriculture, equatorial ISRU industry and city archive.
- In-page navigation through `SceneManager` still exists but the adapter Moon is no longer reachable from normal Earth play: Earth's only exit is the cross-page outpost handoff; Mars keeps its Moon gate (`mars-moon-portal`), and tests reach adapters via `sceneManager.go(...)`.
- `GameState` now contains nested `earth`, `moon` and `mars` namespaces while retaining the existing compatibility flags.
- Scene camera/renderer presets are applied and restored by `createSceneRuntimeAdapter` in `src/scenes/sceneHelpers.js`.

## Elevator handoff (2026-08-23)

- The user's standalone project `moon-outpost-2126` (its own renderer, pointer lock, postprocessing, transit, quests) is served verbatim from `public/outpost/` (Vite serves `public/` at the site root; production build copies it into `dist/`). The copy excludes the outpost's `src/test/` node tests and `OpeningScene.test.mjs`.
- `src/scenes/earth/outpost.js` owns the destination (`outpost/moon-base.html`) and the `goToMoonOutpost()` navigation seam; `ascent.js` triggers it from a dt-driven handoff phase after the chapter overlay, so tests can pump frames instead of waiting on real timers.
- To re-sync the outpost copy after editing the standalone project: `rsync -a --exclude 'test/' --exclude 'OpeningScene.test.mjs' /path/to/moon-outpost-2126/src/ public/outpost/`.
- `public/favicon.ico` exists because full-page navigation to the outpost made Chromium request a favicon; without it the e2e console-error assertion fails on a 404.
- The outpost's own pages link internally (`solar-hub.html`, `mars-city.html`); its back button returns to the outpost's solar hub, and since 2026-08-23 the hub's Earth dossier/mission carries a 开始探索 entry routed by `XP_LINKS.earth = '/?skip-opening'` back into this repository's game — the full loop is Earth → elevator → outpost → hub → Earth. The hub's Moon entry routes through `playMoonTransition()` (in both solar-hub copies): a fullscreen `assets/moon-civilization.mp4` overlay (watermark intentionally kept, per product decision) with a skip button, navigating to `moon-base.html` on end/skip/error.

## Mars chapter hosting (2026-08-23)

- The team's Mars civilization chapter (`feature/mars`, rewritten mid-day with its own Xingda avatar, three surface cities and `window.MarsModule` runtime) is hosted at `public/mars/index.html` as a built artifact. Use the explicit `index.html` path in links: in Vite dev the bare `/mars/` directory URL is captured by the main app's SPA fallback (static hosts serve it fine, but the explicit path works everywhere).
- Rebuild after upstream changes with `node scripts/build-mars.mjs`. It re-syncs the `.mars-worktree` git worktree to `origin/feature/mars`, applies anchor-based patches, runs vite build and copies `dist/` into `public/mars/`. The patch set (see the script): (1) inject `window.MARS_INTEGRATION_ENV` runtime links into index.html; (2) wire the `#nav` earth/moon buttons to `MarsModule.goto` (upstream they are placeholder toasts); (3) make `goto` same-tab via `location.href` (upstream `window.open`s a new tab, breaking the loop); (4) `?auto-enter` / `?auto-land` URL params — auto-enter clicks through the intro, auto-land additionally enters the capital (Aurelia) surface exploration after the fly-in, then `replaceState` clears the params.
- Three integrations: the outpost rocket's launch cutscene hands off to `/mars/index.html?auto-enter&auto-land` 1.5s after the ship disappears (standalone outpost deploys fall back to `mars-city.html`); the hub's Mars 开始探索 routes to `/mars/index.html` (standalone falls back to its own dossier page); Mars's earth/moon nav buttons jump same-tab to `/?skip-opening` and `/outpost/moon-base.html`.
- The earlier pre-rewrite integration pass found four upstream startup bugs (missing `api.CITY_SITES`/`CRATERS`, `WORLD.textures` vs `TEXTURES`, split `put()` calling conventions, unbound `surfPointOf`) and one env bug (`import.meta.env?.VITE_X` optional chaining defeats Vite's define replacement). The rewrite made all of them moot — the current patch set is the four above.
- e2e determinism notes: the outpost launch cutscene is dt-driven with dt clamped to 0.05s, so headless render load stretches it several-fold in wall-clock time — the triangle test fast-forwards `window.moon._updateLaunch(0.05)` in a synchronous loop until the handoff flag is set instead of waiting on real time. Playwright runs with `workers: 1`.


- The outpost's standalone opening (`opening/OpeningScene.js` + `.css`) was copied into `src/opening/` (main source graph, unit-tested in `tests/Opening.test.js`) and rebranded for Earth: the HUD reads `文明节点 地球`, and the video is `public/assets/earth-civilization.mp4` — a 6.6s ffmpeg zoompan cinematic rendered from the public-domain NASA Apollo 17 "Blue Marble" photograph (no watermark, replacing the watermarked moon video). The outpost project keeps its own verbatim moon-themed opening; the two copies have diverged on purpose and must be edited independently.
- The video is regenerable: `ffmpeg -loop 1 -i blue-marble.jpg -filter_complex "scale=-1:2160,pad=3840:2160:(ow-iw)/2:(oh-ih)/2:black,zoompan=z='1+0.9*on/157':d=157:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1280x720:fps=24,eq=contrast=1.05:saturation=1.1:brightness=0.005,vignette=PI/5,format=yuv420p" -t 6.6 -c:v libx264 -preset slow -crf 18 -movflags +faststart -an public/assets/earth-civilization.mp4`.

## Opening cinematic (2026-08-23)
- `src/main.js` plays the opening on every page load (product decision) and creates the `Game` only inside `onEnter` — Earth ambience must not overlap the opening's WebAudio cues. The single exception: the hub's Earth entry navigates to `/?skip-opening`, and `src/opening/bootPolicy.js` (`shouldSkipOpening`, unit-tested) makes that trip boot the Earth level directly; `main.js` then strips the param via `replaceState` so a later refresh replays the opening per the default policy.
- `OpeningScene.enter()` writes `sessionStorage.opening2126Seen`; the outpost's `moon-base.html` reads the same key, so arriving from the elevator in the same tab skips the outpost's own opening automatically. No outpost code was changed for this.
- Headed pointer-lock verification needs `await page.bringToFront()` before clicking the canvas: when the headed window is not the frontmost OS window, Chrome denies pointer lock with a misleading `WrongDocumentError` while `document.hasFocus()` still returns true.

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

Results from the 2026-08-23 Mars-integration pass (local macOS, Chromium via `npx playwright install chromium`, `workers: 1`):

- Vitest: 10 files, 47 tests passed.
- Vite production build: passed; `dist/` includes both GLB files, the `outpost/` static site, the opening video and the `mars/` chapter build. Vite reports a non-blocking chunk-size warning.
- Playwright e2e: 3/3 passed — the full triangle (opening → Earth → elevator ascent → outpost → rocket launch → Mars auto-land surface exploration → Mars nav back to the outpost → moon-video transition → hub → Mars entry → Earth with the opening skipped) runs with zero unexpected console errors; in-page Earth → Moon → Mars adapter switching stays on one canvas; pointer-lock movement verified in a headed context after `bringToFront()`.
- Pointer lock cannot be granted in headless Chromium (microsoft/playwright#20956), so `tests/e2e/pointer-lock.spec.js` sets `test.use({ headless: false })`. Keep it in its own file: `test.use({ headless })` is not allowed inside a describe block.
- The outpost page render was spot-checked via headless screenshots: moon terrain, outpost structures, the full HUD, and both opening stages (boot + title) draw correctly (three.js loads from the jsdelivr CDN importmap, so offline demos need a local three fallback).

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
