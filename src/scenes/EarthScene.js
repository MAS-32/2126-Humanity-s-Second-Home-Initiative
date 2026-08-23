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
import { createEarthAudio } from './earth/audio.js';
import { createCityStatus } from './earth/cityStatus.js';

// 2126：人类第二家园计划 · 第一关「地球」。
// 体验链：中央广场出生（第三人称操控星达）→ 小满/NPC 对话 → 深空规划馆 → 太空电梯
// → 地月上升演出 → 跨页交接至独立月球前哨站（public/outpost/）。本场景只消费 Shared Core 注入的 ctx。

const XIAOMAN_LINES = [
  '早上好呀星达！我是小满，这座城市的陪伴型 AI。今天天气是我排的，还不错吧？',
  '你问这座城市为什么这么顺？因为能源、交通、水、空气，都有像我们这样的 AI 在一起协调。',
  '电是从太阳身边送下来的——戴森群听过吗？所以“停电”这个词，我只在老故事里见过。',
  '头顶那些飞行器都归交通网统一调度。在 2126 年，“堵车”是博物馆里的词。',
  '常有人问我：地球都这么好了，为什么还要去月球？因为不是离开呀，是给文明多安几个家。',
  '想听专业的？气象站找 M-07，农场塔找 A-12，他们都比我懂行。',
  '想知道人类下一步去哪？去西北边的深空规划馆，看一眼太阳系蓝图就明白了——然后到东北边的太空电梯出发，月球见！',
];

const HALL_POS = new THREE.Vector3(-35, 0, -30);
const ELEVATOR_POS = new THREE.Vector3(35, 0, -35);
const CITY_CENTER = new THREE.Vector3(0, 0, 0);

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

  const audio = createEarthAudio();
  const city = buildCity(scene);
  const xingda = buildXingda(scene);
  const robot = buildCompanionRobot(scene);
  const hall = buildCivilizationHall(scene);
  const elevator = buildSpaceElevator(scene);
  const npcs = buildNpcs(scene);
  const ascent = createAscent({ ctx, scene, avatar: xingda.group, elevator, audio });

  // GLB 未来城市（真实建模资产）：异步加载，成功后接管城市视觉并切换碰撞/相机避障；
  // 失败时保留程序化城市，游戏照常进行。
  const futureCity = loadFutureCity({
    ctx,
    scene,
    audio,
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
  hallTag.position.set(0, 8.3, 0);
  hall.consoleObject.parent.add(hallTag);
  const elevatorTag = makeNameTag('太空电梯 · 赤道一号', { color: '#ffd9a0' });
  elevatorTag.position.set(-5.8, 4.9, 5.8);
  elevator.portal.add(elevatorTag);
  const xiaomanTag = makeNameTag('小满 · 城市陪伴 AI', { color: '#b8f7e8' });
  xiaomanTag.position.y = 1.35;
  robot.group.add(xiaomanTag);

  // 星达初始位置 = 出生点落点；随后由第三人称控制器接管
  xingda.group.position.set(spawn.x, 0, spawn.z);
  ctx.player.setThirdPerson?.({
    target: xingda.group,
    distance: 5.6,
    height: 2.5,
    lookHeight: 1.5, // 注视点略高于星达头顶：角色稳定位于画面下方偏中央
    cameraDamping: 8,
    rotateSensitivity: 0.0016, // 降低鼠标过敏，环视更稳
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
      hall: HALL_POS.clone(),
      elevator: ELEVATOR_POS.clone(),
    },
  });

  // 2126 城市生命维持网络：常驻极简环境 UI（世界观可视化）
  const cityStatus = createCityStatus();

  // ---- 对话打开状态：对话/演出期间暂停星达的“好奇心观察” ----
  let dialogueOpen = false;
  const closeDialogue = () => {
    dialogueOpen = false;
    xingda.faceToward(null);
  };

  // ---- 文明尺度主文案（展厅首次激活时的中央 cinematic 字幕）----
  let captionEl = null;
  let captionTimer = null;
  const clearCaption = () => {
    clearTimeout(captionTimer);
    captionTimer = null;
    captionEl?.remove();
    captionEl = null;
  };
  const showCinematicCaption = (text) => {
    clearCaption();
    captionEl = document.createElement('div');
    captionEl.className = 'earth-cinematic';
    captionEl.textContent = text;
    document.body.append(captionEl);
    requestAnimationFrame(() => captionEl?.classList.add('is-visible'));
    captionTimer = setTimeout(() => {
      captionEl?.classList.remove('is-visible');
      captionTimer = setTimeout(clearCaption, 900);
    }, 3800);
  };

  // ---- 小满：城市陪伴 AI（线性对话）----
  const xiaomanDialogue = createDialogue({
    ctx,
    speaker: '小满 · 城市陪伴 AI',
    lines: XIAOMAN_LINES,
    onClose: closeDialogue,
  });
  ctx.interaction.add(robot.group, {
    text: '与小满交谈',
    distance: 6,
    onInteract() {
      dialogueOpen = true;
      ctx.state.set('talkedEarthAI', true);
      xingda.faceToward(robot.group.position);
      audio.play('dialog');
      xiaomanDialogue.open();
    },
  });

  // ---- 深空规划馆解说 AI（分支对话，绑定展厅控制台）----
  const hallDialogue = createBranchDialogue({
    ctx,
    speaker: NPC_DIALOGUES.hallGuide.speaker,
    greeting: NPC_DIALOGUES.hallGuide.greeting,
    branches: NPC_DIALOGUES.hallGuide.branches,
    onClose: closeDialogue,
  });
  ctx.interaction.add(hall.consoleObject, {
    text: '查看太阳系全息模型',
    distance: 9,
    onInteract() {
      dialogueOpen = true;
      ctx.state.set('visitedSolarSystem', true);
      xingda.faceToward(hall.consoleObject.getWorldPosition(new THREE.Vector3()));
      audio.play('hall-on');
      audio.play('holo');
      // 首次激活：全息太阳系从休眠展开（数秒演出）+ 文明尺度主文案
      if (hall.activate()) {
        showCinematicCaption('2126 年，人类的文明边界已不再止于地球。');
      }
      hallDialogue.open();
    },
  });

  // ---- NPC：M-07 气象运维 / A-12 垂直农场 / 登舱引导员 ----
  const m07Dialogue = createBranchDialogue({
    ctx,
    speaker: NPC_DIALOGUES.m07.speaker,
    greeting: NPC_DIALOGUES.m07.greeting,
    branches: NPC_DIALOGUES.m07.branches,
    onClose: closeDialogue,
  });
  ctx.interaction.add(npcs.m07, {
    text: '与 M-07 交谈',
    distance: 6.5,
    onInteract() {
      dialogueOpen = true;
      xingda.faceToward(npcs.m07.position);
      audio.play('dialog');
      m07Dialogue.open();
    },
  });

  const a12Dialogue = createBranchDialogue({
    ctx,
    speaker: NPC_DIALOGUES.a12.speaker,
    greeting: NPC_DIALOGUES.a12.greeting,
    branches: NPC_DIALOGUES.a12.branches,
    onClose: closeDialogue,
  });
  ctx.interaction.add(npcs.a12, {
    text: '与 A-12 交谈',
    distance: 6.5,
    onInteract() {
      dialogueOpen = true;
      xingda.faceToward(npcs.a12.position);
      audio.play('dialog');
      a12Dialogue.open();
    },
  });

  const guideDialogue = createBranchDialogue({
    ctx,
    speaker: NPC_DIALOGUES.elevatorGuide.speaker,
    greeting: NPC_DIALOGUES.elevatorGuide.greeting,
    branches: NPC_DIALOGUES.elevatorGuide.branches,
    onAction(action) {
      if (action === 'startAscent') {
        xingda.faceToward(CITY_CENTER); // 登舱后回望城市与地球
        ascent.start();
      }
    },
    onClose: closeDialogue,
  });
  ctx.interaction.add(npcs.guide, {
    text: '与登舱引导员交谈',
    distance: 7,
    onInteract() {
      dialogueOpen = true;
      xingda.faceToward(npcs.guide.position);
      audio.play('dialog');
      guideDialogue.open();
    },
  });

  // ---- 太空电梯（直接登舱捷径：完整上升演出）----
  ctx.interaction.add(elevator.portal, {
    text: '进入太空电梯',
    distance: 12.5,
    onInteract() {
      xingda.faceToward(CITY_CENTER); // 上升时自然回望地球
      ascent.start();
    },
  });

  // ---- 展厅氛围压暗：玩家靠近规划馆时，环境光收敛、全息凸显 ----
  const ambience = {
    hemiBase: hemisphere.intensity,
    sunBase: sunlight.intensity,
    bgBase: scene.background.clone(),
    fogBase: scene.fog.color.clone(),
    bgDim: new THREE.Color(0x5e8698),
    fogDim: new THREE.Color(0x6f96a8),
    current: '', // 当前环境音床
  };
  const playerPos = new THREE.Vector3();
  let curiosityKey = '';

  function updateAtmosphere() {
    if (ctx.player.getPosition) playerPos.copy(ctx.player.getPosition());
    if (ascent.isActive()) return; // 演出接管天空与音效，氛围系统让位
    const hallDistance = Math.hypot(playerPos.x - HALL_POS.x, playerPos.z - HALL_POS.z);
    const factor = THREE.MathUtils.smoothstep(19 - hallDistance, 0, 8); // 19m 外为 0，11m 内为 1
    hemisphere.intensity = THREE.MathUtils.lerp(ambience.hemiBase, 0.32, factor);
    sunlight.intensity = THREE.MathUtils.lerp(ambience.sunBase, 0.5, factor);
    scene.background.lerpColors(ambience.bgBase, ambience.bgDim, factor);
    if (scene.fog) scene.fog.color.lerpColors(ambience.fogBase, ambience.fogDim, factor);
    const next = factor > 0.5 ? 'hall' : 'city';
    if (next !== ambience.current) {
      ambience.current = next;
      audio.setAmbience(next);
    }
  }

  // ---- 星达的好奇心：空闲靠近重要地标时，自然地转身观察 ----
  function updateCuriosity() {
    if (dialogueOpen || ascent.isActive()) return;
    const hallDistance = Math.hypot(playerPos.x - HALL_POS.x, playerPos.z - HALL_POS.z);
    const elevatorDistance = Math.hypot(playerPos.x - ELEVATOR_POS.x, playerPos.z - ELEVATOR_POS.z);
    let nextKey = '';
    let nextPos = null;
    if (hallDistance < 16) {
      nextKey = 'hall';
      nextPos = HALL_POS;
    } else if (elevatorDistance < 16) {
      nextKey = 'elevator';
      nextPos = ELEVATOR_POS;
    }
    if (nextKey !== curiosityKey) {
      curiosityKey = nextKey;
      xingda.faceToward(nextPos);
    }
  }

  return {
    scene,
    spawn,

    enter() {
      ctx.ui.setScene('2126 · 地球');
      ctx.ui.flash('WASD 移动 · 鼠标环视 · E 交互——跟随琥珀色光轨与 ◇ 标记前进');
      audio.setAmbience('city');
      // 第三人称下隐藏第一人称准星
      document.body.classList.add('earth-tp');
    },

    update(dt) {
      city.update(dt);
      // 星达动画只作用于 visualRoot，与演出的 group 位置控制不冲突，全程保持生命感
      const moving = !ascent.isActive() && Boolean(ctx.player.keys?.size);
      xingda.update(dt, moving);
      robot.update(dt, playerPos);
      hall.update(dt, playerPos);
      elevator.update(dt);
      npcs.update(dt, playerPos);
      guide.update(dt);
      cityStatus.update(dt);
      futureCity.update(dt);
      ascent.update(dt);
      updateAtmosphere();
      updateCuriosity();
    },

    exit() {
      // 强制关闭对话/演出监听并恢复输入，避免把暂停状态带进下一个场景
      clearCaption();
      cityStatus.dispose();
      xiaomanDialogue.destroy();
      hallDialogue.destroy();
      m07Dialogue.destroy();
      a12Dialogue.destroy();
      guideDialogue.destroy();
      ascent.dispose();
      futureCity.dispose();
      hall.dispose();
      audio.dispose();
    },

    dispose() {
      clearCaption();
      cityStatus.dispose();
      xiaomanDialogue.destroy();
      hallDialogue.destroy();
      m07Dialogue.destroy();
      a12Dialogue.destroy();
      guideDialogue.destroy();
      ascent.dispose();
      futureCity.dispose();
      hall.dispose();
      guide.dispose();
      audio.dispose();
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
