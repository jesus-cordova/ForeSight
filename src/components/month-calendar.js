//libraries
import React, { useState, useEffect } from "react";
import moment from "moment";
//icons
//css
import "./month-calendar.scss";
//custom components

function MonthCalendar(props) {
  const calendar = [];
  const [value, setValue] = useState(props.value);
  const originalDay = moment();
  const startMonthDay = value.clone().startOf("month");
  const endMonthDay = value.clone().endOf("month");
  const startDay = value.clone().startOf("month").startOf("week");
  const endDay = value.clone().endOf("month").endOf("week");
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const prevDay = startDay.clone().subtract(1, "day");
  while (prevDay.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => prevDay.add(1, "day").clone())
    );
  }

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  return (
    <div className="page-container">
      <div className="calendar-container">
        <div className="days-label">
          {daysOfWeek.map((day) => (
            <p>{day}</p>
          ))}
        </div>
        {calendar.map((week) => (
          <div className="week-container">
            {week.map((day) => (
              <div className="day-container">
                <p
                  className={
                    day.isBefore(startMonthDay, "day") ||
                    day.isAfter(endMonthDay, "day")
                      ? "day-out-of-month"
                      : "day-in-month"
                  }
                  id={
                    day.isSame(value, "day") && day.isSame(originalDay, "month")
                      ? "currentDate"
                      : ""
                  }
                >
                  {day.format("D")}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthCalendar;
