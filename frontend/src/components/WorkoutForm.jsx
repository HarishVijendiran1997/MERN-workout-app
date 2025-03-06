import { useState } from "react";
import axios from "axios";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";
import { intlFormatDistance } from "date-fns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!title.trim() && !load && !reps) {
            setError("All fields are required", emptyFields);
            return;
        }
        
        if (!load && !reps) {
            toast.warn("All fields are required");
            setError("Fill in the fields load & reps");
            toast.warn("All fields are required");
            return;
        }
        if (!title.trim() && !load) {
            setError("Fill in the fields title & load");
            toast.warn("All fields are required");
            return;
        }
        if (!title.trim() && !reps) {
            setError("Fill in the fields title & reps");
            toast.warn("All fields are required");
            return;
        }

        if (!title.trim()) {
            setError("Fill in the title");
            toast.warn("Fill in the title");
            return;
        }
        if (!load) {
            setError("Fill in the load");
            toast.warn("Fill in the load");
            return;
        }
        if (!reps) {
            setError("Fill in the reps");
            toast.error("Fill in the reps");
            return;
        }
        
        if (isSubmitting) return
        setIsSubmitting(true)
        setError(null)
        try {
            const response = await axios.post("http://localhost:4000/api/workouts/", {
                title,
                load: Number(load),
                reps: Number(reps)
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
            if (!window.confirm("Are you sure you want to set Reps to 0?")) {
                return;
            }
        }
        setLoad(value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg
">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Add a new workout</h2>
                <input className={`w-full p-2 mb-4 border border-gray-300 rounded-lg ${emptyFields.includes('title') ? "border-red-500" : "border-gray-300"}`}
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Workout Title"
                />
                <input className={`w-full p-2 mb-4 border border-gray-300 rounded-lg ${emptyFields.includes('load') ? "border-red-500" : "border-gray-300"}`}
                    type="number"
                    onChange={handleLoadChange}
                    value={load}
                    placeholder="Load (kg)"
                />
                <input className={`w-full p-2 mb-4 border border-gray-300 rounded-lg ${emptyFields.includes('reps') ? "border-red-500" : "border-gray-300"}`}
                    type="number"
                    onChange={handleRepsChange}
                    value={reps}
                    placeholder="Reps"
                />
                <button className={`w-full bg-green-600 hover:bg-green-500 active:bg-green-600 text-white p-2 rounded transition ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`} disabled={isSubmitting}>{isSubmitting ? "Adding..." : "Add Workout"}</button>
                {/* {success && <p className="text-xl mt-4 mb-2 text-green-500">{success}</p>} */}
                {error && <p className="w-full p-2 mb-4 text-red-600 border bg-red-100 rounded-lg mt-4 flex justify-center items-center">{error}</p>}
            </form>
        </div>
    )
}

export default WorkoutForm