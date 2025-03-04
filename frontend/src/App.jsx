import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import NavBar from "./components/NavBar.jsx"
import Test from "./pages/Test.jsx"


function App() {

  return (
    <div className="font-primary">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
