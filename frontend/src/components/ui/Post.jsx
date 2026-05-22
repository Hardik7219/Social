import { useState } from "react"
import Comment from "./Comment";
import useAuth from "../../hooks/useAuth";
import { addComment, deletePost, likePost } from "../../services/post.servive";
import { Link } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";

import { useMutation, useQueryClient } from "@tanstack/react-query";

function Post({ post }) {
    const [showComments, setShowComments] = useState(false);
    const { user } = useAuth();
    const [c, setC] = useState("");
    const [deleteSure, setDeleteSure] = useState(false)
    const queryClient = useQueryClient();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await commentMutation.mutateAsync(c);
        setC("");
    }

    const commentMutation = useMutation({

        mutationFn: (comment) =>

            addComment(post._id, comment),

        onMutate: async (comment) => {

            await queryClient.cancelQueries({

                queryKey: ["posts", post.userId._id]
            });

            const previousPosts =
                queryClient.getQueryData(["posts"]);

            queryClient.setQueryData(

                ["posts"],

                (old) => {

                    return old.map((p) => {

                        if (p._id === post._id) {

                            return {

                                ...p,

                                comments: [

                                    ...p.comments,

                                    {

                                        text: comment,

                                        userComment: {

                                            _id: user._id,

                                            username:
                                                user.username,

                                            name:
                                                user.name
                                        }
                                    }
                                ]
                            };
                        }

                        return p;
                    });
                }
            );

            return { previousPosts };
        },

        onError: (
            err,
            variables,
            context
        ) => {

            queryClient.setQueryData(

                ["posts"],

                context.previousPosts
            );
        },

        onSettled: () => {

            queryClient.invalidateQueries({

                queryKey: ["posts", post.userId._id]
            });
        }
    });

    const likeMutation = useMutation({

        mutationFn: () => likePost(post._id),

        onMutate: async () => {

            await queryClient.cancelQueries({

                queryKey: ["posts", post.userId._id]
            });

            const previousPosts =
                queryClient.getQueryData(["posts"]);

            queryClient.setQueryData(

                ["posts"],

                (old) => {

                    return old.map((p) => {

                        if (p._id === post._id) {

                            const alreadyLiked =
                                p.likes.includes(user._id);

                            return {

                                ...p,

                                likes: alreadyLiked

                                    ? p.likes.filter(
                                        (id) => id !== user._id
                                    )

                                    : [...p.likes, user._id]
                            };
                        }

                        return p;
                    });
                }
            );

            return { previousPosts };
        },

        onError: (
            err,
            variables,
            context
        ) => {

            queryClient.setQueryData(

                ["posts"],

                context.previousPosts
            );
        },

        onSettled: () => {

            queryClient.invalidateQueries({

                queryKey: ["posts", post.userId._id]
            });
        }
    });

    const deletePosts = async () => {
        await deletePost(post._id);
        setDeleteSure(false)
    }
    const isLiked = post.likes.some(
        (id) => id.toString() === user._id
    );
    if (!post) return null;
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
                    {post?.userId.avatar ? (
                        <img
                            src={post?.userId.avatar}
                            alt={post.userId.username}
                            className="h-12 w-12  rounded-full object-cover border border-blue-500/30 neon-ring shrink-0"
                        />
                    ) : (
                        <div className="avatar-placeholder h-12 w-12  shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                        <Link
                            to={`/profile/${post.userId._id}`}
                            className="font-semibold text-white hover:text-cyan-300 transition-colors truncate block"
                        >
                            {post.userId.username}
                        </Link>
                        {post.userId.name && (
                            <p className="text-xs text-slate-500 truncate">
                                {post.userId.name}
                            </p>
                        )}
                    </div>
                    {user._id == post.userId._id && (
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
                    <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{post.title}</p>
                </div>

                {post.img && (
                    <div className="mx-5 mb-4 rounded-xl overflow-hidden border border-white/6 bg-black/40">
                        <img
                            src={post.img}
                            className='w-full max-h-96 object-contain'
                            alt=''
                        />
                    </div>
                )}

                <footer className="px-5 py-3 border-t border-white/6 flex items-center gap-6">
                    <button
                        disabled={likeMutation.isPending}
                        onClick={() => likeMutation.mutate()}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-300 group"
                    >
                        <AiOutlineLike className={`text-lg ${isLiked ? "text-cyan-400" : ""} group-hover:scale-110 transition-transform`} />
                        <span className="font-medium">{post.likes?.length ?? 0}</span>
                        <span className="hidden sm:inline">Likes</span>
                    </button>
                    <button
                        onClick={() => setShowComments(current => !current)}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors duration-300 group"
                    >
                        <BiCommentDetail className="text-lg group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline"><span className="font-medium">{post.comments?.length ?? 0}</span> Comments</span>
                    </button>
                </footer>

                {showComments && (
                    <div className="border-t border-white/6 bg-white/2 p-5 space-y-4 animate-fade-in">
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <input
                                value={c}
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
                            {post.comments && (
                                post.comments.map((e) => (
                                    <Comment key={e._id ?? e.userComment?._id} id={e.userComment._id} avatar={e.userComment.avatar} username={e.userComment.username} name={e.userComment.name} comment={e.text}></Comment>
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
