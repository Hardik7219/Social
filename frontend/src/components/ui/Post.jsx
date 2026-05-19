import { useState } from "react"
import Comment from "./Comment";
import useAuth from "../../hooks/useAuth";
import { addComment, deletePost, likePost } from "../../services/post.servive";

function Post({ userId, id,title, username, name, comments, likes }) {
    const [showComments, setShowComments] = useState(false);
    const { user } = useAuth();
    const [c,setC]= useState();
    const [deleteSure,setDeleteSure] =useState(false)
    const handleSubmit = async (e)=>{
        e.preventDefault();
        await addComment(id,c)
    }
    const toggleLike = async ()=>{
        await likePost(id);
    }
    const deletePosts = async ()=>{
        await deletePost(id);
        setDeleteSure(false)
    }
    return (
        <>
            <div className="border">
                {deleteSure && (
                    <div className="z-50 h-full w-full flex justify-center items-center">
                        <button onClick={()=>setDeleteSure(false)}>no</button>
                        <button onClick={deletePosts}>Yes</button>
                    </div>
                )}
                <div className="flex items-center">
                    <div className="bg-red-500 h-20 w-20 rounded-full"></div>
                    <div>
                        {username}

                    </div>
                    {user._id == userId && (
                        <div className="flex justify-self-end"><button onClick={()=>setDeleteSure(true)}>Delete</button></div>
                    )}
                </div>
                <div>
                    {title}
                </div>
                <div>
                    <ul className="flex items-center gap-10">
                        <li><button onClick={toggleLike}>Like</button>{likes.length}</li>
                        <li><button onClick={() => setShowComments(current => !current)}>Comments</button></li>
                    </ul>
                </div>
                {showComments && (
                    <div className="bg-amber-300 h-auto w-full p-1">
                        <form onSubmit={handleSubmit}>
                            <input type='text' onChange={(e)=>setC(e.target.value)} placeholder='enter text'></input>
                            <button type="submit">publish</button>
                        </form>
                        {comments && (
                            comments.map((e) => (
                                <Comment id={e.userComment._id} username={e.userComment.username} name={e.userComment.name} comment={e.text}></Comment>
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default Post
