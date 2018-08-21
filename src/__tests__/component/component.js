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
