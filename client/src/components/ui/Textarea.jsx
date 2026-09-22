import React from 'react';

const Textarea = ({
  label,
  error,
  value,
  onChange,
  placeholder,
  minLength,
  showCount = false,
  rows = 4,
  className = '',
}) => {
  const currentLength = value?.length || 0;
  const isBelowMin = minLength && currentLength > 0 && currentLength < minLength;
  const isMetMin = minLength && currentLength >= minLength;

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label className="text-sm font-medium text-text-primary mb-1.5 flex items-center">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full rounded-lg border p-3.5 text-sm transition-all duration-180 resize-y
          bg-white text-text-primary placeholder:text-text-muted
          focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20
          ${error ? 'border-error focus:border-error focus:ring-error/20' : 'border-border'}
        `}
      />
      
      <div className="flex justify-between items-start mt-1">
        <div className="flex-1">
          {error && <span className="text-xs text-error">{error}</span>}
        </div>
        {showCount && (
          <span className={`text-xs ${isBelowMin ? 'text-error' : isMetMin ? 'text-success' : 'text-text-muted'}`}>
            {currentLength} {minLength ? `/ ${minLength}` : ''}
          </span>
        )}
      </div>
    </div>
  );
};

export default Textarea;
