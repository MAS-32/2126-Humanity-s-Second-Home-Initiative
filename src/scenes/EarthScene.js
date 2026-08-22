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
import { createGuide } from './earth/guide.js';
import { makeNameTag } from './earth/nametag.js';
import { loadFutureCity } from './earth/futureCity.js';

// 2126：人类第二家园计划 · 第一关「地球」。
// 体验链：中央广场出生（第三人称操控星达）→ 小满/NPC 对话 → 深空规划馆 → 太空电梯
// → 地月上升演出 → sceneManager.go('moon')。本场景只消费 Shared Core 注入的 ctx。

const XIAOMAN_LINES = [
  '你好呀，我是小满，这座城市的陪伴型 AI。哇，星达今天也很有精神呢！',
  '2126 年的城市不只是建筑集合，而是一套由 AI 协调的大型生命维持系统。',
  '能源与电网：我实时协调聚变电站、太阳能阵列和戴森群送下来的电力，“停电”已经是历史名词。',
  '交通调度：头顶两条空中环线上的飞行器都由我统一指挥，拥堵这个词早就进博物馆了。',
  '水资源循环：每一滴水都被回收、净化、再利用，闭环利用率 99.7%。',
  '常有朋友问我：地球都这么好了，为什么还要去月球和火星？因为我们不是在离开地球，而是在给文明多建几个家呀。',
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

  // GLB 未来城市（真实建模资产）：异步加载，成功后接管城市视觉并切换碰撞/相机避障；
  // 失败时保留程序化城市，游戏照常进行。
  const futureCity = loadFutureCity({
    ctx,
    scene,
    onLoaded({ colliders, cameraBlockers }) {
      city.setDecoVisible(false);
      ctx.player.setObstacles?.(
        [...city.keepColliders, hall.collider, elevator.collider, ...colliders].filter(Boolean),
      );
      ctx.player.setCameraObstacles?.(
        [...cameraBlockers, hall.blocker, elevator.blocker].filter(Boolean),
      );
      ctx.ui.flash('2126 城市模型加载完成');
    },
  });

  // 地标名牌（展厅与电梯入口上方）
  const hallTag = makeNameTag('深空规划馆');
  hallTag.position.set(0, 6.4, 0);
  hall.consoleObject.parent.add(hallTag);
  const elevatorTag = makeNameTag('太空电梯 · 赤道一号', { color: '#ffd9a0' });
  elevatorTag.position.set(-5.8, 4.6, 5.8);
  elevator.portal.add(elevatorTag);
  const xiaomanTag = makeNameTag('小满 · 城市陪伴 AI', { color: '#b8f7e8' });
  xiaomanTag.position.y = 1.35;
  robot.group.add(xiaomanTag);

  // 星达初始位置 = 出生点落点；随后由第三人称控制器接管
  xingda.group.position.set(spawn.x, 0, spawn.z);
  ctx.player.setThirdPerson?.({
    target: xingda.group,
    cameraObstacles: [...(city.cameraBlockers ?? []), hall.blocker, elevator.blocker].filter(Boolean),
  });
  ctx.player.setObstacles?.([...(city.colliders ?? []), hall.collider, elevator.collider].filter(Boolean));
  // 第三人称交互：以星达为候选源（距离 + 朝向打分），不再依赖准星
  ctx.interaction.setProximitySource?.(xingda.group);

  const guide = createGuide({
    ctx,
    scene,
    targets: {
      companion: robot.group.position,
      hall: new THREE.Vector3(-35, 0, -30),
      elevator: new THREE.Vector3(35, 0, -35),
    },
  });

  // ---- 小满：城市陪伴 AI（线性对话）----
  const xiaomanDialogue = createDialogue({
    ctx,
    speaker: '小满 · 城市陪伴 AI',
    lines: XIAOMAN_LINES,
    onClose() { xingda.faceToward(null); },
  });
  ctx.interaction.add(robot.group, {
    text: '与小满交谈',
    distance: 6,
    onInteract() {
      ctx.state.set('talkedEarthAI', true);
      xingda.faceToward(robot.group.position);
      xiaomanDialogue.open();
    },
  });

  // ---- 深空规划馆解说 AI（分支对话，绑定展厅控制台）----
  const hallDialogue = createBranchDialogue({
    ctx,
    speaker: NPC_DIALOGUES.hallGuide.speaker,
    greeting: NPC_DIALOGUES.hallGuide.greeting,
    branches: NPC_DIALOGUES.hallGuide.branches,
    onClose() { xingda.faceToward(null); },
  });
  ctx.interaction.add(hall.consoleObject, {
    text: '查看太阳系全息模型',
    distance: 9,
    onInteract() {
      ctx.state.set('visitedSolarSystem', true);
      xingda.faceToward(hall.consoleObject.getWorldPosition(new THREE.Vector3()));
      hallDialogue.open();
    },
  });

  // ---- NPC：M-07 气象运维 / A-12 垂直农场 / 登舱引导员 ----
  const m07Dialogue = createBranchDialogue({
    ctx,
    speaker: NPC_DIALOGUES.m07.speaker,
    greeting: NPC_DIALOGUES.m07.greeting,
    branches: NPC_DIALOGUES.m07.branches,
    onClose() { xingda.faceToward(null); },
  });
  ctx.interaction.add(npcs.m07, {
    text: '与 M-07 交谈',
    distance: 6.5,
    onInteract() {
      xingda.faceToward(npcs.m07.position);
      m07Dialogue.open();
    },
  });

  const a12Dialogue = createBranchDialogue({
    ctx,
    speaker: NPC_DIALOGUES.a12.speaker,
    greeting: NPC_DIALOGUES.a12.greeting,
    branches: NPC_DIALOGUES.a12.branches,
    onClose() { xingda.faceToward(null); },
  });
  ctx.interaction.add(npcs.a12, {
    text: '与 A-12 交谈',
    distance: 6.5,
    onInteract() {
      xingda.faceToward(npcs.a12.position);
      a12Dialogue.open();
    },
  });

  const guideDialogue = createBranchDialogue({
    ctx,
    speaker: NPC_DIALOGUES.elevatorGuide.speaker,
    greeting: NPC_DIALOGUES.elevatorGuide.greeting,
    branches: NPC_DIALOGUES.elevatorGuide.branches,
    onAction(action) {
      if (action === 'startAscent') ascent.start();
    },
    onClose() { xingda.faceToward(null); },
  });
  ctx.interaction.add(npcs.guide, {
    text: '与登舱引导员交谈',
    distance: 7,
    onInteract() {
      xingda.faceToward(npcs.guide.position);
      guideDialogue.open();
    },
  });

  // ---- 太空电梯（直接登舱捷径：完整上升演出）----
  ctx.interaction.add(elevator.portal, {
    text: '进入太空电梯',
    distance: 12.5,
    onInteract() { ascent.start(); },
  });

  return {
    scene,
    spawn,

    enter() {
      ctx.ui.setScene('2126 · 地球');
      ctx.ui.flash('WASD 移动 · 鼠标环视 · E 交互——跟着发光道路与信标光柱走');
      // 第三人称下隐藏第一人称准星
      document.body.classList.add('earth-tp');
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
      guide.update(dt);
      futureCity.update(dt);
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
      futureCity.dispose();
    },

    dispose() {
      xiaomanDialogue.destroy();
      hallDialogue.destroy();
      m07Dialogue.destroy();
      a12Dialogue.destroy();
      guideDialogue.destroy();
      ascent.dispose();
      futureCity.dispose();
      guide.dispose();
      // 星达：标记销毁，迟到完成的 GLB 加载会被直接销毁而不再挂载
      xingda.dispose?.();
      document.body.classList.remove('earth-tp');
      // 归还 Core：清掉 Earth 注入的第三人称状态，避免泄漏到 Moon/Mars
      ctx.interaction.setProximitySource?.(null);
      ctx.player.setObstacles?.([]);
      ctx.player.setFirstPerson?.();
      disposeScene(scene);
    },
  };
}
