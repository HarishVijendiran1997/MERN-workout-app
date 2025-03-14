# MERN WorkoutX App

## Overview

The **WorkoutX App** is a full-stack web application built using the **MERN (MongoDB, Express, React, Node.js) stack**. It allows users to manage their workout routines by adding, updating, and deleting workouts. The app includes authentication for secure user access, a theme toggle for both **light mode and dark mode**, and a **subscription-based model** with free and premium features.

## Features

### 🔐 Authentication

- **Sign Up**: Users can register an account with email and password.
- **Login**: Users can log in securely.
- **Logout**: Users can log out from their account.
- **JWT Authentication**: Secure API routes using JSON Web Tokens (JWT).
- **Forgot Password**: Users can reset their password via email using **Nodemailer** and **crypto**.

### 💪 Workout Management

- **View Workouts**: Users can see a list of all their saved workouts.
- **Add Workouts**: Users can add new workout sessions with details like title, reps, and load.
- **Edit Workouts**: Users can update existing workouts.
- **Delete Workouts**: Users can remove workouts from their list.
- **Workout Status** *(Premium Feature)*: Users can mark workouts as **Pending, In Progress, or Completed**.
- **Workout Title Suggestions**: Provides a list of suggested workout titles based on common exercises.
- **Sample Workout for Intro Guide**: New users can access a pre-configured sample workout to get started.
- **Delete Account Option**: Users can permanently delete their account from settings.

### 🎟️ Subscription Plans

- **Basic Plan**: Free users can add, edit, and delete workouts.
- **Premium Plan**: Premium users unlock the **Workout Status** feature and additional enhancements.
- **Subscription Management**: Users can upgrade or cancel their plan.

### 🎭 User Profile

- **View Profile**: Users can see their profile information.
- **Subscription Status**: Displays the current plan (Basic or Premium).

### 🎨 Theme Toggle

- **Light & Dark Mode**: Users can switch between light and dark themes.
- **Persistent Theme**: Theme preference is stored in local storage, so it remains after refresh.

### 📱 Responsive Design

- **Mobile-Friendly UI**: Optimized for different screen sizes, ensuring a seamless experience on mobile, tablet, and desktop.
- **Adaptive Layouts**: Uses Tailwind CSS grid and flex utilities to adjust layouts dynamically.
- **Mobile-First Approach**: Ensures core functionalities work smoothly on smaller screens before scaling up.

### 🔔 Notifications

- **Toast Notifications**: Provides feedback on user actions (e.g., successful login, errors, workout added, etc.).

### 🚀 User Experience Enhancements

- **React Joyride Tour**: A guided introduction to help new users understand the app's features.
- **Scroll to Top Button**: Allows users to quickly navigate back to the top of the page for better usability.
- **Lazy Loading**: Optimizes performance by loading components and images only when needed.

### ⚡ Performance & Optimization

- **React Context API**: Manages global state for authentication, theme, and subscription.
- **Axios for API Requests**: Efficient API handling with error management.
- **Modular Component Structure**: Code is structured for better readability and reusability.
- **Error Handling**: Displays user-friendly error messages for internet connectivity issues and API failures.

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, Axios, React Toastify, React Joyride
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Token), bcrypt for password hashing
- **Other Dependencies**: cors, dotenv, validator, nodemailer, crypto, nodemon, react-router-dom, date-fns, eslint, vite

## Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/HarishVijendiran1997/MERN-workout-app.git
cd MERN-workout-app
```

### 2️⃣ Install Dependencies

#### Frontend

```sh
cd frontend
npm install
```

#### Backend

```sh
cd backend
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the backend directory and add:

```
MONGO_URI=your_mongodb_connection_string
SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### 4️⃣ Start the Application

#### Backend (Runs on Port 4000)

```sh
cd backend
npm run dev
```

#### Frontend (Runs on Port 3000)

```sh
cd frontend
npm run dev
```

## Future Enhancements

- **AI-based Workout Recommendations**: Suggest workouts based on user history.
- **Enhanced Responsive Design**: Further optimizations for better user experience on all devices.
- **Offline Mode**: Allow users to track workouts even without an internet connection.
- **Leaderboard & Challenges**: Users can compete and track progress within a community.

## Contributing

Feel free to fork and contribute to this project by opening a pull request! 🚀

