import React from 'react'

function SkeletonProfile() {
  return (
    <div className="glass-panel rounded-2xl p-8 mb-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="shimmer h-28 w-28 rounded-full" />
        <div className="flex-1 w-full space-y-3">
          <div className="shimmer h-6 w-40 rounded mx-auto sm:mx-0" />
          <div className="shimmer h-4 w-28 rounded mx-auto sm:mx-0" />
          <div className="shimmer h-3 w-48 rounded mx-auto sm:mx-0" />
        </div>
        <div className="shimmer h-10 w-28 rounded-xl" />
      </div>
    </div>
  )
}

export default SkeletonProfile
