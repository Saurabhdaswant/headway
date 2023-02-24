import React, { createContext, useEffect, useState } from "react";

export const HabitsContext = createContext();

export default function HabitsProvider({ children }) {
    const [habits, setHabits] = useState([
      {
        id: '0472d37b-4daf-4f5a-b827-4fcd21f73801',
        name: 'GYM',
        isCompleted: true,
        getDoneIn: 'morning',
        color: 'tealDeer',
        checkedOfForDates: [ '23-02-25 ', '23-04-20 ', '23-02-24 ' ],
        createdDate: '2023-02-18T18:30:00.000Z',
        repeatHabitDays:[ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday' ]
      },
      {
        id: '0472d37b-4daf-4f5a-b827-4fcd21f73801',
        name: 'Read',
        isCompleted: false,
        getDoneIn: 'morning',
        color: 'babyBlue',
        checkedOfForDates: [ ],
        createdDate: '2023-02-18T18:30:00.000Z',
        repeatHabitDays: [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday' ]
      }
    ]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setHabits(JSON.parse(localStorage.getItem("Habits")));
  //   }
  // }, []);

  return (
    <HabitsContext.Provider value={{ habits, setHabits }}>
      {children}
    </HabitsContext.Provider>
  );
}
