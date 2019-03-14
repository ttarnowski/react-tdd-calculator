import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Calculator from '../Calculator/Calculator';

describe('App', () => {
  let wrapper;
  beforeEach(() => wrapper = shallow(<App/>));

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render the calculator component', () => {
    expect(wrapper.find(Calculator).length).toEqual(1);
  });
});