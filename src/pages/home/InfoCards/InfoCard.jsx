
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const InfoCard = ({ infocard }) => {
    const { name, description, bgColor, icon } = infocard
    return (
        <div className={`p-4 flex items-center rounded-lg ${bgColor}`}>
            <FontAwesomeIcon className='w-12 h-12 text-white' icon={icon}></FontAwesomeIcon>
            <div className='ml-3'>
                <h3 className='text-white text-xl font-semibold mb-3'>{name}</h3>
                <p className='text-white text-sm font-semibold'>{description}</p>
            </div>
        </div>
    );
};

export default InfoCard;