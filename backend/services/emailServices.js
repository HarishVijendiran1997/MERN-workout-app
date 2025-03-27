import nodemailer from "nodemailer";

// create a transporter object using the Gmail SMTP service
export const sendWelcomeEmail = async (email, fullName) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"WorkoutX Support" <${process.env.EMAIL_USER}>`,
    to: email,
    replyTo: "harish.practicemail@gmail.com",
    subject: "Welcome to WorkoutX! 🎉",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 20px;">
        <h2>Welcome to WorkoutX, ${fullName || "User"}! 💪</h2>
        <p>Thanks for signing up! You're now part of WorkoutX, where you can track workouts, stay motivated, and achieve your fitness goals.</p>
        <p>Get started by exploring the app and setting up your workout plan.</p>
        <p style="text-align: center;">
          <a href="${process.env.FRONTEND_URL}" style="background-color: #007bff; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
            Go to WorkoutX
          </a>
        </p>
        <p>If you need any help, don't hesitate to reach out to our support team.</p>
        <p>— The WorkoutX Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${email}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};

export const deletedAccountEmail = async (email, fullName) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    
      const mailOptions = {
        from: `"WorkoutX Support" <${process.env.EMAIL_USER}>`,
        to: email,
        replyTo: "harish.practicemail@gmail.com",
        subject: "Your WorkoutX Account Has Been Deleted",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 20px;">
            <h2>Account Deletion Confirmation</h2>
            <p>Hello ${fullName || "User"},</p>
            <p>Your WorkoutX account has been successfully deleted as per your request.</p>
            <p>We’re sorry to see you go! If this was a mistake or you change your mind, You are welcome to sign up again anytime.</p>
            <p>If you didn’t request this, please contact our support team immediately.</p>
            <p>— The WorkoutX Team</p>
          </div>
        `,
      };
      try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Delete Email sent to ${email}`);
      } catch (error) {
        console.error("❌Delete Email sending failed:", error);
      }
}

export const resetPasswordEmail = async (user, resetURL) => {
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
}