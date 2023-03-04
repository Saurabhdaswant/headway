import { differenceInDays, startOfToday } from "date-fns";
import { X } from "react-feather";

function HabitStats({ streakCount, createdDate, toggleStats }) {
  const daysSinceCreationOfHabit = differenceInDays(
    startOfToday(),
    new Date(createdDate)
  );

  const value = Math.floor((streakCount / daysSinceCreationOfHabit) * 100);

  return (
    <div className=" fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 ">
      <div className="p-8 absolute space-y-8 top-0 right-0 w-[30%] bg-white rounded-md z-50 h-full ">
        <div className="flex justify-between">
          <h1 className=" text-2xl ">{value}%</h1>
          <X onClick={toggleStats} className=" cursor-pointer " />
        </div>
      </div>
    </div>
  );
}

export default HabitStats;
