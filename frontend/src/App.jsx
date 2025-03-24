// Importing necessary components
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense, useMemo } from "react";
import { ThemeContextProvider } from "../contexts/ThemeContext.jsx";
import { useThemeContext } from "../hooks/useThemeContext.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Test = lazy(() => import("./pages/Test.jsx"));
const Plans = lazy(() => import("./pages/Plans.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop.jsx"));
const NavBar = lazy(() => import("./components/NavBar.jsx"));
const UserGuide = lazy(() => import("./components/UserGuide.jsx"));
const Loader = lazy(() => import("./components/Loader.jsx"));

function AppContent() {
  const { user } = useAuthContext()
  const { themeMode } = useThemeContext()
  const MemoizedToastContainer = useMemo(() => (
    <ToastContainer
      limit={window.innerWidth <= 768 ? 0 : 3} 
      theme={themeMode}
      position="bottom-right"
      closeOnClick={true}
      transition={Slide}
      autoClose={3000}
    />
  ), [themeMode]);
  return (
    <div className="font-primary min-h-screen flex flex-col">
      {user && <UserGuide />}
      {MemoizedToastContainer}
      <NavBar className="relative" />
      <div className="flex flex-grow">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/test" element={user ? <Test /> : <Navigate to="/login" />} />
            <Route path="/plans" element={user ? <Plans /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/signup" />} />
            <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/login" />} />
            <Route path="/reset-password/:token" element={!user ? <ResetPassword /> : <Navigate to="/login" />} />
          </Routes>
        </Suspense>
      </div>
      <ScrollToTop />
    </div >
  )
}

function App() {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App
