import { useState } from "react";

import Navbar from "../../components/shared/Navbar";

import Posts from "../posts/Posts";
import Notifications from "../notifications/Notifications";
import Chat from "../chats/Chat";

import useAuth from "../../hooks/useAuth";

function Home() {

    const { user } = useAuth();

    const [page, setPage] = useState("posts");

    return (

        <div className="min-h-screen bg-zinc-950 text-white flex justify-center">

            <div className="w-full max-w-7xl flex">


                <div className="w-64 border-r border-zinc-800 fixed left-0 top-0 h-screen bg-zinc-900">

                    <Navbar setPage={setPage} />

                </div>


                <div className="flex-1 ml-64 mr-64 min-h-screen p-5">

                    {page === "posts" && <Posts />}

                    {page === "notification" && (
                        <Notifications />
                    )}

                    {page === "chat" && <Chat />}

                </div>

                {/* RIGHT SIDEBAR */}

                <div className="w-64 border-l border-zinc-800 fixed right-0 top-0 h-screen bg-zinc-900 p-5">

                    <h1 className="text-xl font-bold">
                        {user?.username}
                    </h1>

                    <p className="text-zinc-400">
                        {user?.email}
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Home;