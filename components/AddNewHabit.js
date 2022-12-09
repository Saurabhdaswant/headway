import React, { useState } from 'react'
import { X } from 'react-feather'

function AddNewHabit({ habits, setHabits, setShowAddNewHabitComponent }) {
	const weekDays = [
		"s",
		"m",
		"t",
		"w",
		"t",
		"f",
		"s"
	];

	const doitat = ["anytime", "morning", "afternoon", "evening"]
	const colors = ["bgColor1", "bgColor2", "bgColor3", "bgColor4", "bgColor5", "bgColor6",]

	const [habit, setHabit] = useState({
		name: "",
		isCompleted: false,
		getDoneIn: "",
		color: "",
	},)


	return (
		<div className=' fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 ' >
			<div className='p-8 absolute space-y-8 top-0 right-0 w-[30%] bg-white rounded-md z-50 h-full ' >
				<div className='flex justify-between' >
					<h1 className=' text-2xl ' >Add new Habit</h1>
					<X onClick={() => setShowAddNewHabitComponent(false)} className=" cursor-pointer " />
				</div>
				<div className=' flex flex-col justify-between  h-full ' >
					<div className=' space-y-8 '>
						<div className="flex flex-col  space-y-2" >
							<label htmlFor="habitName" className="font-semibold"  >Habit</label>
							<input onChange={(e) => {
								setHabit({ ...habit, name: e.target.value })
							}} value={habit.name} name="habitName" id="habitName" className=" outline-none focus:border-[#0F85F2]  font-medium border-2 border-zinc-200   px-4 py-2 rounded " />
						</div>
						{/* <div className="flex flex-col space-y-2 " >
						<p className="font-semibold"  >Repeat Habit days </p>
						<div className='space-y-4' >
							<div className=' grid grid-cols-7 gap-2 ' >
								{
									weekDays.map((day, idx) => {
										return <div key={idx} className={` ${habit.weekDays[idx] === day ? "bg-blue-500 border-blue-500  text-white " : "  hover:bg-blue-100 hover:border-blue-300  border-zinc-200 "} capitalize text-center  font-medium border-2 border-zinc-200  px-4 py-2 rounded`}>{day}</div>
									})
								}
							</div>
							<div className=' grid grid-cols-2 gap-6 ' >
								<div className=" capitalize text-center  font-medium border-2 border-zinc-200  px-4 py-2 rounded ">Week days</div>
								<div className=" capitalize text-center  font-medium border-2 border-zinc-200  px-4 py-2 rounded ">Every day</div>
							</div>
						</div>
					</div> */}
						<div className="flex flex-col space-y-2 " >
							<p className="font-semibold"  >Do it at</p>
							<div className=' grid grid-cols-2 gap-x-6 gap-y-4 ' >
								{
									doitat.map((time, idx) => {
										return <div onClick={() => {
											setHabit({ ...habit, getDoneIn: time })
										}} key={idx} className={` ${habit.getDoneIn === time ? "bg-[#0F85F2] border-[#0F85F2]  text-white " : "  hover:bg-blue-100 hover:border-blue-300  border-zinc-200 "} cursor-pointer capitalize text-center  font-medium border-2  px-4 py-2 rounded `}>{time}</div>
									})
								}
							</div>
						</div>
						<div className="flex flex-col space-y-2 " >
							<p className="font-semibold"  >Color</p>
							<div className=' grid grid-cols-6 gap-2 ' >
								{
									colors.map((bgColor, idx) => {
										return <div onClick={() => {
											setHabit({ ...habit, color: bgColor })
										}} key={idx} className={` cursor-pointer capitalize text-center h-12  rounded ${bgColor}  ${bgColor === habit.color && `outline outline-offset-2 outline-[#0F85F2] `}`}>
										</div>
									})
								}
							</div>
						</div>
					</div>
					<button onClick={() => {
						if (typeof window !== "undefined") {
							localStorage.setItem("Habits", JSON.stringify([...(habits || []), habit]))
						}
						setHabits([...(habits || []), habit])
						setShowAddNewHabitComponent(false)
					}} type="submit" className=" w-full my-12  font-semibold  bg-[#2e2e2e] hover:bg-[#2e2e2eed] text-white px-14 rounded py-4 ">Submit</button>
				</div>
			</div>
		</div>
	)
}

export default AddNewHabit