import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import {
  FiCalendar,
  FiCheck,
  FiClock,
  FiEdit2,
  FiStar,
  FiXCircle,
} from "react-icons/fi";

import AdminFilterBar from "../../../components/admin/adminFilterBar/AdminFilterBar";
import EventDetailCard from "../../../components/admin/eventDetailCard/EventDetailCard";
import StatsCard from "../../../components/admin/statsCard/StatsCard";
import UserDataGrid, {
  type DataGridColumn,
} from "../../../components/admin/userDataGrid/UserDataGrid";
import { useAdminFilters } from "../../../hooks/useAdminFilter";

import type { Event } from "../../../types/event";

import "./EventDash.css";

const API_URL = import.meta.env.VITE_API_URL;

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength)}...`;
  }
  return text;
};

type DashboardEvent = Event & { id: number };

function EventDash() {
  const [events, setEvents] = useState<DashboardEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<DashboardEvent | null>(
    null,
  );

  useEffect(() => {
    fetch(`${API_URL}/api/events`)
      .then((res) => res.json())
      .then((data: Event[]) => {
        const formattedData = data.map((item) => ({
          ...item,
          id: item.id_event,
        }));
        setEvents(formattedData);
      });
  }, []);

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateSortOrder,
    setDateSortOrder,
    filteredData,
    locationFilter,
    setLocationFilter,
  } = useAdminFilters<DashboardEvent>(
    events,
    ["title", "description", "location"],
    "start_date",
  );

  const uniqueStatus = useMemo(() => {
    const statusList = events
      .map((e) => (e.status as string) || "")
      .filter((s) => s.trim() !== "");
    return Array.from(new Set(statusList)).sort();
  }, [events]);

  const locationOptions = useMemo(() => {
    const places = events.map((e) => (e.location as string) || "");
    return Array.from(new Set(places)).sort();
  }, [events]);

  const totalCount = events.length;
  const publishedCount = events.filter((e) => e.status === "publié").length;
  const plannedCount = events.filter((e) => e.status === "annulé").length;
  const draftCount = events.filter((e) => e.status === "brouillon").length;
  const finishedCount = events.filter((e) => e.status === "terminé").length;

  const columns: DataGridColumn<DashboardEvent>[] = [
    {
      key: "title",
      header: "Titre",
      render: (event) => (
        <div className="user-grid-info">{truncateText(event.title, 30)}</div>
      ),
    },
    {
      key: "status",
      header: "Statut",
      render: (event) => (
        <div className={`user-grid-info status-${event.status?.toLowerCase()}`}>
          {event.status}
        </div>
      ),
    },
    {
      key: "start_date",
      header: "Date de début",
      render: (event) => (
        <div className="user-grid-info">
          {format(new Date(event.start_date), "dd MMM yyyy", { locale: fr })}
          <b />
          {format(new Date(event.start_date), "HH:mm", { locale: fr })}
        </div>
      ),
    },
    {
      key: "end_date",
      header: "Date de fin",
      render: (event) => (
        <div className="user-grid-info">
          {format(new Date(event.end_date), "dd MMM yyyy", { locale: fr })}
          <b />
          {format(new Date(event.end_date), "HH:mm", { locale: fr })}
        </div>
      ),
    },
    {
      key: "location",
      header: "Lieu",
      render: (event) => <div className="user-grid-info">{event.location}</div>,
    },
  ];

  return (
    <div className="eventDash-body">
      <header className="eventDash-header">
        <div className="eventDash-title">
          <FiStar className="eventDash-title-icon" />
          <h1>Événements</h1>
        </div>
        <p>Gérez et planifiez vos événements pour vos coiffeurs.</p>

        <div className="eventDash-top-graphs">
          <StatsCard
            Icon={FiCalendar}
            iconColor="icon-info"
            title="Événements"
            value={totalCount}
            cycle="Total"
          />
          <StatsCard
            Icon={FiClock}
            iconColor="icon-warning"
            title="Brouillons"
            value={draftCount}
            cycle="Total"
          />
          <StatsCard
            Icon={FiCheck}
            iconColor="icon-success"
            title="Publiés"
            value={publishedCount}
            cycle="Total"
          />
          <StatsCard
            Icon={FiXCircle}
            iconColor="icon-error"
            title="Annulés"
            value={plannedCount}
            cycle="Total"
          />
          <StatsCard
            Icon={FiXCircle}
            iconColor="icon-info"
            title="Terminés"
            value={finishedCount}
            cycle="Total"
          />
        </div>
        <button className="btn-add-event" type="button">
          <FiEdit2 /> Créer un événement
        </button>
      </header>

      <main className="eventDash-main">
        <section className="eventDash-section">
          <AdminFilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            dateSortOrder={dateSortOrder}
            setDateSortOrder={setDateSortOrder}
            status={uniqueStatus}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            location={locationOptions}
            locationPlaceholder="Tous les lieux"
          />

          <UserDataGrid
            columns={columns}
            data={filteredData}
            onRowClick={(event) => setSelectedEvent(event)}
            rowsPerPage={7}
            selectedId={selectedEvent?.id_event}
          />
        </section>

        <aside className="eventDash-aside">
          <EventDetailCard selectedEvent={selectedEvent} />
        </aside>
      </main>
    </div>
  );
}

export default EventDash;
