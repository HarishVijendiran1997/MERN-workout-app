import { User } from "../models/userModel.models.js";
import jwt from "jsonwebtoken";

//? Generate JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//?Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res
      .status(200)
      .json({ message: "User logged in successfully", email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//? Signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res
      .status(200)
      .json({ message: "Register User successful", email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { loginUser, signupUser };
