import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import NavBar from "./components/NavBar.jsx"
import Test from "./pages/Test.jsx"
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

  return (
    <div className="font-primary min-h-screen flex flex-col bg-gray-100">
      <BrowserRouter>
        <ToastContainer position="bottom-right" closeOnClick={true} theme="light" transition={Slide} autoClose={3000} />
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

export default App
