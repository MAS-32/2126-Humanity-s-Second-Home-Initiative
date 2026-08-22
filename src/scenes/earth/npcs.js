import * as THREE from 'three';
import { WEATHER_STATION_POS, FARM_TOWER_POS } from './city.js';
import { makeNameTag } from './nametag.js';

// EarthScene 的 NPC 机器人与对话数据。
// 三个实体 NPC（M-07 / A-12 / 登舱引导员）+ 展厅解说 AI（绑定展厅控制台）。
// 造型按参考图差异化：M-07 头顶气象桅杆（旋转风速杯+风向标），A-12 履带底座+绿色护目镜。
// 对话数据直接以代码可用结构导出，配合 createBranchDialogue 使用。

function makeRobotBody({ bodyColor, accentColor, style }) {
  const group = new THREE.Group();
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.4, metalness: 0.2 });
  const accent = new THREE.MeshBasicMaterial({ color: accentColor });
  const extras = {}; // 需要在 update 中动画的部件

  if (style === 'weather') {
    // M-07（参考图 4）：白色运维机体 + 胸前青色面板 + 头顶气象桅杆
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 0.45, 6, 14), bodyMaterial);
    torso.position.y = 0.85;
    group.add(torso);
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.06), accent);
    panel.position.set(0, 0.92, 0.31);
    group.add(panel);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.3, 0.34), bodyMaterial);
    head.position.y = 1.42;
    group.add(head);
    // 双目青色镜头
    [-1, 1].forEach((side) => {
      const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.05, 12), accent);
      lens.rotation.x = Math.PI / 2;
      lens.position.set(side * 0.1, 1.43, 0.19);
      group.add(lens);
    });
    // 气象桅杆：立杆 + 风速杯（旋转）+ 风向标
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.5, 6), bodyMaterial);
    mast.position.y = 1.82;
    group.add(mast);
    const cups = new THREE.Group();
    cups.position.y = 2.06;
    for (let i = 0; i < 3; i += 1) {
      const angle = (i / 3) * Math.PI * 2;
      const armLen = 0.14;
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, armLen, 6), bodyMaterial);
      arm.rotation.z = Math.PI / 2;
      arm.rotation.y = angle;
      arm.position.set(Math.cos(angle) * armLen / 2, 0, -Math.sin(angle) * armLen / 2);
      cups.add(arm);
      const cup = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2), accent);
      cup.position.set(Math.cos(angle) * armLen, 0, -Math.sin(angle) * armLen);
      cup.rotation.z = Math.PI / 2;
      cup.rotation.y = angle;
      cups.add(cup);
    }
    group.add(cups);
    extras.cups = cups;
    const vane = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.2, 4), bodyMaterial);
    vane.rotation.z = -Math.PI / 2;
    vane.position.set(0.16, 1.94, 0);
    group.add(vane);
    // 肩部小型传感翼
    [-1, 1].forEach((side) => {
      const wing = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.3), bodyMaterial);
      wing.position.set(side * 0.42, 1.05, 0);
      group.add(wing);
    });
  } else if (style === 'treads') {
    // A-12（参考图 3）：履带底座 + 圆润白机身 + 绿色护目镜 + 机械臂
    [-1, 1].forEach((side) => {
      const tread = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.2, 0.52),
        new THREE.MeshStandardMaterial({ color: 0x3a4a52, roughness: 0.8 }),
      );
      tread.position.set(side * 0.2, 0.12, 0);
      group.add(tread);
      for (let i = -1; i <= 1; i += 1) {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.2, 10), bodyMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(side * 0.2, 0.12, i * 0.17);
        group.add(wheel);
      }
    });
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.16, 0.44), bodyMaterial);
    chassis.position.y = 0.3;
    group.add(chassis);
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 0.4, 6, 14), bodyMaterial);
    torso.position.y = 0.78;
    group.add(torso);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 12), bodyMaterial);
    head.position.y = 1.28;
    group.add(head);
    // 绿色护目镜带（横过脸部）
    const visor = new THREE.Mesh(new THREE.CylinderGeometry(0.245, 0.245, 0.09, 18, 1, true, -Math.PI / 2.6, Math.PI / 1.3), accent);
    visor.position.y = 1.29;
    group.add(visor);
    // 右侧机械臂（两节 + 软管头）
    const armBase = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.3, 8), bodyMaterial);
    armBase.position.set(0.36, 0.86, 0.1);
    armBase.rotation.z = -0.7;
    group.add(armBase);
    const armTip = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.26, 8), bodyMaterial);
    armTip.position.set(0.5, 0.66, 0.22);
    armTip.rotation.z = -0.3;
    armTip.rotation.x = 0.5;
    group.add(armTip);
    const nozzle = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), accent);
    nozzle.position.set(0.54, 0.55, 0.33);
    group.add(nozzle);
    // 背部小型营养液罐
    const tank = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.16, 4, 10), new THREE.MeshStandardMaterial({ color: 0x9fe0c0, roughness: 0.4 }));
    tank.position.set(0, 0.85, -0.3);
    group.add(tank);
  } else {
    // 引导员：悬浮服务机体 + 双肩信号灯（默认通用剪影）
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.4, 6, 14), bodyMaterial);
    torso.position.y = 0.85;
    group.add(torso);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), bodyMaterial);
    head.position.y = 1.42;
    group.add(head);
    const visor = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 10, -Math.PI / 3, (Math.PI * 2) / 3, Math.PI / 3, Math.PI / 3), accent);
    visor.position.set(0, 1.42, 0.08);
    group.add(visor);
    [-1, 1].forEach((side) => {
      const light = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), accent);
      light.position.set(side * 0.36, 1.18, 0);
      group.add(light);
    });
  }

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(0.42, 0.04, 8, 28),
    new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 0.06;
  group.add(halo);
  return { group, extras };
}

export function buildNpcs(scene) {
  const npcs = [];
  const place = (name, label, x, z, options) => {
    const { group, extras } = makeRobotBody(options);
    group.name = name;
    group.position.set(x, 0, z);
    // 悬浮名牌
    const tag = makeNameTag(label);
    tag.position.y = 2.45;
    group.add(tag);
    scene.add(group);
    npcs.push({ group, extras });
    return group;
  };

  // M-07：气象站旁；A-12：农场塔旁；引导员：太空电梯登舱门旁
  const m07 = place('npc-m07', 'M-07 · 气象运维', WEATHER_STATION_POS.x - 2.5, WEATHER_STATION_POS.z + 3.5, { bodyColor: 0xf0f4f6, accentColor: 0x4fa8e0, style: 'weather' });
  const a12 = place('npc-a12', 'A-12 · 垂直农场', FARM_TOWER_POS.x + 3.5, FARM_TOWER_POS.z - 3, { bodyColor: 0xf5f7f2, accentColor: 0x58c98c, style: 'treads' });
  const guide = place('npc-guide', '登舱引导 · 赤道一号', 27.5, -27, { bodyColor: 0xf7f2ea, accentColor: 0xffa54d, style: 'signal' });

  let elapsed = 0;
  return {
    m07,
    a12,
    guide,
    /** playerPos 可选：传入后 NPC 在玩家靠近时平滑转身面向玩家（对话感），远离后恢复待机摇摆 */
    update(dt, playerPos = null) {
      elapsed += dt;
      npcs.forEach(({ group, extras }, i) => {
        group.position.y = Math.sin(elapsed * 1.5 + i * 2.1) * 0.05;
        let desiredYaw = Math.sin(elapsed * 0.5 + i) * 0.22; // 待机：缓慢环顾
        if (playerPos) {
          const dx = playerPos.x - group.position.x;
          const dz = playerPos.z - group.position.z;
          if (Math.hypot(dx, dz) < 7.5) desiredYaw = Math.atan2(dx, dz); // 玩家靠近：面向玩家
        }
        let diff = desiredYaw - group.rotation.y;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        group.rotation.y += diff * (1 - Math.exp(-6 * dt));
        if (extras.cups) extras.cups.rotation.y += dt * 3.2; // 风速杯持续旋转
      });
    },
  };
}

// ---- 对话内容（每组 3 个主题分支，每支 2-4 轮）----
// 写作原则：像真正生活在 2126 年的居民在聊天——每轮只说一件事，
// 短、口语、有性格，不背说明书。玩家的话用「你」的视角接得住。

export const NPC_DIALOGUES = {
  m07: {
    speaker: '气象运维机器人 M-07 · 城市气象调控站',
    greeting: '哟，星达。抬头看那片云——五分钟后它会绕过中央塔再下雨，我排的班。想聊点什么？',
    branches: [
      {
        id: 'dispatch',
        title: '你们真的在“控制天气”？',
        lines: [
          '控制？不敢不敢。我们管这个叫“协同”——提前知道雨要来，再把云轻轻推一把。',
          '卫星群在天上看，我在地上算，哪里要下雨、哪片云该让路，都是提前排好的。',
          '这个词人类花了一百年才学会：不是命令自然，是跟自然商量着来。',
        ],
      },
      {
        id: 'safety',
        title: '万一系统出错怎么办？',
        lines: [
          '我有一条写在最深处的规矩：每次出手，不能超过自然自己波动的 15%。',
          '超了？那就把天空还给它自己。机器可以帮忙，但不能越界。',
          '我值班十一年，全城自检三次，一次都没让人类操过心。',
        ],
      },
      {
        id: 'dyson',
        title: '听说能源是从太空来的？',
        lines: [
          '对，戴森群——太阳身边那一大圈太阳能收集器，电是从那儿送下来的。',
          '城里不烧东西了，废热少了，我的天气预报反而好做了，变量少了一大半。',
          '所以你能看见准点的雨，背后其实是太空工程和我在一块儿排班呢。',
        ],
      },
    ],
  },

  a12: {
    speaker: '垂直农场机器人 A-12 · 室内光合塔',
    greeting: '欢迎来到光合塔。别看我慢悠悠的，这座塔一年能喂饱一万两千人。随便看。',
    branches: [
      {
        id: 'food',
        title: '楼里的菜是怎么种出来的？',
        lines: [
          '四十八层种植架，每层的光、营养液、二氧化碳都是单独调的，像给每层菜配了专属保姆。',
          '生菜十八天一茬，产量是百年前露天农田的一百多倍。',
          '你住的那栋楼里也有小种植仓。在 2126 年，“蔬菜长途运输”是个历史课本里的词。',
        ],
      },
      {
        id: 'carbon',
        title: '城市的碳都去哪儿了？',
        lines: [
          '一部分送到我这儿——植物吃掉二氧化碳，长成菜，再变成你的晚饭。',
          '剩下的被碳捕集塔压成碳材料，拿去打印建筑构件。你脚下的路面里，就有去年的空气。',
          '碳不进大气账本，只在城里转圈。这就是“净零”真正的意思。',
        ],
      },
      {
        id: 'space',
        title: '这技术跟月球有什么关系？',
        lines: [
          '关系大了。我这套系统从第一天就是按“能搬走”设计的：密闭、人造光、水循环。',
          '月球前哨的第一座种植舱，就是我的缩小版。火星那边光弱一些，但补光在这儿早就是日常。',
          '你到了月球吃到的第一口菜，搞不好就是我同行种出来的。',
        ],
      },
    ],
  },

  hallGuide: {
    speaker: '深空规划馆解说 AI',
    greeting: '欢迎来到深空规划馆。你头顶这个模型，是人类给整个太阳系画的“家”。从哪儿看起？',
    branches: [
      {
        id: 'dyson',
        title: '太阳周围那些光点是什么？',
        lines: [
          '那叫戴森群——几万个太阳能收集器，各自绕着太阳飞，不是一个封闭的壳。',
          '它们只截住太阳发光的一小撮，但这一小撮，已经是全人类用电量的几千倍。',
          '能调动整颗恒星能源的文明，叫“二级文明”。人类刚摸到门槛，而你正站在这个时代里。',
        ],
      },
      {
        id: 'oneill',
        title: '那两个转来转去的圆筒呢？',
        lines: [
          '奥尼尔圆柱，太空里的居住舱。两个一组反着转，用离心力在内壁“转”出重力。',
          '里面有城市、农田、湖，甚至有自己的天气，一座能住三万人。',
          '它最大的好处是不挑地方——宜居行星太难找了，圆柱想造几座造几座。',
        ],
      },
      {
        id: 'goal',
        title: '地球这么好，为什么还要出去？',
        lines: [
          '每个第一次来的人都这么问。答案是：人类不是逃离地球，而是地球被建得足够好了，终于有余力向外走。',
          '地球是家，月球是前哨，火星是第二家园——再往后，是戴森群和无数座圆柱。',
          '到那天，人类就不再是“住在一颗行星上的物种”，而是以整个太阳系为家的文明。',
          '你一会儿要坐的那趟电梯，就是这条路线图上最普通的一次通勤。普通，才是它最了不起的地方。',
        ],
      },
    ],
  },

  elevatorGuide: {
    speaker: '赤道一号地勤 AI · 太空电梯登舱引导',
    greeting: '欢迎乘坐赤道一号，本次目的地：月球前哨站。登舱前还有什么想确认的？',
    branches: [
      {
        id: 'route',
        title: '这趟要走多久？',
        lines: [
          '电梯爬到同步轨道站约六小时，换摆渡船到月球，全程二十六个钟头。',
          '别紧张，这是通勤线，不是远行——大多数乘客一周内就返程。地球是家，月球只是家的延伸。',
          '今天舱位很空，靠窗的位置随便挑。',
        ],
      },
      {
        id: 'safety',
        title: '这电梯安全吗？',
        lines: [
          '缆索是碳纳米管束，强度按四倍冗余设计。断一根，剩下的照样把你送回来。',
          '地面、轨道、姿态三段各有一台 AI 交叉盯着，我就是地面段。',
          '连续安全运行十一年。说实话，它比你走路穿过广场还安全。',
        ],
      },
      {
        id: 'depart',
        title: '没问题了，出发吧',
        lines: [
          '身份确认，舱位锁定。星达小朋友的安全带是加小号的，已经备注好了。',
          '上升初段会有一点颠簸，穿过云层之后就只剩安静了。',
          '那么——月球见。',
        ],
        action: 'startAscent',
      },
    ],
  },
};
