import { component, withProp, withMarkup } from '../component.js';
import { html } from '../parser.js';
import { withRouteEvent } from './router.js';

component(
  'compo-path',
  withProp('path'),
  withProp('component'),
  withRouteEvent((url, context) => {
    context.activated = context.path === url;
  }),
  withMarkup(({ activated, component }) =>
    (activated ? html`<${component}></${component}>` : html`<div></div>`)),
);
