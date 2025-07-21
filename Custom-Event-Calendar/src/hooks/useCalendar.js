import { useState } from 'react';
import { getDaysInMonth, getStartDayOfMonth } from '../utils/dateUtils';

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = getDaysInMonth(currentDate);
  const startDay = getStartDayOfMonth(currentDate);

  const nextMonth = () => {
    setCurrentDate(new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    ));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    ));
  };

  return {
    currentDate,
    daysInMonth,
    startDay,
    nextMonth,
    prevMonth
  };
}