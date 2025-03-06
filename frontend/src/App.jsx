import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import NavBar from "./components/NavBar.jsx"
import Test from "./pages/Test.jsx"
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext.jsx";

function AppContent() {
  const { themeMode } = useTheme()  
  return (
      <div className="font-primary min-h-screen flex flex-col">
        <BrowserRouter>
          <ToastContainer theme={themeMode} position="bottom-right" closeOnClick={true} transition={Slide} autoClose={3000} />
          <NavBar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
  )
} 

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App
