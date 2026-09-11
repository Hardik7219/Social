import React from 'react'

function SkeletonPost() {
  return (
    <div className="card-post p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="shimmer h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="shimmer h-3.5 w-28 rounded-md" />
          <div className="shimmer h-3 w-20 rounded-md" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="shimmer h-3 w-full rounded-md" />
        <div className="shimmer h-3 w-4/5 rounded-md" />
      </div>
      <div className="shimmer h-44 w-full rounded-lg" />
      <div className="flex gap-4 pt-1">
        <div className="shimmer h-7 w-14 rounded-md" />
        <div className="shimmer h-7 w-18 rounded-md" />
      </div>
    </div>
  )
}

export default SkeletonPost
