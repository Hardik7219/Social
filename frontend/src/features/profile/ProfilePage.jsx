import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Link, useParams } from 'react-router-dom'
import { follow, getUser } from '../../services/user.servive'

function ProfilePage() {
  const { user } = useAuth()
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [otherUser, setOtherUser] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {

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
  const updateProfile = async ()=>{

  }
  return (
    <div>
      username:-{data?.username}
      <p>{data?.name}</p>
      <p>{data?.email}</p>
      <button onClick={() => {
        otherUser ? followToggle() : updateProfile()
      }}>{otherUser ? "follow" : "update"}</button>
      <button>{otherUser ?(<Link to={`/chatsec/${data?._id}`}>message</Link>):""}</button>
    </div>
  )
}

export default ProfilePage
