import { compose } from './utils.js';
import { render } from './render.js';
import { store } from './store.js';

export const component = (name, ...enhancers) => {
  setTimeout(() => {
    const customElement = class extends HTMLElement {
      constructor() {
        super();
        if (!this.__) {
          this.__ = {};
        }
      }
      connectedCallback() {}
      update() {}
    };
    customElements.define(name, compose(...enhancers)(customElement));
  });
};

export const withProp = name => Base =>
  class extends Base {
    set [name](value) {
      this.__[name] = value;
      this.setAttribute(name, value);
      this.update();
    }
    get [name]() {
      return this.__[name];
    }
  };

export const withMarkup = handler => Base =>
  class extends Base {
    connectedCallback() {
      super.connectedCallback();
      this.attachShadow({ mode: 'open' });
      render(this.shadowRoot, handler(this));
    }
    update() {
      super.update();
      render(this.shadowRoot, handler(this));
    }
  };

export const withStyle = handler => (Base) => {
  const createStyle = context => document.createTextNode(handler(context));

  return class extends Base {
    connectedCallback() {
      super.connectedCallback();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = '<slot></slot>';
      const styleNode = document.createElement('style');
      styleNode.appendChild(createStyle(this));
      this.shadowRoot.appendChild(styleNode);
    }
    update() {
      super.update();
      const styleNode = this.shadowRoot.querySelector('style');
      styleNode.childNodes[0].remove();
      styleNode.appendChild(createStyle(this));
    }
  };
};

export const withHandler = (name, handler) => Base =>
  class extends Base {
    constructor() {
      super();
      this[name] = this[name].bind(this);
    }
    [name](event) {
      return handler(this)(event);
    }
  };

export const withConnected = hanlder => Base =>
  class extends Base {
    connectedCallback() {
      super.connectedCallback();
      hanlder(this);
    }
  };

export const withStore = handler => Base =>
  class extends Base {
    connectedCallback() {
      super.connectedCallback();
      const storeUpdateHandler = () => {
        Object.assign(this, handler(store, this));
        this.update();
      };
      store.subscribe(storeUpdateHandler);
      storeUpdateHandler();
    }
  };
