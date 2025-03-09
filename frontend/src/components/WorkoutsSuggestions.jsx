import React, { useState } from "react";

const WorkoutSuggestions = ({ title, setTitle, emptyFields }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const workoutSuggestions = [
        "Push-ups", "Squats", "Deadlifts", "Bench Press",
        "Pull-ups", "Lunges", "Plank", "Bicep Curls",
        "Tricep Dips", "Burpees", "Mountain Climbers", "Jump Rope",
        "Russian Twists", "Leg Raises", "Sit-ups", "Crunches",
        "Dumbbell Shoulder Press", "Lat Pulldown", "Rowing Machine",
        "Kettlebell Swings", "Box Jumps", "Calf Raises", "Dips",
        "Incline Bench Press", "Hammer Curls", "Wall Sit",
        "Chest Fly", "Face Pulls", "Treadmill Running", "Cycling",
        "Yoga Poses", "Pilates Movements", "Battle Ropes",
        "Farmer's Carry", "Reverse Lunges", "Step-ups"
    ].sort();

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        setShowDropdown(value.length > 0);
    };

    const handleSelectTitle = (workout) => {
        setTitle(workout);
        setShowDropdown(false);
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className={`w-full p-2 mb-4 placeholder:text-gray-500 dark:placeholder:text-darkTextPlaceholder border dark:border-darkBorder rounded-lg dark:bg-darkInputBackground transition-colors duration-200 ${emptyFields.includes('reps') ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-darkBorder"}`}
                placeholder="Search workout..."
            />
            {showDropdown && (
                <ul className="absolute w-full bg-white border border-gray-300 dark:border-darkBorder rounded-lg shadow-md max-h-40 overflow-y-auto z-10 dark:bg-darkPrimary dark:text-darkTextResult transition-colors duration-150">
                    {workoutSuggestions
                        .filter(workout => workout.toLowerCase().includes(title.toLowerCase()))
                        .map((workout, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelectTitle(workout)}
                                className="p-2 hover:bg-gray-200 cursor-pointer dark:hover:bg-darkTertiary transition-colors duration-150"
                            >
                                {workout}
                            </li>
                        ))
                    }
                </ul>
            )}
        </div>
    );
};

export default WorkoutSuggestions;
