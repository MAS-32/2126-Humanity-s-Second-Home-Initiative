// ============================================================
// MoonTransit — LUNAR TRANSIT LOOP
// 高架磁悬浮环线 + 四站 + 自动列车（到站停靠/开门/等待/离站/循环）
// 玩家可登车、选目的地、真实乘车（禁瞬移），SPACE 跳过行程。
// 轨道系统默认离线，由主线 01 ACTIVATE CITY 启动。
// ============================================================
import * as THREE from 'three';
import { cyl, box, sph, torus, signBoard, enableShadows } from './MoonBuilders.js';
import { STATIONS, TRANSIT_WAYPOINTS } from './MoonConfig.js';

const TRACK_H = 4.2;        // 轨面离地
const CRUISE = 17;          // 巡航速度 m/s
const ACCEL = 7;
const DWELL = 5.0;          // 停站秒数
const CAR_GAP = 6.6;

export function buildTransit(ctx) {
  const { scene, heightAt, palette, updatables } = ctx;
  const { mats } = palette;
  const g = new THREE.Group();

  // ---------- 闭合环线路径（贴地形 + 高架） ----------
  const pts = TRANSIT_WAYPOINTS.map(([x, z]) => new THREE.Vector3(x, heightAt(x, z) + TRACK_H, z));
  const curve = new THREE.CatmullRomCurve3(pts, true, 'centripetal', 0.6);
  const LEN = curve.getLength();

  // ---------- 钢轨 ×2 + 横枕 + 支柱 ----------
  const N = 560;
  const railPtsL = [], railPtsR = [];
  for (let i = 0; i < N; i++) {
    const u = i / N;
    const p = curve.getPointAt(u);
    const t = curve.getTangentAt(u);
    const nx = t.z, nz = -t.x; // 水平法线
    const nl = Math.hypot(nx, nz) || 1;
    railPtsL.push(new THREE.Vector3(p.x + nx / nl * 0.85, p.y, p.z + nz / nl * 0.85));
    railPtsR.push(new THREE.Vector3(p.x - nx / nl * 0.85, p.y, p.z - nz / nl * 0.85));
  }
  for (const rp of [railPtsL, railPtsR]) {
    const rc = new THREE.CatmullRomCurve3(rp, true);
    const rail = new THREE.Mesh(new THREE.TubeGeometry(rc, 480, 0.08, 6, true), mats.metal);
    g.add(rail);
  }
  // 导向磁轨（青色，克制的能源 accent）
  const guide = new THREE.Mesh(new THREE.TubeGeometry(curve, 480, 0.05, 6, true), mats.energySoft);
  guide.position.y = 0.18;
  g.add(guide);

  // 横枕（InstancedMesh）
  const tieCount = Math.floor(LEN / 3.4);
  const ties = new THREE.InstancedMesh(new THREE.BoxGeometry(2.1, 0.1, 0.42), mats.dark, tieCount);
  {
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0);
    const p = new THREE.Vector3(), t = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
    const m3 = new THREE.Matrix4();
    for (let i = 0; i < tieCount; i++) {
      const u = i / tieCount;
      curve.getPointAt(u, p);
      curve.getTangentAt(u, t);
      m3.lookAt(new THREE.Vector3(), t, up);
      q.setFromRotationMatrix(m3);
      m4.compose(new THREE.Vector3(p.x, p.y - 0.12, p.z), q, s);
      ties.setMatrixAt(i, m4);
    }
  }
  g.add(ties);

  // 支柱（InstancedMesh，避开车站附近）
  const stationXZ = STATIONS.map(s => [s.track.x, s.track.z]);
  const pylonSpots = [];
  const pylonEvery = Math.floor(LEN / 13);
  for (let i = 0; i < pylonEvery; i++) {
    const u = i / pylonEvery;
    const p = curve.getPointAt(u);
    if (stationXZ.some(([sx, sz]) => Math.hypot(p.x - sx, p.z - sz) < 9)) continue;
    pylonSpots.push(p);
  }
  const pylons = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.16, 0.3, 1, 8), mats.dark, pylonSpots.length);
  {
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3();
    pylonSpots.forEach((p, i) => {
      const gy = heightAt(p.x, p.z);
      const h = p.y - 0.2 - gy;
      s.set(1, h, 1);
      m4.compose(new THREE.Vector3(p.x, gy + h / 2, p.z), q, s);
      pylons.setMatrixAt(i, m4);
    });
  }
  g.add(pylons);

  // ---------- 局部透明加压段（hub 站前 + port 站前） ----------
  const stationU = findStationUs(curve);
  const glassSeg = (u0, u1) => {
    const sp = [];
    for (let i = 0; i <= 8; i++) sp.push(curve.getPointAt(u0 + (u1 - u0) * i / 8));
    const sc = new THREE.CatmullRomCurve3(sp, false);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(sc, 32, 1.7, 10, false), mats.glass);
    g.add(tube);
    // 加压段端环
    for (const u of [u0, u1]) {
      const p = curve.getPointAt(u);
      const t = curve.getTangentAt(u);
      const ring = torus(1.75, 0.12, mats.metal);
      ring.position.copy(p);
      ring.lookAt(p.clone().add(t));
      ring.rotateY(Math.PI / 2);
      g.add(ring);
    }
  };
  glassSeg((stationU[0] + 0.004) % 1, (stationU[0] + 0.028) % 1);
  glassSeg((stationU[3] + 1 - 0.028) % 1, (stationU[3] + 1 - 0.004) % 1);

  // ---------- 四站台 ----------
  for (let i = 0; i < STATIONS.length; i++) {
    const st = STATIONS[i];
    const [px, pz] = [st.platform.x, st.platform.z];
    const gy = heightAt(px, pz);
    const stG = new THREE.Group();
    stG.position.set(px, gy, pz);
    const plat = cyl(4.6, 7.2, 3.0, mats.concrete, 28); plat.position.y = 1.5; stG.add(plat);
    const platTop = cyl(4.6, 4.6, 0.16, mats.white2, 28); platTop.position.y = 3.06; stG.add(platTop);
    const edgeRing = torus(4.62, 0.07, mats.energySoft); edgeRing.rotation.x = Math.PI / 2; edgeRing.position.y = 3.16; stG.add(edgeRing);
    // 四柱 + 顶棚
    for (const [ox, oz] of [[-2.8, -2.2], [2.8, -2.2], [-2.8, 2.2], [2.8, 2.2]]) {
      const post = box(0.32, 3.4, 0.32, mats.dark);
      post.position.set(ox, 3.0 + 1.7, oz);
      stG.add(post);
    }
    const roof = box(6.8, 0.24, 5.6, mats.white);
    roof.position.y = 6.6;
    stG.add(roof);
    const roofStrip = box(6.84, 0.08, 0.5, mats.energySoft);
    roofStrip.position.y = 6.5;
    stG.add(roofStrip);
    // 站牌
    const sign = signBoard(st.cn + ' · ' + st.name, mats, 6.4, 1.1);
    sign.position.set(0, 5.2, 2.86);
    stG.add(sign);
    // 候车灯（离线暗 / 在线亮）
    const lamp = sph(0.18, mats.energy.clone(), 8, 6);
    lamp.position.set(0, 6.3, 2.6);
    stG.add(lamp);
    st.userData = { lamp, signMat: sign };
    g.add(stG);
  }

  // ---------- 列车（3 节编组，单一 Group 沿切向行进） ----------
  const train = new THREE.Group();
  const doors = [];
  for (let c = 0; c < 3; c++) {
    const car = new THREE.Group();
    const body = box(5.8, 2.1, 2.4, mats.white); body.position.y = 1.35; car.add(body);
    const band = box(5.84, 0.7, 2.44, mats.windowBand(5)); band.position.y = 1.6; car.add(band);
    const skirt = box(5.84, 0.16, 2.44, mats.energySoft); skirt.position.y = 0.42; car.add(skirt);
    const nose = sph(1.2, mats.white2, 14, 10); nose.scale.set(1.4, 0.85, 1); nose.position.set(2.9, 1.3, 0); car.add(nose);
    // 双侧滑门
    for (const sx of [-1, 1]) {
      for (const sz of [-0.6, 0.6]) {
        const door = box(0.08, 1.5, 1.1, mats.white2);
        door.position.set(sx * 1.22, 1.2, sz);
        car.add(door);
        doors.push({ door, sz });
      }
    }
    car.position.x = -c * CAR_GAP;
    train.add(car);
  }
  g.add(train);

  // ---------- 列车运行状态机 ----------
  const T = {
    online: false,
    u: stationU[0],
    speed: 0,
    mode: 'dwell',          // dwell | run
    dwellT: 999,            // 离线时一直停着
    stationIdx: 0,          // 当前/上一站
    doorT: 0,               // 0 关 → 1 开
    rideDest: -1,           // 玩家乘车目的地（-1 = 未乘车）
    holdIdx: -1,            // 玩家正在候车的站台（列车持续等候）
    callIdx: -1,            // 玩家呼叫的目的站台（优先进站 + 延长停站）
  };
  const nextIdx = (i) => (i + 1) % STATIONS.length;
  const uDist = (from, to) => ((to - from) % 1 + 1) % 1;   // 沿环线向前的弧距（0-1）

  function findStationUs(c) {
    const SAMPLES = 4000;
    return STATIONS.map(st => {
      let best = 0, bd = Infinity;
      for (let i = 0; i < SAMPLES; i++) {
        const u = i / SAMPLES;
        const p = c.getPointAt(u);
        const d = Math.hypot(p.x - st.track.x, p.z - st.track.z);
        if (d < bd) { bd = d; best = u; }
      }
      return best;
    });
  }

  function placeTrain() {
    const p = curve.getPointAt(T.u);
    const t = curve.getTangentAt(T.u);
    train.position.copy(p);
    const yaw = Math.atan2(t.x, t.z) - Math.PI / 2; // 车体本地 +x 为车头
    train.rotation.set(0, yaw, 0);
  }

  function arrive() {
    T.mode = 'dwell';
    T.dwellT = DWELL;
    T.stationIdx = nextIdx(T.stationIdx);
    T.speed = 0;
  }

  updatables.push((dt, t) => {
    // 门动画
    const doorTarget = (T.mode === 'dwell' && T.online) ? 1 : 0;
    T.doorT += (doorTarget - T.doorT) * Math.min(1, dt * 4);
    for (const { door, sz } of doors) door.position.z = sz + Math.sign(sz) * T.doorT * 0.85;

    if (!T.online) { placeTrain(); return; }

    if (T.mode === 'dwell') {
      // 玩家在本站候车且未乘车 → 列车持续等候（足够时间登车）
      if (T.holdIdx === T.stationIdx && T.rideDest < 0) T.dwellT = Math.max(T.dwellT, 2.2);
      T.dwellT -= dt;
      const leaving = T.rideDest >= 0 ? T.dwellT < 1.2 : T.dwellT <= 0;
      if (leaving) {
        T.mode = 'run';
        T.speed = 0.1;
      }
    } else {
      // 目标站：乘车时为目的地；被呼叫时优先进呼叫站；否则顺序下一站
      const targetIdx = T.rideDest >= 0 ? T.rideDest : (T.callIdx >= 0 ? T.callIdx : nextIdx(T.stationIdx));
      const dist = uDist(T.u, stationU[targetIdx]) * LEN;
      const brake = (T.speed * T.speed) / (2 * ACCEL) + 3;
      if (dist < brake) T.speed = Math.max(2.0, T.speed - ACCEL * dt);
      else T.speed = Math.min(CRUISE, T.speed + ACCEL * dt);
      T.u = (T.u + T.speed * dt / LEN) % 1;
      if (dist < 3.0) {
        T.u = stationU[targetIdx];
        if (T.rideDest === targetIdx) { T.mode = 'dwell'; T.dwellT = 999; T.stationIdx = targetIdx; T.speed = 0; }
        else if (T.callIdx === targetIdx) { T.callIdx = -1; T.mode = 'dwell'; T.dwellT = 9; T.stationIdx = targetIdx; T.speed = 0; }  // 呼叫到站：延长停站
        else arrive();
      }
    }
    placeTrain();
  });

  enableShadows(g);
  scene.add(g);

  // ---------- 对外 API ----------
  return {
    group: g, curve, stations: STATIONS, stationU,
    isOnline: () => T.online,
    setOnline() {
      if (T.online) return;
      T.online = true;
      T.mode = 'dwell'; T.dwellT = 2.0;   // 激活后短暂开门，随后首班车离站
      for (const st of STATIONS) st.userData.lamp.material.emissiveIntensity = 1.6;
    },
    isDwellingAt: (idx) => T.mode === 'dwell' && T.stationIdx === idx && T.online,
    // 候车保持：玩家在某站台时列车持续等候（idx=-1 取消）
    setHold(idx) { T.holdIdx = idx; },
    // 呼叫列车：在线且未在本站时，优先进 idx 站并延长停站
    call(idx) {
      if (!T.online) return false;
      if (T.mode === 'dwell' && T.stationIdx === idx) return true;   // 已在站内
      T.callIdx = idx;
      if (T.mode === 'dwell') { T.mode = 'run'; T.speed = 0.1; }      // 立即离站前往
      return true;
    },
    isCalled: (idx) => T.callIdx === idx,
    // 乘客模式
    board(destIdx) { T.rideDest = destIdx; if (T.mode === 'dwell') T.dwellT = Math.min(T.dwellT, 1.0); },
    arrivedAtDest: () => T.rideDest >= 0 && T.mode === 'dwell' && T.stationIdx === T.rideDest && T.dwellT > 100,
    endRide() { T.rideDest = -1; T.dwellT = DWELL; },
    skipRide() {
      if (T.rideDest < 0) return;
      T.u = stationU[T.rideDest];
      T.mode = 'dwell'; T.dwellT = 999; T.stationIdx = T.rideDest; T.speed = 0;
      placeTrain();
    },
    seatWorld(out) {
      return train.localToWorld(out.set(0.9, 1.55, 0.4));
    },
    debugState: () => ({ ...T, u: T.u.toFixed(4) }),
  };
}
