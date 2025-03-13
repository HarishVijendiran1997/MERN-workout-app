import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaCrown } from "react-icons/fa";

const Profile = () => {
    const { user } = useAuthContext();

    return (
        <div className="flex w-full flex-col items-center justify-center min-h-screen bg-neutral-200 dark:bg-darkPrimary text-blue-900 dark:text-white">
            <h1 className="text-3xl font-bold">Profile Page</h1>
            <div className="sm:w-1/3 flex px-10">
                {user &&
                    <div>
                        <p className="text-lg mt-4">User Email: {user.email}</p>
                        <div className="flex gap-2">
                            <p className="text-lg mt-4">User Plan: {user.plan}</p>{user.plan === "Premium" && (
                                <FaCrown size={20} color="#FFA500" className="translate-y-5" />
                            )}
                        </div>
                        <p className="text-lg mt-4">User ID: {user._id}</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default Profile;
