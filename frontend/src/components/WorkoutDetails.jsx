import axios from "axios"
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext"
import { formatDistanceToNow } from 'date-fns'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../../hooks/useAuthContext"
import DeleteWorkout from "./DeleteWorkout";

const WorkoutDetails = ({ workout }) => {

    const navigate = useNavigate();
    const { dispatch } = useWorkoutsContext()
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(workout.title)
    const [load, setLoad] = useState(workout.load);
    const [reps, setReps] = useState(workout.reps);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    const handleTitleClick = () => {
        navigate("/test", { state: { workout } });
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



    const handleUpdate = async () => {
        if (!user) {
            toast.error("You must be logged in to update workouts.");
            return;
        }
        if (title.trim() === '') {
            toast.error("Title cannot be empty!");
            return setError("Title cannot be empty!");
        }
        if (load < 0 || reps < 1) {
            if (load < 0) {
                toast.error("Load cannot be negative!");
                return setError("Load cannot be negative!");
            }
            if (reps < 1) {
                toast.error("Reps cannot be less than 1!");
                return setError("Reps cannot be less than 1!");
            }
        }

        try {
            const response = await axios.patch(`http://localhost:4000/api/workouts/${workout._id}`, {
                title,
                load: Number(load),
                reps: Number(reps)
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
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
        <div className="flex items-start bg-white dark:bg-darkSecondary max-w-screen rounded-lg font-Poppins ml-4 pb-5 pl-5 pt-5 flex-col shadow-md mb-5 transition-colors duration-200">
            {isEditing ? (
                <div>
                    <div className="flex justify-center">
                        {error && <p className="w-1/2 p-2 mr-3 mb-4 text-red-500 dark:text-errorText border bg-red-100 dark:bg-errorBackground rounded-lg mt-4 flex justify-center items-center transition-colors duration-200">{error}</p>}
                    </div>

                    <div className="flex flex-wrap gap-2.5 justify-between">
                        <input className="border p-1 rounded-lg border-gray-300 dark:border-darkBorder mr-2 dark:bg-darkInputBackground dark:text-darkInputText transition-colors duration-200" placeholder="Workout Title" value={title} onChange={handleTitleOnChange} />
                        <input className="border p-1 rounded-lg border-gray-300 mr-2 dark:border-darkBorder dark:bg-darkInputBackground dark:text-darkInputText transition-colors duration-200" type="number" min='1' placeholder="Load" value={load} onChange={handleLoadOnChange} />
                        <input className="border p-1 rounded-lg border-gray-300 mr-2 dark:border-darkBorder dark:bg-darkInputBackground dark:text-darkInputText transition-colors duration-200" type="number" min='1' placeholder="Reps" value={reps} onChange={handleRepsOnChange} />
                        <p className="dark:text-darkTextResult transition-colors duration-200">Last updated: {formatDistanceToNow(new Date(workout.updatedAt), { addSuffix: true })}</p>
                        <div className="flex mr-3">
                            <svg onClick={handleUpdate} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="p-1 rounded-lg bg-green-500 text-white hover:bg-green-600 active:bg-green-500 mr-2 size-10 cursor-pointer dark:bg-darkSaveButton dark:hover:bg-darkSaveButtonHover dark:active:bg-darkSaveButton dark:text-darkButtonText transition-colors duration-200">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <svg onClick={handleCancelEdit} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="p-1 rounded-full text-white mr-2 size-10 cursor-pointer bg-gray-400 hover:bg-gray-500 active:bg-gray-400 dark:bg-darkCancelButton dark:hover:bg-darkCancelButtonHover dark:active:bg-darkCancelButton dark:text-darkCancelButtonText transition-colors duration-200">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <h4 className="cursor-pointer text-2xl font-extrabold text-blue-600 hover:text-blue-500 dark:hover:text-darkTextPrimaryHover dark:text-darkTextPrimary transition-colors duration-200" onClick={handleTitleClick}>{workout.title}</h4>
                    <div className="flex justify-between w-full pr-5 items-center dark:text-darkTextResult transition-colors duration-200">
                        <p><strong className="dark:text-darkTextSecondary transition-colors duration-200">Load (kg): </strong>{workout.load}</p>
                        <p><strong className="dark:text-darkTextSecondary transition-colors duration-200">Reps: </strong>{workout.reps}</p>
                        <p><strong className="dark:text-darkTextSecondary transition-colors duration-200">Created: </strong>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
                        <div className="flex gap-2 mt-3">
                            <svg onClick={handleEnableEdit} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white rounded-lg p-2 cursor-pointer bg-blue-600 hover:bg-blue-800 dark:bg-darkEditButton dark:hover:bg-darkEditButtonHover dark:text-darkButtonText transition-colors duration-200 size-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                            <DeleteWorkout workoutId={workout._id} user={user} dispatch={dispatch} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default WorkoutDetails