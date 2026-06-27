import React from 'react';
import './Button.css';

const Button = ({ label, onClick, className, type = 'button', disabled = false, color = 'default'}) => {
  return (
    <button
      type={type}
      className={`learn-more-btn ${color}`}
      //className="button button-primary"
      onClick={onClick}
      disabled={disabled}
      
    >
      {label}
    </button>
  );
};

export default Button;
