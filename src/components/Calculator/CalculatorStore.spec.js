import CalculatorStore from './CalculatorStore';

describe('Calculator store', () => {
  describe('::addNumber', () => {
    it('should not change the actualValue when the actualValue and number are "0"', () => {
      const calculatorStore = new CalculatorStore();

      calculatorStore.addNumber(0);

      expect(calculatorStore.actualValue).toEqual(0);
    });
  });
});