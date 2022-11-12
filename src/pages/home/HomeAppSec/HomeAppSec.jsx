import React from 'react';
import doctorHome from '../../../assets/doctor-home.jpg'
import backApp from '../../../assets/appointment.png'
import doctor from '../../../assets/doctor.png'
const HomeAppSec = () => {
    return (
        <section className='mt-20' style={{backgroundImage: `url("${backApp}")`, backgroundAttachment:'fixed'}}>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={doctor} className="lg:-mt-32 w-full lg:w-1/2 rounded-sm hidden md:block" />
                    <div>
                        <h3 className='text-green-400 font-semibold text-sm'>Appointment</h3>
                        <h1 className="text-3xl font-bold mt-2 text-green-600">Make an Appointment Today</h1>
                        <p className="py-6 text-sm text-gray-300">You should make an appointment by calling or by email. Do not try to make appointments by text, unless you are simply asking a good friend if they would like to have lunch. When making an appointment you should give the person your name and the reason for wanting an appointment.</p>
                        <button className="btn btn-secondary btn-outline">Get Appointment</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeAppSec;