/* PlayerController
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L3355-3483，模块化拆分后保持行为等价。
 */
import * as THREE from 'three';
import { camera } from '../core/renderer.js';
import { keys } from '../interaction/explore-state.js';

/* ---------- PlayerController：只管位置/旋转/移动/碰撞/状态，不碰任何模型 ---------- */
class PlayerController {
  constructor(avatar){
    this.avatar = avatar;                       // AvatarAdapter，可任意替换
    this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    this.yaw = 0; this.pitch = 0.16;
    this.vy = 0; this.jumpY = 0;
    this.third = true;
    this.dist = 5.4;
    this.eyeH = avatar.height * 0.88;
    this._f = new THREE.Vector3(); this._r = new THREE.Vector3(); this._m = new THREE.Vector3();
    this._head = new THREE.Vector3(); this._look = new THREE.Vector3(); this._dir = new THREE.Vector3();
    this._camD = null; this._modelYaw = 0;
    this._camYaw = 0; this._camPitch = 0.16;     // 相机朝向（阻尼平滑用）
    this.clickTarget = new THREE.Vector3();      // 点击地面移动目标（最终目标，持续保存）
    this.hasClickTarget = false;
    this._waypoint = new THREE.Vector3();        // 绕行碰撞体时的临时目标
    this._hasWaypoint = false;
    // 自然旋转系统：静止后的观察/互动转身（只写 _modelYaw → Y 轴，X/Z 恒 0）
    this._idleT = 0;                             // 连续静止时长
    this._faceCam = false;                       // 是否正在缓动转向镜头
    this._camPos = new THREE.Vector3();          // 最近一帧相机位置（updateCamera 记录）
    this._hasCamPos = false;
  }
  teleport(x, z, yaw=0){
    this.pos.set(x, 0, z); this.vel.set(0,0,0);
    this.yaw = yaw; this.vy = 0; this.jumpY = 0; this._camD = null; this._modelYaw = yaw;
    this._camYaw = yaw;
    this.hasClickTarget = false;
    this._hasWaypoint = false;
    this._idleT = 0; this._faceCam = false;
  }
  /* 点击地面移动：设置/取消目标。PlayerController 内部平滑趋近，朝向随速度自动对准目标 */
  setClickTarget(x, z, colliders=null, bound=0){
    this.clickTarget.set(x, 0, z);
    if(colliders) this._pushOutOfColliders(this.clickTarget, colliders, 0.82);
    if(bound > 0){
      const b = Math.max(1, bound - 0.6), r = Math.hypot(this.clickTarget.x, this.clickTarget.z);
      if(r > b){ this.clickTarget.x *= b/r; this.clickTarget.z *= b/r; }
    }
    this.hasClickTarget = true;
    this._hasWaypoint = false;
  }
  clearClickTarget(){ this.hasClickTarget = false; this._hasWaypoint = false; }
  _pushOutOfColliders(v, colliders, margin){
    for(const c of colliders){
      const rr = c.r + margin, dx = v.x - c.x, dz = v.z - c.z, d2 = dx*dx + dz*dz;
      if(d2 >= rr*rr) continue;
      const d = Math.sqrt(d2);
      if(d > 1e-4){ v.x = c.x + dx/d*rr; v.z = c.z + dz/d*rr; }
      else { v.x = c.x + rr; v.z = c.z; }
    }
  }
  _segmentBlocker(x1, z1, x2, z2, colliders){
    const dx = x2 - x1, dz = z2 - z1, lenSq = dx*dx + dz*dz;
    if(lenSq < 1e-6) return null;
    let hit = null, bestT = Infinity;
    for(const c of colliders){
      const rr = c.r + 0.58;
      let t = ((c.x-x1)*dx + (c.z-z1)*dz) / lenSq;
      t = Math.max(0, Math.min(1, t));
      const px = x1 + dx*t, pz = z1 + dz*t;
      const ox = c.x - px, oz = c.z - pz;
      if(ox*ox + oz*oz < rr*rr && t > 0.01 && t < 0.99 && t < bestT){ hit = c; bestT = t; }
    }
    return hit;
  }
  _planWaypoint(colliders){
    const blocker = this._segmentBlocker(this.pos.x, this.pos.z, this.clickTarget.x, this.clickTarget.z, colliders);
    if(!blocker){ this._hasWaypoint = false; return; }
    const rr = blocker.r + 0.76;
    const ox = this.pos.x - blocker.x, oz = this.pos.z - blocker.z;
    const d = Math.hypot(ox, oz);
    if(d < rr + 0.05){
      const a = d > 1e-4 ? Math.atan2(oz, ox) : 0;
      this._waypoint.set(blocker.x + Math.cos(a)*(rr+0.4), 0, blocker.z + Math.sin(a)*(rr+0.4));
    } else {
      const base = Math.atan2(oz, ox), alpha = Math.acos(Math.min(1, rr/d));
      const a1 = base + alpha, a2 = base - alpha;
      const x1 = blocker.x + Math.cos(a1)*rr, z1 = blocker.z + Math.sin(a1)*rr;
      const x2 = blocker.x + Math.cos(a2)*rr, z2 = blocker.z + Math.sin(a2)*rr;
      const s1 = Math.hypot(x1-this.pos.x, z1-this.pos.z) + Math.hypot(this.clickTarget.x-x1, this.clickTarget.z-z1);
      const s2 = Math.hypot(x2-this.pos.x, z2-this.pos.z) + Math.hypot(this.clickTarget.x-x2, this.clickTarget.z-z2);
      this._waypoint.set(s1 <= s2 ? x1 : x2, 0, s1 <= s2 ? z1 : z2);
    }
    this._pushOutOfColliders(this._waypoint, colliders, 0.72);
    this._hasWaypoint = true;
  }
  jump(){ if(this.jumpY === 0 && this.vy === 0) this.vy = 4.4; }

  update(dt, colliders, bound){
    // 输入 → 期望速度（相机相对）
    this._f.set(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    this._r.set(-this._f.z, 0, this._f.x);
    this._m.set(0,0,0);
    if(keys['w']) this._m.add(this._f);
    if(keys['s']) this._m.sub(this._f);
    if(keys['d']) this._m.add(this._r);
    if(keys['a']) this._m.sub(this._r);
    const run = !!keys['shift'];
    let moving = this._m.lengthSq() > 0;
    let clickSlow = 1;
    // 点击移动：最终目标持续保存；遇建筑先走临时 waypoint，键盘接管才取消
    if(!moving && this.hasClickTarget){
      let dx = this.clickTarget.x - this.pos.x, dz = this.clickTarget.z - this.pos.z;
      let dist = Math.hypot(dx, dz);
      if(dist < 0.22){ this.clearClickTarget(); }
      else{
        if(this._hasWaypoint){
          const wDist = Math.hypot(this._waypoint.x-this.pos.x, this._waypoint.z-this.pos.z);
          if(wDist < 0.42 || !this._segmentBlocker(this.pos.x, this.pos.z, this.clickTarget.x, this.clickTarget.z, colliders))
            this._hasWaypoint = false;
        }
        if(!this._hasWaypoint && this._segmentBlocker(this.pos.x, this.pos.z, this.clickTarget.x, this.clickTarget.z, colliders))
          this._planWaypoint(colliders);
        if(this._hasWaypoint){
          dx = this._waypoint.x - this.pos.x; dz = this._waypoint.z - this.pos.z;
          dist = Math.hypot(dx, dz);
          if(dist < 0.32) this._hasWaypoint = false;
        }
        if(this._hasWaypoint || dist >= 0.22){
          this._m.set(dx, 0, dz); moving = true;
          clickSlow = this._hasWaypoint ? 1 : Math.min(1, Math.max(0.28, dist/0.9));
        }
      }
    } else if(moving){
      this.clearClickTarget();                     // 键盘接管，立即取消点击目标
    }
    const target = moving ? this._m.normalize().multiplyScalar((run ? 7.6 : 4.2) * clickSlow) : this._m.set(0,0,0);
    this.vel.lerp(target, Math.min(1, dt*(moving ? 10 : 12)));
    this.pos.addScaledVector(this.vel, dt);
    // 跳跃（火星重力手感）
    if(this.vy !== 0 || this.jumpY > 0){
      this.jumpY += this.vy*dt; this.vy -= 6.8*dt;
      if(this.jumpY <= 0){ this.jumpY = 0; this.vy = 0; }
    }
    // 建筑碰撞（圆柱推挤）
    for(const c of colliders){
      if(this.jumpY > c.h) continue;
      const dx = this.pos.x - c.x, dz = this.pos.z - c.z, rr = c.r + 0.42;
      const d2 = dx*dx + dz*dz;
      if(d2 < rr*rr && d2 > 1e-6){ const d = Math.sqrt(d2), k = (rr-d)/d; this.pos.x += dx*k; this.pos.z += dz*k; }
    }
    // 城市边界
    const rr = Math.hypot(this.pos.x, this.pos.z);
    if(rr > bound){ this.pos.x *= bound/rr; this.pos.z *= bound/rr; }
    // 角色朝向：移动时随速度方向（已有，保持）；静止时进入观察/互动转身
    if(moving){
      const ty = Math.atan2(this.vel.x, this.vel.z);
      let dy = ty - this._modelYaw;
      while(dy > Math.PI) dy -= Math.PI*2; while(dy < -Math.PI) dy += Math.PI*2;
      this._modelYaw += dy * Math.min(1, dt*10);
      this._idleT = 0; this._faceCam = false;
    } else if(this._hasCamPos){
      // 观察/互动旋转：相机在身后或侧后停留片刻 → 星达自然缓动转身面向镜头
      // 缓动 lerp，无瞬间 180°；到位即停，不锁死镜头方向；允许自然背对
      this._idleT += dt;
      const cdx = this._camPos.x - this.pos.x, cdz = this._camPos.z - this.pos.z;
      const camDist = Math.hypot(cdx, cdz);
      if(camDist > 0.6){
        const cy = Math.atan2(cdx, cdz);
        let dy = cy - this._modelYaw;
        while(dy > Math.PI) dy -= Math.PI*2; while(dy < -Math.PI) dy += Math.PI*2;
        if(this._faceCam){
          this._modelYaw += dy * Math.min(1, dt*2.4);          // 慢速缓动转身
          if(Math.abs(dy) < 0.1){ this._faceCam = false; this._idleT = 0; }  // 面向到位即停 + 冷却
        } else {
          const near = camDist < 3.4;                          // 玩家（镜头）贴近 → 互动转身更敏感
          if(this._idleT > (near ? 0.45 : 1.1) && Math.abs(dy) > (near ? 0.55 : 1.05))
            this._faceCam = true;
        }
      }
    }
    // 输出到 AvatarAdapter（不感知模型内部）
    this._m.copy(this.pos); this._m.y += this.jumpY;
    this.avatar.setPosition(this._m);
    this.avatar.setYaw(this.third ? this._modelYaw : this.yaw);
    this.avatar.setState(this.jumpY > 0 ? 'jump' : moving ? (run ? 'run' : 'walk') : 'idle');
    this.avatar.update(dt, this.vel.length());
  }

  /* 第三人称平滑跟随 + 相机防穿墙；第一人称隐藏星达 */
  updateCamera(camera, dt, colliders){
    // 相机朝向阻尼：第三人称平滑跟随鼠标视角，不突然旋转；第一人称即时（防晕）
    const k = this.third ? Math.min(1, dt*10) : 1;
    let dyaw = this.yaw - this._camYaw;
    while(dyaw > Math.PI) dyaw -= Math.PI*2; while(dyaw < -Math.PI) dyaw += Math.PI*2;
    this._camYaw += dyaw * k;
    this._camPitch += (this.pitch - this._camPitch) * k;
    this._head.copy(this.pos);
    this._head.y += (this.third ? 1.15 : this.eyeH) + this.jumpY;
    const cp = Math.cos(this._camPitch), sp = Math.sin(this._camPitch);
    this._dir.set(Math.sin(this._camYaw)*cp, sp, Math.cos(this._camYaw)*cp);
    if(!this.third){
      camera.position.copy(this._head);
      this._look.copy(this._head).addScaledVector(this._dir, 4);
      camera.lookAt(this._look);
      this._camPos.copy(camera.position); this._hasCamPos = true;
      return;
    }
    // 期望臂长，按建筑碰撞收缩
    let d = this.dist;
    const hx = this._head.x, hy = this._head.y, hz = this._head.z;
    const cx = hx - this._dir.x*d, cy = hy - this._dir.y*d, cz = hz - this._dir.z*d;
    const segLen = Math.hypot(cx-hx, cy-hy, cz-hz) || 1;
    for(const c of colliders){
      // 2D 线段-圆相交 + 高度检查
      const dx = (cx-hx)/segLen, dz = (cz-hz)/segLen;
      const ox = hx - c.x, oz = hz - c.z;
      const b = ox*dx + oz*dz, cc = ox*ox + oz*oz - (c.r+0.3)*(c.r+0.3);
      const disc = b*b - cc;
      if(disc <= 0) continue;
      const tHit = -b - Math.sqrt(disc);
      if(tHit < 0 || tHit > segLen) continue;
      const yAt = hy + (cy-hy)*(tHit/segLen);
      if(yAt < c.h + 0.25) d = Math.min(d, Math.max(0.9, tHit - 0.5));
    }
    if(this._camD === null) this._camD = d;
    this._camD += (d - this._camD) * Math.min(1, dt*(d < this._camD ? 14 : 3.5));  // 收缩快、恢复慢
    camera.position.set(
      hx - this._dir.x*this._camD,
      Math.max(0.4, hy - this._dir.y*this._camD + 0.25),
      hz - this._dir.z*this._camD);
    this._look.copy(this._head).addScaledVector(this._dir, 2.4);
    camera.lookAt(this._look);
    this._camPos.copy(camera.position); this._hasCamPos = true;
  }
}

export { PlayerController };
