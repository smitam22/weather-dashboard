import React from "react";

interface ButtonProps {
  onClick: () => void;
  label: string;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, icon }) => (
  <button onClick={onClick} className="btn btn-primary primary-btn">
    {icon && <i className={icon}></i>} {/* Render icon if provided */}
    {label}
  </button>
)

export default Button;