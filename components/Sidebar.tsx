import React, { useEffect, useState } from "react";
import { ChartBarIcon } from "@heroicons/react/outline";
import { CheckCircle, Headphones, Target, Users, Zap } from "react-feather";
import { useRouter } from "next/router";

import { motion } from "framer-motion";

const sidebarItems = [
  { name: "Dashboard", icon: ChartBarIcon, path: "/stats" },
  { name: "Goals", icon: Target, path: "/goals" },
  { name: "Habits", icon: CheckCircle, path: "/habits" },
  { name: "Tribe", icon: Users, path: "/tribe" },
  { name: "Workouts", icon: Zap, path: "/workouts" },
  { name: "Meditations", icon: Headphones, path: "/meditations" },
];

const Item = ({ item }) => {
  const router = useRouter();
  const { pathname } = router;
  const isActive = pathname.startsWith(item.path);
  const [isActiveBg, setIsActive] = useState(false);

  const Icon = item.icon;

  // useEffect(() => {
  //   setIsActive(isActive);
  // }, [item]);

  return (
    <motion.li
      layout
      key={item.name}
      onMouseOver={() => {
        setIsActive(true);
      }}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => router.push(item.path)}
      className={`py-4 px-4 flex items-center transition-colors relative   cursor-pointer rounded-xl font-medium ${
        isActive ? " text-white" : "text-black"
      }`}
    >
      <span className="z-50 flex items-center gap-2">
        <Icon className="w-5 h-5" /> {item.name}
      </span>
      {isActive === true && (
        <motion.div
          layoutId="black"
          className="bg-[#2e2e2e] z-40 -left-[0.1px] absolute rounded-xl h-full w-full"
        />
      )}
      {isActiveBg === true && (
        <motion.div
          layoutId="gray"
          className={`-left-[0.1px] bg-[#cfcfcf57] absolute transition-colors rounded-xl h-full w-full  
          `}
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
        {/* <div className="flex items-center justify-center gap-2 border-t py-4 border-gray-200">
          <div className="w-12 h-12 bg-slate-300 rounded-full"></div>
          <p className="font-medium">Saurabh</p>
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar;
