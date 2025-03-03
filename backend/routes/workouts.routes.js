import express from "express";
import {
  getWorkouts,
  getSingleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workout.controller.js";

//importing the middleware to validate the workout ID
import validateId from "../middlewares/validId.middleware.js";

//declaring the express router
const router = express.Router();

//routes for the workouts
router.get("/", getWorkouts);

//route for the single workout
router.get("/:id", validateId, getSingleWorkout); // validateId is a middleware

//route to post a new workout
router.post("/", createWorkout);

//route to update a workout
router.patch("/:id", validateId, updateWorkout); // validateId is a middleware

//route to delete a workout
router.delete("/:id", validateId, deleteWorkout); // validateId is a middleware

export default router;
