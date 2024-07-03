import React, { createContext, useEffect, useState } from "react";
import { API_ENDPOINTS } from "../constants";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";

export const HabitsContext = createContext();

export default function HabitsProvider({ children }) {
  const [habits, setHabits] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage && localStorage?.getItem("authToken");
    async function gethabits() {
      const res = await fetch(`${API_ENDPOINTS.BASE_URL}/habits`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const habits = await res.json();

      setHabits(habits);
    }

    if (
      !token &&
      router.pathname !== "/login" &&
      router.pathname !== "/signup" &&
      router.pathname !== "/waitlist" &&
      router.pathname !== "/"
    ) {
      router.push("/login");
    }

    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("authToken");
        router.push("/login");
      } else {
        gethabits();
      }
    }
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
