import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth); // auth is the part of our state we want, auth is the  slice. it consists userInfo.
    
  return userInfo ? <Outlet /> : <Navigate to='/login' replace /> // Outlet is a placeholder for the child routes of the parent route. if userInfo is true then show Outlet else redirect to login page.
}

export default PrivateRoute