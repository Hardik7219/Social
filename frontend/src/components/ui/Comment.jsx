import React from 'react'
import useAuth from '../../hooks/useAuth'

function Comment({id,username,name,comment}) {
  const {user} = useAuth();
  return (
    <>
      <div className="flex gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:border-blue-500/15 transition-colors duration-300">

        <div className="avatar-placeholder h-8 w-8 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-medium text-sm text-white">{username}</span>
            {name && (
              <span className="text-xs text-slate-500">{name}</span>
            )}
          </div>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed break-words">
            {comment}
          </p>
        </div>

      </div>
    </>
  )
}

export default Comment
