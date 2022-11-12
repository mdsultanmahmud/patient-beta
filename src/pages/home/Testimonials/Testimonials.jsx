import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import peopleOne from '../../../assets/people-1.jpg'
import peopleTwo from '../../../assets/people-2.jpg'
import peopleThree from '../../../assets/peope-3.jpg'
import SingleTest from './SingleTest';
const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            name:'Jonson Debay',
            description:'DRS Believes that the client deserves respect and quality of service today, tomorrow and everday - We even have live representatives here in the USA answering your calls. We are prould to be Medical Review Offers - The security arm of the drug testing industry.',
            reviwer: peopleOne,
            location: 'United States'
        },
        {
            id: 2,
            name:'Jibon Dash',
            description:'DRS Believes that the client deserves respect and quality of service today, tomorrow and everday - We even have live representatives here in the USA answering your calls. We are prould to be Medical Review Offers - The security arm of the drug testing industry.',
            reviwer: peopleTwo,
            location: 'United States'
        },
        {
            id: 3,
            name:'Kaji Najrul Islam',
            description:'DRS Believes that the client deserves respect and quality of service today, tomorrow and everday - We even have live representatives here in the USA answering your calls. We are prould to be Medical Review Offers - The security arm of the drug testing industry.',
            reviwer: peopleThree,
            location: 'United States'
        }
    ]

    return (
        <div className='my-12 p-4'>
            <div className='flex justify-between'>
            <div>
                <h3 className='text-green-400 text-sm font-bold'>Testimonials</h3>
                <h1 className='text-2xl md:text-3xl font-semibold capitalize'>Whats our patients say</h1>
            </div>
            <div>
                <FontAwesomeIcon className='w-16 h-24 text-green-300' icon={faQuoteLeft}> </FontAwesomeIcon>
            </div>
            </div>
            <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    reviews.map(review => <SingleTest key={review.id} review={review}></SingleTest>)
                }
            </div>
        </div>
    );
};

export default Testimonials;