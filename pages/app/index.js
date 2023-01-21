import { useEffect, useState } from "react";
import {
    eachDayOfInterval,
    endOfWeek,
    format,
    isEqual,
    startOfToday,
    startOfWeek,
} from "date-fns";
import { Clipboard, PlusSquare } from "react-feather";
import { v4 as uuidv4 } from 'uuid';

import Head from "next/head";
import Habit from "../../components/Habit";
import Calendar from "../../components/Calendar";
import Sidebar from "../../components/Sidebar";
import HabitsStats from "../../components/HabitsStats";
import { colors, doitat } from "../../components/constants";
import HabitForm from "../../components/HabitForm";

const NoHabits = ({ text }) => {
    return (
        <div className=" flex flex-col gap-4 items-center ">
            <Clipboard className="w-20 h-20" />
            <p className=" text-gray-400 w-full text-center">{text}</p>
        </div>
    );
};

const Habits = ({ selectedDay, habits, setHabits }) => {
    const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("anytime");
    const byTime = habit => habit.getDoneIn === selectedTimeOfDay;

    return (
        <>
            <div className=" flex items-center gap-4 my-8   ">
                {doitat.map((time, idx) => {
                    return (
                        <div
                            onClick={() => setSelectedTimeOfDay(time)}
                            key={idx}
                            className={` cursor-pointer font-bold capitalize px-4 py-2  rounded-md ${selectedTimeOfDay === time
                                ? "bg-[#9fc6eb]   text-[#091e32]"
                                : "bg-[#EDEDED]    text-gray-400"
                                }`}
                        >
                            {time}
                        </div>
                    );
                })}
            </div>
            <div className=" scrollbar-hide h-[44vh]  overflow-auto ">
                {habits?.length > 0 ? (
                    selectedTimeOfDay === doitat[0] ? (
                        habits?.map((habit) => {
                            return (
                                <Habit
                                    key={habit.id}
                                    habits={habits}
                                    setHabits={setHabits}
                                    habit={habit}
                                    currDate={selectedDay}
                                />
                            );
                        })
                    ) : habits?.filter(byTime).length > 0 ? (
                        habits?.filter(byTime)?.map((habit) => {
                            return (
                                <Habit
                                    key={habit.id}
                                    habits={habits}
                                    setHabits={setHabits}
                                    habit={habit}
                                    currDate={selectedDay}
                                />
                            );
                        })
                    ) : (
                        <NoHabits text={`No habits in ${selectedTimeOfDay}!`} />
                    )
                ) : (
                    <NoHabits text="No habits today!" />
                )}
            </div>
        </>
    );
};

const Header = ({ selectedDay, today, setShowAddNewHabitComponent }) => {
    return (
        <div className="flex justify-between items-end">
            <div className=" space-y-2 ">
                {isEqual(selectedDay, today) ? (
                    <>
                        <p className="text-5xl font-bold">Today</p>
                        <p className="text-gray-400 text-xl">
                            {format(selectedDay, "MMMM dd")}
                        </p>
                    </>
                ) : (
                    <>
                        <p className="text-5xl font-bold">
                            {format(selectedDay, "MMMM dd")}
                        </p>
                        <p className="text-gray-400 text-xl">
                            {format(selectedDay, "eeee")}
                        </p>
                    </>
                )}
            </div>
            <button
                onClick={() => setShowAddNewHabitComponent(true)}
                className=" flex justify-between items-center gap-2 font-medium  bg-gradient-to-bl from-[#0FC9F2] to-[#0F85F2] px-5 py-2 rounded text-lg text-white"
            >
                <PlusSquare />
                <p>Add Habit</p>
            </button>
        </div>
    );
};

const CurrentWeek = ({ selectedDay, setSelectedDay }) => {

    const week = eachDayOfInterval({
        start: startOfWeek(selectedDay),
        end: endOfWeek(selectedDay),
    });

    return (
        <div className="bg-white flex items-center justify-evenly h-20 rounded-md   my-8 ">
            {week.map(day => {
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
                            className={`font-bold text-lg ${isEqual(selectedDay, day) &&
                                "text-[#007BFF]"
                                } `}
                        >
                            {format(day, "d")}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

const HabitTracker = () => {
    const [habits, setHabits] = useState([]);
    const [showAddNewHabitComponent, setShowAddNewHabitComponent] =
        useState(false);
    const today = startOfToday();
    const [selectedDay, setSelectedDay] = useState(today);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHabits(JSON.parse(localStorage.getItem("Habits")));
        }
    }, []);

    const handleSubmit = (currHabit) => {
        if (currHabit.name.trim().length === 0) {
            setError(true);
        } else {
            setError(false);
        }
        if (currHabit.name.trim().length !== 0) {
            if (currHabit.color === "") {
                var randomColor = colors[Math.floor(Math.random() * colors.length)];
                currHabit.color = randomColor
            }

            if (currHabit.getDoneIn === "") {
                currHabit.getDoneIn = "anytime"
            }

            if (typeof window !== "undefined") {
                localStorage.setItem(
                    "Habits",
                    JSON.stringify([
                        ...(habits || []),
                        currHabit,
                    ])
                );
            }
            setHabits([...(habits || []), currHabit]);
            setShowAddNewHabitComponent(false);
        }
    }

    return (
        <div className=" mx-auto w-[70%] flex py-8    gap-8  ">
            <main className=" w-[60%]  ">
                <Header
                    selectedDay={selectedDay}
                    today={today}
                    setShowAddNewHabitComponent={setShowAddNewHabitComponent}
                />
                <CurrentWeek selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
                <Habits
                    habits={habits}
                    setHabits={setHabits}
                    selectedDay={selectedDay}
                />
            </main>
            <div>
                <HabitsStats />
                <Calendar currDate={selectedDay} setCurrDate={setSelectedDay} />
                {showAddNewHabitComponent ? (
                    <HabitForm
                        formTitle="Add New Habit"
                        habit={{
                            name: "",
                            isCompleted: false,
                            getDoneIn: "",
                            color: "",
                            checkedOfForDates: [],
                            id: uuidv4(),
                            createdDate: startOfToday(),
                            repeatHabitDays: []
                        }}
                        setShowHabitForm={
                            setShowAddNewHabitComponent
                        }
                        handleSubmit={handleSubmit}
                        error={error}
                    />
                ) : null}
            </div>
        </div>
    );
};

function App() {
    return (
        <div className="flex h-screen bg-[#F5F5F5]">
            <Head>
                <title>HabitTracker | Headway</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/headway.svg" />
            </Head>
            <Sidebar />
            <HabitTracker />
        </div>
    );
}

export default App;
