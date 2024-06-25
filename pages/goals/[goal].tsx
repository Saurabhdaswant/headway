import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../constants";
import { format, startOfToday, formatDistance } from "date-fns";
import { Calendar, Plus } from "react-feather";
import { AnimatePresence } from "framer-motion";
import HabitForm from "../../components/HabitForm";
import { weekDays } from "../../components/constants";
import { Habits as HabitsRenderer } from "../../components/Habits";
import Layout from "../../components/Layout";

export default function Goal() {
  const router = useRouter();
  const { goal: id } = router.query;
  const [goal, setGoal] = useState<any>();
  const today = startOfToday();
  const [error, setError] = useState(false);
  const [token, setToken] = useState(null);
  const [showHabitForm, setShowHabitForm] = useState(false);

  const newHabit = {
    name: "",
    getDoneIn: "anytime",
    color: "",
    completedOnDates: [],
    createdDate: today,
    repeatHabitDays: weekDays,
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("authToken");

      if (!token) {
        window.location.href = "/login";
      }

      setToken(token);
    }
  }, []);

  useEffect(() => {
    const token = localStorage && localStorage?.getItem("authToken");

    async function getGoals() {
      const res = await fetch(`${API_ENDPOINTS.BASE_URL}/goals/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const goal = await res.json();

      setGoal(goal);
    }

    if (id) {
      if (token && id) {
        getGoals();
      }
    }
  }, [id]);

  const handleCreateHabit = async (habit) => {
    if (habit.name.trim().length === 0) {
      setError(true);
      return;
    } else {
      setError(false);

      if (habit.getDoneIn === "") {
        habit.getDoneIn = "anytime";
      }

      const res = await fetch(
        `${API_ENDPOINTS.BASE_URL}/goals/addHabit/${goal._id}`,
        {
          method: "PUT",
          body: JSON.stringify({ habit }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      const newHabits = [...(goal.habits || []), data.habit];
      setGoal({ ...goal, habits: newHabits });
      setShowHabitForm(false);
    }
  };

  return (
    <Layout>
      <div className=" mx-auto  pt-10">
        <div className="z-10">
          <p className=" font-bold text-4xl  text-[#272727] capitalize   ">
            {" "}
            {goal?.name}
          </p>
          <p className=" font-normal text-gray-600  mt-6    ">
            {goal?.description}
          </p>
        </div>{" "}
        <div className="flex mt-8 items-center gap-1">
          <Calendar strokeWidth="2" size="20" />
          <p
            className={`text-sm font-medium    capitalize    rounded-full    text-gray-600 `}
          >
            started on
          </p>

          <p
            className={`text-sm py-1    capitalize  font-bold    rounded-full    text-gray-900 `}
          >
            {goal ? format(new Date(goal?.createdDate), "MM/dd/yyyy") : null}
          </p>
        </div>
        <div className="flex items-center gap-4 mt-10">
          <div className="p-6 bg-gray-100 rounded-lg">
            <p className={`    capitalize    rounded-full    text-gray-600 `}>
              deadline date
            </p>
            <p
              className={` text-4xl font-black py-1    capitalize     rounded-full    text-gray-900 `}
            >
              {goal ? format(new Date(goal?.deadlineDate), "MM/dd/yyyy") : null}
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg">
            <p className={`    capitalize    rounded-full    text-gray-600 `}>
              time left
            </p>
            <p
              className={` text-4xl font-black py-1    capitalize    rounded-full    text-gray-900 `}
            >
              {goal
                ? formatDistance(today, new Date(goal?.deadlineDate))
                : null}
            </p>
          </div>
        </div>
        <div
          onClick={() => {
            setShowHabitForm(true);
          }}
          className="flex mt-8 items-center gap-1"
        >
          <Plus strokeWidth="2" size="20" />
          <p
            className={`text-sm font-medium    capitalize    rounded-full    text-gray-600 `}
          >
            Add Habits
          </p>
        </div>
        <HabitsRenderer habits={goal?.habits} selectedDay={today} />
        <AnimatePresence>
          {showHabitForm ? (
            <HabitForm
              formTitle="Add New Habit"
              habit={newHabit}
              setShowHabitForm={setShowHabitForm}
              handleSubmit={handleCreateHabit}
              error={error}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
