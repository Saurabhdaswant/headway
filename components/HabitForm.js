import React, { useState } from "react";
import { X } from "react-feather";
import { colors, doitat, weekDays } from "./constants";

function HabitForm({
	formTitle,
	habit,
	setShowHabitForm,
	handleSubmit,
	error,
}) {
	const [currHabit, setCurrHabit] = useState(habit);

	const addDayIntoRepeatHabitDaysList = day => {
		const newRepeatedHabitDays = [...currHabit.repeatHabitDays, day];
		setCurrHabit({
			...currHabit,
			repeatHabitDays: [...new Set(newRepeatedHabitDays)],
		});
	};

	return (
		<div className=" fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 ">
			<div className="p-8 absolute space-y-8 top-0 right-0 w-[30%] bg-white rounded-md z-50 h-full ">
				<div className="flex justify-between">
					<h1 className=" text-2xl ">{formTitle}</h1>
					<X
						onClick={() => setShowHabitForm(false)}
						className=" cursor-pointer "
					/>
				</div>
				<div className=" flex flex-col   h-full ">
					<div className=" space-y-8 ">
						<div className="flex flex-col  space-y-2">
							<label
								htmlFor="habitName"
								className="font-semibold"
							>
								Habit
							</label>
							<input
								onChange={e =>
									setCurrHabit({
										...currHabit,
										name: e.target.value,
									})
								}
								value={currHabit.name}
								name="habitName"
								id="habitName"
								className={`
							outline-none focus:border-[#0F85F2]  font-medium 
							border-2    px-4 py-2 rounded ${currHabit.name.length > 0 && error
										? "border-zinc-200"
										: error
											? "border-red-500"
											: null
									}`}
							/>
						</div>
						<div className="flex flex-col space-y-2 ">
							<p className="font-semibold">Repeat Habit days </p>
							<div className="space-y-4">
								<div className=" grid grid-cols-7 gap-2 ">
									{weekDays.map(day => {
										return (
											<div
												onClick={() => addDayIntoRepeatHabitDaysList(day)
												}
												key={day}
												className={` text-sm  ${currHabit.repeatHabitDays?.includes(
													day
												)
													? "bg-[#0F85F2] border-[#0F85F2]  text-white "
													: "  hover:bg-blue-100 hover:border-blue-300  border-zinc-200 "
													} cursor-pointer capitalize text-center  font-medium border-2  py-2 rounded `}
											>
												{day.slice(0, 3)}
											</div>
										);
									})}
								</div>
								<div className=" grid grid-cols-2 gap-6 ">
									<div
										onClick={() => setCurrHabit({ ...currHabit, repeatHabitDays: [...weekDays,].splice(0, 5) })}
										className={`  ${false
											? "bg-[#0F85F2] border-[#0F85F2]  text-white "
											: "  hover:bg-blue-100 hover:border-blue-300  border-zinc-200 "
											} cursor-pointer capitalize text-center  font-medium border-2  px-4 py-2 rounded `}
									>
										Week days
									</div>
									<div
										onClick={() => setCurrHabit({ ...currHabit, repeatHabitDays: weekDays })}
										className={`  ${false
											? "bg-[#0F85F2] border-[#0F85F2]  text-white "
											: "  hover:bg-blue-100 hover:border-blue-300  border-zinc-200 "
											} cursor-pointer capitalize text-center  font-medium border-2  px-4 py-2 rounded `}
									>
										Every day
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col space-y-2 ">
							<p className="font-semibold">Do it at</p>
							<div className=" grid grid-cols-2 gap-x-6 gap-y-4 ">
								{doitat.map((time, idx) => {
									return (
										<div
											onClick={() => setCurrHabit({ ...currHabit, getDoneIn: time })}
											key={idx}
											className={` ${currHabit.getDoneIn === time
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
											onClick={() => setCurrHabit({ ...currHabit, color })}
											key={idx}
											className={` cursor-pointer capitalize text-center h-12  rounded  bg-${color}  ${color === currHabit.color
												? `outline outline-offset-2 outline-[#0F85F2] `
												: null
												}`}
										></div>
									);
								})}
							</div>
						</div>
					</div>
					<button
						onClick={() => handleSubmit(currHabit)}
						type="submit"
						className=" w-full my-8 font-semibold  bg-[#2e2e2e] hover:bg-[#2e2e2eed] text-white px-14 rounded py-4 "
					>
						{formTitle}
					</button>
				</div>
			</div>
		</div >
	);
}

export default HabitForm;
