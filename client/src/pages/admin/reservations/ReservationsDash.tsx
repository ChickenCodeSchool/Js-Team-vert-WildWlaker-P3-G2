import { format, subDays } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { FiCalendar, FiCheck, FiClock, FiXCircle } from "react-icons/fi";
import StatsCard from "../../../components/admin/statsCard/StatsCard";

import type { Appointment } from "../../../types/appointment";
import "./ReservationsDash.css";

function ReservationsDash() {
  const API_URL = import.meta.env.VITE_API_URL;
  const today = new Date();
  const thirtyDaysAgo = subDays(today, 30);
  const thisMonthRange = {
    start: format(thirtyDaysAgo, "yyyy-MM-dd"),
    end: format(today, "yyyy-MM-dd"),
  };
  const params = `?startDate=${thisMonthRange.start}&endDate=${thisMonthRange.end}`;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [monthlyNewAppointments, setMonthlyNewAppointments] = useState<
    Appointment[]
  >([]);

  useEffect(() => {
    fetch(`${API_URL}/api/appointments`)
      .then((res) => res.json())
      .then((data: Appointment[]) => setAppointments(data))
      .catch((err) => console.error("Erreur lors du fetch mensuel:", err));
    fetch(`${API_URL}/api/appointments${params}`)
      .then((res) => res.json())
      .then((data: Appointment[]) => setMonthlyNewAppointments(data))
      .catch((err) => console.error("Erreur lors du fetch mensuel:", err));
  });

  const pendingappointmentscount = useMemo(() => {
    return appointments.filter((a) => a.status?.toLowerCase() === "en attente")
      .length;
  }, [appointments]);
  const cancelappointmentscount = useMemo(() => {
    return appointments.filter((a) => a.status?.toLowerCase() === "annulé")
      .length;
  }, [appointments]);
  const confirmappointmentscount = useMemo(() => {
    return appointments.filter((a) => a.status?.toLowerCase() === "confirmé")
      .length;
  }, [appointments]);
  return (
    <div className="reservationsDash-body">
      <header className="reservationsDash-header">
        <div className="reservationsDash-title">
          <FiCalendar className="reservationsDash-title-icon" />
          <h1>Gestion des réservations</h1>
        </div>
        <p>Gérez et suivez les réservations de votre plateforme</p>
      </header>
      <main className="reservationsDash-main">
        <section className="reservationsDash-section-top">
          <div className="reservationsDash-top-graphs">
            <StatsCard
              Icon={FiCalendar}
              iconColor="icon-info"
              title="Réservations"
              value={appointments.length}
              cycle="Total"
            />
            <StatsCard
              Icon={FiCheck}
              iconColor="icon-success"
              title="Confirmées"
              value={confirmappointmentscount}
              cycle="Total"
            />
            <StatsCard
              Icon={FiClock}
              iconColor="icon-warning"
              title="En attente"
              value={pendingappointmentscount}
              cycle="Total"
            />
            <StatsCard
              Icon={FiXCircle}
              iconColor="icon-error"
              title="Annuléés"
              value={cancelappointmentscount}
              cycle="Total"
            />
            <StatsCard
              Icon={FiCalendar}
              iconColor="icon-info"
              title="Réservations"
              value={monthlyNewAppointments.length}
              cycle="Les 30 derniers jours"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default ReservationsDash;
