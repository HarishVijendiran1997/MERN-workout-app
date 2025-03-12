// Importing necessary components
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react";
import NavBar from "./components/NavBar.jsx"
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContextProvider } from "../contexts/ThemeContext.jsx";
import { useThemeContext } from "../hooks/useThemeContext.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import UserGuide from "./components/UserGuide.jsx";
import Loader from "./components/Loader.jsx";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Test = lazy(() => import("./pages/Test.jsx"));


function AppContent() {
  const { user } = useAuthContext()
  const { themeMode } = useThemeContext()
  return (
    <div className="font-primary min-h-screen flex flex-col">
      <BrowserRouter>
        {user && <UserGuide />}
        <ToastContainer theme={themeMode} position="bottom-right" closeOnClick={true} transition={Slide} autoClose={3000} />
        <NavBar className="relative" />
        <div className="flex flex-grow">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
              <Route path="/test" element={user ? <Test /> : <Navigate to="/login" />} />
            </Routes>
          </Suspense>
        </div>
        <ScrollToTop />
      </BrowserRouter >
    </div >
  )
}

function App() {
  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  );
}

export default App
