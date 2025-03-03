import express from "express";

const router = express.Router();

//routes for the workouts
router.get("/", (req, res) => {
    res.json({message: "Get all workouts"});
})

//route for the single workout
router.get("/:id", (req, res) => {
    res.json({message: "Get a single workout with id " + req.params.id });
})

//route to post a new workout
router.post("/", (req, res) => {
    res.json({message: "Post a new workout"});
})

//route to delete a workout
router.delete("/:id", (req, res) => {
    res.json({message: "Delete a workout with id " + req.params.id});
})

//route to update a workout
router.patch("/:id", (req, res) => {
    res.json({message: "Update a workout with id " + req.params.id});
})

export default router;