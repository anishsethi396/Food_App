import NavBar from "./Components/Home Page/NavBar"
import Home from './Components/Home Page/Home'
import Footer from './Components/Home Page/Footer'
import Signup from "./Components/Login Page/Signup"
import AuthProvider from "./Components/Context/AuthProvider"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AllPlans from "./Components/Plan Page/AllPlans"
import Login from "./Components/Login Page/Login"

function App() {

  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/allPlans' element={<AllPlans/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path='/login' element={<Login/>}/>
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  )
}

export default App
