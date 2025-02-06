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
import Register from "./Register.jsx"
import Goals from "./Goals.jsx"

function App() {


  return (

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/goals' element={<Goals />} />
        <Route path='/goal/:id' element={<GoalDetail />} />
        <Route path='*' element={<FourOhFour/>} />
      </Routes>
      
  )


  function GoalDetail() {
    return <h1>Specific Goal</h1>
  }
  

  
}

export default App
