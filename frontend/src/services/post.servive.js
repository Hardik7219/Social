import API  from "../lib/axios";



export const createPost = async (title)=>{
    console.log(title);
    
    const res = await API.post("post/create",title)
    console.log(res);
    
}
export const fetchPosts = async ()=>{    
    const res= await API.get("/post/posts")    
    return res.data.posts
}


export const addComment = async (postId,comment)=>{
    console.log(comment);
    
    const res = await API.post(`post/comment/${postId}`,{comment})

    console.log(res);
    
}

export const likePost = async (postId)=>{
    
    const res = await API.post(`post/like/${postId}`)

    console.log(res);
    
}

export const deletePost = async (postId)=>{
    
    const res = await API.post(`post/delete/${postId}`)

    console.log(res);
    
}