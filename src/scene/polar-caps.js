/* 极地冰盖
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L514-541，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { sstep } from '../core/random.js';
import { R } from '../core/renderer.js';
import { marsGroup, terrainH } from './terrain.js';

/* ---------- 极地冰盖 ---------- */
function capAlphaTexture(){
  const w=512, h=256, cv=document.createElement('canvas'); cv.width=w; cv.height=h;
  const ctx=cv.getContext('2d'); const img=ctx.createImageData(w,h);
  for(let y=0;y<h;y++) for(let x=0;x<w;x++){
    const lat = (0.5 - y/h)*180;
    const n = Math.sin(x*0.09)*Math.sin(y*0.13) + Math.sin(x*0.023+y*0.05)*1.6;
    const a = sstep(73, 80, Math.abs(lat) + n*2.2)*255;
    const idx=(y*w+x)*4; img.data[idx]=255; img.data[idx+1]=255; img.data[idx+2]=255; img.data[idx+3]=a;
  }
  ctx.putImageData(img,0,0);
  return new THREE.CanvasTexture(cv);
}
const capGeo = new THREE.SphereGeometry(R, 128, 128);
{
  const pos = capGeo.attributes.position; const v = new THREE.Vector3();
  for(let i=0;i<pos.count;i++){
    v.fromBufferAttribute(pos, i);
    const dir = v.clone().normalize();
    v.copy(dir).multiplyScalar(R + terrainH(dir) + 0.14);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  capGeo.computeVertexNormals();
}
const capMat = new THREE.MeshStandardMaterial({ color:0xeef3f6, roughness:0.28, metalness:0.05,
  transparent:true, alphaMap:capAlphaTexture() });
marsGroup.add(new THREE.Mesh(capGeo, capMat));

export { capMat };
