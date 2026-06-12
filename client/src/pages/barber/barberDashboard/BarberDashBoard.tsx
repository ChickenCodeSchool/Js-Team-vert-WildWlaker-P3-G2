import { useEffect, useState } from "react";
import ReservationCardPlanning from "../../../components/barber/reservationCard/ReservationCardPlanning";
import StatsGraphCardBarber from "../../../components/barber/statsGraphCardBarber/StatsGraphCardBarber";

import "./BarberDashBoard.css";

import { FaRegCalendarAlt } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { PiStarThin } from "react-icons/pi";

type ApiReservation = {
  id_appointment: number;
  appointment_date: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  customer_firstname: string;
  customer_lastname: string;
  customer_avatar: string;
  prestation_name: string;
  duration: number;
};

type Review = {
  id_review: number;
  rating: number;
};

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function BarberDashBoard() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [reservations, setReservations] = useState<ApiReservation[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/appointments`)
      .then((res) => res.json())
      .then((data) => setReservations(data));

    fetch(`${apiUrl}/api/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  const todayKey = formatDateKey(new Date());
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const reservationsThisMonth = reservations.filter((reservation) => {
    const date = new Date(reservation.appointment_date);

    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  });

  const upcomingReservations = reservations.filter((reservation) => {
    const date = new Date(reservation.appointment_date);

    return (
      date >= new Date() &&
      (reservation.status === "confirmed" || reservation.status === "pending")
    );
  });

  const todayReservations = reservations
    .filter((reservation) => {
      const reservationDate = formatDateKey(
        new Date(reservation.appointment_date),
      );

      return reservationDate === todayKey;
    })
    .sort(
      (a, b) =>
        new Date(a.appointment_date).getTime() -
        new Date(b.appointment_date).getTime(),
    );

  return (
    <div>
      <div className="stats-cards-container">
        <StatsGraphCardBarber
          Icon={FaRegCalendarAlt}
          value={reservationsThisMonth.length}
          title="RDV NOMBRE"
          cycle="mois"
        />

        <StatsGraphCardBarber
          Icon={GoClock}
          value={upcomingReservations.length}
          title="attente"
          cycle="avenir"
        />

        <StatsGraphCardBarber
          Icon={PiStarThin}
          value={reviews.length}
          title="avis"
          cycle="total"
        />
      </div>

      <section className="dashboard-reservations">
        <h2>Réservations du jour</h2>

        {todayReservations.length > 0 ? (
          todayReservations.map((reservation) => (
            <ReservationCardPlanning
              key={reservation.id_appointment}
              avatar={reservation.customer_avatar}
              time={new Date(reservation.appointment_date).toLocaleTimeString(
                "fr-FR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )}
              customerName={`${reservation.customer_firstname} ${reservation.customer_lastname}`}
              service={reservation.prestation_name}
              status={
                reservation.status === "completed"
                  ? "confirmed"
                  : reservation.status
              }
              duration={reservation.duration}
            />
          ))
        ) : (
          <p>Aucune réservation aujourd’hui</p>
        )}
      </section>
    </div>
  );
}

export default BarberDashBoard;
