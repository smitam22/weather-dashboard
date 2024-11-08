import React from 'react';
import './tooltip.css';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="tooltip-wrapper">
      {children}
      <div className="tooltip">{text}</div>
    </div>
  );
};

export default Tooltip;
