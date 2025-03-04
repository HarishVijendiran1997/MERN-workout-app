import { useState, useEffect } from "react"
import axios from "axios"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm.jsx"
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext.jsx"

const Home = () => {

    const { workouts, dispatch } = useWorkoutsContext()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/workouts")
                dispatch({ type: "SET_WORKOUTS", payload: response.data })
                setError(null);
            } catch (error) {
                setError(error.response?.data?.message || "Error fetching workouts")
            } finally {
                setLoading(false);
            }
        }

        fetchWorkouts()
    }, [])
    return (
        <div className="grid grid-cols-[3fr_2fr] text-center bg-gray-200 w-full min-h-screen pt-5  relative gap-4">
            <ul>
                {workouts && workouts.map(workout => (
                    //? Using the WorkoutDetails component to display the workout details
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </ul>
            <div className=" absolute w-3/5 top-5 ml-2 rounded-lg h-screen p-2 text-primary text-2xl flex justify-center items-center ">
                {/* Error state handling*/}
                {loading && <p className="text-4xl text-blue-950">Loading workouts...</p>}
                {error && <h1 className="text-4xl text-blue-950">{error} :P</h1>}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home
