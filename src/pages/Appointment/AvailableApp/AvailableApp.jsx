import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import AppServices from '../AppServices/AppServices';
import AppBookModal from '../AppBookModal/AppBookModal';
import { useQuery } from '@tanstack/react-query';
const AvailableApp = ({selectedDate}) => {
    const [treatment, setTreatment] = useState(null)

    // const {data: services = []} = useQuery({
    //     queryKey:['appointmentServicess'],
    //     queryFn: () => fetch('http://localhost:5000/appointmentServicess')
    //     .then(res => res.json())
    // })

    const {data: services = []} = useQuery({
        queryKey:['appointmentServicess'],
        queryFn:   async() =>{
            const res = await fetch('http://localhost:5000/appointmentServicess')
            const data = await res.json()
            return data 
        }
    }) 
    

    return (
        <div>
            <p className='text-xl font-semibold text-center my-4 text-green-600'>Avaiable Appointments on{format(selectedDate, 'PP')}</p>
            <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    services.map(service => <AppServices 
                        key={service._id}
                        service = {service}
                        setTreatment = {setTreatment}
                    ></AppServices>)
                }
            </div>
           <div>
                {
                    treatment && 
                    <AppBookModal selectedDate = {selectedDate} treatment = {treatment}
                    setTreatment = {setTreatment}
                    ></AppBookModal>
                }
           </div>
        </div>
    );
};

export default AvailableApp;