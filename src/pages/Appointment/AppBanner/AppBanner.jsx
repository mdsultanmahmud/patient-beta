import React, { useState } from 'react';
import appBanner from '../../../assets/appBanner.jpg'
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
const AppBanner = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    return (
        <div className="hero my-12">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={appBanner} className="max-w-sm rounded-lg shadow-2xl" />
                <div className='mr-8'>
                    <DayPicker
                        mode='single'
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                    />
                    <p>Your selected date: {format(selectedDate, 'PP')}</p>
                </div>
            </div>
        </div>
    );
};

export default AppBanner;