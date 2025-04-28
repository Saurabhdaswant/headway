import { ChartBarIcon } from "@heroicons/react/outline";
import { motion, useSpring, useTransform } from "framer-motion";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { CheckCircle, Target } from "react-feather";

import { LogoutIcon } from "@heroicons/react/solid";

const sidebarItems = [
  { name: "Dashboard", icon: ChartBarIcon, path: "/dashboard" },
  { name: "Habits", icon: CheckCircle, path: "/habits" },
  { name: "Goals", icon: Target, path: "/goals" },
];

function Sidebar() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("");
  const containerRef = useRef(null);
  const activeTabElementRef = useRef(null);

  const clipTopSpring = useSpring(0, { stiffness: 100, damping: 20 });
  const clipBottomSpring = useSpring(100, { stiffness: 100, damping: 20 });

  const clipPath = useTransform(
    [clipTopSpring, clipBottomSpring],
    ([clipTop, clipBottom]) =>
      `inset(${clipTop}% 0 ${clipBottom}% 0 round 17px)`
  );

  React.useEffect(() => {
    const container = containerRef.current;

    if (activeTab && container) {
      const activeTabElement = activeTabElementRef.current;

      if (activeTabElement) {
        const { offsetTop, offsetHeight } = activeTabElement;

        const clipTop = (offsetTop / container.offsetHeight) * 100;
        const clipBottom =
          100 - ((offsetTop + offsetHeight) / container.offsetHeight) * 100;

        clipTopSpring.set(clipTop);
        clipBottomSpring.set(clipBottom);
      }
    }
  }, [
    activeTab,
    activeTabElementRef,
    containerRef,
    clipTopSpring,
    clipBottomSpring,
  ]);

  return (
    <div className="hidden md:block z-50 w-[20%] bg-white">
      <div className="flex flex-col relative mt-10 justify-between h-[90%]">
        <ul className="px-4 absolute w-full">
          {sidebarItems.map((item: any, idx) => {
            const Icon = item.icon;

            return (
              <li
                ref={activeTab === item.name ? activeTabElementRef : null}
                key={item.name}
                onClick={() => {
                  if (!item.soon) {
                    setActiveTab(item.name);
                    setTimeout(() => {
                      router.push(item.path);
                    }, 300);
                  }
                }}
                className={`py-4 z-0 px-4 flex items-center transition-colors relative ${
                  item.soon ? "cursor-not-allowed" : "cursor-pointer"
                } rounded-xl font-medium`}
              >
                <span className="z-50 flex items-center gap-2">
                  <Icon className="w-5 h-5" /> {item.name}
                </span>
              </li>
            );
          })}
        </ul>
        <motion.ul
          layout
          ref={containerRef}
          style={{ clipPath }}
          className="px-4 absolute w-full bg-[#202020]"
        >
          {sidebarItems.map((item: any, idx) => {
            const Icon = item.icon;

            return (
              <li
                key={item.name}
                onClick={() => {
                  if (!item.soon) {
                    // router.push(item.path);
                  }
                }}
                className={`py-4 z-50 px-4 flex items-center transition-colors relative ${
                  item.soon ? "cursor-not-allowed" : "cursor-pointer"
                } rounded-xl font-medium`}
              >
                <span className="z-50 flex items-center text-white gap-2">
                  <Icon className="w-5 h-5" />

                  {item.name}
                </span>
              </li>
            );
          })}
        </motion.ul>
      </div>
      <button
        className="flex justify-center w-full items-center gap-2 font-medium px-4 py-2.5 text-gray-600"
        onClick={() => {
          localStorage.removeItem("authToken");
          router.push("/");
        }}
      >
        Logout
        <LogoutIcon className="w-6" />
      </button>
    </div>
  );
}

export default React.memo(Sidebar);
