import { useState } from "react";
import GoalCard from "./GoalCard";

const Goals = () => {
  // Fake goal function returning two goals
  const getFakeGoals = () => {
    return [
      {
        id: "1",
        title: "Read 10 pages a day",
        duration: 3,
        startDate: "2024-01-04T08:30:00Z",
        last_check_in: "2024-02-04T08:30:00Z",
        status: "active",
      },
      {
        id: "2",
        title: "Exercise for 30 minutes daily",
        duration: 6,
        startDate: "2023-12-01T08:30:00Z",
        last_check_in: "2024-02-05T08:30:00Z",
        status: "completed",
      }
    ];
  };

  // Store the fake goals in state
  const [goals] = useState(getFakeGoals());

  return (
    <div className="min-h-screen  text-white py-10 px-6 sm:px-8">
      {/* Title Section */}
      <h2 className="text-3xl font-bold text-center mb-8">Your Goals</h2>

      {/* Goal Cards Section */}
      <div className="flex flex-wrap justify-center gap-6">
        {goals.length > 0 ? (
          goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">No goals yet.</p>
        )}
      </div>
    </div>
  );
};

export default Goals;
