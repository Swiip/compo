import './grid';
import './tiles';
import './message';

import {
  component,
  withStyle,
  withMarkup,
  withStore,
  withHandler,
  withConnected,
  html,
  css,
} from '../../..';

const keyMapping = {
  ArrowLeft: 0,
  ArrowUp: 1,
  ArrowRight: 2,
  ArrowDown: 3,
};

component(
  'swiip-game-container',
  withStyle(() => css`
    :host {
      display: block;
      margin-top: 40px;
      position: relative;
      background: var(--light-bg-brown);
      border-radius: 6px;
      width: 500px;
      height: 500px;
      box-sizing: border-box;
    }
  `),
);

component(
  'swiip-game',
  withStore(({ dispatch }) => ({
    move: key => dispatch({
      type: 'MOVE',
      direction: keyMapping[key],
      randomPosition: Math.random(),
      randomValue: Math.random(),
    }),
  })),
  withHandler('keyHandler', ({ move }) => (event) => {
    if (keyMapping[event.key] !== undefined) {
      move(event.key);
      event.preventDefault();
    }
  }),
  withConnected(({ keyHandler }) => {
    window.addEventListener('keydown', keyHandler);
  }),
  withMarkup(() => html`
    <swiip-game-container>
      <swiip-grid></swiip-grid>
      <swiip-tiles></swiip-tiles>
      <swiip-message></swiip-message>
    </swiip-game-container>
  `),
);
