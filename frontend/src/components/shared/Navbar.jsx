import { AiOutlineHome } from "react-icons/ai";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { BsFilePostFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";


function Navbar({ setPage, page, notificationCount }) {
  const { user } = useAuth()

  const navClass = (key) =>
    page === key
      ? "flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl font-medium text-xs md:text-sm cursor-pointer text-white bg-gradient-to-r from-blue-600/20 to-cyan-500/10 border border-blue-500/25"
      : "flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl text-slate-400 font-medium text-xs md:text-sm cursor-pointer transition-all duration-300 hover:bg-white/[0.05] hover:text-slate-100";

  const DisClass = (key) =>
    page === key
      ? "flex lg:hidden flex-col md:flex-row items-center justify-center gap-0.5 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl font-medium text-xs md:text-sm cursor-pointer text-white bg-gradient-to-r from-blue-600/20 to-cyan-500/10 border border-blue-500/25"
      : "flex lg:hidden flex-col md:flex-row items-center justify-center gap-0.5 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl text-slate-400 font-medium text-xs md:text-sm cursor-pointer transition-all duration-300 hover:bg-white/[0.05] hover:text-slate-100";
  return (
    <>
      <div className='h-full w-full flex flex-row md:flex-col justify-around md:justify-between p-2 md:p-4 lg:p-5'>
        <div className="mb-0 md:mb-6 hidden md:block ">
          <Link to="/">
            <img
              src='/logo.png'
              className='w-full max-h-50 hover:cursor-pointer  object-contain'
              alt=''
            />
          </Link>
        </div>
        <div className="divider-glow my-0 md:my-4 hidden md:block" />
        <ul className='flex flex-row md:flex-col flex-1 md:flex-none gap-1 md:gap-1.5 justify-around md:justify-start items-center md:items-stretch'>
          <li onClick={() => setPage("posts")} className={navClass("posts")}>
            <AiOutlineHome className="text-xl md:text-lg shrink-0" />
            <span className="hidden sm:inline md:inline">Home</span>
          </li>
          <li onClick={() => setPage("chat")} className={navClass("chat")}>
            <IoChatbubbleEllipsesOutline className="text-xl md:text-lg shrink-0" />
            <span className="hidden sm:inline md:inline">Chat</span>
          </li>
          <li onClick={() => setPage("post")} className={navClass("post")}>
            <BsFilePostFill className="text-xl md:text-lg shrink-0"></BsFilePostFill>
            <span className="hidden sm:inline md:inline">Posts</span>
          </li>
          <li onClick={() => setPage("search")} className={navClass("search")}>
            <FaSearch className="text-xl md:text-lg shrink-0"></FaSearch>
            <span className="hidden sm:inline md:inline">Search</span>
          </li>
          <li onClick={() => setPage("notifiation")} className={`${navClass("notifiation")} relative`}>
            <IoIosNotificationsOutline className="text-xl md:text-lg shrink-0" />
            {notificationCount > 0 && (
              <span
                className="
      absolute
      top-1
      right-1
      bg-red-500
      text-white
      text-[10px]
      min-w-4.5
      h-4.5
      rounded-full
      flex
      items-center
      justify-center
      px-1
      font-semibold
    "
              >
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
            <span className="hidden sm:inline md:inline">Alerts</span>
          </li>
          <li onClick={() => setPage("discover")} className={DisClass("discover")}>
            <RiCompassDiscoverLine className="text-xl md:text-lg shrink-0"></RiCompassDiscoverLine>
          </li>

        </ul>

        <div className="divider-glow my-0 md:my-4 hidden md:block" />

        <ul className="flex flex-row md:flex-col gap-1 md:gap-1.5 justify-around md:justify-start items-center md:items-stretch">
          <li className={navClass("profile")}>
            <Link
              to={`/profile/${user._id}`}
              className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-3 w-full"
            >
              <CgProfile size={22} className="shrink-0 md:w-5 md:h-5" />
              <span className="hidden sm:inline md:inline">Profile</span>
            </Link>
          </li>
          <li className='hidden lg:flex nav-item'>
            <IoSettingsOutline className="text-lg shrink-0" />
            <span>Settings</span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
