import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllUsers = () => {
    const {data: users = [], refetch} = useQuery({
        queryKey:['users'],
        queryFn: async () =>{
            const res = await fetch('https://patient-beta-server.vercel.app/users')
            const data = await res.json()
            return data
        }
    })

    const handleAdminMaking = (id) =>{
        fetch(`https://patient-beta-server.vercel.app/users/${id}`, {
            method: 'PUT',
            headers: {
                authorizationtoken: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            if(data.modifiedCount>0){
                toast.success('Successfully making the admin!')
                refetch()
            }else{
                toast.error(data.message)
            }
        })
    }
    return (
        <div>
            <h3>All Users</h3>
            <div>
                {
                    <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr className='hover' key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role !== 'admin' && <button onClick={()=> handleAdminMaking(user._id)} className='btn btn-outline btn-primary btn-sm'>Make Admin</button>}</td>
                                    <td><button className='btn btn-outline btn-secondary btn-sm'>Delete</button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                }
            </div>
        </div>
    );
};

export default AllUsers;