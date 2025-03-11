import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home.jsx"
import NavBar from "./components/NavBar.jsx"
import Test from "./pages/Test.jsx"
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContextProvider } from "../contexts/ThemeContext.jsx";
import { useThemeContext } from "../hooks/useThemeContext.jsx";
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import UserGuide from "./components/UserGuide.jsx";

function AppContent() {
  const { user } = useAuthContext()
  const { themeMode } = useThemeContext()
  return (
    <div className="font-primary min-h-screen flex flex-col">
      <BrowserRouter>
        {user &&<UserGuide/>}
        <ToastContainer theme={themeMode} position="bottom-right" closeOnClick={true} transition={Slide} autoClose={3000} />
        <NavBar className="relative" />
        <div className="flex flex-grow">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/test" element={user ? <Test /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
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
