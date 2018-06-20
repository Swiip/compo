# Compo

![Travis Status](https://travis-ci.org/Swiip/compo.svg?branch=master)

Compo is a JavaScript Web UI tiny library powering Web Components with a functional API and a Virtual DOM rendering.

You have to **compo**·se your **compo**·nents by enriching them with each feature through a central composing function. Markup and Style are considered as a feature you can add to your components.

## Installation

```
npm install compo-lib

yarn add compo-lib
```

## Example

```javascript
import {
  html,
  css,
  createStore,
  component,
  withProp,
  withStore,
  withStyle,
  withMarkup,
} from 'compo-lib';

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
      color: ${value < 1 ? 'red' : 'black'};
    }
  `,),
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
```

## API

### component( name:String, ...enhancers:Array&lt;(Component =&gt; Component)&gt; ):void

Define a [Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) with named `name` and enhanced by each enhancers.

- `name` is directly passed to `customElement.define()` so you have to follow Web Components constraints such as a `-` in the name and only used once in the application.
- `enhancers` are function taking in parameter a component class definition and returning a new one, most often my extending it. You can create your own but you can use all the `with` prefixed enhancers provided in the framework.

```javascript
component(
  'my-component',
  withProp('my-prop')
);
```

### withMarkup( (props =&gt; Markup) ):(Component =&gt; Component)

Define an enhancer which will render the `Markup` returned in the component and will re-render on every change detection.

You'll obtain an `Markup` object by using the `html` tagged template described bellow.

```javascript
component(
  'my-component',
  withMarkup(() => html`<div>Hello World</div>`)
);
```

### withStyle( (props =&gt; Style) ):(Component =&gt; Component)

Define an enhancer which will add a `style` block with the `Style` returned and will update the style on every change detection.

The `Style` object can be either a standard `string` or an object using the `css` tagged template described bellow.

```javascript
component(
  'my-component',
  withStyle(() => css`:host { color: red; }`)
);
```

### withProp( name ):(Component =&gt; Component)

Define an enhancer which will instrument and trigger an update on modification on the component property `name`.

```javascript
component(
  'my-component',
  withProp('my-prop')
);
```

### withHandler( name, (props =&gt; handler) ):(Component =&gt; Component)

Define an enhancer which will add a `name` property to the component with `handler` returned to be used in the markup.

```javascript
component(
  'my-component',
  withHandler(() => event => console.log('my handler', event))
)
```

### withConnected( (props =&gt; void) ):(Component =&gt; Component)

Define an enhancer which will run the function in parameter when the component is connected corresponding to the Custom Element standard `connectedCallback` function.

```javascript
component(
  'my-component',
  withConnected(() => console.log('component connected'))
)
```

### withStore( ((store, props) =&gt; object) ):(Component =&gt; Component)

Define an enhancer which will run the function in parameter at every store updates and assign all return object properties to the component object.

The store must be created beforehand by using `createStore` described bellow.

```javascript
component(
  "my-component",
  withStore(({ getState, dispatch }) => {
    myData: getState().my.data,
    myAction: () => dispatch({ type: "MY_ACTION" })
  })
)
```

### html

ES2015 tagged template allowing to create DOM templates with rich interpolations.

```javascript
html`
  <my-component my-prop=${prop}>
    ${content}
  </my-component>
`
```

Known limitation: you currently can't use serveral interpolations in a single DOM node or property.

### css

ES2015 tagged template allowing to create CSS content.

To be perfectly honest it does absolutely nothing right now! Still reserving the API can be good and it triggers syntax highlighting in many editors.

```javascript
css`
  my-component {
    color: red;
  }
`
```

### createStore( ((state, action) =&gt; state), initialState ): Store
Initialize the internal store with the reducer in argument.

In contrary to Redux, you don't always need to get the `Store` returned. It's automatically passed to the `withStore` enhancer.

```javascript
createStore((state, action) => {
  switch (action.type) {
    case 'ADD': return state + 1;
    case 'SUB': return state - 1;
    default: return state;
  }
}, 0);
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

Based upon that foundations, the objective was to have a functional API like _recompose_ to power Web Components.

Minimalism and staying close and bounded to the standards.

## Compatibility

Compo is not transpiled to old JavaScript and _really_ based upon Web Components so it only works out of the box on recent Chrome. It works almost on Firefox but still needs a flag to be set.

It's planned to have a compatibility build using polyfills.

## Licence

Compo is MIT licensed. See [LICENSE](./LICENSE.md).
