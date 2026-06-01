import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import "./LastestReservationCard.css";

const API_URL = import.meta.env.VITE_API_URL;

interface Reservation {
  id: string;
  client: {
    name: string;
    avatar: string;
  };
  coiffeur: string;
  service: string;
  date: string;
  heure: string;
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

function LatestReservationsCard() {
  const [appointments, setAppointments] = useState<Reservation[]>([]);

  const getStatusClass = (status: Reservation["statut"]) => {
    switch (status) {
      case "Confirmée":
        return "status-confirmed";
      case "En attente":
        return "status-pending";
      case "Terminée":
        return "status-completed";
      case "Annulée":
        return "status-cancelled";
      default:
        return "";
    }
  };

  useEffect(() => {
    fetch(`${API_URL}/api/appointements`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau");
        return res.json();
      })
      .then((rawData: RawAppointment[]) => {
        const statusMap: { [key: string]: Reservation["statut"] } = {
          confirmed: "Confirmée",
          pending: "En attente",
          completed: "Terminée",
          cancelled: "Annulée",
        };

        rawData.sort((a, b) => {
          return (
            new Date(b.appointment_date).getTime() -
            new Date(a.appointment_date).getTime()
          );
        });

        const formattedAppointments: Reservation[] = rawData.map((app) => {
          const dateObj = new Date(app.appointment_date);

          const dateStr = dateObj.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          const heureStr = dateObj.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          });

          const finalId = app.id_appointement ?? Math.random();

          return {
            id: finalId.toString(),
            client: {
              name: `${app.customer_firstname || "Client"} ${(app.customer_lastname || "").charAt(0)}.`,
              avatar:
                app.customer_avatar ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
            },
            coiffeur: app.barber_name || "Coiffeur inconnu",
            service: app.prestation_name || "prestation",
            date: dateStr,
            heure: heureStr,
            statut: statusMap[app.status] || "En attente",
          };
        });

        setAppointments(formattedAppointments.slice(0, 5));
      })
      .catch((err) =>
        console.error("Erreur chargement dernières réservations :", err),
      );
  }, []);

  return (
    <div className="reservations-card">
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
              <th aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((res) => (
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
                  <span className="res-date">
                    {res.date}, {res.heure}
                  </span>
                </td>

                <td>
                  <span
                    className={`status-badge ${getStatusClass(res.statut)}`}
                  >
                    {res.statut}
                  </span>
                </td>

                <td>
                  <button type="button" className="action-btn" title="Options">
                    &#8942;
                  </button>
                </td>
              </tr>
            ))}
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
