import { User } from "../models/userModel.models.js";

const loginUser = async (req, res) => {
  res.json({ message: "loginUser" });
};

const signupUser = async (req, res) => {
  res.json({ message: "signupUser" });
};

export { loginUser, signupUser };
