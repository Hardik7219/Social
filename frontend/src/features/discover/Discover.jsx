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
        <div className="w-full">
            <div className="mb-6">
                <p className="section-subtitle mb-1">Discover</p>
                <h2 className="section-title">Suggested for you</h2>
            </div>

            <div className="flex flex-col gap-2 stagger-children">
                {users && (
                    users.map((e) => (
                        <div key={e?._id}>
                            <UserUi id={e._id} username={e.username} name={e.name} avatar={e.avatar}></UserUi>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Discover
