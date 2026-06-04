
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { HiOutlineTrash } from 'react-icons/hi';
import { useState } from 'react';
import { deleteComment } from '../../services/post.servive';

function Comment({ id, username, name, commentId, postId, comment, time, avatar }) {
  const { user } = useAuth();
  const [deleteSure, setDeleteSure] = useState(false)
  const otherUser = id !== user?._id;
  const [deleting,setDeleting]= useState(false)
  const handleDelete= async ()=>{
    try {
      setDeleting(true)
      await deleteComment(commentId , postId);
      setDeleting(false)
      setDeleteSure(false)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="flex gap-3 p-3 rounded-xl bg-white/3 border border-white/4 hover:border-blue-500/15 transition-colors duration-300 ">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="h-12 w-12  rounded-full object-cover border border-blue-500/30 neon-ring shrink-0"
          />
        ) : (
          <div className="avatar-placeholder h-12 w-12  shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          {deleteSure && (
            <div className="absolute  z-50 flex flex-col sm:flex-row items-center justify-center gap-2 p-6 rounded-2xl bg-slate-950/90 backdrop-blur-md">
              <p className="text-slate-300 text-sm font-medium">Delete this comment?</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteSure(false)} className="btn-ghost">Cancel</button>
                <button className="btn-danger" onClick={handleDelete}>{deleting ? ("Deleting..") :("Delete")}</button>
              </div>
            </div>
          )}
          <div className='flex items-center w-full justify-between'>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-medium text-sm text-white"><Link to={`/profile/${id}`}>{username}</Link></span>
              {name && (
                <span className="text-xs text-slate-500">{name}</span>
              )}
            </div>
            {!otherUser && (
              <button
                onClick={() => setDeleteSure(true)}
                className="p-2 rounded-lg flex justify-self-end text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
                aria-label="Delete post"
              >
                <HiOutlineTrash className="text-lg" />
              </button>
            )}
          </div>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed wrap-break-word">
            {comment}
          </p>
        </div>
      </div>
    </>
  )
}

export default Comment
