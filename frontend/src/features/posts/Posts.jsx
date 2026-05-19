import React, { useEffect, useState } from 'react'
import Post from '../../components/ui/Post'
import { fetchPosts } from '../../services/post.servive'

function Posts() {
  const [posts,setPosts]= useState()
  useEffect(()=>{
    const fetch = async ()=>{
      const data =  await fetchPosts()
      if(data)
      {
        setPosts(data);
      }
    }
    fetch();
    
  },[])
  return (
    <>
      <div>
        <div className='bg-blue-700 h-20 w-20 rounded-full'>
        </div>
        <form>
          <input type='text' placeholder='enter text'></input>
          <button>publish</button>
        </form>
      </div>
      <div>
        {posts && (
          posts.map((e)=>(
            <div key={e._id}>
              <Post  userId={e.userId._id} id={e._id} text={e._detail} username={e.userId.username} name={e.userId.username} comments={e.comments} likes={e.likes}></Post>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Posts
