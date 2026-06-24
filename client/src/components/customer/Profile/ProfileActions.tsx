import { useNavigate } from "react-router";
import "./ProfileActions.css";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FiCalendar, FiTrash2 } from "react-icons/fi";

type Props = {
  onDeleteConfirm: () => void;
};

function ProfileActions({ onDeleteConfirm }: Props) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <section className="profile-actions">
      <button
        type="button"
        className="profile-actions__button"
        onClick={() => navigate("/reservations/21/")}
      >
        <FiCalendar className="profile-actions__icon" />
        <span>Voir mes reservations</span>
      </button>

      <button
        type="button"
        className="profile-actions__button-delete"
        onClick={() => setShowConfirm(true)}
      >
        <FiTrash2 className="profile-actions__icon" />
        <span>Supprimer le compte </span>
      </button>

      <button
        type="button"
        className="profile-actions__button"
        onClick={handleLogout}
      >
        <CiLogout className="profile-actions__icon" />
        <span>Déconnexion</span>
      </button>

      {showConfirm && (
        <div className="modal">
          <button
            type="button"
            className="modal__overlay"
            onClick={() => setShowConfirm(false)}
            aria-label="Fermer"
          />
          <div className="modal__content">
            <h2 className="modal-content__header">Supprimer le compte</h2>
            <p className="modal-content__message">
              Cette action est irréversible. Es-tu sûr de vouloir supprimer ton
              compte ?
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="modal-actions__button"
                onClick={() => setShowConfirm(false)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="modal-actions__button"
                style={{
                  background: "var(--error)",
                  color: "var(--white)",
                  border: "none",
                }}
                onClick={() => {
                  setShowConfirm(false);
                  onDeleteConfirm();
                }}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
export default ProfileActions;
