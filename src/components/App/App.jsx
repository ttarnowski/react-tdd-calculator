import React from 'react';
import { Component } from 'react'
import Calculator from '../Calculator/Calculator';
import CalculatorStore from '../Calculator/CalculatorStore';
import DevTools from 'mobx-react-devtools';

import './App.css';

class App extends Component { 
  render() {
    return (
      <div className="app-container">
        <Calculator store={new CalculatorStore()}/>
        {process.env.NODE_ENV === 'development' ? <DevTools /> : ''}
      </div>  
    );
  }
}

export default App;