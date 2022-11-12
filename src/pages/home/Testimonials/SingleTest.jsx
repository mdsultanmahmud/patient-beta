import React from 'react';

const SingleTest = ({ review }) => {
    const { name, description, reviwer, location } = review
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <p>{description}</p>
                <div className="card-actions mt-3 flex items-center">
                    <div className="avatar">
                        <div className="w-16 h-16 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                            <img src={reviwer} />
                        </div>
                    </div>
                    <div className='ml-2'>
                        <h3 className='text-xl text-bold'>{name}</h3>
                        <h4 className='text-sm text-semibold'>{location}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleTest;