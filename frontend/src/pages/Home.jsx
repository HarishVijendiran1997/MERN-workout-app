import { useState, useEffect } from "react";
import axios from "axios";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm.jsx";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(true);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/workouts");
                dispatch({ type: "SET_WORKOUTS", payload: response.data.workouts });
                if (showToast) {
                    toast.info(response?.data?.message || "Workouts loaded successfully!", { position: "bottom-right" });
                    setShowToast(false);
                }
                setError(null);
            } catch (error) {
                const errorMessage = error.response?.data?.message || "Couldn't load workouts. Try refreshing the page!"
                toast.error("Try reloading the page", { position: "bottom-right" })
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, []);

    return (
        <div className="grid grid-cols-[3fr_2fr] text-center bg-gray-200 w-full min-h-[calc(100vh-5.5rem)] pt-5 gap-4">
            <div className="px-4 flex flex-col h-full">
                {loading ? (
                    <div className="flex flex-grow justify-center items-center">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-4 text-lg text-blue-600">Loading workouts...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="flex flex-grow justify-center items-center">
                        <h1 className="text-2xl text-red-600 font-semibold">{error}</h1>
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
