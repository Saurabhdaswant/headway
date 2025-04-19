import { CalendarIcon, LogoutIcon } from "@heroicons/react/outline";
import { format, isEqual } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import Calendar from "../../components/Calendar";
import { useState } from "react";
import useClickOutSide from "../../hooks/useClickOutSide";
import { useRouter } from "next/router";

export default function Header({
  selectedDay,
  setSelectedDay,
  setShowHabitForm,
  today,
}) {
  const [showDialog, setShowDialog] = useState(false);
  let domNode = useClickOutSide(() => setShowDialog(false));
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row gap-y-4 justify-between md:items-end">
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
      <div className="flex justify-between md:justify-normal   items-end gap-3">
        <div
          ref={domNode as React.RefObject<HTMLDivElement>}
          className="relative"
        >
          <motion.button
            whileTap={{
              scale: 0.9,
            }}
            className="p-3 bg-white rounded-full   text-gray-600 "
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
        <div className="flex gap-3">
          <motion.button
            // disabled={habitsLength >= 5}
            onClick={() => setShowHabitForm(true)}
            whileTap={{
              scale: 0.9,
            }}
            className={`flex justify-between items-center gap-2 font-medium   bg-[#0F85F2] px-4 py-2.5 rounded-full text-white disabled:cursor-not-allowed`}
          >
            <p>Create Habit</p>
          </motion.button>
          <div>
            <motion.button
              whileTap={{
                scale: 0.9,
              }}
              className="p-3 bg-white rounded-full text-gray-600 "
              onClick={() => {
                localStorage.removeItem("authToken");
                router.push("/");
              }}
            >
              <LogoutIcon className=" w-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
