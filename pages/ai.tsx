import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import useToggle from "../hooks/useToggle";
import { UserAddIcon } from "@heroicons/react/solid";

export default function Playground() {
  const [isInputVisible, showInput] = useToggle(false);

  const show = isInputVisible ? "bigger" : "_";
  return (
    <div className="bg-[#F5F5F5] grid place-items-center h-screen text-white">
      <div className=" relative border border-red-500 ">
        <motion.div
          onClick={() => {
            showInput();
          }}
          animate={show}
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.25,
          }}
          initial={{
            width: 160,
            height: 42,
          }}
          variants={{
            bigger: {
              width: 320,
              height: 190,
            },
          }}
          className={`cursor-pointer absolute -translate-x-1/2 bottom-0  select-none  shadow-lg  p-2 flex flex-col gap-2    transition-colors  rounded-xl text-[#2e2e2e] bg-white  border border-slate-100 `}
        >
          {isInputVisible && (
            <motion.div
              layout
              animate={show}
              transition={{
                duration: 0.2,
              }}
              initial={{
                opacity: 0,
                filter: "blur(4px)",
                // scale: 0.5,
              }}
              variants={{
                bigger: {
                  opacity: 1,
                  filter: "blur(0px)",
                  // scale: 1,
                },
              }}
              exit={{
                opacity: 0,
                filter: "blur(4px)",
                // scale: 0.1,
              }}
              className="flex flex-col overflow-hidden  gap-2 "
            >
              <motion.div className="text-sm  mt-0.5 whitespace-nowrap font-medium">
                Saurabh Sunil Daswant
              </motion.div>
              <motion.div className="text-sm  mt-0.5 whitespace-nowrap font-medium">
                Saurabh Sunil Daswant
              </motion.div>{" "}
              <motion.div className="text-sm  mt-0.5 whitespace-nowrap font-medium">
                Saurabh Sunil Daswant
              </motion.div>{" "}
              <motion.div className="text-sm  mt-0.5 whitespace-nowrap font-medium">
                Saurabh Sunil Daswant
              </motion.div>{" "}
              <motion.div className="text-sm  mt-0.5 whitespace-nowrap font-medium">
                Saurabh Sunil Daswant
              </motion.div>
            </motion.div>
          )}
          <div className="flex  items-center justify-between gap-2 ">
            <div className="flex items-center gap-2 overflow-hidden ">
              <div className="flex items-center gap-2">
                <motion.div className={` cursor-pointer  text-orange-400  `}>
                  {" "}
                  <UserAddIcon width={20} height={20} />{" "}
                </motion.div>
                <div className="text-sm  text-nowrap text-[#2e2e2e90]">
                  name
                </div>
              </div>
              <AnimatePresence>
                {isInputVisible && (
                  <motion.div
                    layout
                    animate={show}
                    transition={{
                      duration: 0.15,
                    }}
                    initial={{
                      opacity: 0,
                      filter: "blur(4px)",
                      scale: 0.5,
                    }}
                    variants={{
                      bigger: {
                        opacity: 1,
                        filter: "blur(0px)",
                        scale: 1,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      filter: "blur(4px)",
                      scale: 0.1,
                    }}
                    className="text-sm  mt-0.5 whitespace-nowrap font-medium"
                  >
                    Saurabh Sunil Daswant
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence mode="popLayout">
              {isInputVisible ? (
                <motion.div
                  layout
                  className=" z-50  bg-orange-100 min-w-fit text-orange-400 text-xs px-2.5 py-1  font-medium  capitalize inline-block   rounded-full "
                >
                  15 mins
                </motion.div>
              ) : (
                <motion.div
                  layout
                  className=" z-50   bg-green-100 min-w-fit text-green-400 text-xs px-2.5 py-1  font-medium  capitalize inline-block   rounded-full "
                >
                  15 mins
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
