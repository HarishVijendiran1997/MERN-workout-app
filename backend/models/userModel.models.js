import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import validator from "validator";
import { Workout } from "../models/WorkoutModel.models.js";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    enum: ["Basic", "Premium"],
    default: "Basic",
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
});

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email address.");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
    );
  }

  const existingUser = await this.findOne({ email });

  if (existingUser) {
    throw new Error("An account with this email already exists.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, plan: "Basic" });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("No account found with this email.");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Incorrect password. Please try again.");
  }
  return user;
};

userSchema.statics.upgrade = async function (id, plan) {
  if (!id || !plan) {
    throw new Error("Please provide user ID and plan");
  }

  // if(plan === "Premium"){
  //   throw new Error("Upgrade to Premium plan is not available");
  // }
  const user = await this.findOneAndUpdate(
    { _id: id },
    { plan },
    { new: true }
  );

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

userSchema.statics.downgrade = async function (id, plan) {
  if (!id || !plan) {
    throw new Error("Please provide user ID and plan");
  }

  const user = await this.findOneAndUpdate(
    { _id: id },
    { plan },
    { new: true }
  );

  if (!user) {
    throw new Error("User not found");
  }

  await Workout.updateMany(
    { user_id: id, status: { $ne: "pending" } },
    { status: "pending" }
  );

  return user;
};

userSchema.statics.forgotPassword = async function (email) {
  if (!email) {
    throw new Error("Please provide a valid email");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("User with this email does not exist");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  await user.save();

  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  //send email notification
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Password Reset Request",
    html: `<p>You requested a password reset. Click <a href="${resetURL}">here</a> to reset your password.</p>`,
  };

  await transporter.sendMail(mailOptions);

  return { message: "Password reset link sent to email." };
};

userSchema.statics.resetPassword = async function (token, newPassword) {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await this.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error("Password reset token is invalid or expired.");
  }
  if (newPassword.length < 8) {
    throw new Error("Password should be at least 8 characters long");
  }

  if (!validator.isStrongPassword(newPassword)) {
    throw new Error(
      "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  await user.save();

  return { message: "Password reset successful." };
};

userSchema.statics.deleteAccount = async function (id) {
  if (!id) {
    throw new Error("Please provide user ID");
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid user ID");
  }
  // delete associated workouts
  await Workout.deleteMany({ user_id: id });

  // delete user
  const user = await this.findByIdAndDelete(id);

  if (!user) {
    throw new Error("User not found");
  }
  return { message: "Account deleted successfully.", user: user };
};

export const User = mongoose.model("User", userSchema);
