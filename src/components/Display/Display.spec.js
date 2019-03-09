import React from 'react';
import { shallow } from 'enzyme';

import Display from './Display';

describe('Display', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<Display displayValue={''}/>)); 

  // should be separate!
  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('should render <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('renders a value of displayValue', () => {
    const expectedDisplayValue = '0';
    wrapper.setProps({displayValue: expectedDisplayValue});

    expect(wrapper.text()).toEqual(expectedDisplayValue);
  });
});