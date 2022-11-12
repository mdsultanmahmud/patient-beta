import React from 'react';
import InfoCard from './InfoCard';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
const InfoCards = () => {
    const cards = [
        {
            id:1,
            name:'Opening Hours',
            description:'Our hospital open 24/7 for you. Please come and take treatment from us.',
            bgColor:'bg-violet-700',
            icon: faClock
        },
        {
            id: 2,
            name: 'Contact us Now',
            description:'+8801764061485',
            bgColor:'bg-fuchsia-500',
            icon: faPhone
        },
        {
            id:3,
            name:'Visit Our Location',
            description:'Binodpur, Rajshahi, Bangladesh',
            bgColor:'bg-indigo-600',
            icon: faLocationDot
        }
    ]
    return (
        <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                cards.map(card => <InfoCard key={card.id} infocard={card}></InfoCard>)
            }
        </div>
    );
};

export default InfoCards;