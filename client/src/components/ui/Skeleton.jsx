import React from 'react';

export const SkeletonText = ({ className = '' }) => (
  <div className={`skeleton-loader h-4 rounded ${className}`} />
);

export const SkeletonAvatar = ({ className = '' }) => (
  <div className={`skeleton-loader rounded-full ${className}`} />
);

export const SkeletonCard = ({ className = '' }) => (
  <div className={`p-6 bg-white rounded-lg border border-border ${className}`}>
    <SkeletonAvatar className="w-12 h-12 mb-4" />
    <SkeletonText className="w-3/4 mb-2 h-5" />
    <SkeletonText className="w-1/2 mb-4 h-4" />
    <div className="space-y-2">
      <SkeletonText className="w-full" />
      <SkeletonText className="w-full" />
      <SkeletonText className="w-4/5" />
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5, className = '' }) => (
  <div className={`bg-white rounded-lg border border-border overflow-hidden ${className}`}>
    <div className="bg-gray-50 px-6 py-4 border-b border-border flex gap-4">
      <SkeletonText className="w-1/4 h-4" />
      <SkeletonText className="w-1/4 h-4" />
      <SkeletonText className="w-1/4 h-4" />
      <SkeletonText className="w-1/4 h-4" />
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="px-6 py-4 border-b border-border flex gap-4">
        <SkeletonText className="w-1/4 h-4" />
        <SkeletonText className="w-1/4 h-4" />
        <SkeletonText className="w-1/4 h-4" />
        <SkeletonText className="w-1/4 h-4" />
      </div>
    ))}
  </div>
);

export default { SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTable };
