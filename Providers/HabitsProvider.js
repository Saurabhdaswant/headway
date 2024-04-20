import React, { createContext, useEffect, useState } from "react";

export const HabitsContext = createContext();

export default function HabitsProvider({ children }) {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    async function gethabits() {
      const res = await fetch(
        "https://monkfish-app-xk9mf.ondigitalocean.app/api/habits",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
