import React from "react";

import { motion } from "framer-motion";
import useToggle from "../../hooks/useToggle";

export default function HoverCard() {
  const [isHovering, hover] = useToggle(false);
  const whileHover = isHovering ? "hovered" : "_";

  return (
    <div className="bg-[#F5F5F5] grid place-items-center h-screen text-white">
      <div
        onMouseEnter={() => hover()}
        onMouseLeave={() => hover()}
        className={`   relative group p-4 hover:cursor-pointer  rounded-xl   flex h-[340px] w-[280px] flex-col items-center gap-10   my-2   bg-white  border border-slate-100`}
      >
        <div className="text-gray-600">
          <h1 className="font-medium">This is Title</h1>
          <h1 className="text-gray-500">
            This is a very long description quite long actually
          </h1>
        </div>
        <motion.div
          animate={whileHover}
          transition={{
            type: "spring",
            bounce: 0,
            duration: 0.4,
          }}
          variants={{
            hovered: {
              scale: 1.1,
            },
          }}
          className=" w-40    rounded-xl h-40 bg-gray-200"
        ></motion.div>
        <motion.div
          transition={{
            type: "spring",
            bounce: 0,
            duration: 0.5,
          }}
          animate={whileHover}
          variants={{
            hovered: {
              height: "12rem",
            },
          }}
          className=" w-full   rounded-xl absolute bottom-0 border  h-10 bg-gray-300"
        ></motion.div>
      </div>
    </div>
  );
}
