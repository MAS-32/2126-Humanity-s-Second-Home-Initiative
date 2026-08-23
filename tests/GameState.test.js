import { describe, expect, it, vi } from 'vitest';
import { GameState } from '../src/core/GameState.js';

describe('GameState', () => {
  it('gets, sets, snapshots, and resets without exposing its internal object', () => {
    const state = new GameState();
    state.set('visitedSolarSystem', true);
    const snapshot = state.snapshot();
    snapshot.visitedSolarSystem = false;
    expect(state.get('visitedSolarSystem')).toBe(true);
    state.reset();
    expect(state.get('visitedSolarSystem')).toBe(false);
    expect(state.get('currentScene')).toBe('earth');
    expect(state.get('moon')).toEqual({
      visits: 0,
      observatoryVisited: false,
      marsRouteAuthorized: false,
    });
    expect(state.get('mars')).toEqual({ visits: 0, archiveViewed: false });
  });

  it('notifies subscribers and supports unsubscribe', () => {
    const state = new GameState();
    const listener = vi.fn();
    const unsubscribe = state.subscribe('arrivedMars', listener);
    state.set('arrivedMars', true);
    unsubscribe();
    state.set('arrivedMars', false);
    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toHaveBeenCalledWith(true, false);
  });

  it('deep-clones nested defaults, writes, reads, snapshots, resets, and subscriber values', () => {
    const initial = { mission: { crew: ['Ada'], settings: { oxygen: 100 } } };
    const state = new GameState(initial);
    initial.mission.crew.push('external mutation');

    const read = state.get('mission');
    read.settings.oxygen = 0;
    const snapshot = state.snapshot();
    snapshot.mission.crew.push('snapshot mutation');
    expect(state.get('mission')).toEqual({ crew: ['Ada'], settings: { oxygen: 100 } });

    const incoming = { supplies: ['water'] };
    let subscriberValue;
    state.subscribe('cargo', (value) => { subscriberValue = value; });
    state.set('cargo', incoming);
    incoming.supplies.push('external mutation');
    subscriberValue.supplies.push('subscriber mutation');
    expect(state.get('cargo')).toEqual({ supplies: ['water'] });

    state.reset();
    expect(state.get('mission')).toEqual({ crew: ['Ada'], settings: { oxygen: 100 } });
    expect(state.get('cargo')).toBeUndefined();
  });
});
