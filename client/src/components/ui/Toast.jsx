import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const Toast = ({ type = 'success', message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const types = {
    success: { icon: CheckCircle, color: 'bg-success', border: 'border-success', text: 'text-success' },
    error: { icon: XCircle, color: 'bg-error', border: 'border-error', text: 'text-error' },
    warning: { icon: AlertTriangle, color: 'bg-warning', border: 'border-warning', text: 'text-warning' },
    info: { icon: Info, color: 'bg-info', border: 'border-info', text: 'text-info' },
  };

  const config = types[type] || types.success;
  const Icon = config.icon;

  return (
    <div
      className={`
        bg-white shadow-lg rounded-lg overflow-hidden border-r-4 ${config.border}
        flex items-start p-4 transition-all duration-300 ease-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className={`flex-shrink-0 ${config.text} ml-3`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 w-0">
        <p className="text-sm font-medium text-text-primary">{message}</p>
      </div>
      <div className="ml-4 flex-shrink-0 flex">
        <button
          onClick={handleClose}
          className="bg-white rounded-md inline-flex text-text-muted hover:text-text-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-gold"
        >
          <span className="sr-only">Close</span>
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
