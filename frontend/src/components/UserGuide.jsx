import React, { useState, useEffect } from "react";
import Joyride from "react-joyride";

const UserGuide = () => {
    const [run, setRun] = useState(false);

    useEffect(() => {
        const hasSeenGuide = localStorage.getItem("hasSeenGuide");
        if (!hasSeenGuide) {
            setRun(true);
            localStorage.setItem("hasSeenGuide", "true");
        }

    }, []);
    const startTour = () => {
        setRun(true);
    };
    const steps = [
        {
            target: "body",
            content: "Welcome to WorkoutX! Let's take a quick tour.",
            placement: "center",
        },
        {
            target: "#workout-form",
            content: "Fill out the workout details, including the title, reps, and load.",
        },
        {
            target: "#add-workout-btn",
            content: "Click here to add a new workout to your list.",
        },
        {
            target: "#workout-list",
            content: "This is where all your workouts will appear.",
        },
        {
            target: ".workout-item",
            content: "Each workout is displayed here with its details.",
        },
        {
            target: "#status-filter",
            content: "Use this filter to view workouts based on their status (Pending, In Progress, Completed).",
        },
        {
            target: ".edit-workout-btn",
            content: "Click here to edit an existing workout.",
        },
        {
            target: ".delete-workout-btn",
            content: "Click here to delete a workout from your list.",
        },
        {
            target: "#user-email",
            content: "Here is your email. You can check your logged-in account detail here",
        },
        {
            target: "#logout-btn",
            content: "Click here to log out when you're done.",
        },
        {
            target: "#theme-toggle-btn",
            content: "Use this button to switch between Light and Dark mode.",
        },
        {
            target: "#start-tour-btn",
            content: "Click this button anytime to restart the tour!",
        },
        {
            target: "body",
            content: "That's it! You're now ready to use WorkoutX. Have fun tracking your workouts!",
            placement: "center",
        },
    ];


    return (
        <>
            <Joyride
                steps={steps}
                run={run}
                continuous={true}
                showProgress={true}
                showSkipButton={true}
                styles={{
                    options: { zIndex: 10000 },
                    overlayLegacy: 'rgba(0, 0, 0, 0.8)',
                }}
                callback={(data) => {
                    if (data.status === "finished" || data.status === "skipped") {
                        setRun(false);
                    }
                }}
            />
            <button
                id="start-tour-btn"
                onClick={startTour}
                className="absolute top-1 left-1 sm:absolute sm:bottom-5 sm:right-5 z-10 w-5 h-5 bg-blue-600 text-white text-[15px]
                   flex items-center justify-center rounded-full shadow-lg 
                   hover:bg-blue-700 transition text-xl font-extrabold cursor-pointer
                   dark:text-darkButtonText dark:bg-darkEditButton dark:hover:bg-darkEditButtonHover"
            >
                ?
            </button>
        </>
    );
};

export default UserGuide;