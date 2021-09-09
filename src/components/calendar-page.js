//libraries
import React, { useState, useEffect } from "react";
import moment from "moment";
//icons
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
//css
import "./calendar-page.scss";
//custom components
import MonthCalendar from "./month-calendar";
import WeekCalendar from "./week-calendar";

function CalendarPage() {
  const [value, setValue] = useState(moment());
  let monthPreview = [];
  monthPreview.push(value.clone().subtract(1, "month").format("MMMM"));
  monthPreview.push(value.format("MMMM"));
  monthPreview.push(value.clone().add(1, "month").format("MMMM"));
  console.log(monthPreview);
  function previousMonth() {
    monthPreview = [];
    setValue(value.clone().subtract(1, "month"));
  }
  function nextMonth() {
    monthPreview = [];
    setValue(value.clone().add(1, "month"));
  }
  return (
    <div>
      <div className="main-section">
        <div className="label-container">
          <div className="view-switcher">
            <button>Month</button>
            <button>Week</button>
            <button>Agenda</button>
          </div>
          <div className="month-switcher">
            <ArrowLeftIcon onClick={previousMonth} />
            <div className="month-preview">
              {monthPreview.map((month, index) => {
                if (index === 0)
                  return <p>{month.slice(month.length - 3, month.length)}</p>;
                else if (index === 1) return <p>{month}</p>;
                else if (index === 2) return <p>{month.slice(0, 3)}</p>;
              })}
            </div>
            <ArrowRightIcon onClick={nextMonth} />
          </div>
          <div className="feature-switcher">feature3</div>
        </div>
        <WeekCalendar
          value={value}
          nextMonth={nextMonth}
          prevMonth={previousMonth}
        />
      </div>
    </div>
  );
}

export default CalendarPage;
