import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import MainLayout from "../layout/MainLayout";
import Appointment from "../pages/Appointment/Appointment/Appointment";
import AddDoctor from "../pages/dashboard/AddDoctor/AddDoctor";
import AllUsers from "../pages/dashboard/AllUsers/AllUsers";
import Dashboard from "../pages/dashboard/Dashboard/Dashboard";
import Payment from "../pages/dashboard/Dashboard/Payment/Payment";
import ManageDoc from "../pages/dashboard/ManageDoc/ManageDoc";
import MyAppointment from "../pages/dashboard/MyAppointment/MyAppointment";
import Home from "../pages/home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/sharedPage/ErrorPage/ErrorPage";
import AdminRoutes from "./AdminRoutes";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
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
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointment></MyAppointment>
            },
            {
                path:'/dashboard/users',
                element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
            },
            {
                path:'/dashboard/adddoctor',
                element:<AddDoctor></AddDoctor>
            },
            {
                path: '/dashboard/manageDoctor',
                element: <ManageDoc></ManageDoc>
            },
            {
                path: `/dashboard/payment/:id`,
                element: <Payment></Payment>,
                loader: ({params}) => fetch(`http://localhost:5000/bookings/${params.id}`)
            }

        ]
    }
])

export default router