/* 信息面板
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L2175-2203，模块化拆分后保持行为等价。
 */
import { BINFO } from '../scene/buildings.js';

/* ================= 信息 & 交互 ================= */
const INFO = {
  capital: { title:'火星首都 · Aurelia', body:'人口 42 万，火星最大城市。直径 8 km 的巨型穹顶之下：摩天塔群、中央广场、光环磁悬浮、空中交通层与整片生态绿地——火星版未来纽约。',
    npc:['城市规划师 · 岚','"地球上城市消耗自然，这里的城市本身就是自然——氧气、水、温度，全部由我们亲手维持。这不是殖民地，是家。"'] },
  eco: { title:'翡绿生态城 · Verde', body:'火星版新加坡。主穹顶内是人工森林、生态运河与垂直农场，副穹顶是温室农田。红色荒漠与绿色生命只隔一层 40 cm 的复合玻璃。',
    npc:['生态工程师 · 苔','"每一片叶子的光照、每一滴水的循环都由 AI 气候系统照料。我们把地下两万年的冰，变成了流动的河。"'] },
  industrial: { title:'赫菲斯托斯工业城', body:'火星赤道工业带核心：聚变能源塔、液氢储罐、水冰加工厂、星舰总装厂房、机器人产线与真空货运轨道。每 72 小时，一艘货运飞船在这里总装完成。',
    npc:['火箭工程师 · 卡尔','"月球是跳板，火星是船坞。从这里出发的飞船，用的是火星的冰、火星的燃料、火星造的引擎。"'] },
  mining: { title:'冰川矿城 · Glacies', body:'建立在北纬 52° 富冰带之上。钻塔深入地下冰层 2.4 km，采冰机器人全天候作业，冰浆经管道输往赤道——火星文明的水龙头。',
    npc:['采矿监督 AI · W-7','"今日产冰 12,400 吨。提醒：这颗星球 60% 的饮用水，经过我的钻头。"'] },
  frontier: { title:'前哨城 · Frontier', body:'南半球最新落成的居住穹顶，容纳 6 万新移民。打印机器人 + 预制穹顶 + 成熟生态模板，让「造一座城」只需要 14 个月。',
    npc:['新移民 · 阿梨','"我出生在地球，但我女儿出生在这里。对她来说，火星不是远方，是故乡。"'] },
  spaceport: { title:'轨道空间港 · Areos Gate', body:'太空电梯顶端枢纽，客运舱 6 小时直达轨道。货运飞船在此补给燃料，前往地球、月球与正在施工的外太阳系航路。',
    npc:['塔台管制员','"欢迎回家。下一次地火转移窗口在 14 个月后——船票已经排到明年了。"'] },
  research: { title:'奥林帕斯科研站', body:'坐落于奥林帕斯山麓的综合科研基地：巡天观测穹顶、射电天线阵、综合实验舱与样本冷藏库。火星的地质、气候与生命科学数据，都在这里被逐条破译。',
    npc:['科研站站长 · 林澈','"今日风速 34 m/s，气压 612 Pa，观测条件：极佳。晨线之后能看到奥林帕斯山——值得一看。"'] },
};
const infoPanel = document.getElementById('info');
function showInfo(key){
  const d = INFO[key]; if(!d) return;
  infoPanel.innerHTML = `<h3>${d.title}</h3><p>${d.body}</p>
    <div class="npc"><b>${d.npc[0]}</b><br>${d.npc[1]}</div>`;
}
function showBuilding(btype, idx){
  const d = BINFO[btype]; if(!d) return;
  infoPanel.innerHTML = `<span class="tag">BUILDING ${String(idx).padStart(2,'0')}</span>
    <h3>${d.name}</h3><p>${d.desc}</p>`;
}

export { infoPanel, showInfo, showBuilding };
