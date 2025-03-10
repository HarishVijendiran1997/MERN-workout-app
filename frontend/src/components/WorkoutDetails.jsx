import axios from "axios"
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext"
import { formatDistanceToNow } from 'date-fns'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../../hooks/useAuthContext"
import DeleteWorkout from "./DeleteWorkout";
import WorkoutStatus from "./WorkoutStatus";

const WorkoutDetails = ({ workout }) => {

    //!Declarations & properties of the Workout
    const navigate = useNavigate();
    const { dispatch } = useWorkoutsContext()
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(workout.title)
    const [load, setLoad] = useState(workout.load);
    const [reps, setReps] = useState(workout.reps);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();
    const isCompleted = workout.status === 'completed';
    const inProgress = workout.status === 'in progress';

    //*functionality for updating the workout
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

    //*enabling and disabling edit mode
    const handleEnableEdit = () => {
        setIsEditing(true);
        toast.info("Editing Enabled", { autoClose: 2000, hideProgressBar: true, transition: Bounce });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setTitle(workout.title);
        setLoad(workout.load);
        setReps(workout.reps);
        toast.info("Editing canceled", { autoClose: 2000, hideProgressBar: true, transition: Bounce });
    };

    //?Styling for the workout
    // //workout card styles
    // const workoutCardStyle = `flex items-start max-w-screen rounded-lg font-Poppins ml-4 pb-5 pl-5 pt-5 flex-col shadow-md mb-5 transition-colors duration-200 ${isCompleted ? "bg-neutral-300 dark:bg-darkDisabledCard" : inProgress ? "bg-blue-200 dark:bg-darkProgress " : "bg-white dark:bg-darkSecondary"}`

    // //error message styles
    // const errorMessageStyle = `w-1/2 p-2 mr-3 mb-4 text-red-500 dark:text-errorText border bg-red-100 dark:bg-errorBackground rounded-lg mt-4 flex justify-center items-center transition-colors duration-200`

    //edit workouts input fields styles
    const editInputFieldStyle = `border p-1 rounded-lg bg-blue-100  dark:border-darkBorder mr-2 dark:bg-darkInputBackground dark:text-darkInputText transition-colors duration-200 ${inProgress ? "border-gray-400" : "border-gray-300"}`

    // //update workout button styles
    // const updateWorkoutButtonStyle = `p-1 rounded-lg bg-green-500 text-white hover:bg-green-600 active:bg-green-500 mr-2 size-10 cursor-pointer dark:bg-darkSaveButton dark:hover:bg-darkSaveButtonHover dark:active:bg-darkSaveButton dark:text-darkButtonText transition-colors duration-200`
    // //cancel update workout button styles
    // const cancelUpdateWorkoutButtonStyle = `p-1 rounded-full text-white mr-2 size-10 cursor-pointer bg-gray-400 hover:bg-gray-500 active:bg-gray-400 dark:bg-darkCancelButton dark:hover:bg-darkCancelButtonHover dark:active:bg-darkCancelButton dark:text-darkCancelButtonText transition-colors duration-200`

    // //workout Title styles
    // const workoutTitleStyle = ` text-2xl font-extrabold transition-colors duration-200 ${isCompleted ? "text-neutral-800 dark:text-darkDisabledText cursor-not-allowed line-through" : " text-blue-600 hover:text-blue-500 dark:hover:text-darkTextPrimaryHover dark:text-darkTextPrimary  cursor-pointer "} `

    //workout load, reps, created at styles
    const workoutLoadRepsCreatedAtStyle = `transition-colors duration-200 ${isCompleted ? "text-neutral-800 dark:text-darkDisabledText cursor-not-allowed line-through" : "dark:text-darkTextSecondary"}`

    //workout status in progress active dot animate styles
    const workoutInProgressAnimateDotStyle = "dark:text-darkAddButtonHover ml-1 py-2 animate-bounce translate-y-1"
    //workout status in progress active dot styles
    const workoutInProgressActiveDot1Style = "border border-green-500 dark:border-darkAddButtonHover w-1 h-3 bg-green-500 dark:bg-darkAddButtonHover rounded-full overflow-hidden"
    const workoutInProgressActiveDot2Style = "border border-green-500 dark:border-darkAddButtonHover w-1 h-2 bg-green-500 dark:bg-darkAddButtonHover rounded-full overflow-hidden"
    const workoutInProgressActiveDot3Style = "border border-green-500 dark:border-darkAddButtonHover w-1 h-2 bg-green-500 dark:bg-darkAddButtonHover rounded-full overflow-hidden"
    const workoutInProgressActiveDot4Style = "border border-green-500 dark:border-darkAddButtonHover w-1 h-2 bg-green-500 dark:bg-darkAddButtonHover rounded-full overflow-hidden"
    const workoutInProgressActiveDot5Style = "border border-green-500 dark:border-darkAddButtonHover w-1 h-3 bg-green-500 dark:bg-darkAddButtonHover rounded-full overflow-hidden"

    // //workout info container
    // const workoutInfoContainerStyle = `flex justify-between w-full pr-5 items-center transition-colors duration-200 ${isCompleted ? "text-neutral-800 dark:text-darkDisabledText cursor-not-allowed" : "dark:text-darkTextResult"}`

    // //enable editing mode button
    // const enableEditModeButton = `rounded-lg p-2  transition-colors duration-200 size-10 ${isCompleted ? "text-white bg-neutral-400 dark:bg-darkDisabledButton dark:text-darkDisabledText cursor-not-allowed" : "text-white cursor-pointer bg-blue-600 hover:bg-blue-800 dark:bg-darkEditButton dark:hover:bg-darkEditButtonHover dark:text-darkButtonText "}`

    return (
        <div className={`flex items-start max-w-screen rounded-lg font-Poppins ml-4 pb-5 pl-5 pt-5 flex-col shadow-md mb-5 transition-colors duration-200 ${isCompleted ? "bg-neutral-300 dark:bg-darkDisabledCard" : inProgress ? "bg-blue-200 dark:bg-darkProgress " : "bg-white dark:bg-darkSecondary"}`}>
            {isEditing ? (
                <div>
                    <div className="flex justify-center">
                        {error && <p className={`w-1/2 p-2 mr-3 mb-4 text-red-500 dark:text-errorText border bg-red-100 dark:bg-errorBackground rounded-lg mt-4 flex justify-center items-center transition-colors duration-200`}>{error}</p>}
                    </div>
                    <div className="flex flex-wrap gap-2.5 justify-between">
                        <input className={editInputFieldStyle} placeholder="Workout Title" value={title} onChange={handleTitleOnChange} />
                        <input className={editInputFieldStyle} type="number" min='1' placeholder="Load" value={load} onChange={handleLoadOnChange} />
                        <input className={editInputFieldStyle} type="number" min='1' placeholder="Reps" value={reps} onChange={handleRepsOnChange} />
                        <p className="dark:text-darkTextResult transition-colors duration-200">Last updated: {formatDistanceToNow(new Date(workout.updatedAt), { addSuffix: true })}</p>
                        <div className="flex mr-3">
                            <svg onClick={handleUpdate} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`p-1 rounded-lg bg-green-500 text-white hover:bg-green-600 active:bg-green-500 mr-2 size-10 cursor-pointer dark:bg-darkSaveButton dark:hover:bg-darkSaveButtonHover dark:active:bg-darkSaveButton dark:text-darkButtonText transition-colors duration-200`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <svg onClick={handleCancelEdit} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`p-1 rounded-full text-white mr-2 size-10 cursor-pointer bg-gray-400 hover:bg-gray-500 active:bg-gray-400 dark:bg-darkCancelButton dark:hover:bg-darkCancelButtonHover dark:active:bg-darkCancelButton dark:text-darkCancelButtonText transition-colors duration-200`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex">
                        <h4 className={` text-2xl font-extrabold transition-colors duration-200 ${isCompleted ? "text-neutral-800 dark:text-darkDisabledText cursor-not-allowed line-through" : " text-blue-600 hover:text-blue-500 dark:hover:text-darkTextPrimaryHover dark:text-darkTextPrimary  cursor-pointer "} `} onClick={() => !isCompleted && navigate("/test", { state: { workout } })}>{workout.title}</h4>
                        {inProgress && <div className="flex items-center justify-center ml-2">
                            <span className={workoutInProgressAnimateDotStyle} style={{ animationDelay: "200ms" }}>
                                <div className={workoutInProgressActiveDot1Style}>
                                </div>
                            </span>
                            <span className={workoutInProgressAnimateDotStyle} style={{ animationDelay: "400ms" }}>
                                <div className={workoutInProgressActiveDot2Style}>
                                </div>
                            </span>
                            <span className={workoutInProgressAnimateDotStyle} style={{ animationDelay: "600ms" }}>
                                <div className={workoutInProgressActiveDot3Style}>
                                </div>
                            </span>
                            <span className={workoutInProgressAnimateDotStyle} style={{ animationDelay: "800ms" }}>
                                <div className={workoutInProgressActiveDot4Style}>
                                </div>
                            </span>
                            <span className={workoutInProgressAnimateDotStyle} style={{ animationDelay: "1000ms" }}>
                                <div className={workoutInProgressActiveDot5Style}>
                                </div>
                            </span>
                        </div>}
                        {isCompleted && <div className="flex items-center justify-center -translate-y-1">
                            <span className="text-blue-600 pt-2 pl-2 dark:text-darkAddButtonHover">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>}
                    </div>
                    <div className={`flex justify-between w-full pr-5 items-center transition-colors duration-200 ${isCompleted ? "text-neutral-800 dark:text-darkDisabledText cursor-not-allowed" : "dark:text-darkTextResult"}`}>
                        <p><strong className={workoutLoadRepsCreatedAtStyle}>Load (kg): </strong><span className={`${isCompleted ? "line-through" : ""}`}>{workout.load}</span></p>
                        <p><strong className={workoutLoadRepsCreatedAtStyle}>Reps: </strong><span className={`${isCompleted ? "line-through" : ""}`}>{workout.reps}</span></p>
                        <p><strong className={workoutLoadRepsCreatedAtStyle}>Created: </strong><span className={`${isCompleted ? "line-through" : ""}`}>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</span></p>
                        <div className="flex gap-2 mt-3">
                            <WorkoutStatus workout={workout} />
                            <svg onClick={isCompleted ? null : handleEnableEdit} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`rounded-lg p-2  transition-colors duration-200 size-10 ${isCompleted ? "text-white bg-neutral-400 dark:bg-darkDisabledButton dark:text-darkDisabledText cursor-not-allowed" : "text-white cursor-pointer bg-blue-600 hover:bg-blue-800 dark:bg-darkEditButton dark:hover:bg-darkEditButtonHover dark:text-darkButtonText "}`}>
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