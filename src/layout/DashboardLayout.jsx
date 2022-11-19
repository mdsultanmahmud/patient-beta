import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useAdmin from '../customHooks/useAdmin';
import Navbar from '../pages/sharedPage/Nabar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content relative">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li><Link to={'/dashboard'}>My Appointment</Link></li>
                        {
                            isAdmin &&
                            <>
                                <li><Link to={'/dashboard/users'}>All Users</Link></li>
                                <li><Link to={'/dashboard/adddoctor'}>Add a Doctor</Link></li>
                                <li><Link to={'/dashboard/manageDoctor'}>Manage Doctor</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;