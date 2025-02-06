const GoalCard = ({ goal }) => {
    return (
      <div className="p-4 bg-slate-800 border border-slate-700 shadow-md">
        <h3 className="text-xl font-semibold">{goal.title}</h3>
        <p className="text-gray-400">Duration: {goal.duration} months</p>
        <p className="text-gray-400">Status: {goal.status}</p>
        <p className="text-gray-500 text-sm">
          Last check-in: {new Date(goal.last_check_in).toLocaleDateString()}
        </p>
      </div>
    );
  };
  
  export default GoalCard; // ✅ Make sure this line is present
  