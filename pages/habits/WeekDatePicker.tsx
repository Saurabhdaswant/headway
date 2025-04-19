import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isAfter,
  isEqual,
  startOfToday,
  startOfWeek,
} from "date-fns";

import React from "react";

export default function WeekDatePicker({ selectedDay, setSelectedDay }) {
  const week = eachDayOfInterval({
    start: startOfWeek(selectedDay),
    end: endOfWeek(selectedDay),
  });

  return (
    <div className=" flex items-center justify-evenly h-20 rounded-md  my-4 lg:my-8 ">
      {week.map((day) => {
        return (
          <div
            onClick={() => {
              if (isAfter(day, startOfToday())) {
                return;
              }
              setSelectedDay(day);
            }}
            key={day.toString()}
            className="text-center space-y-2 cursor-pointer "
          >
            <p className=" text-xs capitalize text-gray-400 ">
              {format(day, "eee")}
            </p>
            <p
              className={` font-bold text-lg ${
                isEqual(selectedDay, day) ? "text-[#007BFF]" : "text-gray-600"
              }  `}
            >
              {format(day, "d")}
            </p>
          </div>
        );
      })}
    </div>
  );
}
