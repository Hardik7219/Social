import React, { useEffect, useState } from 'react'
import Post from '../../components/ui/Post'
import { createPost, fetchPosts } from '../../services/post.servive'
import { useRef } from 'react'

import { FaRegImage } from "react-icons/fa6";


function Posts() {
  const [posts, setPosts] = useState()
  const [postData, setPostData] = useState({ title: "" })
  const imageRef= useRef();
  const [loading,setLoading] = useState();
  useEffect(() => {
    const fetch = async () => {
      const data = await fetchPosts()
      if (data) {
        setPosts(data);
      }
    }
    fetch();

  }, [])

  const handleChange = (e) => {

    setPostData({
      ...postData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost(postData);
  }
  return (
    <>
      <div className='flex bg-gray-700 rounded-lg justify-center items-center mb-10 p-5 gap-2'>
        <div>
          <div className='bg-blue-700 h-20 w-20 rounded-full'></div>
        </div>
        <form onSubmit={handleSubmit} className='flex gap-2 flex-col bg-gray-800  rounded-tl-3xl p-5'>
          <div>
            <textarea placeholder='enter details..' className="px-4 py-2 outline-none w-150 text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]" name="title" onChange={handleChange}></textarea>
          </div>
          <div className='flex gap-10 '>
            <div className='flex justify-center items-center'>
              <button onClick={() => imageRef.current.click()}><FaRegImage></FaRegImage></button>
              <input type="file" ref={imageRef} className='hidden'></input>
            </div>
            <div className='flex justify-center items-center'>
              <button type="submit" className='bg-blue-500 p-2 rounded-md'>publish</button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {posts && (
          posts.map((e) => (
            <div key={e._id}>
              <Post userId={e.userId._id} id={e._id} title={e.title} text={e._detail} username={e.userId.username} name={e.userId.name} comments={e.comments} likes={e.likes}></Post>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Posts
