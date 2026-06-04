import { useState } from "react";

import Navbar from "../../components/shared/Navbar";

import Posts from "../posts/Posts";
import Notifications from "../notifications/Notifications";
import Chat from "../chats/Chat";

import Discover from "../discover/Discover";
import FollowerPost from "../followersPosts/FollowerPost";
import Search from "../search/Search";
import { useEffect } from "react";
import socket from "../../socket/socket";
import { getUnreadNotificationCount } from "../../services/notification.servive";
function Home() {

    const [page, setPage] = useState("posts");
    const [notificationCount, setNotificationCount] = useState(0);
    useEffect(() => {

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on("receive_notification", () => {
            console.log("notification received");
            setNotificationCount((prev) => prev + 1);
        });

    }, []);
    useEffect(() => {

        const fetchUnreadCount = async () => {

            try {

                const res = await getUnreadNotificationCount();

                setNotificationCount(res.unreadCount);

            } catch (error) {

                console.log(error);

            }

        };

        fetchUnreadCount();

        socket.on(
            "receive_notification",
            () => {

                setNotificationCount((prev) => prev + 1);

            }
        );

        return () => {

            socket.off("receive_notification");

        };

    }, []);
    return (

        <div className="min-h-screen text-white flex justify-center">

            <div className="w-full max-w-7xl flex relative">

                {/* LEFT SIDEBAR */}
                <aside className="hidden md:flex w-20 lg:w-64 border-r border-white/6 fixed left-0 top-0 h-screen glass-panel-strong z-40 flex-col">
                    <Navbar
                        setPage={setPage}
                        page={page}
                        notificationCount={notificationCount}
                    />
                </aside>

                {/* MOBILE BOTTOM NAV */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel-strong border-t border-white/6 px-2 py-2 safe-area-pb">
                    <Navbar
                        setPage={setPage}
                        page={page}
                        notificationCount={notificationCount}
                    />
                </nav>

                {/* MAIN FEED */}
                <main className="flex-1 w-full md:ml-20 lg:ml-64 lg:mr-72 min-h-screen px-4 sm:px-6 py-6 pb-24 md:pb-8 max-w-2xl mx-auto lg:mx-0 lg:max-w-none animate-fade-in">
                    {page === "posts" && <Posts />}

                    {page === "notifiation" && (
                        <Notifications
                            setNotificationCount={setNotificationCount}
                        />
                    )}

                    {page === "chat" && <Chat />}
                    <div className="lg:hidden">
                        {page == "discover" && <Discover></Discover>}
                    </div>
                    {page === "post" && (
                        <FollowerPost />
                    )}
                    {page === "search" && (
                        <Search />
                    )}
                </main>
                <aside className="hidden lg:flex w-72 border-l border-white/6 fixed right-0 top-0 h-screen glass-panel-strong z-40 flex-col p-5 overflow-y-auto">
                    <Discover></Discover>
                </aside>
            </div>

        </div>
    );
}

export default Home;
