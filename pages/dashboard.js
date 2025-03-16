import React, { useContext } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import Layout from "../components/Layout";
import Head from "next/head";
import { HabitsContext } from "../Providers/HabitsProvider";

function Dashboard() {
  const { habits } = useContext(HabitsContext);

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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
          <h1 className="text-3xl font-bold text-[#2e2e2e] mb-6">
            Your Habits Progress Snapshot
          </h1>
          <div className="grid gap-4 max-h-[95%] overflow-auto hide-scrollbar">
            {habits
              ?.filter((habit) => !habit.hide)
              ?.map((habit) => {
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
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
