import {
  component,
  withProp,
  withStore,
  withStyle,
  withMarkup,
  html,
  css,
} from '../../..';

component(
  'swiip-message-container',
  withProp('show'),
  withStyle(({ show }) => css`
    swiip-message-container {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 6px;
      z-index: 20;
      background-color: #faf8ef99;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity .3s ease;
      opacity: ${show ? 1 : 0};
    }
  `),
);

component(
  'swiip-message',
  withStore(({ getState }) => {
    const { won, lost } = getState();
    return { won, lost };
  }),
  withMarkup(({ won, lost }) => html`
    <swiip-message-container show=${won || lost}>
      <h2>
        <span>${won ? 'You Win!' : ''}</span>
        <span>${lost ? 'Game Over' : ''}</span>
      </h2>
    </div>
  `),
);
