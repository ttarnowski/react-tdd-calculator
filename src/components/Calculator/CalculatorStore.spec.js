import CalculatorStore from './CalculatorStore';

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
      calculatorStore.setOperator(CalculatorStore.Operator.PLUS);

      expect(calculatorStore.actualValue).toEqual("1");
    });

    it('should change the actualValue to the just added digit when the operator has been set one step before', () => {
      calculatorStore.addNumber("2");
      calculatorStore.setOperator(CalculatorStore.Operator.PLUS);
      calculatorStore.addNumber("4");

      expect(calculatorStore.actualValue).toEqual("4");
    });

    it('should add the next to existing one in actualValue when the first digit has been set after setting the operator', () => {
      calculatorStore.addNumber("2");
      calculatorStore.setOperator(CalculatorStore.Operator.PLUS);
      calculatorStore.addNumber("4");
      calculatorStore.addNumber("6");

      expect(calculatorStore.actualValue).toEqual("46");
    });

    it('should continue evaluating the expressions and change actualValue consecutively to the result', () => {
      calculatorStore.addNumber("2");
      calculatorStore.setOperator(CalculatorStore.Operator.PLUS);
      calculatorStore.addNumber("4");

      calculatorStore.setOperator(CalculatorStore.Operator.PLUS);
      calculatorStore.addNumber("6");
      calculatorStore.setOperator(CalculatorStore.Operator.PLUS);

      expect(calculatorStore.actualValue).toEqual("12");
    });

    [
      {
        steps: ["8", CalculatorStore.Operator.PLUS, "4", CalculatorStore.Operator.MINUS],
        expectedDisplayValue: "12"
      },
      {
        steps: ["1", "8", "3", CalculatorStore.Operator.MINUS, "2", "0", CalculatorStore.Operator.EQUALS],
        expectedDisplayValue: "163"
      },
      {
        steps: ["1", "2", CalculatorStore.Operator.MULTIPLY, "1", "2", CalculatorStore.Operator.EQUALS],
        expectedDisplayValue: "144"
      },
      {
        steps: ["2", "0", CalculatorStore.Operator.DIVIDE, "8", CalculatorStore.Operator.EQUALS],
        expectedDisplayValue: "2.5"
      },
      {
        steps: [
          "1", 
          CalculatorStore.Operator.PLUS, 
          "2", 
          CalculatorStore.Operator.MULTIPLY,
          "1",
          "2",
          "8",
          CalculatorStore.Operator.MINUS,
          "9",
          CalculatorStore.Operator.DIVIDE,
          "10",
          CalculatorStore.Operator.EQUALS
        ],
        expectedDisplayValue: "37.5"
      },
      {
        steps: [
          "2", 
          CalculatorStore.Operator.PLUS, 
          "2", 
          CalculatorStore.Operator.EQUALS, 
          "3", 
          CalculatorStore.Operator.MULTIPLY, 
          "12", 
          CalculatorStore.Operator.EQUALS
        ],
        expectedDisplayValue: "36"        
      },
      {
        steps: [
          "9", "9", "9", "9", "9", "9", 
          CalculatorStore.Operator.PLUS, 
          "9", "9", "9", "9", "9", "9",
          CalculatorStore.Operator.EQUALS
        ],
        expectedDisplayValue: "2.00e+6"
      },
      {
        steps: [
          "0", 
          CalculatorStore.Operator.MINUS, 
          "9", "9", "9", "9", "9", "9",
          CalculatorStore.Operator.MULTIPLY,
          "9", "9", "9", "9", "9", "9",
          CalculatorStore.Operator.EQUALS
        ],
        expectedDisplayValue: "-1.0e+12"
      },
      {
        steps: ["1", CalculatorStore.Operator.DIVIDE, "3", CalculatorStore.Operator.EQUALS],
        expectedDisplayValue: "0.33333"
      },
      {
        steps: ["1", "0", "0", "0", "0", CalculatorStore.Operator.PLUS, "0", ".", "2", "3", "4", "5", CalculatorStore.Operator.EQUALS],
        expectedDisplayValue: "10000.2"
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