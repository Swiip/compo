import test from 'ava';
import sinon from 'sinon';

import { withConnected } from '../../component.js';

test('witConnected call the super then the handler', (t) => {
  const handler = sinon.spy();
  const superConnectedCallback = sinon.spy();

  const Component = withConnected(handler)(class {
    connectedCallback(...args) {
      return superConnectedCallback(...args);
    }
  });
  const instance = new Component();
  instance.connectedCallback();

  t.true(superConnectedCallback.called);
  t.true(handler.calledWith(instance));
});
