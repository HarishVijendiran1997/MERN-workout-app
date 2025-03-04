import { WorkoutsContext } from "../contexts/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)

    if(!context){
        throw new Error("useWorkoutsContext must inside WorkoutsContextProvider")
    }

    return context
}