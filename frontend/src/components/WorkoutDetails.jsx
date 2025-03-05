import axios from "axios"
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext"
import {formatDistanceToNow } from 'date-fns'

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
                <p><strong>Created : </strong>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix: true})}</p>
                <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="bg-red-600 text-white rounded-full p-2 cursor-pointer hover:bg-red-500 transition size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

            </div>
        </div>
    )
}

export default WorkoutDetails