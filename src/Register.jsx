import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

//handles registration click or submit
  const handleRegister = async (event) => {
    event.preventDefault();

    if (password == confirmPassword) {
      if (username.trim() !== "") {
        const apiString = import.meta.env.VITE_API_URL + "/register"
        try {
          const response = await axios.post(
            apiString,
            {
              username: username,
              passwordHash: password // Make sure the API expects `passwordHash`
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: false, // Ensure no cookies are sent (AWS API Gateway doesn't need them)
            }
          );

          if (response.status == 201) {
            console.log("201 code recieved, navigate off")
            toast.success("Registration Successful", {
              position: "bottom-right"
            })
            navigate("/");
          }
        } catch (error) {
          console.error("Registration failed:", error);
          setMessage(error.response?.data?.message || "Registration failed.");
        }
      } else {
        toast.error("Username cannot be empty", {
          position: "bottom-right"
        })
      }

    } else {
      toast.error("Mismatched Passwords", {
        position: "bottom-right"
      })
    }


  };





  return (
    <div className="flex min-h-screen items-center justify-center  text-white">
      <div className="w-full max-w-sm p-8 space-y-6 bg-slate-900 shadow-lg border border-slate-800">
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <form className="space-y-4">
          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 mt-1 caret-slate-500 bg-slate-800 border border-slate-600 text-white focus:ring focus:ring-slate-500 focus:border-slate-300 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mt-1 caret-slate-500 bg-slate-800 border border-slate-600 text-white focus:ring focus:ring-slate-500 focus:border-slate-300 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Confirm Password Input */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 mt-1 caret-slate-500 bg-slate-800 border border-slate-600 text-white focus:ring focus:ring-slate-500 focus:border-slate-300 outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Register Button */}
          <button onClick={handleRegister} className="w-full px-4 py-2 bg-slate-600 hover:bg-slate-500 transition border border-slate-900">
            Register
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-center mt-4">
          Already have an account? <Link to="/" className="text-blue-400">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
