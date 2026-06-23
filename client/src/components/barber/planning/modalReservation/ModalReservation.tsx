import { useState } from "react";
import "./ModalReservation.css";

type ReservationStatus = "en attente" | "confirmé" | "terminé" | "annulé";

type Reservation = {
  id_appointment: number;
  appointment_date: string;
  status: ReservationStatus;
  customer_firstname: string;
  customer_lastname: string;
  customer_avatar: string;
  customer_phone?: string;
  customer_city?: string;
  prestation_name: string;
  duration_minutes: number;
  customer_adress: string;
  price?: number;
};

type Props = {
  reservation: Reservation;
  onClose: () => void;
  onCancelled?: (id: number) => void;
};

const API_URL = import.meta.env.VITE_API_URL;

function ModalReservation({ reservation, onClose, onCancelled }: Props) {
  const [cancelling, setCancelling] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const date = new Date(reservation.appointment_date);

  const formattedDate = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCancel = async () => {
    setCancelling(true);
    try {
      const res = await fetch(
        `${API_URL}/api/appointments/${reservation.id_appointment}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "annulé" }),
        },
      );
      if (!res.ok) throw new Error("Erreur serveur");
      onCancelled?.(reservation.id_appointment);
      onClose();
    } catch {
      setCancelling(false);
    }
  };

  const canCancel =
    reservation.status === "en attente" || reservation.status === "confirmé";

  return (
    <div className="modal-reservation-overlay">
      <dialog
        className="modal-reservation"
        aria-modal="true"
        aria-labelledby="modal-reservation-title"
        open
      >
        <h2 id="modal-reservation-title">Détail du rendez-vous</h2>

        <div className="modal-reservation-user">
          <img
            src={reservation.customer_avatar}
            alt={`${reservation.customer_firstname} ${reservation.customer_lastname}`}
          />

          <div>
            <h3>
              {reservation.customer_firstname} {reservation.customer_lastname}
            </h3>

            <span className={`modal-reservation-status ${reservation.status}`}>
              {reservation.status}
            </span>

            <p>{reservation.customer_adress || "Adresse non renseignée"}</p>
            <p>{reservation.customer_city || "Ville non renseignée"}</p>
            <p>{reservation.customer_phone || "Téléphone non renseigné"}</p>
          </div>
        </div>

        <div className="modal-reservation-divider" />

        <div className="modal-reservation-list">
          <div>
            <span>Date</span>
            <strong>{formattedDate}</strong>
          </div>

          <div>
            <span>Heure</span>
            <strong>{formattedTime}</strong>
          </div>

          <div>
            <span>Prestation</span>
            <strong>{reservation.prestation_name}</strong>
          </div>

          <div>
            <span>Durée</span>
            <strong>{reservation.duration_minutes} min</strong>
          </div>

          <div>
            <span>Prix</span>
            <strong>
              {reservation.price ? `${reservation.price} €` : "Non renseigné"}
            </strong>
          </div>
        </div>

        {canCancel && (
          <div className="modal-reservation-cancel-zone">
            {confirmCancel ? (
              <>
                <p className="modal-reservation-cancel-confirm-text">
                  Confirmer l'annulation ? Le client sera notifié.
                </p>
                <div className="modal-reservation-cancel-actions">
                  <button
                    type="button"
                    className="modal-reservation-cancel-back"
                    onClick={() => setConfirmCancel(false)}
                  >
                    Retour
                  </button>
                  <button
                    type="button"
                    className="modal-reservation-cancel-confirm"
                    onClick={handleCancel}
                    disabled={cancelling}
                  >
                    {cancelling ? "Annulation…" : "Confirmer l'annulation"}
                  </button>
                </div>
              </>
            ) : (
              <button
                type="button"
                className="modal-reservation-cancel-btn"
                onClick={() => setConfirmCancel(true)}
              >
                Annuler ce rendez-vous
              </button>
            )}
          </div>
        )}

        <button
          type="button"
          className="modal-reservation-button"
          onClick={onClose}
        >
          Fermer
        </button>
      </dialog>
    </div>
  );
}

export default ModalReservation;
