import React, { useState } from 'react';
import appBanner from '../../../assets/appBanner.jpg'

import { DayPicker } from 'react-day-picker';
const AppBanner = ({selectedDate, setSelectedDate}) => {
    
    return (
        <div className="hero my-12">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={appBanner} className="lg:w-1/2 rounded-lg shadow-2xl" />
                <div className='mr-8'>
                    <DayPicker
                        mode='single'
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                    />
                    
                </div>
            </div>
        </div>
    );
};

export default AppBanner;