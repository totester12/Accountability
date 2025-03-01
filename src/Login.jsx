import { useState } from "react";
import axios from "axios";
import {  toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiString = import.meta.env.VITE_API_URL + "/login"
    // Make a POST request to the API with the username and password
    try {
      const response = await axios.post(apiString, {
        username: username,
        password: password
      },{
        withCredentials: true
      });

      console.log("Success:", response.data);
      toast.success("Login Succesful", {
        position: "bottom-right"
      })
      navigate("/goals");
    } catch (error) {
      if (error.response) {
        // Server responded but with an error status (e.g., 404)
        toast.error(error.response.data.error, {
          position: "bottom-right"
        }
        
        )
      } else if (error.request) {
        // No response received
        console.error("No response received:", error.request);
      } else {
        // Other errors
        console.error("Request error:", error.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center text-white">
      <div className="w-full max-w-sm p-8 space-y-6 bg-slate-900 shadow-lg border border-slate-800">
        <h2 className="text-2xl font-bold text-center text-slate-100">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 mt-1 bg-slate-800 border border-slate-600 text-white focus:ring focus:ring-slate-500 focus:border-slate-300 outline-none"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              aria-label="Username"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 bg-slate-800 border border-slate-600 text-white focus:ring focus:ring-slate-500 focus:border-slate-300 outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-slate-600 hover:bg-slate-500 transition border border-slate-900"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
