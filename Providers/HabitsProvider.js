import React, { createContext, useEffect, useState } from "react";
import { API_ENDPOINTS } from "../constants";

export const HabitsContext = createContext();

export default function HabitsProvider({ children }) {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    async function gethabits() {
      const res = await fetch(`${API_ENDPOINTS.BASE_URL}/habits`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const habits = await res.json();

      setHabits(habits);
    }
    gethabits();
  }, []);

  const updateHabits = (newHabits) => {
    setHabits(newHabits);

    if (typeof window !== "undefined") {
      localStorage.setItem("Habits", JSON.stringify([...newHabits]));
    }
  };

  return (
    <HabitsContext.Provider value={{ habits, updateHabits }}>
      {children}
    </HabitsContext.Provider>
  );
}
