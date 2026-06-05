import { useEffect, useState } from "react";
import { API_ROUTES } from "../api/routes";
import type { Event } from "../types/event";

function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch(API_ROUTES.events)
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return events;
}

export default useEvents;
