// ============================================================
// 可达性 / 空气墙自动化测试
// 复刻 heightAt（与 MoonTerrain 一致），用 MoonColliders 做 BFS，
// 从出生点出发，验证：四区连通、所有交互点/车站/设施可达、无穿模。
// 运行：node walk.test.mjs
// ============================================================
import { buildCollisionWorld } from '../js/MoonColliders.js';
import { ZONES, FLAT_PADS, CRATERS, STATIONS, INTERACT_POINTS, STORY_POINTS } from '../js/MoonConfig.js';
import { SimplexNoise } from './SimplexNoise.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const simplex = new SimplexNoise();
const flats = [...Object.values(ZONES), ...FLAT_PADS];

function heightAt(x, z) {
  const rc = Math.hypot(x, z);
  const wild = clamp((rc - 40) / 150, 0.2, 1);
  let h = 0;
  h += simplex.noise3d(x * 0.008, z * 0.008, 0.0) * 10.0;
  h += simplex.noise3d(x * 0.030, z * 0.030, 5.0) * 2.8;
  h += simplex.noise3d(x * 0.085, z * 0.085, 9.0) * 0.8;
  h *= wild;
  let flat = 1;
  for (const f of flats) { const d = Math.hypot(x - f.x, z - f.z); flat *= clamp((d - f.r * 0.55) / (f.r * 0.8), 0, 1); }
  h *= flat;
  for (const c of CRATERS) {
    const d = Math.hypot(x - c.x, z - c.z);
    if (d < c.r) { const t = d / c.r; h -= c.depth * (Math.cos(t * Math.PI) + 1) * 0.5; }
    if (d > c.r * 0.7 && d < c.r * 1.35) { const t = (d - c.r) / (c.r * 0.35); h += c.depth * 0.28 * Math.exp(-t * t * 2.2); }
  }
  return h;
}

const col = buildCollisionWorld(heightAt);

// ---- BFS 网格 ----
const X0 = -190, X1 = 190, Z0 = -210, Z1 = 130, RES = 1.0, STEP = 2.4;
const W = Math.round((X1 - X0) / RES), H = Math.round((Z1 - Z0) / RES);
const gx = i => X0 + i * RES, gz = j => Z0 + j * RES, idx = (i, j) => j * W + i;
const groundG = new Float64Array(W * H);
for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) groundG[idx(i, j)] = col.ground(gx(i), gz(j));

const visited = new Uint8Array(W * H);
const start = { x: 0, z: 46 };
const si = Math.round((start.x - X0) / RES), sj = Math.round((start.z - Z0) / RES);
if (col.collides(start.x, start.z, groundG[idx(si, sj)])) console.log('!! 出生点被埋');
visited[idx(si, sj)] = 1;
const queue = [idx(si, sj)];
let reach = 0;
while (queue.length) {
  const cur = queue.pop(); reach++;
  const ci = cur % W, cj = (cur - ci) / W, footA = groundG[cur];
  for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const ni = ci + di, nj = cj + dj;
    if (ni < 0 || nj < 0 || ni >= W || nj >= H) continue;
    const n = idx(ni, nj);
    if (visited[n]) continue;
    const footB = groundG[n];
    if (footB - footA > STEP) continue;
    if (col.collides(gx(ni), gz(nj), footA)) continue;
    visited[n] = 1; queue.push(n);
  }
}

// 点周围最近可达距离（-1 = 不可达）
function nearestReach(x, z, maxR = 10) {
  for (let r = 0; r <= maxR; r += 1) {
    const steps = Math.max(8, Math.round(r * 6));
    for (let k = 0; k < steps; k++) {
      const a = (k / steps) * Math.PI * 2;
      const px = x + Math.cos(a) * r, pz = z + Math.sin(a) * r;
      const i = Math.round((px - X0) / RES), j = Math.round((pz - Z0) / RES);
      if (i < 0 || j < 0 || i >= W || j >= H) continue;
      if (visited[idx(i, j)]) return r;
    }
  }
  return -1;
}
// 点本身是否被碰撞体埋住
function buried(x, z) { return col.collides(x, z, col.ground(x, z)); }

console.log(`可达格子: ${reach} / ${W * H} (${(100 * reach / (W * H)).toFixed(1)}%)`);
console.log('--- 主交互点（<10m 内可达即 OK，*=被埋） ---');
for (const p of INTERACT_POINTS) {
  const r = nearestReach(p.pos.x, p.pos.z);
  console.log(`  ${p.id.padEnd(9)} (${p.pos.x},${p.pos.z}) 可达半径=${r === -1 ? 'FAIL' : r + 'm'}${buried(p.pos.x, p.pos.z) ? ' *埋' : ''}`);
}
console.log('--- 剧情子节点 ---');
for (const p of STORY_POINTS) {
  const r = nearestReach(p.pos.x, p.pos.z);
  console.log(`  ${p.id.padEnd(13)} (${p.pos.x},${p.pos.z}) 可达半径=${r === -1 ? 'FAIL' : r + 'm'}${buried(p.pos.x, p.pos.z) ? ' *埋' : ''}`);
}
console.log('--- 车站站台 ---');
for (const s of STATIONS) {
  const r = nearestReach(s.platform.x, s.platform.z);
  console.log(`  ${s.id.padEnd(9)} (${s.platform.x},${s.platform.z}) 可达半径=${r === -1 ? 'FAIL' : r + 'm'}`);
}
console.log('--- 区域中心连通 ---');
for (const [k, z] of Object.entries(ZONES)) {
  const r = nearestReach(z.x, z.z);
  console.log(`  ${k.padEnd(9)} (${z.x},${z.z}) 可达半径=${r === -1 ? 'FAIL' : r + 'm'}`);
}
console.log('--- 城市设施 ---');
const FAC = [
  ['太阳能A', 80, 54], ['太阳能B', -84, 50], ['后勤区', 34, -96], ['通讯A', 96, -12],
  ['通讯B', -96, -86], ['水处理', 64, -46], ['氧气厂', -64, -40], ['资源场', 150, -110],
  ['能源站A', 72, 14], ['能源站B', -58, 12],
];
for (const [n, x, z] of FAC) {
  const r = nearestReach(x, z);
  console.log(`  ${n.padEnd(6)} (${x},${z}) 可达半径=${r === -1 ? 'FAIL' : r + 'm'}`);
}
