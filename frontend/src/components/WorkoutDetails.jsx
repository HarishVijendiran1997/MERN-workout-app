const WorkoutDetails = ({workout}) => {
    
    return (
        <div className="flex items-start bg-gray-100 max-w-screen rounded-2xl font-Poppins ml-4 pb-5  pl-5 pt-5 flex-col shadow-md mb-5">
            <h4 className="text-2xl font-bold">{workout.title}</h4>
            <p><strong>Load (kg) : </strong>{workout.load}</p>
            <p><strong>Reps : </strong>{workout.reps}</p>
            <p><strong>Created : </strong>{new Date(workout.createdAt).toLocaleString()}</p>
        </div>
    )
}

export default WorkoutDetails