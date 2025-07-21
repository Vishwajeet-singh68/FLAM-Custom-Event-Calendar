import Event from './Event';
import { useDragAndDrop } from '../hooks/useDragAndDrop';

export default function DayCell({ date, events, onEventClick, onDayClick, onDrop }) {
  const { handleDragOver } = useDragAndDrop();
  const dayEvents = events.filter(e => 
    new Date(e.date).toDateString() === date.toDateString()
  );

  const handleDrop = (e) => {
    e.preventDefault();
    const eventId = e.dataTransfer.getData('text/plain');
    if (eventId && onDrop) {
      onDrop(eventId, date);
    }
  };

  return (
    <div 
      onClick={() => onDayClick({ date })}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`h-28 border rounded-lg p-1 hover:bg-gray-50 cursor-pointer transition-colors ${
        date.toDateString() === new Date().toDateString() ? 
        'bg-blue-50 border-blue-200' : 'border-gray-200'
      }`}
    >
      <div className="flex justify-between">
        <span className={`text-sm font-medium ${
          date.toDateString() === new Date().toDateString() ? 
          'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : 
          'text-gray-700'
        }`}>
          {date.getDate()}
        </span>
      </div>
      <div className="overflow-y-auto max-h-20 space-y-1 mt-1">
        {dayEvents.map(event => (
          <Event 
            key={event.id} 
            event={event} 
            onClick={() => onEventClick(event)}
          />
        ))}
      </div>
    </div>
  );
}