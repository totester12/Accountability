import { useState } from "react";
import GoalCard from "./GoalCard";

const Goals = () => {
  // Fake goal function
  const getFakeGoal = () => {
    return {
      id: "1",
      title: "Read 10 pages a day",
      duration: 3,
      last_check_in: "2024-02-04T08:30:00Z",
      status: "active",
    };
  };

  // Store the fake goal in state
  const [goals] = useState([getFakeGoal()]);

  return (
    <div className="flex min-h-screen items-center justify-center text-white">
      <div className="w-full max-w-md p-6 space-y-4 bg-slate-900 shadow-lg border border-slate-800">
        <h2 className="text-2xl font-bold text-center">Your Goals</h2>
        
        {goals.length > 0 ? (
          goals.map((goal) => <GoalCard key={goal.id} goal={goal} />)
        ) : (
          <p className="text-center text-gray-400">No goals yet.</p>
        )}
      </div>
    </div>
  );
};

export default Goals;
