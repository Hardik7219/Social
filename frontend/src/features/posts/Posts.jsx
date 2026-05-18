import React from 'react'
import Post from '../../components/ui/Post'

function Posts() {
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
        <Post></Post>
      </div>
    </>
  )
}

export default Posts
