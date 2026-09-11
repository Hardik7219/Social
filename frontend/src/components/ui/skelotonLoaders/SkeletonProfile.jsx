import React from 'react'

function SkeletonProfile() {
  return (
    <div className="glass-panel p-8 mb-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="shimmer h-24 w-24 rounded-full" />
        <div className="flex-1 w-full space-y-3">
          <div className="shimmer h-5 w-36 rounded-md mx-auto sm:mx-0" />
          <div className="shimmer h-4 w-24 rounded-md mx-auto sm:mx-0" />
          <div className="shimmer h-3 w-48 rounded-md mx-auto sm:mx-0" />
        </div>
        <div className="shimmer h-9 w-24 rounded-lg" />
      </div>
    </div>
  )
}

export default SkeletonProfile
