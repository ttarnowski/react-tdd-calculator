import React from 'react';
import { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

import CalculatorStore from './CalculatorStore';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';

@observer class Calculator extends Component {
  @computed get displayValue() {
    return this.props.store.actualValue;
  }

  render() { 
    return (
      <div className="calculator-container">
        <Display displayValue={this.displayValue} />
        <Keypad 
          numbers={CalculatorStore.AvailableNumbers} 
          operators={CalculatorStore.AvailableOperators} 
          addNumber={this.props.store.addNumber}
          setOperator={this.props.store.setOperator}
        />      
      </div>
    );
  }
}

export default Calculator;