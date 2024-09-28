import {
  ChartSquareBarIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Check, X } from "react-feather";
import useToggle from "../hooks/useToggle";
import { HabitsContext } from "../Providers/HabitsProvider";
import { getFormattedDates } from "../utils/utils";
import DeleteHabit from "./DeleteHabit";
import HabitForm from "./HabitForm";
import HabitStats from "./HabitStats";
import { API_ENDPOINTS } from "../constants";
import { TokenContext } from "../Providers/TokenProvider";
import { AnimatePresence, motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/Tooltip";
import HabitWhy from "./HabitWhy";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";

function Habit({ habit, currDate }) {
  const { habits, updateHabits } = useContext(HabitsContext);
  const { token }: any = useContext(TokenContext);

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
            Authorization: `Bearer ${token}`,
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

    // newHabits[habitIndex] = updatedHabit;

    // setCurrHabit(updatedHabit);
    // updateHabits(newHabits);

    const res = await fetch(
      `${API_ENDPOINTS.BASE_URL}/habits/${updatedHabit._id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          updatedHabit,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  const [isPressing, press] = useToggle(false);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <motion.div
        // initial={{
        //   y: 100,
        //   opacity: 0,
        // }}
        // animate={{
        //   y: 0,
        //   opacity: 1,
        // }}
        whileTap={isPressing ? "onPress" : "_"}
        transition={{
          type: "spring",
        }}
        variants={{
          onPress: {
            scale: 0.91,
          },
        }}
        className={` group   rounded-2xl   flex justify-between items-center w-full max-w-[400px]   my-2 text-[#2e2e2e]  bg-white  border border-slate-100`}
      >
        <div className="space-y-3  py-3  w-full ">
          <div className=" flex items-center justify-between border-b px-3 border-gray-100">
            <p className=" font-semibold  pb-3   "> {currHabit.name}</p>
            <div className="flex items-center gap-2">
              <div
                onMouseDown={() => press()}
                onMouseUp={() => press()}
                onClick={() => toggleHabitCompletion()}
                onTouchStart={() => {
                  press();
                  toggleHabitCompletion();
                }}
                onTouchEnd={() => {
                  press();
                }}
                className={` cursor-pointer border-2  grid place-items-center bg-white ${
                  isCompleted
                    ? " border-[#27b562ef]  text-[#27b562ef]"
                    : " text-gray-200"
                } w-8 h-8 rounded-full shadow-lg -mt-2 transition-colors `}
              >
                <Check className="  w-4 h-4  stroke-3" />
              </div>
              {habit?.why && (
                <button
                  className="text-xs w-8 -mt-2 h-8 font-medium capitalize inline-block rounded-full bg-blue-100 text-blue-400"
                  onClick={() => setShowDialog(true)}
                >
                  <QuestionMarkCircleIcon />
                </button>
              )}
              {showDialog && (
                <HabitWhy
                  why={habit.why}
                  name={habit.name}
                  setShowDialog={setShowDialog}
                />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pr-3">
            <div className="flex items-center ml-3 gap-2">
              <p
                className={`text-xs px-2.5 py-1  font-medium  capitalize inline-block   rounded-full  ${
                  currHabit.getDoneIn === "evening" &&
                  " bg-pink-100 text-pink-400"
                } ${
                  currHabit.getDoneIn === "anytime" &&
                  "bg-gray-100  text-gray-400"
                } 
              ${
                currHabit.getDoneIn === "morning" &&
                "bg-orange-100 text-orange-400"
              } ${
                  currHabit.getDoneIn === "afternoon" &&
                  "bg-violet-100 text-violet-400"
                }  `}
              >
                {currHabit.getDoneIn}
              </p>

              {/* <p className="text-xs px-2.5 py-1 font-medium capitalize inline-block rounded-full bg-green-100 text-green-400">
                2 mins
              </p> */}
            </div>
            <div className="flex md:hidden   gap-4 w-24">
              <PencilAltIcon
                className="w-6 h-6"
                onClick={() => setShowHabitForm(true)}
              />
              <ChartSquareBarIcon className="w-6 h-6" onClick={toggleStats} />
              <TrashIcon
                className="w-6 h-6"
                onClick={toggleDeleteDialog}
              />{" "}
            </div>
            <div className=" hidden md:flex opacity-0 md:group-hover:opacity-100  gap-4 w-24">
              <PencilAltIcon
                onClick={() => setShowHabitForm(true)}
                className="hover:cursor-pointer "
              />
              <ChartSquareBarIcon
                onClick={toggleStats}
                className="hover:cursor-pointer "
              />
              <TrashIcon
                onClick={toggleDeleteDialog}
                className="hover:cursor-pointer "
              />
            </div>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showHabitForm && (
          <HabitForm
            formTitle="Edit Habit"
            habit={currHabit}
            setShowHabitForm={setShowHabitForm}
            handleSubmit={handleEditHabit}
            error={error}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showDeleteDialog && (
          <DeleteHabit
            habitId={currHabit._id}
            toggleDeleteDialog={toggleDeleteDialog}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showStats && (
          <HabitStats habit={currHabit} toggleStats={toggleStats} />
        )}
      </AnimatePresence>
    </>
  );
}

export default Habit;
