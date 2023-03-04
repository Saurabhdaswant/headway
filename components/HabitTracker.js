import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isEqual,
  startOfToday,
  startOfWeek,
  startOfYesterday,
} from "date-fns";
import React, { useContext, useState } from "react";
import { PlusSquare } from "react-feather";
import Calendar from "./Calendar";
import { colors, doitat, weekDays } from "./constants";
import HabitForm from "./HabitForm";
import HabitsStats from "./HabitsStats";
import Habits from "./Habits";
import { HabitsContext } from "../Providers/HabitsProvider";
import useToggle from "../hooks/useToggle";
import { v4 as uuidv4 } from "uuid";

const Header = ({ selectedDay, today, toggleHabitForm }) => {
  return (
    <div className="flex justify-between items-end">
      <div className=" space-y-2 ">
        {isEqual(selectedDay, today) ? (
          <>
            <p className="text-5xl font-bold">Today</p>
            <p className="text-gray-400 text-xl">
              {format(selectedDay, "MMMM dd")}
            </p>
          </>
        ) : (
          <>
            <p className="text-5xl font-bold">
              {format(selectedDay, "MMMM dd")}
            </p>
            <p className="text-gray-400 text-xl">
              {format(selectedDay, "eeee")}
            </p>
          </>
        )}
      </div>
      <button
        onClick={toggleHabitForm}
        className=" flex justify-between items-center gap-2 font-medium  bg-gradient-to-bl from-[#0FC9F2] to-[#0F85F2] px-5 py-2 rounded text-lg text-white"
      >
        <PlusSquare />
        <p>Add Habit</p>
      </button>
    </div>
  );
};

const WeekDatePicker = ({ selectedDay, setSelectedDay }) => {
  const week = eachDayOfInterval({
    start: startOfWeek(selectedDay),
    end: endOfWeek(selectedDay),
  });

  return (
    <div className="bg-white flex items-center justify-evenly h-20 rounded-md   my-8 ">
      {week.map((day) => {
        return (
          <div
            onClick={() => setSelectedDay(day)}
            key={day.toString()}
            className="text-center space-y-2 cursor-pointer "
          >
            <p className=" text-xs capitalize text-gray-400 ">
              {format(day, "eee")}
            </p>
            <p
              className={`font-bold text-lg ${
                isEqual(selectedDay, day) && "text-[#007BFF]"
              } `}
            >
              {format(day, "d")}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default function HabitTracker() {
  const { habits, setHabits } = useContext(HabitsContext);
  const [showHabitForm, toggleHabitForm] = useToggle(false);
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [error, setError] = useState(false);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("anytime");

  const newHabit = {
    id: uuidv4(),
    name: "",
    getDoneIn: "anytime",
    color: "",
    checkedOfForDates: [],
    createdDate: new Date(2023, 2, 24),
    repeatHabitDays: weekDays,
    isCompleted: false,
    totalStreakCount: 0,
    lastCheckedOffDate: startOfYesterday(),
    currentStreakCount: 0,
    bestStreakCount: 0,
  };

  const handleCreateHabit = (currHabit) => {
    if (currHabit.name.trim().length === 0) {
      setError(true);
      return;
    } else {
      setError(false);

      if (currHabit.color === "") {
        var randomColor = colors[Math.floor(Math.random() * colors.length)];
        currHabit.color = randomColor;
      }

      if (currHabit.getDoneIn === "") currHabit.getDoneIn = "anytime";

      const newHabits = [...(habits || []), currHabit];

      if (typeof window !== "undefined") {
        localStorage.setItem("Habits", JSON.stringify(newHabits));
      }
      setHabits(newHabits);
      toggleHabitForm();
    }
  };

  return (
    <div className=" mx-auto w-full max-w-[90%]  md:max-w-[95%] xl:max-w-[80%] 2xl:max-w-[70%] flex justify-between py-8     lg:gap-8  ">
      <main className=" mx-auto w-full max-w-xl lg:max-w-[60%]   ">
        <Header
          selectedDay={selectedDay}
          today={today}
          toggleHabitForm={toggleHabitForm}
        />
        <WeekDatePicker
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
        <div className=" flex items-center gap-4 my-8 overflow-scroll scrollbar-hide   ">
          {doitat.map((time, idx) => {
            return (
              <div
                onClick={() => setSelectedTimeOfDay(time)}
                key={idx}
                className={` cursor-pointer font-bold capitalize px-4 py-2  rounded-md ${
                  selectedTimeOfDay === time
                    ? "bg-[#9fc6eb]   text-[#091e32]"
                    : "bg-[#EDEDED]    text-gray-400"
                }`}
              >
                {time === "anytime" ? "All" : time}
              </div>
            );
          })}
        </div>
        <Habits
          selectedDay={selectedDay}
          selectedTimeOfDay={selectedTimeOfDay}
        />
      </main>
      <div>
        <div className="hidden lg:block">
          <HabitsStats />
          <Calendar currDate={selectedDay} setCurrDate={setSelectedDay} />
        </div>
        {showHabitForm ? (
          <HabitForm
            formTitle="Add New Habit"
            habit={newHabit}
            toggleHabitForm={toggleHabitForm}
            handleSubmit={handleCreateHabit}
            error={error}
          />
        ) : null}
      </div>
    </div>
  );
}
