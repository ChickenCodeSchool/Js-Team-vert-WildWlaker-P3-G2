import {
  FiAtSign,
  FiMapPin,
  FiPause,
  FiPhone,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

import "./UserProfilCard.css";
type userProfilCardProps = {
  avatar: string;
  name: string;
  createTime: string;
  email: string;
  phonenum: string;
  city: string;
  postalcode: string;
  reservationsCount: number;
  reservationsCanceledCount: number;
  reviewsCount: number;
  repordedsCount: number;
};

function UserProfilCard({
  avatar,
  name,
  createTime,
  email,
  phonenum,
  city,
  postalcode,
  reservationsCount,
  reservationsCanceledCount,
  reviewsCount,
  repordedsCount,
}: userProfilCardProps) {
  return (
    <div className="userProfilCard-main">
      <h2>Détail utilisateur</h2>
      <div className="userProfilCard-header">
        <img className="userProfilCard-avatar" src={avatar} alt={name} />
        <h3>{name}</h3>
        <p>Utilisateur depuis {createTime}</p>
      </div>
      <div className="userProfilCard-info">
        <span>
          <FiAtSign className="userProfilCard-info-icon" />
          {email}
        </span>
        <span>
          <FiPhone className="userProfilCard-info-icon" />
          {phonenum}
        </span>
        <span>
          <FiMapPin className="userProfilCard-info-icon" />
          {city} {postalcode}
        </span>
      </div>
      <div className="userProfilCard-grid">
        <div className="userProfilCard-grid-case">
          <span>{reservationsCount}</span>
          <p>Réservations</p>
        </div>
        <div className="userProfilCard-grid-case">
          <span>{reservationsCanceledCount}</span>
          <p>Annulations</p>
        </div>
        <div className="userProfilCard-grid-case">
          <span>{reviewsCount}</span>
          <p>Avis laissés</p>
        </div>
        <div className="userProfilCard-grid-case">
          <span>{repordedsCount}</span>
          <p>Signalements</p>
        </div>
      </div>
      <div className="userProfilCard-action">
        <h2>Actions rapides</h2>
        <button className="userProfilCard-action-button" type="button">
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
