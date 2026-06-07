import {Navigate} from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
function PrivateRoute({children, requiredRole }){
    const token=localStorage.getItem('token');
    if(!token) return <Navigate to='/login' />

    const decoded = jwtDecode(token);
    if(requiredRole && decoded.role !== requiredRole){
        return <Navigate to='/unauthorized' />
    }

    return children;
}

export default PrivateRoute;