import confetti from "canvas-confetti";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./BookingConfirmation.css";
import type { Booking } from "./BookingTypes";

const API_URL = import.meta.env.VITE_API_URL;

type Props = {
  booking: Booking;
};
function BookingConfirmation({ booking }: Props) {
  const navigate = useNavigate();
  useEffect(() => {
    const confirmBooking = async () => {
      
      const token = localStorage.getItem("token");
      if (
        !booking.barber ||
        !booking.prestation ||
        !booking.appointmentDate ||
        !booking.appointmentTime ||
        !booking.locationType
      ) {
        return;
      }

      try {
        console.log("J'envoie la requête vers :", `${API_URL}/api/appointments`);
        const res = await fetch(`${API_URL}/api/appointments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appointment_date: `${booking.appointmentDate} ${booking.appointmentTime}:00`,
            location_type: booking.locationType,
            id_prestation: booking.prestation.Id_prestation,
            id_user_barber: booking.barber.id_user,
          }),
        });
        console.log("POST STATUS :", res.status);
        console.log(booking);
        if (!res.ok) {
          throw new Error("Erreur lors de la réservation");
        }

        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.3 },
          colors: ["#C9A84C", "#F5E6C8", "#8B6914"],
        });
      } catch (err) {
        console.error(err);
      }
    };

    confirmBooking();
  }, [booking]);

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
