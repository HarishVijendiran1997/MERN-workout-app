import axios from "axios"
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext"

const WorkoutDetails = ({ workout }) => {

    const { dispatch } = useWorkoutsContext()
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/workouts/${workout._id}`)
            dispatch({ type: 'DELETE_WORKOUT', payload: workout._id })
            console.log(response.data.message);
        } catch (error) {
            throw new Error(error?.response?.data?.message || "Cannot delete this workout")
        }
    }

    return (
        <div className="flex items-start bg-white max-w-screen rounded-lg font-Poppins ml-4  pb-5  pl-5 pt-5 flex-col shadow-md mb-5">
            <h4 className="text-2xl font-extrabold text-blue-900">{workout.title}</h4>
            <div className="flex justify-between w-full pr-5 items-center">
                <p><strong>Load (kg) : </strong>{workout.load}</p>
                <p><strong>Reps : </strong>{workout.reps}</p>
                <p><strong>Created : </strong>{new Date(workout.createdAt).toLocaleString()}</p>
                <span onClick={handleDelete} className="bg-red-600 text-white rounded-lg p-1 mt-3 px-3 py-1 cursor-pointer hover:bg-red-500 transition">Delete</span>
            </div>
        </div>
    )
}

export default WorkoutDetails