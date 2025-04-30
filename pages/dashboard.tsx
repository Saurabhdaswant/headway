import React, { useContext } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import Layout from "../components/Layout";
import Head from "next/head";
import { HabitsContext } from "../Providers/HabitsProvider";
import { CalendarIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

function Dashboard() {
  const { habits }: any = useContext(HabitsContext);
  const router = useRouter();

  return (
    <Layout>
      <div className="w-full md:w-[80%] flex h-screen bg-[#F5F5F5] relative overflow-hidden">
        <Head>
          <title>Your Habit Dashboard | Habit Tracker</title>
          <meta
            name="description"
            content="Track and visualize your habits over time."
          />
          <link rel="icon" href="/habstrack.svg" />
        </Head>
        <div className="container mx-auto w-full lg:max-w-[70%]    max-w-[90%]    py-4 lg:py-8">
          <h1 className="text-3xl font-bold  text-[#2e2e2e]  mt-3">
            Your Habits Progress Snapshot
          </h1>
          {habits && habits.length > 0 ? (
            <div className="grid gap-4 max-h-[90%] mt-8  overflow-auto hide-scrollbar">
              {habits.map((habit) => {
                const values = habit?.completedOnDates?.map((date) => {
                  return {
                    date: new Date(date).toISOString().split("T")[0],
                    count: 1,
                  };
                });

                return (
                  <div
                    key={habit?.name}
                    style={{
                      boxShadow: "0px 1px 1px 0px #112A241F",
                    }}
                    className="w-full p-6 bg-white rounded-xl "
                  >
                    <h2 className="text-xl text-[#2e2e2e] font-bold mb-4">
                      {habit?.name}
                    </h2>

                    <CalendarHeatmap
                      startDate={new Date("2024-12-31")}
                      endDate={new Date("2025-12-31")}
                      values={values}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex -mt-10 flex-col h-full items-center justify-center  text-center">
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-gray-200 rounded-full">
                <CalendarIcon className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-xl text-gray-500 max-w-[400px] mb-4">
                No habits to display. Start tracking your habits today!
              </p>

              <motion.button
                onClick={() => router.push("/habits?showAddNewHabitForm=true")}
                whileTap={{
                  scale: 0.9,
                }}
                className={`flex justify-between items-center gap-2 font-medium   bg-[#0F85F2] px-4 py-2.5 rounded-full text-white disabled:cursor-not-allowed`}
              >
                <p>Create Habit</p>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
