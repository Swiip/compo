import test from 'ava';
import sinon from 'sinon';

import { withStore } from '../../component.js';
import { store } from '../../store.js';

test('withStore call the super, subscribe and call the handler', (t) => {
  const test = 'test';
  const handler = sinon.stub().returns({ test });
  const superConnectedCallback = sinon.spy();
  const superUpdate = sinon.spy();

  let handlerCallback;
  store.subscribe = (callback) => { handlerCallback = callback; };

  const Component = withStore(handler)(class {
    connectedCallback(...args) {
      return superConnectedCallback(...args);
    }
    update(...args) {
      return superUpdate(...args);
    }
  });
  const instance = new Component();

  instance.connectedCallback();

  t.true(superConnectedCallback.called);
  t.true(handler.calledWith(store, instance));
  t.true(superUpdate.called);
  t.is(instance.test, test);

  delete instance.test;
  handler.resetHistory();
  superUpdate.resetHistory();

  handlerCallback();

  t.true(handler.calledWith(store, instance));
  t.true(superUpdate.called);
  t.is(instance.test, test);
});
