import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast'
const Login = () => {
    const { Login } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/"

    const loginHandling = data => {
        Login(data.email, data.password)
            .then(res => {
                const user = res.user
                if (user) {
                    toast.success('Login successfully!')
                    console.log(user)
                    navigate(from, { replace: true })
                }
            })
            .catch(e => {
                console.log(e)
                toast.success(e.message)
            })
    }
    return (
        <div className='min-h-screen grid place-items-center'>
            <div className='shadow-xl p-10 border border-sky-600'>
                <h1 className='text-center text-secondary text-2xl font-bold'>Please Login</h1>
                <form onSubmit={handleSubmit(loginHandling)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">Email</label>
                        <input {...register('email', { required: true })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p role={'alert'} className='text-error text-sm my-2'>Email is required</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">Password</label>
                        <input
                            type={'password'}
                            {...register('password', {
                                required: 'password is required',
                                minLength: { value: 6, message: 'password length minimum 6 characters.' }
                            })}

                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p role={'alert'} className='text-error text-sm my-2'>{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text-alt">Forget password?</span>
                        </label>
                    </div>
                    <input value={'Login'} type="submit" className="btn w-full max-w-xs" />
                </form>
                <p className='text-sm font-bold my-3'>New to doctors portal? <Link to={'/register'} className='text-green-700'>Please create an account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-secondary w-full'>Sign in with Google</button>
            </div>
        </div>
    );
};

export default Login;