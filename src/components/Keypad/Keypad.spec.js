import React from 'react';
import { shallow } from 'enzyme';

import Keypad from './Keypad';
import CalculatorStore from '../Calculator/CalculatorStore';
import './Keypad.css';

describe('Keypad', () => {
  let wrapper;
  beforeEach(() => wrapper = shallow(
    <Keypad numbers={[]} operators={[]} evaluate={jest.fn()} />)
  );

  it('should render 4 divs', () => {
    expect(wrapper.find('div').length).toEqual(4);
  });

  const operatorKeySelector = '.operators-container Key';

  it('should render Key components inside operators container for operator keys with operators passed as keyValue, "operator-key" as keyType and setOperator as an action', () => {
    const expectedOperatorKeys = ['+', '-'];
    const expectedAction = jest.fn();
    wrapper.setProps({ operators: expectedOperatorKeys, setOperator: expectedAction });

    expect(wrapper.find(operatorKeySelector).get(0).props.action).toEqual(expectedAction);
    expect(wrapper.find(operatorKeySelector).get(0).props.keyValue).toEqual(expectedOperatorKeys[0]);

    expect(wrapper.find(operatorKeySelector).get(1).props.action).toEqual(expectedAction);
    expect(wrapper.find(operatorKeySelector).get(1).props.keyValue).toEqual(expectedOperatorKeys[1]);
  });

  it('should not render Key component for "=" operator', () => {
    wrapper.setProps({ operators: [CalculatorStore.Operator.EQUALS] });

    expect(wrapper.find(operatorKeySelector).get(0)).toEqual(undefined);
  });

  it('should render Key components inside numbers container for number keys with numbers passed as keyValue, "number-key" as keyType and addNumber as an action', () => {
    const expectedNumbers = ['4', '5', '6'];
    const numberKeySelector = '.numbers-container Key';
    const expectedAction = jest.fn();
    wrapper.setProps({ numbers: expectedNumbers, addNumber: expectedAction });

    expect(wrapper.find(numberKeySelector).get(0).props.action).toEqual(expectedAction);
    expect(wrapper.find(numberKeySelector).get(0).props.keyValue).toEqual(expectedNumbers[0]);

    expect(wrapper.find(numberKeySelector).get(1).props.action).toEqual(expectedAction);
    expect(wrapper.find(numberKeySelector).get(1).props.keyValue).toEqual(expectedNumbers[1]);
  });

  it('should render the Key component inside submit container for the submit key with action set to function passed as setOperator', () => {
    const expectedKeyValue = CalculatorStore.Operator.EQUALS;
    const expectedKeyType = 'submit-key';
    const expectedAction = jest.fn();
    wrapper.setProps({ setOperator: expectedAction });

    expect(wrapper.find('.submit-container Key').get(0).props.keyType).toEqual(expectedKeyType);
    expect(wrapper.find('.submit-container Key').get(0).props.action).toEqual(expectedAction);
    expect(wrapper.find('.submit-container Key').get(0).props.keyValue).toEqual(expectedKeyValue);
  });
});