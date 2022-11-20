import React from 'react';

const DeletingModal = ({deleteDoctor, deletingDoctor}) => {
    return (
        <div>
            <input type="checkbox" id="confirmDeleteModal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box relative">
                <label htmlFor="confirmDeleteModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">{`Are you sure you want to delete ${deleteDoctor.name}`}</h3>
                    <p className="py-4">{`If you delete you can't get it back`}</p>
                    <div className="modal-action">
                        <label onClick={() => deletingDoctor(deleteDoctor)} htmlFor="confirmDeleteModal" className="btn">Delete</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeletingModal;