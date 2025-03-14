import express from "express";
import {
  downgradeUser,
  loginUser,
  signupUser,
  upgradeUser,
  forgotPassword,
  resetPassword,
  deleteUserAccount,
} from "../controllers/user.controller.js";
import { requireAuth } from "../middlewares/requireAuth.middleware.js";

const router = express.Router();

//routes for login
router.post("/login", loginUser);

//routes for signup
router.post("/signup", signupUser);

//routes for upgrading a user's account
router.patch("/upgrade/:id", requireAuth, upgradeUser);

//routes for downgrading a user's account
router.patch("/downgrade/:id", requireAuth, downgradeUser);

//route for requesting a password reset link
router.post("/forgot-password", forgotPassword);

//route for resetting password with a valid token
router.patch("/reset-password", resetPassword);

//route for deleting account
router.delete("/profile", requireAuth, deleteUserAccount);

export default router;
