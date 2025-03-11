import { useState } from "react";
import axios from "axios";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import WorkoutSuggestions from "./WorkoutsSuggestions";
const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuthContext();


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError("Please log in to add a workout");
            toast.error("Please log in to add a workout", { transition: Bounce });
            return;
        }

        let missingFields = [];

        if (!title.trim()) missingFields.push("title");
        if (!load || load < 0) missingFields.push("load");
        if (!reps || reps < 0) missingFields.push("reps");


        if (missingFields.length > 0) {
            setEmptyFields(missingFields);
            setError("Please fill in all required fields " + missingFields.join(" "));
            toast.error("All fields are required", { transition: Bounce });
            return;
        }

        if (isSubmitting) return
        setIsSubmitting(true)
        setError(null)
        setEmptyFields([]);

        try {
            const response = await axios.post("http://localhost:4000/api/workouts/", {
                title,
                load: Number(load),
                reps: Number(reps)
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            dispatch({ type: 'CREATE_WORKOUT', payload: response.data.newWorkout })
            setTitle('')
            setLoad('')
            setReps('')
            setEmptyFields([]);
            toast.success(response.data.message, { position: "bottom-right" });
        } catch (error) {
            setError(error.response?.data?.message || "Failed to create workout")
            setEmptyFields(error.response?.data?.emptyFields || []);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleRepsChange = (e) => {
        e.preventDefault();
        let value = e.target.value
        if (value < 0) return
        if (value === 0) {
            if (!window.confirm("Are you sure you want to set Reps to 0?")) {
                return;
            }
        }
        setReps(value)
    }
    const handleLoadChange = (e) => {
        e.preventDefault();
        let value = e.target.value
        if (value < 0) return
        if (value === 0) {
            if (!window.confirm("Are you sure you want to set Load to 0?")) {
                return;
            }
        }
        setLoad(value)
    }

//     //workout form style
//     const addFormStyle = `max-w-lg mx-auto p-6 bg-white dark:bg-darkSecondary dark:text-darkInputText  shadow-md rounded-lg
// transition-colors duration-200`

//     //workout form title style
//     const addFormTitleStyle = `text-2xl font-bold text-blue-600 dark:text-darkTextPrimary mb-4 transition-colors duration-200`

//     //workout form load input style
//     const addFormLoadInputStyle = `w-full p-2 mb-4 placeholder:text-gray-500 dark:placeholder:text-darkTextPlaceholder border dark:border-darkBorder rounded-lg dark:bg-darkInputBackground transition-colors duration-200 ${emptyFields.includes('load') ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-darkBorder"}`
//     //workout form reps input style
//     const addFormRepsInputStyle = `w-full p-2 mb-4 placeholder:text-gray-500 dark:placeholder:text-darkTextPlaceholder border dark:border-darkBorder rounded-lg dark:bg-darkInputBackground transition-colors duration-200 ${emptyFields.includes('reps') ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-darkBorder"}`
//     //workout form submit button style
//     const addFormSubmitButtonStyle = `
//                     w-full bg-green-600 hover:bg-green-500 active:bg-green-600 cursor-pointer text-white p-2 rounded dark:text-ButtonText dark:bg-darkAddButton dark:hover:bg-darkAddButtonHover dark:active:bg-darkAddButton transition-colors duration-200`

//     //workout form error message style
//     const addFormErrorMessageStyle = `w-full p-2 mb-4 text-red-500 dark:text-errorText border bg-red-100 dark:bg-errorBackground rounded-lg mt-4 flex justify-center items-center transition-colors duration-200`


    return (
        <div>
            <form id="workout-form" onSubmit={handleSubmit} className={`max-w-lg mx-auto p-6 mb-4 md:mb-0 bg-white dark:bg-darkSecondary dark:text-darkInputText  shadow-md rounded-lg
transition-colors duration-200`}>
                <h2 className={`text-2xl font-bold text-blue-600 dark:text-darkTextPrimary mb-4 transition-colors duration-200`}>Add a new workout</h2>

                <WorkoutSuggestions emptyFields={emptyFields} title={title} setTitle={setTitle} />
                {/* Load Input */}
                <input className={`w-full p-2 mb-4 placeholder:text-gray-500 dark:placeholder:text-darkTextPlaceholder border dark:border-darkBorder rounded-lg dark:bg-darkInputBackground transition-colors duration-200 ${emptyFields.includes('load') ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-darkBorder"}`}
                    type="number"
                    onChange={handleLoadChange}
                    value={load}
                    placeholder="Load (kg)"
                />

                {/* Reps Input */}
                <input className={`w-full p-2 mb-4 placeholder:text-gray-500 dark:placeholder:text-darkTextPlaceholder border dark:border-darkBorder rounded-lg dark:bg-darkInputBackground transition-colors duration-200 ${emptyFields.includes('reps') ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-darkBorder"}`}
                    type="number"
                    onChange={handleRepsChange}
                    value={reps}
                    placeholder="Reps"
                />
                <button id='add-workout-btn' className={`
                    w-full bg-green-600 hover:bg-green-500 active:bg-green-600 cursor-pointer text-white p-2 rounded dark:text-ButtonText dark:bg-darkAddButton dark:hover:bg-darkAddButtonHover dark:active:bg-darkAddButton transition-colors duration-200`} disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add Workout"}
                </button>
                {error && <p className={`w-full p-2 mb-4 text-red-500 dark:text-errorText border bg-red-100 dark:bg-errorBackground rounded-lg mt-4 flex justify-center items-center transition-colors duration-200`}>{error}</p>}
            </form>
        </div>
    )
}

export default WorkoutForm