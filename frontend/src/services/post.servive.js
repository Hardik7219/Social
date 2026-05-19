import API  from "../lib/axios";


export const fetchPosts = async ()=>{    
    const res= await API.get("/post/posts")    
    return res.data.posts
}


export const addComment = async (postId,comment)=>{
    console.log(comment);
    
    const res = await API.post(`post/comment/${postId}`,{comment})

    console.log(res);
    
}