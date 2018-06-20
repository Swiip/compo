import '@webcomponents/webcomponentsjs';

import { store, createStore } from '../..';

import { reducer } from './logic/reducer';

import './components/container';
import './components/heading';
import './components/above-game';
import './components/game';

createStore(reducer);

store.dispatch({
  type: 'START',
  randomPosition: Math.random(),
  randomValue: Math.random(),
});
