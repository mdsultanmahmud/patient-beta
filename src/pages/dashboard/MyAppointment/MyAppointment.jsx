import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
const MyAppointment = () => {
    const { user } = useContext(AuthContext)
    const { data: bookedAppointment = [], isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings?email=${user.email}`, {
                headers: {
                    authorizationToken: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            console.log(data)
            return data
        }
    })

    if (isLoading) {
        return <div className='w-[100%] h-[80vh] grid place-items-center'>
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

    return (
        <div>
            <h2 className='my-4 font-semibold text-2xl'>My Appointment</h2>
            {
                bookedAppointment.length > 0 &&
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Patient</th>
                                <th>Treatment</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookedAppointment.map((booked, index) => <tr className='hover' key={booked._id}>
                                    <th>{index + 1}</th>
                                    <td>{booked.patient}</td>
                                    <td>{booked.treatment}</td>
                                    <td>{booked.appointmentDate}</td>
                                    <td>{booked.selectedTime}</td>
                                    <td>
                                        {
                                            booked.price && !booked.paid &&
                                            <Link to={`/dashboard/payment/${booked._id}`}>
                                                <button className='btn btn-outline btn-secondary btn-xs'>
                                                    Pay
                                                </button>
                                            </Link>
                                        }
                                        {
                                            booked.price && booked.paid &&
                                            <button className='btn btn-outline btn-secondary btn-xs'>Paid</button>
                                        }
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
};

export default MyAppointment;