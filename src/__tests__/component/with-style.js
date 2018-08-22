import test from 'ava';
import sinon from 'sinon';

import { withStyle } from '../../component.js';

test('withStyle add a connectedCallback which initiate shadow dom and render', (t) => {
  const handlerResult = 'handlerResult';
  const createTextNodeResult = 'createTextNodeResult';
  const handler = sinon.stub().returns(handlerResult);
  const superConnectedCallback = sinon.spy();
  const attachShadow = sinon.spy();
  const shadowRoot = {
    innerHTML: '',
    appendChild: sinon.spy(),
  };
  const styleNode = {
    appendChild: sinon.spy(),
  };
  global.document = {
    createElement: sinon.stub().returns(styleNode),
    createTextNode: sinon.stub().returns(createTextNodeResult),
  };

  const Component = withStyle(handler)(class {
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
  t.is(instance.shadowRoot.innerHTML, '<slot></slot>');
  t.true(handler.calledWith(instance));
  t.true(global.document.createTextNode.calledWith(handlerResult));
  t.true(styleNode.appendChild.calledWith(createTextNodeResult));
  t.true(shadowRoot.appendChild.calledWith(styleNode));
});

test('withStyle add a update action which render', (t) => {
  const handlerResult = 'handlerResult';
  const createTextNodeResult = 'createTextNodeResult';
  const handler = sinon.stub().returns(handlerResult);
  const superUpdate = sinon.spy();
  const styleNode = {
    childNodes: [{ remove: sinon.spy() }],
    appendChild: sinon.spy(),
  };
  const shadowRoot = {
    querySelector: sinon.stub().returns(styleNode),
  };
  global.document = {
    createTextNode: sinon.stub().returns(createTextNodeResult),
  };

  const Component = withStyle(handler)(class {
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
  t.true(shadowRoot.querySelector.calledWith('style'));
  t.true(styleNode.childNodes[0].remove.called);
  t.true(handler.calledWith(instance));
  t.true(global.document.createTextNode.calledWith(handlerResult));
  t.true(styleNode.appendChild.calledWith(createTextNodeResult));
});
