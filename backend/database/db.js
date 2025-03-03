import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//connecting to the database
export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
};
