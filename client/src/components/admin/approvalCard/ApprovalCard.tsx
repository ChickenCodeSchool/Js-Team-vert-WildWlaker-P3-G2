import { useEffect, useState } from "react";
import "./ApprovalCard.css";

type BarberItems = {
  id_user: number;
  name: string;
  avatar_url: string | null;
  create_time: string;
  status: string;
};

function ApprovalCard() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [barbers, setBarbers] = useState<BarberItems[]>([]);
  useEffect(() => {
    fetch(`${apiUrl}/api/barbers`)
      .then((res) => res.json())
      .then((data) => setBarbers(data));
  }, []);

  const handleValidate = (id: number) => {
    console.log(`Validation du coiffeur avec l'ID : ${id}`);
    // Ajoute ici ta logique d'API (fetch/axios) plus tard
  };

  const handleMoreOptions = (id: number) => {
    console.log(`Plus d'options pour l'ID : ${id}`);
  };
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Date inconnue";
    const dateObj = new Date(dateStr);
    return `Inscrit le ${dateObj.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}`;
  };
  const pendingBarbers = barbers
    .filter((barber) => barber.status === "En attente")
    .slice(0, 3);

  return (
    <div className="approval-card-main">
      <div className="approval-card-header">
        <h3>Coiffeurs en attente de validation</h3>
        <a href="/admin/barbers" className="see-all-link">
          Voir tout
        </a>
      </div>

      <div className="approval-card-list">
        {pendingBarbers.map((barber) => (
          <div key={barber.id_user} className="hairdresser-item">
            <div className="hairdresser-info">
              <img
                src={barber.avatar_url || "/default-avatar.png"}
                alt={barber.name}
                className="hairdresser-avatar"
              />
              <div className="hairdresser-text">
                <span className="hairdresser-name">{barber.name}</span>
                <span className="hairdresser-date">
                  {formatDate(barber.create_time)}
                </span>
              </div>
            </div>

            <div className="hairdresser-actions">
              <button
                type="button"
                className="validate-btn"
                onClick={() => handleValidate(barber.id_user)}
              >
                Valider
              </button>
              <button
                type="button"
                className="options-btn"
                onClick={() => handleMoreOptions(barber.id_user)}
                aria-label="Plus d'options"
              >
                ⋮
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApprovalCard;
