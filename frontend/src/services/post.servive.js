import API  from "../lib/axios";



export const createPost = async (title)=>{
    
    const res = await API.post("post/create",title)
    
}
export const fetchPosts = async ()=>{    
    const res= await API.get("/post/posts")    
    return res.data.posts
}


export const addComment = async (postId,comment)=>{
    const res = await API.post(`post/comment/${postId}`,{comment})
    
}

export const likePost = async (postId)=>{
    
    const res = await API.post(`post/like/${postId}`)
    
}

export const deletePost = async (postId)=>{
    
    const res = await API.post(`post/delete/${postId}`)
    
}