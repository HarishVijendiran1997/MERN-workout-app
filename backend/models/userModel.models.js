import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import {
  deletedAccountEmail,
  resetPasswordEmail,
} from "../services/emailServices.js";
import validator from "validator";
import { Workout } from "../models/WorkoutModel.models.js";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxLength: 30,
  },
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
userSchema.index({ resetPasswordExpires: 1 }, { expireAfterSeconds: 1200 });
userSchema.statics.signup = async function (
  fullName,
  username,
  email,
  password
) {
  console.time("Total Signup Time");
  if (!fullName || !username || !email || !password) {
    throw new Error("All fields are required.");
  }
  if (fullName.length < 3) {
    throw new Error("Full name must be at least 3 characters long.");
  }
  if (!validator.isAlphanumeric(username)) {
    throw new Error(
      "Username must contain only letters and numbers (A-Z, a-z, 0-9). Example: user123"
    );
  }

  const [existingUser, existingEmail] = await Promise.all([
    this.findOne({ username }),
    this.findOne({ email }),
  ]);
  if (existingUser) {
    throw new Error(
      "This username is already taken. Please choose a different one."
    );
  }

  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email address.");
  }
  if (existingEmail) {
    throw new Error("An account with this email already exists.");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
    );
  }

  const salt = await bcrypt.genSalt(6);
  const hash = await bcrypt.hash(password, salt);
  console.timeEnd("Password Hashing");

  console.time("User Creation");
  const user = await this.create({
    fullName,
    username,
    email,
    password: hash,
    plan: "Basic",
  });
  console.timeEnd("User Creation");

  console.time("Workout Sample Creation");
  await Workout.create({
    title: "Sample Workout",
    reps: 10,
    load: 20,
    status: "pending",
    user_id: user._id,
  });
  console.timeEnd("Workout Sample Creation");

  console.timeEnd("Total Signup Time");

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const user = await this.findOne({ email }).select("+password");
  const fakePassword =
    "$2b$10$7qK2Kzj1Fp7lX8zAaXb9ZuI4uUwPOjUMMLU9QQ0yIpTX0uOZz6m5y";

  if (!user) {
    throw new Error("No account found with this email.");
  }
  const isMatch = await bcrypt.compare(
    password,
    user ? user.password : fakePassword
  );

  if (!isMatch) {
    throw new Error("Incorrect password. Please try again.");
  }
  user.password = undefined;

  return user;
};

userSchema.statics.upgrade = async function (id, plan) {
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
  user.resetPasswordExpires = Date.now() + 20 * 60 * 1000;

  await user.save();

  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  setImmediate(() => resetPasswordEmail(user, resetURL));

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

  const salt = await bcrypt.genSalt(6);
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

  const userData = await this.findOne({ _id: id });
  if (!userData) {
    throw new Error("User not found");
  }
  setImmediate(() => deletedAccountEmail(userData.email, userData.fullName));

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
