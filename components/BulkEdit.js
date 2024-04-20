import React from "react";
import { API_ENDPOINTS } from "../constants";

export default function BulkEdit() {
  const { habits } = useContext(HabitsContext);

  async function addMultipleHabits(habits) {
    const url = `${API_ENDPOINTS.BASE_URL}/habits/bulk`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ habits }),
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const result = await response.json();
        console.log("Habits added successfully:", result);
        return result;
      } else {
        const error = await response.json();
        console.error("Failed to add habits:", error);
        return error;
      }
    } catch (error) {
      console.error("Error making the request:", error);
      return { error: "Network error or server not responding" };
    }
  }

  return (
    <div>
      <button
        onClick={() => addMultipleHabits(habits)}
        className=" font-medium  bg-gradient-to-bl from-[#0FC9F2] to-[#0F85F2] px-8 lg:px-11 lg:py-4 py-3 xl:px-14   lg:shadow-2xl lg:shadow-blue-400  rounded-lg text-lg text-white"
      >
        bulk edit
      </button>
    </div>
  );
}
