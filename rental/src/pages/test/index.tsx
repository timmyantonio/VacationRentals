import "./test.css";

import React, { useEffect, useState } from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";

import DatePicker from "react-datepicker";
import { format } from "date-fns";

export const Test = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  useEffect(() => {
    console.log(startDate?.toLocaleDateString("en-US"));
    console.log(format(startDate!, "MM-dd-yyyy"));
  }, [startDate]);
  return (
    <DatePicker
      minDate={startDate}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      isClearable
      placeholderText="Plan date..."
      className="red-border"
    />
  );
};
