import API from "../lib/axios";


export const getSuggestedUsers = async ()=>{
    const res = await API.get("/user/suggestion")
    return res.data;    
}

export const getUser = async (id)=>{
    const res = await API.get(`/user/profile/${id}`)
    return res.data;
    
}