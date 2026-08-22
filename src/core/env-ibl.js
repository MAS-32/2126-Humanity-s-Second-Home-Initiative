/* IBL 环境反射
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L291-318，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { renderer, scene } from './renderer.js';

/* ---- 环境反射（IBL）：程序化火星环境贴图——金属/玻璃获得真实反射，消灭塑料感 ---- */
function makeEnvEquirect(){
  const c = document.createElement('canvas'); c.width = 1024; c.height = 512;
  const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0.0, '#04060d');   // 天顶深空
  g.addColorStop(0.42, '#0d1420');
  g.addColorStop(0.55, '#332016');  // 地平线尘光
  g.addColorStop(0.62, '#6e4126');
  g.addColorStop(0.72, '#3c2415');  // 地表反照
  g.addColorStop(1.0, '#1c100a');
  x.fillStyle = g; x.fillRect(0, 0, 1024, 512);
  const s = x.createRadialGradient(612, 206, 4, 612, 206, 95);   // 低角度暖阳（与 sunDir 同方位）
  s.addColorStop(0, 'rgba(255,236,214,1)');
  s.addColorStop(0.25, 'rgba(255,214,170,.55)');
  s.addColorStop(1, 'rgba(255,200,150,0)');
  x.fillStyle = s; x.beginPath(); x.arc(612, 206, 95, 0, 7); x.fill();
  const t = new THREE.CanvasTexture(c);
  t.mapping = THREE.EquirectangularReflectionMapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
{
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromEquirectangular(makeEnvEquirect()).texture;
  pmrem.dispose();
}
