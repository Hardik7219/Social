import { searchUser } from '../../services/user.servive';
import { useState } from 'react';
import UserUi from '../../components/ui/UserUi';

function Search() {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);

    const handleSearch = async (e) => {

        const value = e.target.value;

        setQuery(value);

        if (!value.trim()) {
            setUsers([]);
            return;
        }

        const res = await searchUser(value);

        setUsers(res);
    };

    return (
        <div className="relative">

            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search users..."
                className="input-field"
            />

            <div className="absolute top-12 left-0 w-full bg-black rounded-xl border border-white/10">
                {users && (

                    users.map((user) => (
                        <div>
                            <UserUi id={user._id} username={user.username} avatar={user.avatar} name={user.name}></UserUi>

                        </div>
                    )
                    ))}

            </div>
        </div>
    );
}

export default Search
