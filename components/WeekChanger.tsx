import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React from "react";
import { format, addDays, startOfWeek, subWeeks, addWeeks } from "date-fns";

export default function WeekChanger({ currentWeekStart, setCurrentWeekStart }) {
  const goToPreviousWeek = () => {
    setCurrentWeekStart((prev) => subWeeks(prev, 1));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart((prev) => addWeeks(prev, 1));
  };

  const goToCurrentWeek = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  return (
    <div className="flex justify-between gap-4 text-3xl items-center ">
      <div className="flex items-center gap-3">
        <button onClick={goToPreviousWeek}>
          <ChevronLeftIcon className="h-8 w-8 text-gray-700" />
        </button>
        <button onClick={goToNextWeek}>
          <ChevronRightIcon className="h-8 w-8 text-gray-700" />
        </button>
        {/* <button className="text-blue-600 font-medium" onClick={goToCurrentWeek}>
          Today
        </button> */}
      </div>
      <div className="font-semibold  text-gray-900">
        {format(currentWeekStart, "MMM d")} -{" "}
        {format(addDays(currentWeekStart, 6), "MMM d, yyyy")}
      </div>
    </div>
  );
}
