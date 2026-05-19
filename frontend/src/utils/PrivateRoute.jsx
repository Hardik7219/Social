import { Outlet,Navigate } from "react-router-dom";

const PrivateRoute = ()=>{
    const auth = {'token':true}
    return (
        auth.token?<Outlet/>:<Navigate to="/signup"></Navigate>
    )
}

export default PrivateRoute