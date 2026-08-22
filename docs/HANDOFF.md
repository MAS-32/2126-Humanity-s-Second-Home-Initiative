# 太阳系空间站 · 项目交接文档（HANDOFF）

> 目的：让一个新的 AI 项目/助手，在不重读全部代码的前提下，30 分钟内理解并继续这个项目。

---

## 0. 一句话定位

这是一个 **纯 Three.js 的科幻互动场景合集**。当前焦点是 `moon-module/` —— 《2126：人类第二家园计划》的**月球前哨城市**，玩家扮演「星达」在月球城市里探索、接任务、坐轨道列车、激活城市、恢复生态、连接地球、授权火星航线。

---

## 1. 目录结构

```
太阳系空间站/
├── hub.html                     # 中央导航入口（太阳系 / 月球 / 火星）
├── moon-module/                 # ★ 当前开发焦点：月球前哨城市
│   ├── moon-base.html           #   单文件入口（HTML+CSS+MoonScene class，~1340 行）
│   ├── moon-base-v0.html.bak    #   旧备份（不要动）
│   ├── js/                      #   14 个 ES 模块
│   │   ├── Xingda.js            #   ★ 星达角色系统（本轮新增：Avatar+Animator+Controller）
│   │   ├── MoonConfig.js        #   区域/交互点/任务/车站/轨道/标记 全部常量
│   │   ├── MoonColliders.js     #   碰撞世界（circles/obbs/platforms）
│   │   ├── MoonTransit.js       #   轨道环线 + 自动列车 + 乘车
│   │   ├── MoonBuilders.js      #   建筑零件库（cyl/box/dome/corridor/solarArray…）
│   │   ├── MoonMaterials.js     #   材质调色板 + 程序化贴图
│   │   ├── MoonTerrain.js       #   高度场 + 地形 + 岩石 + 远山
│   │   ├── MoonInfrastructure.js#   道路/能源导管/太阳能/后勤/通讯塔
│   │   ├── MoonCitySystems.js   #   城市功能设施（能源分配/水处理/氧气/月壤/充电）
│   │   ├── CentralHub.js        #   中央基地
│   │   ├── EcoDome.js           #   生态穹顶（环形墙 + 入口门洞）
│   │   ├── ResearchVillage.js   #   科研区/月球村
│   │   ├── RocketPort.js        #   深空火箭港（暴露 ship/engineFlames 供发射动画）
│   │   ├── MoonNPCs.js          #   人类 NPC（程序化人形+待机+玩家感知/对话转身）
│   │   └── MoonMarkers.js       #   世界任务标记（距离/状态联动）
│   └── test/                    # 自测脚本
│       ├── walk.test.mjs        #   碰撞可达性 BFS 回归测试（node 直接跑）
│       ├── xingda-preview.html  #   星达模型多角度预览
│       └── SimplexNoise.js      #   three 官方噪声（测试依赖）
├── 实验1/                       # 空间站场景（station.html，另一独立场景）
├── backup-before-ai-migration/  # AI 迁移前的旧备份
└── _publish/                    # 已发布的静态副本
```

---

## 2. 怎么跑起来

```bash
# 月球（当前项目）
cd 太阳系空间站/moon-module
python3 -m http.server 8123 --bind 127.0.0.1
# 浏览器打开 http://127.0.0.1:8123/moon-base.html
```

- **零构建、零 npm 依赖**：three.js 从 jsdelivr CDN 加载（`importmap`），所有模块是浏览器原生 ES module。
- three 版本锁定 **0.160.0**。

---

## 3. 核心架构（最重要）

`moon-base.html` 里的 `MoonScene` class 是整个关卡的唯一主类，职责：**渲染 / 相机 / 玩家控制 / 交互 / HUD / 任务 / 主循环**。视觉构建全部委托给 `js/` 下的模块。

关键字段/方法（改代码前必读）：

| 成员 | 含义 |
|---|---|
| `this.playerPos` | **玩家逻辑位置**（眼高）。相机从这里派生，≠ 相机位置 |
| `this.viewMode` | `'third'` / `'first'`（默认 third，V 切换） |
| `this.viewYaw / viewPitch` | 鼠标环绕角（两视角共用，灵敏度一致） |
| `this.xingda` | 星达角色（`XingdaController`） |
| `this.collision` | 碰撞世界（`buildCollisionWorld` 返回，有 `collides/ground`） |
| `this.transit` | 轨道列车（有 `isOnline/setOnline/isDwellingAt/board/arrivedAtDest/endRide/skipRide/seatWorld/debugState`） |
| `this.story` | 剧情状态 `{ city, life:{water,light,oxygen}, earth, mars:{cargo,energy,auth} }` |
| `this.points` | 14 个交互点（4 主线 + 6 剧情子终端 + 4 车站） |
| `updateMovement(dt)` | 玩家移动（分轴碰撞滑动 + 低重力跳），操作 `playerPos` |
| `updateCamera(dt)` | 第一/第三人称相机定位 + 相机碰撞 |
| `updateProximity()` | 交互点接近检测 |
| `tryInteract()` | E 键路由（按 point.kind 分发到 uiXxx） |
| `markVisited(p)` | 任务完成（改 `#qbList`、更新双任务板、触发星达庆祝） |

**调试入口**：`window.moon` 暴露 MoonScene 实例，浏览器 console 可直接：
```js
moon.story.city = true; moon.completeQuest(moon.points.find(p=>p.id==='base'));
moon.transit.setOnline(); moon.transit.debugState();
moon.xingda.setState('HAPPY');
```

---

## 4. 星达角色系统（本轮重点，别推倒重做）

`js/Xingda.js` 三部分，**模型以后可直接换 GLB，动画/相机/控制不重写**：

- `buildXingdaAvatar()` → 程序化精细模型（蓝绿毛发 #5fe6d8、奶白脸腹 #fff6d6、浅绿斑点 #a7ff9b、大垂耳、超大黑眼+青虹膜、双触角+发光星球、星形项圈、绒球尾巴）。**三视图母版，禁止重新设计。**
- `XingdaAnimator` → 8 态状态机 `IDLE/WALK/RUN/CURIOUS/THINKING/HAPPY/INTERACT/CELEBRATE`。情绪经耳朵/尾巴/触角/触角星球亮度/项圈/身体姿态/头部朝向表达（背面可读）。
- `XingdaController` → 位置/朝向/可见性 + `replaceWithGLTF(model)` 替换接口。

---

## 5. 已完成的进度（截至本次交接）

- ✅ 纯 Three.js 月球场景、四大区域、城市功能系统（能源/生命维持/居住/物流/通讯/资源/太空港）
- ✅ 玩家移动（WASD + 低重力 0.16g）+ E 交互 + 四主线任务
- ✅ 碰撞系统：手工 circles/obbs/platforms，**已修完空气墙且不穿模**（太阳能大 Box、生态穹顶封死均已修复）
- ✅ 轨道环线 + 自动列车（停站/开门/离站/循环）+ 乘车（上车/选目的地/到站/下车/跳过）+ **呼叫列车**
- ✅ **星达角色系统**（三视图母版、8 态情绪、可换 GLB）
- ✅ **默认第三人称 + V 切换第一人称** + 相机碰撞
- ✅ **UI 中文化**（中文为主、英文小字）+ **双层任务板**（TAB 大板 + 左上小板）+ 小任务板方向导航
- ✅ 任务完成星达庆祝反馈
- ✅ **NPC 系统**：四区 5 人类 NPC（林调度/苏农艺/陈研究员/赵居民/林工），two-stage 对话（靠近短气泡 → E 进对话，最多 3 选项）+ **对话镜头**（相机移到星达 3/4 侧前方同框两人，NPC 转身对视，关闭后平滑交还）
- ✅ **星达地标好奇**：首次看到地球/生态穹顶/运输舰自动 CURIOUS 抬头（各一次，不抢相机）
- ✅ **地面浅光导航**：偏离目标 >26m 时地面柔光路径流向目标
- ✅ **火箭发射系统**：倒计时 → 点火（尾焰/烟雾/火光/程序化轰鸣）→ 爬升 → 远去 → 12s 后新舰就位；**无需完成主线检查即可发射**（面板提供「跳过检查 · 直接发射」），完成后亦可通过授权流程
- ✅ **视觉精修**：电影感 Bloom（0.58/0.62/0.78）、近景漂浮月尘层、NPC 玩家感知（转头）

---

## 6. 待办（交接后继续做，按优先级）

1. **发射终点承接**：运输舰升空后目前淡出 + 12s 新舰就位；后续可接入真实火星场景（`goToMars` 钩子）或离港过场。
2. **综合测试**：TEST 01~14 全流程（第三人称/第一人称/星达反馈/双任务板/导航/NPC/列车呼叫/上车/行驶/下车/空气墙/穿模/主线完整/发射全流程）尚未成体系（现有 `walk.test.mjs` 仅覆盖碰撞可达性）。
3. **NPC 行走**：NPC 目前静态站位（呼吸/摆臂/转头/对视），未做巡逻行走与手势动画。
4. **音效补全**：目前只有发射轰鸣（Web Audio）；环境/交互音效可参考 实验1 的 SFX 体系。

---

## 7. 关键约定与禁区（务必遵守，否则前功尽弃）

**保留不动的：**
- 不重写 `MoonScene`（moon-base.html）、不重写玩家系统、不重写任务框架。
- 不改太阳系、不做火星正式场景（只留接口）。
- 不动 `moon-base-v0.html.bak`、`backup-before-ai-migration/`、`实验1/`。

**星达：**
- 不是机器人、不是机械宠物、不是导航 AI，是**有情绪的生命体**。唯一视觉母版 = 三视图，禁止重新设计。

**碰撞原则：**
- 明确 WALKABLE（道路/广场/车站/站台/入口）与 BLOCKED（墙体/大型设备/火箭主体）。
- 圆形建筑用 Cylinder/多个小碰撞体，禁止一个巨大 Box 包住复杂建筑。
- 纯装饰（小灯/细杆/小箱）不碰撞。

**叙事原则：**
- ACTION FIRST，STORY SECOND —— 玩家先做事，世界观通过结果告诉玩家。
- 人类 NPC 是剧情主体，AI 屏幕只是辅助。
- NPC 回答 2~4 句，禁止百科长文。

**UI 原则：**
- 中文第一信息语言，英文仅小字辅助/装饰。

**本轮冻结：** 高级材质/电影灯光/Bloom 重做/大量粒子/NPC 动画/火箭发射动画 —— 视觉精修留到功能稳定后。

---

## 8. 给新 AI 的启动提示词（直接复制使用）

> 你在继续一个 Three.js 月球关卡项目（《2126：人类第二家园计划》）。先读 `moon-module/HANDOFF.md` 这份交接文档，再读 `moon-module/moon-base.html` 的 MoonScene 类和 `js/MoonConfig.js`、`js/Xingda.js`。项目零构建，`cd moon-module && python3 -m http.server 8123` 后打开 moon-base.html 即可运行；调试入口是 `window.moon`（含 `moon.launchRocket()` / `moon.launchState()` / `moon.transit` / `moon.story` / `moon.xingda`）。当前待办：① 发射终点承接（火星场景/离港过场）② TEST 01~14 综合测试成体系 ③ NPC 巡逻行走 ④ 音效补全。遵守 HANDOFF.md 第 7 节的禁区，不要重写 MoonScene，不要重新设计星达。
