import {
  html,
  component,
  withHandler,
  withMarkup,
} from '../..';

import { withRouteAction } from '../../router';


component(
  'my-routing',
  withRouteAction(),
  withHandler('toRoute1', ({ go }) => () => go('/route1')),
  withHandler('toRoute2', ({ go }) => () => go('/route2')),
  withMarkup(({ toRoute1, toRoute2 }) => html`
    <div>
      <a onClick=${toRoute1}>Route 1</a>
      <a onClick=${toRoute2}>Route 2</a>
      <compo-path path=${'/route1'} component=${'my-component-1'}></compo-path>
      <compo-path path=${'/route2'} component=${'my-component-2'}></compo-path>
    </div>
  `),
);

component(
  'my-component-1',
  withMarkup(() => html`<p>Component 1</p>`),
);

component(
  'my-component-2',
  withMarkup(() => html`<p>Component 2</p>`),
);
