import { observable, action } from "mobx";

const BACKSPACE_SYMBOL = "ce";
const MAX_NUM_LEN = 6;

class CalculatorStore {
  static get Operator() {
    return {
      PLUS: '+',
      MINUS: '-',
      MULTIPLY: 'x',
      DIVIDE: '/',
      EQUALS: '='
    };
  };

  static get AvailableOperators() {
    return Object.values(CalculatorStore.Operator);
  };

  static get AvailableNumbers() {
    return ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0', 'ce'];
  };

  @observable actualValue = "0";
  previousValue = "0";
  @observable operator = "";
  isFirstNumberProvided = false;

  @action.bound addNumber(number) {
    debugger;
    if (this.isFirstNumberProvided === true) {
      this.actualValue = "0";
      this.isFirstNumberProvided = !this.isFirstNumberProvided;
    }

    if (this.actualValue === "0" && number !== ".") {
      this.actualValue = "";
    }

    if (this.actualValue.replace('.', '').length >= MAX_NUM_LEN) {
      return;
    }

    const isTryingToAddSecondDot = () => !(number === "." && this.actualValue.includes("."));

    if (number === BACKSPACE_SYMBOL) {
      const value = this.actualValue.slice(0, -1);
      this.actualValue = value.length > 0 ? value : "0";
    } else if (isTryingToAddSecondDot()) {
      this.actualValue += number;
    }
  }

  @action.bound setOperator(operator) {
    this.isFirstNumberProvided = !this.isFirstNumberProvided;

    if (this.operator !== "") {
      this.actualValue = calculate(this.actualValue, this.previousValue, this.operator);
    }

    this.operator = operator;
    this.previousValue = this.actualValue;
  }
}

const calculate = (value1, value2, operator) => {
  let result = parseFloat(value2);

  switch (operator) {
    case CalculatorStore.Operator.PLUS:
      result += parseFloat(value1);
      break;
    case CalculatorStore.Operator.MINUS:
      result -= parseFloat(value1);
      break;
    case CalculatorStore.Operator.MULTIPLY:
      result *= parseFloat(value1);
      break;
    case CalculatorStore.Operator.DIVIDE:
      result /= parseFloat(value1);
      break;
    default: 
      result = value1;
  }

  const resultIntPart = Math.trunc(result);
  const fractionDigits = resultIntPart < 0 ? MAX_NUM_LEN - 5 : MAX_NUM_LEN - 4;

  if (resultIntPart.toString().length > MAX_NUM_LEN) {
    return result.toExponential(fractionDigits).toString();
  }

  if (result.toString().length > MAX_NUM_LEN) {
    const numOfDigits = MAX_NUM_LEN - resultIntPart.toString().length;
    return result.toFixed(numOfDigits).toString();
  }

  return result.toString();
}

export default CalculatorStore;