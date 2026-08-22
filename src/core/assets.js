/* 静态资源路径解析 —— 消除硬编码相对路径
 * 《2126：人类第二家园计划》· 火星子模块
 *
 * 所有资源都通过 BASE 前缀解析，因此本模块可以部署在：
 *   - 域名根路径          https://mars.example.com/
 *   - 主工程子路径        https://2126.example.com/mars/
 *   - 本地 dev server     http://localhost:5173/
 * 只需构建时设置 vite 的 base，无需改动任何代码。
 */

/** Vite 在构建时注入；非 Vite 环境（如被主工程以源码方式引入）回退到根路径 */
const BASE = (import.meta.env && import.meta.env.BASE_URL) || '/';

const url = p => BASE.replace(/\/$/, '') + '/' + p.replace(/^\//, '');

export const ASSETS = {
  /** NASA 火星表面漫反射贴图 */
  marsColor: url('textures/mars_color.jpg'),
  /** 火星地形高程转凹凸贴图 */
  marsBump: url('textures/mars_bump.jpg'),
  /** 开拓者广场纪念雕像肖像贴图 */
  muskPortrait: url('textures/musk.jpg'),
  /** 星达头像（HUD 对话框） */
  xingdaAvatar: url('textures/xingda.png'),
  /** 星达角色模型 —— 缺失时自动回退到程序化代理模型，不报错 */
  xingdaModel: url('assets/characters/xingda.glb'),
};

export { BASE };
