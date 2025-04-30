import React, { useState } from "react";
import { X } from "react-feather";
import { filterDatesByWeekdays } from "../utils/utils";
import { arraysHaveSameStrings, colors, doitat, weekDays } from "./constants";
import useToggle from "../hooks/useToggle";

import { motion } from "framer-motion";

function HabitForm({
  formTitle,
  habit,
  setShowHabitForm,
  handleSubmit,
  error,
}) {
  const [currHabit, setCurrHabit] = useState(habit);
  const [showDialog, toggleDialog] = useToggle(false);

  const addDayIntoRepeatHabitDaysList = (day) => {
    if (currHabit.repeatHabitDays.includes(day)) {
      const newRepeatedHabitDays = currHabit.repeatHabitDays.filter(
        (d) => d !== day
      );

      const newCompletedOnDates = filterDatesByWeekdays(
        currHabit.completedOnDates,
        newRepeatedHabitDays
      );

      setCurrHabit({
        ...currHabit,
        repeatHabitDays: [...new Set(newRepeatedHabitDays)],
        completedOnDates: newCompletedOnDates,
      });
      return;
    }

    const newRepeatedHabitDays = [...currHabit.repeatHabitDays, day];
    const newCompletedOnDates = filterDatesByWeekdays(
      currHabit.completedOnDates,
      newRepeatedHabitDays
    );

    setCurrHabit({
      ...currHabit,
      repeatHabitDays: [...new Set(newRepeatedHabitDays)],
      completedOnDates: newCompletedOnDates,
    });
  };

  const updateEndDate = (date) => {
    setCurrHabit({
      ...currHabit,
      endDate: date,
    });
  };

  const closeDialog = () => {
    setShowHabitForm(false);

    const params = new URLSearchParams(window.location.search);
    params.set("showAddNewHabitForm", "false");
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  };

  return (
    <>
      {/* Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: "spring",
          bounce: 0,
          duration: 0.6,
        }}
        onClick={() => closeDialog()}
        className=" fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 "
      />
      {/* Sheet  */}
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
          <motion.div
            whileTap={{
              scale: 0.8,
            }}
          >
            <X onClick={() => closeDialog()} className=" cursor-pointer " />
          </motion.div>
        </div>
        <div className=" flex flex-col  h-full pb-6 justify-between">
          <div className=" space-y-4  lg:space-y-8 overflow-scroll scrollbar-hide h-[70vh] ">
            <div className="flex flex-col  lg:space-y-2">
              <label htmlFor="habitName" className="font-semibold pb-2">
                Habit
              </label>
              <input
                onChange={(e) =>
                  setCurrHabit({
                    ...currHabit,
                    name: e.target.value,
                  })
                }
                value={currHabit.name}
                name="habitName"
                id="habitName"
                className={`
							outline-none focus:border-[#0F85F2]  font-medium 
							border-2    px-4 py-2 rounded ${
                currHabit.name?.length > 0 && error
                  ? "border-zinc-200"
                  : error
                  ? "border-red-500"
                  : null
              }`}
              />
            </div>
            <div className="flex flex-col  lg:space-y-2">
              <label htmlFor="why" className="font-semibold pb-2">
                Why ?
              </label>
              <textarea
                onChange={(e) =>
                  setCurrHabit({
                    ...currHabit,
                    why: e.target.value,
                  })
                }
                value={currHabit.why}
                name="why"
                id="why"
                className={`
							outline-none focus:border-[#0F85F2]  font-medium 
							border-2 h-32  px-4 py-2 rounded ${
                currHabit.why?.length > 0 && error
                  ? "border-zinc-200"
                  : error
                  ? "border-red-500"
                  : null
              }`}
              />
            </div>
            <div className="flex flex-col space-y-2 ">
              <p className="font-semibold">Repeat Habit days </p>
              <div className="space-y-4">
                <div className=" grid grid-cols-7 gap-2 ">
                  {weekDays.map((day) => {
                    return (
                      <div
                        onClick={() => addDayIntoRepeatHabitDaysList(day)}
                        key={day}
                        className={` text-sm  ${
                          currHabit.repeatHabitDays?.includes(day)
                            ? "bg-[#0F85F2] border-[#0F85F2]  text-white "
                            : "  hover:bg-blue-100 hover:border-blue-300  border-zinc-200 "
                        } cursor-pointer capitalize text-center  font-medium border-2  py-2 rounded transition-colors`}
                      >
                        {day.slice(0, 3)}
                      </div>
                    );
                  })}
                </div>
                <div className=" grid grid-cols-2 gap-6 ">
                  <div
                    onClick={() =>
                      setCurrHabit({
                        ...currHabit,
                        repeatHabitDays: [...weekDays].splice(0, 5),
                      })
                    }
                    className={`  ${
                      arraysHaveSameStrings(
                        currHabit.repeatHabitDays,
                        [...weekDays].splice(0, 5)
                      )
                        ? "bg-[#0F85F2] border-[#0F85F2]  text-white "
                        : "  hover:bg-blue-100 hover:border-blue-300  border-zinc-200 "
                    } cursor-pointer capitalize text-center  font-medium border-2  px-4 py-2 rounded transition-colors`}
                  >
                    Week days
                  </div>
                  <div
                    onClick={() =>
                      setCurrHabit({
                        ...currHabit,
                        repeatHabitDays: weekDays,
                      })
                    }
                    className={`  ${
                      currHabit.repeatHabitDays?.length === 7
                        ? "bg-[#0F85F2] border-[#0F85F2]  text-white "
                        : "  hover:bg-blue-100 hover:border-blue-300  border-zinc-200 "
                    } cursor-pointer capitalize text-center  font-medium border-2  px-4 py-2 rounded transition-colors`}
                  >
                    Every day
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2 ">
              <p className="font-semibold">Do it at</p>
              <div className=" grid grid-cols-2 gap-x-6 gap-y-4 ">
                {doitat.map((time, idx) => {
                  return (
                    <div
                      onClick={() =>
                        setCurrHabit({ ...currHabit, getDoneIn: time })
                      }
                      key={idx}
                      className={` ${
                        currHabit.getDoneIn === time
                          ? "bg-[#0F85F2] border-[#0F85F2]  text-white "
                          : "  hover:bg-blue-100 hover:border-blue-300  border-zinc-200 "
                      } cursor-pointer capitalize text-center  font-medium border-2  px-4 py-2 rounded transition-colors `}
                    >
                      {time}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <div className="flex flex-col space-y-2 ">
              <p className="font-semibold">Hide</p>
              <div className=" grid grid-cols-2 gap-x-6 gap-y-4 ">
                <div
                  onClick={() =>
                    setCurrHabit({ ...currHabit, hide: !currHabit.hide })
                  }
                  className={` ${
                    currHabit.hide
                      ? "bg-[#0F85F2] border-[#0F85F2]  text-white "
                      : "  hover:bg-blue-100 hover:border-blue-300  border-zinc-200 "
                  } cursor-pointer capitalize text-center  font-medium border-2  px-4 py-2 rounded transition-colors `}
                >
                  {currHabit.hide ? "true" : "false"}
                </div>
              </div>
            </div> */}
          </div>
          <motion.button
            whileTap={{
              scale: 0.85,
            }}
            onClick={() => handleSubmit(currHabit)}
            type="submit"
            className=" w-full my-8 font-semibold transition-colors  bg-[#2e2e2e] hover:bg-[#2e2e2eed] text-white px-14 rounded py-4 "
          >
            {formTitle}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

export default HabitForm;
