import React from 'react';

const Select = ({
  label,
  options = [],
  value,
  onChange,
  placeholder,
  error,
  className = '',
  name,
  id,
  ...props
}) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label className="text-sm font-medium text-text-primary mb-1.5" htmlFor={id || name}>
          {label}
        </label>
      )}
      <select
        id={id || name}
        name={name}
        value={value}
        onChange={handleChange}
        {...props}
        className={`
          w-full h-[44px] rounded-lg border px-3.5 text-sm transition-all duration-180
          bg-white text-text-primary
          focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20
          ${error ? 'border-error focus:border-error focus:ring-error/20' : 'border-border'}
        `}
      >
        {placeholder && (
          <option value="" disabled className="text-text-muted">
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled} className={opt.disabled ? 'text-text-muted' : ''}>
            {opt.label} {opt.disabled ? '(قريباً)' : ''}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs text-error mt-1">{error}</span>
      )}
    </div>
  );
};

export default Select;
