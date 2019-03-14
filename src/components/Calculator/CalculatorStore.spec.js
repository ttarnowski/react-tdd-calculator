import CalculatorStore from './CalculatorStore';

const PLUS = CalculatorStore.Operator.PLUS;
const MINUS = CalculatorStore.Operator.MINUS;
const MULTIPLY = CalculatorStore.Operator.MULTIPLY;
const DIVIDE = CalculatorStore.Operator.DIVIDE;
const EQUALS = CalculatorStore.Operator.EQUALS;

describe('Calculator store', () => {
  let calculatorStore;

  beforeEach(() => calculatorStore = new CalculatorStore());

  describe('::addNumber', () => {
    it('should not change the actualValue when the actualValue and number are "0"', () => {
      calculatorStore.addNumber("0");
 
      expect(calculatorStore.actualValue).toEqual("0");
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
      it(`should change the actualValue to ${item.expected} for consecutive calls with number arguments being ${item.args}`, () => {
        item.args.forEach(arg => calculatorStore.addNumber(arg));

        expect(calculatorStore.actualValue).toEqual(item.expected);
      });
    });

    it('should not change the actualValue when the number has 6 digits and another number is added', () => {
      ["1","2","3","4","5","6"].forEach(n => calculatorStore.addNumber(n));

      calculatorStore.addNumber("9");

      expect(calculatorStore.actualValue).toEqual("123456");
    });

    it('should not change the actualValue when the number has 6 digits and "." and another number is added', () => {
      ["1","2","3","4",".","5","6"].forEach(n => calculatorStore.addNumber(n));

      calculatorStore.addNumber("8");

      expect(calculatorStore.actualValue).toEqual("1234.56");
    });

    it('should not add the dot to actualValue when the number has 6 digits, does not have a dot and a dot is to be added at the end', () => {
      ["1","2","3","4","5","6"].forEach(n => calculatorStore.addNumber(n));

      calculatorStore.addNumber(".");

      expect(calculatorStore.actualValue).toEqual("123456");
    });
  });

  describe('::setOperator', () => {
    it('should not reset the actualValue when the operator has not been set before', () => {
      calculatorStore.addNumber("1");
      calculatorStore.setOperator(PLUS);

      expect(calculatorStore.actualValue).toEqual("1");
    });

    it('should change the actualValue to the just added digit when the operator has been set one step before', () => {
      calculatorStore.addNumber("2");
      calculatorStore.setOperator(PLUS);
      calculatorStore.addNumber("4");

      expect(calculatorStore.actualValue).toEqual("4");
    });

    it('should add the next to existing one in actualValue when the first digit has been set after setting the operator', () => {
      calculatorStore.addNumber("2");
      calculatorStore.setOperator(PLUS);
      calculatorStore.addNumber("4");
      calculatorStore.addNumber("6");

      expect(calculatorStore.actualValue).toEqual("46");
    });

    it('should continue evaluating the expressions and change actualValue consecutively to the result', () => {
      calculatorStore.addNumber("2");
      calculatorStore.setOperator(PLUS);
      calculatorStore.addNumber("4");

      calculatorStore.setOperator(PLUS);
      calculatorStore.addNumber("6");
      calculatorStore.setOperator(PLUS);

      expect(calculatorStore.actualValue).toEqual("12");
    });

    [
      {
        steps: ["8", PLUS, "4", MINUS],
        expectedDisplayValue: "12"
      },
      {
        steps: ["1", "8", "3", MINUS, "2", "0", EQUALS],
        expectedDisplayValue: "163"
      },
      {
        steps: ["1", "2", MULTIPLY, "1", "2", EQUALS],
        expectedDisplayValue: "144"
      },
      {
        steps: ["2", "0", DIVIDE, "8", EQUALS],
        expectedDisplayValue: "2.5"
      },
      {
        steps: ["1", PLUS, "2", MULTIPLY, "1", "2", "8", MINUS,"9", DIVIDE, "10", EQUALS],
        expectedDisplayValue: "37.5"
      },
      {
        steps: ["2", PLUS, "2", EQUALS, "3", MULTIPLY, "12", EQUALS],
        expectedDisplayValue: "36"        
      },
      {
        steps: ["9", "9", "9", "9", "9", "9", PLUS, "9", "9", "9", "9", "9", "9", EQUALS],
        expectedDisplayValue: "2.00e+6"
      },
      {
        steps: ["0", MINUS, "9", "9", "9", "9", "9", "9", MULTIPLY, "9", "9", "9", "9", "9", "9", EQUALS],
        expectedDisplayValue: "-1.0e+12"
      },
      {
        steps: ["1", DIVIDE, "3", EQUALS],
        expectedDisplayValue: "0.33333"
      },
      {
        steps: ["1", "0", "0", "0", "0", PLUS, "0", ".", "2", "3", "4", "5", EQUALS],
        expectedDisplayValue: "10000.2"
      },
      {
        steps: ["6", "4", MULTIPLY, "4", EQUALS, MINUS, "1", "2", "8", EQUALS],
        expectedDisplayValue: "128"
      }
    ].forEach(testCase => {
      it(`should set displayValue to ${testCase.expectedDisplayValue} for the following steps: ${testCase.steps}`, () => {
        testCase.steps.forEach(step => {
          Object.values(CalculatorStore.Operator).includes(step) ?
            calculatorStore.setOperator(step) : calculatorStore.addNumber(step);
        });
  
        expect(calculatorStore.actualValue).toEqual(testCase.expectedDisplayValue);
      });  
    });
  });
});