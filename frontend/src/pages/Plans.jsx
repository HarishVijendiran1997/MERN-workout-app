// import { Link } from "react-router-dom"
import { useUpgrade } from "../../hooks/useUpgrade";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Plans = () => {
    const { user } = useAuthContext()
    const { upgrade, error, isLoading } = useUpgrade()

    const handleUpgrade = async (e) => {
        e.preventDefault()
        if (!user) {
            toast.error("Please log in to upgrade");
            return;
        }
        if (user.plan === 'Premium') {
            toast.error("You're already on the Premium plan");
            return;
        }
        await upgrade(user._id, "Premium");
    }

    return (
        <div className="w-full flex flex-col items-center justify-center bg-neutral-200 text-blue-900 dark:bg-darkPrimary dark:text-white">
            <h1 className="text-3xl font-bold mb-8">Choose Your Plan</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 min-w-md sm:max-w-5xl gap-8">
                {/* Basic Plan */}
                <div className="bg-neutral-300 hover:scale-110 duration-200 transition-transform dark:bg-darkTertiary p-8 m-2 rounded-lg shadow-lg flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-2 text-neutral-800 dark:text-darkTextPrimary">Basic Plan</h2>
                    <p className="text-neutral-700 dark:text-darkTextResult">Access limited features</p>
                    <button disabled={isLoading || user.plan === "Premium"} className={`px-5 py-2 mt-4 rounded-lg text-white transition${user?.plan === "Basic"
                        ? "bg-neutral-700 dark:bg-darkDisabledButton dark:text-darkDisabledText cursor-not-allowed"
                        : "bg-blue-500 px-5 py-2 mt-4 rounded-lg hover:bg-blue-600 dark:bg-darkAddButton dark:hover:bg-darkAddButtonHover dark:active:bg-darkAddButton cursor-pointer"
                        }`}>
                        {user?.plan === "Basic" ? "Already Basic" : isLoading ? "Updating..." : "Activate Basic"}
                    </button>
                </div>

                {/* Premium Plan */}
                <div className="bg-neutral-300 hover:scale-110 duration-200 transition-transform dark:bg-darkTertiary p-8 m-2 rounded-lg shadow-lg flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-2 text-neutral-800  dark:text-darkTextPrimary">Premium Plan</h2>
                    <p className="text-neutral-700 dark:text-darkTextResult">Unlock workout status feature</p>
                    <button
                        onClick={handleUpgrade} disabled={isLoading || user.plan === "Premium"}
                        className={`px-5 py-2 mt-4 rounded-lg text-white transition${user?.plan === "Premium"
                            ? "bg-neutral-700 dark:bg-darkDisabledButton dark:text-darkDisabledText cursor-not-allowed"
                            : "bg-blue-500 px-5 py-2 mt-4 rounded-lg hover:bg-blue-600 dark:bg-darkAddButton dark:hover:bg-darkAddButtonHover dark:active:bg-darkAddButton cursor-pointer"
                            }`}
                    >
                        {user?.plan === "Premium" ? "Already Premium" : isLoading ? "Upgrading..." : "Upgrade to Premium"}
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Plans;
