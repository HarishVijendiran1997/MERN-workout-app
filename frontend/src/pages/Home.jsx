import { useState, useEffect } from "react";
import axios from "axios";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm.jsx";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(true);
    const { user } = useAuthContext();

    useEffect(() => {
        console.log("rendered");

        const fetchWorkouts = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/workouts", {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                dispatch({ type: "SET_WORKOUTS", payload: response.data.workouts });
                if (showToast) {
                    toast.info(response?.data?.message || "Workouts loaded successfully!", { position: "bottom-right" });
                    setShowToast(false);
                }
                setError(null);
            } catch (error) {
                const errorMessage = error.response?.data?.message || "Couldn't load workouts. Try refreshing the page!"
                toast.error(errorMessage, { position: "bottom-right" })
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchWorkouts();
        }
    }, []);

    return (
        <div className={`sm:grid-cols-[4fr_2fr] grid grid-cols-1 text-center bg-gray-200 dark:bg-darkPrimary w-full min-h-[calc(100vh-5.5rem)] pt-5 gap-4 transition-colors duration-200`}>
            <div className="px-4 order-first sm:order-last">
                <WorkoutForm />
            </div>
            <div id="workout-list" className="px-4 flex flex-col">
                {loading ? (
                    <div className="flex flex-grow justify-center items-center">
                        <div className="flex flex-col items-center">
                            <div className={`w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin`}></div>
                            <p className="mt-4 text-lg text-blue-600 ">Loading workouts...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="flex flex-grow justify-center items-center">
                        <h1 className={`w-6/7 p-2 mb-4 text-2xl text-red-500 dark:text-errorText border bg-red-100 dark:bg-errorBackground rounded-lg mt-4 flex justify-center items-center transition-colors duration-200`}>{error}</h1>
                    </div>
                ) : workouts?.length === 0 ? (
                    <div className="flex flex-grow justify-center items-center">
                        <p className="text-2xl text-gray-500">No workouts found. Add a new one!</p>
                    </div>
                ) : (
                    <>
                        {workouts.map((workout) => (
                            <WorkoutDetails key={workout._id} workout={workout} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
