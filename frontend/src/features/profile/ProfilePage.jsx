import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Link, useParams } from 'react-router-dom'
import { follow, getUser } from '../../services/user.servive'
import { getUserPost } from '../../services/post.servive'
import Post from '../../components/ui/Post'

function ProfilePage() {
  const { user } = useAuth()
  const { id } = useParams()
  const [data, setData] = useState()
  const [post, setPost] = useState();
  const [otherUser, setOtherUser] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const r = await getUserPost(id)
      setPost(r)
      if (id === user._id) {
        setData(user)
      } else {
        const res = await getUser(id);

        setData(res)
        setOtherUser(true)
      }
    }
    fetchUser();

  }, [])
  const followToggle = async () => {
    await follow(id)
  }
  const updateProfile = async () => {

  }
  return (
    <div className="min-h-screen max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {data && (
        <header className="glass-panel rounded-2xl p-6 sm:p-8 mb-8 neon-ring">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="avatar-placeholder h-24 w-24 sm:h-28 sm:w-28" />
            <div className="flex-1 text-center sm:text-left min-w-0">
              <h1 className="text-2xl font-bold text-white truncate">{data.username}</h1>
              <p className="text-slate-400 mt-1">{data.name}</p>
              <p className="text-sm text-slate-500 mt-2 truncate">{data.email}</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-end shrink-0">
              <button
                onClick={() => {
                  otherUser ? followToggle() : updateProfile()
                }}
                className="btn-primary"
              >
                {otherUser ? "Follow" : "Update profile"}
              </button>
              {otherUser && (
                <Link to={`/chatsec/${data?._id}`} className="btn-ghost">
                  Message
                </Link>
              )}
            </div>
          </div>
        </header>
      )}

      <section>
        <p className="section-subtitle mb-2">Activity</p>
        <h2 className="section-title mb-6">Posts</h2>
        <div className='stagger-children'>
        {post && (
          post.map((e) => (
            <div key={e._id}>
              <Post userId={e.userId} id={e._id} title={e.title} text={e._detail} username={data?.username} img={e.img} name={e.userId.name} comments={e.comments} likes={e.likes}></Post>
            </div>
          ))
        )}
        </div>
      </section>
    </div>
  )
}

export default ProfilePage
