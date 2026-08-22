import * as THREE from 'three';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// mock GLTFLoader：每个实例持有一个可手动 resolve/reject 的 deferred，
// 测试在 buildXingda 之后按需触发「加载成功 / 加载失败 / dispose 后才返回」。
const h = vi.hoisted(() => ({ instances: [] }));

vi.mock('three/addons/loaders/GLTFLoader.js', () => ({
  GLTFLoader: class {
    constructor() {
      this.deferred = {};
      this.deferred.promise = new Promise((resolve, reject) => {
        this.deferred.resolve = resolve;
        this.deferred.reject = reject;
      });
      this.loadAsync = vi.fn(() => this.deferred.promise);
      h.instances.push(this);
    }
  },
}));

import { buildXingda } from '../src/scenes/earth/xingda.js';

// 已知尺寸的假 GLB：包围盒 x[0,1] y[0,3.8] z[-0.75,0.25]，中心 (0.5, 1.9, -0.25)。
// 用来验证：归一化到 1.55 高、XZ 居中、脚底落在 Y=0。
function makeFakeGltf() {
  const model = new THREE.Group();
  model.name = 'xingda-glb';
  const geo = new THREE.BoxGeometry(1, 3.8, 1);
  geo.translate(0.5, 1.9, -0.25);
  const body = new THREE.Mesh(geo, new THREE.MeshStandardMaterial());
  body.name = 'Body';
  model.add(body);
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.1, 0.02, 6, 12),
    new THREE.MeshStandardMaterial(),
  );
  ring.name = 'PlanetRing_-1';
  ring.position.set(0.5, 3.5, -0.25); // 位于 body 包围盒内部，不影响外部尺寸
  model.add(ring);
  return { scene: model, body, ring };
}

const flush = () => new Promise((resolve) => { setTimeout(resolve, 0); });

describe('xingda GLB avatar', () => {
  let scene;

  beforeEach(() => {
    h.instances.length = 0;
    scene = new THREE.Scene();
  });

  it('buildXingda 立即返回名为 xingda 的稳定 Group，未加载完成时显示青蓝占位体', () => {
    const xingda = buildXingda(scene);

    expect(xingda.group.name).toBe('xingda');
    expect(scene.children).toContain(xingda.group);
    expect(xingda.ready).toBe(false);
    // 占位体在场，绝不白屏
    expect(xingda.group.getObjectByName('xingda-placeholder')).toBeTruthy();
    // GLB 通过 BASE_URL 相对路径异步加载
    expect(h.instances.length).toBe(1);
    expect(h.instances[0].loadAsync).toHaveBeenCalledWith(
      expect.stringContaining('models/xingda/xingda_web.glb'),
    );

    xingda.dispose();
  });

  it('GLB 加载成功后只出现一个真实模型，占位体被移除', async () => {
    const xingda = buildXingda(scene);
    h.instances[0].deferred.resolve(makeFakeGltf());
    await flush();

    expect(xingda.ready).toBe(true);
    expect(xingda.group.getObjectByName('xingda-placeholder')).toBeFalsy();
    expect(xingda.group.getObjectByName('xingda-glb')).toBeTruthy();
    const visualRoot = xingda.group.getObjectByName('xingda-visual');
    expect(visualRoot.children.length).toBe(1); // 占位体 + 模型绝不共存
    // 阴影/视锥剔除标志已遍历设置，材质保留 GLB 自带
    visualRoot.traverse((object) => {
      if (!object.isMesh) return;
      expect(object.castShadow).toBe(true);
      expect(object.receiveShadow).toBe(true);
      expect(object.frustumCulled).toBe(true);
    });

    xingda.dispose();
  });

  it('模型高度归一化到约 1.55，XZ 居中、脚底落在 Y=0', async () => {
    const xingda = buildXingda(scene);
    h.instances[0].deferred.resolve(makeFakeGltf());
    await flush();

    const box = new THREE.Box3().setFromObject(xingda.group);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    expect(size.y).toBeCloseTo(1.55, 2);
    expect(box.min.y).toBeCloseTo(0, 5); // 不悬空、不陷地
    expect(center.x).toBeCloseTo(0, 5);
    expect(center.z).toBeCloseTo(0, 5);

    xingda.dispose();
  });

  it('加载失败不会崩溃：清晰报错并保留占位体兜底', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const xingda = buildXingda(scene);
    h.instances[0].deferred.reject(new Error('boom'));
    await flush();

    expect(xingda.ready).toBe(false);
    expect(xingda.group.getObjectByName('xingda-placeholder')).toBeTruthy(); // 占位体兜底
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('星达模型加载失败'),
      'boom',
    );
    expect(() => xingda.update(0.016)).not.toThrow();
    errorSpy.mockRestore();

    xingda.dispose();
  });

  it('dispose 之后晚到的模型不会加入场景，且资源被直接释放', async () => {
    const xingda = buildXingda(scene);
    const fake = makeFakeGltf();
    const geoDispose = vi.spyOn(fake.body.geometry, 'dispose');
    const matDispose = vi.spyOn(fake.body.material, 'dispose');

    xingda.dispose(); // 场景先销毁
    h.instances[0].deferred.resolve(fake); // 模型才加载完成
    await flush();

    expect(xingda.ready).toBe(false);
    expect(xingda.group.getObjectByName('xingda-glb')).toBeFalsy(); // 未挂载
    expect(geoDispose).toHaveBeenCalled(); // 迟到资源已销毁
    expect(matDispose).toHaveBeenCalled();
  });

  it('dispose 可重复调用（幂等）', async () => {
    const xingda = buildXingda(scene);
    expect(() => {
      xingda.dispose();
      xingda.dispose();
    }).not.toThrow();

    // 加载成功后再 dispose 同样幂等
    const xingda2 = buildXingda(scene);
    h.instances[1].deferred.resolve(makeFakeGltf());
    await flush();
    expect(() => {
      xingda2.dispose();
      xingda2.dispose();
    }).not.toThrow();
    xingda2.dispose();
  });

  it('update 只做轻量程序动画：不碰外层 group.position.x/z，行星环缓慢自转', async () => {
    const xingda = buildXingda(scene);
    const fake = makeFakeGltf();
    h.instances[0].deferred.resolve(fake);
    await flush();

    xingda.group.position.set(3, 0, 4); // PlayerController 管的世界坐标
    const ringQuat = fake.ring.quaternion.clone();
    expect(() => xingda.update(0.1, true)).not.toThrow();

    expect(xingda.group.position.x).toBe(3); // 移动/演出对坐标的控制不被干扰
    expect(xingda.group.position.z).toBe(4);
    expect(fake.ring.quaternion.equals(ringQuat)).toBe(false); // 行星环在转

    xingda.dispose();
  });

  it('faceToward 平滑转向对话目标，传 null 取消', async () => {
    const xingda = buildXingda(scene);
    h.instances[0].deferred.resolve(makeFakeGltf());
    await flush();

    xingda.faceToward(new THREE.Vector3(1, 0, 0)); // 目标在 +X：期望 yaw 趋向 π/2
    xingda.update(0.1, false);
    expect(xingda.group.rotation.y).toBeGreaterThan(0);

    xingda.faceToward(null); // 取消后不再强制转向
    const yaw = xingda.group.rotation.y;
    xingda.update(0.1, false);
    expect(xingda.group.rotation.y).toBeCloseTo(yaw, 5);

    xingda.dispose();
  });
});
