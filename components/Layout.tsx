import React from "react";
import Sidebar from "../components/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      {children}
    </div>
  );
}
