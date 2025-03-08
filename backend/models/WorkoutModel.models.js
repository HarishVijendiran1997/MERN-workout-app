import mongoose from "mongoose";

//create a new schema for the workout
const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

//export the model as Workout
export const Workout = mongoose.model("Workout", workoutSchema);
