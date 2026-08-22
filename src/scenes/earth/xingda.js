import * as THREE from 'three';

// 星达：原创可爱动物伙伴，玩家在第三人称中的可见化身。
// 设计依据参考图（原创形象，非任何既有版权角色）：
//   青蓝色绒毛身体 + 奶白脸盘/肚皮、巨大星空眼（高光 + 小星星）、
//   双触角顶端是带土星环的发光小星球（核心识别特征）、下垂大耳朵（内耳粉橙）、
//   腮红、银色项圈 + 星星徽章、绒球尾巴。
// 程序化拼装（无外部模型资产），组原点位于脚底，方便落地与朝向控制。

const FUR = 0x46bcc8; // 青蓝毛发
const FUR_LIGHT = 0x7fd8dc; // 浅色毛发（耳背、绒球）
const CREAM = 0xf7f2e4; // 奶白（脸盘、肚皮、手脚）
const INNER_EAR = 0xf5b98e; // 内耳粉橙
const EYE_DARK = 0x0d2b3a; // 眼底深蓝黑
const ANTENNA_TIP = 0xd8f77e; // 触角尖黄绿
const RING = 0xf2f7c8; // 星球环奶黄

function makeStar(material, size = 0.024) {
  // 用两个交叉的薄片拼一颗四角星（眼球高光 / 徽章用）
  const star = new THREE.Group();
  const geo = new THREE.BoxGeometry(size, size * 0.28, size * 0.28);
  const a = new THREE.Mesh(geo, material);
  const b = new THREE.Mesh(geo, material);
  b.rotation.z = Math.PI / 2;
  star.add(a, b);
  return star;
}

export function buildXingda(scene) {
  const group = new THREE.Group();
  group.name = 'xingda';

  const fur = new THREE.MeshStandardMaterial({ color: FUR, roughness: 0.85 });
  const furLight = new THREE.MeshStandardMaterial({ color: FUR_LIGHT, roughness: 0.85 });
  const cream = new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.8 });
  const innerEar = new THREE.MeshStandardMaterial({ color: INNER_EAR, roughness: 0.75 });
  const eyeDark = new THREE.MeshStandardMaterial({ color: EYE_DARK, roughness: 0.12, metalness: 0.25 });
  const irisGlow = new THREE.MeshBasicMaterial({ color: 0x8ff2ec });
  const white = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const starYellow = new THREE.MeshBasicMaterial({ color: 0xffe37e });
  const blushMat = new THREE.MeshBasicMaterial({ color: 0xf7a68c, transparent: true, opacity: 0.6 });
  const tipGlow = new THREE.MeshBasicMaterial({ color: ANTENNA_TIP });
  const ringMat = new THREE.MeshBasicMaterial({ color: RING });
  const silver = new THREE.MeshStandardMaterial({ color: 0xd7e2e6, roughness: 0.3, metalness: 0.7 });
  const badgeTeal = new THREE.MeshBasicMaterial({ color: 0x1f8fa0 });

  // ---- 身体（圆润梨形）+ 奶白肚皮 ----
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 18), fur);
  body.scale.set(1, 1.12, 0.9);
  body.position.y = 0.4;
  group.add(body);
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.23, 18, 14), cream);
  belly.scale.set(0.85, 1.05, 0.5);
  belly.position.set(0, 0.37, 0.19);
  group.add(belly);

  // ---- 项圈 + 星星徽章 ----
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.032, 10, 28), silver);
  collar.rotation.x = Math.PI / 2 - 0.25;
  collar.position.y = 0.68;
  group.add(collar);
  const badge = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.025, 16), badgeTeal);
  badge.rotation.x = Math.PI / 2 - 0.25;
  badge.position.set(0, 0.64, 0.24);
  group.add(badge);
  const badgeStar = makeStar(starYellow, 0.055);
  badgeStar.position.set(0, 0.645, 0.26);
  badgeStar.rotation.x = -0.25;
  group.add(badgeStar);

  // ---- 头部 ----
  const head = new THREE.Group();
  head.position.y = 0.94;
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.31, 26, 20), fur);
  head.add(skull);
  // 奶白大脸盘（略扁，向前突出）
  const face = new THREE.Mesh(new THREE.SphereGeometry(0.26, 22, 16), cream);
  face.scale.set(0.92, 0.82, 0.62);
  face.position.set(0, -0.05, 0.14);
  head.add(face);
  // 头顶一撮毛
  [-0.05, 0.02, 0.08].forEach((x, i) => {
    const tuft = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.14 - i * 0.02, 8), furLight);
    tuft.position.set(x, 0.3 + i * 0.015, 0.06);
    tuft.rotation.x = -0.5;
    tuft.rotation.z = (i - 1) * 0.3;
    head.add(tuft);
  });

  // 巨大星空眼：深色眼底 + 青色虹膜 + 双高光 + 黄色小星星
  [-1, 1].forEach((side) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.088, 18, 14), eyeDark);
    eye.position.set(side * 0.128, 0.0, 0.235);
    head.add(eye);
    const iris = new THREE.Mesh(new THREE.SphereGeometry(0.062, 14, 12), irisGlow);
    iris.scale.set(1, 1, 0.45);
    iris.position.set(side * 0.128, -0.008, 0.285);
    head.add(iris);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.038, 12, 10), eyeDark);
    pupil.scale.set(1, 1, 0.4);
    pupil.position.set(side * 0.128, -0.008, 0.3);
    head.add(pupil);
    const highlight = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), white);
    highlight.position.set(side * 0.108, 0.03, 0.315);
    head.add(highlight);
    const highlight2 = new THREE.Mesh(new THREE.SphereGeometry(0.011, 8, 8), white);
    highlight2.position.set(side * 0.15, -0.03, 0.31);
    head.add(highlight2);
    const eyeStar = makeStar(starYellow, 0.022);
    eyeStar.position.set(side * 0.1, -0.045, 0.312);
    head.add(eyeStar);
  });

  // 小鼻子 + 微笑嘴 + 腮红
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.026, 10, 8), new THREE.MeshStandardMaterial({ color: 0x2a4a5e, roughness: 0.4 }));
  nose.scale.set(1.2, 0.8, 0.7);
  nose.position.set(0, -0.075, 0.31);
  head.add(nose);
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.012, 8, 16, Math.PI * 0.9), new THREE.MeshBasicMaterial({ color: 0xc25a50 }));
  mouth.position.set(0, -0.1, 0.3);
  mouth.rotation.z = Math.PI + Math.PI * 0.05;
  head.add(mouth);
  [-1, 1].forEach((side) => {
    const blush = new THREE.Mesh(new THREE.SphereGeometry(0.042, 10, 8), blushMat);
    blush.scale.set(1, 0.62, 0.4);
    blush.position.set(side * 0.21, -0.075, 0.19);
    head.add(blush);
  });

  // 下垂大耳朵：外侧青蓝 + 内侧粉橙
  const ears = [];
  [-1, 1].forEach((side) => {
    const ear = new THREE.Group();
    ear.position.set(side * 0.24, 0.14, 0.02);
    const outer = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 12), fur);
    outer.scale.set(0.55, 1.35, 0.4);
    outer.position.y = -0.1;
    ear.add(outer);
    const inner = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 10), innerEar);
    inner.scale.set(0.4, 1.1, 0.28);
    inner.position.set(0, -0.1, 0.045);
    ear.add(inner);
    ear.rotation.z = side * 0.95; // 向外下垂
    head.add(ear);
    ears.push(ear);
  });

  // 双触角：细杆外弯，顶端是带土星环的发光小星球（星达的核心识别特征）
  const antennae = [];
  [-1, 1].forEach((side) => {
    const antenna = new THREE.Group();
    antenna.position.set(side * 0.12, 0.26, 0.02);
    const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.022, 0.3, 8), fur);
    stalk.position.y = 0.15;
    antenna.add(stalk);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.068, 14, 12), tipGlow);
    tip.position.y = 0.34;
    antenna.add(tip);
    // 星球环
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.011, 8, 28), ringMat);
    ring.position.y = 0.34;
    ring.rotation.x = Math.PI / 2 - 0.35;
    antenna.add(ring);
    antenna.rotation.z = side * -0.55; // 向外弯
    head.add(antenna);
    antennae.push({ antenna, tip, ring, side });
  });
  group.add(head);

  // ---- 手臂（右手微举，打招呼姿态）----
  [-1, 1].forEach((side) => {
    const arm = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 10), fur);
    arm.scale.set(0.7, 1.25, 0.7);
    arm.position.set(side * 0.33, 0.42, 0.04);
    arm.rotation.z = side * (side > 0 ? 0.95 : 0.3); // 右手举高
    group.add(arm);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.062, 10, 8), cream);
    hand.position.set(side * (side > 0 ? 0.42 : 0.36), side > 0 ? 0.56 : 0.32, 0.05);
    group.add(hand);
  });

  // ---- 奶白小脚 ----
  [-1, 1].forEach((side) => {
    const foot = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 10), cream);
    foot.scale.set(1, 0.5, 1.3);
    foot.position.set(side * 0.14, 0.05, 0.05);
    group.add(foot);
  });

  // ---- 尾巴：细杆 + 绒球 ----
  const tail = new THREE.Group();
  tail.position.set(0, 0.3, -0.3);
  const tailStalk = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.16, 8), fur);
  tailStalk.rotation.x = Math.PI / 2.4;
  tailStalk.position.z = -0.06;
  tail.add(tailStalk);
  const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(0.085, 1), furLight);
  puff.position.set(0, 0.07, -0.16);
  tail.add(puff);
  group.add(tail);

  scene.add(group);

  let elapsed = 0;
  let faceYaw = null; // 对话时由场景设置的目标朝向

  return {
    group,
    /** 对话/演出时让星达面向某个世界坐标；传 null 取消 */
    faceToward(worldPosition) {
      if (!worldPosition) {
        faceYaw = null;
        return;
      }
      faceYaw = Math.atan2(
        worldPosition.x - group.position.x,
        worldPosition.z - group.position.z,
      );
    },
    /**
     * dt 驱动程序动画：idle 呼吸浮动 + 触角摇摆/发光脉动 + 耳尾微动；
     * moving 时 bob 加速、身体微前倾。移动中的朝向由 PlayerController 接管，
     * 静止且设置了 faceToward 时由这里平滑转向。
     */
    update(dt, moving = false) {
      elapsed += dt;
      const bobAmplitude = moving ? 0.05 : 0.022;
      const bobSpeed = moving ? 9 : 2.1;
      group.position.y = Math.abs(Math.sin(elapsed * bobSpeed)) * bobAmplitude;
      body.rotation.x = moving ? 0.12 : Math.sin(elapsed * 2.1) * 0.02;

      // 触角：缓慢摇摆 + 顶端星球发光脉动
      antennae.forEach(({ antenna, tip, ring, side }, index) => {
        antenna.rotation.z = side * -0.55 + Math.sin(elapsed * 1.7 + index * 1.9) * 0.1;
        const pulse = 1 + Math.sin(elapsed * 2.6 + index * 2.2) * 0.12;
        tip.scale.setScalar(pulse);
        ring.rotation.z = elapsed * 0.6 * (side > 0 ? 1 : -1);
      });
      ears.forEach((ear, index) => {
        const side = index === 0 ? -1 : 1;
        ear.rotation.z = side * 0.95 + Math.sin(elapsed * 1.4 + index) * 0.06;
      });
      tail.rotation.y = Math.sin(elapsed * 2.2) * 0.25;
      head.rotation.z = Math.sin(elapsed * 0.9) * 0.035;

      if (!moving && faceYaw != null) {
        let diff = faceYaw - group.rotation.y;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        group.rotation.y += diff * (1 - Math.exp(-8 * dt));
      }
    },
  };
}
