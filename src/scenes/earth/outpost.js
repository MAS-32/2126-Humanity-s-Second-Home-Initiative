// 升空演出的终点交接：跳转到独立部署的月球前哨站（moon-outpost-2126 静态站，
// 挂在 public/outpost/，由 Vite 原样服务）。主工程不再经 SceneManager 进入
// 适配器版月球——地球关卡的出口是一次跨页跳转，前哨站拥有自己的完整运行时。
export const MOON_OUTPOST_URL = 'outpost/moon-base.html';

export function goToMoonOutpost() {
  window.location.href = MOON_OUTPOST_URL;
}
