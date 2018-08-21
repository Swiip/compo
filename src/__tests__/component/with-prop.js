import test from 'ava';
import sinon from 'sinon';

import { withProp } from '../../component.js';

test('withProp add a setter to the component class', (t) => {
  const propName = 'name';
  const propValue = 'newValue';

  const Component = withProp(propName)(class {});
  const componentInstance = new Component();
  componentInstance.__ = {};
  componentInstance.setAttribute = sinon.spy();
  componentInstance.update = sinon.spy();

  componentInstance[propName] = propValue;

  t.is(componentInstance[propName], componentInstance.__[propName]);
  t.true(componentInstance.setAttribute.calledWith(propName, propValue));
  t.true(componentInstance.update.called);
});

test('withProp add a getter to the component class', (t) => {
  const propName = 'name';
  const propValue = 'newValue';

  const Component = withProp(propName)(class {});
  const componentInstance = new Component();
  componentInstance.__ = { [propName]: propValue };

  t.is(componentInstance[propName], propValue);
});
