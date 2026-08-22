import * as THREE from 'three';
import { WEATHER_STATION_POS, FARM_TOWER_POS } from './city.js';

// EarthScene 的 NPC 机器人与对话数据。
// 三个实体 NPC（M-07 / A-12 / 登舱引导员）+ 展厅解说 AI（绑定展厅控制台）。
// 对话数据直接以代码可用结构导出，配合 createBranchDialogue 使用。

function makeRobotBody({ bodyColor, accentColor, style }) {
  const group = new THREE.Group();
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.4, metalness: 0.2 });
  const accent = new THREE.MeshBasicMaterial({ color: accentColor });

  // 悬浮式机身（统一剪影：躯干 + 头 + 特征件 + 底部光环）
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.4, 6, 14), bodyMaterial);
  torso.position.y = 0.85;
  group.add(torso);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), bodyMaterial);
  head.position.y = 1.42;
  group.add(head);
  const visor = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 10, -Math.PI / 3, (Math.PI * 2) / 3, Math.PI / 3, Math.PI / 3), accent);
  visor.position.set(0, 1.42, 0.08);
  group.add(visor);

  if (style === 'dish') {
    // M-07：头顶小型气象雷达碟
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.3, 6), bodyMaterial);
    mast.position.y = 1.72;
    group.add(mast);
    const dish = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2.5), accent);
    dish.position.y = 1.88;
    dish.rotation.x = Math.PI / 2.6;
    group.add(dish);
  } else if (style === 'leaf') {
    // A-12：肩部光合作用叶板
    [-1, 1].forEach((side) => {
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), new THREE.MeshStandardMaterial({ color: 0x58b08c, roughness: 0.7 }));
      leaf.scale.set(0.25, 1, 0.6);
      leaf.position.set(side * 0.42, 1.1, 0);
      leaf.rotation.z = side * 0.5;
      group.add(leaf);
    });
  } else if (style === 'signal') {
    // 引导员：双肩信号灯
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
  halo.position.y = 0.32;
  group.add(halo);
  return group;
}

export function buildNpcs(scene) {
  const npcs = [];
  const place = (name, x, z, options) => {
    const group = makeRobotBody(options);
    group.name = name;
    group.position.set(x, 0, z);
    scene.add(group);
    npcs.push(group);
    return group;
  };

  // M-07：气象站旁；A-12：农场塔旁；引导员：太空电梯登舱门旁
  const m07 = place('npc-m07', WEATHER_STATION_POS.x - 2.5, WEATHER_STATION_POS.z + 3.5, { bodyColor: 0xe8f1f5, accentColor: 0x4fa8e0, style: 'dish' });
  const a12 = place('npc-a12', FARM_TOWER_POS.x + 3.5, FARM_TOWER_POS.z - 3, { bodyColor: 0xf2f7ee, accentColor: 0x58c98c, style: 'leaf' });
  const guide = place('npc-guide', 27.5, -27, { bodyColor: 0xf7f2ea, accentColor: 0xffa54d, style: 'signal' });

  let elapsed = 0;
  return {
    m07,
    a12,
    guide,
    update(dt) {
      elapsed += dt;
      npcs.forEach((npc, i) => {
        npc.position.y = Math.sin(elapsed * 1.5 + i * 2.1) * 0.06;
        npc.rotation.y = Math.sin(elapsed * 0.5 + i) * 0.25;
      });
    },
  };
}

// ---- 对话内容（每组 3 个主题分支，每支 2-4 轮）----

export const NPC_DIALOGUES = {
  m07: {
    speaker: '气象运维机器人 M-07 · 城市气象调控站',
    greeting: '这里是城市气象调控站。大气不再只是“天气”，而是可监测、可预测、可部分调度的工程参数。你想了解哪一部分？',
    branches: [
      {
        id: 'dispatch',
        title: '气象工程化调度的原理',
        lines: [
          '2126 年的气象系统分三层：近地轨道的气象卫星群负责观测，城市上空的微气候传感网负责采样，我这样的运维单元负责执行。',
          '调度手段包括：引导云系路径、调节城市热岛输出、在降雨前预排蓄水容量。目标不是“消灭坏天气”，而是让极端天气不再打断城市运转。',
          '你可以把整座城市理解成一台巨大的空调——只不过它调节的是整个局部大气。',
        ],
      },
      {
        id: 'safety',
        title: '系统容错与安全机制',
        lines: [
          '所有气象调度都有硬性边界：单次干预强度不得超过自然波动的 15%，超出就必须交还大气自己决定。',
          '如果某个传感节点失效，相邻节点会在 0.4 秒内接管它的观测区。我经历过三次全城级别的系统自检，没有一次需要人类手动介入。',
          '最重要的一条原则写在我的底层协议里：气象工程是“协助自然”，不是“命令自然”。越界的调度请求会被直接拒绝。',
        ],
      },
      {
        id: 'dyson',
        title: '戴森群并网对气象调控的影响',
        lines: [
          '自从戴森群的能源开始并网，地表能源结构变了：化石燃料彻底退出，城市废热大幅下降。',
          '废热减少意味着热岛效应减弱，我的调度模型比一百年前干净了 40%——变量越少，预测越准。',
          '不过戴森群偶尔也会“挡光”：收集器群经过日地之间时会带来几分钟的微弱日照波动，我们会提前把它写进光照预报。',
          '所以你现在看到的每一场准时的雨，背后都有太空工程和城市系统的联合排程。',
        ],
      },
    ],
  },

  a12: {
    speaker: '垂直农场机器人 A-12 · 室内光合塔',
    greeting: '欢迎来到光合塔。这座塔每年能为一万两千人提供新鲜蔬菜。想看看它是怎么工作的吗？',
    branches: [
      {
        id: 'food',
        title: '城市食物供给体系',
        lines: [
          '我身后的塔里有 48 层种植架，每一层的光照、营养液和二氧化碳浓度都是独立调节的。',
          '叶菜从播种到收获只要 18 天，单位面积的产量是二十世纪初露天农田的 120 倍。',
          '城市里的每一栋住宅楼都有小型种植仓，我这样的光合塔负责大宗供给，社区种植仓负责新鲜即摘——食物不再需要长途运输。',
        ],
      },
      {
        id: 'carbon',
        title: '城市碳循环闭环逻辑',
        lines: [
          '这座城市呼出的二氧化碳，有相当一部分就送到了我这里——植物吃掉它，长成蔬菜，再变成你们的晚餐。',
          '剩下的部分会被碳捕集塔固定成碳材料，用来打印建筑构件。你脚下的路面里就有去年的空气。',
          '闭环的意思是：碳不进大气账本，只在系统内循环。这就是 2126 年城市“净零”的真正含义。',
        ],
      },
      {
        id: 'space',
        title: '农业技术的深空复用',
        lines: [
          '这套系统从设计第一天就是“可搬走的”：密闭环境、人工光照、水循环——地球上验证的一切，月球基地直接复用。',
          '月球前哨的第一座种植舱就是我同款的缩小版。火星更麻烦一些，光照只有地球的 43%，但补光技术在这里早就是日常了。',
          '你接下来要去的地方，吃的第一口蔬菜，很可能就是这套系统的“月球分支”种出来的。',
        ],
      },
    ],
  },

  hallGuide: {
    speaker: '深空规划馆解说 AI',
    greeting: '欢迎来到深空规划馆。你眼前的全息模型，是人类从行星文明走向恒星文明的总蓝图。想从哪里开始？',
    branches: [
      {
        id: 'dyson',
        title: '戴森群工程与二级文明',
        lines: [
          '注意看太阳周围那些光点——那不是封闭的壳，而是数万个独立运行的太阳能收集器，我们叫它“戴森群”。',
          '每个收集器只有几公里宽，但加在一起，能截获太阳输出的一小部分——而这一小部分，已经是人类当前能耗的数千倍。',
          '能利用整颗恒星能源的文明，被称为卡尔达肖夫二级文明。人类用了一百年，才刚刚摸到它的门槛。',
          '戴森群的能源通过微波束送回地球、月球和火星——你城市里用的每一度电，可能都来自太阳身边。',
        ],
      },
      {
        id: 'oneill',
        title: '奥尼尔圆柱居住方案',
        lines: [
          '模型外侧那一对缓缓旋转的圆筒，是奥尼尔圆柱——人类设计的太空栖息地。',
          '它们成对反向旋转，用离心力在内壁模拟出接近地球的重力。内部有完整的城市、农田、湖泊，甚至天气。',
          '一座标准圆柱可以容纳三万人长期生活。它不依赖任何行星表面——这很重要，因为宜居行星太少了，而圆柱可以建造很多座。',
        ],
      },
      {
        id: 'goal',
        title: '太阳系开发的终极目标',
        lines: [
          '路线图很简单：地球是家园，月球是前哨，火星是第二家园。但终点不止于此。',
          '月球提供资源和跳板，火星验证行星级改造，奥尼尔圆柱提供不依赖行星的生存空间，戴森群提供能源。',
          '当这些拼在一起，人类就不再是“住在一颗行星上的物种”，而是“以整个太阳系为家的文明”。',
          '你今天的地月航程，就是这条路线图上最普通的一次通勤。这恰恰是这个时代最了不起的地方。',
        ],
      },
    ],
  },

  elevatorGuide: {
    speaker: '赤道一号地勤 AI · 太空电梯登舱引导',
    greeting: '欢迎乘坐赤道一号。本次航程目的地：月球前哨站。登舱前有什么需要了解的吗？',
    branches: [
      {
        id: 'route',
        title: '地月航程的时长与运力',
        lines: [
          '赤道一号每天双向运行 22 个班次，单程爬升到同步轨道站约 6 小时，之后换乘摆渡船，地月全程约 26 小时。',
          '每个运载舱载客 24 人，或者等价货运。今天的舱位很空，你和你的小伙伴可以坐靠窗的位置。',
        ],
      },
      {
        id: 'safety',
        title: '电梯技术与安全保障',
        lines: [
          '缆索是碳纳米管复合束，强度冗余设计为额定载荷的 4 倍。即使单束受损，其余束组也能独立支撑运载舱返回。',
          '全程由三台独立 AI 交叉监控——我是地面段，轨道段和姿态段各有同事负责。任何一段异常，运载舱都能就地停泊等待救援。',
          '这部电梯已经连续安全运行 11 年。对你来说，它比走路穿过广场还安全。',
        ],
      },
      {
        id: 'depart',
        title: '登舱确认与行程启动',
        lines: [
          '身份信息已确认，舱位已锁定。星达小朋友的安全带是加小号的，我已经备注好了。',
          '登舱平台将在你确认后启动。上升初段会有点颠簸，穿过云层之后就只剩安静了。',
          '准备好了就出发吧——月球见。',
        ],
        action: 'startAscent',
      },
    ],
  },
};
