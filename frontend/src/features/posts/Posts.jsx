import { useState } from 'react'
import Post from '../../components/ui/Post'
import { createPost, fetchPosts } from '../../services/post.servive'
import { useRef } from 'react'

import { FaRegImage } from "react-icons/fa6";
import { FaCode } from "react-icons/fa6";


import { useQuery } from "@tanstack/react-query";

import SkeletonPost from '../../components/ui/skelotonLoaders/SkeletonPost';
import useAuth from '../../hooks/useAuth';

function Posts() {
  // const [posts, setPosts] = useState()
  const [title, setTitle] = useState("");
  const imageRef = useRef();
  const [img, setImg] = useState(null)
  const [showCode, setShowCode] = useState(false)
  const [code,setCode] = useState("")
  const { user } = useAuth();
  const {
    data: posts,
    isLoading,
    error
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts
  })
  if (error) {
    return <h1>error</h1>
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title)
    if(!code) formData.append('img', img)
    else formData.append('code',code)
    await createPost(formData);
    setTitle("");
    setImg(null);
    setCode("")
  }

  const handleImgChange = (e) => {
    setCode("")
    const file = e.target.files[0];
    if (file) {

      setImg(file);
    }
  };

  return (
    <>
      <div className='flex glass-panel rounded-2xl items-start mb-8 p-5 sm:p-6 gap-4 neon-ring animate-fade-in-up'>
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-14 w-14  rounded-full object-cover border border-blue-500/30 neon-ring shrink-0"
          />
        ) : (
          <div className="avatar-placeholder h-14 w-14  shrink-0" />
        )}
        <form onSubmit={handleSubmit} className='flex flex-1 min-w-0 gap-4 flex-col'>
          <div className="w-full">
            <textarea
              placeholder="What's on your mind?"
              className="input-field min-h-25 resize-none text-base"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {img && (
            <p className="text-xs text-cyan-400/90 font-medium truncate">
              Image selected: {img.name}
            </p>
          )}
          <div className='flex items-center justify-between gap-4 pt-1'>
            <div className='flex items-center gap-2'>
              <button
                type="button"
                onClick={() => imageRef.current.click()}
                className="btn-ghost p-2.5"
                aria-label="Add image"
              >
                <FaRegImage className="text-lg text-cyan-400" />
              </button>
              <input type='file' accept='image/*' hidden ref={imageRef} onChange={handleImgChange} />
              <button className="btn-ghost p-2.5" onClick={()=>setShowCode(true)}><FaCode></FaCode></button>
            </div>
            <button type="submit" className='btn-primary px-6'>
              Publish
            </button>
          </div>
        </form>
      </div>
      {isLoading && (
        <div>
          <SkeletonPost></SkeletonPost>
          <SkeletonPost></SkeletonPost>
          <SkeletonPost></SkeletonPost>
        </div>
      )}
      <div className="stagger-children">
        {posts && (
          posts.map((e) => (
            <div key={e._id}>
              <Post post={e}></Post>
            </div>
          ))
        )}
      </div>
      {showCode && (
        <div className='bg-amber-400 w-full z-50 absolute flex top-100'>
          <div>
            <button onClick={()=>setShowCode(false)}>close</button>
            <textarea onChange={(e)=>setCode(e.target.value)}></textarea>
          </div>
        </div>
      )}
    </>
  )
}

export default Posts
