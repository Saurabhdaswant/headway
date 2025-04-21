"use client";

import { addDays, format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { HabitsContext } from "../Providers/HabitsProvider";
import { cn } from "../utils/cn";
import { getFormattedDates } from "../utils/utils";

import { motion } from "framer-motion";

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
    <motion.button
      whileTap={{ scale: 0.9, transition: { duration: 0.1, bounce: 0 } }}
      whileHover={{ scale: 1.1, transition: { duration: 0.1, bounce: 0 } }}
      key={date.toISOString()}
      onClick={() => {
        toggleHabitCompletion(habit, date, isCompleted, setCurrHabit);
      }}
      className={cn(
        "w-10 h-10  my-2 rounded-lg mx-auto ",
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

export default function Week({ currentWeekStart }) {
  const { habits }: any = useContext(HabitsContext);

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i)
  );

  return (
    <div className="bg-white mt-8 rounded-xl shadow-sm  p-8">
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
