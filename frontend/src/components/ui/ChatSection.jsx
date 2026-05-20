import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { getChats, sendChat } from '../../services/chat.service';

function ChatSection() {
    const userId = useParams();
    const [data,setData]= useState();
    const [msg,setMsg] = useState();
    const [name,setName] =useState()
    useState(()=>{
        const fetchChats= async ()=>{
            const res =await getChats(userId)            
            setData(res.msgs)
            setName(res.msgs[0].receiId.username)
        }
        fetchChats();
    },[msg,data])
    const sendMsg = async (e)=>{
        e.preventDefault();
        await sendChat(userId,msg)
    }
    return (
        <>
            <div>
                <div className='flex w-full gap-2 p-2'>
                    <div className='bg-red-400 h-10 w-10 rounded-full'>

                    </div>
                    <div>
                        {name && (
                            <p>{name}</p>
                        )}
                    </div>
                </div>
                <div className='h-screen'>
                        {data && (
                            data.map((e)=>(
                                <div key={e._id}>
                                    <p>{e.message}</p>
                                </div>
                            ))
                        )}
                </div>
                <div>
                    <div className='z-50 w-full sticky bottom-0'>
                        <form className='p-1 w-full' >
                            <div className='border-2 rounded-lg border-[#8707ff] justify-between flex'>
                                <input onChange={(e)=>setMsg(e.target.value)} className='s-input w-[90%] rounded-0' type="text" placeholder='Your message'></input>
                                <button  onClick={sendMsg} className='s-btn w-[10%] flex justify-center items-center'>send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatSection
