import { User } from "../models/userModel.models.js";

const loginUser = async (req, res) => {
  res.json({ message: "loginUser" });
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    res.status(200).json({ message: "User created successfully", email, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { loginUser, signupUser };
