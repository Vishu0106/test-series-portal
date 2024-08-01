import { Navigate, Outlet } from "react-router-dom";

function RequireAuth() {

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    return isLoggedIn  ? (<Outlet />): (<Navigate to='/login' />)

     
}

export default RequireAuth;