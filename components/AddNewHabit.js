import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { X } from "react-feather";
function AddNewHabit({ habits, setHabits, setShowAddNewHabitComponent }) {
	const id = uuidv4();
	const doitat = ["anytime", "morning", "afternoon", "evening"];
	const colors = [
		"pinkSherbet",
		"mediumPurple",
		"tealDeer",
		"khaki",
		"babyBlue",
		"spiroDisco",
	];

	const [error, setError] = useState(false);

	const [habit, setHabit] = useState({
		name: "",
		isCompleted: false,
		getDoneIn: "",
		color: "",
		checkedOfForDates: [],
		id,
	});

	return (
		<div className=" fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 ">
			<div className="p-8 absolute space-y-8 top-0 right-0 w-[30%] bg-white rounded-md z-50 h-full ">
				<div className="flex justify-between">
					<h1 className=" text-2xl ">Add new Habit</h1>
					<X
						onClick={() => setShowAddNewHabitComponent(false)}
						className=" cursor-pointer "
					/>
				</div>
				<div className=" flex flex-col justify-between  h-full ">
					<div className=" space-y-8 ">
						<div className="flex flex-col  space-y-2">
							<label
								htmlFor="name"
								className="font-semibold"
							>
								Habit
							</label>
							<input
								onChange={e => {
									setHabit({
										...habit,
										name: e.target.value,
									});
								}}
								value={habit.name}
								name="name"
								id="name"
								className={`
								outline-none focus:border-[#0F85F2]  font-medium 
								border-2    px-4 py-2 rounded ${habit.name.length > 0 && error
										? "border-zinc-200"
										: error ? "border-red-500" : null
									}`}
							/>
						</div>
						<div className="flex flex-col space-y-2 ">
							<p className="font-semibold">Do it at</p>
							<div className=" grid grid-cols-2 gap-x-6 gap-y-4 ">
								{doitat.map((time, idx) => {
									return (
										<div
											onClick={() => {
												setHabit({
													...habit,
													getDoneIn: time,
												});
											}}
											key={idx}
											className={`  ${habit.getDoneIn === time
												? "bg-[#0F85F2] border-[#0F85F2]  text-white "
												: "  hover:bg-blue-100 hover:border-blue-300  border-zinc-200 "
												} cursor-pointer capitalize text-center  font-medium border-2  px-4 py-2 rounded `}
										>
											{time}
										</div>
									);
								})}
							</div>
						</div>
						<div className="flex flex-col space-y-2 ">
							<p className="font-semibold">Color</p>
							<div className=" grid grid-cols-6 gap-2 ">
								{colors.map((color, idx) => {
									return (
										<div
											onClick={() => {
												setHabit({ ...habit, color });
											}}
											key={idx}
											className={` cursor-pointer capitalize text-center h-12  rounded  bg-${color}  ${color === habit.color &&
												`outline outline-offset-2 outline-[#0F85F2] `
												}`}
										></div>
									);
								})}
							</div>
						</div>
					</div>
					<button
						onClick={() => {
							if (habit.name.trim().length === 0) {
								setError(true);
							} else {
								setError(false);
							}
							if (habit.name.trim().length !== 0) {
								if (habit.color === "") {
									var randomColor = colors[Math.floor(Math.random() * colors.length)];
									habit.color = randomColor
								}

								if (habit.getDoneIn === "") {
									habit.getDoneIn = "anytime"
								}

								habit.createdDate = new Date().toISOString().slice(0, 10)

								if (typeof window !== "undefined") {
									localStorage.setItem(
										"Habits",
										JSON.stringify([
											...(habits || []),
											habit,
										])
									);
								}
								setHabits([...(habits || []), habit]);
								setShowAddNewHabitComponent(false);
							}
						}}
						type="submit"
						className=" w-full my-12  font-semibold  bg-[#2e2e2e] hover:bg-[#2e2e2eed] text-white px-14 rounded py-4 "
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}

export default AddNewHabit;
