import React, { createContext, useEffect, useState } from "react";
import { API_ENDPOINTS } from "../constants";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";

export const HabitsContext: any = createContext({});

export default function HabitsProvider({ children }) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  useEffect(() => {
    const token = localStorage && localStorage?.getItem("authToken");

    async function getHabits() {
      try {
        setLoading(true); // Start loading
        const res = await fetch(`${API_ENDPOINTS.BASE_URL}/habits`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const habits = await res.json();
        setHabits(habits);
      } catch (error) {
        console.error("Error fetching habits:", error);
      } finally {
        setLoading(false); // Stop loading
      }
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
        getHabits();
      }
    } else {
      setLoading(false); // No token, stop loading
    }
  }, [router]);

  const updateHabits = (newHabits) => {
    setHabits(newHabits);
  };

  return (
    <HabitsContext.Provider value={{ habits, updateHabits, loading }}>
      {children}
    </HabitsContext.Provider>
  );
}
