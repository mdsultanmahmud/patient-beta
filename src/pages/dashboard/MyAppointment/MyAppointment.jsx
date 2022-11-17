import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import { BallTriangle } from  'react-loader-spinner'
const MyAppointment = () => {
    const { user } = useContext(AuthContext)
    // useEffect( ()=>{
    //     fetch(`http://localhost:5000/bookings?email=${user.email}`)
    //     .then(res => res.json())
    //     .then(data =>{
    //         console.log(data)
    //     })
    // } ,[])

    const { data: bookedAppointment = [], isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const data = await fetch(`http://localhost:5000/bookings?email=${user.email}`)
            return data.json()
        }
    })

    if(isLoading){
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


    return (
        <div>
            <h2 className='my-4 font-semibold text-2xl'>My Appointment</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Patient</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookedAppointment.map((booked, index) => <tr key={booked._id}>
                                <th>{index + 1}</th>
                                <td>{booked.patient}</td>
                                <td>{booked.treatment}</td>
                                <td>{booked.appointmentDate}</td>
                                <td>{booked.selectedTime}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;