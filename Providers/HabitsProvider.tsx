import React, { createContext, useEffect, useState } from "react";
import { API_ENDPOINTS } from "../constants";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { getDay, isAfter, isSameDay, isToday, startOfToday } from "date-fns";
import days from "../Data/Days";

import Cookies from "js-cookie";

export const HabitsContext: any = createContext({});

export default function HabitsProvider({ children }) {
  const [habits, setHabits] = useState<any>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  useEffect(() => {
    async function getHabits() {
      try {
        setLoading(true); // Start loading
        const res = await fetch(`${API_ENDPOINTS.BASE_URL}/habits`, {
          credentials: "include",
        });

        if (
          res.status === 401 &&
          !["/login", "/signup", "/waitlist", "/"].includes(router.pathname)
        ) {
          router.push("/login");
          return;
        }

        const habits = await res.json();
        setHabits(habits);
      } catch (error) {
        console.error("Error fetching habits:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    }

    getHabits();
  }, [router]);

  const updateHabits = (newHabits) => {
    setHabits(newHabits);
  };

  const toggleHabitCompletion = async (
    currHabit,
    currDate,
    isCompleted,
    setCurrHabit
  ) => {
    // we are doing this updating logic on frontend , i think instead this should happen on backend , we should just send the id and then update the habit from backend and reload it right ?

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

    const res = await fetch(
      `${API_ENDPOINTS.BASE_URL}/habits/${updatedHabit._id}`,
      {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify({
          updatedHabit,
        }),
      }
    );

    const json = await res.json();

    setCurrHabit(updatedHabit);
    if (json.acknowledged) {
      newHabits[habitIndex] = updatedHabit;

      updateHabits(newHabits);
    } else {
      setCurrHabit(currHabit);
    }
  };

  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);

  const isAfterCreation = (habit) =>
    isSameDay(selectedDay, new Date(habit.createdDate)) ||
    isToday(selectedDay) ||
    isAfter(selectedDay, new Date(habit.createdDate));
  const currentDay = days[getDay(selectedDay)];

  const isRepeatDay = (habit) => habit.repeatHabitDays?.includes(currentDay);

  let filteredHabits =
    habits &&
    habits.length > 0 &&
    habits
      // ?.filter((habit) => !habit.hide)
      ?.filter(isAfterCreation)
      ?.filter(isRepeatDay);

  return (
    <HabitsContext.Provider
      value={{
        habits,
        updateHabits,
        loading,
        toggleHabitCompletion,
        selectedDay,
        setSelectedDay,
        filteredHabits,
        today,
        currentDay,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
}
