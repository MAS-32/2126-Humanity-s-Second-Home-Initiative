import * as THREE from 'three';
import '../styles/earth.css';
import { disposeScene } from './sceneHelpers.js';
import { buildCity } from './earth/city.js';
import { buildCompanionRobot } from './earth/robot.js';
import { buildCivilizationHall } from './earth/hall.js';
import { buildSpaceElevator } from './earth/elevator.js';
import { buildXingda } from './earth/xingda.js';
import { buildNpcs, NPC_DIALOGUES } from './earth/npcs.js';
import { createAscent } from './earth/ascent.js';
import { createDialogue, createBranchDialogue } from './earth/dialogue.js';

// 2126：人类第二家园计划 · 第一关「地球」。
// 体验链：中央广场出生（第三人称操控星达）→ 小满/NPC 对话 → 深空规划馆 → 太空电梯
// → 地月上升演出 → sceneManager.go('moon')。本场景只消费 Shared Core 注入的 ctx。

const XIAOMAN_LINES = [
  '你好呀，我是小满，这座城市的陪伴型 AI。哇，星达今天也很有精神呢！',
  '2126 年的城市不只是建筑集合，而是一套由 AI 协调的大型生命维持系统。',
  '能源与电网：我实时协调聚变电站、太阳能阵列和戴森群送下来的电力，“停电”已经是历史名词。',
  '交通调度：头顶两条空中环线上的飞行器都由我统一指挥，拥堵这个词早就进博物馆了。',
  '水资源循环：每一滴水都被回收、净化、再利用，闭环利用率 99.7%。',
  '想了解更多细节？气象站找 M-07，农场塔找 A-12，他们都是这方面的专家。',
  '想看看人类下一步去哪？去西北边的深空规划馆看看太阳系全息模型，然后到东北边的太空电梯出发——月球见！',
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
  const xingda = buildXingda(scene);
  const robot = buildCompanionRobot(scene);
  const hall = buildCivilizationHall(scene);
  const elevator = buildSpaceElevator(scene);
  const npcs = buildNpcs(scene);
  const ascent = createAscent({ ctx, scene, avatar: xingda.group });

  // 星达初始位置 = 出生点落点；随后由第三人称控制器接管
  xingda.group.position.set(spawn.x, 0, spawn.z);
  ctx.player.setThirdPerson?.({ target: xingda.group });

  // ---- 小满：城市陪伴 AI（线性对话）----
  const xiaomanDialogue = createDialogue({
    ctx,
    speaker: '小满 · 城市陪伴 AI',
    lines: XIAOMAN_LINES,
  });
  ctx.interaction.add(robot.group, {
    text: '和陪伴机器人小满聊聊',
    distance: 22,
    onInteract() {
      ctx.state.set('talkedEarthAI', true);
      xiaomanDialogue.open();
    },
  });

  // ---- 深空规划馆解说 AI（分支对话，绑定展厅控制台）----
  const hallDialogue = createBranchDialogue({
    ctx,
    speaker: NPC_DIALOGUES.hallGuide.speaker,
    greeting: NPC_DIALOGUES.hallGuide.greeting,
    branches: NPC_DIALOGUES.hallGuide.branches,
  });
  ctx.interaction.add(hall.consoleObject, {
    text: '查看太阳系全息模型',
    distance: 52,
    onInteract() {
      ctx.state.set('visitedSolarSystem', true);
      hallDialogue.open();
    },
  });

  // ---- NPC：M-07 气象运维 / A-12 垂直农场 / 登舱引导员 ----
  const m07Dialogue = createBranchDialogue({
    ctx,
    speaker: NPC_DIALOGUES.m07.speaker,
    greeting: NPC_DIALOGUES.m07.greeting,
    branches: NPC_DIALOGUES.m07.branches,
  });
  ctx.interaction.add(npcs.m07, {
    text: '询问气象运维机器人 M-07',
    distance: 28,
    onInteract() { m07Dialogue.open(); },
  });

  const a12Dialogue = createBranchDialogue({
    ctx,
    speaker: NPC_DIALOGUES.a12.speaker,
    greeting: NPC_DIALOGUES.a12.greeting,
    branches: NPC_DIALOGUES.a12.branches,
  });
  ctx.interaction.add(npcs.a12, {
    text: '询问垂直农场机器人 A-12',
    distance: 24,
    onInteract() { a12Dialogue.open(); },
  });

  const guideDialogue = createBranchDialogue({
    ctx,
    speaker: NPC_DIALOGUES.elevatorGuide.speaker,
    greeting: NPC_DIALOGUES.elevatorGuide.greeting,
    branches: NPC_DIALOGUES.elevatorGuide.branches,
    onAction(action) {
      if (action === 'startAscent') ascent.start();
    },
  });
  ctx.interaction.add(npcs.guide, {
    text: '咨询太空电梯登舱引导员',
    distance: 52,
    onInteract() { guideDialogue.open(); },
  });

  // ---- 太空电梯（直接登舱捷径：完整上升演出）----
  ctx.interaction.add(elevator.portal, {
    text: '进入太空电梯',
    distance: 65,
    onInteract() { ascent.start(); },
  });

  return {
    scene,
    spawn,

    enter() {
      ctx.ui.setScene('EARTH 2126 · 中央广场');
      ctx.ui.flash('WASD 移动 · 鼠标环视 · E 交互——跟着发光道路走，小满在广场等你');
    },

    update(dt) {
      city.update(dt);
      // 演出期间星达的位置由上升序列接管，停止待机动画避免冲突
      if (!ascent.isActive()) {
        const moving = Boolean(ctx.player.keys?.size);
        xingda.update(dt, moving);
      }
      robot.update(dt);
      hall.update(dt);
      elevator.update(dt);
      npcs.update(dt);
      ascent.update(dt);
    },

    exit() {
      // 强制关闭对话/演出监听并恢复输入，避免把暂停状态带进下一个场景
      xiaomanDialogue.destroy();
      hallDialogue.destroy();
      m07Dialogue.destroy();
      a12Dialogue.destroy();
      guideDialogue.destroy();
      ascent.dispose();
    },

    dispose() {
      xiaomanDialogue.destroy();
      hallDialogue.destroy();
      m07Dialogue.destroy();
      a12Dialogue.destroy();
      guideDialogue.destroy();
      ascent.dispose();
      // 恢复第一人称，避免把 Earth 的第三人称状态泄漏到 Moon/Mars
      ctx.player.setFirstPerson?.();
      disposeScene(scene);
    },
  };
}
