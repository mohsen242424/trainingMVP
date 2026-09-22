import React from 'react';
import Card from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color = 'blue', trend }) => {
  const colorMap = {
    blue: 'bg-info-bg text-info',
    green: 'bg-success-bg text-success',
    gold: 'bg-warning-bg text-warning',
    red: 'bg-error-bg text-error',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <Card className="flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${colorMap[color] || colorMap.blue}`}>
          {Icon && <Icon size={24} />}
        </div>
        {trend && (
          <div className={`flex items-center text-sm font-medium ${trend > 0 ? 'text-success' : 'text-error'}`}>
            {trend > 0 ? <TrendingUp size={16} className="ml-1" /> : <TrendingDown size={16} className="ml-1" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div>
        <h3 className="text-3xl font-bold text-text-primary mb-1">{value}</h3>
        <p className="text-sm text-text-secondary">{label}</p>
      </div>
    </Card>
  );
};

export default StatCard;
