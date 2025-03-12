const Loader = () => (
    <div className="flex dark:bg-darkPrimary flex-grow justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-blue-600">Loading...</p>
      </div>
    </div>
  );

  export default Loader;