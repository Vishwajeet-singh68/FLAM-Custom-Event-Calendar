import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar } from 'lucide-react';

const CalendarHeader = ({ 
  currentDate, 
  onPreviousMonth, 
  onNextMonth, 
  onToday, 
  onAddEvent 
}) => {
  const monthYear = currentDate.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="text-blue-600" />
          Event Calendar
        </h1>
        <button
          onClick={onAddEvent}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Event
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-semibold min-w-48 text-center">
            {monthYear}
          </h2>
          <button
            onClick={onNextMonth}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <button
          onClick={onToday}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Today
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;