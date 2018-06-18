import { component, withStyle, css } from '../../..';

component(
  'swiip-container',
  withStyle(() => css`
    :host {
      display: block;
      width: 500px;
      margin: 0 auto;
    }
  `),
);
