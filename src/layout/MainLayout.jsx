import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/sharedPage/Footer/Footer';
import Navbar from '../pages/sharedPage/Nabar/Navbar';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;