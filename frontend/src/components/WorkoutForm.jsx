import { useState } from "react";
import axios from "axios";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";

const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext()
    const [success, setSuccess] = useState('')
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()
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
            setError(null)
            setEmptyFields([]);
            setSuccess(response.data.message)
        } catch (error) {
            setError(error.response?.data?.message || "Failed to create workout")
            setEmptyFields(error.response?.data?.emptyFields || []);
            setSuccess('')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg
">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Add a new workout</h2>
                <input
                    className={`w-full p-2 mb-4 border border-gray-300 rounded-lg ${emptyFields.includes('title') ? "border-red-500" : "border-gray-300"}`}
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Workout Title"
                />
                <input
                    className={`w-full p-2 mb-4 border border-gray-300 rounded-lg ${emptyFields.includes('load') ? "border-red-500" : "border-gray-300"}`}
                    type="number"
                    onChange={(e) => setLoad(e.target.value)}
                    value={load}
                    placeholder="Load (kg)"
                />
                <input
                    className={`w-full p-2 mb-4 border border-gray-300 rounded-lg ${emptyFields.includes('reps') ? "border-red-500" : "border-gray-300"}`}
                    type="number"
                    onChange={(e) => setReps(e.target.value)}
                    value={reps}
                    placeholder="Reps"
                />
                <button className="w-full bg-green-600 hover:bg-green-500 active:bg-green-600 text-white p-2 rounded transition">Add workout</button>
                {success && <p className="text-xl mt-4 mb-2 text-green-500">{success}</p>}
                {error && <p className="w-full p-2 mb-4 text-red-600 border bg-red-100 rounded-lg mt-4 flex justify-center items-center">{error}</p>}
            </form>
        </div>
    )
}

export default WorkoutForm