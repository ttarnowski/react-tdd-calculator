import React from 'react';
import PropTypes from 'prop-types';

import './Key.css';

const Key = ({ keyValue, keyType, action = () => {} }) => (
  <div 
    className={`key-container ${keyType}`}
    onClick={() => action(keyValue)}
  >
    <p className="key-value">{keyValue}</p>
  </div>
);

Key.propTypes = {
  keyValue: PropTypes.string.isRequired,
  keyType: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};

export default Key;