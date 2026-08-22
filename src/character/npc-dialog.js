/* NPC 对话
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L3646-3689，模块化拆分后保持行为等价。
 */
import { npcAvatar, npcDialog, npcLineEl, npcNameEl, npcRoleEl } from '../interaction/explore-state.js';
import { completeTask, refreshSurfaceObjective, surface } from '../surface/common.js';

/* ---------- NPC 对话（气泡 → E 选项 → 简答） ---------- */
const npcOptsEl = document.getElementById('npcOpts');
const npcNextEl = document.getElementById('npcNext');
function snpcBubble(n){
  surface.snpc = n; surface.snpcMode = 'bubble';
  npcNameEl.textContent = n.name; npcRoleEl.textContent = n.role;
  npcAvatar.classList.toggle('ai', /AI|系统/.test(n.role));
  npcLineEl.textContent = n.greet;
  npcOptsEl.classList.remove('on'); npcOptsEl.innerHTML = '';
  npcNextEl.textContent = '按 E 交谈';
  npcDialog.classList.add('on');
}
function snpcOptions(n){
  surface.snpcMode = 'opts';
  npcLineEl.textContent = '想聊点什么？';
  npcOptsEl.innerHTML = '';
  n.options.forEach((o, i)=>{
    const b = document.createElement('button');
    b.innerHTML = `<b>${i+1}</b>${o.q}`;
    b.onclick = ()=>snpcAnswer(n, i);
    npcOptsEl.appendChild(b);
  });
  npcOptsEl.classList.add('on');
  npcNextEl.textContent = '按 1/2/3 或点击选择 · E 结束';
}
function snpcAnswer(n, i){
  surface.snpcMode = 'answer';
  surface.talked.add(n.id);
  npcLineEl.textContent = n.options[i].a;
  npcOptsEl.classList.remove('on'); npcOptsEl.innerHTML = '';
  npcNextEl.textContent = 'E 继续交谈 · 离开结束';
  const city = surface.city;
  if(city && city.id === 'capital'){
    const t = city.tasks.find(t=>t.id==='talk');
    if(t && !t.done && surface.talked.size >= 2) completeTask(city, 'talk');
    else refreshSurfaceObjective();
  }
}
function snpcClose(){
  surface.snpc = null; surface.snpcMode = 'none';
  npcDialog.classList.remove('on');
  npcOptsEl.classList.remove('on'); npcOptsEl.innerHTML = '';
}

export { snpcBubble, snpcOptions, snpcAnswer, snpcClose };
