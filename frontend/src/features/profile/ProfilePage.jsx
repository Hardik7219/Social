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
    <div>
      {data && (
        <div>
          <p>{data.username}</p>
          <p>{data.name}</p>
          <p>{data.email}</p>
        </div>
      )}
      <button onClick={() => {
        otherUser ? followToggle() : updateProfile()
      }}>{otherUser ? "follow" : "update"}</button>
      <button>{otherUser ? (<Link to={`/chatsec/${data?._id}`}>message</Link>) : ""}</button>
      <div className='h-auto p-1 w-full'>
        {post && (
          post.map((e) => (
            <div key={e._id}>
              <Post userId={e.userId} id={e._id} title={e.title} text={e._detail} username={data?.username} img={e.img} name={e.userId.name} comments={e.comments} likes={e.likes}></Post>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ProfilePage
