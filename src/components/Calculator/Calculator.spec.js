import React from 'react';
import { shallow } from 'enzyme';
import { observable } from 'mobx'

import Calculator from './Calculator';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';

class CalculatorStoreStub {
  @observable actualValue = "0";

  addNumber() {}

  setOperator() {}
}

describe('Calculator', () => {
  let wrapper;
  let calculatorStore;

  const getDisplayValue = () => wrapper.find(Display).get(0).props.displayValue;

  beforeEach(() => {
    calculatorStore = new CalculatorStoreStub();
    wrapper = shallow(<Calculator store={calculatorStore} />);
  });

  it('should render <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render the Display component', () => {
    expect(wrapper.find(Display).length).toEqual(1);
  });

  it('should render the Keypad component', () => {
    expect(wrapper.find(Keypad).length).toEqual(1);
  });

  it('should initially pass a "0" to Display component', () => {
    expect(getDisplayValue()).toEqual("0");
  });

  it('should change value passed to Display component when store::actualValue change', () => {
    const expected = "123.45";
    calculatorStore.actualValue = expected;

    expect(getDisplayValue()).toEqual(expected);
  });

  it('should pass store::addNumber reference as addNumber Keypad prop', () => {
    expect(wrapper.find(Keypad).get(0).props.addNumber).toEqual(calculatorStore.addNumber);
  });

  it('should pass store::setOperator reference as setOperator Keypad prop', () => {
    expect(wrapper.find(Keypad).get(0).props.setOperator).toEqual(calculatorStore.setOperator);
  });
});