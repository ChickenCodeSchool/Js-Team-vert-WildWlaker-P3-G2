import { format, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FiCalendar, FiCheck, FiClock, FiEye, FiXCircle } from "react-icons/fi";

import AdminFilterBar from "../../../components/admin/adminFilterBar/AdminFilterBar";
import StatsCard from "../../../components/admin/statsCard/StatsCard";
import UserDataGrid, {
  type DataGridColumn,
} from "../../../components/admin/userDataGrid/UserDataGrid";
// import ReservationProfilCard from "../../../components/admin/reservationProfilCard/ReservationProfilCard";
import { useAdminFilters } from "../../../hooks/useAdminFilter";

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

  const [appointments, setAppointments] = useState<
    (Appointment & { id: number; create_time: string })[]
  >([]);
  const [monthlyNewAppointments, setMonthlyNewAppointments] = useState<
    Appointment[]
  >([]);
  const [selectedReservation, setSelectedReservation] = useState<
    (Appointment & { id: number; create_time: string }) | null
  >(null);

  // Fetch des données
  const loadAppointmentsData = useCallback(() => {
    fetch(`${API_URL}/api/appointments`)
      .then((res) => res.json())
      .then((data: Appointment[]) => {
        const formattedData = data.map((app) => ({
          ...app,
          id: app.id_appointment,
          create_time: app.appointment_date,
        }));
        setAppointments(formattedData);

        if (formattedData.length > 0) {
          setSelectedReservation((prev) =>
            prev
              ? formattedData.find((a) => a.id === prev.id) || formattedData[0]
              : formattedData[0],
          );
        }
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des réservations :", err),
      );

    fetch(`${API_URL}/api/appointments${params}`)
      .then((res) => res.json())
      .then((data: Appointment[]) => setMonthlyNewAppointments(data))
      .catch((err) => console.error("Erreur lors du fetch mensuel :", err));
  }, [params]);

  useEffect(() => {
    loadAppointmentsData();
  }, [loadAppointmentsData]);

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateSortOrder,
    setDateSortOrder,
    filteredData,
    departmentFilter,
    setDepartmentFilter,
  } = useAdminFilters<Appointment & { id: number; create_time: string }>(
    appointments,
    ["barber_name", "customer_firstname", "customer_lastname"],
  );

  const uniqueStatus = useMemo(() => {
    const statusList = appointments
      .map((a) => a.status || "")
      .filter((s) => s.trim() !== "");
    return Array.from(new Set(statusList)).sort();
  }, [appointments]);

  const pendingCount = useMemo(
    () =>
      appointments.filter((a) => a.status?.toLowerCase() === "en attente")
        .length,
    [appointments],
  );
  const cancelCount = useMemo(
    () =>
      appointments.filter((a) => a.status?.toLowerCase() === "annulé").length,
    [appointments],
  );
  const confirmCount = useMemo(
    () =>
      appointments.filter((a) => a.status?.toLowerCase() === "confirmé").length,
    [appointments],
  );

  const columns: DataGridColumn<
    Appointment & { id: number; create_time: string }
  >[] = [
    {
      key: "barber_name",
      header: "Coiffeur",
      render: (appointment) => (
        <div className="user-grid-info">
          <span className="user-grid-fullname">{appointment.barber_name}</span>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Client",
      render: (appointment) => (
        <div className="user-grid-client-cell">
          <img
            src={appointment.customer_avatar || "/default-avatar.png"}
            alt={appointment.customer_firstname}
            className="user-grid-avatar"
          />
          <div className="user-grid-info">
            {appointment.customer_firstname} {appointment.customer_lastname}
          </div>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date & Heure",
      render: (appointment) => (
        <div className="user-grid-info">
          {format(new Date(appointment.appointment_date), "HH:mm", {
            locale: fr,
          })}
          <br />
          {format(new Date(appointment.appointment_date), "dd MMMM yyyy", {
            locale: fr,
          })}
        </div>
      ),
    },
    {
      key: "prestation",
      header: "Service",
      render: (appointment) => (
        <div className="user-grid-info">{appointment.prestation_name}</div>
      ),
    },
    {
      key: "status",
      header: "Statut",
      render: (appointment) => (
        <div
          className={`user-grid-info status-${appointment.status?.toLowerCase()}`}
        >
          {appointment.status}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (appointment) => (
        <div className="user-grid-actions-cell">
          <button
            type="button"
            className="user-grid-icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedReservation(appointment);
            }}
            title="Voir"
          >
            <FiEye />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="reservationsDash-body">
      <header className="reservationsDash-header">
        <div className="reservationsDash-title">
          <FiCalendar className="reservationsDash-title-icon" />
          <h1>Gestion des réservations</h1>
        </div>
        <p>Gerez et suivez les réservations de votre plateforme</p>

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
            value={confirmCount}
            cycle="Total"
          />
          <StatsCard
            Icon={FiClock}
            iconColor="icon-warning"
            title="En attente"
            value={pendingCount}
            cycle="Total"
          />
          <StatsCard
            Icon={FiXCircle}
            iconColor="icon-error"
            title="Annulées"
            value={cancelCount}
            cycle="Total"
          />
          <StatsCard
            Icon={FiCalendar}
            iconColor="icon-info"
            title="Nouveautés"
            value={monthlyNewAppointments.length}
            cycle="Les 30 derniers jours"
          />
        </div>
      </header>

      <main className="reservationsDash-main">
        <section className="reservationsDash-section">
          <AdminFilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            dateSortOrder={dateSortOrder}
            setDateSortOrder={setDateSortOrder}
            status={uniqueStatus}
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            departments={[]}
          />

          <UserDataGrid
            columns={columns}
            data={filteredData}
            onRowClick={(appointment) => setSelectedReservation(appointment)}
            rowsPerPage={6}
            selectedId={selectedReservation?.id}
          />
        </section>

        {/* Décommente cette section dès que ton fichier de carte de profil est prêt */}
        {/* <aside className="admin-barbers-main-aside">
          {selectedReservation ? (
            <ReservationProfilCard selectedReservation={selectedReservation} />
          ) : (
            <div className="no-user-selected">
              <p>Sélectionnez une réservation pour voir ses détails</p>
            </div>
          )}
        </aside> */}
      </main>
    </div>
  );
}

export default ReservationsDash;
