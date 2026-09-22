import React from 'react';
import Button from './Button';

const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      {Icon && (
        <div className="text-text-muted mb-4 bg-gray-50 p-4 rounded-full">
          <Icon size={48} strokeWidth={1.5} />
        </div>
      )}
      <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary mb-6 max-w-sm">{description}</p>
      {action && (
        <Button onClick={action.onClick} variant="primary">
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
