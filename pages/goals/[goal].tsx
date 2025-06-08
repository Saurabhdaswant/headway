import { TrashIcon } from "@heroicons/react/outline";
import {
  differenceInDays,
  format,
  formatDistance,
  parseISO,
  startOfToday,
} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Calendar, Check, Plus } from "react-feather";
import { weekDays } from "../../components/constants";
import HabitForm from "../../components/HabitForm";
import { HabitsRenderer } from "../../components/HabitsRenderer";
import Layout from "../../components/Layout";
import { API_ENDPOINTS } from "../../constants";
import { GoalContext } from "../../Providers/GoalProvider";
import Head from "next/head";

export default function Goal() {
  const { goal, updateGoal } = useContext(GoalContext);

  const router = useRouter();
  const { goal: id } = router.query;
  const today = startOfToday();

  const [error, setError] = useState(false);
  const [token, setToken] = useState(null);
  const [showHabitForm, setShowHabitForm] = useState(false);
  // const { habits, updateHabits } = useContext(HabitsContext);

  const [showHabits, setShowHabits] = useState(true);

  const newHabit = {
    name: "",
    getDoneIn: "anytime",
    color: "",
    completedOnDates: [],
    createdDate: today,
    repeatHabitDays: weekDays,
  };

  const [milestone, setMilestone] = useState({
    name: "",
    isCompleted: false,
  });

  const [milestones, setMilestones] = useState(
    (goal && goal?.milestones) || []
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("authToken");

      if (!token) {
        window.location.href = "/login";
      }

      setToken(token);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  async function getGoal(token) {
    const res = await fetch(`${API_ENDPOINTS.BASE_URL}/goals/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const goal = await res.json();
    updateGoal(goal);
  }

  useEffect(() => {
    const token = localStorage && localStorage?.getItem("authToken");

    if (id) {
      if (token && id) {
        getGoal(token as any);
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
      // updateHabits([...habits, data.habit]);

      updateGoal({ ...goal, habits: newHabits });
      setShowHabitForm(false);
      await getGoal(token as any);
    }
  };

  const handleCreateMilestone = async (milestone) => {
    if (milestone.name.trim().length === 0) {
      return;
    } else {
      const res = await fetch(
        `${API_ENDPOINTS.BASE_URL}/goals/addMilestone/${goal._id}`,
        {
          method: "PUT",
          body: JSON.stringify({ milestone }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setMilestones([...(milestones || []), data.milestone]);
      setMilestone({
        name: "",
        isCompleted: false,
      });
    }
  };

  function calculateProgress(goal) {
    const totalDays = differenceInDays(
      parseISO(goal?.deadlineDate),
      parseISO(goal?.createdDate)
    );
    const currentDate = parseISO(format(new Date(), "yyyy-MM-dd"));
    const elapsedDays = differenceInDays(
      currentDate,
      parseISO(goal?.createdDate)
    );
    const ratio = elapsedDays / totalDays;
    const number = 10 + 90 * ratio;

    return number;
  }

  return (
    <Layout>
      <Head>
        <title>Goal | Habstrack</title>
        <meta
          name="description"
          content="Goal details and progress tracking on Habstrack"
        />
        <link rel="icon" href="/habstrack.svg" />
      </Head>
      <div className=" w-full md:w-[80%] h-[100vh]  bg-[#F5F5F5]   overflow-auto pt-10">
        <div className="mx-auto overflow-hidden  max-w-[800px]">
          <motion.div
            layoutId={`${goal?._id}_image`}
            layout="position"
            style={{
              backgroundImage: `url(${goal?.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="h-[300px] w-full rounded-lg mb-8 overflow-hidden gap-2"
          ></motion.div>
          <div className="z-10">
            <motion.p
              layoutId={`${goal?.name}_name`}
              layout="position"
              className=" font-semibold text-2xl   text-[#272727] capitalize   "
            >
              {goal?.name}
            </motion.p>
            <motion.p
              layoutId={`${goal?.description}_description`}
              layout="position"
              className=" font-normal text-gray-600  mt-6    "
            >
              {goal?.description}
            </motion.p>
          </div>
          <div className="flex mt-8 items-center gap-1">
            <Calendar strokeWidth="2" size="20" />
            <p
              className={`text-sm font-medium    capitalize    rounded-full    text-gray-600 `}
            >
              started on
            </p>

            <p
              className={`text-sm py-1    capitalize  font-normal    rounded-full    text-gray-900 `}
            >
              {goal && goal?.createdDate
                ? format(new Date(goal?.createdDate), "PP")
                : null}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-10">
            <div className="p-4 bg-white rounded-lg">
              <motion.p
                layout="position"
                layoutId={`${goal.name}_deadline_title`}
                className={`    capitalize    rounded-full    text-gray-600 `}
              >
                Deadline
              </motion.p>
              <motion.p
                layout="position"
                layoutId={`${goal?.deadlineDate}_deadline_value`}
                className={` text-2xl font-black py-1    capitalize     rounded-full    text-gray-900 `}
              >
                {goal && goal?.deadlineDate
                  ? format(new Date(goal?.deadlineDate), "PP")
                  : null}
              </motion.p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <motion.p
                layout="position"
                layoutId={`${goal.name}_remaining_title`}
                className={`    capitalize    rounded-full    text-gray-600 `}
              >
                Remaining
              </motion.p>
              <motion.p
                layout="position"
                layoutId={`${goal.name}_remaining_value`}
                className={` text-2xl font-black py-1    capitalize    rounded-full    text-gray-900 `}
              >
                {goal && goal?.deadlineDate
                  ? formatDistance(today, new Date(goal?.deadlineDate))
                  : null}
              </motion.p>
            </div>
            <div className="p-4  bg-white rounded-lg">
              <p className={`    capitalize    rounded-full    text-gray-600 `}>
                Time Indicator
              </p>
              <div className="relative mt-4 pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${calculateProgress(goal)}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-400"
                  ></div>
                </div>
              </div>
              {/* <span className="text-sm text-gray-600">40%</span> */}
            </div>{" "}
          </div>
          <div className=" w-full max-w-fit p-1 rounded-md bg-gray-200   mt-8 flex justify-center">
            <button
              onClick={() => setShowHabits(true)}
              className={`
               py-2 px-4 rounded-md capitalize
              ${showHabits && "text-[#242424] bg-white shadow-md "} 
             `}
            >
              habits
            </button>
            <button
              onClick={() => setShowHabits(false)}
              className={`
              ${
                !showHabits && "bg-white shadow-md text-[#242424]"
              }  py-2 px-4 rounded-md capitalize`}
            >
              milestones
            </button>
          </div>
          {showHabits && (
            <>
              <div className="w-full flex justify-between">
                <div
                  onClick={() => {
                    setShowHabitForm(true);
                  }}
                  className="flex mt-8 cursor-pointer items-center gap-1 hover:bg-gray-200 py-1.5 p-2 rounded-md"
                >
                  <Plus strokeWidth="2" size="20" color="#4b5563" />
                  <p
                    className={`text-sm font-medium    capitalize    rounded-full    text-gray-600 `}
                  >
                    Add Habit
                  </p>
                </div>
              </div>
              <div className=" scrollbar-hide h-[70vh] mt-2 pb-10   overflow-auto mx-auto  max-w-[800px]">
                <HabitsRenderer habits={goal?.habits} selectedDay={today} />
              </div>
            </>
          )}

          {!showHabits && (
            <div className="my-4">
              <input
                onChange={(e) =>
                  setMilestone({
                    ...milestone,
                    name: e.target.value,
                  })
                }
                value={milestone.name}
                name="habitName"
                id="habitName"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreateMilestone(milestone);
                  }
                }}
                className={`
							outline-none focus:border-[#0F85F2] w-full font-medium 
							border-2    px-4 py-3 shadow-md rounded-xl
            border-zinc-200
              `}
              />

              <div className=" scrollbar-hide h-[70vh] mt-2 pb-10   overflow-auto mx-auto  max-w-[800px]">
                <div className="space-y-2 mt-2 pb-4">
                  {milestones.map((milestone, idx) => {
                    return (
                      <Milestone
                        key={idx}
                        idx={idx}
                        setMilestones={setMilestones}
                        milestones={milestones}
                        milestone={milestone}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
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
    </Layout>
  );
}

const Milestone = ({ idx, setMilestones, milestones, milestone }) => {
  const { isCompleted, name } = milestone;

  const handleInput = (e: any) => {
    let newMilestones = [...milestones];
    newMilestones[idx].name = e.target.value;
    setMilestones(newMilestones);
  };

  return (
    <div
      className="rounded-xl flex items-center gap-4  p-3 w-full bg-white"
      key={idx}
    >
      <div
        onClick={() => {
          let newMilestones = [...milestones];
          newMilestones[idx].isCompleted = !isCompleted;
          setMilestones(newMilestones);
        }}
        className={` cursor-pointer border-2  grid place-items-center bg-white ${
          isCompleted
            ? " border-[#27b562ef]  text-[#27b562ef]"
            : " text-gray-200"
        } min-w-8 min-h-8 rounded-full shadow-lg  `}
      >
        <Check className="  w-4 h-4  stroke-3" />
      </div>

      <input
        value={name}
        onChange={handleInput}
        className={` w-full ${
          isCompleted
            ? "line-through"
            : "bg-none w-full border-none outline-none "
        }`}
      />
      <TrashIcon
        onClick={() => {
          const filteredMilestones = milestones.filter(
            (_, index) => index !== idx
          );
          setMilestones(filteredMilestones);
        }}
        className="hover:cursor-pointer w-6"
      />
    </div>
  );
};
