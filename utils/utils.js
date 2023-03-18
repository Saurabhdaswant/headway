import { format } from "date-fns";

export function getConsecutiveDateArrays(dates) {
  const sortedDates = getSortedDates(dates);

  let result = [];

  if (sortedDates.length === 0) {
    return result;
  }

  let currentArray = [sortedDates[0]];

  for (let i = 1; i < sortedDates.length; i++) {
    // If the difference between the current date and the previous date is greater than one day,
    // we start a new sub-array
    if (sortedDates[i] - sortedDates[i - 1] > 86400000) {
      // 86400000 is the number of milliseconds in one day
      result.push(currentArray);
      currentArray = [];
    }
    currentArray.push(sortedDates[i]);
  }

  result.push(currentArray);

  return result;
}

export function getTheLengthOfChildArrays(array) {
  let lengths = [];

  for (let i = 0; i < array.length; i++) {
    lengths.push(array[i].length);
  }

  return lengths;
}

export function findTheBestStreakCount(list) {
  const array = getTheLengthOfChildArrays(list);

  let bestCount;

  for (let i = 0; i < array.length; i++) {
    if (array.length === 1) {
      bestCount = array[0];
      return bestCount;
    }

    if (array[i] > array[i - 1]) {
      bestCount = array[i];
    } else {
      bestCount = array[i - 1];
    }
  }

  return bestCount;
}

export function findTheCurrentStreakDates(array, today, yesterday) {
  let currentStreakDates = [];

  const formattedToday = format(today, "yyyy-M-d");
  const formattedYesterday = format(yesterday, "yyyy-M-d");
  const formattedDates = [];
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);

    const dates = array[i]?.map((date, idx) => {
      const currDate = date.getDate();
      const currMonth = date.getMonth() + 1;
      const currYear = date.getFullYear();
      return `${currYear}-${currMonth}-${currDate}`;
    });

    formattedDates.push(dates);
    console.log(dates);

    // dates !== null && dates !== undefined &&

    for (let index = 0; index < dates.length; index++) {
      //   const element = array[index];
      if (dates.length > 1) {
        if (
          dates[index]?.includes(formattedToday) ||
          dates[index]?.includes(formattedYesterday)
        ) {
          currentStreakDates = array[i];
        }
      } else if (dates.length === 1) {
        if (dates[0] === formattedToday || dates[0] === formattedYesterday) {
          currentStreakDates = [dates[0]];
        }
      }
    }
  }
  console.log(formattedDates);
  console.log(currentStreakDates);

  return currentStreakDates;
}

export function removeDuplicateDates(dates) {
  return [...new Set(dates.map((date) => date.getTime()))].map(
    (time) => new Date(time)
  );
}

const pureDates = [
  new Date("2022-01-01"),
  new Date("2022-01-02"),
  new Date("2022-01-03"),
  new Date("2022-01-04"),
  new Date("2022-01-05"),
  new Date("2022-01-06"),
  new Date("2022-01-08"),
  new Date("2022-01-09"),
  new Date("2022-01-10"),
  new Date("2022-01-11"),
  new Date("2022-01-12"),
  new Date("2022-01-13"),
  new Date("2022-01-14"),
  new Date("2022-01-16"),
  new Date("2022-01-17"),
  new Date("2022-01-18"),
  new Date("2022-01-19"),
];
// export const dates = [...pureDates].sort((a, b) => a - b);

export const getSortedDates = (dates) => {
  return [...dates].sort((a, b) => a - b);
};
