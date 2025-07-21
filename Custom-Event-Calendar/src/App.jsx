import { useState } from 'react';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import { EventProvider } from './hooks/useEvents';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <EventProvider>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-blue-600">Event Calendar</h1>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          
          <Calendar 
            searchTerm={searchTerm}
            onEventClick={(event) => {
              setSelectedEvent(event);
              setShowForm(true);
            }}
            onDayClick={() => {
              setSelectedEvent(null);
              setShowForm(true);
            }}
          />
          
          {showForm && (
            <EventForm 
              event={selectedEvent} 
              onClose={() => setShowForm(false)}
            />
          )}
        </div>
      </div>
    </EventProvider>
  );
}

export default App;