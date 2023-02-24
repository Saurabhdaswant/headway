import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { Check, Edit, Trash2 } from "react-feather";
import useToggle from "../hooks/useToggle";
import { HabitsContext } from "../Providers/HabitsProvider";
import DeleteHabit from "./DeleteHabit";
import HabitForm from "./HabitForm";

function Habit({ habit, currDate }) {
  const [showHabitEditOptions, toggleHabitEditOptions] = useToggle(false);
  const [showHabitForm, toggleHabitForm] = useToggle(false);
  const [showDeleteDialog, toggleDeleteDialog] = useToggle(false);
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

  const handleClick = () => {
    const idx = habits?.findIndex((h) => h.name === habit.name);
    habits[idx].isCompleted = !habits[idx].isCompleted;

    if (habit.isCompleted !== false) {
      habits[idx].checkedOfForDates = [
        ...habit.checkedOfForDates,
        formatedDate,
      ];
    } else {
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
    <div className="flex items-center gap-4 justify-between">
      <div
        onClick={handleClick}
        className={` cursor-pointer border-4 grid place-items-center bg-white ${
          habit.isCompleted
            ? "border-[#27B563]  text-[#27B563]"
            : " text-gray-200"
        } w-full max-w-[56px] min-h-[56px] rounded-full shadow-lg  `}
      >
        <Check className="  w-8 h-8  stroke-3" />
      </div>
      <div
        onMouseEnter={toggleHabitEditOptions}
        onMouseLeave={toggleHabitEditOptions}
        className={`p-2 h-14 w-full  flex justify-between items-center  font-bold my-2 lg:my-4 text-[#2e2e2e]   border-l-4 border-${habit.color} bg-white   `}
      >
        <p> {habit.name}</p>
        {showHabitEditOptions && (
          <div className="flex gap-4  w-14">
            <Edit onClick={toggleHabitForm} className="hover:cursor-pointer" />
            <Trash2
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
    </div>
  );
}

export default Habit;
