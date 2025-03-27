import AboutUs from "./Components/AboutUs"
import Home from "./Components/Home"
import InvestmentSubmission from "./Components/InvestmentSubmission"
import Login from "./Components/Login"
import Register from "./Components/Register"
import Results from "./Components/Results"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  

  return (
    <>
    <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/results" element={<Results />} />
            <Route path="/investmentsubmission" element={<InvestmentSubmission />} />
            <Route path="/aboutus" element={<AboutUs />} />
          </Routes>
      
    </Router>
    </>
  )
}

export default App
