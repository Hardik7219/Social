import { AiOutlineHeart } from 'react-icons/ai'
import { IoPersonAddOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

function Notification({type,id,from}) {
  return (
    <div>
                <div
                  className="glass-panel p-4 flex items-start gap-4 border-2 border-blue-500/30 hover:border-blue-500/55 transition-all duration-150"
                  style={{borderRadius: '4px', boxShadow: '3px 3px 0 rgba(59,130,246,0.3)'}}
                >
                  <div className="shrink-0 h-10 w-10 flex items-center justify-center bg-blue-500/15 border-2 border-blue-500/40" style={{borderRadius: '4px', boxShadow: '2px 2px 0 rgba(59,130,246,0.4)'}}>
                    {type=="like" ? (
                      <AiOutlineHeart className="text-cyan-400 text-lg" />
                    ) : (
                      <IoPersonAddOutline className="text-blue-400 text-lg" />
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
