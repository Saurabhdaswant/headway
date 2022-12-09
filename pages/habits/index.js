import { useEffect, useState } from "react";
import Image from "next/image";
import {
    BookOpen,
    Calendar,
    Check,
    CheckCircle,
    PlusSquare,
    TrendingUp,
    Wind,
    Zap,
} from "react-feather";
import {
    CartesianGrid,
    YAxis,
    ResponsiveContainer,
    AreaChart,
    Area,
} from "recharts";
import AddNewHabit from "../../components/AddNewHabit";
import Head from "next/head";

function Habits() {
    const [habits, setHabits] = useState([])
    const [showAddNewHabitComponent, setShowAddNewHabitComponent] = useState(false);
    const habitCompletionData = [
        { name: "10 Nov", completedHabits: 0 },
        { name: "11 Nov", completedHabits: 10 },
        { name: "12 Nov", completedHabits: 8 },
        { name: "14 Nov", completedHabits: 15 },
        { name: "14 Nov", completedHabits: 12 },
    ];
    const week = [
        { date: 12, day: "sunday" },
        { date: 13, day: "monday" },
        { date: 14, day: "tuesday" },
        { date: 14, day: "wednesday" },
        { date: 15, day: "thursday" },
        { date: 16, day: "friday" },
        { date: 17, day: "saturday" },
    ];
    const times = ["all", "morning", "afernoon", "evening"];
    const [habitTime, setHabitTime] = useState("all")

    const currentDate = new Date().getDate()
    const currentMonth = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date());
    const today = `${currentMonth} ${currentDate}`

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHabits(JSON.parse(localStorage.getItem("Habits")))
        }
    }, [])

    const SideBar = () => {
        return <div className=" z-50 w-[15%] bg-white ">
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
            <ul className="h-[80%] max-h-[80%]  px-4 ">
                <li className="py-4 px-4 flex items-center gap-2  rounded-md font-medium">
                    <Calendar className=" w-5 h-5 " /> Rituals
                </li>
                <li className="py-3 px-4 flex items-center gap-2  rounded-md font-medium bg-[#2e2e2e] text-white my-4">
                    <Wind className=" w-5 h-5 " /> Meditations
                </li>
                <li className="py-4 px-4 flex items-center gap-2  rounded-md font-medium">
                    <Zap className=" w-5 h-5 " /> Workout
                </li>
                <li className="py-4 px-4 flex items-center gap-2  rounded-md font-medium">
                    <BookOpen className=" w-5 h-5 " /> Jounal
                </li>
            </ul>
            <div className="h-[10%] flex items-center justify-center gap-2 border-t border-gray-200  ">
                <div className=" w-12 h-12 bg-slate-300 rounded-full"></div>
                <p className=" font-medium ">Saurabh</p>{" "}
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

    const HabitsCompletionChart = () => {
        return <div className="bg-white mt-10 p-6 pl-0 rounded-md">
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={habitCompletionData}>
                    <defs>
                        <linearGradient
                            id="colorPv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#0F85F2"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="#0F85F2"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="completedHabits"
                        stroke="#0F85F2"
                        fillOpacity={1}
                        fill="url(#colorPv)"
                    />
                    <YAxis
                        dataKey="completedHabits"
                        axisLine={false}
                        tickLine={false}
                        tickCount={8}
                        tickFormatter={number => `${number} k`}
                    />
                    <CartesianGrid
                        vertical={false}
                        stroke="#2a2a2a"
                        opacity={0.1}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    }

    const Ritual = () => {
        return <div className=" mx-auto w-[70%] flex py-8    gap-8  ">
            <div className=" w-[60%]  ">
                <div className="flex justify-between items-end">
                    <div className=" space-y-2 ">
                        <p className="text-5xl font-bold">Today</p>
                        <p className="text-gray-400 text-xl">{today}</p>
                    </div>
                    <button onClick={() => setShowAddNewHabitComponent(true)} className=" flex justify-between items-center gap-2 font-medium  bg-gradient-to-bl from-[#0FC9F2] to-[#0F85F2] px-5 py-2 rounded text-lg text-white">
                        <PlusSquare />
                        <p>Add Habit</p>
                    </button>
                </div>

                <div className="bg-white flex items-center justify-evenly h-20 rounded-md   my-8 ">
                    {week.map((Day, idx) => {
                        const { day, date } = Day;
                        return (
                            <div
                                key={idx}
                                className="text-center space-y-2 "
                            >
                                <p className=" text-xs capitalize text-gray-400 ">
                                    {day}
                                </p>
                                <p
                                    className={`font-bold text-lg ${12 === date && "text-[#007BFF]"
                                        } `}
                                >
                                    {date}
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
                    habitTime === times[0] ? habits?.map((habit, idx) => {
                        return (
                            <div
                                key={idx}
                                className="flex items-center justify-between"
                            >
                                {
                                    <div onClick={() => {
                                        const idx = habits?.findIndex((h) => h.name === habit.name)
                                        habits[idx].isCompleted = !habits[idx].isCompleted
                                        if (typeof window !== "undefined") {
                                            localStorage.setItem("Habits", JSON.stringify([...habits]))
                                        }
                                        setHabits([...habits])
                                    }} className={` cursor-pointer border-4 grid place-items-center bg-white ${habit.isCompleted ? "border-[#27B563]  text-[#27B563]" : " text-gray-200"} w-14 h-14 rounded-full shadow-lg  `}>
                                        <Check className="  w-8 h-8  stroke-3" />
                                    </div>
                                }
                                <div
                                    className={`p-2 h-14 w-[85%] flex items-center  font-bold my-4 text-[#2e2e2e]   border-l-4 border-${habit.color} bg-white   `}
                                >
                                    {habit.name}
                                </div>
                            </div>
                        );
                    }) :
                        habits?.filter(habit => habit.getDoneIn === habitTime)?.map((habit, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between"
                                >
                                    {
                                        <div onClick={() => {
                                            const idx = habits.findIndex((h) => h.name === habit.name)
                                            habits[idx].isCompleted = !habits[idx].isCompleted
                                            setHabits([...habits])
                                        }} className={` cursor-pointer border-4 grid place-items-center bg-white ${habit.isCompleted ? "border-[#27B563]  text-[#27B563]" : " text-gray-200"} w-14 h-14 rounded-full shadow-lg  `}>
                                            <Check className="  w-8 h-8  stroke-3" />
                                        </div>
                                    }
                                    <div
                                        className={`p-2 h-14 w-[85%] flex items-center  font-bold my-4 text-[#2e2e2e]  border-l-4 border-${habit.color} bg-white   `}
                                    >
                                        {habit.name}
                                    </div>
                                </div>
                            );
                        })}
            </div>
            <div>
                <HabitsStats />
                <HabitsCompletionChart />
                {showAddNewHabitComponent ?
                    <AddNewHabit habits={habits} setHabits={setHabits} setShowAddNewHabitComponent={setShowAddNewHabitComponent} /> : null}
            </div>
        </div>
    }

    return (
        <div className="flex h-screen bg-[#F5F5F5]">
            <Head>
                <title>Ritual | Headway</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/headway.svg" />
            </Head>
            <SideBar />
            <Ritual />
        </div >
    );
}

export default Habits;
