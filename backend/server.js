import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//importing the routes
import workoutRoutes from "./routes/workouts.routes.js";

//importing the database connection function
import { connectToDatabase } from "./database/db.js";

//configuring the dotenv to use the .env file
dotenv.config();

//declaring the express app
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

//defining the port
const PORT = process.env.PORT || 5000;

//? middleware
//middleware to parse the request body
app.use(express.json());

//middleware to log the request path and method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//? routes
//routes for the workouts
app.use("/api/workouts", workoutRoutes);

//? server
//starting the server
const startServer = async () => {
  //connecting to the database before starting the server
  await connectToDatabase();
  //starting the server
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
};

//! starting the server
startServer();
