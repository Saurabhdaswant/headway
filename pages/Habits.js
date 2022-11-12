import React from "react";
import Image from "next/image";
import {
	Book,
	BookOpen,
	Calendar,
	ChevronDown,
	Wind,
	Zap,
} from "react-feather";

function Habits() {
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
					<p className=" font-medium " >Saurabh</p>{" "}
				</div>
			</div>
			<div className=" w-full bg-gray-50 "></div>
		</div>
	);
}

export default Habits;
