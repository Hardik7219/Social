import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSuggestedUsers } from '../../services/user.servive';

function Discover() {
    const [users, setUser] = useState()
    useEffect(() => {
        const suggestions = async () => {
            const data = await getSuggestedUsers();
            setUser(data);
        }
        suggestions();
    }, [])
    return (
        <div>
            <aside className="lg:flex w-full border-l border-white/6 fixed right-0 top-0 h-screen glass-panel-strong z-40 flex-col p-5 overflow-y-auto">
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
                                <p className="text-sm text-slate-500 truncate pl-13">
                                    {e?.name}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </aside>
        </div>
    )
}

export default Discover
