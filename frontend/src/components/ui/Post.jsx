import { useState } from "react"
import Comment from "./Comment";
import useAuth from "../../hooks/useAuth";
import { addComment, deletePost, likePost } from "../../services/post.servive";
import { Link } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";

function Post({ userId, id, title, username, img, name, comments, likes }) {
    const [showComments, setShowComments] = useState(false);
    const { user } = useAuth();
    const [c, setC] = useState();
    const [deleteSure, setDeleteSure] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        await addComment(id, c)
    }
    const toggleLike = async () => {
        await likePost(id);
    }
    const deletePosts = async () => {
        await deletePost(id);
        setDeleteSure(false)
    }
    return (
        <>
            <article className="card-post">
                {deleteSure && (
                    <div className="absolute inset-0 z-50 flex flex-col sm:flex-row items-center justify-center gap-3 p-6 rounded-2xl bg-slate-950/90 backdrop-blur-md">
                        <p className="text-slate-300 text-sm font-medium">Delete this post?</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteSure(false)} className="btn-ghost">Cancel</button>
                            <button onClick={deletePosts} className="btn-danger">Delete</button>
                        </div>
                    </div>
                )}

                <header className="flex items-center gap-3 p-5 pb-3">
                    <div className="avatar-placeholder h-12 w-12" />
                    <div className="flex-1 min-w-0">
                        <Link
                            to={`/profile/${userId}`}
                            className="font-semibold text-white hover:text-cyan-300 transition-colors truncate block"
                        >
                            {username}
                        </Link>
                        {name && (
                            <p className="text-xs text-slate-500 truncate">{name}</p>
                        )}
                    </div>
                    {user._id == userId && (
                        <button
                            onClick={() => setDeleteSure(true)}
                            className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
                            aria-label="Delete post"
                        >
                            <HiOutlineTrash className="text-lg" />
                        </button>
                    )}
                </header>

                <div className="px-5 pb-4">
                    <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{title}</p>
                </div>

                {img && (
                    <div className="mx-5 mb-4 rounded-xl overflow-hidden border border-white/[0.06] bg-black/40">
                        <img
                            src={img}
                            className='w-full max-h-96 object-contain'
                            alt=''
                        />
                    </div>
                )}

                <footer className="px-5 py-3 border-t border-white/[0.06] flex items-center gap-6">
                    <button
                        onClick={toggleLike}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-300 group"
                    >
                        <AiOutlineLike className="text-lg group-hover:scale-110 transition-transform" />
                        <span className="font-medium">{likes?.length ?? 0}</span>
                        <span className="hidden sm:inline">Likes</span>
                    </button>
                    <button
                        onClick={() => setShowComments(current => !current)}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors duration-300 group"
                    >
                        <BiCommentDetail className="text-lg group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Comments</span>
                    </button>
                </footer>

                {showComments && (
                    <div className="border-t border-white/[0.06] bg-white/[0.02] p-5 space-y-4 animate-fade-in">
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <input
                                type='text'
                                onChange={(e) => setC(e.target.value)}
                                placeholder='Write a comment...'
                                className="input-field flex-1 py-2.5 text-sm"
                            />
                            <button type="submit" className="btn-primary shrink-0 px-4 py-2.5 text-sm">
                                Post
                            </button>
                        </form>
                        <div className="space-y-3">
                        {comments && (
                            comments.map((e) => (
                                <Comment key={e._id ?? e.userComment?._id} id={e.userComment._id} username={e.userComment.username} name={e.userComment.name} comment={e.text}></Comment>
                            ))
                        )}
                        </div>
                    </div>
                )}
            </article>
        </>
    )
}

export default Post
