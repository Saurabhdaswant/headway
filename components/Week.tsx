"use client";

import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { format, addDays, startOfWeek, subWeeks, addWeeks } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { HabitsContext } from "../Providers/HabitsProvider";
import { cn } from "../utils/cn";
import { getFormattedDates } from "../utils/utils";

const WeekButton = ({ date, habit, setCurrHabit }) => {
  const { toggleHabitCompletion }: any = useContext(HabitsContext);

  const [isCompleted, setIsCompleted] = useState(false);
  const formattedDate = format(date, "yy-MM-dd");
  const formattedCompletedOnDates = getFormattedDates(habit?.completedOnDates);

  useEffect(() => {
    if (formattedCompletedOnDates?.includes(formattedDate)) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  }, [formattedCompletedOnDates, formattedDate]);
  return (
    <button
      key={date.toISOString()}
      onClick={() => {
        toggleHabitCompletion(habit, date, isCompleted, setCurrHabit);
      }}
      className={cn(
        "w-10 h-10 rounded-lg mx-auto transition-colors",
        isCompleted ? "bg-[#27b562ef]" : "bg-gray-200",
        "hover:opacity-90"
      )}
    />
  );
};

const HabitDays = ({ habit, weekDays }) => {
  const [currHabit, setCurrHabit] = useState({ ...habit });

  return (
    <React.Fragment key={currHabit._id}>
      <div className="flex items-center gap-2 text-base text-[#2e2e2e]">
        {/* <span className="text-gray-500">{currHabit.icon}</span> */}
        <span className="font-semibold">{currHabit.name}</span>
      </div>
      {weekDays.map((date) => (
        <WeekButton
          key={date.toISOString()}
          date={date}
          habit={currHabit}
          setCurrHabit={setCurrHabit}
        />
      ))}
    </React.Fragment>
  );
};

export default function Week() {
  const { habits }: any = useContext(HabitsContext);

  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    return startOfWeek(new Date(), { weekStartsOn: 1 });
  });

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i)
  );

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
    <div className="bg-white mt-8 rounded-xl  p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <button onClick={goToPreviousWeek}>
            <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
          </button>
          <button onClick={goToNextWeek}>
            <ChevronRightIcon className="h-5 w-5 text-gray-700" />
          </button>
          <button
            className="text-blue-600 font-medium"
            onClick={goToCurrentWeek}
          >
            Today
          </button>
        </div>
        <div className="font-semibold text-lg text-gray-900">
          {format(currentWeekStart, "MMM d")} -{" "}
          {format(addDays(currentWeekStart, 6), "MMM d, yyyy")}
        </div>
      </div>

      <div className="grid grid-cols-[auto_repeat(7,1fr)] gap-5 items-center">
        <div className="font-semibold text-gray-900"></div>
        {weekDays.map((date) => (
          <div key={date.toISOString()} className="text-center space-y-2">
            <div className="text-xs capitalize text-gray-400">
              {format(date, "EEE")}
            </div>
            <div className="font-bold text-lg text-gray-600">
              {format(date, "d")}
            </div>
          </div>
        ))}

        {habits &&
          habits?.map((habit) => (
            <HabitDays key={habit._id} habit={habit} weekDays={weekDays} />
          ))}
      </div>
    </div>
  );
}
