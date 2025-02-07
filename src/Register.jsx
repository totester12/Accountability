import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("User registered:", { username, password });
    navigate("/"); // Redirect to login after registering
  };

  return (
    <div className="flex min-h-screen items-center justify-center  text-white">
      <div className="w-full max-w-sm p-8 space-y-6 bg-slate-900 shadow-lg border border-slate-800">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button type="submit" className="w-full px-4 py-2 bg-slate-600 hover:bg-slate-500 transition border border-slate-900">
            Register
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-center mt-4">
          Already have an account? <Link to= "/" className="text-blue-400">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
