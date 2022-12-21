import React from 'react';
import AppBanner from '../AppBanner/AppBanner';
import AvailableApp from '../AvailableApp/AvailableApp';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
const Appointment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    return (
        <div>
            <Helmet>
                <title>Patient Beta -- Appointment</title>
            </Helmet>
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