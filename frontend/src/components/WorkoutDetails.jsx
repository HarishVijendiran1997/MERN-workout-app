const WorkoutDetails = ({ workout }) => {

    return (
        <div className="flex items-start bg-white max-w-screen rounded-lg font-Poppins ml-4  pb-5  pl-5 pt-5 flex-col shadow-md mb-5 ">
            <h4 className="text-2xl font-extrabold text-blue-900">{workout.title}</h4>
            <p><strong>Load (kg) : </strong>{workout.load}</p>
            <p><strong>Reps : </strong>{workout.reps}</p>
            <p><strong>Created : </strong>{new Date(workout.createdAt).toLocaleString()}</p>
        </div>
    )
}

export default WorkoutDetails