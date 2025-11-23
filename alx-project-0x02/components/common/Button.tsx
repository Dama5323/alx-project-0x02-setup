import React from 'react';
import { type ButtonProps } from '../../interfaces'; 

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  size = 'medium',
  shape = 'rounded-md',
  variant = 'primary',
  disabled = false,
  className = '',
}) => {
  // Base styles for all buttons
  const baseStyles = 'font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Size styles
  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  // Variant styles
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-sm hover:shadow-md',
    outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
  };

  // Combine all styles
  const buttonStyles = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${shape}
    ${variantStyles[variant]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles}
    >
      {children}
    </button>
  );
};

export default Button;