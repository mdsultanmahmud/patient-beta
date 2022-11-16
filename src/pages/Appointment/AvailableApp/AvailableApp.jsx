import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import AppServices from '../AppServices/AppServices';
import AppBookModal from '../AppBookModal/AppBookModal';
import { useQuery } from '@tanstack/react-query';
import { Dna } from 'react-loader-spinner';
const AvailableApp = ({ selectedDate }) => {
    const [treatment, setTreatment] = useState(null)
    const date = format(selectedDate, 'PP')
    // const {data: services = []} = useQuery({
    //     queryKey:['appointmentServicess'],
    //     queryFn: () => fetch('http://localhost:5000/appointmentServicess')
    //     .then(res => res.json())
    // })

    const { data: services = [], refetch, isLoading } = useQuery({
        queryKey: ['appointmentServicess', date],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/appointmentServicess?date=${date}`)
            const data = await res.json()
            return data
        }
    })

    if (isLoading) {
        return <div className='h-[100vh] w-[100vw] grid place-items-center'>
            <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    }

    return (
        <div>
            <p className='text-xl font-semibold text-center my-4 text-green-600'>Avaiable Appointments on{format(selectedDate, 'PP')}</p>
            <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    services.map(service => <AppServices
                        key={service._id}
                        service={service}
                        setTreatment={setTreatment}
                    ></AppServices>)
                }
            </div>
            <div>
                {
                    treatment &&
                    <AppBookModal selectedDate={selectedDate} treatment={treatment}
                        setTreatment={setTreatment}
                        refetch={refetch}
                    ></AppBookModal>
                }
            </div>
        </div>
    );
};

export default AvailableApp;