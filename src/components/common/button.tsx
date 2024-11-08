import React from 'react';
import Tooltip from './tooltip/tooltip';

interface ButtonProps {
  onClick: () => void;
  label?: string;
  icon?: string;
  tooltipText?: string; // Tooltip text to be passed to Tooltip component
}

const Button: React.FC<ButtonProps> = ({ onClick, label, icon, tooltipText }) => {
  const button = (
    <button onClick={onClick} className="btn btn-primary primary-btn">
      {icon && <i className={icon}></i>}
      {label && <span>{label}</span>}
    </button>
  );

  return (
    // Render Tooltip only if tooltipText is provided
    tooltipText ? (
      <Tooltip text={tooltipText}>{button}</Tooltip>
    ) : (
      button // If no tooltipText, render the button without Tooltip
    )
  );
};

export default Button;
