import {
  html,
  css,
  createStore,
  component,
  withProp,
  withStore,
  withStyle,
  withMarkup,
} from '../..';

createStore((state, action) => {
  switch (action.type) {
    case 'ADD': return state + 1;
    case 'SUB': return state - 1;
    default: return state;
  }
}, 0);

component(
  'my-counter-label',
  withProp('value'),
  withStyle(({ value }) => css`
    :host {
      color: ${value < 1 ? 'red' : 'black'}
    }
  `),
);

component(
  'my-counter',
  withStore(({ getState, dispatch }) => ({
    counter: getState(),
    add: () => dispatch({ type: 'ADD' }),
    sub: () => dispatch({ type: 'SUB' }),
  })),
  withMarkup(({ counter, add, sub }) => html`
    <div>
      <my-counter-label value=${counter}>${counter}</my-counter-label>
      <button onclick=${add}>+</button>
      <button onclick=${sub}>-</button>
    </div>
  `),
);
