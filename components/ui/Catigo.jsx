import React from 'react';

export default function Catigo({ doct, className }) {
  return (
    <div className={className}>
      <img
        src={`/assets/icons/${doct}.svg`}
        alt={doct}
        className="w-8 h-8  transition-transform duration-200 group-hover:scale-110"
      />
      <p className="text-blue-600 text-sm font-medium group-hover:text-blue-700">
        {doct.charAt(0).toUpperCase() + doct.slice(1)}
      </p>
    </div>
  );
}
