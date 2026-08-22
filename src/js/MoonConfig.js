// ============================================================
// MoonConfig — 城市布局与共享常量
// 原则：交互点 / 玩法坐标一律不动；视觉建筑围绕它们搭建
// Phase 2：任务改 4 条主线（ACTION FIRST），新增剧情终端与车站
// ============================================================

// 四大区域（位置沿用可玩版本，r 为该区域的"整平半径"）
export const ZONES = {
  hub:      { x: 0,    z: 0,    r: 55, name: '中央基地' },
  eco:      { x: 130,  z: -40,  r: 30, name: '生态舱' },
  research: { x: -130, z: -30,  r: 36, name: '科研区' },
  rocket:   { x: 0,    z: -165, r: 44, name: '火箭港' },
};

// 额外地形整平点（后勤 / 太阳能 / 通讯等设施）
export const FLAT_PADS = [
  { x: 34,  z: -96, r: 20 },  // 后勤 · 停机坪
  { x: 80,  z: 54,  r: 28 },  // 太阳能阵列 A
  { x: -84, z: 50,  r: 26 },  // 太阳能阵列 B
  { x: 96,  z: -12, r: 12 },  // 通讯塔 A
  { x: -96, z: -86, r: 12 },  // 通讯塔 B
];

// 陨石坑（确定性位置，均避开整平区）
export const CRATERS = [
  { x: 62,   z: -62,  r: 14, depth: 3.2 },
  { x: -62,  z: -142, r: 18, depth: 4.0 },
  { x: 92,   z: -132, r: 10, depth: 2.2 },
  { x: -172, z: 42,   r: 16, depth: 3.4 },
  { x: 192,  z: 32,   r: 12, depth: 2.6 },
  { x: 42,   z: 122,  r: 20, depth: 4.5 },
  { x: -42,  z: 172,  r: 13, depth: 2.8 },
  { x: 152,  z: -192, r: 15, depth: 3.0 },
  { x: -192, z: -172, r: 17, depth: 3.6 },
  { x: 232,  z: -62,  r: 11, depth: 2.4 },
  { x: -232, z: -42,  r: 14, depth: 3.0 },
  { x: 2,    z: 232,  r: 19, depth: 4.2 },
  { x: 260,  z: 120,  r: 16, depth: 3.4 },
  { x: -260, z: 110,  r: 15, depth: 3.2 },
];

// ------------------------------------------------------------
// 四条主线任务（原"探索 1/4"升级：ACTION FIRST, STORY SECOND）
// quest 字段 = 主线 id；完成对应动作后该点 done
// ------------------------------------------------------------
export const INTERACT_POINTS = [
  { id:'base', zone:'hub', kind:'activate-city', quest:'city',
    name:'激活月球城市', tag:'中央基地', prompt:'[E] 激活城市网络',
    pos:{ x:0, y:2, z:11 },
    title:'城市网络核心',
    body:'LUNA OUTPOST 2126 中央控制终端。\n城市网络当前处于待机状态。' },
  { id:'eco', zone:'eco', kind:'eco-status', quest:'life',
    name:'恢复生态循环', tag:'生态舱', prompt:'[E] 查看生命维持',
    pos:{ x:130, y:2, z:-32 },
    title:'生命维持系统',
    body:'生态舱主控。\n水 / 光照 / 氧气三个子系统等待手动恢复。' },
  { id:'research', zone:'research', kind:'colonist-dialog', quest:'earth',
    name:'连接地球通讯', tag:'科研区', prompt:'[E] 与研究员交谈',
    pos:{ x:-130, y:2, z:-22 },
    title:'月球村研究员',
    body:'一名驻站研究员正在检查设备。' },
  { id:'rocket', zone:'rocket', kind:'authorize-mars', quest:'mars',
    name:'授权火星航线', tag:'火箭港', prompt:'[E] 授权火星航线',
    pos:{ x:-4, y:2, z:-168 },
    title:'深空发射控制',
    body:'MARS TRANSPORT 发射前检查终端。' },
];

// 剧情子节点终端（动作点，不进任务列表）
export const STORY_POINTS = [
  { id:'eco_water', zone:'eco', kind:'eco-node', node:'water',
    name:'水循环', prompt:'[E] 启动水循环', pos:{ x:135.5, y:2, z:-15 } },
  { id:'eco_light', zone:'eco', kind:'eco-node', node:'light',
    name:'农业光照', prompt:'[E] 开启农业光照', pos:{ x:142, y:2, z:-2 } },
  { id:'eco_oxygen', zone:'eco', kind:'eco-node', node:'oxygen',
    name:'氧气循环', prompt:'[E] 启动氧气循环', pos:{ x:124, y:2, z:-17 } },
  { id:'earth_link', zone:'research', kind:'earth-link',
    name:'地球通讯终端', prompt:'[E] 连接地球通讯', pos:{ x:-148, y:2, z:-14 } },
  { id:'rocket_cargo', zone:'rocket', kind:'mars-node', node:'cargo',
    name:'货运核验', prompt:'[E] 核验货运舱', pos:{ x:14, y:2, z:-141 } },
  { id:'rocket_energy', zone:'rocket', kind:'mars-node', node:'energy',
    name:'能源接口', prompt:'[E] 检查能源接口', pos:{ x:15, y:2, z:-154 } },
];

// 主线元数据（任务面板显示）
export const QUESTS = [
  { id:'city',  en:'ACTIVATE CITY',        cn:'激活月球城市' },
  { id:'life',  en:'RESTORE LIFE SUPPORT', cn:'恢复生态循环' },
  { id:'earth', en:'ESTABLISH EARTH LINK', cn:'连接地球通讯' },
  { id:'mars',  en:'AUTHORIZE MARS ROUTE', cn:'授权火星航线' },
];

// 研究员三问三答（2~4 句，克制）
export const COLONIST_QA = [
  { q: '这里真的有人长期生活吗？',
    a: '是的。月球村目前有 40 多名常驻人员。\n居住舱、医疗舱、公共穹顶都是真实在用的。\n我们不是访客，我们是居民。' },
  { q: '月球生活和地球最大的不同是什么？',
    a: '每一步都要计算资源。\n空气、水、食物都来自循环系统，没有什么是理所当然的。\n但抬头看到地球时，一切都值得。' },
  { q: '为什么人类还要继续去火星？',
    a: '因为月球只是第一步。\n在这里我们学会了在异星生存，火星是下一次考试。\n停留不前，从来不是人类的选项。' },
];

// 轨道车站（环线四站，顺序即环线顺序）
export const STATIONS = [
  { id:'hub',      name:'CENTRAL HUB',      cn:'中央基地站', track:{ x:16,  z:50  }, platform:{ x:19,  z:52  } },
  { id:'eco',      name:'ECO DOME',         cn:'生态舱站',   track:{ x:102, z:-36 }, platform:{ x:105, z:-36 } },
  { id:'research', name:'RESEARCH VILLAGE', cn:'月球村站',   track:{ x:-98, z:-22 }, platform:{ x:-96, z:-18 } },
  { id:'port',     name:'DEEP SPACE PORT',  cn:'深空港站',   track:{ x:12,  z:-131}, platform:{ x:20,  z:-128} },
];

// 环线中间路径点（让轨道绕开建筑、形成环线而非直线交叉）
export const TRANSIT_WAYPOINTS = [
  [16, 50], [60, -8], [102, -36],       // hub → eco
  [60, 68], [-50, 72], [-98, -22],      // eco → research（北侧绕行）
  [-70, -95], [12, -131],               // research → port
  [10, -70], [12, -10],                 // port → hub
];

// 世界区域标记（远景小点 / 中景名称 / 近景隐藏）
export const MARKERS = [
  { name:'中央基地', pos:{ x:0,    y:36, z:0    } },
  { name:'生态舱',   pos:{ x:130,  y:28, z:-40  } },
  { name:'科研区',   pos:{ x:-130, y:22, z:-30  } },
  { name:'火箭港',   pos:{ x:0,    y:68, z:-165 } },
];

// 太阳方向（统一光源 / 太阳能板朝向）
export const SUN_POS = { x: -140, y: 210, z: -170 };

// ------------------------------------------------------------
// 总工程整合配置（INTEGRATION）——未来接入《2126》主工程时只改这里
// backUrl/hubUrl/marsUrl：模块内页面跳转目标（相对本模块根）
// msgBridge：是否启用 window.postMessage 桥（iframe / 统一入口）
// ------------------------------------------------------------
export const INTEGRATION = {
  backUrl: 'solar-hub.html',      // 月球场景「返回」目标页
  hubUrl: 'solar-hub.html',       // 太阳系枢纽页
  marsUrl: 'mars-city.html',      // 火星场景页
  title: '月球前哨城市 · 2126',
  msgBridge: true,                // 允许父页面通过 postMessage 驱动场景
  // 消息协议（父 → 模块）：
  //   { type:'moon:goto',   page:'moon'|'hub'|'mars' }
  //   { type:'moon:launch' }                    → 触发火箭发射
  //   { type:'moon:setQuest', id:'city' }       → 标记主线完成（调试/联动）
  // 模块 → 父：
  //   { type:'moon:quest',  id, done }          → 主线状态变化
  //   { type:'moon:launched' }                  → 火箭升空
  //   { type:'moon:ready' }                     → 场景就绪
};

// ------------------------------------------------------------
// NPC 系统（人属于场景，对话来自工作与生活）
//  pos: 站位（y 由碰撞/地形决定）；faceYaw: 朝向；color: 服装主色
//  ambient: 第一阶段环境短句（靠近即见，一句、有生活感）
//  options: 第二阶段对话（最多 3 个，每答 2~4 句）；effect 可推动任务
// ------------------------------------------------------------
export const NPCS = [
  { id:'dispatcher', zone:'hub', name:'林调度', role:'中央基地调度员',
    pos:{ x:4.5, z:14 }, faceYaw:2.6, color:0x7fd8ff,
    ambient:'城市网络刚醒了一半，剩下的得靠人来点亮。',
    options:[
      { q:'这座城市现在是什么状态？',
        a:'主体框架都在，但网络还在待机。\n中央核心就在你身后的广场上。\n激活它，生态、科研、港区和轨道才会一起醒。' },
      { q:'我刚到月球，该先做什么？',
        a:'先去激活城市网络，那是所有系统的总开关。\n跟着任务指引走，广场中央的信息核心就是起点。\n别担心，星达会陪着你。',
        effect:{ toast:'目标已标注 · 跟随左上角小任务板方向指引', celebrate:true } },
      { q:'这里有多少人？',
        a:'常驻四十多位，分散在四个区。\n大家各司其职：种田、研究、发射、运维。\n月球不是营地，是家。' },
    ] },
  { id:'botanist', zone:'eco', name:'苏农艺', role:'生态穹顶农艺师',
    pos:{ x:137, z:-22 }, faceYaw:-0.6, color:0x7affb0,
    ambient:'这一批作物过两天就收，要送去月球村的公共食堂。',
    options:[
      { q:'在月球上怎么种东西？',
        a:'水来自循环，光是人工配比，土壤是处理过的月壤。\n缺一样都不行，所以三个子系统得一起转。\n你把它们都启动了吗？' },
      { q:'这些够所有人吃吗？',
        a:'现在刚够，还得很仔细地算。\n每多一个人，就得多一列架子、多一路水。\n所以我们一直在扩穹顶。' },
      { q:'这对去火星有什么意义？',
        a:'火星路远，补给难，必须自己种。\n在月球练熟的这套循环农业，会原样搬去火星。\n这里是试验田，也是底气。' },
    ] },
  { id:'researcher', zone:'research', name:'陈研究员', role:'月球村驻站研究员',
    pos:{ x:-128, z:-24 }, faceYaw:0.9, color:0xc7b8ff,
    ambient:'望远镜对准地球了，信号比昨天稳。',
    options:[
      { q:'你在研究什么？',
        a:'低重力下的材料、生命和通讯。\n很多在地球做不了的实验，这里能做。\n成果会决定火星城怎么盖。' },
      { q:'能联系上地球吗？',
        a:'能，通讯终端就在村子边上。\n连上它，就能和地球实时通话。\n去试试吧，信号一直开着。' },
      { q:'月球对火星意味着什么？',
        a:'跳板，也是考场。\n在这儿学会的一切，到了火星都用得上。\n先学会在月球活，才配谈火星。' },
    ] },
  { id:'resident', zone:'research', name:'赵居民', role:'月球村居民',
    pos:{ x:-146, z:-42 }, faceYaw:2.0, color:0xffd27f,
    ambient:'晚饭后大家都爱来公共穹顶坐坐，看看地球。',
    options:[
      { q:'在月球生活是什么感觉？',
        a:'安静，慢，每一步都要算资源。\n但邻里很近，大家都互相搭把手。\n抬头就是地球，想家了就看看。' },
      { q:'会想念地球吗？',
        a:'会啊，谁不想。\n可在这儿，我们是真正在开拓的人。\n这点自豪感，地球上找不到。' },
    ] },
  { id:'engineer', zone:'rocket', name:'林工', role:'火箭港发射工程师',
    pos:{ x:-14, z:-152 }, faceYaw:0.4, color:0xff9d6b,
    ambient:'这艘运输舰在等最后的出发授权，货和能源都核完了。',
    options:[
      { q:'去火星前要检查什么？',
        a:'货运、能源、授权，一项都不能少。\n检查终端就在发射架旁边。\n全部通过，我才敢按发射钮。',
        effect:{ toast:'检查清单：货运核验 · 能源接口 · 航线授权' } },
      { q:'为什么从月球出发去火星？',
        a:'月球重力只有地球的六分之一，起飞省太多燃料。\n而且这里能就地取材造推进剂。\n从月球走，是去火星最划算的路。' },
      { q:'发射安全吗？',
        a:'我做了八年发射，从没出过事。\n每一步都有检查单，今天你也在帮忙核对。\n放心，准备做足了就稳。' },
    ] },
];
