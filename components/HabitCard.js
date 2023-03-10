import { differenceInDays, format, isToday, startOfToday } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Check } from "react-feather";
import useToggle from "../hooks/useToggle";
import { HabitsContext } from "../Providers/HabitsProvider";

function HabitCard({ habit, currDate }) {
  const { habits, setHabits } = useContext(HabitsContext);
  const [currHabit, setCurrHabit] = useState({ ...habit });
  const [isCompleted, setIsCompleted] = useState(false);

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

          if (isCompleted) {
            const filterdDates = currHabit.checkedOfForDates.filter((date) => {
              return date.getTime() !== currDate.getTime();
            });

            completedOnDates = filterdDates;
          } else {
            completedOnDates = [...currHabit.checkedOfForDates, currDate];
          }
          const newHabit = {
            ...currHabit,
            checkedOfForDates: completedOnDates,
          };

          setCurrHabit(newHabit);

          newHabits[idx] = newHabit;
          setHabits(newHabits);
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
      </div>
    </div>
  );
}

export default HabitCard;
