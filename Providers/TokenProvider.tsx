import React, { createContext, useEffect, useState } from "react";

import Cookies from "js-cookie";

export const TokenContext = createContext({});

export default function TokenProvider({ children }) {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // const token = window.localStorage.getItem("authToken");
      const token = Cookies.get("token");

      setToken(token as string);
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>
  );
}
