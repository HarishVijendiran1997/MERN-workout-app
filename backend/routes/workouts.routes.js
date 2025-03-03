import express from "express";

import {
  getWorkouts,
  getSingleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workout.controller.js";

const router = express.Router();

//routes for the workouts
router.get("/", getWorkouts);

//route for the single workout
router.get("/:id", getSingleWorkout);

//route to post a new workout
router.post("/", createWorkout);

//route to update a workout
router.patch("/:id", updateWorkout);

//route to delete a workout
router.delete("/:id", deleteWorkout);

export default router;
