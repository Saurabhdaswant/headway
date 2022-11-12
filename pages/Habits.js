import React from "react";
import Image from "next/image";
import { BookOpen, Calendar, Check, Wind, Zap } from "react-feather";

function Habits() {
	const currDayHabits = [
		{
			name: "Workout",
			isCompleted: false,
			date: "12-11-2022",
			color: "color1",
		},
		{
			name: "Meditation",
			isCompleted: false,
			date: "12-11-2022",
			color: "color2",
		},
		{
			name: "Journal",
			isCompleted: false,
			date: "12-11-2022",
			color: "color3",
		},
		{
			name: "Reading",
			isCompleted: false,
			date: "12-11-2022",
			color: "color4",
		},
		{
			name: "Eat Muramba",
			isCompleted: false,
			date: "12-11-2022",
			color: "color5",
		},
		{
			name: "Drink Ashwaghandha Milk",
			isCompleted: false,
			date: "12-11-2022",
			color: "color6",
		},
	];

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
			<div className=" w-full bg-gray-50 ">
				<div className="w-[40%] m-auto">
					{currDayHabits.map((habit, idx) => {
						return (
							<div key={idx} className="flex items-center justify-between">
								<div className="border-4 grid place-items-center bg-white border-green-500  text-green-500 w-14 h-14 rounded-full " >
									<Check className="  w-8 h-8  stroke-3" />
								</div>
								<div
									className={`p-2 h-14 w-[85%] flex items-center  font-bold my-6  bg-white ${habit.color} `}
								>
									{habit.name}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Habits;
