import React, { useState } from 'react'
import { Bounce, toast } from "react-toastify";
import axios from "axios";

const DeleteWorkout = ({ workoutId, user, dispatch }) => {
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const confirmDelete = () => setDeleteConfirm(true);
    const confirmDeleteCancel = () => setDeleteConfirm(false);

    const handleDelete = async () => {
        if (!user) {
            toast.error("You must be logged in to delete workouts.");
            return;
        }
        if (isDeleting) return
        setIsDeleting(true);
        try {
            console.log("Deleting workout with ID:", workoutId);
            const response = await axios.delete(`http://localhost:4000/api/workouts/${workoutId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            dispatch({ type: 'DELETE_WORKOUT', payload: workoutId })
            toast.success(response.data.message);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to delete workout!";
            toast.error(errorMessage);
            throw new Error(errorMessage)
        }
        setDeleteConfirm(false);
        setIsDeleting(false);
    }

    //confirm delete button style
    const deleteButtonStyle = `text-white rounded-full p-2 cursor-pointer bg-red-500 hover:bg-red-600 
            dark:text-darkButtonText dark:bg-darkDeleteButton dark:hover:bg-darkDeleteButtonHover 
            transition-colors duration-200 size-10`

    //cancel delete button style
    const cancelDeleteButtonStyle = `px-4 py-2 dark:text-darkCancelButtonText bg-gray-400 hover:bg-gray-500 dark:bg-darkCancelButton dark:hover:bg-darkCancelButtonHover rounded-lg cursor-pointer transition-colors duration-200`

    //confirm delete button sty
    const confirmDeleteButtonStyle = `px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 dark:bg-darkDeleteButton dark:hover:bg-darkDeleteButtonHover transition-colors duration-200 cursor-pointer`
    return (
        <>
            <svg onClick={confirmDelete} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={1.5} stroke="currentColor"
                className={deleteButtonStyle}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>

            {deleteConfirm && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-black/80 z-10">
                    <div className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-lg transition-colors duration-200">
                        <p className="text-lg font-semibold dark:text-darkTextResult transition-colors duration-200">
                            Are you sure you want to delete this workout?
                        </p>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button onClick={confirmDeleteCancel}
                                className={cancelDeleteButtonStyle}>
                                Cancel
                            </button>
                            <button onClick={handleDelete}
                                className={confirmDeleteButtonStyle}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DeleteWorkout