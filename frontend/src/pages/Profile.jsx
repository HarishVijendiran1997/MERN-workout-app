import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const Profile = () => {
    const { user } = useAuthContext();
    return (
        <div className="flex w-full flex-col items-center justify-center min-h-screen bg-neutral-200 dark:bg-darkPrimary text-blue-900 dark:text-white">
            <h1 className="text-3xl font-bold">Profile Page</h1>
            <p className="text-lg mt-4">User email: {user.email}</p>
            <p className="text-lg mt-4">User name: {user.message}</p>
            <p className="text-lg mt-4">User email: {user.email}</p>
        </div>
    );
};

export default Profile;