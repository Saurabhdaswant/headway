import React, { createContext, useState } from "react";

export const GoalContext = createContext<any>({});

export default function GoalProvider({ children }) {
  const [goal, setGoal] = useState<any>({});

  const updateGoal = (newGoal) => {
    setGoal(newGoal);
  };

  return (
    <GoalContext.Provider value={{ goal, updateGoal }}>
      {children}
    </GoalContext.Provider>
  );
}
