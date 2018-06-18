import {
  component,
  withProp,
  withStyle,
  withMarkup,
  html,
  css,
} from '../../..';

component(
  'swiip-heading-container',
  withStyle(() => css`
    :host {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  `),
);

component(
  'swiip-heading-title',
  withStyle(() => css`
    :host {
      font-size: 80px;
      font-weight: bold;
      margin: 0;
    }
  `),
);

component(
  'swiip-scores',
  withStyle(() => `
    :host {
      display: flex;
      flex-direction: row;
     }
  `),
);

component(
  'swiip-score',
  withProp('label'),
  withStyle(({ label }) => css`
    :host {
      background-color: var(--light-bg-brown);
      color: white;
      padding: 20px 25px 10px 25px;
      font-size: 25px;
      font-weight: bold;
      height: 25px;
      margin: 3px;
      border-radius: 3px;
      text-align: center;
      position: relative;
    }

    :host:after {
      color: var(--disable-text-white);
      display: block;
      position: absolute;
      width: 100%;
      top: 6px;
      left: 0;
      font-size: 13px;
      content: "${label}";
    }
  `),
);

component(
  'swiip-heading',
  withMarkup(() => html`
    <swiip-heading-container>
      <swiip-heading-title>2048</swiip-heading-title>
      <swiip-scores>
        <swiip-score label=${'SCORE'}>123</swiip-score>
        <swiip-score label=${'BEST'}>456</swiip-score>
      </swiip-scores>
    </swiip-heading-container>
  `),
);
