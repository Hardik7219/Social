import { useEffect, useState } from "react";

import Navbar from "../../components/shared/Navbar";

import Posts from "../posts/Posts";
import Notifications from "../notifications/Notifications";
import Chat from "../chats/Chat";

import useAuth from "../../hooks/useAuth";
import { getSuggestedUsers } from "../../services/user.servive";
import { Link } from "react-router-dom";
import Discover from "../discover/Discover";

function Home() {
    const { user } = useAuth();


    const [page, setPage] = useState("posts");

    return (

        <div className="min-h-screen text-white flex justify-center">

            <div className="w-full max-w-7xl flex relative">

                {/* LEFT SIDEBAR */}
                <aside className="hidden md:flex w-20 lg:w-64 border-r border-white/[0.06] fixed left-0 top-0 h-screen glass-panel-strong z-40 flex-col">
                    <Navbar setPage={setPage} page={page} />
                </aside>

                {/* MOBILE BOTTOM NAV */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel-strong border-t border-white/[0.06] px-2 py-2 safe-area-pb">
                    <Navbar setPage={setPage} page={page} />
                </nav>

                {/* MAIN FEED */}
                <main className="flex-1 w-full md:ml-20 lg:ml-64 lg:mr-72 min-h-screen px-4 sm:px-6 py-6 pb-24 md:pb-8 max-w-2xl mx-auto lg:mx-0 lg:max-w-none animate-fade-in">
                    {page === "posts" && <Posts />}

                    {page === "notifiation" && (
                        <Notifications />
                    )}

                    {page === "chat" && <Chat />}
                    <div className="lg:hidden">
                        {page =="discover" && <Discover></Discover>}
                    </div>
                </main>
                <aside className="hidden lg:flex w-72 border-l border-white/[0.06] fixed right-0 top-0 h-screen glass-panel-strong z-40 flex-col p-5 overflow-y-auto">
                    <Discover></Discover>
                </aside>
            </div>

        </div>
    );
}

export default Home;
