import { Outlet,Navigate } from "react-router-dom";
import useAuth from '../hooks/useAuth'
import AppLoader from "../components/ui/AppLoader";

const PrivateRoute = ()=>{
    const {user,loading}= useAuth();
    if(loading) return <AppLoader></AppLoader>

    return user ? <Outlet/> : <Navigate to="/login" />
}

export default PrivateRoute