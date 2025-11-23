import React from 'react';
import { type CardProps } from '../../interfaces';

const Card: React.FC<CardProps> = ({ 
  title, 
  content, 
  variant = 'default',
  className = ''
}) => {
  // Base styles for the card
  const baseStyles = "rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg";
  
  // Variant-specific styles
  const variantStyles = {
    default: "bg-white border border-gray-200",
    primary: "bg-blue-50 border border-blue-200",
    secondary: "bg-gray-50 border border-gray-300"
  };

  // Title color based on variant
  const titleColors = {
    default: "text-gray-800",
    primary: "text-blue-700",
    secondary: "text-gray-700"
  };

  // Content color based on variant
    const contentColors = {
    default: "text-gray-600",
    primary: "text-blue-600",
    secondary: "text-gray-600"
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      <h3 className={`text-xl font-semibold mb-3 ${titleColors[variant]}`}>
        {title}
      </h3>
      <p className={`leading-relaxed ${contentColors[variant]}`}>
        {content}
      </p>
    </div>
  );
};

export default Card;