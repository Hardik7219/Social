
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
      <div className="flex gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.08] transition-colors duration-200">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="h-8 w-8 rounded-full object-cover border border-white/[0.1] shrink-0"
          />
        ) : (
          <div className="avatar-placeholder h-12 w-12  shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          {deleteSure && (
            <div className="absolute z-50 flex flex-col sm:flex-row items-center justify-center gap-2 p-6 rounded-xl bg-slate-950/95 backdrop-blur-md border border-white/[0.08]">
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
                className="p-1.5 rounded-md text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                aria-label="Delete comment"
              >
                <HiOutlineTrash className="text-sm" />
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
