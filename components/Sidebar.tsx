import { ChartBarIcon } from "@heroicons/react/outline";
import {
  motion,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useRouter } from "next/router";
import React, { useRef, useState, useEffect } from "react";
import { CheckCircle, Target } from "react-feather";

import { LogoutIcon } from "@heroicons/react/solid";

const sidebarItems = [
  { name: "Dashboard", icon: ChartBarIcon, path: "/dashboard" },
  { name: "Habits", icon: CheckCircle, path: "/habits" },
  { name: "Goals", icon: Target, path: "/goals" },
];

function Sidebar() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    // Set activeTab based on the current router pathname
    const currentPath = router.pathname;
    const activeItem = sidebarItems.find((item) => item.path === currentPath);
    setActiveTab(activeItem ? activeItem.name : sidebarItems[0].name);
  }, [router.pathname]);

  const containerRef = useRef<HTMLUListElement | null>(null);
  const activeTabElementRef = useRef<HTMLLIElement | null>(null);

  const clipTop = useMotionValue(0);
  const clipBottom = useMotionValue(100);

  useEffect(() => {
    const container = containerRef.current;

    if (activeTab && container) {
      const activeTabElement = activeTabElementRef.current;

      if (activeTabElement) {
        const { offsetTop, offsetHeight } = activeTabElement;

        const newClipTop = (offsetTop / container.offsetHeight) * 100;
        const newClipBottom =
          100 - ((offsetTop + offsetHeight) / container.offsetHeight) * 100;

        clipTop.set(newClipTop);
        clipBottom.set(newClipBottom);
      }
    }
  }, [activeTab, activeTabElementRef, containerRef, clipTop, clipBottom]);

  return (
    <div className=" hidden md:block z-50 w-[20%] bg-white">
      <div className="flex flex-col relative mt-10 justify-between h-[90%]">
        <ul className="px-4 absolute w-full  ">
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
                    }, 150);
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
        <ul className="px-4 absolute w-full" ref={containerRef}>
          {sidebarItems.map((item: any) => {
            const Icon = item.icon;
            const isActive = item.name === activeTab;

            return (
              <li
                key={item.name}
                ref={isActive ? activeTabElementRef : null}
                onClick={() => {
                  if (!item.soon) {
                    setActiveTab(item.name);
                    setTimeout(() => {
                      router.push(item.path);
                    }, 100);
                  }
                }}
                className={`relative py-4 px-4 flex items-center rounded-xl font-medium transition-colors z-10 ${
                  item.soon ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="highlight"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      mass: 0.5,
                    }}
                    className="absolute inset-0 bg-[#202020] rounded-xl z-0"
                  />
                )}

                <span
                  className={`flex items-center gap-2 relative z-10 ${
                    isActive ? "text-white" : "text-black"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        className={`flex justify-center w-full items-center gap-2 font-medium    px-4 py-2.5   text-gray-600   `}
        onClick={() => {
          localStorage.removeItem("authToken");
          router.push("/");
        }}
      >
        Logout
        <LogoutIcon className=" w-6" />
      </button>
    </div>
  );
}

export default Sidebar;
