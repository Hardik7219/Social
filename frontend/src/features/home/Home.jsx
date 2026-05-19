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
                    {users && (
                        users.map((e) => (
                            <div key={e?._id} className="border p-2">
                                <h1 className="text-xl font-bold">
                                    <Link to={`/profile/${e?._id}`}>{e?.username}</Link>
                                </h1>
                                <p className="text-zinc-400">
                                    {e?.email}
                                </p>
                            </div>
                        ))
                    )}

                </div>

            </div>

        </div>
    );
}

export default Home;