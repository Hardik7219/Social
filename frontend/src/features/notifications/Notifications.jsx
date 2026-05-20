import React from 'react'
import { useEffect } from 'react'
import { deleteNotifications, getNotifications } from '../../services/notification.servive'
import { useState } from 'react'

function Notifications() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getNotifications();
      setData(res)
    }
    fetchNotifications();
  }, [])
  const deleteNo = async ()=>{
    await deleteNotifications();
  }
  return (
    <div>
      <div>
        <button onClick={deleteNo}>delete all notifications</button>
      </div>
      {data && (
        data.map((e) => (
          <div key={e._id} className='border'>
            {e.type=="like" && (
              <p>{e.from.username} liked your post</p>
            )}
            {e.type=="follow" &&(
              <p>{e.from.username} is stated following you</p>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default Notifications
