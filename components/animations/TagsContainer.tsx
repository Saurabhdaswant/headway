import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, Save, Trash } from "react-feather";
import useToggle from "../../hooks/useToggle";

export default function TagsContainer() {
  const [isInputVisible, showInput] = useToggle(false);

  const [lils, setLils] = useState([1]);
  const show = lils.length >= 3 ? "bigger" : isInputVisible ? "yes" : "_";

  return (
    <div className="bg-[#F5F5F5] grid place-items-center h-screen text-white">
      <motion.div
        onClick={() => {
          if (!isInputVisible) {
            showInput();
          }
        }}
        animate={show}
        transition={{
          type: "ease-in-out",
          bounce: 0,
          duration: 0.2,
        }}
        initial={{
          height: "3rem",
          width: 92,
        }}
        variants={{
          yes: {
            width: 350,
            height: "4rem",
            display: "flex",
            gap: "1rem",
          },
          bigger: {
            width: 350,
            height: "8.2rem",
            display: "flex",
            gap: "0.5rem",
          },
        }}
        className={`cursor-pointer p-2 flex justify-end  border group items-center  transition-colors  rounded-xl  bg-[#1A1A1A] `}
      >
        {isInputVisible && (
          <motion.div
            animate={show}
            transition={{
              type: "ease-in-out",
              bounce: 0,
              duration: 0.1,
            }}
            initial={{
              width: "2.5rem",
            }}
            variants={{
              yes: {
                width: "100%",
              },
              bigger: {
                width: "100%",
                height: "7rem",
                alignItems: "start",
              },
            }}
            className={`h-10 flex p-1.5 flex-wrap  gap-x-2 rounded-md bg-[#282828] `}
          >
            <div className="flex flex-wrap  gap-2">
              <AnimatePresence mode="popLayout">
                {lils.map((_, idx) => {
                  return (
                    <motion.div
                      onClick={() => {
                        const filteredList = lils.filter((_, i) => i !== idx);
                        setLils(filteredList);

                        if (filteredList.length === 0) {
                          showInput();
                        }
                      }}
                      key={idx}
                      initial={{
                        y: lils.length > 1 ? -10 : 0,
                      }}
                      animate={{
                        y: 0,
                      }}
                      exit={{
                        x: idx === 2 ? -100 : -10,
                        y: idx === 2 ? 40 : 0,
                        opacity: 0,
                      }}
                      className={`w-20  h-7  rounded bg-[#373737] `}
                    ></motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
        <div
          className={`flex justify-center items-center gap-2 ${
            lils.length > 2 && "flex-col"
          }`}
        >
          <motion.div layout>
            <Bookmark
              onClick={() => {
                if (isInputVisible) {
                  if (lils.length < 9) {
                    setLils([...lils, 1]);
                  }
                }
              }}
              size={20}
            />
          </motion.div>
          <motion.div layout>
            <Trash
              onClick={() => {
                setLils([1]);
                showInput();
              }}
              size={20}
            />
          </motion.div>
          <motion.div>
            <Save size={20} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
