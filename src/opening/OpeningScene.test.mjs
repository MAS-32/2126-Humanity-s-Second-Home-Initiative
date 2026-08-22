import assert from 'node:assert/strict';
import { PHASES } from './OpeningScene.js';

assert.deepEqual(PHASES, [
  [0, 'boot'],
  [2000, 'moon'],
  [8000, 'route'],
  [10000, 'title'],
]);

console.log('OpeningScene timeline: OK');
