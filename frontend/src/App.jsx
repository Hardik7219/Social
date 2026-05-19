import Home from "./features/home/Home"
import Signup from './features/auth/signup/Signup'
import ProfilePage from "./features/profile/ProfilePage"
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import PrivateRoute from "./routes/PrivateRoute"
import Login from "./features/auth/login/Login"

function App() {

  return (
    <>
      <div>
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
            <Route element={<Signup />} path="/signup"></Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
