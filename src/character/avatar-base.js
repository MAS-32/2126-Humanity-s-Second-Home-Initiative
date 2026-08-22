/* AvatarAdapter 抽象接口
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L3085-3103，模块化拆分后保持行为等价。
 */

/* ============================================================================
   LAYER B · 地表城市探索系统（SURFACE CITY SYSTEM）
   结构：PlayerController（位置/移动/碰撞/状态）
          ↓ 只面向接口编程，不认识任何具体模型
        AvatarAdapter（setPosition/setYaw/setVisible/setState/update/dispose）
          ↓
        XingdaAvatarAdapter（优先加载 assets/characters/xingda.glb，
          不存在则使用 TEMP XINGDA PROXY——未来放入 GLB 即零代码替换）
============================================================================ */

/* ---------- AvatarAdapter：角色视觉统一接口（约定，不实例化） ----------
   setPosition(v3) / setYaw(rad) / setQuaternion(q) / setVisible(bool)
   setState('idle'|'walk'|'run'|'jump') / update(dt,t) / attachTo(scene) / detach() / dispose() */
class AvatarAdapter {
  setPosition(){} setYaw(){} setQuaternion(){} setVisible(){} setState(){}
  update(){} attachTo(){} detach(){} dispose(){}
  get object3d(){ return null; } get height(){ return 1; }
}

export { AvatarAdapter };
