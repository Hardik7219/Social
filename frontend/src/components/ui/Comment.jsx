
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
      <div className="flex gap-3 p-3 border-2 border-slate-700/50 bg-white/[0.02] hover:border-blue-500/30 transition-all duration-150" style={{borderRadius: '4px', boxShadow: '2px 2px 0 rgba(59, 130, 246, 0.15)'}}>
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="h-12 w-12 rounded-sm object-cover border-2 border-blue-500/50 shrink-0"
            style={{boxShadow: '3px 3px 0 rgba(59,130,246,0.4)'}}
          />
        ) : (
          <div className="avatar-placeholder h-12 w-12  shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          {deleteSure && (
            <div className="absolute z-50 flex flex-col sm:flex-row items-center justify-center gap-2 p-6 bg-slate-950/95 backdrop-blur-md border-2 border-red-500/40" style={{borderRadius: '4px'}}>
              <p className="text-slate-200 text-sm font-black uppercase tracking-wide">Delete this comment?</p>
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
                className="p-2 flex justify-self-end text-slate-500 hover:text-red-400 border-2 border-transparent hover:border-red-500/40 transition-all duration-150 hover:bg-red-500/10"
                style={{borderRadius: '4px'}}
                aria-label="Delete comment"
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
