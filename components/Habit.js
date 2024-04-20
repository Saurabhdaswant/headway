import {
  ChartSquareBarIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Check } from "react-feather";
import useToggle from "../hooks/useToggle";
import { HabitsContext } from "../Providers/HabitsProvider";
import { getFormattedDates } from "../utils/utils";
import DeleteHabit from "./DeleteHabit";
import HabitForm from "./HabitForm";
import HabitStats from "./HabitStats";
import { API_ENDPOINTS } from "../constants";

function Habit({ habit, currDate }) {
  const { habits, updateHabits } = useContext(HabitsContext);
  const [currHabit, setCurrHabit] = useState({ ...habit });
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHabitForm, setShowHabitForm] = useState(false);
  const [showDeleteDialog, toggleDeleteDialog] = useToggle(false);
  const [showStats, toggleStats] = useToggle(false);
  const [error, setError] = useState(false);

  const formattedDate = format(currDate, "yy-MM-dd");
  const formattedCompletedOnDates = getFormattedDates(
    currHabit?.completedOnDates
  );

  useEffect(() => {
    if (formattedCompletedOnDates?.includes(formattedDate)) {
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

  const handleEditHabit = async (currHabit) => {
    if (currHabit.name.trim().length === 0) {
      setError(true);
      return;
    } else {
      const res = await fetch(
        `${API_ENDPOINTS.BASE_URL}/habits/${currHabit._id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            updatedHabit: currHabit,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = await res.json();

      if (json.acknowledged) {
        setError(false);
        const habitIndex = habits.findIndex(
          (habit, _) => habit._id === currHabit._id
        );

        setCurrHabit(currHabit);
        habits[habitIndex] = currHabit;
        updateHabits([...habits]);
        setShowHabitForm(false);
      }
    }
  };

  const toggleHabitCompletion = async () => {
    const habitIndex = habits?.findIndex(
      (habit) => habit._id === currHabit._id
    );

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
      completedOnDates.push(currDate.toISOString());
    }

    const updatedHabit = {
      ...currentHabit,
      completedOnDates,
    };

    const res = await fetch(
      `${API_ENDPOINTS.BASE_URL}/habits/${updatedHabit._id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          updatedHabit,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await res.json();

    if (json.acknowledged) {
      newHabits[habitIndex] = updatedHabit;

      setCurrHabit(updatedHabit);
      updateHabits(newHabits);
    }
  };

  return (
    <div className="flex items-center justify-between ">
      {/* <div
        onClick={() => toggleHabitCompletion()}
        className={` cursor-pointer border-4 grid place-items-center bg-white ${
          isCompleted ? "border-[#27B563]  text-[#27B563]" : " text-gray-200"
        } w-14 h-14 rounded-full shadow-lg   `}
      >
        <Check className="  w-8 h-8  stroke-3" />
      </div> */}
      <div
        className={` group  rounded-2xl  w-full md:max-w-[65%] mx-auto flex justify-between items-center   my-2 text-[#2e2e2e]  bg-white  border border-slate-100`}
      >
        <div className="space-y-3  py-3  w-full ">
          <div className=" flex items-center justify-between border-b px-3 border-gray-100">
            <p className=" font-semibold  pb-3   "> {habit.name}</p>
            <div
              onClick={() => toggleHabitCompletion()}
              className={` cursor-pointer border-2  grid place-items-center bg-white ${
                isCompleted
                  ? " border-[#27b562ef] bg-[#27b562bb]  text-white"
                  : " text-gray-200"
              } w-8 h-8 rounded-full shadow-lg -mt-2   `}
            >
              <Check className="  w-4 h-4  stroke-3" />
            </div>
          </div>
          <div className="flex justify-between items-center pr-3">
            <p
              className={`text-xs px-2.5 py-1 mx-3 font-medium  capitalize inline-block   rounded-full  ${
                habit.getDoneIn === "evening" &&
                " bg-purple-100 text-purple-400"
              } ${
                habit.getDoneIn === "anytime" && "bg-gray-100  text-gray-400"
              } 
              ${
                habit.getDoneIn === "morning" && "bg-orange-100 text-orange-400"
              } `}
            >
              {habit.getDoneIn}
            </p>
            <div className="flex opacity-0 group-hover:opacity-100  gap-4 w-24">
              <PencilAltIcon
                onClick={() => setShowHabitForm(true)}
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
          </div>
        </div>
      </div>
      {showHabitForm && (
        <HabitForm
          formTitle="Edit Habit"
          habit={currHabit}
          setShowHabitForm={setShowHabitForm}
          handleSubmit={handleEditHabit}
          error={error}
        />
      )}
      {showDeleteDialog && (
        <DeleteHabit
          habitId={currHabit._id}
          toggleDeleteDialog={toggleDeleteDialog}
        />
      )}
      {showStats && <HabitStats habit={currHabit} toggleStats={toggleStats} />}
    </div>
  );
}

export default Habit;
