import axios from "axios"
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext"
import { formatDistanceToNow } from 'date-fns'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkoutDetails = ({ workout }) => {

    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useWorkoutsContext()
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [title, setTitle] = useState(workout.title)
    const [load, setLoad] = useState(workout.load);
    const [reps, setReps] = useState(workout.reps);
    const [error, setError] = useState(null);

    const handleTitleClick = () => {
        navigate("/test", { state: { workout } });
    }
    const confirmDelete = () => {
        setDeleteConfirm(true);
    }
    const confirmDeleteCancel = () => {
        setDeleteConfirm(false);
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
        setTitle(workout.title);
        setLoad(workout.load);
        setReps(workout.reps);
        toast.info("Editing canceled", { autoClose: 2000, hideProgressBar: true, transition: Bounce });
    };
    const handleEnableEdit = () => {
        setIsEditing(true);
        toast.info("Editing Enabled", { autoClose: 2000, hideProgressBar: true, transition: Bounce });
    };

    const handleDelete = async () => {
        if (isDeleting) return
        setIsDeleting(true);
        try {
            console.log("Deleting workout with ID:", workout._id);
            const response = await axios.delete(`http://localhost:4000/api/workouts/${workout._id}`)
            dispatch({ type: 'DELETE_WORKOUT', payload: workout._id })
            toast.success(response.data.message);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to delete workout!";
            toast.error(errorMessage);
            throw new Error(errorMessage)
        }
        setDeleteConfirm(false);
    }

    const handleUpdate = async () => {
        if (title.trim() === '') {
            toast.error("Title cannot be empty!");
            return setError("Title cannot be empty!");
        }
        if (load < 0 || reps < 0) {
            toast.error("Load and reps cannot be negative!");
            return setError("Load and reps cannot be negative!");
        }

        try {
            const response = await axios.patch(`http://localhost:4000/api/workouts/${workout._id}`, {
                title,
                load: Number(load),
                reps: Number(reps)
            })
            dispatch({ type: 'UPDATE_WORKOUT', payload: response.data.updateWorkout })
            setIsEditing(false)
            setError(null)
            toast.success(response?.data?.message);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update workout!";
            toast.error(errorMessage);
            throw new Error(errorMessage)
        }
    }


    const handleLoadOnChange = (e) => {
        setLoad(e.target.value)
    }
    const handleRepsOnChange = (e) => {
        setReps(e.target.value)
    }
    const handleTitleOnChange = (e) => {
        setTitle(e.target.value)
    }



    return (
        <div className="flex items-start bg-white dark:bg-darkSecondary max-w-screen rounded-lg font-Poppins ml-4  pb-5  pl-5 pt-5 flex-col shadow-md mb-5 transition-colors duration-200">
            {isEditing ? (
                <div>
                    {error && <p className="text-red-600 text-s mb-4">{error}</p>}

                    <div className="flex flex-wrap gap-2.5 justify-between">


                        <input className="border p-1 rounded-lg border-gray-300 dark:border-darkBorder mr-2 dark:bg-darkInputBackground dark:text-darkInputText transition-colors duration-200" placeholder="Workout Title" value={title} onChange={handleTitleOnChange} />
                        <input className="border p-1 rounded-lg border-gray-300 mr-2 dark:border-darkBorder 
                        dark:bg-darkInputBackground dark:text-darkInputText transition-colors duration-200" type="number" min='1' placeholder="Load" value={load} onChange={handleLoadOnChange} />
                        <input className="border p-1 rounded-lg border-gray-300 mr-2 dark:border-darkBorder 
                        dark:bg-darkInputBackground dark:text-darkInputText transition-colors duration-200" type="number" min='1' placeholder="Reps" value={reps} onChange={handleRepsOnChange} />
                        <p className="dark:text-darkTextResult transition-colors duration-200">Last updated: {formatDistanceToNow(new Date(workout.updatedAt), { addSuffix: true })} ago</p>
                        <div className="flex mr-3">
                            <svg onClick={handleUpdate} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="p-1 rounded-lg bg-green-500 text-white hover:bg-green-600 active:bg-green-500 mr-2 size-10 cursor-pointer dark:bg-darkSaveButton dark:hover:bg-darkSaveButtonHover dark:active:bg-darkSaveButton dark:text-darkButtonText transition-colors duration-200">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            {/* cancel button */}
                            <svg onClick={handleCancelEdit} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="p-1 rounded-full text-white  mr-2 size-10 cursor-pointer bg-gray-400  hover:bg-gray-500 active:bg-gray-400 dark:bg-darkCancelButton dark:hover:bg-darkCancelButtonHover dark:active:bg-darkCancelButton dark:text-darkCancelButtonText transition-colors duration-200">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                </div>
            ) : (<>
                <h4 className="cursor-pointer text-2xl font-extrabold text-blue-600 hover:text-darkTextPrimaryHover dark:text-darkTextPrimary transition-colors duration-200" onClick={handleTitleClick}>{workout.title}</h4>
                <div className="flex justify-between w-full pr-5 items-center dark:text-darkTextResult transition-colors duration-200">
                    <p><strong className="dark:text-darkTextSecondary transition-colors duration-200">Load (kg) : </strong>{workout.load}</p>
                    <p><strong className="dark:text-darkTextSecondary transition-colors duration-200">Reps : </strong>{workout.reps}</p>
                    <p><strong className="dark:text-darkTextSecondary transition-colors duration-200">Created : </strong>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>


                    <div className="flex gap-2 mt-3">
                        <svg onClick={handleEnableEdit} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" text-white rounded-lg p-2 cursor-pointer bg-blue-600 hover:bg-blue-800 dark:bg-darkEditButton dark:hover:bg-darkEditButtonHover dark:text-darkButtonText transition-colors duration-200 size-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>

                        <svg onClick={confirmDelete} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white rounded-full p-2 cursor-pointer bg-red-500   hover:bg-red-600 dark:text-darkButtonText dark:bg-darkDeleteButton dark:hover:bg-darkDeleteButtonHover dark:active:bg-darkDeleteButton transition-colors duration-200 size-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </div>

                </div>
            </>)}
            {deleteConfirm && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-black/80">
                    <div className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-lg transition-colors duration-200">
                        <p className="text-lg font-semibold dark:text-darkTextResult transition-colors duration-200">
                            Are you sure you want to delete this workout?
                        </p>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={confirmDeleteCancel}
                                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 active:bg-gray-400 dark:text-darkCancelButtonText dark:bg-darkCancelButton dark:hover:bg-darkCancelButtonHover dark:active:bg-darkCancelButton rounded-lg cursor-pointer transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 dark:text-darkButtonText dark:bg-darkDeleteButton dark:hover:bg-darkDeleteButtonHover dark:active:bg-darkDeleteButton transition-colors duration-200"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WorkoutDetails