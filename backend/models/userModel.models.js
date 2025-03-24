import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
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

userSchema.statics.signup = async function (
  fullName,
  username,
  email,
  password
) {
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
  const existingUsername = await this.findOne({ username });
  if (existingUsername) {
    throw new Error(
      "This username is already taken. Please choose a different one."
    );
  }
  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email address.");
  }
  const existingUser = await this.findOne({ email });

  if (existingUser) {
    throw new Error("An account with this email already exists.");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    fullName,
    username,
    email,
    password: hash,
    plan: "Basic",
  });

  await Workout.create({
    title: "Sample Workout",
    reps: 10,
    load: 20,
    status: "pending",
    user_id: user._id,
  });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"WorkoutX Support" <${process.env.EMAIL_USER}>`,
    to: user.email,
    replyTo: "harish.practicemail@gmail.com",
    subject: "Welcome to WorkoutX! 🎉",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 20px;">
        <h2>Welcome to WorkoutX, ${user.fullName || "User"}! 💪</h2>
        <p>Thanks for signing up! You're now part of WorkoutX, where you can track workouts, stay motivated, and achieve your fitness goals.</p>
        <p>Get started by exploring the app and setting up your workout plan.</p>
        <p style="text-align: center;">
          <a href="${
            process.env.FRONTEND_URL
          }" style="background-color: #007bff; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
            Go to WorkoutX
          </a>
        </p>
        <p>If you need any help, Don't hesitate to reach out to our support team.</p>
        <p>— The WorkoutX Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);

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

  //send email notification
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"WorkoutX Support" <${process.env.EMAIL_USER}>`,
    to: user.email,
    replyTo: "harish.practicemail@gmail.com",
    subject: "Reset Your WorkoutX Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hello ${user.fullName || "User"},</p>
        <p>We received a request to reset your password for your WorkoutX account. If you made this request, You use button below to reset your password:</p>
        <p style="text-align: center;">
          <a href="${resetURL}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </p>
        <p>If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
        <p>For security reasons, this link will expire in 20 minutes.</p>
        <hr>
        <p style="font-size: 12px; color: #777;">If you need further assistance, please contact our support team.</p>
        <p style="font-size: 12px; color: #777;">— WorkoutX Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  // Looking to send emails in production? Check out our Email API/SMTP product!
  // const transport = nodemailer.createTransport({
  //   host: "smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: "6d796400c29bab",
  //     pass: "2a33fb13b6e857",
  //   },
  // });
  // const sender = {
  //   address: "hello@example.com",
  //   name: "Mailtrap Test",
  // };
  // const recipients = [
  //   "harish.vijendiran@gmail.com",
  // ];

  // transport
  //   .sendMail({
  //     from: sender,
  //     to: recipients,
  //     subject: "You are awesome!",
  //     text: "Congrats for sending test email with Mailtrap!",
  //     category: "Integration Test",
  //     sandbox: true
  //   })
  //   .then(console.log, console.error);

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

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"WorkoutX Support" <${process.env.EMAIL_USER}>`,
    to: user.email,
    replyTo: "harish.practicemail@gmail.com",
    subject: "Your WorkoutX Account Has Been Deleted",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 20px;">
        <h2>Account Deletion Confirmation</h2>
        <p>Hello ${user.fullName || "User"},</p>
        <p>Your WorkoutX account has been successfully deleted as per your request.</p>
        <p>We’re sorry to see you go! If this was a mistake or you change your mind, You are welcome to sign up again anytime.</p>
        <p>If you didn’t request this, please contact our support team immediately.</p>
        <p>— The WorkoutX Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);

  return { message: "Account deleted successfully.", user: user };
};

export const User = mongoose.model("User", userSchema);
