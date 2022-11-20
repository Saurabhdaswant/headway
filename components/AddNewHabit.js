import React from 'react'
import { X } from 'react-feather'

function AddNewHabit({ setShowAddNewHabitComponent }) {

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



	return (
		<div className='p-8 absolute space-y-8 top-0 right-0 w-[30%] bg-white rounded-md z-50 h-full ' >
			<div className='flex justify-between' >
				<h1 className=' text-2xl ' >Add new Habit</h1>
				<X onClick={() => setShowAddNewHabitComponent(false)} className=" cursor-pointer " />
			</div>
			<div className=' space-y-8 ' >
				<div className="flex flex-col  space-y-2" >
					<label htmlFor="email" className="font-semibold"  >Your email address</label>
					<input type="email" name="email" id="email" className=" font-medium border-2 border-zinc-200  px-4 py-2 rounded " />
				</div>
				<div className="flex flex-col space-y-2 " >
					<p className="font-semibold"  >Repeat Habit days </p>
					<div className='space-y-4' >
						<div className=' grid grid-cols-7 gap-2 ' >
							{
								weekDays.map((day, idx) => {
									return <div key={idx} className=" capitalize text-center  font-medium border-2 border-zinc-200  px-4 py-2 rounded ">{day}</div>
								})
							}
						</div>
						<div className=' grid grid-cols-2 gap-6 ' >
							<div className=" capitalize text-center  font-medium border-2 border-zinc-200  px-4 py-2 rounded ">Week days</div>
							<div className=" capitalize text-center  font-medium border-2 border-zinc-200  px-4 py-2 rounded ">Every day</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col space-y-2 " >
					<p className="font-semibold"  >Do it at</p>
					<div className=' grid grid-cols-2 gap-x-6 gap-y-4 ' >
						{
							doitat.map((day, idx) => {
								return <div key={idx} className=" capitalize text-center  font-medium border-2 border-zinc-200  px-4 py-2 rounded ">{day}</div>
							})
						}
					</div>
				</div>

				<div className="flex flex-col space-y-2 " >
					<p className="font-semibold"  >Color</p>
					<div className=' grid grid-cols-6 gap-2 ' >
						{
							colors.map((bgColor, idx) => {
								return <div key={idx} className={`capitalize text-center h-12  rounded ${bgColor}`}>
								</div>
							})
						}
					</div>
				</div>
				<button onClick={() => setShowAddNewHabitComponent(false)} type="submit" className=" w-full my-8  font-semibold  bg-[#2e2e2e] text-white px-14 rounded py-4 ">Submit</button>
			</div>
		</div>
	)
}

export default AddNewHabit