import React, { useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  CogIcon,
  DotsCircleHorizontalIcon,
  ExclamationCircleIcon,
  SparklesIcon,
} from "@heroicons/react/solid";

export default function Playground() {
  const [view, setView] = useState("default");
  let [isGreen, setIsGreen] = useState(false);
  let [isRed, setIsRed] = useState(false);

  const content = useMemo(() => {
    switch (view) {
      case "default":
        return (
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.8,
              }}
            >
              <SparklesIcon className=" " width={80} height={80} />{" "}
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.8,
              }}
            >
              Transaction
            </motion.span>
          </>
        );
      case "blue":
        return (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.8,
              }}
            >
              <CogIcon className=" animate-spin" width={80} height={80} />{" "}
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.8,
              }}
            >
              Analyzing Transaction
            </motion.span>
          </>
        );
      case "green":
        return (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.8,
              }}
            >
              <CheckCircleIcon width={80} height={80} />{" "}
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.8,
              }}
            >
              Transaction Safe
            </motion.span>
          </>
        );
      case "red":
        return (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: isRed
                  ? [0, 20, -15, 12.5, -10, 10, -7.5, 7.5, -5, 5, 0]
                  : [0, -15, 5, -2, 0],
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.8,
              }}
            >
              <ExclamationCircleIcon width={80} height={80} />{" "}
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.8,
              }}
            >
              Transaction Warning
            </motion.span>
          </>
        );
    }
  }, [view]);

  const bg = useMemo(() => {
    switch (view) {
      case "default":
        return "#fff";
      case "blue":
        return "#dbeafe";
      case "green":
        return "#d1fae5";
      case "red":
        return "#fee2e2";
    }
  }, [view]);

  const c = useMemo(() => {
    switch (view) {
      case "default":
        return "#000";
      case "blue":
        return "#3b82f6";
      case "green":
        return "#10b981";
      case "red":
        return "#ef4444";
    }
  }, [view]);

  // useEffect(() => {
  //   const colorSequence = ["blue", "green", "blue", "red"];
  //   let currentIndex = 0;

  //   const intervalId = setInterval(() => {
  //     setView(colorSequence[currentIndex]);
  //     currentIndex = (currentIndex + 1) % colorSequence.length;
  //   }, 2000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <div className="bg-[#F5F5F5] cursor-pointer grid place-items-center h-screen text-white">
      <motion.div
        onClick={() => {
          if (isGreen) {
            setIsGreen(false);
          } else setIsGreen(true);

          setTimeout(() => {
            if (isGreen) {
              setView("green");
            } else {
              setView("red");
              // setTimeout(() => {
              //   setIsRed(true);
              // }, 1000);
            }
          }, 2000);

          setTimeout(() => {
            setView("default");
          }, 4000);

          setView("blue");
        }}
        key={view}
        style={{
          backgroundColor: bg,
          color: c,
        }}
        className=" py-10 px-14 text-5xl  rounded-full font-semibold"
      >
        <motion.div
          key={view}
          animate={view}
          className="flex items-center  gap-6"
          variants={{
            default: {
              width: 400,
            },
            blue: {
              width: 630,
            },
            green: {
              width: 520,
            },
            red: {
              width: 600,
            },
          }}
          transition={{
            type: "spring",
            bounce: 0.5,
          }}
        >
          {content}
        </motion.div>
      </motion.div>
    </div>
  );
}
