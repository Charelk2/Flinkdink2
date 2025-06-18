import React from 'react'
import Skeleton from './Skeleton'

const LoadingSkeleton = () => (
  <div
    className="flex items-center justify-center h-screen"
    data-testid="loading"
    role="status"
    aria-busy="true"
  >
    <div className="space-y-4 w-60">
      <Skeleton className="h-6" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-32" />
    </div>
  </div>
)

export default LoadingSkeleton
