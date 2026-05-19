import { useState } from "react"
import Navbar from "../../components/shared/Navbar"
import Posts from "../posts/Posts"
import Notifications from "../notifications/Notifications"
import Chat from "../chats/Chat"
import useAuth from "../../hooks/useAuth"

function Home() {
  const {user}= useAuth()
  const [page,setPage] = useState('posts')
  return (
    <>
      <div className="h-screen w-full bg-amber-50 flex justify-center items-center">
          <div className="h-screen w-50 border">
            <Navbar setPage={setPage} ></Navbar>
          </div>
          <div className="h-screen w-300 border">
            {page=="posts" && <Posts></Posts>}
            {page=="noifiation" && <Notifications></Notifications>}
            {page=="chat" && <Chat></Chat>}
          </div>
          <div className="h-screen w-100 border">
          </div>
      </div>
    </>
  )
}
export default Home
