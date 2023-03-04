import { differenceInDays, startOfToday } from "date-fns";
import { X } from "react-feather";

function HabitStats({ habit, toggleStats }) {
  const daysSinceCreationOfHabit = differenceInDays(
    new Date(habit.createdDate),
    startOfToday()
  );

  const value = (habit.totalStreakCount / daysSinceCreationOfHabit) * 100;

  return (
    <div className=" fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 ">
      <div className="p-8 absolute space-y-8 top-0 right-0 w-[30%] bg-white rounded-md z-50 h-full ">
        <div className="flex justify-between">
          <h1 className=" text-2xl ">Statistics</h1>
          <X onClick={toggleStats} className=" cursor-pointer " />
        </div>
        <div className="my-4">
          <p>Habit Score</p>
          <h1 className=" font-semibold text-2xl ">{value}%</h1>
        </div>
        <div className="my-4">
          <p>Streak</p>
          <div className="flex justify-between my-2">
            <div>
              <p>Current</p>
              <h1 className=" font-semibold text-2xl ">
                {habit.currentStreakCount} Days
              </h1>
            </div>
            <div>
              <p>Best</p>
              <h1 className=" font-semibold text-2xl ">
                {habit.bestStreakCount} Days
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HabitStats;
