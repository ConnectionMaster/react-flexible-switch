import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Switch from '../src/Switch';
import assert from 'assert';

describe('props', () => {
  it('has default props', () => {
    const comp = renderComponent();
    const props = comp.props;

    assert(typeof props.onInactive === 'function');
    assert(typeof props.onActive === 'function');
    assert(typeof props.circleStyles === 'object');
    assert(typeof props.switchStyles === 'object');
  });

  describe('active', () => {

    it('turns the switch on', () => {
      const comp = renderComponent({ active: true });
      assert(isOn(comp));
    });

    it('turns the switch off', () => {
      const comp = renderComponent({ active: false });
      assert(isOff(comp));

      const compOff = renderComponent({ inactive: true });
      assert(isOff(compOff));
    });
  });

  describe('onActive', () => {
    it('gets called after the switch is turned on', () => {
      let called = false;
      const onActive = () => called = true;
      const comp = renderComponent({ onActive });

      flipSwitch(comp);

      assert(isOn(comp));
      assert(called);
    });

    it('does not get called when the switch is turned off', () => {
      let called = false;
      const onActive = () => called = true;
      const comp = renderComponent({ active: true, onActive });
      assert(isOn(comp));

      flipSwitch(comp);

      assert(isOff(comp));
      assert(!called);
    });
  });

  describe('onInactive', () => {
    it('gets called when the switch is turned off', () => {
      let called = false;
      const onInactive = () => called = true;
      const comp = renderComponent({ active: true, onInactive });

      flipSwitch(comp);

      assert(isOff(comp));
      assert(called);
    });
  });

  it('does not get called when the switch is turned on', () => {
    let called = false;
    const onInactive = () => called = true;
    const comp = renderComponent({ inactive: true, onInactive });
    assert(isOff(comp));

    flipSwitch(comp);

    assert(isOn(comp));
    assert(!called);
  });
});

describe('User interaction', () => {
  let switchComponent, node, circle;

  beforeEach(() => {
    switchComponent = renderComponent();
    node = switchComponent.refs.switch;
    circle = switchComponent.refs.circle;
  });

  afterEach(unmount);

  describe('can be turned on', () => {

    it('is off by default', () => {
      assert(isOff(switchComponent));
    });

    it('by clicking the circle', () => {
      simulateEvent('mousedown', circle);
      simulateEvent('mouseup', circle);

      assert(isOn(switchComponent));
    });

    it('by touching the circle', () => {
      simulateEvent('touchstart', circle);
      simulateEvent('touchend', circle);

      assert(isOn(switchComponent));
    });

    it('by clicking the switch', () => {
      simulateEvent('mousedown', node);
      simulateEvent('mouseup', node);

      assert(isOn(switchComponent));
    });

    it('by touching the switch', () => {
      simulateEvent('touchstart', node);
      simulateEvent('touchend', node);

      assert(isOn(switchComponent));
    });
  });

  describe('can be turned off', () => {
    it('by clicking the circle', () => {
      simulateEvent('mousedown', circle);
      simulateEvent('mouseup', circle);

      simulateEvent('mousedown', circle);
      simulateEvent('mouseup', circle);

      assert(isOff(switchComponent));
    });

    it('by touching the circle', () => {
      simulateEvent('touchstart', circle);
      simulateEvent('touchend', circle);

      simulateEvent('touchstart', circle);
      simulateEvent('touchend', circle);

      assert(isOff(switchComponent));
    });

    it('by clicking the switch', () => {
      simulateEvent('mousedown', node);
      simulateEvent('mouseup', node);

      simulateEvent('mousedown', node);
      simulateEvent('mouseup', node);

      assert(isOff(switchComponent));
    });

    it('by touching the switch', () => {
      simulateEvent('touchstart', node);
      simulateEvent('touchend', node);

      simulateEvent('touchstart', node);
      simulateEvent('touchend', node);

      assert(isOff(switchComponent));
    });
  });
});

function simulateEvent(eventName, el) {
  const event = new MouseEvent(eventName, { bubbles: true, cancelable: false });
  el.dispatchEvent(event);
}

function isOn(comp) {
  const el = comp.refs.circle;
  return el.style.transform === 'translateX(65px)';
}

function isOff(comp) {
  const el = comp.refs.circle;
  return el.style.transform === 'translateX(0px)';
}

function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('main'));
}

function renderComponent(props={}) {
  unmount();
  return ReactDOM.render(<Switch {...props} />, document.getElementById('main'));
}

function flipSwitch(comp) {
  simulateEvent('mousedown', comp.refs.circle);
  simulateEvent('mouseup', comp.refs.circle);
}
