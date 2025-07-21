import React from 'react';
import { Clock } from 'lucide-react';

const Event = ({ event, onEdit, onDelete, isDragging, onDragStart, onDragEnd }) => {
  const colorClass = EVENT_COLORS.find(c => c.value === event.color)?.class || 'bg-blue-500';
  
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', event.id);
    onDragStart(event);
  };
  
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      className={`${colorClass} text-white text-xs p-1 rounded cursor-pointer mb-1 transition-opacity ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } hover:opacity-80`}
      onClick={(e) => {
        e.stopPropagation();
        onEdit(event);
      }}
    >
      <div className="font-medium truncate">{event.title}</div>
      <div className="flex items-center gap-1 text-white/80">
        <Clock size={10} />
        <span>{event.time}</span>
        {event.isRecurring && <span>↻</span>}
      </div>
    </div>
  );
};

// Define EVENT_COLORS if not imported from elsewhere
const EVENT_COLORS = [
  { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
  { value: 'green', label: 'Green', class: 'bg-green-500' },
  { value: 'red', label: 'Red', class: 'bg-red-500' },
  { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
  { value: 'yellow', label: 'Yellow', class: 'bg-yellow-500' },
  { value: 'pink', label: 'Pink', class: 'bg-pink-500' },
];

export default Event;