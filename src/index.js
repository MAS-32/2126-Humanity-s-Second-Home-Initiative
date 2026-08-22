/**
 * 公共集成入口（Barrel）—— 《2126：人类第二家园计划》· 火星子模块
 * ------------------------------------------------------------------
 * 主工程（地球 / 月球 / 火星 / 太阳系档案 …）可通过本文件以统一方式
 * 引入火星子模块的能力，而无需关心内部实现：
 *
 *   import { CONFIG, WORLD, PlayerController, GlobalCompanion,
 *            marsGroup, enterSurface, flyTo } from 'mars-civilization-2126';
 *
 * 注意：本文件仅导出“稳定 API”。渲染器 / 场景实例等带副作用的模块
 * 不在此导出，避免被非 DOM 环境（SSR / 测试）误引导致崩溃。
 */

// —— Data：世界观 / 配置 / 资源 / 状态 ——
export { CONFIG, WORLD, ASSETS, BASE, S, resetState } from './data/index.js';

// —— Core：随机 / 数学工具 ——
export { mulberry32, rand, clamp, sstep, pBase, snoise, fbm } from './core/random.js';

// —— Character：角色控制器与适配器 ——
export { AvatarAdapter, XingdaAvatarAdapter } from './character/avatar-xingda.js';
export { GlobalCompanion } from './character/companion-global.js';
export { PlayerController } from './character/player.js';

// —— Scene：可组合的场景构件 ——
export { marsGroup, CITY_SITES, terrainH, capViewPos, surfMat, marsSurface }
  from './scene/terrain.js';
export { iceGroup } from './scene/ice-layers.js';
export { clouds, dust, cloudMat } from './scene/atmosphere.js';
export { buildAurelia } from './surface/aurelia.js';
export { buildVerde } from './surface/verde.js';
export { buildHephaestus } from './surface/hephaestus.js';

// —— Interaction：镜头 / 地表 / 漫游 / 导览 ——
export { flyTo, enterCity, exitCity } from './interaction/modes.js';
export { stopTour } from './interaction/tour.js';
export { SURFACE_BUILDERS, enterSurface, exitSurface } from './surface/enter-exit.js';
export { updateSurface } from './surface/update.js';

// —— UI ——
export { showInfo, showBuilding, infoPanel } from './ui/info-panel.js';
