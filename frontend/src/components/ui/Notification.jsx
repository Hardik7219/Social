import { AiOutlineHeart } from 'react-icons/ai'
import { IoPersonAddOutline } from 'react-icons/io5'

function Notification({type,id,from}) {
  return (
    <div>
                <div
                  className="glass-panel rounded-xl p-4 flex items-start gap-4 border border-white/6 hover:border-blue-500/20 transition-all duration-300"
                >
                  <div className="shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-blue-500/15 border border-blue-500/25">
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
                      <span className="font-semibold text-white">{from}</span>
                      {' '}started following you
                    </p>
                  )}
                  </div>
                </div>
    </div>
  )
}

export default Notification
