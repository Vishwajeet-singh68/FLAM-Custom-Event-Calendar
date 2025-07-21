import React, { useState } from 'react';
import Event from './Event';

const CalendarDay = ({ 
  day, 
  isCurrentMonth, 
  isToday, 
  isSelected, 
  events, 
  onClick, 
  onDrop, 
  onEditEvent, 
  onDeleteEvent,
  draggedEvent,
  onDragStart,
  onDragEnd
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  
  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const eventId = e.dataTransfer.getData('text/plain');
    onDrop(eventId, day);
  };
  
  return (
    <div
      className={`min-h-24 p-1 border border-gray-200 cursor-pointer transition-colors ${
        !isCurrentMonth ? 'bg-gray-50 text-gray-400' :
        isToday ? 'bg-blue-50 border-blue-300' :
        isSelected ? 'bg-blue-100' : 'bg-white hover:bg-gray-50'
      } ${isDragOver ? 'bg-blue-100 border-blue-400' : ''}`}
      onClick={() => onClick(day)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : ''}`}>
        {day.getDate()}
      </div>
      
      <div className="space-y-1">
        {events.slice(0, 3).map(event => (
          <Event
            key={event.id}
            event={event}
            onEdit={onEditEvent}
            onDelete={onDeleteEvent}
            isDragging={draggedEvent?.id === event.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
        {events.length > 3 && (
          <div className="text-xs text-gray-500">
            +{events.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDay;