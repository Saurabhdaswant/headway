import { useContext } from "react";
import Habit from "./Habit";

import { CalendarIcon } from "@heroicons/react/solid";
import { isAfter, startOfToday } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { HabitsContext } from "../Providers/HabitsProvider";

export function HabitsRenderer({ setShowHabitForm }: any) {
  const { loading, selectedDay, filteredHabits }: any =
    useContext(HabitsContext);
  const router = useRouter();

  if (loading) {
    return;
  }

  if (
    !filteredHabits ||
    filteredHabits?.length === 0 ||
    isAfter(selectedDay, startOfToday())
  ) {
    return (
      <div className="flex -mt-16 flex-col h-full items-center justify-center  text-center">
        <div className="w-16 h-16 mb-4 flex items-center justify-center bg-gray-200 rounded-full">
          <CalendarIcon className="w-8 h-8 text-gray-500" />
        </div>
        <p className="text-xl text-gray-500 max-w-[400px] mb-4">
          No habits to display. Start tracking your habits today!
        </p>

        <motion.button
          onClick={() => {
            setShowHabitForm(true);
            const params = new URLSearchParams(window.location.search);
            params.set("showHabitForm", "true");
            window.history.replaceState(
              {},
              "",
              `${window.location.pathname}?${params}`
            );
          }}
          whileTap={{
            scale: 0.9,
          }}
          className={`flex justify-between items-center gap-2 font-medium   bg-[#0F85F2] px-4 py-2.5 rounded-full text-white disabled:cursor-not-allowed`}
        >
          <p>Create Habit</p>
        </motion.button>
      </div>
    );
  }
  return (
    <AnimatePresence initial={false}>
      {filteredHabits?.length > 0 &&
        filteredHabits?.map((habit, _) => {
          return <Habit key={habit._id} habit={habit} currDate={selectedDay} />;
        })}
    </AnimatePresence>
  );
}
