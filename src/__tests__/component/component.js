import test from 'ava';
import sinon from 'sinon';

import { component } from '../../component.js';

let clock;

test.before(() => {
  global.HTMLElement = class Mock {};
  global.customElements = {
    define: () => {},
  };
  clock = sinon.useFakeTimers();
});

test.after(() => {
  clock.restore();
  delete global.HTMLElement;
  delete global.customElements;
});

test('component function asynchronously call define with the right name', (t) => {
  const componentName = 'test';
  const define = sinon.spy();
  global.customElements.define = define;
  component(componentName);
  t.false(define.called);
  clock.tick(0);
  t.true(define.called);
  t.is(define.getCall(0).args[0], componentName);
});

test('component function define constructor, connectedCallback and update', (t) => {
  const componentName = 'test';
  let ComponentClass;
  const define = (name, ComponentClassReceived) => {
    ComponentClass = ComponentClassReceived;
  };
  global.customElements.define = define;
  component(componentName);
  clock.tick(0);
  const componentInstance = new ComponentClass();
  t.deepEqual(componentInstance.__, {});
  t.is(typeof componentInstance.connectedCallback, 'function');
  t.is(typeof componentInstance.update, 'function');
  t.is(componentInstance.connectedCallback(), undefined);
  t.is(componentInstance.update(), undefined);
  delete global.customElements.define;
});

test('component function reuse __ data if present', (t) => {
  const originalData = { something: '' };
  global.HTMLElement = class Mock {
    constructor() {
      this.__ = originalData;
    }
  };
  const componentName = 'test';
  let ComponentClass;
  const define = (name, ComponentClassReceived) => {
    ComponentClass = ComponentClassReceived;
  };
  global.customElements.define = define;
  component(componentName);
  clock.tick(0);
  const componentInstance = new ComponentClass();
  t.is(componentInstance.__, originalData);
  global.HTMLElement = class Mock {};
  delete global.customElements.define;
});
