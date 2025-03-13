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
      plan: user.plan,
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
    res.status(200).json({
      message: "Register User successful",
      _id: user._id,
      email,
      token,
      plan: user.plan,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//? Upgrade User
const upgradeUser = async (req, res) => {
  const { id } = req.params;
  const { plan } = req.body;
  try {
    const user = await User.upgrade(id, plan);
    const token = createToken(user._id);
    res.status(200).json({
      message: "Congratulations! Your account has been successfully upgraded.",
      _id: user._id,
      email: user.email,
      token,
      plan: user.plan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

//? Downgrade User
const downgradeUser = async (req, res) => {
  const { id } = req.params;
  const { plan } = req.body;
  try {
    const user = await User.downgrade(id, plan);
    const token = createToken(user._id);
    res.status(200).json({
      message: "You have successfully switched to a Basic plan.",
      _id: user._id,
      email: user.email,
      token,
      plan: user.plan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

//? Forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const response = await User.forgotPassword(email);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message || "Server error" });
  }
};

//? Reset Password
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const response = await User.resetPassword(token, newPassword);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message || "Server error" });
  }
};

export {
  loginUser,
  signupUser,
  upgradeUser,
  downgradeUser,
  forgotPassword,
  resetPassword,
};
