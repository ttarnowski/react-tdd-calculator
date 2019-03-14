import React from 'react';
import PropTypes from 'prop-types';
import Key from '../Key/Key';
import CalculatorStore from '../Calculator/CalculatorStore';

import './Keypad.css';

const Keypad = ({ 
  numbers = [], 
  operators = [], 
  setOperator, 
  addNumber
}) => {
  const numberKeys = numbers.map(
    number => <Key 
      action={addNumber}
      keyType={'number-key'} 
      keyValue={number} 
      key={number} 
    />
  );

  const operatorKeys = operators
    .filter(operator => operator !== CalculatorStore.Operator.EQUALS)
    .map(
      operator => <Key 
        action={setOperator}
        keyType={'operator-key'} 
        keyValue={operator}
        key={operator} 
      />
    );
  
  return (
    <div className="keypad-container">
      <div className="numbers-container">{numberKeys}</div>
      <div className="operators-container">{operatorKeys}</div>
      <div className="submit-container">
        <Key action={setOperator} keyType={'submit-key'} keyValue={CalculatorStore.Operator.EQUALS}/>
      </div>
    </div>
  );
};

Keypad.propTypes = {
  numbers: PropTypes.array.isRequired,
  operators: PropTypes.array.isRequired
};

export default Keypad;