import { ChartSquareBarIcon } from "@heroicons/react/solid";
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
import HabitStats from "./HabitStats";

function HabitCard({ habit, currDate }) {
  const { habits, updateHabits } = useContext(HabitsContext);
  const [currHabit, setCurrHabit] = useState({ ...habit });
  const [isCompleted, setIsCompleted] = useState(false);
  const [showStats, toggleStats] = useToggle(false);

  const formatedDate = format(currDate, "yy-MM-dd ");
  const formatedCheckedOfForDates = currHabit?.checkedOfForDates.map((date) =>
    format(new Date(date), "yy-MM-dd ")
  );
  useEffect(() => {
    if (formatedCheckedOfForDates.includes(formatedDate)) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  }, [formatedCheckedOfForDates, formatedDate]);

  // this will always set to false and wont work when we update form the
  // onClick function because onClick it will re-render and on every-render
  // we are setting the value based on the habit provided

  // to fix that we are updateing the array of dates itself so on re-render
  // the list has the current date which will then toggle the value to true!

  // now if the isCompleted is already true then we remove the date from the
  // list which will then toggle the value to false

  // every thing is working as it supossed to work 👏🏽

  return (
    <div className="flex items-center justify-between">
      <div
        onClick={() => {
          const idx = habits?.findIndex((h) => h.id === currHabit.id);
          const newHabits = [...habits];
          let completedOnDates;
          let lastCheckedOffDate = currHabit.lastCheckedOffDate;
          let totalStreakCount = currHabit.totalStreakCount;
          let bestStreakCount = currHabit.bestStreak.count;
          let newCurrStreak = currHabit.currentStreak;
          let newBestStreak = currHabit.bestStreak;

          const diff = differenceInDays(
            startOfToday(),
            new Date(
              typeof lastCheckedOffDate === "object"
                ? lastCheckedOffDate
                : currHabit.createdDate
            )
          );

          if (isCompleted) {
            const filterdDates = currHabit.checkedOfForDates.filter(
              (dateStr) => {
                const dateObject = new Date(dateStr);
                return dateObject.getTime() !== currDate.getTime();
              }
            );

            completedOnDates = filterdDates;
            if (totalStreakCount > 0) {
              totalStreakCount = totalStreakCount - 1;
            }

            if (newCurrStreak.count > 0) {
              if (
                isWithinInterval(new Date(currDate), {
                  start: new Date(newCurrStreak.startingDate),
                  end: new Date(newCurrStreak.endingDate),
                }) &&
                isWithinInterval(new Date(currDate), {
                  start: new Date(newBestStreak.startingDate),
                  end: new Date(newBestStreak.endingDate),
                })
              ) {
                newCurrStreak.count = newCurrStreak.count - 1;
                newBestStreak.count = newBestStreak.count - 1;
              } else if (
                isWithinInterval(new Date(currDate), {
                  start: new Date(newCurrStreak.startingDate),
                  end: new Date(newCurrStreak.endingDate),
                })
              ) {
                newCurrStreak.count = newCurrStreak.count - 1;
              } else if (
                isWithinInterval(new Date(currDate), {
                  start: new Date(newBestStreak.startingDate),
                  end: new Date(newBestStreak.endingDate),
                })
              ) {
                newBestStreak.count = newBestStreak.count - 1;
              }
            }
          } else {
            completedOnDates = [...currHabit.checkedOfForDates, currDate];
            lastCheckedOffDate = currDate;
            totalStreakCount = totalStreakCount + 1;

            if (diff === 0) {
              newCurrStreak = {
                ...currHabit.currentStreak,
                count: newCurrStreak.count + 1,
                startingDate: currDate,
                endingDate: currDate,
              };
            } else if (diff === 1) {
              if (newCurrStreak.count === 0) {
                newCurrStreak = {
                  ...currHabit.currentStreak,
                  count: newCurrStreak.count + 1,
                  startingDate: currDate,
                  endingDate: currDate,
                };
              } else {
                newCurrStreak = {
                  ...currHabit.currentStreak,
                  count: newCurrStreak.count + 1,
                  endingDate: currDate,
                };
              }
            } else if (diff !== 0) {
              newCurrStreak = {
                ...currHabit.currentStreak,
                count: 1,
                startingDate: currDate,
                endingDate: currDate,
              };
            }
            if (newCurrStreak.count > bestStreakCount) {
              newBestStreak = { ...newCurrStreak };
            }
          }
          const newHabit = {
            ...currHabit,
            checkedOfForDates: completedOnDates,
            totalStreakCount: totalStreakCount,
            lastCheckedOffDate: lastCheckedOffDate,
            currentStreak: newCurrStreak,
            bestStreak: newBestStreak,
          };

          setCurrHabit(newHabit);

          newHabits[idx] = newHabit;
          updateHabits(newHabits);
        }}
        className={` cursor-pointer border-4 grid place-items-center bg-white ${
          isCompleted ? "border-[#27B563]  text-[#27B563]" : " text-gray-200"
        } w-14 h-14 rounded-full shadow-lg  `}
      >
        <Check className="  w-8 h-8  stroke-3" />
      </div>
      <div
        className={`p-2 h-14 w-[85%] flex justify-between items-center  font-bold my-4 text-[#2e2e2e]   border-l-4 border-${habit.color} bg-white   `}
      >
        <p> {habit.name}</p>
        <div className="flex  gap-4 w-24">
          <ChartSquareBarIcon
            onClick={toggleStats}
            className="hover:cursor-pointer w-10"
          />
        </div>
      </div>
      {showStats && <HabitStats habit={habit} toggleStats={toggleStats} />}
    </div>
  );
}

export default HabitCard;
