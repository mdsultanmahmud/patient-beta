import React from 'react';
import AppBanner from '../AppBanner/AppBanner';
import AvailableApp from '../AvailableApp/AvailableApp';
import { useState } from 'react';
const Appointment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    return (
        <div>
            <section>
                <AppBanner selectedDate={selectedDate} setSelectedDate={setSelectedDate}></AppBanner>
                <AvailableApp
                    selectedDate={selectedDate}
                ></AvailableApp>
            </section>
        </div>
    );
};

export default Appointment;