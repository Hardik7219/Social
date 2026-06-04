import { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import { getChats, sendChat } from '../../services/chat.service';
import { IoArrowBack, IoSend } from 'react-icons/io5';

import { useEffect } from "react";
import socket
    from "../../socket/socket";
import useAuth from '../../hooks/useAuth';
function ChatSection() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [msg, setMsg] = useState("");
    const [name, setName] = useState()
    const { user } = useAuth();
    const [avatar, setAvatar] = useState()
    const bottomRef = useRef();
    useEffect(() => {
        const fetchChats = async () => {
            const res = await getChats(id)
            setData(res.msgs)
            setName(res.user.username)
            setAvatar(res.user.avatar)

        }
        fetchChats();
    }, [])
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [data]);
    useEffect(() => {

        if (user?._id) {

            socket.emit(

                "add_user",

                user._id
            );
        }

    }, [user]);
    useEffect(() => {

        const handleMessage = (newMessage) => {
            setData((prev) => [...prev, newMessage]);
        };

        socket.on("receive_message", handleMessage);

        return () => {
            socket.off("receive_message", handleMessage);
        };

    }, []);
    const sendMsg = async (e) => {

        e.preventDefault();
        if (!msg.trim()) return;
        const res = await sendChat(id, msg);
        setMsg("");

        socket.emit(
            "send_message",
            {
                receiverId: id,
                ...res
            }
        );
        setData((prev) => [
            ...prev,
            res
        ]);


    };
    const fullDateTime = (date) => {
        return new Date(date).toLocaleString([], {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };
    return (
        <>
            <div className="min-h-screen flex flex-col max-w-2xl mx-auto bg-transparent">
                <header className='glass-panel rounded-b-2xl flex w-full items-center gap-4 p-4 border-b border-white/6 sticky top-0 z-40'>
                    <Link
                        to="/"
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/6 transition-all duration-300"
                    >
                        <IoArrowBack className="text-xl" />
                    </Link>
                    {avatar ? (
                        <img
                            src={avatar}
                            alt={name}
                            className="h-12 w-12  rounded-full object-cover border border-blue-500/30 neon-ring shrink-0"
                        />
                    ) : (
                        <div className="avatar-placeholder h-12 w-12  shrink-0" />
                    )}
                    <div className="min-w-0">
                        {name && (
                            <p className="font-semibold text-white truncate">{name}</p>
                        )}
                        <p className="text-xs text-emerald-400/80">Active now</p>
                    </div>
                </header>

                <div className='flex-1 overflow-y-auto px-4 py-6 space-y-3 min-h-[calc(100vh-140px)]'>
                    {data && (
                        data.map((e) => (
                            <div
                                key={e._id}
                                className={
                                    e.senderId === user._id

                                        ? "chat-bubble-sent"

                                        : "chat-bubble-received"
                                }
                            >
                                <div className='flex justify-between'>
                                    <p>{e.message}</p>
                                    <div className="flex flex-col">
                                        

                                        <p className="text-[10px] opacity-40">
                                            {fullDateTime(e.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className='sticky bottom-0 p-4 glass-panel-strong border-t border-white/6'>
                    <form className='w-full' onSubmit={sendMsg}>
                        <div className='flex items-center gap-2 rounded-2xl border border-blue-500/30 bg-white/4 p-1.5 focus-within:border-cyan-400/50 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300'>
                            <input
                                onChange={(e) => setMsg(e.target.value)}
                                className='input-glass flex-1 px-4 py-2.5'
                                type="text"
                                placeholder='Type a message...'
                                value={msg}
                            />
                            <button
                                className='btn-primary shrink-0 px-5 py-2.5 text-sm rounded-xl'
                            >
                                <IoSend />
                            </button>
                        </div>
                    </form>
                </div>
                <div ref={bottomRef}></div>
            </div>
        </>
    )
}

export default ChatSection
