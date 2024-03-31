import React, { createContext, useEffect, useState } from 'react';
import eventService from './services/eventService';

const EventsContext = createContext();

const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState()

  useEffect(() => {
    (async () => {
      // Récupération des évennements populaires
      const eventsData = await eventService.fetchEvents(
        { maxResults: 20, minRating: 4.5, page: 1 },
        setLoading
      );
      setEvents(eventsData);
    })();
  }, []);

  const doRateEvent = async (event, userRating) => {
    const updatedEvent = await eventService.updateEventRating(event, userRating)
    const updatedEvents = events.map((e) =>
      e.id === event.id ? updatedEvent : e
    );
    setEvents(updatedEvents);
  }

  const updateEventFilling = async (event, filling) => {
    const updatedEvent = await eventService.updateEventFilling(event, filling)
    const updatedEvents = events.map((e) =>
      e.id === event.id ? updatedEvent : e
    );
    setEvents(updatedEvents);
  }

  return (
    <EventsContext.Provider value={{ events, loading, doRateEvent, updateEventFilling }}>
      {children}
    </EventsContext.Provider>
  );
};

export default { EventsContext, EventsProvider };
