import React from 'react'
import { useEffect } from 'react'
import { oldChatUsers } from '../../services/chat.service'
import { useState } from 'react'
import { Link } from 'react-router-dom';

function Chat() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await oldChatUsers();
      setData(res.users)
    }
    fetchUser();
  })
  return (
    <>
      <div className="animate-fade-in">
        <div className="mb-6">
          <p className="section-subtitle mb-1">Messages</p>
          <h2 className="section-title">Your conversations</h2>
        </div>

        <div className='flex flex-col gap-2 stagger-children'>
          {data && (
            data.map((e) => (
              <Link
                key={e._id}
                to={`/chatsec/${e._id}`}
                className="suggestion-card flex items-center gap-4 group"
              >
                <div className="avatar-placeholder h-12 w-12 shrink-0 group-hover:scale-105 transition-transform duration-300" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white truncate group-hover:text-cyan-300 transition-colors">
                    {e.name}
                  </p>
                  <p className="text-sm text-slate-500 truncate">@{e.username}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Chat
