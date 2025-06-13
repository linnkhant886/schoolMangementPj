"use client";
import { useState } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [view, setView] = useState<View>(Views.WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        // Only week and day views
        views={["week", "day"]}
        view={view}
        onView={handleOnChangeView}
        // Time range (8 AM to 6 PM)
        min={new Date(2025, 1, 0, 8, 0, 0)}
        max={new Date(2025, 1, 0, 17, 0, 0)}
        style={{ height: "98%" }}
      />
  );
};

export default MyCalendar;
