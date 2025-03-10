import axios from "axios";
import { toast } from "react-toastify";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const WorkoutStatus = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const handleWorkoutStatus = async (e) => {
        const newStatus = e.target.value;
        if (!user) {
            toast.error("You must be logged in!");
            return;
        }

        try {
            if (newStatus === "in progress") {
                const response = await axios.get("http://localhost:4000/api/workouts", {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                const allWorkouts = response.data.workouts;
                const currentlyInProgress = allWorkouts.find(w => w.status === "in progress");

                if (currentlyInProgress && currentlyInProgress._id !== workout._id) {
                    await axios.patch(
                        `http://localhost:4000/api/workouts/${currentlyInProgress._id}`,
                        { status: "pending" },
                        { headers: { Authorization: `Bearer ${user.token}` } }
                    );

                    dispatch({
                        type: "UPDATE_WORKOUT",
                        payload: { ...currentlyInProgress, status: "pending" }
                    });
                }
            }

            const updateResponse = await axios.patch(
                `http://localhost:4000/api/workouts/${workout._id}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            dispatch({ type: "UPDATE_WORKOUT", payload: updateResponse.data.updateWorkout });
            toast.success(`Workout status updated to ${newStatus}`);
        } catch (error) {
            toast.error("Failed to update status!");
        }
    };

    //styles for status update

    //Status title style
    const statusTitleStyle = `transition-colors duration-200 ${workout.status === "completed" ? "text-neutral-800 dark:text-darkDisabledText cursor-not-allowed line-through" : "dark:text-darkTextSecondary"}`

    return (
        <div className="flex space-x-2 translate-y-1">
            <div>
                <p><strong className={statusTitleStyle}>Status :</strong></p>
            </div>
            <div>
                <select
                    className={`flex text-center border border-gray-400 dark:border-darkBorder p-1 rounded-lg transition-colors duration-200 
                        ${workout.status === "completed" ? "bg-green-400 text-neutral-700 dark:bg-darkAddButtonHover dark:text-darkInputText" : workout.status === "in progress" ? "bg-blue-400 text-neutral-800 dark:bg-darkTestButton dark:text-darkInputBackground " : "bg-white text-neutral-800 dark:bg-darkInputBackground dark:text-darkTextResult"}`}
                    value={workout.status}
                    onChange={handleWorkoutStatus}
                >
                    <option value="" disabled className={`${workout.status === "completed" ? "bg-white  dark:bg-darkInputBackground" : workout.status === "in progress" ? "bg-white  dark:bg-darkInputBackground" : ""}`}>Select Status</option>
                    <option value="pending" className={`${workout.status === "completed" ? "bg-white dark:text-darkTextResult dark:bg-darkInputBackground" : workout.status === "in progress" ? "bg-white dark:text-darkTextResult dark:bg-darkInputBackground" : ""}`}>Pending</option>
                    <option value="in progress" className={`${workout.status === "completed" ? "bg-white dark:text-darkTextResult dark:bg-darkInputBackground" : workout.status === "in progress" ? "bg-white dark:text-darkTextResult dark:bg-darkInputBackground" : ""}`}>On Progress</option>
                    <option value="completed" className={`${workout.status === "completed" ? "bg-white dark:text-darkTextResult dark:bg-darkInputBackground" : workout.status === "in progress" ? "bg-white dark:text-darkTextResult dark:bg-darkInputBackground" : ""}`}>Completed</option>
                </select>
            </div>
        </div>
    );
};

export default WorkoutStatus;
