import React from 'react'

const LoadingSkeleton = () => (
  <div className="flex items-center justify-center h-screen" data-testid="loading">
    <div className="animate-pulse space-y-4 w-60">
      <div className="h-6 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-32 bg-gray-200 rounded" />
    </div>
  </div>
)

export default LoadingSkeleton
