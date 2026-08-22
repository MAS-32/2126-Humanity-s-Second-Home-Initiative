/* Global Companion
 * 《2126：人类第二家园计划》· 火星子模块
 * 源自单体原型 index.html L3333-3354，模块化拆分后保持行为等价。
 */
import { XingdaAvatarAdapter } from './avatar-xingda.js';
import { scene } from '../core/renderer.js';

/* ---------- Global Companion：全局统一星达 ----------
   单例。星达不绑定任何单一 Scene——进入任何场景（地表城市/球面探索/未来新增）
   都复用这同一只，通过 mount 场景 + 尺度适配实现跨场景存在，永不因切换而消失。 */
const GlobalCompanion = {
  avatar: null,
  /* 获取（首次创建）全局唯一星达。height 以地表真实尺度 0.95m 为基准 */
  ensure(){
    if(!this.avatar) this.avatar = new XingdaAvatarAdapter({ height:0.95 });
    return this.avatar;
  },
  /* 挂载到目标场景并适配尺度。scale=1 地表城市；≈0.21 球面探索（星球 R=50） */
  mount(scene, scale=1){
    const a = this.ensure();
    a.group.scale.setScalar(scale);
    // 出生姿态重置：清除上一场景残留朝向（球面探索的空间对齐四元数），防止出生躺下/倾斜/头入地
    a.group.quaternion.identity();
    a.attachTo(scene);
    return a;
  },
  unmount(){ if(this.avatar) this.avatar.detach(); }
};

export { GlobalCompanion };
