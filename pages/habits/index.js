import { useState } from "react";
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
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
} from "recharts";
import AddNewHabit from "../../components/AddNewHabit";

function Habits() {
    const [showAddNewHabitComponent, setShowAddNewHabitComponent] = useState(false);

    const data = [
        { name: "10 Nov", completedHabits: 0 },
        { name: "11 Nov", completedHabits: 10 },
        { name: "12 Nov", completedHabits: 8 },
        { name: "14 Nov", completedHabits: 15 },
        { name: "14 Nov", completedHabits: 12 },
    ];

    const [habits, setHabits] = useState([
        {
            name: "Workout",
            isCompleted: true,
            date: "12-11-2022",
            color: "color1",
        },

        {
            name: "Read",
            isCompleted: false,
            date: "12-11-2022",
            color: "color4",
        },
        {
            name: "code",
            isCompleted: true,
            date: "12-11-2022",
            color: "color6",
        },
    ])

    // const currDayHabits = [
    //     {
    //         name: "Workout",
    //         isCompleted: true,
    //         date: "12-11-2022",
    //         color: "color1",
    //     },

    //     {
    //         name: "Read",
    //         isCompleted: true,
    //         date: "12-11-2022",
    //         color: "color4",
    //     },
    //     // {
    //     // 	name: "meditate",
    //     // 	isCompleted: false,
    //     // 	date: "12-11-2022",
    //     // 	color: "color5",
    //     // },
    //     {
    //         name: "code",
    //         isCompleted: true,
    //         date: "12-11-2022",
    //         color: "color6",
    //     },
    // ];

    const weekDays = [
        { date: 12, day: "sunday" },
        { date: 13, day: "monday" },
        { date: 14, day: "tuesday" },
        { date: 14, day: "wednesday" },
        { date: 15, day: "thursday" },
        { date: 16, day: "friday" },
        { date: 17, day: "saturday" },
    ];

    const periods = ["all", "evening", "morning", "afernoon", "night"];

    // html, csss, react, redux, stylecompoent, routing, charting, typscript

    return (
        <div className="flex h-screen bg-[#F5F5F5]">
            <div className=" w-[15%] bg-white ">
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
            <div className=" mx-auto w-[70%] flex py-8    gap-8  ">
                <div className=" w-[60%]  ">
                    <div className="flex justify-between items-end">
                        <div className=" space-y-2 ">
                            <p className="text-5xl font-bold">Today</p>
                            <p className="text-gray-400 text-xl">October 18</p>
                        </div>
                        <button onClick={() => setShowAddNewHabitComponent(true)} className=" flex justify-between items-center gap-2 font-medium  bg-gradient-to-bl from-[#0FC9F2] to-[#0F85F2] px-5 py-2 rounded text-lg text-white">
                            <PlusSquare />
                            <p>Add Habit</p>
                        </button>
                    </div>

                    <div className="bg-white flex items-center justify-evenly h-20 rounded-md   my-8 ">
                        {weekDays.map((Day, idx) => {
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
                        {periods.map((period, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className={`font-bold capitalize px-4 py-2  rounded-md bg-[#EDEDED]
								  text-gray-400`}
                                >
                                    {period}
                                </div>
                            );
                        })}
                    </div>

                    {habits.map((habit, idx) => {
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
                                    }} className={`border-4 grid place-items-center bg-white ${habit.isCompleted ? "border-[#27B563]  text-[#27B563]" : " text-gray-200"} w-14 h-14 rounded-full shadow-lg  `}>
                                        <Check className="  w-8 h-8  stroke-3" />
                                    </div>
                                }
                                <div
                                    className={`p-2 h-14 w-[85%] flex items-center  font-bold my-4  bg-white ${habit.color} `}
                                >
                                    {habit.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <div className="grid grid-cols-2 gap-6 p-6 bg-white rounded-md mt-10">
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
                    <div className="bg-white mt-10 p-6 pl-0 rounded-md">
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={data}>
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
                    {showAddNewHabitComponent ?
                        <AddNewHabit habits={habits} setHabits={setHabits} setShowAddNewHabitComponent={setShowAddNewHabitComponent} /> : null}
                </div>
            </div>
        </div >
    );
}

export default Habits;
