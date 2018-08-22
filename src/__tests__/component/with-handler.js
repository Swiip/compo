import test from 'ava';
import sinon from 'sinon';

import { withHandler } from '../../component.js';

test('withHandler add the handler method', (t) => {
  const handlerName = 'handlerName';
  const spy = sinon.spy();
  const handler = () => spy;

  const Component = withHandler(handlerName, handler)(class {});
  const instance = new Component();
  instance[handlerName]();

  t.true(spy.called);
});

test('withHandler bind the handler method', (t) => {
  const handlerName = 'handlerName';
  const handler = ({ contextValue }) => () => contextValue;
  const contextValue = 'contextValue';

  const Component = withHandler(handlerName, handler)(class {
    constructor() {
      this[contextValue] = contextValue;
    }
  });
  const instance = new Component();
  const handlerPointer = instance[handlerName];
  const result = handlerPointer();

  t.is(result, contextValue);
});
