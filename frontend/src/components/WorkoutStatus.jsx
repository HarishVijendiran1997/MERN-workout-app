import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const WorkoutStatus = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const [status, setStatus] = useState(workout.status);

    const handleWorkoutStatus = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);

        try {
            const response = await axios.patch(
                `http://localhost:4000/api/workouts/${workout._id}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            dispatch({ type: "UPDATE_WORKOUT", payload: response.data.updateWorkout });
            toast.success("Workout status updated!");
        } catch (error) {
            toast.error("Failed to update status!");
        }
    };

    return (
        <div className="flex space-x-2 translate-y-1">
            <div>
                <p><strong className={`transition-colors duration-200 ${status === "completed" ? "text-neutral-800 dark:text-darkDisabledText cursor-not-allowed line-through" : "dark:text-darkTextSecondary"}`}>Status :</strong></p>
            </div>
            <div>
                <select
                    className={`flex text-center border border-gray-400 dark:border-darkBorder p-1 rounded-lg transition-colors duration-200 
                        ${status === "completed" ? "bg-green-400 text-neutral-700 dark:bg-darkAddButtonHover dark:text-darkInputText" : status === "in progress" ? "bg-white text-neutral-800 dark:bg-darkTestButton dark:text-darkInputBackground " : "bg-white text-neutral-800 dark:bg-darkInputBackground dark:text-darkTextResult"}`}
                    value={status}
                    onChange={handleWorkoutStatus}
                >
                    <option value="" disabled className={`${status === "completed" ? "bg-white  dark:bg-darkInputBackground" : status === "in progress" ? "bg-white  dark:bg-darkInputBackground" : ""}`}>Select Status</option>
                    <option value="pending" className={`${status === "completed" ? "bg-white dark:text-darkTextResult dark:bg-darkInputBackground" : status === "in progress" ? "bg-white dark:text-darkTextResult dark:bg-darkInputBackground" : ""}`}>Pending</option>
                    <option value="in progress" className={`${status === "completed" ? "bg-white dark:text-darkTextResult dark:bg-darkInputBackground" : status === "in progress" ? "bg-white dark:text-darkTextResult dark:bg-darkInputBackground" : ""}`}>On Progress</option>
                    <option value="completed" className={`${status === "completed" ? "bg-white dark:text-darkTextResult dark:bg-darkInputBackground" : status === "in progress" ? "bg-white dark:text-darkTextResult dark:bg-darkInputBackground" : ""}`}>Completed</option>
                </select>
            </div>
        </div>
    );
};

export default WorkoutStatus;
