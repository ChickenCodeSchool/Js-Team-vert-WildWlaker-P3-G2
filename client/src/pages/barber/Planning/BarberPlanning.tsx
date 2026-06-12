import { useEffect, useState } from "react";
import PlanningCalendar from "../../../components/barber/planningCalendar/PlanningCalendar";
import ReservationCardPlanning from "../../../components/barber/reservationCard/ReservationCardPlanning";

import "./BarberPlanning.css";

type ApiReservation = {
  id_appointment: number;
  appointment_date: string;
  status: "confirmed" | "pending" | "cancelled";
  customer_firstname: string;
  customer_lastname: string;
  customer_avatar: string;
  prestation_name: string;
  duration_minutes: number;
};

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function BarberPlanning() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState<ApiReservation[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/appointments`)
      .then((res) => res.json())
      .then((data) => {
        setReservations(data);
      });
  }, []);

  const selectedDateKey = formatDateKey(selectedDate);

  const reservationsOfSelectedDay = reservations
    .filter((reservation) => {
      const reservationDate = formatDateKey(
        new Date(reservation.appointment_date),
      );

      return reservationDate === selectedDateKey;
    })
    .sort(
      (a, b) =>
        new Date(a.appointment_date).getTime() -
        new Date(b.appointment_date).getTime(),
    );

  const titleDate = selectedDate.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="barber-planning-page">
      <PlanningCalendar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        reservations={reservations}
      />

      <section className="barber-planning-reservations">
        <div className="planning-handle" />

        <h3>{titleDate}</h3>

        {reservationsOfSelectedDay.length > 0 ? (
          reservationsOfSelectedDay.map((reservation) => (
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
              duration={reservation.duration_minutes}
              status={reservation.status}
            />
          ))
        ) : (
          <p>Aucun rendez-vous ce jour</p>
        )}
      </section>
    </main>
  );
}

export default BarberPlanning;
