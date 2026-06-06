import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUserFollowings } from '../../services/user.servive';
import UserUi from '../../components/ui/UserUi';
import { IoArrowBack } from 'react-icons/io5';

function FollowingList() {
    const { id } = useParams();
    const [users, setUsers] = useState();
    useEffect(() => {
        const getFollowers = async () => {
            const res = await getUserFollowings(id);
            setUsers(res);
        }
        getFollowers();
    },[])
    return (
        <div className='flex justify-center items-center'>
            <aside className="flex w-150 border-l border-wh ite/6 h-screen glass-panel-strong z-40 flex-col p-5">
                <aside className="flex w-full border-l border-white/6 fixed right-0 top-0 h-screen glass-panel-strong z-40 flex-col p-5 overflow-y-auto">
                    <div className="mb-6 flex items-center  gap-10">
                        <Link
                            to={`/profile/${id}`}
                            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/6 transition-all duration-300"
                        >
                            <IoArrowBack className="text-xl" />
                        </Link>
                        <p className="section-subtitle mb-1">Followings</p>
                    </div>

                    <div className="flex flex-col gap-3 stagger-children">
                        {users && (
                            users.map((e) => (
                                <div key={e?._id}>
                                    <UserUi id={e._id} username={e.username} avatar={e.avatar} name={e.name}></UserUi>
                                </div>
                            ))
                        )}
                    </div>
                </aside>
            </aside>
        </div>
    )
}

export default FollowingList
