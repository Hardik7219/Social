import React, { useEffect, useState } from 'react'
import Post from '../../components/ui/Post'
import { createPost, fetchPosts } from '../../services/post.servive'

function Posts() {
  const [posts,setPosts]= useState()
const [postData,setPostData]= useState({title:"",details:""})
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
      const handleChange = (e) => {

        setPostData({
            ...postData,
            [e.target.name]: e.target.value
        });
    };
  const handleSubmit= async (e)=>{
    e.preventDefault();
    await createPost(postData);
  }
  return (
    <>
      <div>
        <div className='bg-blue-700 h-20 w-20 rounded-full'>
        </div>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='enter title'  name="title" onChange={handleChange}></input>
          <input type='text' placeholder='enter detail' name="details" onChange={handleChange}></input>
          <button type="submit">publish</button>
        </form>
      </div>
      <div>
        {posts && (
          posts.map((e)=>(
            <div key={e._id}>
              <Post  userId={e.userId._id} id={e._id} title={e.title} text={e._detail} username={e.userId.username} name={e.userId.name} comments={e.comments} likes={e.likes}></Post>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Posts
