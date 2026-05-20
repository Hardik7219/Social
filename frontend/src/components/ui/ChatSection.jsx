import React from 'react'
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import { getChats, sendChat } from '../../services/chat.service';
import { IoArrowBack } from 'react-icons/io5';

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
            <div className="min-h-screen flex flex-col max-w-2xl mx-auto bg-transparent">
                <header className='glass-panel rounded-b-2xl flex w-full items-center gap-4 p-4 border-b border-white/[0.06] sticky top-0 z-40'>
                    <Link
                        to="/"
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
                    >
                        <IoArrowBack className="text-xl" />
                    </Link>
                    <div className='avatar-placeholder h-11 w-11 shrink-0' />
                    <div className="min-w-0">
                        {name && (
                            <p className="font-semibold text-white truncate">{name}</p>
                        )}
                        <p className="text-xs text-emerald-400/80">Active now</p>
                    </div>
                </header>

                <div className='flex-1 overflow-y-auto px-4 py-6 space-y-3 min-h-[calc(100vh-140px)]'>
                        {data && (
                            data.map((e, i)=>(
                                <div
                                    key={e._id}
                                    className={i % 2 === 0 ? "chat-bubble-sent" : "chat-bubble-received"}
                                >
                                    <p>{e.message}</p>
                                </div>
                            ))
                        )}
                </div>

                <div className='sticky bottom-0 p-4 glass-panel-strong border-t border-white/[0.06]'>
                    <form className='w-full' onSubmit={sendMsg}>
                        <div className='flex items-center gap-2 rounded-2xl border border-blue-500/30 bg-white/[0.04] p-1.5 focus-within:border-cyan-400/50 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300'>
                            <input
                                onChange={(e)=>setMsg(e.target.value)}
                                className='input-glass flex-1 px-4 py-2.5'
                                type="text"
                                placeholder='Type a message...'
                            />
                            <button
                                onClick={sendMsg}
                                className='btn-primary shrink-0 px-5 py-2.5 text-sm rounded-xl'
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChatSection
