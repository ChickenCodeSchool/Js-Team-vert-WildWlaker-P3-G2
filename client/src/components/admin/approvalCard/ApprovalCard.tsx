import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
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

  const loadbarbersData = useCallback(() => {
    fetch(`${apiUrl}/api/barbers`)
      .then((res) => res.json())
      .then((data) => setBarbers(data));
  }, []);
  useEffect(() => {
    loadbarbersData();
  }, [loadbarbersData]);
  const handleValidate = async (barber: BarberItems) => {
    console.log(`Validation du coiffeur avec l'ID : ${barber.id_user}`);

    const result = await Swal.fire({
      title: "Approuver le profil ?",
      text: "Êtes-vous sûr de vouloir approuver et activer ce coiffeur ?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#10ac84",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, confirmer",
      cancelButtonText: "Annuler",
    });

    if (!result.isConfirmed) return;

    try {
      const payload = {
        ...barber,
        status: "Actif",
      };

      const response = await fetch(`${apiUrl}/api/barbers/${barber.id_user}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      Swal.fire({
        icon: "success",
        title: "Succès !",
        text: "Le compte est maintenant actif",
        timer: 2000,
        showConfirmButton: false,
      });
      loadbarbersData();
    } catch (error) {
      console.error("Erreur validation :", error);
      Swal.fire(
        "Erreur",
        "Une erreur est survenue lors de la validation",
        "error",
      );
    }
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
                onClick={() => handleValidate(barber)}
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
