import React from 'react'
import { useEffect } from 'react'
import { deleteNotifications, getNotifications } from '../../services/notification.servive'
import { useState } from 'react'
import { IoNotificationsOutline } from 'react-icons/io5';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoPersonAddOutline } from 'react-icons/io5';

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
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="section-subtitle mb-1">Inbox</p>
          <h2 className="section-title">Notifications</h2>
        </div>
        <button onClick={deleteNo} className="btn-ghost text-xs shrink-0">
          Clear all
        </button>
      </div>

      <div className="flex flex-col gap-3 stagger-children">
      {data && (
        data.map((e) => (
          <div
            key={e._id}
            className="glass-panel rounded-xl p-4 flex items-start gap-4 border border-white/[0.06] hover:border-blue-500/20 transition-all duration-300"
          >
            <div className="shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-blue-500/15 border border-blue-500/25">
              {e.type=="like" ? (
                <AiOutlineHeart className="text-cyan-400 text-lg" />
              ) : (
                <IoPersonAddOutline className="text-blue-400 text-lg" />
              )}
            </div>
            <div className="flex-1 min-w-0">
            {e.type=="like" && (
              <p className="text-slate-200 text-sm leading-relaxed">
                <span className="font-semibold text-white">{e.from.username}</span>
                {' '}liked your post
              </p>
            )}
            {e.type=="follow" &&(
              <p className="text-slate-200 text-sm leading-relaxed">
                <span className="font-semibold text-white">{e.from.username}</span>
                {' '}started following you
              </p>
            )}
            </div>
          </div>
        ))
      )}

      {data && data.length === 0 && (
        <div className="glass-panel rounded-2xl p-12 text-center">
          <IoNotificationsOutline className="text-4xl text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">No notifications yet</p>
        </div>
      )}
      </div>
    </div>
  )
}

export default Notifications
