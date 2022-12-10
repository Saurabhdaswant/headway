import React, { useState } from 'react'
import { Check, Edit, Trash2, } from "react-feather";
import EditHabit from './EditHabit';

function Habit({ habits, setHabits, habit }) {
	const [showHabitEditOptions, setShowHabitEditOptions] = useState(false)
	const [editHabit, setEditHabit] = useState(false)


	return (
		<div
			className="flex items-center justify-between"
		>
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
			<div
				onMouseEnter={() => setShowHabitEditOptions(true)}
				onMouseLeave={() => setShowHabitEditOptions(false)}
				className={`p-2 h-14 w-[85%] flex justify-between items-center  font-bold my-4 text-[#2e2e2e]   border-l-4 border-${habit.color} bg-white   `}
			>
				<p> {habit.name}</p>
				{showHabitEditOptions &&
					<div className='flex gap-4  w-14'>
						<Edit onClick={() => setEditHabit(true)} className='hover:cursor-pointer' />
						<Trash2 className='hover:cursor-pointer' />
					</div>}
			</div>
			{editHabit ?
				<EditHabit habits={habits} setHabits={setHabits} habit={habit} setEditHabit={setEditHabit} /> : null}
		</div>
	)
}

export default Habit