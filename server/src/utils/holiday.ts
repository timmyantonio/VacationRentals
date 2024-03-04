import Holidays from "date-holidays";
import { addBusinessDays, isWeekend, format } from "date-fns";
const hd = new Holidays();
hd.init("PH");
type HolidayType = {
  date: string;
  start: Date;
  end: Date;
  name: string;
  type: string;
  rule: string;
  substitute?: boolean;
  note?: string;
};

const philHolidays = (date: Date) => {
  return hd
    .getHolidays(date)
    .filter(
      (h: HolidayType) => h.note === "Non-working Day" || h.type === "public"
    );
};
export const isPhilHoliday = (date: Date) => {
  return !!philHolidays(date).find((h) => {
    return (
      format(new Date(h.date), "MM-dd-yyyy") === format(date, "MM-dd-yyyy")
    );
  });
};

export const getNextBusinessDay = (date: Date) => {
  while (isPhilHoliday(date)) {
    if (!isWeekend(date)) break;
    date = addBusinessDays(date, 1);
  }
  return date;
};
