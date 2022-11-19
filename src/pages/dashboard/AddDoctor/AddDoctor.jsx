import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BallTriangle } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const { data: specialities = [], isLoading } = useQuery({
        queryKey: ['speciality'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpeciality')
            const data = await res.json()
            return data
        }
    })
    const navigate = useNavigate()
    const handleAddDoctor = data => {
        const image = data.file[0]
        const formData = new FormData()
        formData.append('image', image)

        // hosting image on imagebb 
        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgagebb_Api}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imagesData => {
                // now post the data into server 
                if (imagesData.success) {
                    const addingDoctor = {
                        name: data.name,
                        email: data.email,
                        speciality: data.speciality,
                        picture: imagesData.data.url,
                        chamber: data.chamber

                    }
                    console.log(addingDoctor)

                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorizationtoken: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(addingDoctor)
                    })
                    .then(res => res.json())
                    .then(serverData =>{
                        if(serverData.acknowledged){
                            toast.success('Doctor added!')
                            navigate('/dashboard/manageDoctor')
                        }
                        console.log(serverData)
                    })
                }

            })
            .catch(error => {
                console.log(error)
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
            <h3>Add a lo n doctor</h3>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">Name</label>
                    <input {...register('name', { required: 'Name is required' })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.name && <p role={'alert'} className='text-error text-sm my-2'>{errors.name?.message}</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">Email</label>
                    <input {...register('email', { required: 'Email is required' })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p role={'alert'} className='text-error text-sm my-2'>{errors.email?.message}</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">Doctors Chamber</label>
                    <input {...register('chamber', { required: 'Chamber is required' })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.chamber && <p role={'alert'} className='text-error text-sm my-2'>{errors.chamber?.message}</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">Speciality</label>
                    <select {...register('speciality', { required: 'Please add your speciality.' })} className="select select-bordered w-full max-w-xs">
                        {
                            specialities.map(sp => <option key={sp._id}>{sp.name}</option>)
                        }
                    </select>
                    {errors.speciality && <p role={'alert'} className='text-error text-sm my-2'>{errors.speciality?.message}</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">Add Image</label>
                    <input type={'file'} {...register('file', { required: 'Image is required' })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.file && <p role={'alert'} className='text-error text-sm my-2'>{errors.file?.message}</p>}
                </div>
                <input value={'Add Doctor'} type="submit" className="btn w-full max-w-xs mt-2" />
            </form>
        </div>
    );
};

export default AddDoctor;


/**
 * Image hosting idea===>
 * Three places to store images
 * 1. Image hosting server
 * 2. File system of your system
 * 3. mongodb (database)
 */