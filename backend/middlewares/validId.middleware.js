import mongoose from "mongoose";

//middleware to validate the workout ID
const validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid workout ID format" });
  }
  next();
};

export default validateId;
