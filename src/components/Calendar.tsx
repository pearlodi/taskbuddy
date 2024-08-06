import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date()),
  getDay,
  locales,
});

const CalendarComponent: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);

  const events = todos.map(todo => ({
    title: todo.text,
    start: new Date(todo.dueDate || new Date()),
    end: new Date(todo.dueDate || new Date()),
  }));

  return (
 
   <div>
         {events.length === 0 ? (
          <p className='text-center text-white font-bold text-xl  md:mt-0 mt-8'>
            Please add a new task to view
          </p>
        ) : (
            <div className="calendar-mobile md:mt-0 mt-8">
            <div className="mobile-calendar">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: "50px" }}
          />
          </div>
          </div>
        )}
     
   </div>
  );
};

export default CalendarComponent;
