import express from "express";
import dotenv from "dotenv";
import workoutRoutes from "./routes/workouts.routes.js";

//configuring the dotenv to use the .env file
dotenv.config();

//declaring the express app
const app = express();

//middleware to parse the request body
app.use(express.json());

//middleware to log the request path and method
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes for the workouts
app.use('/api/workouts', workoutRoutes);

//defining the port
const PORT = process.env.PORT || 5000;

//starting the server
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})