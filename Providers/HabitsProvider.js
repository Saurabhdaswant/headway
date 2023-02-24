import React, { createContext, useEffect, useState } from "react";

export const HabitsContext = createContext();

export default function HabitsProvider({ children }) {
    const [habits, setHabits] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHabits(JSON.parse(localStorage.getItem("Habits")));
    }
  }, []);

  return (
    <HabitsContext.Provider value={{ habits, setHabits }}>
      {children}
    </HabitsContext.Provider>
  );
}
