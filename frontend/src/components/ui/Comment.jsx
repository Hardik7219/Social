import React from 'react'
import useAuth from '../../hooks/useAuth'

function Comment({id,username,name,comment}) {
  const {user} = useAuth();
  return (
    <>
      <div className="border ">

        <div className="flex items-center">
          <div className="bg-red-500 h-7 w-7 rounded-full"></div>
          <div>
              {username}
          </div>
        </div>
        <div>
            {comment}
        </div>

      </div>
    </>
  )
}

export default Comment
