import React, { useState } from "react";
import { X } from "react-feather";
import useToggle from "../hooks/useToggle";
import { CalendarIcon } from "@heroicons/react/outline";

import { AnimatePresence, motion } from "framer-motion";
import Calendar from "./Calendar";

function GoalForm({ formTitle, goal, setShowHabitForm, handleSubmit, error }) {
  const [currGoal, setCurrGoal] = useState(goal);
  const [showCalendar, toggleCalendar] = useToggle(false);

  console.log(currGoal, "what the fuck ?");

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: "spring",
          bounce: 0,
          duration: 0.6,
        }}
        onClick={() => setShowHabitForm(false)}
        className=" fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 "
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{
          type: "spring",
          bounce: 0,
          duration: 0.6,
        }}
        className=" p-4  lg:p-8 absolute space-y-4 lg:space-y-8 top-0 right-0 w-full max-w-[450px] bg-white rounded-md z-50 h-full "
      >
        <div className="flex justify-between">
          <h1 className=" text-2xl ">{formTitle}</h1>
          <X
            onClick={() => setShowHabitForm(false)}
            className=" cursor-pointer "
          />
        </div>
        <div className=" flex flex-col">
          <div className=" space-y-4  lg:space-y-8 overflow-scroll scrollbar-hide h-[70vh] ">
            <div className="flex flex-col  lg:space-y-2">
              <label htmlFor="goalTitle" className="font-semibold pb-2">
                Goal Name
              </label>
              <input
                onChange={(e) =>
                  setCurrGoal({
                    ...currGoal,
                    name: e.target.value,
                  })
                }
                value={currGoal.name}
                name="goalTitle"
                id="goalTitle"
                className={`
							outline-none focus:border-[#0F85F2]  font-medium 
							border-2    px-4 py-2 rounded ${
                currGoal.name?.length > 0 && error
                  ? "border-zinc-200"
                  : error
                  ? "border-red-500"
                  : null
              }`}
              />
            </div>

            <div className="flex flex-col  lg:space-y-2">
              <label htmlFor="goalDescription" className="font-semibold pb-2">
                Why ? Behind this Goal
              </label>
              <input
                onChange={(e) =>
                  setCurrGoal({
                    ...currGoal,
                    description: e.target.value,
                  })
                }
                value={currGoal.description}
                name="goalDescription"
                id="goalDescription"
                className={`
							outline-none focus:border-[#0F85F2]  font-medium 
							border-2    px-4 py-2 rounded ${
                currGoal.description?.length > 0 && error
                  ? "border-zinc-200"
                  : error
                  ? "border-red-500"
                  : null
              }`}
              />
            </div>

            <div className="relative">
              <button
                className="p-3 bg-white rounded-full   text-gray-600 "
                onClick={() => toggleCalendar()}
              >
                <CalendarIcon className=" w-6" />
              </button>
              <div className=" absolute  mt-3  ">
                <AnimatePresence>
                  {showCalendar && (
                    <Calendar
                      currDate={currGoal.deadlineDate}
                      setCurrDate={(date) =>
                        setCurrGoal({
                          ...currGoal,
                          deadlineDate: date,
                        })
                      }
                      toggleCalendar={() => toggleCalendar()}
                      canSelectDaysAfterToday
                      isThisCalendarRenderedInGoalsPage
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleSubmit(currGoal)}
            type="submit"
            className=" w-full my-8 font-semibold  bg-[#2e2e2e] hover:bg-[#2e2e2eed] text-white px-14 rounded py-4 "
          >
            {formTitle}
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default GoalForm;
