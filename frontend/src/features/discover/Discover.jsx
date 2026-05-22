import  { useEffect, useState } from 'react'
import { getSuggestedUsers } from '../../services/user.servive';
import UserUi from '../../components/ui/UserUi';

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
                            <div key={e?._id}>
                                <UserUi id={e._id} username={e.username} name={e.name}></UserUi>
                            </div>
                        ))
                    )}
                </div>
            </aside>
        </div>
    )
}

export default Discover
