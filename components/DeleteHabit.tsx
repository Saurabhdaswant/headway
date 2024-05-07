import React from "react";
import { useContext } from "react";
import { HabitsContext } from "../Providers/HabitsProvider";
import { API_ENDPOINTS } from "../constants";
import { TokenContext } from "../Providers/TokenProvider";
import { motion } from "framer-motion";

export default function DeleteHabit({ habitId, toggleDeleteDialog }) {
  const { habits, updateHabits } = useContext(HabitsContext);
  const { token }: any = useContext(TokenContext);

  const handleDelete = async () => {
    const res = await fetch(`${API_ENDPOINTS.BASE_URL}/habits/${habitId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    if (json.acknowledged) {
      const filteredHabits = habits.filter((habit, _) => habit._id !== habitId);

      updateHabits(filteredHabits);
      toggleDeleteDialog();
    }
  };

  return (
    <div className=" fixed inset-0  flex h-full w-full items-center justify-center  ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: "spring",
          bounce: 0,
          duration: 0.3,
        }}
        onClick={toggleDeleteDialog}
        className=" fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 "
      />{" "}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{
          type: "spring",
          bounce: 0,
          duration: 0.3,
        }}
        className="bg-white p-8 rounded-lg z-50 "
      >
        <p className=" text-xl font-bold w-[60%] ">
          Are you sure you want to delete this Habit?
        </p>
        <p className="  text-gray-400 font-medium mt-2">
          This action cannot be undone
        </p>
        <div className="flex justify-between gap-x-4 mt-14 ">
          <button
            onClick={toggleDeleteDialog}
            type="submit"
            className=" w-full   font-semibold  bg-[#F0F0F0]  text-[#2E2E2E] px-14 rounded py-4 "
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            type="submit"
            className=" w-full   font-semibold  bg-[#2e2e2e] hover:bg-[#2e2e2eed] text-white px-14 rounded py-4 "
          >
            Confirm{" "}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
