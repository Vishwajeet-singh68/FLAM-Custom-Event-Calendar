import { useState } from 'react';

export function useDragAndDrop() {
  const [draggedEvent, setDraggedEvent] = useState(null);

  const handleDragStart = (event, e) => {
    e.dataTransfer.setData('text/plain', event.id);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedEvent(event);
  };

  const handleDrop = (date, onEventMove) => {
    if (!draggedEvent) return;
    
    const newDate = new Date(date);
    const originalDate = new Date(draggedEvent.date);
    newDate.setHours(
      originalDate.getHours(),
      originalDate.getMinutes(),
      originalDate.getSeconds()
    );

    onEventMove(draggedEvent.id, newDate.toISOString());
    setDraggedEvent(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  return {
    handleDragStart,
    handleDrop,
    handleDragOver,
    draggedEvent
  };
}