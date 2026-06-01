import "./ApprovalCard.css";

interface Hairdresser {
  id: number;
  name: string;
  avatar: string;
  registrationDate: string;
}

const pendingHairdressers: Hairdresser[] = [
  {
    id: 1,
    name: "Le Barbier Paris",
    avatar: "https://i.pravatar.cc/150?img=11",
    registrationDate: "Inscrit le 25 Mai 2024",
  },
  {
    id: 2,
    name: "Gentlemen's Cut",
    avatar: "https://i.pravatar.cc/150?img=23",
    registrationDate: "Inscrit le 24 Mai 2024",
  },
  {
    id: 3,
    name: "Studio 24",
    avatar: "https://i.pravatar.cc/150?img=12",
    registrationDate: "Inscrit le 23 Mai 2024",
  },
];

function ApprovalCard() {
  const handleValidate = (id: number) => {
    console.log(`Validation du coiffeur avec l'ID : ${id}`);
    // Ajoute ici ta logique d'API (fetch/axios) plus tard
  };

  const handleMoreOptions = (id: number) => {
    console.log(`Plus d'options pour l'ID : ${id}`);
  };

  return (
    <div className="approval-card-main">
      <div className="approval-card-header">
        <h3>Coiffeurs en attente de validation</h3>
        <a href="/admin/coiffeurs/validation" className="see-all-link">
          Voir tout
        </a>
      </div>

      <div className="approval-card-list">
        {pendingHairdressers.map((hairdresser) => (
          <div key={hairdresser.id} className="hairdresser-item">
            <div className="hairdresser-info">
              <img
                src={hairdresser.avatar}
                alt={hairdresser.name}
                className="hairdresser-avatar"
              />
              <div className="hairdresser-text">
                <span className="hairdresser-name">{hairdresser.name}</span>
                <span className="hairdresser-date">
                  {hairdresser.registrationDate}
                </span>
              </div>
            </div>

            <div className="hairdresser-actions">
              <button
                type="button"
                className="validate-btn"
                onClick={() => handleValidate(hairdresser.id)}
              >
                Valider
              </button>
              <button
                type="button"
                className="options-btn"
                onClick={() => handleMoreOptions(hairdresser.id)}
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
