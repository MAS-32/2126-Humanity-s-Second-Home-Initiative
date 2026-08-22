/**
 * Data 模块 —— 《2126：人类第二家园计划》· 火星子模块
 * ------------------------------------------------------------------
 * 集中所有“可共享的世界观数据 / 配置 / 资源路径”，消除硬编码。
 * 主工程整合时可直接读取或覆盖这些常量，而无需改动场景代码。
 *
 *   import { CONFIG, WORLD, ASSETS } from 'mars-civilization-2126/data';
 */

// 全局可调参数（渲染 / 相机 / 灯光 / 探索 / 文明规模）
export { CONFIG } from '../core/config.js';

// 静态资源路径（已按 vite base 解析，支持任意部署子路径）
export { ASSETS, BASE } from '../core/assets.js';

// 跨模块运行时状态（含 resetState 供主工程卸载时复位）
export { S, resetState } from '../core/state.js';

/**
 * WORLD —— 供 UI / 数据面板 / 主工程统一世界观读取的“火星文明快照”。
 * 与 CONFIG.civilization 同步，主工程可注入统一数值。
 */
export const WORLD = {
  name: 'Mars',
  code: 'MARS-2126',
  year: 2126,
  /** 城市清单（与 scene/cities/* 一一对应，主工程可据此生成导航） */
  cities: [
    { id: 'capital',     name: 'Aurelia 火星首都',   kind: '首都穹顶城' },
    { id: 'eco',         name: 'Verde 翡绿生态城',   kind: '生态穹顶城' },
    { id: 'industrial',  name: 'Hephaestus 工业城',  kind: '工业城' },
    { id: 'mining',      name: 'Glacies 冰川矿城',   kind: '采矿城' },
    { id: 'frontier',    name: 'Frontier 前哨城',    kind: '新移民城' },
    { id: 'research',    name: 'Olympus 科研站',     kind: '科研站' },
  ],
  /** 轨道设施 */
  orbital: [
    { id: 'areos-gate',  name: 'Areos Gate 轨道空间港', kind: '太空电梯 + 环形站' },
    { id: 'shipyard',    name: '轨道船坞环',          kind: '船坞' },
  ],
  /** 从 CONFIG.civilization 派生的展示数值 */
  metrics() {
    const c = CONFIG.civilization;
    return {
      population: c.population,
      domeCities: c.domeCities,
      researchStations: c.researchStations,
      outposts: c.outposts,
      maglevLines: c.maglevLines,
      iceReserveM3: c.iceReserveM3,
    };
  },
};
