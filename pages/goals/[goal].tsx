import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../constants";
import { format, startOfToday, formatDistance, add } from "date-fns";
import { Calendar, Plus } from "react-feather";
import { AnimatePresence } from "framer-motion";
import HabitForm from "../../components/HabitForm";
import { weekDays } from "../../components/constants";
import { Habits as HabitsRenderer } from "../../components/Habits";
import Layout from "../../components/Layout";
import { HabitsContext } from "../../Providers/HabitsProvider";

export default function Goal() {
  const router = useRouter();
  const { goal: id } = router.query;
  const today = startOfToday();
  const dateWhichIsAfterCurrDate = add(today, {
    days: 309,
  });
  const [goal, setGoal] = useState<any>({
    _id: "667995f1215fdf5b00ddd8cf",
    name: "Design Engineer $80k to $100k",
    description:
      "It's more than just a financial target. It's about a promise and commitment. I aim to marry the love of my life, Shreya. To earn her family's trust and show my dedication, I understand the need to distinguish myself from the crowd, both in ambition and achievement. It's imp to show that I can provide and care for our future.",
    createdDate: today,
    deadlineDate: dateWhichIsAfterCurrDate,
    habits: [
      {
        name: "Follow Skin Care Routine",
        getDoneIn: "anytime",
        color: "",
        completedOnDates: [],
        createdDate: "2024-06-26T18:30:00.000Z",
        repeatHabitDays: [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ],
        _id: "667d72461927d4e7b89bb418",
        userId: "6624da6f5aabb9dd2417e67f",
        goalId: "667995f1215fdf5b00ddd8cf",
      },
    ],
  });
  const [error, setError] = useState(false);
  const [token, setToken] = useState(null);
  const [showHabitForm, setShowHabitForm] = useState(false);
  const { habits, updateHabits } = useContext(HabitsContext);

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

      // setGoal(goal);
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
      updateHabits([...habits, data.habit]);

      setGoal({ ...goal, habits: newHabits });
      setShowHabitForm(false);
    }
  };

  return (
    <Layout>
      <div className=" w-full md:w-[80%] h-[100vh]  relative bg-[#F5F5F5]  overflow-auto pt-10">
        <div className="mx-auto  max-w-[800px]">
          <div
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1579880251397-2c3ed174a774?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="  h-[300px] w-full rounded-lg mb-8  overflow-hidden  gap-2"
          ></div>
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
          <div className="grid grid-cols-3 gap-4 mt-10">
            <div className="p-6  bg-white rounded-lg">
              <p className={`    capitalize    rounded-full    text-gray-600 `}>
                Progress
              </p>
              <div className="relative mt-4 pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${40}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
              </div>
              {/* <span className="text-sm text-gray-600">40%</span> */}
            </div>{" "}
            <div className="p-6 bg-white rounded-lg">
              <p className={`    capitalize    rounded-full    text-gray-600 `}>
                deadline date
              </p>
              <p
                className={` text-2xl font-black py-1    capitalize     rounded-full    text-gray-900 `}
              >
                {goal ? format(new Date(goal?.deadlineDate), "PPP") : null}
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg">
              <p className={`    capitalize    rounded-full    text-gray-600 `}>
                time left
              </p>
              <p
                className={` text-2xl font-black py-1    capitalize    rounded-full    text-gray-900 `}
              >
                {goal
                  ? formatDistance(today, new Date(goal?.deadlineDate))
                  : null}
              </p>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div className="flex mt-8 cursor-pointer items-center gap-1">
              <p className={`font-bold    capitalize    rounded-full    `}>
                Habits
              </p>
            </div>
            <div
              onClick={() => {
                setShowHabitForm(true);
              }}
              className="flex mt-8 cursor-pointer items-center gap-1"
            >
              <Plus strokeWidth="2" size="20" />
              <p
                className={`text-sm font-medium    capitalize    rounded-full    text-gray-600 `}
              >
                Add Habit
              </p>
            </div>
          </div>
        </div>

        <div className=" scrollbar-hide h-[70vh] mt-2 pb-10   overflow-auto mx-auto  max-w-[800px]">
          <HabitsRenderer habits={goal?.habits} selectedDay={today} />
        </div>
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
