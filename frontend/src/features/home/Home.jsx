import { useEffect, useState } from "react";

import Navbar from "../../components/shared/Navbar";

import Posts from "../posts/Posts";
import Notifications from "../notifications/Notifications";
import Chat from "../chats/Chat";

import useAuth from "../../hooks/useAuth";
import { getSuggestedUsers } from "../../services/user.servive";
import { Link } from "react-router-dom";

function Home() {

    const { user } = useAuth();
    const [users, setUser] = useState()

    const [page, setPage] = useState("posts");
    useEffect(() => {
        const suggestions = async () => {
            const data = await getSuggestedUsers();
            setUser(data);
        }
        suggestions();
    }, [])
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
                </main>

                {/* RIGHT SIDEBAR — SUGGESTIONS */}
                <aside className="hidden lg:flex w-72 border-l border-white/[0.06] fixed right-0 top-0 h-screen glass-panel-strong z-40 flex-col p-5 overflow-y-auto">
                    <div className="mb-6">
                        <p className="section-subtitle mb-1">Discover</p>
                        <h2 className="section-title">Suggested for you</h2>
                    </div>

                    <div className="flex flex-col gap-3 stagger-children">
                    {users && (
                        users.map((e) => (
                            <div key={e?._id} className="suggestion-card">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="avatar-placeholder h-10 w-10" />
                                    <h3 className="font-semibold text-white truncate">
                                        <Link
                                            to={`/profile/${e?._id}`}
                                            className="hover:text-cyan-300 transition-colors duration-300"
                                        >
                                            {e?.username}
                                        </Link>
                                    </h3>
                                </div>
                                <p className="text-sm text-slate-500 truncate pl-[52px]">
                                    {e?.email}
                                </p>
                            </div>
                        ))
                    )}
                    </div>
                </aside>

            </div>

        </div>
    );
}

export default Home;
