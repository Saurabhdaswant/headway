import {
  ChartBarIcon,
  ChartSquareBarIcon,
  PencilAltIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { differenceInDays, format, isToday, startOfToday } from "date-fns";
import React, { useContext, useState } from "react";
import { Check, Edit, Trash2 } from "react-feather";
import useToggle from "../hooks/useToggle";
import { HabitsContext } from "../Providers/HabitsProvider";
import DeleteHabit from "./DeleteHabit";
import HabitForm from "./HabitForm";
import HabitStats from "./HabitStats";

function Habit({ habit, currDate }) {
  const [showHabitEditOptions, toggleHabitEditOptions] = useToggle(false);
  const [showHabitForm, toggleHabitForm] = useToggle(false);
  const [showDeleteDialog, toggleDeleteDialog] = useToggle(false);
  const [showStats, toggleStats] = useToggle(false);
  const [error, setError] = useState(false);

  const formatedDate = format(currDate, "yy-MM-dd ");
  const { habits, setHabits } = useContext(HabitsContext);

  if (habit.checkedOfForDates?.includes(formatedDate)) {
    habit.isCompleted = true;
  } else {
    habit.isCompleted = false;
  }

  const handleEditHabit = (currHabit) => {
    if (currHabit.name.trim().length === 0) {
      setError(true);
      return;
    } else {
      setError(false);
      const habitIndex = habits.findIndex(
        (habit, _) => habit.id === currHabit.id
      );
      habits[habitIndex] = currHabit;
      if (typeof window !== "undefined") {
        localStorage.setItem("Habits", JSON.stringify([...habits]));
      }
      setHabits([...habits]);
      toggleHabitForm();
    }
  };

  const handleCheck = () => {
    const idx = habits?.findIndex((h) => h.id === habit.id);
    habits[idx].isCompleted = !habits[idx].isCompleted;

    if (habit.isCompleted) {
      habit.totalStreakCount = habit.totalStreakCount + 1;
      const diff = differenceInDays(
        startOfToday(),
        new Date(habit.lastCheckedOffDate)
      );

      console.log(diff);

      if (diff === 0) {
        console.log("no gap");
      } else if (diff === 1) {
        console.log("increment");
        habit.currentStreakCount = habit.currentStreakCount + 1;
        if (habit.currentStreakCount >= habit.bestStreakCount) {
          habit.bestStreakCount = habit.currentStreakCount;
        }
      } else {
        console.log("broke the streak");
        habit.currentStreakCount = 0;
      }

      habit.lastCheckedOffDate = startOfToday();

      habits[idx].checkedOfForDates = [
        ...habit.checkedOfForDates,
        formatedDate,
      ];
    } else {
      habit.totalStreakCount = habit.totalStreakCount - 1;
      const filtered = habit.checkedOfForDates.filter(
        (date, _) => date !== formatedDate
      );
      habits[idx].checkedOfForDates = filtered;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("Habits", JSON.stringify([...habits]));
    }
    setHabits([...habits]);
  };

  return (
    <div className="flex items-center justify-between">
      <div
        onClick={handleCheck}
        className={` cursor-pointer border-4 grid place-items-center bg-white ${
          habit.isCompleted
            ? "border-[#27B563]  text-[#27B563]"
            : " text-gray-200"
        } w-14 h-14 rounded-full shadow-lg  `}
      >
        <Check className="  w-8 h-8  stroke-3" />
      </div>
      <div
        onMouseEnter={toggleHabitEditOptions}
        onMouseLeave={toggleHabitEditOptions}
        className={`p-2 h-14 w-[85%] flex justify-between items-center  font-bold my-4 text-[#2e2e2e]   border-l-4 border-${habit.color} bg-white   `}
      >
        <p> {habit.name}</p>
        {showHabitEditOptions && (
          <div className="flex  gap-4 w-24">
            <ChartSquareBarIcon
              onClick={toggleStats}
              className="hover:cursor-pointer"
            />
            <PencilAltIcon
              onClick={toggleHabitForm}
              className="hover:cursor-pointer"
            />
            <TrashIcon
              onClick={toggleDeleteDialog}
              className="hover:cursor-pointer"
            />
          </div>
        )}
      </div>
      {showHabitForm && (
        <HabitForm
          formTitle="Edit Habit"
          habit={habit}
          toggleHabitForm={toggleHabitForm}
          handleSubmit={handleEditHabit}
          error={error}
        />
      )}
      {showDeleteDialog && (
        <DeleteHabit
          habits={habits}
          setHabits={setHabits}
          habitId={habit.id}
          toggleDeleteDialog={toggleDeleteDialog}
        />
      )}
      {showStats && <HabitStats habit={habit} toggleStats={toggleStats} />}
    </div>
  );
}

export default Habit;
