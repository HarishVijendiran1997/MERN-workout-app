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
    }, [dispatch])

    return (
        <div className="grid grid-cols-[3fr_2fr] text-center bg-gray-200 w-full pt-5 gap-4">

            <div className="px-4">
                {loading && <p className="mt-50 text-4xl text-blue-950">Loading workouts...</p>}
                {error && <h1 className="mt-50 text-4xl text-red-600">{error} OOPS...</h1>}
                {!loading && !error && workouts?.length === 0 && (
                    <p className="text-2xl text-gray-600">No workouts found. Add a new one!</p>
                )}
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>

            <div className="px-4">
                <WorkoutForm />
            </div>
        </div>
    )
}

export default Home
