import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
    const apiString = import.meta.env.VITE_API_URL + "/login"
    // Make a POST request to the API with the username and password
    const response = await axios.post(
      apiString,
      {
        username: username,
        password: password // Make sure the API expects `passwordHash`
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false, // Ensure no cookies are sent (AWS API Gateway doesn't need them), dont think we need them for login anyway, get cookie back though
      }
    );
    console.log(response.status)
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
