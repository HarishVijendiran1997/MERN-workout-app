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
            setSuccess(response.data.message)
        } catch (error) {
            setError(error.response?.data?.message || "Failed to create workout")
            setSuccess('')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg
">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Add a new workout</h2>
                <input
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Workout Title"
                />
                <input
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    type="number"
                    onChange={(e) => setLoad(e.target.value)}
                    value={load}
                    placeholder="Load (kg)"
                />
                <input
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                    type="number"
                    onChange={(e) => setReps(e.target.value)}
                    value={reps}
                    placeholder="Reps"
                />
                {error && <p className="w-full p-2 mb-4 text-red-600">{error}</p>}
                {success && <p className="text-xl mb-2 text-green-500">{success}</p>}
                <button className="w-full bg-green-600 hover:bg-green-500 active:bg-green-600 text-white p-2 rounded">Add workout</button>
            </form>
        </div>
    )
}

export default WorkoutForm