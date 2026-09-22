import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({
  label,
  error,
  icon: Icon,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
  dir = 'rtl',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label className="text-sm font-medium text-text-primary mb-1.5 flex items-center">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-muted">
            <Icon size={18} />
          </div>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          dir={dir}
          required={required}
          className={`
            w-full h-[44px] rounded-lg border px-3.5 text-sm transition-all duration-180
            bg-white text-text-primary placeholder:text-text-muted
            focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20
            ${Icon ? 'pr-10' : ''}
            ${isPassword ? 'pl-10' : ''}
            ${error ? 'border-error focus:border-error focus:ring-error/20' : 'border-border'}
          `}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted hover:text-text-primary transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <span className="text-xs text-error mt-1">{error}</span>
      )}
    </div>
  );
};

export default Input;
