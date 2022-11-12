import React from 'react';

const Service = ({ service }) => {
    const { name, description, icon } = service
    return (
        <div className="card card-compact bg-base-100 shadow-xl p-4">
            <figure><img src={icon} alt="Shoes" /></figure>
            <div className="card-body ">
                <h2 className="card-title font-semibold text-sky-400">{name}</h2>
                <p className='text-gray-400'>{description}</p>
            </div>
        </div>
    );
};

export default Service;