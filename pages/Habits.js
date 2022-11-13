import React from "react";
import Image from "next/image";
import { BookOpen, Calendar, Check, Plus, PlusSquare, Wind, Zap } from "react-feather";

function Habits() {
	const currDayHabits = [
		{
			name: "Workout",
			isCompleted: true,
			date: "12-11-2022",
			color: "color1",
		},

		{
			name: "Read",
			isCompleted: true,
			date: "12-11-2022",
			color: "color4",
		},
		{
			name: "meditate",
			isCompleted: false,
			date: "12-11-2022",
			color: "color5",
		},
		{
			name: "code",
			isCompleted: true,
			date: "12-11-2022",
			color: "color6",
		},
	];

	const weekDays = [
		{ date: 12, day: "sunday" },
		{ date: 13, day: "monday" },
		{ date: 14, day: "tuesday" },
		{ date: 14, day: "wednesday" },
		{ date: 15, day: "thursday" },
		{ date: 16, day: "friday" },
		{ date: 17, day: "saturday" },
	];

	const periods = ["all", "evening", "morning", "afernoon", "night"]


	// html, csss, react, redux, stylecompoent, routing, charting, typscript

	return (
		<div className="flex h-screen border">
			<div className=" w-2/12  ">
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
						<Calendar /> Rituals
					</li>
					<li className="py-4 px-4 flex items-center gap-2  rounded-md font-medium bg-gray-900 text-white my-4">
						<Wind /> Meditations
					</li>
					<li className="py-4 px-4 flex items-center gap-2  rounded-md font-medium">
						<Zap /> Workout
					</li>
					<li className="py-4 px-4 flex items-center gap-2  rounded-md font-medium">
						<BookOpen /> Jounal
					</li>
				</ul>
				<div className="h-[10%] flex items-center justify-center gap-2 border-t border-gray-200  ">
					<div className=" w-12 h-12 bg-slate-300 rounded-full"></div>
					<p className=" font-medium ">Saurabh</p>{" "}
				</div>
			</div>
			<div className=" w-full grid grid-cols-2 bg-[#F5F5F5] p-8 gap-8  ">
				<div className="">
					<div className="flex justify-between items-end" >
						<div className=" space-y-2 " >
							<p className="text-5xl font-bold" >Today</p>
							<p className="text-gray-400 text-xl"  >October 18</p>
						</div>
						<button className=" flex justify-between items-center gap-2 font-medium  bg-gradient-to-bl from-[#0FC9F2] to-[#0F85F2] px-5 py-2 rounded text-lg text-white" >
							<PlusSquare />
							<p>
								Add Habit
							</p>
						</button>
					</div>

					<div className="bg-white flex items-center justify-evenly h-20 rounded-md   my-8 ">
						{
							weekDays.map((Day, idx) => {
								const { day, date } = Day
								return <div key={idx} className="text-center">
									<p className=" text-xs capitalize text-gray-400 " >{day}</p>
									<p className={`font-bold text-lg ${12 === date && "text-[#007BFF]"} `} >{date}</p>
								</div>
							})
						}
					</div>

					<div className=" flex items-center gap-4 my-8   ">
						{
							periods.map((period, idx) => {
								return <div key={idx} className={`font-bold capitalize px-4 py-2  rounded-md bg-[#EDEDED]
								  text-gray-400`} >
									{period}
								</div>
							})
						}
					</div>

					{currDayHabits.map((habit, idx) => {
						return (
							<div
								key={idx}
								className="flex items-center justify-between"
							>
								{habit.isCompleted ? (
									<div className="border-4 grid place-items-center bg-white border-[#27B563]  text-[#27B563] w-14 h-14 rounded-full shadow-lg ">
										<Check className="  w-8 h-8  stroke-3" />
									</div>
								) : (
									<div className=" grid place-items-center bg-white w-14 h-14 rounded-full shadow-lg "></div>
								)}
								<div
									className={`p-2 h-14 w-[85%] flex items-center  font-bold my-4  bg-white ${habit.color} `}
								>
									{habit.name}
								</div>
							</div>
						);
					})}
				</div>
				<div className="bg-white"></div>
			</div>
		</div>
	);
}

export default Habits;
