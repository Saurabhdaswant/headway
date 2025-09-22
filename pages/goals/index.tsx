import Head from "next/head";

import { format, startOfToday, sub } from "date-fns";
const { formatDistance } = require("date-fns");

import React, { useEffect, useState } from "react";
import { LogoutIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { API_ENDPOINTS } from "../../constants";
import GoalForm from "../../components/GoalForm";
import Layout from "../../components/Layout";
import useToggle from "../../hooks/useToggle";
import DeleteGoal from "../../components/DeleteGoal";
import { TrashIcon } from "@heroicons/react/solid";
import { Target } from "react-feather";

function Goals() {
  const [showDeleteDialog, toggleDeleteDialog] = useToggle(false);

  const [showHabitForm, setShowHabitForm] = useState(false);
  const today = startOfToday();
  const [error, setError] = useState(false);
  const [token, setToken] = useState(null);

  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const token = localStorage && localStorage?.getItem("authToken");
    async function getGoals() {
      const res = await fetch(`${API_ENDPOINTS.BASE_URL}/goals`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const goals = await res.json();

      setGoals(goals);
    }

    if (token) {
      getGoals();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("authToken");

      if (!token) {
        window.location.href = "/login";
      }

      setToken(token);
    }
  }, []);

  const dateWhichIsBeforeCurrDate = sub(today, {
    days: 5,
  });
  const specificDate = new Date("2022-12-01T00:00:00Z");

  // use this if needed instead of today! 👆🏽

  const newGoal = {
    name: "",
    description: "",
    createdDate: today,
    deadlineDate: today,
    imageUrl: "",
  };

  const router = useRouter();

  const handleCreateGoal = async (goal) => {
    try {
      const formData = new FormData();
      formData.append("goal", JSON.stringify(goal)); // Send goal object as JSON string
      if (goal.imageUrl && goal.imageUrl.startsWith("blob:")) {
        const response = await fetch(goal.imageUrl);
        const blob = await response.blob();
        const fileName = `${goal.name
          .replace(/\s+/g, "_")
          .toLowerCase()}_image.png`;
        formData.append("image", blob, fileName);
      }

      const res = await fetch(`${API_ENDPOINTS.BASE_URL}/goal`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload goal.");
      }

      const newGoal = await res.json();
      setGoals([...goals, newGoal]);
      setShowHabitForm(false);
    } catch (error) {
      console.error("Error uploading goal:", error);
      // Optionally, set error state to show an error message
    }
  };

  const GoalsEmptyState = () => {
    return (
      <div className="flex -mt-12 flex-col h-full items-center justify-center  text-center">
        <div className="w-16 h-16 mb-4 flex items-center justify-center bg-gray-200 rounded-full">
          <Target className="w-8 h-8 text-gray-500" />
        </div>
        <p className="text-xl text-gray-500 max-w-[400px] mb-4">
          No goals to display. Start tracking your goals today!
        </p>

        <motion.button
          onClick={() => {
            setShowHabitForm(true);
            // const params = new URLSearchParams(window.location.search);
            // params.set("showHabitForm", "true");
            // window.history.replaceState(
            //   {},
            //   "",
            //   `${window.location.pathname}?${params}`
            // );
          }}
          whileTap={{
            scale: 0.9,
          }}
          className={`flex justify-between items-center gap-2 font-medium   bg-[#0F85F2] px-4 py-2.5 rounded-full text-white disabled:cursor-not-allowed`}
        >
          <p>Add Goal</p>
        </motion.button>
      </div>
    );
  };

  return (
    <Layout>
      <div className="flex h-screen bg-[#F5F5F5] relative overflow-hidden w-full md:w-[80%]">
        <Head>
          <title>Goals | Habstrack</title>
          <meta name="description" content="A habit tracker app designed to boost productivity and personal growth." />
          <link rel="icon" href="/habstrack.svg" />
        </Head>
        <div className=" mx-auto w-full  flex justify-between py-4 lg:py-8     lg:gap-8   ">
          <main className=" mx-auto w-full max-w-[70%]  ">
            <Header setShowHabitForm={setShowHabitForm} />
            <div className=" space-y-4   mt-8 gap-4 pb-5 items-start scrollbar-hide h-[87vh]   overflow-auto ">
              {goals?.length === 0 ? (
                <GoalsEmptyState />
              ) : (
                goals?.map((goal: any, idx) => {
                  const result = formatDistance(
                    today,
                    new Date(goal?.deadlineDate)
                  );

                  return (
                    <div
                      onClick={() => router.push(`goals/${goal._id}`)}
                      key={idx}
                      className={` ${"h-[300px]"} relative  flex bg-white  flex-col justify-between p-6  shadow-sm transition-shadow hover:shadow-lg hover:cursor-pointer group   rounded-2xl  w-full  `}
                    >
                      {/* <p className="pb-1">💼</p> */}
                      <div className="z-10">
                        <motion.p
                          layoutId={`${goal.name}_name`}
                          className=" font-semibold text-2xl   text-[#272727] capitalize pb-2  "
                        >
                          {goal.name}
                        </motion.p>
                        <motion.p
                          layoutId={`${goal.description}_description`}
                          className=" font-normal line-clamp-4 text-gray-600   max-w-[25rem]   "
                        >
                          {goal.description}
                        </motion.p>
                      </div>

                      <div className="flex z-10 justify-between max-w-[25.5rem]  gap-4 items-center">
                        <div>
                          <motion.p
                            layoutId={`${goal.name}_deadline_title`}
                            className={`text-sm    capitalize    rounded-full    text-gray-600 `}
                          >
                            deadline
                          </motion.p>
                          <motion.p
                            layoutId={`${goal.deadlineDate}_deadline_value`}
                            className={` py-1    capitalize  font-medium    rounded-full    text-gray-900 `}
                          >
                            {format(new Date(goal.deadlineDate), "PP")}
                          </motion.p>
                        </div>
                        <div>
                          <motion.p
                            layoutId={`${goal.name}_remaining_title`}
                            className={`text-sm    capitalize    rounded-full    text-gray-600 `}
                          >
                            Remaining
                          </motion.p>
                          <motion.p
                            layoutId={`${goal.name}_remaining_value`}
                            className={` py-1    capitalize font-medium    rounded-full    text-gray-900 `}
                          >
                            {result}
                          </motion.p>
                        </div>
                        <TrashIcon
                          className="w-6 h-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDeleteDialog();
                          }}
                        />{" "}
                      </div>
                      <motion.div
                        layoutId={`${goal._id}_image`}
                        style={{
                          backgroundImage: `url(${goal.imageUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        className="absolute right-0 top-0 h-[300px] w-[350px] rounded-r-lg overflow-hidden gap-2"
                      ></motion.div>
                      <AnimatePresence>
                        {showDeleteDialog && (
                          <DeleteGoal
                            goalId={goal._id}
                            goals={goals}
                            setGoals={setGoals}
                            toggleDeleteDialog={toggleDeleteDialog}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>
          </main>
          <AnimatePresence>
            {showHabitForm ? (
              <GoalForm
                formTitle="Add Goal"
                goal={newGoal}
                setShowHabitForm={setShowHabitForm}
                handleSubmit={handleCreateGoal}
                error={error}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}

export default Goals;

const Header = ({ setShowHabitForm }) => {
  return (
    <div className="flex gap-y-4 justify-between md:items-end">
      <p className="text-3xl font-bold text-[#2e2e2e]">Goals</p>
      <div className="flex justify-between md:justify-normal   items-end gap-3">
        <div className="flex gap-3">
          <button
            onClick={() => setShowHabitForm(true)}
            className={`flex justify-between items-center gap-2 font-medium   bg-[#0F85F2] px-4 py-2.5 rounded-full text-white disabled:cursor-not-allowed`}
          >
            <p>Add Goal</p>
          </button>
          <div>
            <button
              className="p-3 bg-white rounded-full text-gray-600 "
              onClick={() => {
                localStorage.removeItem("authToken");
                window.location.href = "/";
              }}
            >
              <LogoutIcon className=" w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
