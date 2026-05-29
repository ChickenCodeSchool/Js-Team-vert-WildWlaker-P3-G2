import { NavLink } from "react-router";
import "./LastestReservationCard.css";

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

const reservationsData: Reservation[] = [
  {
    id: "1",
    client: { name: "Thomas L.", avatar: "https://i.pravatar.cc/150?img=11" },
    coiffeur: "The Barber Shop",
    service: "Coupe + Barbe",
    date: "26 Mai 2024",
    heure: "15:00",
    statut: "Confirmée",
  },
  {
    id: "2",
    client: { name: "Emma D.", avatar: "https://i.pravatar.cc/150?img=23" },
    coiffeur: "Le Barbier Paris",
    service: "Coupe simple",
    date: "26 Mai 2024",
    heure: "14:30",
    statut: "En attente",
  },
  {
    id: "3",
    client: { name: "Lucas M.", avatar: "https://i.pravatar.cc/150?img=12" },
    coiffeur: "La Maison Barber",
    service: "Dégradé américain",
    date: "26 Mai 2024",
    heure: "13:00",
    statut: "Terminée",
  },
  {
    id: "4",
    client: { name: "Julien R.", avatar: "https://i.pravatar.cc/150?img=59" },
    coiffeur: "Gentlemen's Cut",
    service: "Barbe sculptée",
    date: "26 Mai 2024",
    heure: "12:00",
    statut: "Annulée",
  },
  {
    id: "5",
    client: { name: "Sophie T.", avatar: "https://i.pravatar.cc/150?img=47" },
    coiffeur: "Studio 24",
    service: "Coloration",
    date: "26 Mai 2024",
    heure: "11:30",
    statut: "Confirmée",
  },
];

function LatestReservationsCard() {
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
            {reservationsData.map((res) => (
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
      </div>
    </div>
  );
}
export default LatestReservationsCard;
