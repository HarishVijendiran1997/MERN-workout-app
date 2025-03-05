//importing the workout model from the models folder
import { Workout } from "../models/WorkoutModel.models.js";

//? get all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

//? get a single workout
const getSingleWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ message: error.message || "Invalid ID format" });
  }
};

//? create a workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({
      message: `Please fill in the following fields: ${emptyFields.join(", ")}`,
      emptyFields,
    });
  }

  try {
    const newWorkout = await Workout.create({ title, reps, load });
    res
      .status(201)
      .json({ message: "Workout created successfully", newWorkout });
  } catch (error) {
    res.status(400).json({ message: error.message || "Invalid workout data" });
  }
};

//? update a workout
const updateWorkout = async (req, res) => {
  try {
    const updateWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res
      .status(200)
      .json({ message: "Workout created successfully", updateWorkout });
  } catch (error) {
    res.status(400).json({ message: error.message || "Server error" });
  }
};

//? delete a workout
const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.status(200).json({ message: "Workout deleted successfully", workout });
  } catch (error) {
    res.status(400).json({ message: error.message || "Invalid ID format" });
  }
};

//? exporting the functions
export {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  updateWorkout,
  deleteWorkout,
};
