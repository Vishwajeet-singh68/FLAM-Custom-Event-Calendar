import { useCalendar } from '../hooks/useCalendar';
import DayCell from './DayCell';
import { useEvents } from '../hooks/useEvents';

export default function Calendar({ searchTerm, onEventClick, onDayClick }) {
  const {
    currentDate,
    daysInMonth,
    startDay,
    nextMonth,
    prevMonth,
    moveEvent
  } = useCalendar();

  const { searchEvents } = useEvents();
  const filteredEvents = searchEvents(searchTerm);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button 
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-3">
        {days.map(day => (
          <div key={day} className="text-center font-semibold p-2 text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={`empty-${index}`} className="h-28 border rounded-lg p-1 bg-gray-50" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          
          return (
            <DayCell 
              key={day}
              date={date}
              events={filteredEvents}
              onEventClick={onEventClick}
              onDayClick={onDayClick}
              onDrop={(date) => moveEvent(date)}
            />
          );
        })}
      </div>
    </div>
  );
}