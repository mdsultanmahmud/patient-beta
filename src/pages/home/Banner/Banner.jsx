import React from 'react';
import banner from '../../../assets/banner.jpg'
const Banner = () => {
    return (
        <div className="hero min-h-screen bg-base-200 ">
            <div className="hero-content flex-col lg:flex-row bg-opacity-10">
                <img src={banner} className="w-full lg:w-1/2 rounded-lg shadow-2xl md:mr-4" />
                <div>
                    <h1 className="text-4xl font-bold text-pink-600">Medicine cures diseases, but only doctors can cure patients.</h1>
                    <p className="py-6">Medicine aims to prevent disease plus prolong life; the idea of medicine is to eliminate the need of a physician.</p>
                    <button className="btn btn-primary bg-gradient-to-r from-cyan-400 to-cyan-700 hover:from-blue-400 hover:to-pink-600 border-none">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;