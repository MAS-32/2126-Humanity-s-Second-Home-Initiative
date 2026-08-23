const DEFAULT_STATE = Object.freeze({
  currentScene: 'earth',
  earth: Object.freeze({}),
  moon: Object.freeze({
    visits: 0,
    observatoryVisited: false,
    marsRouteAuthorized: false,
  }),
  mars: Object.freeze({
    visits: 0,
    archiveViewed: false,
  }),
  visitedSolarSystem: false,
  talkedEarthAI: false,
  arrivedMoon: false,
  talkedMoonScientist: false,
  arrivedMars: false,
});

function cloneState(value) {
  try {
    return structuredClone(value);
  } catch (error) {
    throw new TypeError('GameState values must be structured-clone serializable.', { cause: error });
  }
}

export class GameState {
  constructor(initialState = {}) {
    this.defaults = cloneState({ ...DEFAULT_STATE, ...initialState });
    this.values = cloneState(this.defaults);
    this.listeners = new Map();
  }

  get(key) {
    return cloneState(this.values[key]);
  }

  set(key, value) {
    const previous = this.values[key];
    const next = cloneState(value);
    this.values[key] = next;

    if (!Object.is(previous, next)) {
      this.listeners.get(key)?.forEach((callback) => callback(cloneState(next), cloneState(previous)));
      this.listeners.get('*')?.forEach((callback) => callback(this.snapshot(), key));
    }

    return cloneState(next);
  }

  reset() {
    const previous = this.values;
    this.values = cloneState(this.defaults);

    const keys = new Set([...Object.keys(previous), ...Object.keys(this.values)]);
    keys.forEach((key) => {
      if (!Object.is(previous[key], this.values[key])) {
        this.listeners.get(key)?.forEach((callback) => callback(cloneState(this.values[key]), cloneState(previous[key])));
      }
    });
    this.listeners.get('*')?.forEach((callback) => callback(this.snapshot(), '*'));
  }

  snapshot() {
    return cloneState(this.values);
  }

  subscribe(key, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('GameState subscriber must be a function.');
    }

    if (!this.listeners.has(key)) this.listeners.set(key, new Set());
    this.listeners.get(key).add(callback);
    return () => this.listeners.get(key)?.delete(callback);
  }
}

export { DEFAULT_STATE };
