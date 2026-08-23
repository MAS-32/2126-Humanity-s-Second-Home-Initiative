// 开屏渲染播放策略。默认每次加载都完整播放（产品决定）；
// 唯一例外：太阳系枢纽的地球「开始探索」以 /?skip-opening 回程，
// 跳过开场直达地球关卡。主入口消费后用 replaceState 清掉参数，
// 之后的刷新恢复默认策略。
export function shouldSkipOpening(search = window.location.search) {
  return new URLSearchParams(search).has('skip-opening');
}
