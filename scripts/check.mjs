// ============================================================
// check.mjs — 语法自检（快速健康检查，CI 可用）
// 用法：node scripts/check.mjs
// ============================================================
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dir, '..');
const SRC = path.join(ROOT, 'src');
const NODE = process.execPath;
let fail = 0;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'shots') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}

for (const f of walk(SRC)) {
  if (!/\.(js|mjs)$/.test(f)) continue;
  try { execSync(`"${NODE}" --input-type=module --check < "${f}"`, { stdio: 'pipe' }); }
  catch { console.error('FAIL', path.relative(ROOT, f)); fail++; }
}
if (fail) { console.error(`[check] ${fail} 个文件语法错误`); process.exit(1); }
console.log('[check] 全部 JS/MJS 语法通过');
