import React, { useContext } from 'react';
import { format } from 'date-fns'
import { AuthContext } from '../../../context/AuthProvider';
import toast from 'react-hot-toast';
const AppBookModal = ({ treatment, selectedDate,setTreatment }) => {
    const {user} = useContext(AuthContext)
    const { name, slots } = treatment
    const date = format(selectedDate, 'PP')
    const appointmentHandling = event =>{
        event.preventDefault()
        const form = event.target 
        const patientName = form.name.value 
        const phone = form.phone.value 
        const email = form.email.value 
        const selectedTime = form.selectedTime.value 
        const bookingDoc = {
            appointmentDate: date, 
            treatment: name, 
            patient: patientName,
            phone,
            email,
            phone,
            selectedTime
        }
        fetch('http://localhost:5000/bookings', {
            method:'POST', 
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingDoc)

        })
        .then(res => res.json())
        .then(data =>{
            if(data.acknowledged){
                toast.success('Your appointment accepted!!')
            }
        })
        setTreatment(null)
    }

    return (
        <div>
            <input type="checkbox" id="appoinment-book-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="appoinment-book-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold text-secondary">{name}</h3>
                    <form onSubmit={appointmentHandling} className='my-4 p-4'>
                        <input type="text" value={date} disabled className="input input-bordered input-secondary w-full mb-3 input-sm" />
                        <select name='selectedTime' className="select select-secondary w-full mb-3">
                            {
                                slots.map((slot, index) => <option key={index} value={slot}>{slot}</option>)
                            }
                        </select>
                        <input type="text" disabled defaultValue={user?.displayName} name='name' placeholder="Your Name" className="input input-bordered input-secondary w-full mb-3 input-sm" />
                        <input type="text" required name='phone' placeholder="Phone Number" className="input input-bordered input-secondary w-full mb-3 input-sm" />
                        <input type="text" disabled defaultValue={user?.email} name='email' placeholder="Your Email" className="input input-bordered input-secondary w-full mb-3 input-sm" />
                        <br />
                        <label htmlFor='appoinment-book-modal'><button type='submit' className='w-full my-3 btn btn-outline btn-secondary'>Submit</button></label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AppBookModal;