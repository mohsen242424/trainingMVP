import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchInput = ({ value, onChange, placeholder = 'بحث...' }) => {
  const [localValue, setLocalValue] = useState(value || '');

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onChange && localValue !== value) {
        onChange(localValue);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [localValue, onChange, value]);

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-muted">
        <Search size={18} />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full h-10 bg-gray-50 border border-transparent focus:bg-white focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 rounded-full py-2 pr-10 pl-4 text-sm text-text-primary placeholder:text-text-muted transition-all outline-none"
      />
    </div>
  );
};

export default SearchInput;
