import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { BallTriangle } from  'react-loader-spinner'
import useAdmin from '../customHooks/useAdmin';
const AdminRoutes = ({ children }) => {
    const location = useLocation()
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
    if (loading || isAdminLoading) {
        return <div className='w-[100vw] h-[80vh] grid place-items-center'>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </div>
    }
    if (user && user.uid && isAdmin) {
        return children
    }
    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>
};

export default AdminRoutes;