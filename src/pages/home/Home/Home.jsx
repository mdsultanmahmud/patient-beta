import React from 'react';
import Banner from '../Banner/Banner';
import HomeAppSec from '../HomeAppSec/HomeAppSec';
import InfoCards from '../InfoCards/InfoCards';
import Testimonials from '../Testimonials/Testimonials';
import Services from './Services/Services';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <Services></Services>
            <HomeAppSec></HomeAppSec>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;