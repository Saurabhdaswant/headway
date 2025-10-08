import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { API_ENDPOINTS } from "../constants";
export default function Signin() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const res = await fetch(`${API_ENDPOINTS.BASE_URL}/sign_up`, {
      method: "POST",
      body: JSON.stringify({ ...user }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    localStorage.setItem("authToken", data.token);
    window.location.href = "/habits";
  };

  return (
    <div className=" flex w-full justify-between h-screen  ">
      <Head>
        <title>Sign UP | Habstrack</title>
        <meta name="description" content="Sign up | A habit tracker app designed to boost productivity and personal growth." />
        <link rel="icon" href="/habstrack.svg" />
      </Head>
      <div className=" w-full bg-[url(/hero.png)] bg-no-repeat bg-cover hidden md:grid place-content-center ">
        <div className=" max-w-sm space-y-8 ">
          <div className="flex gap-4 items-center ">
            <Image src="/logo.svg" alt="Vercel Logo" width={50} height={50} />
            <p className="font-bold text-white text-2xl">Habstrack</p>
          </div>
          <h1 className=" font-semibold text-white text-3xl ">
            Do the Hard work especially when you dont feel like it!{" "}
          </h1>
          <h1 className=" font-semibold text-white text-lg  ">- Hamza Ahmed</h1>
        </div>
      </div>
      <div className=" w-full mx-6 text-zinc-800 relative">
        <div className=" flex flex-col  h-screen top-32 md:top-0 md:left-1/4  absolute md:place-content-center  max-w-sm m-auto space-y-8 w-full ">
          <div>
            <h1 className="text-3xl font-medium my-4  ">Sign Up </h1>
            <h1 className=" text-zinc-400 ">
              Please enter you details below to sign up{" "}
            </h1>
          </div>
          <div>
            <div className="space-y-6">
              <div className="flex flex-col ">
                <label htmlFor="email" className="font-semibold">
                  Your email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      email: e.target.value,
                    })
                  }
                  className="font-bold border-2 border-zinc-200  px-4 py-2 rounded "
                />
              </div>
              <div className="flex flex-col ">
                <div className="flex justify-between font-semibold ">
                  <label htmlFor="password" className="">
                    Your password
                  </label>
                  {/* <p className=" text-gray-400">Forgot password?</p> */}
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      password: e.target.value,
                    })
                  }
                  className="font-bold border-2 border-zinc-200  px-4 py-2 rounded "
                />
              </div>
            </div>
            {/* <button type="submit" className=" w-full my-8  font-semibold  bg-blue-500 text-white px-14 rounded-md py-2 ">Sign in</button> */}
            <button
              onClick={() => handleSubmit()}
              className="block text-center  w-full my-8  font-semibold  bg-blue-500 text-white px-14 rounded-md py-2 "
            >
              Sign up
            </button>

            <div className="flex items-center gap-1  justify-center ">
              <p className=" text-zinc-400"> have an account already? </p>
              <Link href="/login" className="  text-blue-500 underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useEffect } from "react";

// export default function Signup() {
//   useEffect(() => {
//     window.location.href = "/";
//   }, []);

//   return <div></div>;
// }
