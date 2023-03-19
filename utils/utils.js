import { format } from "date-fns";

export function getAllStreaks(dates) {
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

export function getTheLengthOfStreaks(streaks) {
  let lengths = [];

  for (let streakIndex = 0; streakIndex < streaks.length; streakIndex++) {
    lengths.push(streaks[streakIndex].length);
  }

  return lengths;
}

export function getTheBestStreakCount(streaks) {
  const streaksCount = getTheLengthOfStreaks(streaks);

  let bestCount;

  for (let i = 0; i < streaksCount.length; i++) {
    if (streaksCount.length === 1) {
      bestCount = streaksCount[0];
      return bestCount;
    }

    if (streaksCount[i] > streaksCount[i - 1]) {
      bestCount = streaksCount[i];
    } else {
      bestCount = streaksCount[i - 1];
    }
  }

  return bestCount;
}

export function getTheCurrentStreakCount(streaks, today, yesterday) {
  let currentStreakDates = [];

  const formattedToday = format(today, "yy-MM-dd");
  const formattedYesterday = format(yesterday, "yy-MM-dd");

  for (let streakIndex = 0; streakIndex < streaks.length; streakIndex++) {
    const dates = getFormattedDates(streaks[streakIndex]);

    for (let index = 0; index < dates.length; index++) {
      if (dates.length > 1) {
        if (
          dates[index]?.includes(formattedToday) ||
          dates[index]?.includes(formattedYesterday)
        ) {
          currentStreakDates = streaks[streakIndex];
        }
      } else if (dates.length === 1) {
        if (dates[0] === formattedToday || dates[0] === formattedYesterday) {
          currentStreakDates = [dates[0]];
        }
      }
    }
  }
  return currentStreakDates.length;
}

export const getSortedDates = (dates) => {
  return [...dates].sort((a, b) => a - b);
};

export const getFormattedDates = (dates) => {
  return dates.map((date) => format(new Date(date), "yy-MM-dd"));
};
