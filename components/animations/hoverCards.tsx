import React from "react";

import { motion } from "framer-motion";
import useToggle from "../../hooks/useToggle";

export default function playground() {
  const [isHovering, hover] = useToggle(false);
  const whileHover = isHovering ? "hovered" : "_";

  return (
    <div className="bg-[#F5F5F5] grid place-items-center h-screen text-white">
      <div
        className={`   relative group p-4 hover:cursor-pointer  rounded-xl   flex h-[340px] w-[280px] flex-col items-center gap-10   my-2   bg-white  border border-slate-100`}
      >
        <div className="text-gray-600">
          <h1 className="font-medium">This is Title</h1>
          <h1 className="text-gray-500">description</h1>
        </div>
        <div className="flex items-center justify-between ">
          {[...Array(4)].map((_, idx) => {
            return (
              <motion.div
                key={idx}
                animate={whileHover}
                transition={{
                  type: "spring",
                  bounce: 0,
                  duration: 0.2,
                }}
                initial={{
                  rotate: Math.floor(Math.random() * 20),
                  zIndex: 50,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 0,
                }}
                className=" w-40 -mx-4  border border-gray-400 hover:border-gray-800 transition-colors  rounded-xl h-40 bg-gray-200"
              ></motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
