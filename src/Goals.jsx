import { useState, useEffect } from "react";
import axios from "axios";
import GoalCard from "./GoalCard";
import { toast } from "react-toastify";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiString = import.meta.env.VITE_API_URL + "/getposts";

  useEffect(() => {
    // Function to fetch the user's goals
    const fetchGoals = async () => {
      try {
        // Ensure the JWT is sent via cookies by passing withCredentials correctly
        const response = await axios.get(apiString, {
          withCredentials: true,  // This ensures the cookies are sent with the request
        });
        setGoals(response.data);  // Store goals in state
      } catch (err) {
        setError("Failed to load goals");
        toast.error("Failed to load goals", {
          position: "bottom-right",
        });
        console.log(err)
        console.log(apiString)
      } finally {
        setLoading(false);  // Stop loading after the fetch is complete
      }
    };

    fetchGoals(); // Call the function to fetch goals when the component mounts
  }, []);

  return (
    <div className="min-h-screen text-white py-10 px-6 sm:px-8">
      {/* Title Section */}
      <h2 className="text-3xl font-bold text-center mb-8">Your Goals</h2>

      {/* Loading Spinner or Goals */}
      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {goals.length > 0 ? (
            goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">No goals yet.</p>
          )}
        </div>
      )}

      {/* Display any errors if occurred */}
      {error && (
        <div className="text-center text-red-500 mt-4">{error}</div>
      )}
    </div>
  );
};

export default Goals;
