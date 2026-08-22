import * as THREE from 'three';

// 星达：原创可爱动物伙伴，也是玩家在第三人称中的可见化身。
// 气质：陪伴、治愈、聪明。暖白绒毛感身体 + 青绿发光点缀 + 大圆眼 + 长耳。
// 程序化拼装（无外部模型资产），组原点位于脚底，方便落地与朝向控制。

export function buildXingda(scene) {
  const group = new THREE.Group();
  group.name = 'xingda';

  const furMaterial = new THREE.MeshStandardMaterial({ color: 0xf7f3e8, roughness: 0.85 });
  const bellyMaterial = new THREE.MeshStandardMaterial({ color: 0xbfeef2, roughness: 0.7 });
  const accentMaterial = new THREE.MeshBasicMaterial({ color: 0x2fd8c8 });
  const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x10333a, roughness: 0.15, metalness: 0.3 });
  const eyeGlowMaterial = new THREE.MeshBasicMaterial({ color: 0x9ff8ee });

  // 身体：圆润梨形
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.34, 24, 18), furMaterial);
  body.scale.set(1, 1.08, 0.92);
  body.position.y = 0.42;
  group.add(body);

  // 肚皮浅青色斑块
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.24, 18, 14), bellyMaterial);
  belly.scale.set(0.9, 1, 0.55);
  belly.position.set(0, 0.38, 0.2);
  group.add(belly);

  // 头部（大而圆，占身高近半）
  const head = new THREE.Group();
  head.position.y = 0.92;
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 18), furMaterial);
  head.add(skull);

  // 大圆眼 + 高光点
  [-1, 1].forEach((side) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.075, 14, 12), eyeMaterial);
    eye.position.set(side * 0.13, 0.03, 0.24);
    head.add(eye);
    const sparkle = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 8), eyeGlowMaterial);
    sparkle.position.set(side * 0.115, 0.055, 0.3);
    head.add(sparkle);
  });

  // 小鼻子与腮红
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 8), accentMaterial);
  nose.position.set(0, -0.05, 0.29);
  head.add(nose);
  const blushMaterial = new THREE.MeshBasicMaterial({ color: 0xffb9a0, transparent: true, opacity: 0.65 });
  [-1, 1].forEach((side) => {
    const blush = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), blushMaterial);
    blush.scale.set(1, 0.6, 0.4);
    blush.position.set(side * 0.2, -0.06, 0.2);
    head.add(blush);
  });

  // 长耳：下垂弧形的圆锥，耳尖发光（星达的识别特征）
  const ears = [];
  [-1, 1].forEach((side) => {
    const ear = new THREE.Group();
    ear.position.set(side * 0.16, 0.26, 0);
    const earBody = new THREE.Mesh(new THREE.ConeGeometry(0.085, 0.42, 12), furMaterial);
    earBody.position.y = 0.18;
    ear.add(earBody);
    const earTip = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), accentMaterial);
    earTip.position.y = 0.4;
    ear.add(earTip);
    ear.rotation.z = side * -0.42;
    head.add(ear);
    ears.push(ear);
  });
  group.add(head);

  // 小手小脚
  [-1, 1].forEach((side) => {
    const arm = new THREE.Mesh(new THREE.SphereGeometry(0.085, 10, 8), furMaterial);
    arm.scale.set(0.7, 1.15, 0.7);
    arm.position.set(side * 0.34, 0.42, 0.05);
    arm.rotation.z = side * 0.35;
    group.add(arm);
    const foot = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), bellyMaterial);
    foot.scale.set(1, 0.55, 1.25);
    foot.position.set(side * 0.15, 0.05, 0.06);
    group.add(foot);
  });

  // 尾巴：小球
  const tail = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), bellyMaterial);
  tail.position.set(0, 0.3, -0.32);
  group.add(tail);

  scene.add(group);

  let elapsed = 0;
  return {
    group,
    /** dt 驱动的待机动画：呼吸起伏 + 耳朵轻摆 + 尾巴摇晃 */
    update(dt, moving = false) {
      elapsed += dt;
      const bobAmplitude = moving ? 0.05 : 0.025;
      const bobSpeed = moving ? 9 : 2.2;
      group.position.y = Math.abs(Math.sin(elapsed * bobSpeed)) * bobAmplitude;
      ears.forEach((ear, index) => {
        const side = index === 0 ? -1 : 1;
        ear.rotation.z = side * -0.42 + Math.sin(elapsed * 1.6 + index) * 0.1;
      });
      tail.position.x = Math.sin(elapsed * 2.4) * 0.03;
      head.rotation.z = Math.sin(elapsed * 0.9) * 0.04;
    },
  };
}
