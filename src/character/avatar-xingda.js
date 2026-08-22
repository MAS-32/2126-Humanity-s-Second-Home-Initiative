/* 星达角色适配器
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L3104-3332，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { ASSETS } from '../core/assets.js';
import { AvatarAdapter } from './avatar-base.js';
import { xdEyeTexture } from '../interaction/companion.js';
import { addGlow } from '../scene/materials.js';

/* ---------- 星达角色适配器 ---------- */
class XingdaAvatarAdapter extends AvatarAdapter {
  constructor(opts={}){
    super();
    this.heightTarget = opts.height || 0.95;   // 星达设定约 110cm
    this.state = 'idle';
    this.glbReady = false;
    this.mixer = null; this.actions = {}; this._curAction = null;
    this.group = new THREE.Group();            // 外部只接触这个根节点
    this.group.userData.isAvatar = true;
    this.inner = new THREE.Group();            // 视觉层：自动 Ground Alignment，脚底 = 根节点原点
    this.group.add(this.inner);
    this._t = 0; this._blink = 2.5; this._blinkPhase = 0;
    this._modelYaw = 0; this._stepPhase = 0;
    this._buildProxy();
    this._tryLoadGLB();
  }
  get object3d(){ return this.group; }
  get height(){ return this.heightTarget; }

  /* TEMP AVATAR — REPLACE WITH XINGDA GLB（assets/characters/xingda.glb）
     仅用于验证第三人称比例/相机/移动/动画状态，参考设定图：蓝绿毛绒、大头身比、
     能量星球触角 ×2、蓬松尾巴、发光星形项圈、星空大眼。 */
  _buildProxy(){
    const u = this.heightTarget / 0.95;
    const g = new THREE.Group();
    const matBody  = new THREE.MeshStandardMaterial({ color:0x46d0bf, roughness:0.92, metalness:0.02 });
    const matBodyD = new THREE.MeshStandardMaterial({ color:0x34ada0, roughness:0.92 });
    const matCream = new THREE.MeshStandardMaterial({ color:0xfff6d6, roughness:0.85 });
    const matEye   = new THREE.MeshBasicMaterial({ map:xdEyeTexture() });
    const matMouth = new THREE.MeshBasicMaterial({ color:0x8a3b42 });
    const matOrb   = new THREE.MeshBasicMaterial({ color:0xe4f78a });
    const matGem   = new THREE.MeshBasicMaterial({ color:0xffe27a });
    const matCollar= new THREE.MeshStandardMaterial({ color:0xb9c4cc, roughness:0.3, metalness:0.85 });

    // 身体
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.155*u, 0.17*u, 6, 14), matBody);
    body.position.y = 0.335*u; g.add(body);
    const belly = new THREE.Mesh(new THREE.SphereGeometry(0.115*u, 14, 12), matCream);
    belly.position.set(0, 0.31*u, 0.075*u); belly.scale.set(1, 1.2, 0.6); g.add(belly);
    // 脚（可交替摆动）
    const footL = new THREE.Group(); footL.position.set(-0.075*u, 0.055*u, 0.01*u); g.add(footL);
    const footR = new THREE.Group(); footR.position.set( 0.075*u, 0.055*u, 0.01*u); g.add(footR);
    for(const f of [footL, footR]){
      const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.05*u, 0.06*u, 4, 10), matBodyD);
      m.position.z = 0.02*u; f.add(m);
    }
    // 手臂（肩部枢轴）
    const armL = new THREE.Group(); armL.position.set(-0.155*u, 0.42*u, 0); g.add(armL);
    const armR = new THREE.Group(); armR.position.set( 0.155*u, 0.42*u, 0); g.add(armR);
    for(const [a, s] of [[armL, 1], [armR, -1]]){
      const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.042*u, 0.11*u, 4, 10), matBodyD);
      m.position.y = -0.08*u; a.add(m); a.rotation.z = s*0.25;
    }
    // 尾巴（根部枢轴 + 绒球）
    const tail = new THREE.Group(); tail.position.set(0, 0.24*u, -0.14*u); g.add(tail);
    const tailM = new THREE.Mesh(new THREE.CapsuleGeometry(0.032*u, 0.12*u, 4, 8), matBodyD);
    tailM.position.set(0, 0.05*u, -0.06*u); tailM.rotation.x = 0.85; tail.add(tailM);
    const pom = new THREE.Mesh(new THREE.SphereGeometry(0.06*u, 10, 8), matCream);
    pom.position.set(0, 0.11*u, -0.13*u); tail.add(pom);
    // 头
    const head = new THREE.Group(); head.position.y = 0.62*u; g.add(head);
    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.21*u, 20, 16), matBody);
    skull.scale.set(1.06, 0.94, 0.96); head.add(skull);
    const face = new THREE.Mesh(new THREE.SphereGeometry(0.17*u, 16, 12), matCream);
    face.position.set(0, -0.03*u, 0.075*u); face.scale.set(0.95, 0.78, 0.55); head.add(face);
    // 星空大眼
    const eyeGeo = new THREE.SphereGeometry(0.06*u, 14, 10);
    const eyeL = new THREE.Group(); eyeL.position.set(-0.085*u, 0.02*u, 0.145*u); head.add(eyeL);
    const eyeR = new THREE.Group(); eyeR.position.set( 0.085*u, 0.02*u, 0.145*u); head.add(eyeR);
    for(const e of [eyeL, eyeR]){
      const m = new THREE.Mesh(eyeGeo, matEye); m.scale.set(1, 1.3, 0.45); e.add(m);
    }
    // 腮红 + 嘴
    for(const s of [-1, 1]){
      const bl = new THREE.Mesh(new THREE.SphereGeometry(0.028*u, 8, 6),
        new THREE.MeshBasicMaterial({ color:0xf7a8b8, transparent:true, opacity:0.7 }));
      bl.position.set(s*0.125*u, -0.045*u, 0.12*u); bl.scale.set(1, 0.7, 0.4); head.add(bl);
    }
    const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.038*u, 0.009*u, 6, 14, Math.PI), matMouth);
    mouth.position.set(0, -0.075*u, 0.16*u); mouth.rotation.z = Math.PI; head.add(mouth);
    // 柔软大耳（两侧下垂）
    const earGeo = new THREE.SphereGeometry(0.11*u, 12, 10);
    const earL = new THREE.Group(); earL.position.set(-0.2*u, 0.06*u, -0.01*u); head.add(earL);
    const earR = new THREE.Group(); earR.position.set( 0.2*u, 0.06*u, -0.01*u); head.add(earR);
    for(const [e, s] of [[earL, 1], [earR, -1]]){
      const m = new THREE.Mesh(earGeo, matBodyD);
      m.scale.set(0.55, 1.25, 0.4); m.position.set(s*-0.04*u, -0.11*u, 0);
      e.add(m); e.rotation.z = s*0.5;
      const inner = new THREE.Mesh(new THREE.SphereGeometry(0.07*u, 10, 8), matCream);
      inner.scale.set(0.5, 1.1, 0.3); inner.position.set(s*-0.03*u, -0.1*u, 0.03*u); e.add(inner);
    }
    // 能量星球触角 ×2
    const mkAnt = side=>{
      const p = new THREE.Group(); p.position.set(side*0.075*u, 0.17*u, 0);
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.013*u, 0.016*u, 0.17*u, 6), matBodyD);
      stem.position.y = 0.085*u; p.add(stem);
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.042*u, 12, 10), matOrb);
      orb.position.y = 0.19*u; p.add(orb);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.06*u, 0.007*u, 6, 18).rotateX(Math.PI/2.4), matGem);
      ring.position.y = 0.19*u; p.add(ring);
      p.rotation.z = side*-0.3; head.add(p); return p;
    };
    const antL = mkAnt(-1), antR = mkAnt(1);
    addGlow(head, new THREE.Vector3(-0.1*u, 0.22*u, 0), 0xe4f78a, 0.5*u);
    addGlow(head, new THREE.Vector3( 0.1*u, 0.22*u, 0), 0xe4f78a, 0.5*u);
    // 发光星形项圈
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.135*u, 0.02*u, 8, 22).rotateX(Math.PI/2), matCollar);
    collar.position.y = 0.49*u; g.add(collar);
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.032*u), matGem);
    gem.position.set(0, 0.47*u, 0.135*u); g.add(gem);
    addGlow(g, new THREE.Vector3(0, 0.47*u, 0.15*u), 0xffe27a, 0.4*u);

    this.proxy = g;
    // 自动 Ground Alignment：包围盒底面对齐根原点——出生即双脚站地，不埋地、不漂浮
    const pbox = new THREE.Box3().setFromObject(g);   // g 尚未挂父级：局部即世界
    if(isFinite(pbox.min.y)) this.inner.position.y = -pbox.min.y;
    this.inner.add(g);
    this.parts = { body, head, eyeL, eyeR, armL, armR, footL, footR, tail, antL, antR, earL, earR, mouth };
  }

  /* 正式资源接入：存在 assets/characters/xingda.glb 时自动替换代理，上层零改动 */
  async _tryLoadGLB(){
    try{
      const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
      new GLTFLoader().load(ASSETS.xingdaModel, gltf=>{
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const h = (box.max.y - box.min.y) || 1;
        const s = this.heightTarget / h;
        model.scale.setScalar(s);
        model.position.y = -box.min.y * s;          // Ground Alignment：脚底对齐根原点
        model.rotation.x = 0; model.rotation.z = 0; // 旋转修正：X/Z 恒 0，只允许 Y 轴朝向
        this.proxy.visible = false;
        this.inner.position.y = 0;                  // GLB 已自带落地对齐，取消代理脚补
        this.inner.add(model);
        this.glb = model; this.glbReady = true;
        if(gltf.animations && gltf.animations.length){
          this.mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach(c=>{
            const n = c.name.toLowerCase();
            if(/idle|stand|待机/.test(n)) this.actions.idle = this.mixer.clipAction(c);
            else if(/walk|行走/.test(n))   this.actions.walk = this.mixer.clipAction(c);
            else if(/run|奔跑|跑/.test(n)) this.actions.run  = this.mixer.clipAction(c);
            else if(/jump|跳/.test(n))     this.actions.jump = this.mixer.clipAction(c);
          });
          if(!this.actions.idle) this.actions.idle = this.mixer.clipAction(gltf.animations[0]);
          this._curAction = this.actions.idle; this._curAction.play();
        }
      }, undefined, ()=>{ /* GLB 不存在：静默保持 TEMP 代理，不报错不崩溃 */ });
    }catch(e){ /* GLTFLoader 不可用：保持 TEMP 代理 */ }
  }

  setPosition(v){ this.group.position.copy(v); }
  setYaw(y){ this._modelYaw = y; this.group.rotation.set(0, y, 0); }   // 旋转修正：X/Z 恒 0，身体永远垂直，只允许 Y 轴控制方向
  setQuaternion(q){ this.group.quaternion.copy(q); }
  setVisible(b){ this.group.visible = b; }
  attachTo(sc){ sc.add(this.group); }
  detach(){ if(this.group.parent) this.group.parent.remove(this.group); }

  setState(s){
    if(this.state === s) return;
    this.state = s;
    if(this.glbReady && this.mixer){
      const next = this.actions[s] || this.actions.idle;
      if(next && next !== this._curAction){
        next.reset().fadeIn(0.18).play();
        if(this._curAction) this._curAction.fadeOut(0.18);
        this._curAction = next;
      }
    }
  }

  update(dt, speed=0){
    this._t += dt;
    if(this.mixer) this.mixer.update(dt);
    if(this.glbReady || !this.proxy) return;
    const P = this.parts, tt = this._t, u = this.heightTarget/0.95;
    const moving = this.state==='walk' || this.state==='run';
    // 脚步相位：有速度信息时随位移同步（走多快摆多快）；否则按状态用匹配步频（球面探索等无速度场景）
    this._stepPhase += (speed > 0 ? speed * 2.4 : (this.state==='run' ? 18 : 10)) * dt;
    const ph = this._stepPhase;
    const amp = this.state==='run' ? 0.6 : 0.38;
    const sw = moving ? Math.sin(ph) : 0;
    // 呼吸 + 步伐起伏
    P.body.scale.y = 1 + Math.sin(tt*2.4)*0.03;
    this.proxy.position.y = moving ? Math.abs(Math.cos(ph))*0.05*u : 0;
    // 四肢（随脚步相位摆动）
    P.armL.rotation.x = sw*amp; P.armR.rotation.x = -sw*amp;
    P.footL.position.y = (0.055 + Math.max(0, sw)*0.06)*u;
    P.footR.position.y = (0.055 + Math.max(0,-sw)*0.06)*u;
    if(this.state==='jump'){
      P.armL.rotation.z = 0.9; P.armR.rotation.z = -0.9;
      P.footL.position.y = P.footR.position.y = 0.12*u;
    } else { P.armL.rotation.z = 0.25 + Math.sin(tt*1.8)*0.05; P.armR.rotation.z = -0.25 - Math.sin(tt*1.8)*0.05; }
    // 尾巴 / 触角 / 耳朵
    P.tail.rotation.y = Math.sin(tt*(moving?8:3.2))*0.4;
    P.antL.rotation.x = Math.sin(tt*1.7)*0.12; P.antR.rotation.x = Math.sin(tt*1.7+1.3)*0.12;
    P.earL.rotation.x = Math.sin(tt*2.1)*0.08; P.earR.rotation.x = Math.sin(tt*2.1+0.9)*0.08;
    // 眨眼
    this._blink -= dt;
    if(this._blink <= 0){ this._blinkPhase = 0.16; this._blink = 2 + Math.random()*3.5; }
    let eyeSY = 1;
    if(this._blinkPhase > 0){ this._blinkPhase -= dt; eyeSY = 1 - 0.9*Math.max(0, 1-Math.abs(this._blinkPhase-0.08)/0.08); }
    P.eyeL.scale.y = eyeSY; P.eyeR.scale.y = eyeSY;
    // 头部与身体：移动时平稳+重心侧摆；待机时环境观察（左右张望，不做雕像）
    if(moving){
      P.head.rotation.y = Math.sin(tt*0.6)*0.05;
      P.head.rotation.x = Math.sin(tt*0.9)*0.03;
      this.proxy.rotation.y = 0;
      this.proxy.rotation.z = Math.sin(ph)*0.03;                 // 行走重心轻微侧摆
    } else {
      const lt = tt*0.32;
      P.head.rotation.y = (Math.sin(lt) + Math.sin(lt*0.43+1.3)*0.7) * 0.4;  // 周期性张望
      P.head.rotation.x = 0.04 + Math.sin(tt*0.5)*0.05;
      this.proxy.rotation.y = Math.sin(lt*0.6)*0.08;             // 身体随观察微转
      this.proxy.rotation.z = Math.sin(tt*0.8)*0.02;             // 待机重心轻摇
    }
  }

  dispose(){
    this.detach();
    this.group.traverse(o=>{
      if(o.geometry) o.geometry.dispose();
      if(o.material){ (Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{ if(m.map) m.map.dispose(); m.dispose(); }); }
    });
  }
}

export { XingdaAvatarAdapter };
