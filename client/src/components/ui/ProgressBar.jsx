import React from 'react';

const ProgressBar = ({ value = 0, color = 'bg-accent-gold', size = 'md', showLabel = false, label }) => {
  const safeValue = Math.min(Math.max(value, 0), 100);
  
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
  };

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1 text-xs font-medium text-text-secondary">
          <span>{label}</span>
          {showLabel && <span>{safeValue}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`${color} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
