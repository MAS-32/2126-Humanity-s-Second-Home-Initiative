/* 全局可调参数 —— 集中所有魔法数字，供主工程覆盖
 * 《2126：人类第二家园计划》· 火星子模块
 *
 * 主工程整合时可在挂载前覆盖，例如：
 *   import { CONFIG } from 'second-home-mars';
 *   CONFIG.render.bloomStrength = 0.3;   // 降低泛光以匹配主工程视觉基调
 */

export const CONFIG = {
  /** 火星球体基准半径（场景单位）。所有地表/轨道高度均以此为基准换算。 */
  planetRadius: 50,

  /** 世界随机种子 —— 固定值保证地形、陨石坑、城市细节在任何设备上完全一致 */
  seed: 2126,

  render: {
    /** 设备像素比上限，移动端防止过度渲染 */
    maxPixelRatio: 2,
    fov: 48,
    near: 0.05,
    far: 8000,
    toneMappingExposure: 1.1,
    bloomStrength: 0.5,
    bloomRadius: 0.45,
    bloomThreshold: 0.82,
    background: 0x02040a,
  },

  camera: {
    /** 轨道视角距离约束 */
    minDistance: 64,
    maxDistance: 700,
    autoRotateSpeed: 0.45,
    dampingFactor: 0.06,
  },

  light: {
    /** 太阳方向（归一化前的原始向量） */
    sunDir: [0.78, 0.32, 0.54],
    sunColor: 0xfff0dd,
    sunIntensity: 2.4,
    ambientColor: 0x46536a,
    ambientIntensity: 0.32,
    hemiSky: 0x8fb4d8,
    hemiGround: 0x3a2418,
    hemiIntensity: 0.35,
  },

  /** 地表探索模式（第一/第三人称）运动参数 —— 火星低重力 */
  explore: {
    walkSpeed: 3.2,
    runMultiplier: 2.1,
    gravity: 3.72,        // 火星重力加速度 m/s²
    jumpVelocity: 4.2,
    eyeHeight: 1.62,
  },

  /** 文明规模设定 —— 供 UI 与数据面板读取，主工程可注入统一世界观数值 */
  civilization: {
    year: 2126,
    population: 1024000,
    domeCities: 5,
    researchStations: 1,
    outposts: 14,
    maglevLines: 5,
    iceReserveM3: 4.6e8,
  },
};
