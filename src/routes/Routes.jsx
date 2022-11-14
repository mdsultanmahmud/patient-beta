import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Appointment from "../pages/Appointment/Appointment/Appointment";
import Dashboard from "../pages/dashboard/Dashboard/Dashboard";
import Home from "../pages/home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/appointment',
                element: <Appointment></Appointment>
            },
            {
                path:'/dashboard',
                element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>
            }
        ]
    }
])

export default router