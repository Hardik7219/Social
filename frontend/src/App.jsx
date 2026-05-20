import Home from "./features/home/Home"
import Signup from './features/auth/signup/Signup'
import ProfilePage from "./features/profile/ProfilePage"
import ChatSection from "./components/ui/ChatSection"
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import PrivateRoute from "./routes/PrivateRoute"
import Login from "./features/auth/login/Login"

function App() {

  return (
    <>
      <div className="min-h-screen text-slate-100">
        <Router>
          <Routes>
            <Route element={<PrivateRoute></PrivateRoute>}>
              <Route element={<Home></Home>} path="/"></Route>
            </Route>
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/profile/:id"
              element={<ProfilePage />}
            />
             <Route
              path="/chatsec/:id"
              element={<ChatSection />}
            />
            <Route element={<Signup />} path="/signup"></Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
