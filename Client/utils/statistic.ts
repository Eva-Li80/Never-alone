import { Mood } from "./types";

export const getDateToString = (data: Mood[] | null) => {
  const dateArray: string[] = [];
  if (data != null) {
    for (var item of data) {
      const number = new Date(item.date).toDateString();

      dateArray.push(number.substring(3, 10));
    }
  }

  return dateArray.slice(-7);
};

export const getNumber = (data: Mood[] | null) => {
  const dateArray: number[] = [];
  if (data != null) {
    for (var item of data) {
      const number = item.value;

      dateArray.push(number);
    }
  }

  return dateArray.slice(-7);
};
