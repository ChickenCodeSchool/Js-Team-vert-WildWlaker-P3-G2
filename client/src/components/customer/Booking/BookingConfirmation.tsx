import confetti from "canvas-confetti";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./BookingConfirmation.css";
import type { Booking } from "./BookingTypes";

type Props = {
  booking: Booking;
};

function BookingConfirmation({ booking }: Props) {
  const navigate = useNavigate();
  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.3 },
      colors: ["#C9A84C", "#F5E6C8", "#8B6914"],
    });
  }, []);

  return (
    <div className="booking-confirmation">
      <h2 className="booking-confirmation__title">Réservation Confirmée🎉</h2>

      <p className="booking-confirmation__message">
        Votre rendez-vous à été enregistré
      </p>
      <div className="booking-confirmation__card">
        <p className="booking-confirmation__item">
          <strong>Barber:</strong> {booking.barber?.name}
        </p>
        <p className="booking-confirmation__item">
          <strong>Service:</strong> {booking.prestation?.name}
        </p>

        <p className="booking-confirmation__item">
          <strong>Date :</strong>{" "}
          {booking.appointmentDate
            ? new Date(booking.appointmentDate).toLocaleString("fr-FR")
            : "-"}
        </p>
        <p className="booking-confirmation__item">
          <strong>Heure :</strong> {booking.appointmentTime ?? "-"}
        </p>
      </div>
      <button
        type="button"
        className="booking-confirmation__button"
        onClick={() => navigate("/reservations")}
      >
        Voir mes réservations
      </button>
      <button
        type="button"
        className="booking-confirmation-home__button"
        onClick={() => navigate("/")}
      >
        Retour à l'accueil
      </button>
    </div>
  );
}
export default BookingConfirmation;
