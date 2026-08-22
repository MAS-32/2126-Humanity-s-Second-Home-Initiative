/* 跨模块共享的可变运行时状态
 * 《2126：人类第二家园计划》· 火星子模块
 *
 * 为什么需要这个文件：
 * ES Module 的 import 是只读绑定，模块 A 无法直接对模块 B 的 `let` 变量赋值。
 * 原单体原型里这些变量在多个功能区之间双向读写，拆分后统一收敛到本对象，
 * 由各模块通过 `S.xxx = ...` 读写，语义与原型完全一致。
 */

export const S = {
  /** 当前主模式：planet 星球轨道 | city 城市俯视 | explore 地表漫游 | surface 地表城市内部 */
  mode: 'planet',

  /** 当前聚焦的城市 Group（THREE.Group | null） */
  currentCity: null,

  /** 进行中的镜头补间动画描述对象（null 表示无动画） */
  camAnim: null,

  /** 地表漫游时玩家的角色视觉适配器实例 */
  exploreAvatar: null,

  /** 准星命中提示的保持计时器 */
  aimTimer: 0,
  /** 地名提示刷新计时器 */
  locTimer: 0,
  /** 步行摆动相位 —— 驱动脚步节奏与镜头微晃 */
  walkPhase: 0,

  /** 低重力跳跃的垂直位移 */
  jumpY: 0,
  /** 低重力跳跃的垂直速度 */
  jumpV: 0,

  /** 当前正在对话的 NPC */
  activeNPC: null,
  /** 当前 NPC 台词行号 */
  npcLineIdx: 0,

  /** 玩家无操作累计时长 —— 用于触发星达主动搭话 */
  xdIdleT: 0,

  /** 着陆过程互斥锁，防止重复触发降落动画 */
  landing: false,

  /** 地下水冰透视：目标强度（0 关闭 / 1 全透视） */
  xrayTarget: 0,
  /** 地下水冰透视：当前插值强度 */
  xrayCur: 0,
};

const INITIAL = { ...S };

/** 重置为初始状态 —— 主工程重复挂载/卸载本模块时调用 */
export function resetState() {
  Object.assign(S, INITIAL);
}
