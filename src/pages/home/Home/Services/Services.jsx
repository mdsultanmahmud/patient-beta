import React from 'react';
import cavity from '../../../../assets/cavity.png'
import fluoride from '../../../../assets/fluoride.png'
import whitening from '../../../../assets/whitening.png'
import Service from './Service';
const Services = () => {
    const servicesData = [
        {
            id:1,
            name: 'Teeth Whitening',
            description: 'Tooth whitening or tooth bleaching is the process of lightening the color of human teeth.',
            icon: whitening
        },
        {
            id:2,
            name: 'Fluoride Treatment',
            description: 'Fluoride varnish can be applied to both baby teeth and adult teeth by a dentist.',
            icon: fluoride
        },
        {
            id:3,
            name: 'Cavity Filling',
            description: ' Fillings prevent bacteria or plaque from building up inside cavities, which could lead to serious infections',
            icon: cavity
        }
    ]
    return (
        <div className='my-8'>
            <h3 className='text-2xl text-center font-bold text-green-400'>Our Services</h3>
            <p className='text-sm text-center font-semibold text-gray-400'>We provide best service in this area. Take treatment from us and keep healty.</p>
            <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8'>
                {
                    servicesData.map(serv => <Service key={serv.id} service = {serv}></Service>)
                }
            </div>
       </div>
    );
};

export default Services;