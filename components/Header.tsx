import { CalendarIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { format, isEqual } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Calendar from "./Calendar";
import useClickOutSide from "../hooks/useClickOutSide";
import WeekChanger from "./WeekChanger";

export default function Header({
  selectedDay,
  setSelectedDay,
  setShowHabitForm,
  today,
  viewMode,
  setViewMode,
  currentWeekStart,
  setCurrentWeekStart,
}) {
  const [showDialog, setShowDialog] = useState(false);
  let domNode = useClickOutSide(() => setShowDialog(false));

  const toggleViewMode = (newViewMode) => {
    setViewMode(newViewMode);
  };

  return (
    <div className="flex  flex-col  md:flex-row gap-y-4 justify-between md:items-end">
      {viewMode === "calendar" ? (
        <WeekChanger
          currentWeekStart={currentWeekStart}
          setCurrentWeekStart={setCurrentWeekStart}
        />
      ) : (
        <div className="  ">
          {isEqual(selectedDay, today) ? (
            <>
              <p className="text-3xl font-bold text-[#2e2e2e]">Today</p>
              {/* <p className="text-gray-400 text-xl">
              {format(selectedDay, "eeee")} {format(selectedDay, "MMMM dd")}
            </p> */}
            </>
          ) : (
            <>
              <p className="text-3xl font-bold text-[#2e2e2e]">
                {format(selectedDay, "MMMM dd")}
              </p>
              {/* <p className="text-gray-400 text-xl">
              {format(selectedDay, "eeee")}
            </p> */}
            </>
          )}
        </div>
      )}

      <div className="flex   justify-between md:justify-normal   items-end gap-3">
        <Switcher toggleViewMode={toggleViewMode} viewMode={viewMode} />
        {viewMode !== "calendar" && (
          <div
            ref={domNode as React.RefObject<HTMLDivElement>}
            className="relative"
          >
            <motion.button
              whileTap={{
                scale: 0.9,
              }}
              className="p-2.5 bg-white  rounded-full   text-gray-600 "
              onClick={() => setShowDialog(true)}
            >
              <CalendarIcon className=" w-6" />
            </motion.button>
            <div className=" absolute  mt-3  ">
              <AnimatePresence>
                {showDialog && (
                  <Calendar
                    currDate={selectedDay}
                    setCurrDate={setSelectedDay}
                    toggleCalendar={() => setShowDialog(false)}
                    canSelectDaysAfterToday={false}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
        <div className="flex gap-3 ">
          <motion.button
            onClick={() => setShowHabitForm(true)}
            whileTap={{
              scale: 0.9,
            }}
            className={`flex justify-between items-center gap-2 font-medium   bg-[#0F85F2] px-4 py-2.5 rounded-full text-white disabled:cursor-not-allowed`}
          >
            <p>Create Habit</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

const Switcher = ({ viewMode, toggleViewMode }) => {
  const [showViewModeDropdown, setShowViewModeDropdown] = useState(false);

  return (
    <div className="relative ">
      <motion.button
        // whileTap={{
        //   scale: 0.9,
        // }}
        onClick={() => setShowViewModeDropdown(!showViewModeDropdown)}
        className={`flex justify-between items-center gap-2 font-medium    px-4 py-2.5 rounded-full hover:bg-white transition-colors text-gray-600 disabled:cursor-not-allowed  `}
      >
        <p>{viewMode === "calendar" ? "Calendar View" : "List View"}</p>
        <ChevronDownIcon className=" w-6" />
      </motion.button>
      {showViewModeDropdown && (
        <div className="absolute right-0 mt-2 w-48 p-1 cursor-pointer rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {[
            { title: "Calendar View", option: "calendar" },
            { title: "List View", option: "list" },
          ].map((option) => (
            <div
              key={option.option}
              className="block px-4 py-2 rounded-lg  text-gray-700 hover:bg-gray-100/70 hover:text-gray-900"
              onClick={() => {
                toggleViewMode(option.option);
                setShowViewModeDropdown(false);
              }}
            >
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
