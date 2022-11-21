import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BallTriangle } from 'react-loader-spinner'
import DeletingModal from '../DeletingModal/DeletingModal';
const ManageDoc = () => {
    const [deleteDoctor, setDeleteDoctor] = useState(null)
    const { data: doctors = [], isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            const res = await fetch('https://patient-beta-server.vercel.app/doctors', {
                headers: {
                    authorizationToken: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data
        }
    })


    const deletingDoctor = doctor => {
        fetch(`https://patient-beta-server.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorizationToken: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(deleteData => {
                console.log(deleteData)
                if (deleteData.deletedCount > 0) {
                    toast.success(`${doctor.name} Deleted successfully!`)
                    refetch()
                }
            })
    }

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
            <h1 className='text-center font-semibold text-secondary text-2xl my-4'>Our All Doctors</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Speciality</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map(doctor => <tr key={doctor._id}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={doctor.picture} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{doctor.name}</div>
                                            <div className="text-sm opacity-50">{doctor.chamber}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{doctor.email}</td>
                                <td>{doctor.speciality}</td>
                                <th>
                                    <label onClick={() => setDeleteDoctor(doctor)} htmlFor="confirmDeleteModal" className="btn btn-outline btn-primary btn-xs">Delete</label>
                                </th>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
            <div>
                {
                    deleteDoctor && <DeletingModal
                        key={deleteDoctor._id}
                        deleteDoctor={deleteDoctor}
                        deletingDoctor={deletingDoctor}
                    ></DeletingModal>
                }
            </div>
        </div>
    );
};

export default ManageDoc;