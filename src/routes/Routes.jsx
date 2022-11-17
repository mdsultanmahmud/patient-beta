import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import MainLayout from "../layout/MainLayout";
import Appointment from "../pages/Appointment/Appointment/Appointment";
import Dashboard from "../pages/dashboard/Dashboard/Dashboard";
import MyAppointment from "../pages/dashboard/MyAppointment/MyAppointment";
import Home from "../pages/home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/appointment',
                element: <Appointment></Appointment>
            }
        ]

    },
    {
        path: '/dashboard',
        element: <PrivateRoutes> <DashboardLayout></DashboardLayout> </PrivateRoutes>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointment></MyAppointment>
            }
        ]
    }
])

export default router