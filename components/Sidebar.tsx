import React from "react";
import { ChartBarIcon } from "@heroicons/react/outline";
import { CheckCircle, Headphones, Target, Users, Zap } from "react-feather";
import { useRouter } from "next/router";

const sidebarItems = [
  { name: "Dashboard", icon: ChartBarIcon, path: "/stats" },
  { name: "Goals", icon: Target, path: "/goals" },
  { name: "Habits", icon: CheckCircle, path: "/habits" },
  { name: "Tribe", icon: Users, path: "/tribe" },
  { name: "Workouts", icon: Zap, path: "/workouts" },
  { name: "Meditations", icon: Headphones, path: "/meditations" },
];

function Sidebar() {
  const router = useRouter();

  const { pathname } = router;

  return (
    <div className=" hidden md:block z-50 w-[20%] bg-white">
      <div className="flex flex-col mt-10 justify-between h-[90%]">
        <ul className="px-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.path);
            return (
              <li
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`py-4 px-4 flex items-center gap-2 cursor-pointer rounded-xl font-medium ${
                  isActive ? "bg-[#2e2e2e] text-white" : ""
                }`}
              >
                <Icon className="w-5 h-5" /> {item.name}
              </li>
            );
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
