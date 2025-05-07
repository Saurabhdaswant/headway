import Head from "next/head";

import { format, startOfToday, sub } from "date-fns";
const { formatDistance } = require("date-fns");
import Cookies from "js-cookie";

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

const imgLookup = {
  "6692142d0cb77b89a9a2c441":
    "https://images.unsplash.com/photo-1579880251397-2c3ed174a774?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "669211210cb77b89a9a2c440":
    "https://images.unsplash.com/photo-1601141256817-c60897f2776a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  2: "https://images.unsplash.com/photo-1614152412509-7a5afc18c75b?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  3: "https://plus.unsplash.com/premium_photo-1661954372617-15780178eb2e?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

function Goals() {
  const [showDeleteDialog, toggleDeleteDialog] = useToggle(false);

  const [showHabitForm, setShowHabitForm] = useState(false);
  const today = startOfToday();
  const [error, setError] = useState(false);
  const [token, setToken] = useState(null);
  // const [goals, setGoals] = useState([
  //   {
  //     _id: "669211210cb77b89a9a2c440",
  //     name: "get jacked",
  //     description:
  //       "I hit the gym to boost my sexual market value and attract women. Women are naturally drawn to a man with looks, strength, and discipline. Being jacked signals that I take care of myself, which automatically sets me apart from others. Getting in shape means looking like the best version of myself, standing out, and attracting more attention from women. It’s about bringing something valuable to the table—looks are the first thing they notice, and being jacked shows that I’m serious about my life and my goals\n\n",
  //     createdDate: "2024-07-07T18:30:00.000Z",
  //     deadlineDate: "2024-07-30T18:30:00.000Z",
  //     userId: "6624da6f5aabb9dd2417e67f",
  //     habits: [],
  //   },
  //   {
  //     _id: "6692142d0cb77b89a9a2c441",
  //     name: "Become a Design Engineer 💰 $80K ",
  //     description:
  //       "It's more than just a financial target. It's about a promise and commitment. I aim to marry the love of my life, Shreya. To earn her family's trust and show my dedication, I understand the need to distinguish myself from the crowd, both in ambition and achievement. It's imp to show that I can provide and care for our future.",
  //     createdDate: "2022-12-01T00:00:00.000Z",
  //     deadlineDate: "2025-05-30T18:30:00.000Z",
  //     userId: "6624da6f5aabb9dd2417e67f",
  //     habits: [
  //       {
  //         name: "Build Framer Motion Component",
  //         getDoneIn: "morning",
  //         color: "",
  //         completedOnDates: [
  //           "2024-08-08T18:30:00.000Z",
  //           "2024-08-09T18:30:00.000Z",
  //           "2024-08-10T18:30:00.000Z",
  //           "2024-08-11T18:30:00.000Z",
  //           "2024-08-17T18:30:00.000Z",
  //           "2024-08-19T18:30:00.000Z",
  //           "2024-09-09T18:30:00.000Z",
  //           "2024-09-15T18:30:00.000Z",
  //           "2024-09-25T18:30:00.000Z",
  //           "2024-09-26T18:30:00.000Z",
  //           "2024-09-27T18:30:00.000Z",
  //         ],
  //         createdDate: "2024-07-28T18:30:00.000Z",
  //         repeatHabitDays: [
  //           "monday",
  //           "tuesday",
  //           "wednesday",
  //           "thursday",
  //           "friday",
  //           "saturday",
  //           "sunday",
  //         ],
  //         userId: "6624da6f5aabb9dd2417e67f",
  //         why: "We're mastering Framer Motion to skyrocket our design skills, earning a $300k salary and the keys to our Range Rover—design is our ticket to the top.",
  //         hide: true,
  //         _id: "66a791164a4b632fc1d4cfc6",
  //         goalId: "6692142d0cb77b89a9a2c441",
  //       },
  //     ],
  //     milestones: [
  //       {
  //         name: "get a kickass job",
  //         isCompleted: false,
  //         _id: "6694a7a565197ff05d1b8d96",
  //         userId: "6624da6f5aabb9dd2417e67f",
  //         goalId: "6692142d0cb77b89a9a2c441",
  //       },
  //       {
  //         name: "sdsdfjsldfj",
  //         isCompleted: false,
  //         _id: "6741a37ff7c0994321c3bef9",
  //         userId: "6624da6f5aabb9dd2417e67f",
  //         goalId: "6692142d0cb77b89a9a2c441",
  //       },
  //     ],
  //   },
  // ]);

  const [goals, setGoals] = useState([]);

  useEffect(() => {
    // const token = localStorage && localStorage?.getItem("authToken");
    const token = Cookies.get("token");

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
      // const token = window.localStorage.getItem("authToken");
      const token = Cookies.get("token");

      if (!token) {
        // window.location.href = "/login";
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
  };

  const router = useRouter();

  const handleCreateGoal = async (goal) => {
    const res = await fetch(`${API_ENDPOINTS.BASE_URL}/goal`, {
      method: "POST",
      body: JSON.stringify({
        goal,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const newgoal = await res.json();

    setGoals([...goals, newgoal]);
    setShowHabitForm(false);
  };

  return (
    <Layout>
      <div className="flex h-screen bg-[#F5F5F5] relative overflow-hidden w-full md:w-[80%]">
        <Head>
          <title>HabitTracker | Habstrack</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/habstrack.svg" />
        </Head>
        <div className=" mx-auto w-full  flex justify-between py-4 lg:py-8     lg:gap-8   ">
          <main className=" mx-auto w-full max-w-[70%]  ">
            <Header setShowHabitForm={setShowHabitForm} />
            <div className=" space-y-4   mt-8 gap-4 pb-5 items-start scrollbar-hide h-[87vh]   overflow-auto ">
              {goals?.map((goal: any, idx) => {
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
                      {/* <TrashIcon
                        className="w-6 h-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDeleteDialog();
                        }}
                      />{" "} */}
                    </div>
                    <motion.div
                      layoutId={`${goal._id}_image`}
                      style={{
                        backgroundImage: `url(${imgLookup[goal._id]})`,
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
              })}
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
                // localStorage.removeItem("authToken");

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
