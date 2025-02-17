import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login.jsx";
import FourOhFour from "./FourOhFour.jsx";
import Register from "./Register.jsx";
import Goals from "./Goals.jsx";

import axios from 'axios';

// Function to check authentication status from the backend
const checkAuthentication = async () => {
  const apiString = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.get(`${apiString}/check-auth`, {
      withCredentials: true, // Ensure cookies (including HttpOnly cookies) are sent with the request
    });
    console.log(response.data.isAuthenticated)
    return response.data.isAuthenticated; // Assuming the API responds with this
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false;
  }
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    const checkAuth = async () => {
      const authStatus = await checkAuthentication();
      setIsAuthenticated(authStatus);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or a spinner while checking authentication
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/goals"
        element={<ProtectedRoute element={<Goals />} />}
      />
      <Route path="*" element={<FourOhFour />} />
    </Routes>
  );
}

export default App;
