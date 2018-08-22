import test from 'ava';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

const setup = render =>
  proxyquire('../../component.js', {
    './render.js': { render },
  }).withMarkup;

test('withMarkup add a connectedCallback which initiate shadow dom and render', (t) => {
  const shadowRoot = 'shadowRoot';
  const handlerResult = 'handlerResult';
  const render = sinon.spy();
  const handler = sinon.stub().returns(handlerResult);
  const superConnectedCallback = sinon.spy();
  const attachShadow = sinon.spy();

  const withMarkup = setup(render);
  const Component = withMarkup(handler)(class {
    constructor() {
      this.shadowRoot = shadowRoot;
    }
    connectedCallback(...args) {
      return superConnectedCallback(...args);
    }
    attachShadow(...args) {
      return attachShadow(...args);
    }
  });
  const instance = new Component();
  instance.connectedCallback();

  t.true(superConnectedCallback.called);
  t.true(attachShadow.called);
  t.is(attachShadow.getCall(0).args[0].mode, 'open');
  t.true(handler.calledWith(instance));
  t.true(render.calledWith(shadowRoot, handlerResult));
});

test('withMarkup add a update action which render', (t) => {
  const shadowRoot = 'shadowRoot';
  const handlerResult = 'handlerResult';
  const render = sinon.spy();
  const handler = sinon.stub().returns(handlerResult);
  const superUpdate = sinon.spy();

  const withMarkup = setup(render);
  const Component = withMarkup(handler)(class {
    constructor() {
      this.shadowRoot = shadowRoot;
    }
    update(...args) {
      return superUpdate(...args);
    }
  });
  const instance = new Component();
  instance.update();

  t.true(superUpdate.called);
  t.true(handler.calledWith(instance));
  t.true(render.calledWith(shadowRoot, handlerResult));
});
