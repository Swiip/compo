import { range } from '../../../src/utils';

import {
  component,
  withStyle,
  withMarkup,
  withProp,
  html,
  css,
} from '../../..';

import { size } from '../game/conf';

component(
  'swiip-grid-container',
  withStyle(() => css`
    :host {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      display: grid;
      grid-template-columns: repeat(4, 100px);
      grid-template-rows: repeat(4, 100px);
      grid-gap: 20px 20px;
      justify-content: center;
      align-content: center;
    }
  `),
);

component(
  'swiip-grid-cell',
  withProp('x'),
  withProp('y'),
  withStyle(({ x, y }) => css`
    :host {
      position: absolute;
      height: 100px;
      width: 100px;
      border-radius: 3px;
      background-color: #cdc1b4;
      grid-area: ${x + 1} / ${y + 1};
    }
  `),
);

component(
  'swiip-grid',
  withMarkup(() => html`
    <swiip-grid-container>
      ${range(size).map(x =>
    range(size).map(y => html`
        <swiip-grid-cell x=${x} y=${y}>
        </swiip-grid-cell>
      `))}
    </swiip-grid-container>
  `),
);
