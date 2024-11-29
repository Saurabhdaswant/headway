import React, { useContext } from "react";
import { Clipboard } from "react-feather";
import Habit from "./Habit";
import {
  getDay,
  isAfter,
  isBefore,
  isSameDay,
  isToday,
  startOfToday,
} from "date-fns";
import days from "../Data/Days";
import { HabitsContext } from "../Providers/HabitsProvider";
import { AnimatePresence } from "framer-motion";

const NoHabits = ({ children }) => {
  return (
    <div className=" flex flex-col gap-4 items-center ">
      <Clipboard className="w-20 h-20" />
      <p className=" text-gray-400 w-full text-center">{children}</p>
    </div>
  );
};

export function Habits({ habits, selectedDay, selectedTimeOfDay = "anytime" }) {
  const currentDay = days[getDay(selectedDay)];
  const anyTimeOfDay = selectedTimeOfDay === "anytime";

  const isAfterCreation = (habit) =>
    isSameDay(selectedDay, new Date(habit.createdDate)) ||
    isToday(selectedDay) ||
    isAfter(selectedDay, new Date(habit.createdDate));

  const isRepeatDay = (habit) => habit.repeatHabitDays?.includes(currentDay);

  const matchesSelectedTimeOfDay = (habit) =>
    habit.getDoneIn === selectedTimeOfDay;

  let filteredHabits =
    habits &&
    habits.length > 0 &&
    habits
      ?.filter((habit) => !habit.hide)
      ?.filter(isAfterCreation)
      ?.filter(isRepeatDay);

  if (!anyTimeOfDay) {
    filteredHabits = filteredHabits?.filter(matchesSelectedTimeOfDay);
  }

  if (
    !filteredHabits ||
    filteredHabits.length === 0 ||
    isAfter(selectedDay, startOfToday())
  ) {
    return <NoHabits>No Habits Found!</NoHabits>;
  }

  return (
    <AnimatePresence initial={false}>
      {filteredHabits?.map((habit, _) => {
        return <Habit key={habit._id} habit={habit} currDate={selectedDay} />;
      })}
    </AnimatePresence>
  );
}
