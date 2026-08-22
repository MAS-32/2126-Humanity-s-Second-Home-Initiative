import * as THREE from 'three';
import { describe, expect, it, vi } from 'vitest';
import { InteractionSystem } from '../src/core/InteractionSystem.js';

function setup() {
  const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 100);
  camera.position.set(0, 0, 0);
  camera.lookAt(0, 0, -1);
  camera.updateMatrixWorld();
  const prompt = { show: vi.fn(), hide: vi.fn(), dispose: vi.fn() };
  const interaction = new InteractionSystem({ camera, promptAdapter: prompt });
  return { camera, prompt, interaction };
}

function target(z = -3) {
  const group = new THREE.Group();
  const child = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial());
  child.position.z = z;
  group.add(child);
  group.updateMatrixWorld(true);
  return { group, child };
}

describe('InteractionSystem', () => {
  it('resolves a child ray hit to its registered ancestor and ignores key repeat', () => {
    const { interaction, prompt } = setup();
    const { group } = target();
    const onInteract = vi.fn();
    interaction.add(group, { text: 'Parent target', distance: 4, onInteract });
    interaction.update();
    expect(prompt.show).toHaveBeenCalledWith('Parent target');
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE', repeat: true }));
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE' }));
    expect(onInteract).toHaveBeenCalledOnce();
    interaction.dispose();
  });

  it('honors distance and disabled state', () => {
    const { interaction, prompt } = setup();
    const { group } = target(-5);
    const onInteract = vi.fn();
    interaction.add(group, { text: 'Too far', distance: 2, onInteract });
    interaction.update();
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE' }));
    expect(onInteract).not.toHaveBeenCalled();
    expect(prompt.hide).toHaveBeenCalled();

    group.children[0].position.z = -1;
    group.updateMatrixWorld(true);
    interaction.setEnabled(false);
    interaction.update();
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE' }));
    expect(onInteract).not.toHaveBeenCalled();
    interaction.dispose();
  });

  it('supports remove and clear without stale interactions', () => {
    const { interaction } = setup();
    const first = target();
    const second = target(-4);
    interaction.add(first.group, { onInteract() {} });
    interaction.add(second.group, { onInteract() {} });
    expect(interaction.remove(first.group)).toBe(true);
    expect(interaction.entries.size).toBe(1);
    interaction.clear();
    expect(interaction.entries.size).toBe(0);
    expect(interaction.active).toBeNull();
    interaction.dispose();
  });

  it('refreshes camera and descendant world matrices before an immediate raycast', () => {
    const { camera, interaction } = setup();
    const group = new THREE.Group();
    group.position.set(2, 0, -3);
    const child = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial());
    group.add(child);
    interaction.add(group, { text: 'Fresh transform', distance: 5, onInteract() {} });

    // Deliberately do not call updateMatrixWorld on the newly positioned group.
    camera.lookAt(2, 0, -3);
    interaction.update();
    expect(interaction.active?.root).toBe(group);
    interaction.dispose();
  });

  it('proximity mode selects the in-range entry best aligned with camera facing', () => {
    const { interaction, prompt } = setup(); // 相机朝 -z
    const source = new THREE.Group();
    source.updateMatrixWorld(true);
    interaction.setProximitySource(source);

    const ahead = new THREE.Group();
    ahead.position.set(0, 0, -3);
    ahead.updateMatrixWorld(true);
    const behind = new THREE.Group();
    behind.position.set(0, 0, 3);
    behind.updateMatrixWorld(true);
    const onInteract = vi.fn();
    interaction.add(ahead, { text: '前方目标', distance: 5, onInteract });
    interaction.add(behind, { text: '后方目标', distance: 5, onInteract() {} });

    interaction.update();
    expect(interaction.active?.root).toBe(ahead); // 朝向打分胜出
    expect(prompt.show).toHaveBeenLastCalledWith('前方目标');
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE' }));
    expect(onInteract).toHaveBeenCalledOnce();
    interaction.dispose();
  });

  it('proximity mode ignores out-of-range entries and null source restores raycast', () => {
    const { interaction } = setup();
    const source = new THREE.Group();
    source.updateMatrixWorld(true);
    interaction.setProximitySource(source);

    const far = new THREE.Group();
    far.position.set(0, 0, -20);
    far.updateMatrixWorld(true);
    interaction.add(far, { text: '太远', distance: 5, onInteract() {} });
    interaction.update();
    expect(interaction.active).toBeNull(); // 超出距离无候选

    // 传 null 回退到准星模式（Moon/Mars 路径不变）
    interaction.setProximitySource(null);
    const near = new THREE.Group();
    const child = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial());
    child.position.z = -3;
    near.add(child);
    near.updateMatrixWorld(true);
    interaction.add(near, { text: '准星目标', distance: 5, onInteract() {} });
    interaction.update();
    expect(interaction.active?.root).toBe(near);
    interaction.dispose();
  });
});
