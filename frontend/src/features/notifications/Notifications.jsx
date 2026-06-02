import { useEffect } from 'react'
import { deleteNotifications, getNotifications } from '../../services/notification.servive'
import { useState } from 'react'
import { IoNotificationsOutline } from 'react-icons/io5';
import Notification from '../../components/ui/Notification';

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
          <div key={e._id}>
            <Notification type={e.type} id={e._id} from={e.from.username}></Notification>
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
