import jwt from "jsonwebtoken";
import { User } from "../models/userModel.models.js";

export const requireAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token required" });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET);
    
    const user = await User.findOne({_id: decoded._id}).select("_id");

    if (!user) {
      return res.status(403).json({ message: "User not authorized" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
