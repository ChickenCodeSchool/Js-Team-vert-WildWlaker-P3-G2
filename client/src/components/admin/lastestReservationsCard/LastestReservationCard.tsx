import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import "./LastestReservationCard.css";

const API_URL = import.meta.env.VITE_API_URL;

interface Reservation {
  id: string;
  client: { name: string; avatar: string };
  coiffeur: string;
  service: string;
  formattedDate: string;
  statut: "Confirmée" | "En attente" | "Terminée" | "Annulée";
}

type RawAppointment = {
  id_appointement?: number;
  appointment_date: string;
  status: string;
  barber_name: string;
  customer_firstname: string;
  customer_lastname: string;
  prestation_name: string;
  customer_avatar?: string;
};

const STATUS_CONFIG: Record<
  string,
  { label: Reservation["statut"]; className: string }
> = {
  confirmed: { label: "Confirmée", className: "status-confirmed" },
  pending: { label: "En attente", className: "status-pending" },
  completed: { label: "Terminée", className: "status-completed" },
  cancelled: { label: "Annulée", className: "status-cancelled" },
};

function LatestReservationsCard() {
  const [appointments, setAppointments] = useState<Reservation[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/appointments`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau");
        return res.json();
      })
      .then((rawData: RawAppointment[]) => {
        const formatted = rawData
          .sort((a, b) => b.appointment_date.localeCompare(a.appointment_date))
          .slice(0, 5)
          .map((app) => {
            const dateObj = new Date(app.appointment_date);
            const statusInfo = STATUS_CONFIG[app.status] || {
              label: "En attente",
              className: "status-pending",
            };

            return {
              id: (app.id_appointement ?? Math.random()).toString(),
              client: {
                name: `${app.customer_firstname || "Client"} ${(app.customer_lastname || "").charAt(0)}.`,
                avatar:
                  app.customer_avatar ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
              },
              coiffeur: app.barber_name || "Coiffeur inconnu",
              service: app.prestation_name || "Prestation",
              formattedDate: format(dateObj, "dd MMM yyyy, HH:mm", {
                locale: fr,
              }),
              statut: statusInfo.label,
            };
          });

        setAppointments(formatted);
      })
      .catch((err) => console.error("Erreur chargement réservations :", err));
  }, []);

  return (
    <div className="lastestreservations-card">
      <div className="card-header">
        <h3 className="card-title">Dernières réservations</h3>
        <NavLink to="/admin/reservations" className="see-all-link">
          Voir tout
        </NavLink>
      </div>

      <div className="table-responsive">
        <table className="reservations-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Coiffeur</th>
              <th>Service</th>
              <th>Date & Heure</th>
              <th>Statut</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {appointments.map((res) => {
              const config = Object.values(STATUS_CONFIG).find(
                (c) => c.label === res.statut,
              );

              return (
                <tr key={res.id}>
                  <td>
                    <div className="client-info">
                      <img
                        src={res.client.avatar}
                        alt={res.client.name}
                        className="client-avatar"
                      />
                      <span className="client-name">{res.client.name}</span>
                    </div>
                  </td>
                  <td>{res.coiffeur}</td>
                  <td>{res.service}</td>
                  <td>
                    <span className="res-date">{res.formattedDate}</span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${config?.className || "status-pending"}`}
                    >
                      {res.statut}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="action-btn"
                      title="Options"
                    >
                      &#8942;
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {appointments.length === 0 && (
          <p
            style={{
              textAlign: "center",
              padding: "20px",
              color: "var(--gray-300)",
            }}
          >
            Aucune réservation récente.
          </p>
        )}
      </div>
    </div>
  );
}

export default LatestReservationsCard;
