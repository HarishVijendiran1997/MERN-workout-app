import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Test = () => {
    const location = useLocation();
    const workout = location.state?.workout;

    useEffect(()=>{
        if(workout?.title){
            toast.info(`Redirected to ${workout.title} workout details`)
        }
    },[workout])

    return (
        <div className="w-full sm:min-h-[calc(100vh-5.5rem)] dark:bg-darkPrimary">

        <div className="flex flex-col justify-center items-center w-screen p-6 ">
            <h1 className="text-3xl font-bold text-blue-900 dark:text-darkTextPrimary mb-6">Workout Details</h1>

            {workout ? (
                <div className="w-1/2">
                    <table className=" min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-blue-900 dark:bg-darkSecondary text-white dark:text-darkTextPrimary">
                                <th className="py-2 px-4 border dark:border-neutral-600">Title</th>
                                <th className="py-2 px-4 border dark:border-neutral-600">Load (kg)</th>
                                <th className="py-2 px-4 border dark:border-neutral-600">Reps</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center dark:bg-darkInputBackground dark:text-darkTextSecondary">
                                <td className="py-2 px-4 border dark:border-gray-700">{workout.title}</td>
                                <td className="py-2 px-4 border dark:border-gray-700">{workout.load}</td>
                                <td className="py-2 px-4 border dark:border-gray-700">{workout.reps}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No workout data available.</p>
            )}

            <Link to={`/`} className="text-blue-600 hover:text-blue-500 dark:text-darkTextPrimary dark:hover:text-darkTextPrimaryHover mt-4">
                <p>Back to Home</p>
            </Link>
        </div>
        </div>
    );
};

export default Test;
