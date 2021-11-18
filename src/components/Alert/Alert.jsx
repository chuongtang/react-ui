import React from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = ({ title, type }) => {
  return (
    <div className={`alert-wrapper ${type}`}>
    <h2>{title}</h2>

  </div>
  )
}

Alert.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element), 
    PropTypes.element.isRequired
  ]),
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default Alert;