const Plans = () => {

    return (
        <div className="w-full flex flex-col items-center justify-center bg-neutral-200 text-blue-900 dark:bg-darkPrimary dark:text-white">
            <h1 className="text-3xl font-bold mb-8">Choose Your Plan</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 min-w-md sm:max-w-5xl gap-8">
                {/* Basic Plan */}
                <div className="bg-neutral-300 hover:scale-110 duration-200 transition-transform dark:bg-darkTertiary p-8 m-2 rounded-lg shadow-lg flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-2 text-neutral-800 dark:text-darkTextPrimary">Basic Plan</h2>
                    <p className="text-neutral-700 dark:text-darkTextResult">Access limited features</p>
                    <button disabled className="bg-gray-400 dark:bg-darkDisabledButton text-neutral-700 dark:text-darkDisabledText
                     px-5 py-2 mt-4 rounded-lg cursor-not-allowed">
                        Active
                    </button>
                </div>

                {/* Premium Plan */}
                <div className="bg-neutral-300 hover:scale-110 duration-200 transition-transform dark:bg-darkTertiary p-8 m-2 rounded-lg shadow-lg flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-2 text-neutral-800  dark:text-darkTextPrimary">Premium Plan</h2>
                    <p className="text-neutral-700 dark:text-darkTextResult">Unlock workout status feature</p>
                    <button
                        className="text-white bg-blue-500 px-5 py-2 mt-4 rounded-lg hover:bg-blue-600 dark:bg-darkAddButton dark:hover:bg-darkAddButtonHover transition cursor-pointer"
                    >
                        Upgrade to Premium
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Plans;
