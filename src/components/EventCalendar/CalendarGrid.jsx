import React from 'react';
import CalendarDay from './CalendarDay';
import { DAYS_OF_WEEK } from '../../utils/constants';
import { 
  startOfMonth, 
  endOfMonth, 
  addDays, 
  isSameDay,
  format 
} from '../../utils/dateUtils';

const CalendarGrid = ({ 
  currentDate, 
  selectedDate, 
  events, 
  onDayClick, 
  onEventDrop,
  onEditEvent,
  onDeleteEvent,
  draggedEvent,
  onDragStart,
  onDragEnd
}) => {
  const generateCalendarDays = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const startOfWeek = addDays(start, -start.getDay());
    const endOfWeek = addDays(end, 6 - end.getDay());
    
    const days = [];
    let day = startOfWeek;
    
    while (day <= endOfWeek) {
      days.push(new Date(day));
      day = addDays(day, 1);
    }
    
    return days;
  };
  
  const getEventsForDay = (day) => {
    const dayString = format(day, 'YYYY-MM-DD');
    return events.filter(event => event.date === dayString);
  };
  
  const today = new Date();
  const calendarDays = generateCalendarDays();
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-gray-700">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7">
        {calendarDays.map((day, index) => {
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isToday = isSameDay(day, today);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const dayEvents = getEventsForDay(day);
          
          return (
            <CalendarDay
              key={index}
              day={day}
              isCurrentMonth={isCurrentMonth}
              isToday={isToday}
              isSelected={isSelected}
              events={dayEvents}
              onClick={onDayClick}
              onDrop={onEventDrop}
              onEditEvent={onEditEvent}
              onDeleteEvent={onDeleteEvent}
              draggedEvent={draggedEvent}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;