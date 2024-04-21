import Head from "next/head";
import { HabitsContext } from "../Providers/HabitsProvider";

import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isAfter,
  isEqual,
  startOfToday,
  startOfWeek,
  sub,
} from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { colors, weekDays } from "../components/constants";
import HabitForm from "../components/HabitForm";
import { CalendarIcon, LogoutIcon } from "@heroicons/react/outline";
import { Habits as HabitsRenderer } from "../components/Habits";
import Calendar from "../components/Calendar";
import useClickOutSide from "../hooks/useClickOutSide";
import { API_ENDPOINTS } from "../constants";

const Header = ({ selectedDay, today, setShowHabitForm, setSelectedDay }) => {
  const [showDialog, setShowDialog] = useState(false);
  let domNode = useClickOutSide(() => setShowDialog(false));

  return (
    <div className="flex justify-between items-end">
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
      <div className="flex items-end gap-3">
        <button
          onClick={() => setShowHabitForm(true)}
          className=" flex justify-between items-center gap-2 font-medium   bg-[#0F85F2] px-4 py-2.5 rounded-full text-white"
        >
          <p>Create Habit</p>
        </button>
        <div ref={domNode} className="relative">
          <button
            className="p-3 bg-white rounded-full text-gray-600 "
            onClick={() => setShowDialog(true)}
          >
            <CalendarIcon className=" w-6" />
          </button>

          <div className=" absolute  mt-10  ">
            {showDialog && (
              <Calendar
                currDate={selectedDay}
                setCurrDate={setSelectedDay}
                toggleCalendar={() => setShowDialog(false)}
                canSelectDaysAfterToday={false}
              />
            )}
          </div>
        </div>
        <div ref={domNode} className="relative">
          <button
            className="p-3 bg-white rounded-full text-gray-600 "
            onClick={() => {
              localStorage.removeItem("authToken");
              window.location.href = "/";
            }}
          >
            <LogoutIcon className=" w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

const WeekDatePicker = ({ selectedDay, setSelectedDay }) => {
  const week = eachDayOfInterval({
    start: startOfWeek(selectedDay),
    end: endOfWeek(selectedDay),
  });

  return (
    <div className=" flex items-center justify-evenly h-20 rounded-md  my-4 lg:my-8 ">
      {week.map((day) => {
        return (
          <div
            onClick={() => {
              if (isAfter(day, startOfToday())) {
                return;
              }
              setSelectedDay(day);
            }}
            key={day.toString()}
            className="text-center space-y-2 cursor-pointer "
          >
            <p className=" text-xs capitalize text-gray-400 ">
              {format(day, "eee")}
            </p>
            <p
              className={` font-bold text-lg ${
                isEqual(selectedDay, day) ? "text-[#007BFF]" : "text-gray-600"
              }  `}
            >
              {format(day, "d")}
            </p>
          </div>
        );
      })}
    </div>
  );
};

function App() {
  const { habits, updateHabits } = useContext(HabitsContext);
  const [showHabitForm, setShowHabitForm] = useState(false);
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [error, setError] = useState(false);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("anytime");
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("authToken");

      if (!token) {
        window.location.href = "/login";
      }

      setToken(token);
    }
  }, []);

  const dateWhichIsBeforeCurrDate = sub(today, {
    days: 5,
  });

  // use this if needed instead of today! 👆🏽

  const newHabit = {
    name: "",
    getDoneIn: "anytime",
    color: "",
    completedOnDates: [],
    createdDate: today,
    repeatHabitDays: weekDays,
  };

  const handleCreateHabit = async (habit) => {
    if (habit.name.trim().length === 0) {
      setError(true);
      return;
    } else {
      setError(false);

      if (habit.color === "") {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        habit.color = randomColor;
      }

      if (habit.getDoneIn === "") {
        habit.getDoneIn = "anytime";
      }

      const res = await fetch(`${API_ENDPOINTS.BASE_URL}/newHabit`, {
        method: "POST",
        body: JSON.stringify({ habit: habit }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const habitWithId = await res.json();

      const newHabits = [...(habits || []), habitWithId];

      updateHabits(newHabits);
      setShowHabitForm(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      <Head>
        <title>HabitTracker | Headway</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/headway.svg" />
      </Head>
      <div className=" mx-auto w-full max-w-[90%]  md:max-w-[95%] xl:max-w-[80%] 2xl:max-w-[70%] flex justify-between py-4 lg:py-8     lg:gap-8  ">
        <main className=" mx-auto w-full max-w-xl lg:max-w-[60%]   ">
          <Header
            selectedDay={selectedDay}
            today={today}
            setShowHabitForm={setShowHabitForm}
            setSelectedDay={setSelectedDay}
          />
          <WeekDatePicker
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
          {/* <div className=" flex items-center gap-4 my-4 lg:my-8 overflow-scroll scrollbar-hide   ">
            {doitat.map((time, idx) => {
              return (
                <div
                  onClick={() => setSelectedTimeOfDay(time)}
                  key={idx}
                  className={` cursor-pointer font-bold capitalize px-4 py-2  rounded-md ${
                    selectedTimeOfDay === time
                      ? "bg-[#BFE1FF]   text-[#02518B]"
                      : "bg-[#EDEDED]    text-gray-400"
                  }`}
                >
                  {time === "anytime" ? "All" : time}
                </div>
              );
            })}
          </div> */}
          <HabitsRenderer
            selectedDay={selectedDay}
            selectedTimeOfDay={selectedTimeOfDay}
          />
        </main>
        <div>
          {showHabitForm ? (
            <HabitForm
              formTitle="Add New Habit"
              habit={newHabit}
              setShowHabitForm={setShowHabitForm}
              handleSubmit={handleCreateHabit}
              error={error}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
