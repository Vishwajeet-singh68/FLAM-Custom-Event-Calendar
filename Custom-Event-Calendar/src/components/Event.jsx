export default function Event({ event, onClick }) {
  return (
    <div 
      onClick={onClick}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', event.id);
        e.currentTarget.classList.add('opacity-50');
      }}
      onDragEnd={(e) => {
        e.currentTarget.classList.remove('opacity-50');
      }}
      className="text-xs p-1.5 mb-1 rounded cursor-pointer transition-all hover:shadow-sm"
      style={{ 
        backgroundColor: `${event.color}20`,
        borderLeft: `3px solid ${event.color || '#3B82F6'}`,
        color: event.color || '#3B82F6'
      }}
    >
      <div className="font-medium truncate">{event.title}</div>
      <div className="text-xs opacity-75">
        {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
}