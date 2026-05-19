import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useParams } from 'react-router-dom'
import { getUser } from '../../services/user.servive'

function ProfilePage() {
  const { user } = useAuth()
  const {id} = useParams()
  const [data,setData] = useState(null)
  const [otherUser,setOtherUser] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      
      if(id === user._id) {
        console.log("hello");
        setData(user)
      }else
      {
        const res=await getUser(id);
        setData(res)
        setOtherUser(true)
      }
    }
    fetchUser();

  }, [])
  return (
    <div>
      username:-{data?.username}
      <p>{data?.name}</p>
      <p>{data?.email}</p>
      <button>{otherUser ?"follow":"update"}</button>
    </div>
  )
}

export default ProfilePage
