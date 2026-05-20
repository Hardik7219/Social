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
      <div className='flex'>
        <div className='bg-amber-500 w-full h-screen'>
          {data && (
            data.map((e) => (
              <div key={e._id} className='border'>
                <p><Link to={`/chatsec/${e._id}`}>{e.name}</Link></p>
                <p>{e.username}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Chat
