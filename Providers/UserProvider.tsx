import React, { createContext, useState, useEffect } from "react";
import { API_ENDPOINTS } from "../constants";

export const UserContext = createContext({});

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage && localStorage?.getItem("authToken");

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_ENDPOINTS.BASE_URL}/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await res.json();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
