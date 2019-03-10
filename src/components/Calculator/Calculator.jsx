import React, { Component } from 'react';

import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';
import './Calculator.css';

const MAX_NUM_LENGTH = 6;

class Calculator extends Component {
  state = {
    displayValue: '0',
    numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0','ce'],
    operators: ['/', 'x', '-', '+'],
    ans: 0,
    currentOperator: '',
    newNumber: false
  };
  
  addNumber = (number) => {
    const { displayValue, currentOperator, newNumber } = this.state;

    if (number === "." && displayValue.includes(".")) {
      return;
    }

    if (0 === number === displayValue) {
      return;
    }

    if (displayValue.replace('.', '').length >= MAX_NUM_LENGTH) {
      return;
    }

    if (number === "ce") {
      const value = displayValue.slice(0, -1);
      this.setState({ displayValue: value.length > 0 ? value : "0" })
      return;
    }

    if (number === "." && displayValue === "0") {
      this.setState({ displayValue: "0." });
      return;
    }

    if (currentOperator.length > 0 && newNumber) {
      this.setState({ displayValue: number, newNumber: !newNumber });
      return;
    }

    this.setState({ displayValue: displayValue === "0" ? number : displayValue + number });
  };

  setOperator = (operator) => {
    if (this.state.currentOperator.length > 0) {
      this.evaluate(() => {
        this.setState({ 
          currentOperator: operator, 
          newNumber: true,
          ans: parseFloat(this.state.displayValue)
        });    
      });
    } else {
      this.setState({ 
        currentOperator: operator, 
        newNumber: true,
        ans: parseFloat(this.state.displayValue)
      });  
    }
  };

  evaluate = (callback = () => {}) => {
    let result;
    const value = parseFloat(this.state.displayValue);

    if (this.state.currentOperator === 'x') {
      result = this.state.ans * value;
    } else if (this.state.currentOperator === '-') {
      result = this.state.ans - value;
    } else if (this.state.currentOperator === '/') {
      result = this.state.ans / value;
    } else {
      result = this.state.ans + value;
    }

    this.setState({ 
      displayValue: result.toString(),
      ans: result.toString()
    }, callback);
  };

  render() {
    const { displayValue, numbers, operators } = this.state;

    return <div className="calculator-container">
      <Display displayValue={displayValue} />
      <Keypad 
        numbers={numbers} 
        operators={operators} 
        addNumber={this.addNumber}
        setOperator={this.setOperator}
        evaluate={this.evaluate}
      />
    </div>
  }
}

export default Calculator;