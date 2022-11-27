import {Navigate, Outlet} from 'react-router-dom'

const ProtectedRoute = ({isAllow, children, redirectTo = "/landing"}) => {
    if(!isAllow) return <Navigate to={redirectTo} /> 
    return children ? children : <Outlet />
}

export default ProtectedRoute