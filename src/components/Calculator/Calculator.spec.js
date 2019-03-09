import React from 'react';
import { shallow } from 'enzyme';
import Calculator from './Calculator';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';

describe('Calculator', () => {
  let wrapper;

  const getDisplayValue = () => wrapper.find(Display).get(0).props.displayValue;

  beforeEach(() => wrapper = shallow(<Calculator/>));

  it('should render <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render the Display component', () => {
    expect(wrapper.find(Display).length).toEqual(1);
  });

  it('should render the Keypad component', () => {
    expect(wrapper.find(Keypad).length).toEqual(1);
  });

  it('should pass a "0" to Display component', () => {
    expect(getDisplayValue()).toEqual("0");
  });

  it('should pass addNumber method to Keypad component as a addNumber prop', () => {
    expect(wrapper.find(Keypad).get(0).props.addNumber).toEqual(wrapper.instance().addNumber);
  });

  it('should pass setOperator method to Keypad component as a setOperator prop', () => {
    expect(wrapper.find(Keypad).get(0).props.setOperator).toEqual(wrapper.instance().setOperator);
  });

  it('should pass evaluate method to Keypad component as a evaluate prop', () => {
    expect(wrapper.find(Keypad).get(0).props.evaluate).toEqual(wrapper.instance().evaluate);
  });

  describe('::addNumber', () => {
    it('should not change the display value when the display value and number are "0"', () => {
      wrapper.instance().addNumber("0");

      expect(getDisplayValue()).toEqual("0");
    });

    it('should not change the display value when the number has 6 digits excluding "." and another number is added', () => {
      ["1","2","3","4","5","6","7"].forEach(n => wrapper.instance().addNumber(n));

      wrapper.instance().addNumber("9");

      expect(getDisplayValue()).toEqual("123456");
    });

    it('should not change the display value when the number has 7 digits including "." and another number is added', () => {
      ["1","2","3","4",".","5","6","7"].forEach(n => wrapper.instance().addNumber(n));

      wrapper.instance().addNumber("9");

      expect(getDisplayValue()).toEqual("1234.56");
    });

    [
      { args: ["1"], expected: "1" },
      { args: ["1","1","1"], expected: "111" },
      { args: ["1","2","3"], expected: "123" },
      { args: ["."], expected: "0." },
      { args: [".","0",".","1"], expected: "0.01" },
      { args: ["8", "4", ".", "3"], expected: "84.3"},
      { args: ["1", "2", "ce"], expected: "1"},
      { args: ["2", "ce"], expected: "0"}
    ].forEach((item) => {
      it(`should change the display value to ${item.expected} for consecutive calls with number argument being ${item.args}`, () => {
        item.args.forEach(arg => wrapper.instance().addNumber(arg));

        expect(getDisplayValue()).toEqual(item.expected);
      });
    });
  });

  describe('::setOperator', () => {
    it('should not reset display', () => {
      wrapper.instance().addNumber("1");
      wrapper.instance().setOperator("+");

      expect(getDisplayValue()).toEqual("1");
    });
  });

  describe('::evaluate', () => {
    it('should display 0', () => {
      wrapper.instance().evaluate();

      expect(getDisplayValue()).toEqual("0");
    });

    it('should display the same value as displayed when no operator has been set', () => {
      wrapper.instance().addNumber("2");
      wrapper.instance().evaluate();

      expect(getDisplayValue()).toEqual("2");
    });

    it(`should display 3 for sequence of methods called as follows addNumber: 1, setOperator: +, addNumber: 2, evaluation`, () => {
      wrapper.instance().addNumber("1");
      wrapper.instance().setOperator("+");
      wrapper.instance().addNumber("2");
      wrapper.instance().evaluate();

      expect(getDisplayValue()).toEqual("3");
    });

    it('should display 6 for sequence of methods called as follows addNumber: 2, setOperator: x, addNumber: 3, evaluation', () => {
      wrapper.instance().addNumber("2");
      wrapper.instance().setOperator("x");
      wrapper.instance().addNumber("3");
      wrapper.instance().evaluate();

      expect(getDisplayValue()).toEqual("6");
    });

    it('should display 20 for sequence of methods called as follows addNumber: 2, setOperator: x, addNumber: 1, addNumber: 0, evaluation', () => {
      wrapper.instance().addNumber("2");
      wrapper.instance().setOperator("x");
      wrapper.instance().addNumber("1");
      wrapper.instance().addNumber("0");
      wrapper.instance().evaluate();

      expect(getDisplayValue()).toEqual("20");
    });

    describe('sequences', () => {
      const OPERATORS = {'+': '+', '-': '-', 'x': 'x', '/': '/'};

      [
        { args: ["3", "4", "-", "3", "6"], expected: "-2" },
        { args: ["2", "0", "/", "1", "2"], expected: "1.6666666666666667" },
        { args: ["1", "2", "+", "2", "x", "3", "/", "2"], expected: "21" },
        { args: ["2", "x", "4", "+", "2"], expected: "10" },
      ].forEach(item => {
        it(`should display ${item.expected} for sequence of: ${item.args} and evaluate`, () => {
          item.args.forEach(arg => {
            OPERATORS[arg] !== undefined ? wrapper.instance().setOperator(arg) : wrapper.instance().addNumber(arg);            
          });
          wrapper.instance().evaluate();

          expect(getDisplayValue()).toEqual(item.expected);
        });
      });
    });
  });
});