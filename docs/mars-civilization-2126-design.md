# Mars Civilization 2126 — 火星章节设计案

> 《2126：人类第二家园计划》火星章节 · 黑客松交付文档
> 配套可运行网页：`index.html`（Three.js 单文件，全程序化生成，无外部模型依赖）

---

## 1. 世界观一句话

2126 年，火星不是基地，是一颗运转中的文明星球：百万人口、地下水冰驱动、AI 协调生态，地表有城，轨道有港。

## 2. 整体视觉定位

- 参考：《星际穿越》的科学质感 + 《流浪地球2》的工业尺度 + SpaceX/NASA 火星概念
- 拒绝：赛博朋克霓虹、废土、外星幻想风
- 关键词：橙红荒漠 × 透明穹顶 × 青色生命光 × 金属轨道设施

## 3. 地貌系统（已在网页中程序化实现）

| 地貌 | 实现 |
|---|---|
| 130 个陨石坑 | 不规则尺寸/深度，坑沿隆起 + 坑底下沉 + 大坑中央峰 |
| 水手号大峡谷 | 赤道南侧蜿蜒裂谷，cos² 剖面 + 谷壁噪声侵蚀 |
| 奥林帕斯山 | 高斯隆起盾状火山 + 顶部破火山口 |
| 塔尔西斯高原 / 希腊盆地 | 大范围抬升 / 沉降 |
| 沙丘风蚀 | 三层 FBM Simplex 噪声顶点色混合（橙红/深红岩/玄武岩/尘埃） |
| 极地冰盖 | 噪声边缘 alphaMap + 独立贴地网格 + 低粗糙度光泽 |

## 4. 地下水冰可视化

点击「地下水冰透视」后地表半透明化，三层结构：
1. 深褐基岩层（r=46.9）
2. 浅蓝发光冰晶层（r=48.3）+ 240 颗随机朝向冰晶
3. 深层液态储水区（8 个发光水体球）
配套：Glacies 矿城钻塔深入冰层、蓝色钻孔辉光、Glacies→Hephaestus 贴地输水管道。

## 5. 城市清单

| 城市 | 要素 | NPC 对话角色 |
|---|---|---|
| 火星首都 Aurelia | 6.4 半径穹顶、130 塔楼 + 34 发光尖塔、光环路、生态绿地 | 城市规划师 · 岚 |
| Musk 纪念碑 | 312m 概念——尖塔 + 三环轨道环 + 顶部光球 + 冲天光束，全火星最高 | 纪念碑铭文 |
| 赫菲斯托斯工业城 | 储罐环、厂房、火炬塔、猎鹰九号风格火箭发射台 | 火箭工程师 · 卡尔 |
| 翡绿生态城 Verde | 三连穹顶、人工森林、湖泊、树群、连接管道 | 生态工程师 · 苔 |
| 冰川矿城 Glacies | 双钻塔、居住舱、深入冰层管道 | 采矿 AI · W-7 |
| 前哨城 Frontier | 新移民穹顶城 | 新移民 · 阿梨 |
| 轨道空间港 Areos Gate | 太空电梯（含运行中的轿厢）+ 环形空间站 + 太阳能板 | 塔台管制员 |
| 轨道船坞环 + 3 艘巡航飞船 | 倾斜轨道环、引擎辉光 | — |

## 6. 宇宙环境

- 6000 颗恒星（颜色分级）+ 3400 点银河带（倾斜银盘）
- 5 团程序生成星云（紫/蓝/青/暖橙）
- 火卫一 Phobos（r=2.6，9 个撞击凹陷）/ 火卫二 Deimos（r=1.6），不规则形状 + 自转 + 公转
- 火星大气边缘辉光（Fresnel shader，橙红色）
- 太阳光斑 sprite

## 7. AI 绘图 Prompt（Midjourney / SD 直接用）

1. `cinematic aerial view of a massive Mars colony city in 2126, giant transparent geodesic dome covering skyscrapers and green parks, red Martian desert and deep canyon in background, warm sunlight, volumetric atmosphere, Interstellar movie style, photorealistic, 8k --ar 21:9`
2. `a 300-meter futuristic metal monument rising above a Mars capital city, three orbital rings around a tapering spire, glowing cyan energy core, crowd of city lights at its base, dusk on Mars, epic scale, sci-fi concept art --ar 16:9`
3. `inside a Mars habitat dome, lush artificial forest and a blue lake under transparent glass ceiling, red desert visible outside, children playing in low gravity, hopeful atmosphere, NASA concept art, ultra detailed --ar 16:9`
4. `Mars industrial zone at dawn, hydrogen fuel plant with spherical tanks and pipelines, orange flare towers, Falcon-9 style rocket on launch pad, robotic workers, dust in the air, Wandering Earth industrial aesthetic --ar 21:9`
5. `space elevator cable rising from Mars surface into orbit, ring-shaped space station at the top with solar panels, cargo ships docking, red planet curvature below, hard sci-fi, cinematic lighting --ar 9:16`
6. `subsurface cross-section of Mars, layers of red rock, glowing blue water-ice crystal veins, deep underground reservoir, robotic drilling rig descending, scientific visualization, dramatic lighting --ar 16:9`
7. `Valles Marineris canyon on Mars with a city built into the canyon wall, terraced habitats glowing at night, steep layered rock strata, thin atmosphere haze, epic depth, photorealistic --ar 21:9`
8. `Mars polar ice cap research station, white glacier meeting red desert, drilling towers with blue lights, aurora-like atmospheric glow, lone astronaut walking, The Martian movie style --ar 16:9`
9. `Phobos and Deimos orbiting Mars, irregular cratered grey moons, red planet with visible city lights on night side, milky way and nebula in deep space background, cinematic space art --ar 21:9`
10. `night side of Mars 2126, glowing dome cities scattered across dark red surface like Earth seen from orbit, orbital ring station with ship trails, thin orange atmosphere rim light, awe-inspiring, ultra realistic --ar 21:9`

## 8. Unity / UE 落地要点

**场景拆分**：`Mars_Global`（星球+地貌+轨道，本网页已覆盖）/ `Mars_Surface_Playable`（首都地面可行走区）/ `Interior_Dome`（穹顶内部生态）/ `Space_Station`（轨道港内部）。黑客松阶段只需 Global + 一个 Surface。

**模型优先级**：P0 纪念碑、穹顶、火箭、钻塔；P1 塔楼群（可用同一模型缩放阵列）、空间站；P2 管道、绿地、飞船。

**Shader 建议**：地表用 Triplanar 混合 3 套 PBR 贴图（红壤/岩石/尘埃）+ 高度图置换；穹顶用 Fresnel 透明 + 内部雾；冰层用 SSS 近似（次表面散射蓝）；大气沿用网页同款 Fresnel 边缘光。

**灯光**：单方向光（低角度暖阳）+ 城市自发光（Emissive + Bloom 后处理）+ 夜侧仅自发光，营造"地球夜光"效果。

**玩家路线**：降落场 → 纪念碑广场（剧情点1）→ 磁悬浮到工业城（剧情点2）→ 生态城对话（剧情点3）→ 太空电梯升空 → 结束镜头：火星夜面全景。

**性能**：城市全部 GPU Instancing；地貌 LOD3 级；冰晶/树木用 Impostor 面片。
