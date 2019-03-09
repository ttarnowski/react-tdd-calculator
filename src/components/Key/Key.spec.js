import React from 'react';
import { shallow } from 'enzyme';

import Key from './Key';

describe('Key', () => {
  let wrapper;
  const keyContainerSelector = 'div.key-container';

  beforeEach(() => wrapper = shallow(<Key keyValue={''} keyType={''} action={jest.fn()} />));

  // it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('should render the value of keyValue within paragraph', () => {
    const expectedKeyValue = 'test';
    const paragraphSelector = '.key-value';
    wrapper.setProps({ keyValue: expectedKeyValue });

    expect(wrapper.find(paragraphSelector).text()).toEqual(expectedKeyValue);
    expect(wrapper.find(paragraphSelector).length).toEqual(1);
  });

  it('should render container with class name matching the given keyType prop', () => {
    const expectedKeyTypeValue = 'test';
    
    wrapper.setProps({ keyType: expectedKeyTypeValue });

    expect(wrapper.find(`${keyContainerSelector}.${expectedKeyTypeValue}`).length).toEqual(1);
  });

  it('should execute function passed as an action with argument being a value', () => {
    const spy = jest.fn();
    const expectedValue = 'value';
    wrapper.setProps({ action: spy, keyValue: expectedValue });

    wrapper.find(keyContainerSelector).simulate('click');

    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0][0]).toBe(expectedValue);
  });
});