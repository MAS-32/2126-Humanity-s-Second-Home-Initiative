// build-mars — 把 feature/mars 分支(火星文明章节)构建进主工程 public/mars/
// 流程：worktree 检出 → 重置到远端最新 → 打对接补丁 → 构建 → 拷贝产物。
// 补丁是锚点字符串替换(不是行号 diff),上游小改动不会导致打不上;锚点找不到会大声失败。
// 用法：node scripts/build-mars.mjs
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const wt = path.join(root, '.mars-worktree');
const run = (cmd, cwd = root, env) => execSync(cmd, { cwd, stdio: 'inherit', ...(env ? { env } : {}) });

// 1) worktree：不存在则检出,然后强制对齐远端分支(丢弃上次打的补丁,下面重新打)
if (!fs.existsSync(wt)) run('git worktree add --detach .mars-worktree origin/feature/mars');
run('git fetch origin feature/mars');
run('git reset --hard origin/feature/mars', wt);

// 2) 补丁:锚点替换(全局)
const patch = (file, anchor, replacement) => {
  const full = path.join(wt, file);
  const before = fs.readFileSync(full, 'utf8');
  if (before.includes(replacement)) return; // 已打过
  if (!before.includes(anchor)) {
    throw new Error(`build-mars: 补丁锚点未找到(${file})——上游代码可能变了,请检查 ${path.basename(file)} 的补丁`);
  }
  fs.writeFileSync(full, before.split(anchor).join(replacement));
};

// 补丁 1(index.html):注入总工程跨页链接。火星模块用运行时 window.MARS_INTEGRATION_ENV,
// 在模块加载前注入即可,无需构建期环境变量。
patch(
  'index.html',
  '<script type="module" src="/src/main.js"></script>',
  `<script>
  // 2126 总工程托管注入:火星章节的跨页链接(MarsModule.goto 消费)。
  // 全部相对路径——任意子路径部署(GitHub Pages 项目页)同样成立。
  window.MARS_INTEGRATION_ENV = {
    earthUrl: '../?skip-opening',
    moonUrl: '../outpost/moon-base.html',
    hubUrl: '../outpost/solar-hub.html',
  };
</script>
<script type="module" src="/src/main.js"></script>`,
);

// 补丁 2(main.js):导航按钮接入真实跳转(原为占位 toast)。
patch(
  'src/main.js',
  `document.querySelectorAll('#nav button[data-nav]').forEach(b=>{
  b.onclick = ()=>showToast(b.dataset.nav==='earth' ? '地球章节：由队友页面接入' : '月球章节：由队友页面接入');
});`,
  `document.querySelectorAll('#nav button[data-nav]').forEach(b=>{
  if(b.dataset.nav === 'mars') return; // 当前章节
  b.onclick = ()=>MarsModule.goto(b.dataset.nav); // 2126 总工程:导航接入跨页跳转
});`,
);

// 补丁 3(main.js):goto 同页跳转(原 window.open 新标签页会打断体验链)。
patch(
  'src/main.js',
  "if(url) window.open(url, '_blank', 'noopener');",
  "if(url){ window.location.href = url; return; } // 2126 总工程:同页跳转保持体验链连续",
);

// 补丁 4(main.js):URL 参数自动入场——月球火箭发射后的直达入口。
// ?auto-enter 跳过标题过场直接飞入轨道观景;再带 auto-land 时,入场动画后
// 直达首都 Aurelia 地表探索(星达步行模式)。
patch(
  'src/main.js',
  `document.getElementById('enterBtn').onclick = ()=>{
  document.getElementById('intro').classList.add('hide');
  flyTo(capViewPos.clone(), new THREE.Vector3(0,0,0), 3.2, ()=>{ controls.autoRotate = true; });
};`,
  `document.getElementById('enterBtn').onclick = ()=>{
  document.getElementById('intro').classList.add('hide');
  flyTo(capViewPos.clone(), new THREE.Vector3(0,0,0), 3.2, ()=>{ controls.autoRotate = true; });
};

{
  const q2126 = new URLSearchParams(location.search);
  if (q2126.has('auto-enter') || q2126.has('auto-land')) {
    document.getElementById('enterBtn').click();
    if (q2126.has('auto-land')) setTimeout(() => window.__mars?.enterSurface('capital'), 3600);
    history.replaceState(null, '', location.pathname); // 清参:刷新回到默认入场体验
  }
}`,
);

// 3) 构建(base 默认相对路径,可挂任意子路径;无需环境变量)
run(`"${process.execPath}" ${path.join('node_modules', 'vite', 'bin', 'vite.js')} build`, wt);

// 4) 产物落位 public/mars/
const dest = path.join(root, 'public', 'mars');
fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(path.join(wt, 'dist'), dest, { recursive: true });
console.log(`build-mars: public/mars/ 已更新(${fs.readdirSync(dest).length} 个顶层条目)`);
