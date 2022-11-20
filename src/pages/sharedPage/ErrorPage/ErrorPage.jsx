import { error } from 'daisyui/src/colors';
import React from 'react';
import { Link } from 'react-router-dom';
const ErrorPage = () => {
    return (
        <div className=''>
            <h4>Sorry, You are wrong route.</h4>
            <Link className='text-green-500' to='/'>Go to main page</Link>
            <h3>{error.statusText || error.message}</h3>
        </div>
    );
};

export default ErrorPage;