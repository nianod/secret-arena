import Landing from "./Pages/Landing"
import Dashboard from "./Pages/Dashboard"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </Router>
  )
}

export default App
