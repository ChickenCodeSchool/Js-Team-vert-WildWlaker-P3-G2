import { FiMail, FiPhone } from "react-icons/fi";

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
      <div
        className={`reservationdetailcard-status status-${selectedReservation.status?.toLowerCase()} `}
      >
        {selectedReservation.status}
      </div>
      <div className="reservationdetailcard-header">
        <h3>Information du coiffeur</h3>
        <div className="reservationdetailcard-user-info">
          <img
            className="reservationdetailcard-avatar"
            src={selectedReservation.barber_avatar}
            alt={selectedReservation.barber_name}
          />
          {/* <p>{selectedReservation.barber_postal_code}</p>
            <p>{selectedReservation.barber_city}</p>
            <p>{selectedReservation.barber_adress}</p> */}
          <div className="reservationdetailcard-user-info-text">
            <p>{selectedReservation.barber_name}</p>
            <p>
              <FiPhone />
              {selectedReservation.barber_phone}
            </p>
            <p>
              <FiMail />
              {selectedReservation.barber_email}
            </p>
          </div>
        </div>
        <h3>Information du client</h3>
        <div className="reservationdetailcard-user-info">
          <img
            className="reservationdetailcard-avatar"
            src={selectedReservation.customer_avatar}
            alt={selectedReservation.customer_firstname}
          />
          <div className="reservationdetailcard-user-info-text">
            <p>
              {selectedReservation.customer_lastname}{" "}
              {selectedReservation.customer_firstname}
            </p>
            <p>
              <FiPhone />
              {selectedReservation.customer_phone}
            </p>
            <p>
              <FiMail />
              {selectedReservation.customer_email}
            </p>
          </div>
        </div>
        {/* <p>{selectedReservation.customer_postal_code}</p>
        <p>{selectedReservation.customer_city}</p>
        <p>{selectedReservation.customer_adress}</p> */}
      </div>
      <div className="reservationdetailcard-prestation-info">
        <p>{selectedReservation.location_type}</p>
        <p>{selectedReservation.prestation_name}</p>
        <p>{selectedReservation.appointment_date}</p>
        <p>{selectedReservation.price} €</p>
        <p>{selectedReservation.duration_minutes} minutes</p>
      </div>
    </div>
  );
}

export default ReservationDetailCard;
