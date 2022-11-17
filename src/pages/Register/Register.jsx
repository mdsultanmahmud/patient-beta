import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast'
import useToken from '../../customHooks/useToken';
const Register = () => {
    const { Register, updateUserProfie,googleSign ,emailVerify} = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm()
    const naviget = useNavigate()
    const [createdUserToken, setCreatedUserToken] = useState('')
    const [token] = useToken(createdUserToken)
    if(token){
        naviget('/')
    }
    const handleRegister = data => {
        console.log(data)
        const profie = {
            displayName: data.name
        }
        Register(data.email, data.password)
            .then(res => {
                const user = res.user
                updateUserProfie(profie)
                    .then(res => {
                        console.log(user)
                        toast.success('You have created an account successfully!!')
                        createUserIntoDB(data.name, data.email)
                        emailVerify()
                        .then(res =>{
                            toast.success('Please verify your email')
                        })
                    })
                    .catch(e => {
                        console.log(e)
                        toast.error(e.message)
                    })
            })
            .catch(e => {
                console.log(e)
                toast.error(e.message)
            })
    }


    const createUserIntoDB = (name, email) =>{
        const dbStoredUser = {name, email}
        fetch(`http://localhost:5000/users`, {
            method: 'POST', 
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(dbStoredUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setCreatedUserToken(email)
            
        })
    }

    const handleGoogleLogin = () =>{
        googleSign()
        .then(res =>{
            const user = res.user
            if(user){
                toast.success('Login Succesfull')
                console.log(user)
                naviget('/')
            }
        })
        .catch(err =>{
            console.log(err)
            toast.error(e.message)
        })
    }
    return (
        <div className='min-h-screen grid place-items-center'>
            <div className='shadow-xl p-10 border border-sky-600 my-4'>
                <h1 className='text-center text-secondary text-2xl font-bold'>Create Account!</h1>
                <form onSubmit={handleSubmit(handleRegister)}>
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
                        <label className="label">Password</label>
                        <input
                            type={'password'}
                            {...register('password', {
                                required: 'password is required',
                                minLength: {
                                    value: 6, message: 'password length minimum 6 characters.',
                                    pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]$/, message: 'Password must be strong!' }
                                }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p role={'alert'} className='text-error text-sm my-2'>{errors.password?.message}</p>}
                    </div>

                    <input value={'Register'} type="submit" className="btn w-full max-w-xs mt-2" />
                </form>
                <p className='text-sm font-bold my-3'>Already have an account?? <Link to={'/login'} className='text-green-700'>Please Login</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleLogin} className='btn btn-secondary w-full'>Sign in with Google</button>
            </div>
        </div>
    );
};

export default Register;