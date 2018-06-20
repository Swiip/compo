import {
  component,
  withStyle,
  withMarkup,
  html,
  css,
} from '../../..';

component(
  'swiip-above-game-container',
  withStyle(() => css`
    swiip-above-game-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  `),
);

component(
  'swiip-restart-button',
  withStyle(() => css`
    swiip-restart-button {
      color: var(--light-text-white);
      background-color: var(--heavy-bg-brown);
      border-radius: 3px;
      padding: 0 20px;
      text-decoration: none;
      color: #f9f6f2;
      height: 40px;
      cursor: pointer;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
    }
  `),
);

const newGame = () => {
  console.log('New Game!');
};

component(
  'swiip-above-game',
  withMarkup(() => html`
    <swiip-above-game-container>
      <p>Join the numbers and get to the <strong>2048 tile!</strong></p>
      <swiip-restart-button onclick=${newGame}>New Game</swiip-restart-button>
    </swiip-above-game-container>
  `),
);
