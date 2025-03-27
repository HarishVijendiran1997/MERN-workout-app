import { User } from "../models/userModel.models.js";
import { sendWelcomeEmail } from "../services/emailServices.js";
import jwt from "jsonwebtoken";

//? Generate JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//?Login user
const loginUser = async (req, res) => {
  console.time("Login Execution Time");
  const { email, password } = req.body;
  try {
    console.time("User Authentication Time");
    const user = await User.login(email.toLowerCase(), password);
    console.timeEnd("User Authentication Time");

    console.time("Token Generation Time");
    const token = createToken(user._id);
    console.timeEnd("Token Generation Time");

    res.status(200).json({
      message: "User logged in successfully",
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email,
      token,
      plan: user.plan,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  console.timeEnd("Login Execution Time");
  console.log("---------------------------------------");
};

//? Signup user
const signupUser = async (req, res) => {
  console.time("Signup Execution Time");
  const { fullName, username, email, password, confirmPassword } = req.body;
  if (!confirmPassword) {
    return res.status(400).json({ message: "Confirm password are required." });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }
  try {
    console.time("User Creation Time");
    const user = await User.signup(
      fullName,
      username,
      email.toLowerCase(),
      password
    );
    console.time("Token Generation Time");
    const token = createToken(user._id);
    res.status(200).json({
      message: "Register User successful",
      _id: user._id,
      fullName,
      username,
      email,
      token,
      plan: user.plan,
    });

    console.time("Email sent");
    setImmediate(() => sendWelcomeEmail(user.email, user.fullName));
    console.timeEnd("Email sent");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  console.timeEnd("Signup Execution Time");
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
      fullName: user.fullName,
      username: user.username,
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
      fullName: user.fullName,
      username: user.username,
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
  const { token, newPassword, confirmPassword } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({ message: "Passwords are required" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const response = await User.resetPassword(token, newPassword);
    res.status(200).json(response);
  } catch (error) {
    console.error("Backend Error:", error.message);
    res.status(400).json({ message: error.message || "Server error" });
  }
};

//?Delete User Account
const deleteUserAccount = async (req, res) => {
  const id = req.user._id;
  try {
    const response = await User.deleteAccount(id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Backend Error:", error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export {
  loginUser,
  signupUser,
  upgradeUser,
  downgradeUser,
  forgotPassword,
  resetPassword,
  deleteUserAccount,
};
