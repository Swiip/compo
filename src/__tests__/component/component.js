import test from 'ava';
import sinon from 'sinon';

import { component } from '../../component.js';

let clock;

test.before(() => {
  clock = sinon.useFakeTimers();
});

test.after(() => {
  clock.restore();
});

test('component function asynchronously call define with the right name', (t) => {
  const componentName = 'test';
  global.customElements = { define: sinon.spy() };
  global.HTMLElement = class Mock {};

  component(componentName);

  t.false(global.customElements.define.called);
  clock.tick(0);
  t.true(global.customElements.define.called);
  t.is(global.customElements.define.getCall(0).args[0], componentName);
});

test('component function define constructor, connectedCallback and update', (t) => {
  const componentName = 'test';
  let ComponentClass;
  global.customElements = {
    define: (name, ComponentClassReceived) => {
      ComponentClass = ComponentClassReceived;
    },
  };

  component(componentName);

  clock.tick(0);
  const componentInstance = new ComponentClass();
  t.deepEqual(componentInstance.__, {});
  t.is(typeof componentInstance.connectedCallback, 'function');
  t.is(typeof componentInstance.update, 'function');
  t.is(componentInstance.connectedCallback(), undefined);
  t.is(componentInstance.update(), undefined);
});

test('component function reuse __ data if present', (t) => {
  const componentName = 'test';
  const originalData = { something: '' };
  let ComponentClass;
  global.HTMLElement = class Mock {
    constructor() {
      this.__ = originalData;
    }
  };
  global.customElements = {
    define: (name, ComponentClassReceived) => {
      ComponentClass = ComponentClassReceived;
    },
  };

  component(componentName);

  clock.tick(0);
  const componentInstance = new ComponentClass();
  t.is(componentInstance.__, originalData);
});

test('component function compose all enhancers', (t) => {
  const componentName = 'test';
  const f1ReturnValue = 'f1ReturnValue';
  const f2ReturnValue = 'f2ReturnValue';
  global.HTMLElement = class Mock {};
  global.customElements.define = sinon.spy();
  const composeFunction1 = sinon.stub().returns(f1ReturnValue);
  const composeFunction2 = sinon.stub().returns(f2ReturnValue);

  component(componentName, composeFunction1, composeFunction2);

  clock.tick(0);
  t.true(composeFunction2.called);
  t.is(typeof composeFunction2.getCall(0).args[0], 'function');
  t.true(composeFunction1.calledWith(f2ReturnValue));
  t.true(global.customElements.define.calledWith(componentName, f1ReturnValue));
});
