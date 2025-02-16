import { useState, useEffect } from "react";
import axios from "axios";
import GoalCard from "./GoalCard";
import { toast } from "react-toastify";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDuration, setNewGoalDuration] = useState("3"); // Default to 3 months
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiString = import.meta.env.VITE_API_URL;

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiString}/getposts`, { withCredentials: true });
      setGoals(response.data);
    } catch (err) {
      setError("Failed to load goals");
      toast.error("Failed to load goals", { position: "bottom-right" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async (e) => {
    e.preventDefault();

    if (!newGoalTitle.trim()) {
      toast.error("Please enter a goal title.", { position: "bottom-right" });
      return;
    }

    try {
      await axios.post(
        `${apiString}/addGoal`,
        { title: newGoalTitle, duration: parseInt(newGoalDuration) },
        { withCredentials: true }
      );

      toast.success("Goal added!", { position: "bottom-right" });
      setNewGoalTitle("");
      setNewGoalDuration("3"); // Reset to default
      setIsModalOpen(false);
      fetchGoals(); // Refresh the goals list after adding
    } catch (err) {
      toast.error("Failed to add goal", { position: "bottom-right" });
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen text-white py-10 px-6 sm:px-8 relative">
      <h2 className="text-3xl font-bold text-center mb-6">Your Goals</h2>

      {/* Goals List */}
      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {goals.length > 0 ? (
            goals.map((goal) => <GoalCard key={goal.id} goal={goal} />)
          ) : (
            <p className="text-center text-gray-400 col-span-full">No goals yet.</p>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && <div className="text-center text-red-500 mt-4">{error}</div>}

      {/* Floating Add Goal Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-slate-600 hover:bg-slate-00 text-white p-4 rounded-full shadow-lg text-xl font-bold"
      >
        +
      </button>

      {/* Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-slate-800 p-5 rounded-lg w-80">
            <h3 className="text-xl font-semibold text-white mb-3">New Goal</h3>
            <form onSubmit={handleAddGoal} className="space-y-3">
              {/* Goal Title Input */}
              <input
                type="text"
                placeholder="Goal Title"
                className="w-full p-2 border border-slate-600 rounded bg-slate-900 text-white"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
              />

              {/* Duration Select */}
              <select
                className="w-full p-2 border border-slate-600 rounded bg-slate-900 text-white"
                value={newGoalDuration}
                onChange={(e) => setNewGoalDuration(e.target.value)}
              >
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="9">9 Months</option>
                <option value="12">12 Months</option>
              </select>

              {/* Submit & Close Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-slate-400 hover:bg-slate-700 px-4 py-2 rounded text-white"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;
