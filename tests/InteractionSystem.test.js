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
});
