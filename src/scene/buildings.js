/* 建筑原型
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L835-956，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { rand } from '../core/random.js';
import { addGlow, matCore, matDark, matEco, matHabFacade, matMetal, matSolar, matTowerGlass, matWhite } from './materials.js';

/* ================= 建筑原型（未来 100 年形态） ================= */
const BINFO = {
  spire:{ name:'苍穹塔', desc:'居住与办公综合体。智能玻璃幕墙按日照自动调节透光率，外墙藻类涂层参与城市氧气循环。' },
  bio:{ name:'生长塔', desc:'原位 3D 打印的仿生曲面建筑——结构像植物一样生长成型，同强度下减重 40%，露台层叠绿化。' },
  ring:{ name:'光环枢纽', desc:'巨型环形建筑：磁悬浮环线换乘中心，环体内部是空中花园与步行长廊。' },
  etree:{ name:'日冕收集树', desc:'顶部花瓣阵列收集太阳能与轨道微波输电，单株日发电量可供 300 户家庭。' },
  stack:{ name:'层叠居所', desc:'模块化住宅单元，可整体吊装替换；每户配备独立生态阳台与水循环单元。' },
  float:{ name:'悬浮平台', desc:'磁悬浮公共观景平台，低速巡航于城市上空，是 2126 年最受欢迎的日落观景点。' },
  etower:{ name:'赫菲斯托斯之芯', desc:'聚变-裂变混合能源塔，为整座工业城与火箭发射场供能，核心温度 1.2 亿度。' },
  htank:{ name:'液氢储罐', desc:'水冰裂解产物储存设施，-253°C 低温系统全天候运行，供星舰燃料加注。' },
  iceplant:{ name:'水冰加工厂', desc:'地下冰浆在此过滤、电解、分流——饮用水进城，氢氧进罐，氧气入穹顶。' },
  hangar:{ name:'星舰总装厂房', desc:'每 72 小时总装一艘货运飞船，从龙骨到加注全流程无人化。' },
  robotline:{ name:'机器人产线', desc:'建造与维护火星城市的机器人，在这里被它们自己制造。' },
  rail:{ name:'货运轨道', desc:'真空管道磁悬浮货运线，连接工业城与首都，时速 1200 km。' },
  crocket:{ name:'「天舟」货运火箭', desc:'可回收地表-轨道货运火箭，每周三班往返 Areos Gate 空间港。货舱里是刚总装的设备，和来自地球的邮件。' },
  cship:{ name:'地表运输飞船', desc:'短程弹跳式运输器，负责城际大件转运。此刻它正在检修支架上，等待下一个点火窗口。' },
  mgantry:{ name:'维修平台', desc:'火箭勤务塔架：加注、检测、更换发动机都在这里完成，平台机械臂 24 小时待命。' },
  battery:{ name:'储能阵列', desc:'白昼储存光伏与聚变余电。沙暴季来临，它能维持城郊带满负荷运转 21 天。' },
  fabhall:{ name:'装配车间', desc:'火星原位制造：风化层提取金属粉末，3D 打印城市构件——你身边的建筑，八成原料来自脚下的红土。' },
  habmod:{ name:'居住舱区', desc:'城郊工程师的轮值宿舍。双层气密壳体，窗里的暖光，是 2126 年最普通的日常。' },
  plaza:{ name:'中央广场', desc:'城郊带的公共客厅。下班后的工程师在这里喝一杯合成咖啡，看首都方向的天际线。' },
  maglev:{ name:'磁悬浮接驳线', desc:'城郊与首都穹顶之间的通勤干线，每 4 分钟一班，全程 90 秒。' },
  statue:{ name:'马斯克纪念雕像', desc:'青铜铸造，高 42 米，纪念第一位把人类送上火星的开拓者。基座铭文：「让人类成为多行星物种。」——他说了一辈子，说到它成真。' },
  stele:{ name:'拓荒纪年碑', desc:'记载 2024—2089 火星开拓大事记：首次着陆、熔岩管基地、穹顶封顶、人口破百万。碑石取自水手号峡谷岩层。' },
  holo:{ name:'全息档案影像', desc:'2024 年，他在地球上谈论火星。2126 年，你站在火星上看着他——这颗星球，成了他身后最辽阔的背景。' },
  pstation:{ name:'广场磁悬浮站', desc:'首都内环 4 号站。本地居民管它叫「雕像站」——每个初到 Aurelia 的人，第一站都是这里。' },
  farm:{ name:'垂直农场', desc:'40 层无土栽培架，LED 光谱按作物定制，单位面积产量是地球农田的 350 倍。' },
  watertower:{ name:'水循环塔', desc:'穹顶内每一滴水在此净化循环，年损耗率低于 0.3%。' },
  canal:{ name:'生态运河', desc:'人工河流调节穹顶湿度与温度，也是居民的划船道。' },
  greenhouse:{ name:'穹顶外壳', desc:'40 cm 复合智能玻璃：挡辐射、锁温度、透阳光——内外是两个世界。' },
  drill:{ name:'冰层钻塔', desc:'深入地下冰层 2.4 km，采冰机器人全天候作业，火星文明的水龙头。' },
  plaza:{ name:'中央广场', desc:'首都的心脏。第一代移民在这里降落，第一百万个火星婴儿在这里取名。' },
  solarfarm:{ name:'赤道光伏田', desc:'数十万平方米薄膜光伏阵列，日间峰值功率 2.4 GW，与轨道微波输电共同构成火星电网的主干。' },
  walker:{ name:'巡检机器人', desc:'自主巡检单元，沿产线与储罐区全天候巡逻，实时回传设备健康数据，故障响应时间小于 90 秒。' },
  cropring:{ name:'环形农田', desc:'穹顶外的加压种植环，种植耐低氧转基因作物，直接利用火星日照，由灌溉管网供水。' },
  agri:{ name:'温室农场', desc:'链式温室穹顶，水培作物在人工气候下全年生长，是生态城的粮仓。' },
  monument:{ name:'马斯克拓荒纪念碑', desc:'高 312 m，火星文明最高地标。纪念一个世纪前把「让人类成为多行星物种」从口号变成工程图纸的拓荒者们。' },
  observatory:{ name:'巡天观测穹顶', desc:'火星干燥稀薄的空气让这里的星空比地球清晰十倍。穹顶内的深空望远镜同时承担地火通信的光学校准。' },
  antenna:{ name:'射电天线阵', desc:'碟形天线组成的干涉阵列，监听深空探测器回传信号，也是科研站与轨道空间港之间的通信主干。' },
  lab:{ name:'综合实验舱', desc:'加压实验舱：地质分析、生物培养、材料测试三大分区。样本经气闸进出，全程无污染。' },
  sample:{ name:'样本冷藏库', desc:'低温保存钻探岩芯与冰芯样本，等待下一班返回地球的货运飞船。' },
  weather:{ name:'气象监测塔', desc:'全天候记录气压、温度、尘暴与辐射数据，为五座穹顶城市提供气候预警。' },
  landpad:{ name:'着陆坪', desc:'科研补给着陆坪。每月一班货运舱在此降落，送来设备，带走数据与样本。' },
};
function tagBuilding(g, btype){ g.userData.btype = btype; return g; }

function bSpire(h=2.4, r=0.32){
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(r*0.5, r, h, 6), matTowerGlass);
  body.position.y = h/2; g.add(body);
  const band = new THREE.Mesh(new THREE.TorusGeometry(r*0.68, 0.025, 6, 24).rotateX(Math.PI/2), matCore);
  band.position.y = h*0.68; g.add(band);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(r*0.22, 10, 10), matCore);
  tip.position.y = h + r*0.2; g.add(tip);
  return tagBuilding(g, 'spire');
}
function bBio(h=2.2, r=0.5){
  const g = new THREE.Group();
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-r*0.6, 0, 0), new THREE.Vector3(r*1.4, h*0.55, 0), new THREE.Vector3(0, h, 0));
  const trunk = new THREE.Mesh(new THREE.TubeGeometry(curve, 16, r*0.28, 8), matWhite);
  g.add(trunk);
  for(let i=1;i<=3;i++){
    const t = i/4, p = curve.getPoint(t);
    const terrace = new THREE.Mesh(new THREE.CylinderGeometry(r*(0.9-t*0.4), r*(0.9-t*0.4), 0.06, 12), matEco);
    terrace.position.copy(p); terrace.position.y += 0.05; g.add(terrace);
  }
  return tagBuilding(g, 'bio');
}
function bRingB(r=1.1){
  const g = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(r, r*0.16, 10, 40), matTowerGlass);
  ring.position.y = r*1.25; g.add(ring);
  const glowRing = new THREE.Mesh(new THREE.TorusGeometry(r, r*0.05, 6, 40), matCore);
  glowRing.position.y = r*1.25; g.add(glowRing);
  for(const sx of [-1,1]){
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(r*0.09, r*0.13, r*1.3, 8), matMetal);
    leg.position.set(sx*r*0.86, r*0.62, 0); g.add(leg);
  }
  return tagBuilding(g, 'ring');
}
function bEnergyTree(h=1.6){
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.1, h, 6), matDark);
  trunk.position.y = h/2; g.add(trunk);
  for(let i=0;i<6;i++){
    const a = i/6*Math.PI*2;
    const petal = new THREE.Mesh(new THREE.SphereGeometry(0.34, 10, 6), matSolar);
    petal.scale.set(1, 0.16, 0.55);
    petal.position.set(Math.cos(a)*0.32, h+0.05, Math.sin(a)*0.32);
    petal.rotation.y = -a; petal.rotation.z = 0.28;
    g.add(petal);
  }
  const bud = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), matCore);
  bud.position.y = h+0.12; g.add(bud);
  return tagBuilding(g, 'etree');
}
function bStack(w=0.5, h=1.6){
  const g = new THREE.Group();
  let y = 0;
  for(let i=0;i<3;i++){
    const hh = h*(0.4 - i*0.06), ww = w*(1 - i*0.18);
    const box = new THREE.Mesh(new THREE.BoxGeometry(ww, hh, ww), matHabFacade);
    box.position.set((rand()-0.5)*0.16, y+hh/2, (rand()-0.5)*0.16);
    box.rotation.y = (rand()-0.5)*0.5;
    y += hh; g.add(box);
  }
  return tagBuilding(g, 'stack');
}
function bFloat(r=0.7, y=2.2){
  const g = new THREE.Group();
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(r, r*1.12, 0.14, 20), matWhite);
  disc.position.y = y; g.add(disc);
  const garden = new THREE.Mesh(new THREE.CylinderGeometry(r*0.8, r*0.8, 0.1, 20), matEco);
  garden.position.y = y+0.12; g.add(garden);
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.32, y, 10, 1, true),
    new THREE.MeshBasicMaterial({ color:0x8feaff, transparent:true, opacity:0.14, blending:THREE.AdditiveBlending, side:THREE.DoubleSide, depthWrite:false }));
  beam.position.y = y/2; g.add(beam);
  addGlow(g, new THREE.Vector3(0, y-0.2, 0), 0x7fe7ff, 1.6);
  return tagBuilding(g, 'float');
}

export { BINFO, tagBuilding, bSpire, bBio, bRingB, bEnergyTree, bStack, bFloat };
