import * as THREE from 'three';
import '../styles/earth.css';
import { disposeScene } from './sceneHelpers.js';
import { buildCity } from './earth/city.js';
import { buildCompanionRobot } from './earth/robot.js';
import { buildCivilizationHall } from './earth/hall.js';
import { buildSpaceElevator } from './earth/elevator.js';
import { createDialogue, createInfoPanel, playFade } from './earth/dialogue.js';

// 2126：人类第二家园计划 · 第一关「地球」。
// 体验链：中央广场出生 → 陪伴机器人「小满」→ 文明展厅全息太阳系 → 太空电梯 → 月球。
// 本场景只消费 Shared Core 注入的 ctx，不重建任何核心系统。

const ROBOT_LINES = [
  '你好，我是小满，这座城市的陪伴型 AI。欢迎来到 2126 年——你现在站的地方不只是建筑集合，而是一套由 AI 协调的大型生命维持系统。',
  '能源与电网：我实时协调聚变电站、太阳能阵列和储能网络，把电力精确送到每个街区——“停电”已经是历史名词。',
  '交通调度：空中磁悬浮环和无人飞行器由我统一指挥，全城通行时间被压缩到分钟级。',
  '水资源循环：每一滴水都被回收、净化、再利用，闭环利用率 99.7%。',
  '自动化农业：楼宇里的垂直农场全年无休，新鲜食物从种植仓直达餐桌。',
  '天气预警与建筑温控：我提前 72 小时预测天气，每栋建筑会随预报自动调节温度与能耗。',
  '碳循环管理：多余的二氧化碳被捕集并转化成材料和燃料，城市的呼吸是闭环的。',
  '想看看人类下一步去哪吗？去西北边的文明展厅看看太阳系全息模型，然后到东北边的太空电梯出发——月球见！',
];

const HALL_PAGES = [
  '太阳与戴森群：数以万计的太阳能收集器以不同轨道环绕太阳运行——不是封闭的硬壳，而是一群可控的“能量蜂群”，把恒星的能源持续传回人类文明。',
  '奥尼尔圆柱：成对反向自旋的巨型圆筒，靠离心力模拟重力，内部有城市、农田与湖泊，每座可容纳数万人长期生活。',
  '文明路线：地球 → 月球 → 火星。第二家园计划的第一站是月球前哨，乘太空电梯出发即可抵达。',
];

export function createEarthScene(ctx) {
  const scene = new THREE.Scene();
  scene.name = 'earth';
  scene.background = new THREE.Color(0xbfe0ef);
  scene.fog = new THREE.Fog(0xcfe6f2, 55, 230);

  const hemisphere = new THREE.HemisphereLight(0xeaf6ff, 0x9fb3bd, 1.25);
  scene.add(hemisphere);
  const sunlight = new THREE.DirectionalLight(0xfff2dd, 1.6);
  sunlight.position.set(60, 90, 40);
  scene.add(sunlight);

  const spawn = new THREE.Vector3(0, 1.7, 5);

  const city = buildCity(scene);
  const robot = buildCompanionRobot(scene);
  const hall = buildCivilizationHall(scene);
  const elevator = buildSpaceElevator(scene);

  // ---- 交互：陪伴机器人「小满」（模态对话，暂停输入）----
  const robotDialogue = createDialogue({
    ctx,
    speaker: '小满 · 城市陪伴 AI',
    lines: ROBOT_LINES,
  });
  ctx.interaction.add(robot.group, {
    text: '和陪伴机器人小满聊聊',
    distance: 15,
    onInteract() {
      ctx.state.set('talkedEarthAI', true);
      robotDialogue.open();
    },
  });

  // ---- 交互：文明展厅全息导览（非模态面板，重复按 E 翻页）----
  const hallPanel = createInfoPanel({ title: '文明展厅 · 全息导览', pages: HALL_PAGES });
  ctx.interaction.add(hall.consoleObject, {
    text: '查看太阳系全息模型',
    distance: 48,
    onInteract() {
      ctx.state.set('visitedSolarSystem', true);
      hallPanel.next();
    },
  });

  // ---- 交互：太空电梯（淡出 + 前往月球）----
  let fadeCleanup = null;
  ctx.interaction.add(elevator.portal, {
    text: '进入太空电梯',
    distance: 60,
    onInteract() {
      ctx.ui.flash('太空电梯已启动：正在前往月球…');
      fadeCleanup = playFade();
      ctx.sceneManager.go('moon');
    },
  });

  return {
    scene,
    spawn,

    enter() {
      ctx.ui.setScene('EARTH 2126 · 中央广场');
      ctx.ui.flash('跟随发光道路：先和广场的小满聊聊，再去文明展厅，最后乘太空电梯出发');
    },

    update(dt) {
      city.update(dt);
      robot.update(dt);
      hall.update(dt);
      elevator.update(dt);
    },

    exit() {
      // 关闭对话并恢复输入，避免把暂停状态带进下一个场景。
      robotDialogue.destroy();
    },

    dispose() {
      robotDialogue.destroy();
      hallPanel.destroy();
      if (fadeCleanup) {
        fadeCleanup();
        fadeCleanup = null;
      }
      disposeScene(scene);
    },
  };
}
