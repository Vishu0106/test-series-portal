
import { Navigate, Outlet } from "react-router-dom";

function IsAdmin() {
    const isAdmin = localStorage.getItem('isAdmin');
    console.log(isAdmin);
    return isAdmin==true  ? (<Outlet />): (<Navigate to='/accessdinied' />)

     
}

export default IsAdmin;