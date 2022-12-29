import { useEffect, useState } from "react";
import Image from "next/image";
import { eachDayOfInterval, endOfWeek, format, isEqual, startOfToday, startOfWeek } from 'date-fns'
import {
    CheckCircle,
    PlusSquare,
    TrendingUp,
    Zap,
} from "react-feather";
import { CalendarIcon, ChartBarIcon, CogIcon, UserCircleIcon } from "@heroicons/react/outline";

import AddNewHabit from "../../components/AddNewHabit";
import Head from "next/head";
import Habit from "../../components/Habit";
import Calendar from "../../components/Calendar"

function Habits() {
    const [habits, setHabits] = useState([])
    const times = ["all", "morning", "afternoon", "evening"];
    const [habitTime, setHabitTime] = useState("all")
    const [showAddNewHabitComponent, setShowAddNewHabitComponent] = useState(false);

    const today = startOfToday()
    const [selectedDay, setSelectedDay] = useState(today)
    const week = eachDayOfInterval({ start: startOfWeek(selectedDay), end: endOfWeek(selectedDay) })

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHabits(JSON.parse(localStorage.getItem("Habits")))
        }
    }, [])

    const SideBar = () => {
        return <div className=" z-50 w-[15%] bg-white  ">
            <div className="h-[10%] flex items-center gap-2  justify-center  ">
                <Image
                    src="/headway.svg"
                    alt="Vercel Logo"
                    width={10}
                    height={0}
                />
                <p className=" text-xl font-extrabold  text-gray-900 ">
                    Headway
                </p>
            </div>
            <div className=" flex flex-col justify-between  h-[90%]">
                <ul className="  px-4  ">
                    <li className="py-3 px-4 flex items-center gap-2  rounded-md font-medium bg-[#2e2e2e] text-white my-4">
                        <CalendarIcon className=" w-5 h-5 " /> Habit Tracker
                    </li>
                    <li className="py-4 px-4 flex items-center gap-2  rounded-md font-medium">
                        <ChartBarIcon className=" w-5 h-5 " /> Dashboard
                    </li>
                    <li className="py-4 px-4 flex items-center gap-2  rounded-md font-medium">
                        <UserCircleIcon className=" w-[1.4rem] h-[1.4rem] " /> Profile
                    </li>
                    <li className="py-4 px-4 flex items-center gap-2  rounded-md font-medium">
                        <CogIcon className=" w-[1.4rem] h-[1.4rem]" /> Settings
                    </li>
                </ul>
                <div className=" flex items-center justify-center gap-2 border-t py-4 border-gray-200  ">
                    <div className=" w-12 h-12 bg-slate-300 rounded-full"></div>
                    <p className=" font-medium ">Saurabh</p>{" "}
                </div>
            </div>
        </div>
    }

    const HabitsStats = () => {
        return <div className="grid grid-cols-2 gap-6 p-6 bg-white rounded-md mt-10">
            <div className="flex items-center gap-2 ">
                <div className=" grid place-items-center bg-[#D6FCD8]  text-[#242424] w-10 h-10 rounded-lg ">
                    <TrendingUp className="  w-5 h-5  " />
                </div>
                <div>
                    <p className="text-2xl font-medium ">90%</p>
                    <p className="text-gray-400 text-sm ">
                        Completion Rate
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2 ">
                <div className=" grid place-items-center bg-[#FCF4D6]  text-[#242424] w-10 h-10 rounded-lg ">
                    <Zap className="  w-5 h-5  " />
                </div>
                <div>
                    <p className="text-2xl font-medium ">15</p>
                    <p className="text-gray-400 text-sm ">
                        Current Strike
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2 ">
                <div className=" grid place-items-center bg-[#F0D6FC]  text-[#242424] w-10 h-10 rounded-lg ">
                    <CheckCircle className="  w-5 h-5  " />
                </div>
                <div>
                    <p className="text-2xl font-medium ">80</p>
                    <p className="text-gray-400 text-sm ">
                        Habits Finished
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2 ">
                <div className=" grid place-items-center bg-[#D6F5FC]  text-[#242424] w-10 h-10 rounded-lg ">
                    <TrendingUp className="  w-5 h-5  " />
                </div>
                <div>
                    <p className="text-2xl font-medium ">200</p>
                    <p className="text-gray-400 text-sm ">
                        Perfect Days
                    </p>
                </div>
            </div>
        </div>
    }

    const Ritual = () => {
        return <div className=" mx-auto w-[70%] flex py-8    gap-8  ">
            <div className=" w-[60%]  ">
                <div className="flex justify-between items-end">
                    <div className=" space-y-2 ">
                        {
                            isEqual(selectedDay, today) ?
                                <>
                                    <p className="text-5xl font-bold">Today</p>
                                    <p className="text-gray-400 text-xl">{format(selectedDay, "MMMM dd")}</p>
                                </> : <>
                                    <p className="text-5xl font-bold">{format(selectedDay, "MMMM dd")}</p>
                                    <p className="text-gray-400 text-xl">{format(selectedDay, "eeee")}</p>
                                </>
                        }
                    </div>
                    <button onClick={() => setShowAddNewHabitComponent(true)} className=" flex justify-between items-center gap-2 font-medium  bg-gradient-to-bl from-[#0FC9F2] to-[#0F85F2] px-5 py-2 rounded text-lg text-white">
                        <PlusSquare />
                        <p>Add Habit</p>
                    </button>
                </div>

                <div className="bg-white flex items-center justify-evenly h-20 rounded-md   my-8 ">
                    {week.map((day) => {
                        return (
                            <div
                                onClick={() => setSelectedDay(day)}
                                key={day.toString()}
                                className="text-center space-y-2 cursor-pointer "
                            >
                                <p className=" text-xs capitalize text-gray-400 ">
                                    {format(day, "eee")}
                                </p>
                                <p
                                    className={`font-bold text-lg ${isEqual(selectedDay, day) && "text-[#007BFF]"
                                        } `}
                                >
                                    {format(day, "d")}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className=" flex items-center gap-4 my-8   ">
                    {times.map((time, idx) => {
                        return (
                            <div
                                onClick={() => {
                                    setHabitTime(time)
                                }}
                                key={idx}
                                className={` cursor-pointer font-bold capitalize px-4 py-2  rounded-md ${habitTime === time ? "bg-[#9fc6eb]   text-[#091e32]" : "bg-[#EDEDED]    text-gray-400"}`}
                            >
                                {time}
                            </div>
                        );
                    })}
                </div>
                {
                    habits.length > 0 ? habitTime === times[0] ? habits?.map((habit, idx) => {
                        return <Habit key={idx} habits={habits} setHabits={setHabits} habit={habit} currDate={selectedDay} />
                    }) : habits?.filter(habit => habit.getDoneIn === habitTime).length > 0 ?
                        habits?.filter(habit => habit.getDoneIn === habitTime)?.map((habit, idx) => {
                            return <Habit key={idx} habits={habits} setHabits={setHabits} habit={habit} currDate={selectedDay} />
                        }) : <p>No habits in {habitTime}!</p> : <p>No habits today!</p>
                }
            </div>
            <div>
                <HabitsStats />
                <Calendar currDate={selectedDay} setCurrDate={setSelectedDay} />
                {showAddNewHabitComponent ?
                    <AddNewHabit habits={habits} setHabits={setHabits} setShowAddNewHabitComponent={setShowAddNewHabitComponent} /> : null}
            </div>
        </div >
    }

    return (
        <div className="flex h-screen bg-[#F5F5F5]">
            <Head>
                <title>Habits | Headway</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/headway.svg" />
            </Head>
            <SideBar />
            <Ritual />
        </div >
    );
}

export default Habits;
