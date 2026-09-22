import React from 'react';

const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex border-b border-border gap-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`
            relative pb-3 text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2
            ${activeTab === tab.key 
              ? 'text-accent-gold' 
              : 'text-text-secondary hover:text-text-primary'
            }
          `}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.key ? 'bg-accent-gold/10 text-accent-gold' : 'bg-gray-100 text-text-secondary'
            }`}>
              {tab.count}
            </span>
          )}
          {activeTab === tab.key && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold rounded-t-full" />
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
