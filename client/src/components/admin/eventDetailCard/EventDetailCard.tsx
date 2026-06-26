import { FiCalendar, FiMapPin } from "react-icons/fi";
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
        <button
          type="button"
          className="event-detail-card-close"
          onClick={() => window.history.back()}
        >
          ×
        </button>
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
              <span className="event-detail-info-label">Date de début</span>
              <div className="event-detail-info-text">
                <FiCalendar className="event-detail-info-icon" />
                <p>
                  {new Date(selectedEvent.start_date).toLocaleString("fr-FR")}
                </p>
              </div>
            </div>
            <div className="event-detail-info-item">
              <span className="event-detail-info-label">Date de fin</span>
              <div className="event-detail-info-text">
                <FiCalendar className="event-detail-info-icon" />
                <p>
                  {new Date(selectedEvent.end_date).toLocaleString("fr-FR")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="event-detail-section">
          <h3 className="event-detail-section-title">Localisation</h3>
          <div className="event-detail-info-item">
            <span className="event-detail-info-label">Lieu</span>
            <div className="event-detail-info-text">
              <FiMapPin className="event-detail-info-icon" />
              <p>{selectedEvent.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="event-detail-card-actions">
        <button type="button" className="btn-primary">
          Modifier
        </button>
        <button type="button" className="btn-success">
          Publier
        </button>
        <button type="button" className="btn-danger">
          Annuler
        </button>
      </div>
    </div>
  );
}

export default EventDetailCard;
