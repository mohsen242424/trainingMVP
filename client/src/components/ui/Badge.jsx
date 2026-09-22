import React from 'react';

const Badge = ({ variant = 'info', children, pulse = false, className = '' }) => {
  const variants = {
    success: 'bg-success-bg text-success',
    warning: 'bg-warning-bg text-warning',
    error: 'bg-error-bg text-error',
    info: 'bg-info-bg text-info',
    'coming-soon': 'bg-coming-soon-bg text-coming-soon-text',
    pending: 'bg-warning-bg text-warning',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${pulse ? 'animate-pulse' : ''} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
