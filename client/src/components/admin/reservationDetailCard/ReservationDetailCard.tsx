import type { Appointment } from "../../../types/appointment";
import "./ReservationDetailCard.css";

interface ReservationDetailCardProps {
  selectedReservation: Appointment;
}

function ReservationDetailCard({
  selectedReservation,
}: ReservationDetailCardProps) {
  return (
    <div className="reservationdetailcard-main">
      <h2>Détail de la réservation</h2>
      <div className="reservationdetailcard-header">
        <img
          src={selectedReservation.barber_avatar}
          alt={selectedReservation.barber_name}
        />
        <p>{selectedReservation.barber_name}</p>
        <img
          src={selectedReservation.customer_avatar}
          alt={selectedReservation.customer_firstname}
        />
        <p>
          {selectedReservation.customer_lastname}{" "}
          {selectedReservation.customer_firstname}
        </p>
      </div>
      <div className="reservationdetailcard-info">
        <p>{selectedReservation.status}</p>
        <p>{selectedReservation.location_type}</p>
        <p>{selectedReservation.prestation_name}</p>
        <p>{selectedReservation.appointment_date}</p>
        <p>{selectedReservation.duration_minutes} minutes</p>
      </div>
    </div>
  );
}

export default ReservationDetailCard;
