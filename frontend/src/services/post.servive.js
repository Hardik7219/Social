import API  from "../lib/axios";



export const createPost = async (formData)=>{
    
    await API.post("post/create",formData)
    
}
export const fetchPosts = async ()=>{    
    const res= await API.get("/post/posts")    
    return res.data.posts
}


export const addComment = async (postId,comment)=>{
    await API.post(`post/comment/${postId}`,{comment})
    
}

export const likePost = async (postId)=>{
        
    await API.post(`post/like/${postId}`)
    
}

export const deletePost = async (postId)=>{
    
    await API.post(`post/delete/${postId}`)
    
}
export const getUserPost = async (id)=>{
    const res = await API.get(`post/userPosts/${id}`)
    return res.data.userPosts
}

export const FollowersPost = async ()=>{    
    const res = await API.get("/post/getfollowerpost")
    return res.data.posts
    
}