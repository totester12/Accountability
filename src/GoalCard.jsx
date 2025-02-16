const GoalCard = ({ goal }) => {
  // Helper function to calculate the difference in days
  const calculateDaysBetween = (startDate, endDate) => {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((endDate - startDate) / msPerDay);
  };

  const startDate = new Date(goal.startdate); // Ensure we're using the correct field
  const currentDate = new Date();
  const durationInDays = goal.duration * 30; // Convert months to days

  // If there's no last check-in, assume it's the current date for progress calculation
  const lastCheckInDate = goal.lastcheckin ? new Date(goal.lastcheckin) : currentDate;

  // Calculate the elapsed time in days
  const elapsedTimeInDays = calculateDaysBetween(startDate, lastCheckInDate);

  // Calculate progress as percentage (between 0 and 100)
  const progress = Math.min((elapsedTimeInDays / durationInDays) * 100, 100);

  // Status colors for the dark theme
  const statusColors = {
    Active: { bg: "bg-green-900", text: "text-white" }, // Dark Green
    Completed: { bg: "bg-blue-700", text: "text-white" }, // Dark Blue
    Failed: { bg: "bg-red-800", text: "text-white" }, // Dark Red
  };

  const statusClass = statusColors[goal.status] || { bg: "bg-gray-700", text: "text-white" }; // Default to dark gray

  return (
    <div
      onClick={() => console.log(goal.id)}
      className="p-4 bg-slate-900 border border-slate-950 shadow-md rounded-sm hover:bg-slate-800 transition"
    >
      <h3 className="text-lg font-semibold text-white">{goal.title}</h3>
      <p className="text-gray-300 text-sm">{goal.duration} months</p>

      {/* Last Check-in & Status */}
      <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
        <span>
          Last check-in: {goal.lastcheckin ? new Date(goal.lastcheckin).toLocaleDateString() : "No check-ins yet"}
        </span>
        <span className={`px-2 py-0.5 rounded ${statusClass.bg} ${statusClass.text}`}>
          {goal.status}
        </span>
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
