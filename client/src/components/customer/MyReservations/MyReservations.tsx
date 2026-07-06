import { useEffect, useState } from "react";
import ReservationCard from "./ReservationCard";
import "./MyReservations.css";
import type { Review } from "../../../types/review";
import type { Reservation } from "./ReservationType";

function MyReservations() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [appointments, setAppointments] = useState<Reservation[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("TOKEN AU MOMENT DU FETCH:", token);
    if (!token) {
      console.error("Aucun token trouvé");
      return;
    }
    console.log(API_URL);
    fetch(`${API_URL}/api/reservations`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        return res.json();
      })
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Erreur chargement réservations", err));
  }, []);
  fetch(`${API_URL}/api/appointments/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(async (res) => {
    console.log("STATUS", res.status);

    const text = await res.text();
    console.log(text);

    return JSON.parse(text);
  });
  useEffect(() => {
    fetch(`${API_URL}/api/reviews`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        return res.json();
      })
      .then((data) => setReviews(data))
      .catch((err) => console.error("Erreur chargement avis", err));
  }, []);

  const now = new Date();

  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.appointment_date);

    if (activeTab === "upcoming") {
      return appointmentDate >= now;
    }

    return appointmentDate < now;
  });

  return (
    <section className="reservations">
      <h1 className="reservations__title">Mes réservations</h1>

      <div className="reservations__tabs">
        <button
          type="button"
          className={`reservations__tab ${
            activeTab === "upcoming" ? "reservations__tab--active" : ""
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          A venir
        </button>
        <button
          type="button"
          className={`reservations__tab ${
            activeTab === "past" ? "reservations__tab--active" : ""
          }`}
          onClick={() => setActiveTab("past")}
        >
          Passées
        </button>
      </div>
      <div className="reservations__list">
        {filteredAppointments.map((appointment) => {
          const review = reviews.find(
            (review) => review.id_appointment === appointment.id_appointment,
          );

          return (
            <ReservationCard
              key={appointment.id_appointment}
              reservation={appointment}
              review={review}
            />
          );
        })}
      </div>
    </section>
  );
}

export default MyReservations;
