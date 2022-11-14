import React from 'react';

const AppServices = ({ service, setTreatment }) => {
    const { name, slots } = service
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl font-semibold text-secondary">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'Try next time.'}</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
                <div className="card-actions justify-end">
                    <label
                        onClick={() => setTreatment(service)}
                        htmlFor="appoinment-book-modal"
                        className="btn btn-secondary btn-outline my-4"
                        disabled = {slots.length === 0}
                        >Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppServices;
