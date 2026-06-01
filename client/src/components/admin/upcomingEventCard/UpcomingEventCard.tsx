import "./UpcomingEventCard.css";

interface UpcomingEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  status: "Publié" | "Brouillon" | "Planifié";
  statusClass: "status-published" | "status-draft" | "status-planned";
}

const upcomingEvents: UpcomingEvent[] = [
  {
    id: 1,
    title: "Summer Barber Fest",
    date: "15 Juin - 30 Juin 2026",
    location: "Paris",
    image:
      "https://beautyimages.bobitstudios.com/upload/_migratedbeauty/post/barberexpo-main-__-1000x784-s.JPG",
    status: "Publié",
    statusClass: "status-published",
  },
  {
    id: 2,
    title: "Back to School",
    date: "15 Août - 31 Août 2026",
    location: "Lyon",
    image:
      "https://i.pinimg.com/1200x/56/08/c1/5608c1a10589c38342af73f633449af2.jpg",
    status: "Brouillon",
    statusClass: "status-draft",
  },
  {
    id: 3,
    title: "Black Friday",
    date: "24 Nov - 30 Nov 2026",
    location: "Partout en France",
    image:
      "https://i.pinimg.com/736x/88/24/19/8824192fe1843a00b04c854b6febda9b.jpg",
    status: "Planifié",
    statusClass: "status-planned",
  },
];

function UpcomingEventCard() {
  return (
    <div className="upcoming-event-card-main">
      <div className="event-card-header">
        <h3>Événements à venir</h3>
        <a href="/admin/events" className="see-all-link">
          Voir tout
        </a>
      </div>

      <div className="event-card-list">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="event-item">
            <div className="event-info">
              <img
                src={event.image}
                alt={event.title}
                className="event-image"
              />
              <div className="event-text">
                <span className="event-title">{event.title}</span>
                <span className="event-details">📅 {event.date}</span>
                <span className="event-details">📍 {event.location}</span>
              </div>
            </div>

            <div className={`event-status-badge ${event.statusClass}`}>
              {event.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingEventCard;
