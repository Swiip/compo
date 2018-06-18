# Compo

Compo is a JavaScript Web UI tiny library powering Web Components with a functional API and a Virtual DOM rendering.

You have to **compo**·se your **compo**·nents by enriching them with each feature through a central composing function. Markup and Style are considered as a feature you can add to your components.

## Example

```javascript
import {
  html,
  css,
  component,
  withStyle,
  withMarkup,
  withHandler
} from "compo";

component(
  "my-counter-label",
  withStyle(({ value }) => css`
    :host {
      color: ${value < 1 ? "red" : "black"}
    }
  `)
);

let counter = 0;

component(
  "my-first-counter",
  withHandler("add", ({ update }) => () => {
    counter++;
    update();
  }),
  withHandler("sub", ({ update }) => () => {
    counter--;
    update();
  }),
  withMarkup(({ add, sub }) => html`
    <my-counter-label>${counter}</my-counter-label>
    <button onclick=${add}>+</button>
    <button onclick=${sub}>-</button>
  `)
),
```

## Inspiration

### Other frameworks

- [React](https://reactjs.org/) for the v-dom, applying changed by a diff mechanism.
- [recompose](https://github.com/acdlite/recompose) for the composition API
- [styled-components](https://www.styled-components.com/) for the CSS as ad integrant part as a component definition
- [Redux](https://redux.js.org/) for the state management
- [hyperapp](https://github.com/hyperapp/hyperapp) for proving that you can build a complete framework with only a few bytes

### Blogs

- https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060
- http://2ality.com/2014/07/jsx-template-strings.html
- https://gist.github.com/lygaret/a68220defa69174bdec5

## Motivations

It started with the exploration of the Web Components and Shadow DOM APIs and followed by the willing to use v-dom concepts in this contexts.

Based upon that foundations, the objective was to have a functional API like *recompose* to power Web Components.

Minimalism and staying close and bounded to the standards.

## Compatibility

Compo is not transpiled to old JavaScript and *really* based upon Web Components so it only works out of the box on recent Chrome. It works almost on Firefox but still needs a flag to be set.

It's planned to have a compatibility build using polyfills.

## Licence

Compo is MIT licensed. See [LICENSE](./LICENSE.md).
