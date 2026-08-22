// ============================================================
// build.mjs — 构建：语法自检 + 同步 src/ → public/（部署根）
// 零依赖：public/ 是 src/ 的干净镜像，保证部署内容与源码一致
// 用法：node scripts/build.mjs
// ============================================================
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dir, '..');
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'public');
const NODE = process.execPath;

function checkJs(file) {
  execSync(`"${NODE}" --input-type=module --check < "${file}"`, { stdio: 'pipe' });
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'shots') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}

console.log('[build] 1/3 语法自检（js 模块 + 内联脚本）…');
const jsFiles = walk(SRC).filter(f => f.endsWith('.js') || f.endsWith('.mjs'));
for (const f of jsFiles) { checkJs(f); console.log('  ok', path.relative(ROOT, f)); }

// moon-base.html / index.html 内联模块脚本自检
for (const html of ['moon-base.html', 'index.html']) {
  const p = path.join(SRC, html);
  if (!fs.existsSync(p)) continue;
  const src = fs.readFileSync(p, 'utf8');
  const m = src.match(/<script type="module">([\s\S]*?)<\/script>/);
  if (m) {
    const tmp = path.join(ROOT, '.build-check.mjs');
    fs.writeFileSync(tmp, m[1]);
    try { checkJs(tmp); console.log('  ok', html, '(inline module)'); }
    finally { fs.rmSync(tmp, { force: true }); }
  }
}

console.log('[build] 2/3 同步 src → public …');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
let n = 0;
for (const f of walk(SRC)) {
  const rel = path.relative(SRC, f);
  const dest = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(f, dest);
  n++;
}

console.log('[build] 3/3 校验产物…');
if (!fs.existsSync(path.join(OUT, 'index.html'))) throw new Error('public/index.html 缺失');
if (!fs.existsSync(path.join(OUT, 'moon-base.html'))) throw new Error('public/moon-base.html 缺失');
console.log(`[build] 完成：public/ 共 ${n} 个文件，可直接部署（npm run preview 本地验证）。`);
