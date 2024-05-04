import {useSelector } from "react-redux"
import {Outlet, Navigate} from 'react-router-dom';
const PrivateRoute = () => {
    const {isAuthenticated} = useSelector((state) => state.auth)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login'/>
}

export default PrivateRoute
