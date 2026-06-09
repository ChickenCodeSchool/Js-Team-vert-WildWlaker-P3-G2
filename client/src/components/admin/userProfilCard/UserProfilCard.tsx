import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  FiAtSign,
  FiMapPin,
  FiPause,
  FiPhone,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

import type { Customer } from "../../../types/Customer";

import "./UserProfilCard.css";

interface CustomerStats {
  total: number;
  canceled: number;
  reviewsCount: number;
  reported: number;
}

interface UserProfilCardProps {
  selectedCustomer: Customer & { id: number };
  selectedCustomerStats: CustomerStats;
  onEditClick: () => void;
}

function UserProfilCard({
  selectedCustomer,
  selectedCustomerStats,
  onEditClick,
}: UserProfilCardProps) {
  return (
    <div className="userProfilCard-main">
      <h2>Détail utilisateur</h2>
      <div className="userProfilCard-header">
        <img
          className="userProfilCard-avatar"
          src={selectedCustomer.avatar_url}
          alt={selectedCustomer.firstname}
        />
        <h3>
          {selectedCustomer.firstname} {selectedCustomer.lastname}
        </h3>
        <p>
          Utilisateur depuis{" "}
          {format(new Date(selectedCustomer.create_time), "dd MMM yyyy", {
            locale: fr,
          })}
        </p>
      </div>
      <div className="userProfilCard-info">
        <span>
          <FiAtSign className="userProfilCard-info-icon" />
          {selectedCustomer.email}
        </span>
        <span>
          <FiPhone className="userProfilCard-info-icon" />
          {selectedCustomer.phone}
        </span>
        <span>
          <FiMapPin className="userProfilCard-info-icon" />
          {selectedCustomer.city} {selectedCustomer.postal_code}
        </span>
      </div>
      <div className="userProfilCard-grid">
        <div className="userProfilCard-grid-case">
          <span>{selectedCustomerStats.total}</span>
          <p>Réservations</p>
        </div>
        <div className="userProfilCard-grid-case">
          <span>{selectedCustomerStats.canceled}</span>
          <p>Annulations</p>
        </div>
        <div className="userProfilCard-grid-case">
          <span>{selectedCustomerStats.reviewsCount}</span>
          <p>Avis laissés</p>
        </div>
        <div className="userProfilCard-grid-case">
          <span>{selectedCustomerStats.reported}</span>
          <p>Signalements</p>
        </div>
      </div>
      <div className="userProfilCard-action">
        <h2>Actions rapides</h2>
        <button
          className="userProfilCard-action-button"
          type="button"
          onClick={onEditClick}
        >
          <FiUser />
          Voir le profil
        </button>
        <button className="userProfilCard-action-button" type="button">
          <FiPause /> Suspendre le compte
        </button>
        <button className="userProfilCard-action-button" type="button">
          <FiTrash2 />
          Supprimer le compte
        </button>
      </div>
    </div>
  );
}

export default UserProfilCard;
