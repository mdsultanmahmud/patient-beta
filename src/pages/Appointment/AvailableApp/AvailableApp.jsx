import React from 'react';
import { format } from 'date-fns';
const AvailableApp = ({selectedDate}) => {
    return (
        <div>
            <p className='text-xl font-semibold text-center my-4 text-green-600'>Avaiable Appointments on{format(selectedDate, 'PP')}</p>
        </div>
    );
};

export default AvailableApp;