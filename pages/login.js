import Image from "next/image";
import Link from "next/link";
import React from "react";
export default function Signin() {
	return (
		<div className=" flex w-full justify-between h-screen  ">
			<div className=" w-full bg-[url(/hero.png)] bg-no-repeat bg-cover grid place-content-center ">
				<div className=" max-w-sm space-y-8 " >
					<div className="flex gap-4 items-center " >
						<Image src="/logo.svg" alt="Vercel Logo" width={50} height={50} />
						<p className="font-bold text-white text-2xl" >Headway</p>
					</div>
					<h1 className=" font-semibold text-white text-3xl " >Do the Hard work especially when you dont feel like it! </h1>
					<h1 className=" font-semibold text-white text-lg  " >- Hamza </h1>
				</div>
			</div>
			<div className=" w-full mx-6 text-zinc-800 relative" >

				<div className=" flex flex-col  h-screen top-0 left-1/4  absolute place-content-center  max-w-sm m-auto space-y-8 w-full " >
					<div  >
						<h1 className="text-3xl font-medium my-4  ">Sign in </h1>
						<h1 className=" text-zinc-400 " >Please enter you details below to sign in </h1>
					</div>
					<form action="" >
						<div className="space-y-6">
							<div className="flex flex-col " >
								<label htmlFor="email" className="font-semibold"  >Your email address</label>
								<input type="email" name="email" id="email" className="font-bold border-2 border-zinc-200  px-4 py-2 rounded " />
							</div>
							<div className="flex flex-col " >
								<div className="flex justify-between font-semibold " >
									<label htmlFor="password" className="" >Your password</label>
									<p className=" text-gray-400" >Forgot password?</p>
								</div>
								<input type="password" name="password" id="password" className="font-bold border-2 border-zinc-200  px-4 py-2 rounded " />
							</div>
						</div>
						{/* <button type="submit" className=" w-full my-8  font-semibold  bg-blue-500 text-white px-14 rounded-md py-2 ">Sign in</button> */}
						<Link href="/Habits" className="block text-center  w-full my-8  font-semibold  bg-blue-500 text-white px-14 rounded-md py-2 "> Signin</Link>

						<div className="flex items-center gap-1  justify-center " >
							<p className=" text-zinc-400" > Dont have account? </p>
							<span className="  text-blue-500 underline" >Sign up for free </span>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}