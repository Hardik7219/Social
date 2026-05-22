import API  from "../lib/axios";

export const getNotifications = async ()=>{    
    const res = await API.get('/notification')    
    console.log(res);
    
    return res.data;    
}


export const deleteNotifications = async ()=>{
    await API.delete('/notification')
    
}