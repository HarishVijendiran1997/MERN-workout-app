import { useState, useEffect } from "react"
import axios from "axios"

const Home = () => {

    const [workouts, setWorkouts] = useState([])
    const [Error, setError] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/workouts")
                setWorkouts(response.data)
            } catch (error) {
                return setError("Error fetching workouts")
            }
        }

        fetchWorkouts()
    }, [])
    return (
        <div className="text-center bg-gray-200 pt-5">
            <ul>
                {workouts && workouts.map(workout => (
                    <li key={workout._id} className="flex items-start bg-gray-100 w-2xl rounded-2xl font-[JetBrains_Mono] ml-4 pb-5  pl-5 pt-5 flex-col shadow-md mb-5">
                        <p className="text-md font-bold">Workout: <span className="font-medium text-gray-900">{workout.title}</span>
                        </p>
                        <p className="text-md font-bold">load: <span className="font-medium text-gray-900">{workout.load}</span>
                        </p>
                        <p className="text-md font-bold">reps: <span className="font-medium text-gray-900">{workout.reps}</span>
                        </p>
                    </li>
                ))}
            </ul>
            <div className="flex w-full h-100 font-bold text-black justify-center items-center text-6xl">
                {Error && <h1>{Error}</h1>}
            </div>
        </div>
    )
}

export default Home
