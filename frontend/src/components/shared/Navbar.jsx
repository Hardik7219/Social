import { AiOutlineHome } from "react-icons/ai";
import { IoChatbubbleEllipsesOutline, IoCompassOutline, IoPeopleOutline} from "react-icons/io5";
import { IoIosNotificationsOutline, IoMdSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";



function Navbar({ setPage, page, notificationCount, msgCount }) {
  const { user } = useAuth()

  const navClass = (key) =>
    page === key
      ? "flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-3 px-3 py-2 md:px-4 md:py-3 font-black text-xs md:text-sm cursor-pointer text-white uppercase tracking-wide bg-gradient-to-r from-blue-600/25 to-cyan-500/15 border-2 border-blue-500/60"
      : "flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-3 px-3 py-2 md:px-4 md:py-3 font-bold text-xs md:text-sm cursor-pointer text-slate-400 uppercase tracking-wide border-2 border-transparent transition-all duration-150 hover:bg-white/[0.05] hover:text-slate-100 hover:border-slate-700/60";

  const activeBoxShadow = "4px 4px 0 rgba(59, 130, 246, 0.6)";
  const hoverBoxShadow = "3px 3px 0 rgba(59, 130, 246, 0.3)";

  const navStyle = (key) =>
    page === key
      ? { borderRadius: "4px", boxShadow: activeBoxShadow }
      : { borderRadius: "4px" };

  const DisClass = (key) =>
    page === key
      ? "flex lg:hidden flex-col md:flex-row items-center justify-center gap-0.5 md:gap-3 px-3 py-2 md:px-4 md:py-3 font-black text-xs md:text-sm cursor-pointer text-white uppercase tracking-wide bg-gradient-to-r from-blue-600/25 to-cyan-500/15 border-2 border-blue-500/60"
      : "flex lg:hidden flex-col md:flex-row items-center justify-center gap-0.5 md:gap-3 px-3 py-2 md:px-4 md:py-3 font-bold text-xs md:text-sm cursor-pointer text-slate-400 uppercase tracking-wide border-2 border-transparent transition-all duration-150 hover:bg-white/[0.05] hover:text-slate-100 hover:border-slate-700/60";

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
          <li onClick={() => setPage("posts")} className={navClass("posts")} style={navStyle("posts")}>
            <AiOutlineHome className="text-xl md:text-lg shrink-0" />
            <span className="hidden sm:inline md:inline">Home</span>
          </li>
          <li onClick={() => setPage("chat")} className={`${navClass("chat")} relative`} style={navStyle("chat")}>
            <IoChatbubbleEllipsesOutline className="text-xl md:text-lg shrink-0" />
            {msgCount > 0 && (
              <span className="absolute top-1 right-1 brutal-badge">
                {msgCount > 99 ? "99+" : msgCount}
              </span>)}
            <span className="hidden sm:inline md:inline">Chat</span>
          </li>
          <li onClick={() => setPage("post")} className={navClass("post")} style={navStyle("post")}>
            <IoPeopleOutline className="text-xl md:text-lg shrink-0"/>
            <span className="hidden sm:inline md:inline">Posts</span>
          </li>
          <li onClick={() => setPage("search")} className={navClass("search")} style={navStyle("search")}>
            <IoMdSearch className="text-xl md:text-lg shrink-0"/>
            <span className="hidden sm:inline md:inline">Search</span>
          </li>
          <li onClick={() => setPage("notifiation")} className={`${navClass("notifiation")} relative`} style={navStyle("notifiation")}>
            <IoIosNotificationsOutline className="text-xl md:text-lg shrink-0" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 brutal-badge">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
            <span className="hidden sm:inline md:inline">Alerts</span>
          </li>
          <li onClick={() => setPage("discover")} className={DisClass("discover")} style={navStyle("discover")}>
            <IoCompassOutline className="text-xl md:text-lg shrink-0"/>
          </li>

        </ul>

        <div className="divider-glow my-0 md:my-4 hidden md:block" />

        <ul className="flex flex-row md:flex-col gap-1 md:gap-1.5 justify-around md:justify-start items-center md:items-stretch">
          <li className={navClass("profile")} style={navStyle("profile")}>
            <Link
              to={`/profile/${user._id}`}
              className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-3 w-full"
            >
              <CgProfile size={22} className="shrink-0 md:w-5 md:h-5" />
              <span className="hidden sm:inline md:inline">Profile</span>
            </Link>
          </li>
          {/* <li className='hidden lg:flex nav-item'>
            <IoSettingsOutline className="text-lg shrink-0" />
            <span>Settings</span>
          </li> */}
        </ul>
      </div>
    </>
  )
}

export default Navbar
