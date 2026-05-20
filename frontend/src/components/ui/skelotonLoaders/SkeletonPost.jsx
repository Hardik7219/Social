import React from 'react'

function SkeletonPost() {
  return (
    <div className="card-post p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="shimmer h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="shimmer h-4 w-32 rounded" />
          <div className="shimmer h-3 w-20 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="shimmer h-3 w-full rounded" />
        <div className="shimmer h-3 w-4/5 rounded" />
      </div>
      <div className="shimmer h-48 w-full rounded-xl" />
      <div className="flex gap-4 pt-2">
        <div className="shimmer h-8 w-16 rounded-lg" />
        <div className="shimmer h-8 w-20 rounded-lg" />
      </div>
    </div>
  )
}

export default SkeletonPost
