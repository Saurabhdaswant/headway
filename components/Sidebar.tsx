import React, { useEffect, useState } from "react";
import { ChartBarIcon } from "@heroicons/react/outline";
import { CheckCircle, Headphones, Target, Users, Zap } from "react-feather";
import { useRouter } from "next/router";

import { motion } from "framer-motion";

const sidebarItems = [
  { name: "Dashboard", icon: ChartBarIcon, path: "/stats", soon: true },
  { name: "Habits", icon: CheckCircle, path: "/habits" },
  { name: "Gang", icon: Users, path: "/gang", soon: true },
  { name: "Goals", icon: Target, path: "/goals" },
  { name: "Workouts", icon: Zap, path: "/workouts", soon: true },
  { name: "Meditations", icon: Headphones, path: "/meditations", soon: true },
];

const Item = ({ item }) => {
  const router = useRouter();
  const { pathname } = router;
  const isPathMatching = pathname.startsWith(item.path);
  const [currentHoveredItem, setCurrentHoveredItem] = useState(false);

  const Icon = item.icon;

  // Animation One
  // When two elements share the same layoutId, Framer Motion knows they're connected.
  // So, when one element is replaced by another with the same layoutId,
  // it animates the change, making the transition smooth and visually appealing.

  const textStyle = {
    color: isPathMatching ? "#fff" : item.soon ? "#808080" : "#000",
  };

  return (
    <motion.li
      layout
      key={item.name}
      style={textStyle}
      onMouseOver={() => {
        setCurrentHoveredItem(true);
      }}
      onMouseLeave={() => setCurrentHoveredItem(false)}
      onClick={() => {
        if (!item.soon) {
          router.push(item.path);
        }
      }}
      className={`py-4 px-4 flex items-center transition-colors relative ${
        item.soon ? "cursor-not-allowed" : "cursor-pointer"
      } rounded-xl font-medium`}
    >
      <span className="z-50 flex items-center gap-2">
        <Icon className="w-5 h-5" /> {item.name}
      </span>
      {currentHoveredItem && (
        <motion.div
          layoutId="hoveredBg"
          className={`-left-[0.1px] bg-[#cfcfcf57] absolute transition-colors rounded-xl h-full w-full  
          `}
        />
      )}
      {isPathMatching && (
        <motion.div
          layoutId="matchingPathBg"
          className="bg-[#2e2e2e] z-40 -left-[0.1px] absolute rounded-xl h-full w-full"
        />
      )}
    </motion.li>
  );
};

function Sidebar() {
  return (
    <div className=" hidden md:block z-50 w-[20%] bg-white">
      <div className="flex flex-col mt-10 justify-between h-[90%]">
        <ul className="px-4">
          {sidebarItems.map((item, idx) => {
            return <Item key={idx} item={item} />;
          })}
        </ul>
        {/* <div className="flex items-center justify-center gap-2 border-t py-4 border-hoveredBg-200">
          <div className="w-12 h-12 bg-slate-300 rounded-full"></div>
          <p className="font-medium">Saurabh</p>
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar;
