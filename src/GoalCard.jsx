const GoalCard = ({ goal }) => {
    // Helper function to calculate the difference in days
    const calculateDaysBetween = (startDate, endDate) => {
      const msPerDay = 1000 * 60 * 60 * 24;
      return Math.floor((endDate - startDate) / msPerDay);
    };
  
    const startDate = new Date(goal.startDate);
    const currentDate = new Date();
    const durationInDays = goal.duration * 30; // Assume each month is 30 days
  
    // If there's no last check-in, assume it's the current date for progress calculation
    const lastCheckInDate = goal.last_check_in ? new Date(goal.last_check_in) : currentDate;
  
    // Calculate the elapsed time in days
    const elapsedTimeInDays = calculateDaysBetween(new Date(goal.startDate), lastCheckInDate);
  
    // Calculate progress as percentage (between 0 and 100)
    const progress = Math.min((elapsedTimeInDays / durationInDays) * 100, 100);
  
    // Dark colors for the status
    const statusColors = {
      active: { bg: "bg-green-900", text: "text-white" },    // Dark Green
      completed: { bg: "bg-blue-700", text: "text-white" },  // Dark Blue
      failed: { bg: "bg-red-800", text: "text-white" },      // Dark Red
    };
  
    const statusClass = statusColors[goal.status] || { bg: "bg-gray-700", text: "text-white" }; // Default to dark gray
  
    return (
      <div onClick={()=>console.log(goal.id)}className="p-4 bg-slate-900 border border-slate-950 shadow-md rounded-sm hover:bg-slate-800 transition">
        <h3 className="text-lg font-semibold text-white">{goal.title}</h3>
        <p className="text-gray-300 text-sm">{goal.duration} months</p>
  
        <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
          <span>
            Last check-in: {goal.last_check_in ? new Date(goal.last_check_in).toLocaleDateString() : "No check-ins yet"}
          </span>
          
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
          
          <span className={`px-2 py-0.5 rounded ${statusClass.bg} ${statusClass.text}`}>{goal.status}</span>
        </div>
  
        {/* Progress Bar */}
        <div className="mt-1">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="font-semibold text-xs text-white">Progress</span>
              </div>
              <div>
                <span className="text-xs text-gray-400">{Math.round(progress)}%</span>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-green-900 h-1.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default GoalCard;
  