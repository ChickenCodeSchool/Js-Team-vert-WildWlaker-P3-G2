import { useEffect, useState } from "react";
import type { Event } from "../types/event";

function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return events;
}

export default useEvents;
