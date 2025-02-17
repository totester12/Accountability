import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const GoalCard = ({ goal, fetchGoals  }) => {
  const [loading, setLoading] = useState(false);
  const [localStatus, setLocalStatus] = useState(goal.status); // Track status locally

  const apiString = import.meta.env.VITE_API_URL;

  // Helper function to calculate the difference in days
  const calculateDaysBetween = (startDate, endDate) => {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((endDate - startDate) / msPerDay);
  };

  const startDate = new Date(goal.startdate);
  const currentDate = new Date();
  const durationInDays = goal.duration * 30;

  // Last check-in logic
  const lastCheckInDate = goal.lastcheckin ? new Date(goal.lastcheckin) : null;
  const elapsedTimeInDays = lastCheckInDate ? calculateDaysBetween(startDate, lastCheckInDate) : 0;
  const progress = Math.min((elapsedTimeInDays / durationInDays) * 100, 100);

  // Determine if goal should be marked as "Failed"
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 2);

  if (lastCheckInDate && lastCheckInDate < oneDayAgo && localStatus === "Active") {
    setLocalStatus("Failed");
  }

  // Dark mode status colors
  const statusColors = {
    Active: { bg: "bg-green-900", text: "text-white" },
    Completed: { bg: "bg-blue-700", text: "text-white" },
    Failed: { bg: "bg-red-800", text: "text-white" },
  };

  const statusClass = statusColors[localStatus] || { bg: "bg-gray-700", text: "text-white" };

  // Handle Check-in (Triggered on clicking the card)
  const handleCheckIn = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.post(
        `${apiString}/checkin`,
        { goalId: goal.id },
        { withCredentials: true }
      );

      if (response.data.status) {
        setLocalStatus(response.data.status); // Update status instantly
      }

      toast.success("Checked in!", { position: "bottom-right" });
      fetchGoals();
    } catch (error) {
      toast.error("Check-in failed", { position: "bottom-right" });
      console.error("Check-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleCheckIn}
      className="p-4 bg-slate-900 border border-slate-950 shadow-md rounded-sm hover:bg-slate-800 transition cursor-pointer"
    >
      <h3 className="text-lg font-semibold text-white">{goal.title}</h3>
      <p className="text-gray-300 text-sm">{goal.duration} months</p>

      <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
        <span>Last check-in: {goal.lastcheckin ? new Date(goal.lastcheckin).toLocaleDateString() : "No check-ins yet"}</span>
        <span className={`px-2 py-0.5 rounded ${statusClass.bg} ${statusClass.text}`}>{localStatus}</span>
      </div>

      {/* Progress Bar */}
      <div className="mt-2">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-xs text-white">Progress</span>
          <span className="text-xs text-gray-400">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <div className="bg-green-800 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
