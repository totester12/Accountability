import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Login from "./Login.jsx"
import FourOhFour from "./FourOhFour.jsx"

function App() {


  return (

    
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/goals' element={<Goals />} />
        <Route path='/goal/:id' element={<GoalDetail />} />
        <Route path='*' element={<FourOhFour/>} />
      </Routes>
      
    

  )



  function Goals() {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">My Goals</h1>
        <p className="mt-4 text-lg text-gray-300">
          <Link to="/" className="text-blue-500 hover:text-blue-400">
            Go to Login Page
          </Link>
        </p>
      </div>
    );
  }

  function GoalDetail() {
    return <h1>Specific Goal</h1>
  }

  
}

export default App
