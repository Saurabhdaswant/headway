import React, { createContext, useEffect, useState } from "react";

export const TokenContext = createContext({});

export default function TokenProvider({ children }) {
  const [token, setToken] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("authToken");
      setToken(token);
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>
  );
}
