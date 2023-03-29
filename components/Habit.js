import {
  ChartSquareBarIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  differenceInDays,
  format,
  isToday,
  isWithinInterval,
  startOfToday,
} from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Check } from "react-feather";
import useToggle from "../hooks/useToggle";
import { HabitsContext } from "../Providers/HabitsProvider";
import { getFormattedDates } from "../utils/utils";
import DeleteHabit from "./DeleteHabit";
import HabitForm from "./HabitForm";
import HabitStats from "./HabitStats";

function Habit({ habit, currDate }) {
  const { habits, updateHabits } = useContext(HabitsContext);
  const [currHabit, setCurrHabit] = useState({ ...habit });
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHabitForm, toggleHabitForm] = useToggle(false);
  const [showDeleteDialog, toggleDeleteDialog] = useToggle(false);
  const [showStats, toggleStats] = useToggle(false);
  const [showHabitEditOptions, toggleHabitEditOptions] = useToggle(false);
  const [error, setError] = useState(false);

  const formattedDate = format(currDate, "yy-MM-dd");
  const formattedCompletedOnDates = getFormattedDates(
    currHabit?.completedOnDates
  );
  useEffect(() => {
    if (formattedCompletedOnDates.includes(formattedDate)) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  }, [formattedCompletedOnDates, formattedDate]);

  // this will always set to false and wont work when we update form the
  // onClick function because onClick it will re-render and on every-render
  // we are setting the value based on the habit provided

  // to fix that we are updateing the array of dates itself so on re-render
  // the list has the current date which will then toggle the value to true!

  // now if the isCompleted is already true then we remove the date from the
  // list which will then toggle the value to false

  // every thing is working as it supossed to work 👏🏽

  const handleEditHabit = (currHabit) => {
    if (currHabit.name.trim().length === 0) {
      setError(true);
      return;
    } else {
      setError(false);
      const habitIndex = habits.findIndex(
        (habit, _) => habit.id === currHabit.id
      );

      setCurrHabit(currHabit);
      habits[habitIndex] = currHabit;
      updateHabits([...habits]);
      toggleHabitForm();
    }
  };

  const toggleHabitCompletion = () => {
    const habitIndex = habits?.findIndex((habit) => habit.id === currHabit.id);

    if (habitIndex === -1) {
      return;
    }

    const newHabits = [...habits];
    const currentHabit = newHabits[habitIndex];
    const completedOnDates = [...currHabit.completedOnDates];
    const dateIndex = completedOnDates.findIndex(
      (dateStr) => new Date(dateStr).getTime() === currDate.getTime()
    );

    if (isCompleted && dateIndex !== -1) {
      completedOnDates.splice(dateIndex, 1);
    } else {
      completedOnDates.push(currDate);
    }

    const updatedHabit = {
      ...currentHabit,
      completedOnDates,
    };
    newHabits[habitIndex] = updatedHabit;

    setCurrHabit(updatedHabit);
    updateHabits(newHabits);
  };

  return (
    <div className="flex items-center justify-between ">
      <div
        onClick={() => toggleHabitCompletion()}
        className={` cursor-pointer border-4 grid place-items-center bg-white ${
          isCompleted ? "border-[#27B563]  text-[#27B563]" : " text-gray-200"
        } w-14 h-14 rounded-full shadow-lg   `}
      >
        <Check className="  w-8 h-8  stroke-3" />
      </div>
      <div
        onMouseEnter={toggleHabitEditOptions}
        onMouseLeave={toggleHabitEditOptions}
        className={`p-2 h-14 w-[85%] flex justify-between items-center  font-bold my-2 text-[#2e2e2e]   border-l-4 border-${habit.color} bg-white   `}
      >
        <p> {habit.name}</p>
        {showHabitEditOptions && (
          <div className="flex  gap-4 w-24">
            <PencilAltIcon
              onClick={toggleHabitForm}
              className="hover:cursor-pointer"
            />
            <ChartSquareBarIcon
              onClick={toggleStats}
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
          habit={currHabit}
          toggleHabitForm={toggleHabitForm}
          handleSubmit={handleEditHabit}
          error={error}
        />
      )}
      {showDeleteDialog && (
        <DeleteHabit
          habits={habits}
          updateHabits={updateHabits}
          habitId={currHabit.id}
          toggleDeleteDialog={toggleDeleteDialog}
        />
      )}
      {showStats && <HabitStats habit={currHabit} toggleStats={toggleStats} />}
    </div>
  );
}

export default Habit;
