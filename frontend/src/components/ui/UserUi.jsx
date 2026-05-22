import { Link } from 'react-router-dom'

function UserUi({id,username,name}) {
  return (
    <div>
      <div  className="suggestion-card">
        <div className="flex items-center gap-3 mb-2">
          <div className="avatar-placeholder h-10 w-10" />
          <h3 className="font-semibold text-white truncate">
            <Link
              to={`/profile/${id}`}
              className="hover:text-cyan-300 transition-colors duration-300"
            >
              {username}
            </Link>
          </h3>
        </div>
        <p className="text-sm text-slate-500 truncate pl-13">
          {name}
        </p>
      </div>
    </div>
  )
}

export default UserUi
