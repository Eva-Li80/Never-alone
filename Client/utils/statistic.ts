import { Mood } from "./types";

const today = new Date();
const icons: string[] = ["😢", "👎", "👌", "👍", "😊"];

export const getMonthlyData = (data: Mood[] | null) => {
  if (data === null) return null;
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() - 20
  );

  const endDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 1
  );

  const result = data?.filter((element) => {
    if (
      new Date(element.date).getDay() >= startDate.getDay() &&
      new Date(element.date).getDay() <= endDate.getDay()
    )
      return true;
    else {
      return false;
    }
  });
  const results = sortData(result);
  return results;
};

export const getWeeklyData = (data: Mood[] | null) => {
  if (data === null) return null;
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() - 7
  );

  const endDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 1
  );

  const result = data?.filter((element) => {
    if (
      new Date(element.date).getDay() >= startDate.getDay() &&
      new Date(element.date).getDay() <= endDate.getDay()
    )
      return true;
    else {
      return false;
    }
  });
  const results = sortData(result);
  return results;
};

export function sortData(data: Mood[]) {
  const numberArray: number[] = [];
  for (var icon of icons) {
    const number = data?.filter((element) => {
      if (element.icon === icon) {
        return true;
      } else {
        return false;
      }
    });

    numberArray.push(number.length);
  }

  return numberArray;
}
