import { useState, useEffect } from "react";
import axios from "axios";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm.jsx";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext.jsx";

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/workouts");
                dispatch({ type: "SET_WORKOUTS", payload: response.data });
                setError(null);
            } catch (error) {
                setError(error.response?.data?.message || "Error fetching workouts");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, [dispatch]);

    return (
        <div className="grid grid-cols-[3fr_2fr] text-center bg-gray-200 w-full min-h-[calc(100vh-5.5rem)] pt-5 gap-4">
            <div className="px-4 flex flex-col h-full">
                {loading ? (
                    <div className="flex flex-grow justify-center items-center">
                        <div className="w-24 h-24 border-8 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="flex flex-grow justify-center items-center">
                        <h1 className="text-4xl text-red-600">{error} OOPS...</h1>
                    </div>
                ) : workouts?.length === 0 ? (
                    <div className="flex flex-grow justify-center items-center">
                        <p className="text-2xl text-gray-600">No workouts found. Add a new one!</p>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {workouts.map((workout) => (
                            <WorkoutDetails key={workout._id} workout={workout} />
                        ))}
                    </div>
                )}
            </div>
            <div className="px-4">
                <WorkoutForm />
            </div>
        </div>
    );
};

export default Home;
