import React from 'react';

const Card = ({ children, className = '', hover = false, onClick, padding = 'p-6' }) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-surface rounded-lg shadow-sm border border-border
        ${padding}
        ${hover ? 'card-hover cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
