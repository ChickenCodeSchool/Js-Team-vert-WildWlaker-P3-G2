import { FiCalendar, FiClock } from "react-icons/fi";
import "./ReservationCard.css";
import type { Reservation } from "./ReservationType";

type Props = {
  reservation: Reservation;
};
const statusLabels: Record<string, string> = {
  confirmed: "Confirmé",
  pending: "En attente",
  completed: "Terminé",
  cancelled: "Annulé",
};

function ReservationCard({ reservation }: Props) {
  return (
    <article className="reservation-card">
      <div className="reservation-card__header">
        <img
          className="reservation-card__avatar"
          src={reservation.barber_avatar}
          alt={reservation.barber_name}
        />
        <div className="reservation-card__title-container">
          <h3 className="reservation-card__title">{reservation.barber_name}</h3>

          <p className="reservation-card__service">
            {reservation.prestation_name}
          </p>
        </div>
      </div>
      <div className="reservation-card__infos">
        <span>
          <FiCalendar />{" "}
          {new Date(reservation.appointment_date).toLocaleDateString("fr-FR")}
        </span>

        <span>
          <FiClock />{" "}
          {new Date(reservation.appointment_date).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <span
        className={`reservation-card__status reservation-card__status--${reservation.status}`}
      >
        {" "}
        {statusLabels[reservation.status] ?? reservation.status}
      </span>
    </article>
  );
}

export default ReservationCard;
