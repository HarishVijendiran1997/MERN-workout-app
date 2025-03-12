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
    const user = await User.login(email.toLowerCase(), password);
    const token = createToken(user._id);
    res.status(200).json({
      message: "User logged in successfully",
      _id: user._id,
      email,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//? Signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email.toLowerCase(), password);
    const token = createToken(user._id);
    res.status(200).json({ message: "Register User successful", email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//? Upgrade User
const upgradeUser = async (req, res) => {
  const { id } = req.params;
  const { plan } = req.body; // ✅ Get plan from request body

  try {
    const user = await User.upgrade(id, plan);
    res.status(200).json({ message: "User upgraded successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export { loginUser, signupUser, upgradeUser };
