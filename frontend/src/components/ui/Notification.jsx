import { AiOutlineHeart } from 'react-icons/ai'
import { IoPersonAddOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

function Notification({type,id,from}) {
  return (
    <div>
                <div
                  className="glass-panel p-4 flex items-start gap-4 border border-white/[0.06] hover:border-white/[0.1] transition-all duration-200"
                >
                  <div className="shrink-0 h-9 w-9 rounded-lg flex items-center justify-center bg-white/[0.05] border border-white/[0.07]">
                    {type=="like" ? (
                      <AiOutlineHeart className="text-blue-400 text-base" />
                    ) : (
                      <IoPersonAddOutline className="text-slate-400 text-base" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                  {type=="like" && (
                    <p className="text-slate-200 text-sm leading-relaxed">
                      <span className="font-semibold text-white">{from}</span>
                      {' '}liked your post
                    </p>
                  )}
                  {type=="follow" &&(
                    <p className="text-slate-200 text-sm leading-relaxed">
                      <span className="font-semibold text-white">
                        <Link
                            to={`/profile/${id}`}
                            className="font-semibold text-white hover:text-cyan-300 transition-colors truncate block"
                        >{from}</Link></span>
                      {' '}started following you
                    </p>  
                  )}
                  </div>
                </div>
    </div>
  )
}

export default Notification
