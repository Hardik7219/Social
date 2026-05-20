import API from "../lib/axios";


export const sendChat = async (id,msg)=>{
    const res = await API.post(`/msg/sendMsg/${id.id}`,{msg})    
}

export const getChats = async (id)=>
{
    const res = await API.get(`/msg/getMsg/${id.id}`)
    return res.data
    
}

export const oldChatUsers = async ()=>{
    const res = await API.get('/msg/getCh');
    return res.data
}