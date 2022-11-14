import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
const Login = () => {
    const { register, handleSubmit } = useForm()
    const loginHandling = data =>{
        console.log(data)
    }
    return (
        <div className='min-h-screen grid place-items-center'>
            <div className='shadow-xl p-10 border border-sky-600'>
                <h1 className='text-center text-secondary text-2xl font-bold'>Please Login</h1>
                <form onSubmit={handleSubmit(loginHandling)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">Email</label>
                        <input required {...register('email')} className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">Password</label>
                        <input required {...register('password')} className="input input-bordered w-full max-w-xs" />
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