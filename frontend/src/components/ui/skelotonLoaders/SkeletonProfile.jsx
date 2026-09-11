import React from 'react'

function SkeletonProfile() {
  return (
    <div className="glass-panel p-8 mb-8" style={{borderRadius: '6px'}}>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="shimmer h-28 w-28" style={{borderRadius:'2px'}} />
        <div className="flex-1 w-full space-y-3">
          <div className="shimmer h-6 w-40 mx-auto sm:mx-0" style={{borderRadius:'2px'}} />
          <div className="shimmer h-4 w-28 mx-auto sm:mx-0" style={{borderRadius:'2px'}} />
          <div className="shimmer h-3 w-48 mx-auto sm:mx-0" style={{borderRadius:'2px'}} />
        </div>
        <div className="shimmer h-10 w-28" style={{borderRadius:'4px'}} />
      </div>
    </div>
  )
}

export default SkeletonProfile
