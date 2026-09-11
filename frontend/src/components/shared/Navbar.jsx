import { AiOutlineHome } from "react-icons/ai";
import { IoChatbubbleEllipsesOutline, IoCompassOutline, IoPeopleOutline} from "react-icons/io5";
import { IoIosNotificationsOutline, IoMdSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Navbar({ setPage, page, notificationCount, msgCount }) {
  const { user } = useAuth()

  const navClass = (key) =>
    page === key
      ? "flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-3 px-3 py-2 md:px-3 md:py-2.5 font-medium text-xs md:text-sm cursor-pointer text-slate-100 bg-white/[0.07] border border-white/[0.09] rounded-lg"
      : "flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-3 px-3 py-2 md:px-3 md:py-2.5 font-medium text-xs md:text-sm cursor-pointer text-slate-500 rounded-lg transition-all duration-150 hover:bg-white/[0.05] hover:text-slate-300";

  const DisClass = (key) =>
    page === key
      ? "flex lg:hidden flex-col md:flex-row items-center justify-center gap-0.5 md:gap-3 px-3 py-2 md:px-3 md:py-2.5 font-medium text-xs md:text-sm cursor-pointer text-slate-100 bg-white/[0.07] border border-white/[0.09] rounded-lg"
      : "flex lg:hidden flex-col md:flex-row items-center justify-center gap-0.5 md:gap-3 px-3 py-2 md:px-3 md:py-2.5 font-medium text-xs md:text-sm cursor-pointer text-slate-500 rounded-lg transition-all duration-150 hover:bg-white/[0.05] hover:text-slate-300";

  return (
    <>
      <div className='h-full w-full flex flex-row md:flex-col justify-around md:justify-between p-2 md:p-4 lg:p-5'>
        <div className="mb-0 md:mb-6 hidden md:block">
          <Link to="/">
            <img
              src='/logo.png'
              className='w-full max-h-50 hover:cursor-pointer object-contain'
              alt=''
            />
          </Link>
        </div>
        <div className="divider-glow my-0 md:my-4 hidden md:block" />
        <ul className='flex flex-row md:flex-col flex-1 md:flex-none gap-1 md:gap-0.5 justify-around md:justify-start items-center md:items-stretch'>
          <li onClick={() => setPage("posts")} className={navClass("posts")}>
            <AiOutlineHome className="text-xl md:text-base shrink-0" />
            <span className="hidden sm:inline md:inline">Home</span>
          </li>
          <li onClick={() => setPage("chat")} className={`${navClass("chat")} relative`}>
            <IoChatbubbleEllipsesOutline className="text-xl md:text-base shrink-0" />
            {msgCount > 0 && (
              <span className="absolute top-1 right-1 brutal-badge">
                {msgCount > 99 ? "99+" : msgCount}
              </span>)}
            <span className="hidden sm:inline md:inline">Chat</span>
          </li>
          <li onClick={() => setPage("post")} className={navClass("post")}>
            <IoPeopleOutline className="text-xl md:text-base shrink-0"/>
            <span className="hidden sm:inline md:inline">Posts</span>
          </li>
          <li onClick={() => setPage("search")} className={navClass("search")}>
            <IoMdSearch className="text-xl md:text-base shrink-0"/>
            <span className="hidden sm:inline md:inline">Search</span>
          </li>
          <li onClick={() => setPage("notifiation")} className={`${navClass("notifiation")} relative`}>
            <IoIosNotificationsOutline className="text-xl md:text-base shrink-0" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 brutal-badge">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
            <span className="hidden sm:inline md:inline">Alerts</span>
          </li>
          <li onClick={() => setPage("discover")} className={DisClass("discover")}>
            <IoCompassOutline className="text-xl md:text-base shrink-0"/>
          </li>
        </ul>

        <div className="divider-glow my-0 md:my-4 hidden md:block" />

        <ul className="flex flex-row md:flex-col gap-1 md:gap-0.5 justify-around md:justify-start items-center md:items-stretch">
          <li className={navClass("profile")}>
            <Link
              to={`/profile/${user._id}`}
              className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-3 w-full"
            >
              <CgProfile size={20} className="shrink-0 md:w-4 md:h-4" />
              <span className="hidden sm:inline md:inline">Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
