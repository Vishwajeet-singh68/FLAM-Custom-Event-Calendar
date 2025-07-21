import { createContext, useContext, useState, useEffect } from 'react';
import { getFromStorage, saveToStorage } from '../utils/storage';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const savedEvents = getFromStorage('events') || [];
    setEvents(savedEvents);
  }, []);

  const addEvent = (event) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
      color: event.color || '#3B82F6'
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    saveToStorage('events', updatedEvents);
    return newEvent;
  };

  const updateEvent = (id, updatedEvent) => {
    const updatedEvents = events.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    );
    setEvents(updatedEvents);
    saveToStorage('events', updatedEvents);
  };

  const deleteEvent = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    saveToStorage('events', updatedEvents);
  };

  const moveEvent = (id, newDate) => {
    const eventToMove = events.find(event => event.id === id);
    if (!eventToMove) return;

    const updatedDate = new Date(newDate);
    const originalDate = new Date(eventToMove.date);
    
    updatedDate.setHours(
      originalDate.getHours(),
      originalDate.getMinutes(),
      originalDate.getSeconds()
    );

    const updatedEvent = {
      ...eventToMove,
      date: updatedDate.toISOString()
    };

    const updatedEvents = events.map(event => 
      event.id === id ? updatedEvent : event
    );
    
    setEvents(updatedEvents);
    saveToStorage('events', updatedEvents);
  };

  const searchEvents = (term) => {
    if (!term.trim()) return events;
    const lowerTerm = term.toLowerCase();
    return events.filter(event => 
      event.title.toLowerCase().includes(lowerTerm) ||
      (event.description && event.description.toLowerCase().includes(lowerTerm))
    );
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        moveEvent,
        searchEvents
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventContext);
}