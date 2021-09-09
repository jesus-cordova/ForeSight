//libraries
import React, { useState, useEffect } from "react";
import moment from "moment";
//icons
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
//css
import "./week-calendar.scss";
//custom components

function WeekCalendar(props) {
  const { value, setValue } = props
  const startWeekDay = value.clone().startOf("week").subtract(1, "day");
  const endWeekDay = value.clone().endOf("week");
  const originalDay = moment();
  const currentWeek = [];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  while (startWeekDay.isBefore(endWeekDay, "day")) {
    currentWeek.push(startWeekDay.add(1, "day").clone());
  }
  function prevWeek() {
    setValue(value.clone().subtract(1, "week"));
  }
  function nextWeek() {
    console.log(
      "last week of the month    " + value.clone().endOf("month").week()
    );
    console.log("current week   " + value.clone().week());

    if (value.clone().week() === value.clone().endOf("month").week()) {
      console.log(" it worked");
      props.nextMonth();
    }
    setValue(value.clone().add(1, "week"));
  }
  useEffect(() => {
    setValue(value);
  }, [value]);
  return (
    <div className="week-container">
      <ArrowLeftIcon onClick={prevWeek} />
      {currentWeek.map((day, index) => (
        <div className="slot-container">
          <div className="date-label">{day.format("D")}</div>
          <div
            className="day-label"
            id={
              day.isSame(value, "day") &&
              day.isSame(originalDay, "week") &&
              day.isSame(originalDay, "month")
                ? "currentDate"
                : ""
            }
          >
            {daysOfWeek[index]}
          </div>
          <div className="day-container"></div>
        </div>
      ))}
      <ArrowRightIcon onClick={nextWeek} />
    </div>
  );
}

export default WeekCalendar;
