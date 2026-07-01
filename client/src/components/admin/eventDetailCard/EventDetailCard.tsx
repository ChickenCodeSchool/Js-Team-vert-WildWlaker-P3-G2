import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FiCalendar, FiEdit2, FiMapPin } from "react-icons/fi";
import type { Event } from "../../../types/event";
import "./EventDetailCard.css";

interface EventDetailCardProps {
  selectedEvent: Event | null;
}

function EventDetailCard({ selectedEvent }: EventDetailCardProps) {
  if (!selectedEvent) {
    return (
      <div className="event-detail-card-empty">
        <p>Sélectionnez un événement pour voir ses détails</p>
      </div>
    );
  }

  return (
    <div className="event-detail-card-main">
      <div className="event-detail-card-header">
        <h2 className="event-detail-card-title">Détail de l'événement</h2>
      </div>

      <div className="event-detail-card-preview">
        <img src={selectedEvent.image_url} alt={selectedEvent.title} />
      </div>

      <div className="event-detail-card-body">
        <div className="event-detail-section">
          <h3 className="event-detail-section-title">Informations générales</h3>
          <div className="event-detail-info-group">
            <div className="event-detail-info-item">
              <span className="event-detail-info-label">Titre</span>
              <p>{selectedEvent.title}</p>
            </div>
            <div className="event-detail-info-item">
              <span className="event-detail-info-label">Statut</span>
              <span
                className={`status-badge status-${selectedEvent.status?.toLowerCase()}`}
              >
                {selectedEvent.status}
              </span>
            </div>
          </div>
          <div className="event-detail-info-item">
            <span className="event-detail-info-label">Description</span>
            <p>{selectedEvent.description}</p>
          </div>
        </div>

        <div className="event-detail-section">
          <h3 className="event-detail-section-title">Planification</h3>
          <div className="event-detail-info-group">
            <div className="event-detail-info-item">
              <span className="event-detail-info-label">
                <FiCalendar />
                Date de début
              </span>
              <div className="event-detail-info-text">
                <p>
                  {format(
                    new Date(selectedEvent.start_date),
                    "dd MMMM yyyy HH:mm",
                    { locale: fr },
                  )}
                </p>
              </div>
            </div>
            <div className="event-detail-info-item">
              <div className="event-detail-info-text">
                <span className="event-detail-info-label">
                  <FiCalendar />
                  Date de fin
                </span>
                <p>
                  {format(
                    new Date(selectedEvent.end_date),
                    "dd MMMM yyyy HH:mm",
                    { locale: fr },
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="event-detail-section">
          <h3 className="event-detail-section-title">Localisation</h3>
          <div className="event-detail-info-item">
            <span className="event-detail-info-label">
              <FiMapPin /> Lieu
            </span>
            <div className="event-detail-info-text">
              <p>{selectedEvent.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="event-detail-card-actions">
        <h2>Actions rapides</h2>
        <button className="btn-modify" type="button">
          <FiEdit2 /> Modifier l'événement
        </button>
      </div>
    </div>
  );
}

export default EventDetailCard;
