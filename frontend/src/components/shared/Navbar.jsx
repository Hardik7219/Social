import { AiOutlineHome } from "react-icons/ai";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";


function Navbar({ setPage }) {
  return (
    <>
      <div className='h-full w-full flex flex-col justify-between p-2'>
        <ul className='flex lg:flex-col justify-center '>
          <li onClick={() => setPage("posts")} className='flex items-center gap-2 hover:cursor-pointer'>
            <AiOutlineHome></AiOutlineHome>Home
          </li>
          <li onClick={() => setPage("chat")} className='flex items-center gap-2 hover:cursor-pointer'>
            <IoChatbubbleEllipsesOutline></IoChatbubbleEllipsesOutline>Chat
          </li>
          <li onClick={() => setPage("noifiation")} className='flex items-center gap-2 hover:cursor-pointer'>
            <IoIosNotificationsOutline></IoIosNotificationsOutline>Notification
          </li>
        </ul>
        <div className="w-[98%] border-2 border-gray-700"></div>
        <ul className="flex lg:flex-col justify-center">
          <li className='flex items-center gap-2 hover:cursor-pointer'>
            <CgProfile></CgProfile>Profile
          </li>
          <li className='flex items-center gap-2 hover:cursor-pointer'><IoSettingsOutline></IoSettingsOutline>Settings</li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
