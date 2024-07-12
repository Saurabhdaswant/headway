import React from "react";
import { useContext } from "react";
import { API_ENDPOINTS } from "../constants";
import { TokenContext } from "../Providers/TokenProvider";
import { motion } from "framer-motion";

export default function DeleteGoal({
  goalId,
  goals,
  toggleDeleteDialog,
  setGoals,
}) {
  const { token }: any = useContext(TokenContext);

  const handleDelete = async (e) => {
    e.stopPropagation();

    const res = await fetch(`${API_ENDPOINTS.BASE_URL}/goals/${goalId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    if (json.goal.acknowledged) {
      const filteredGoals = goals.filter((goal, _) => goal._id !== goalId);
      setGoals(filteredGoals);
      toggleDeleteDialog();
    }
  };

  return (
    <div className=" fixed inset-0  z-30 flex h-full w-full items-center justify-center  ">
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
        className=" fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-black bg-opacity-20"
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
          Are you sure you want to delete this Goal?
        </p>
        <p className="  text-gray-400 font-medium mt-2">
          This action cannot be undone
        </p>
        <div className="flex justify-between gap-x-4 mt-14 ">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleDeleteDialog();
            }}
            type="submit"
            className=" w-full   font-semibold  bg-[#F0F0F0]  text-[#2E2E2E] px-14 rounded py-4 "
          >
            Cancel
          </button>
          <button
            onClick={(e) => handleDelete(e)}
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
