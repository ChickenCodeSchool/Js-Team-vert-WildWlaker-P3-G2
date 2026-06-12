import { useNavigate } from "react-router";
import "./ProfileActions.css";
import { FiCalendar, FiTrash2 } from "react-icons/fi";
import { HiX } from "react-icons/hi";

function ProfileActions() {
  const navigate = useNavigate();
  return (
    <section className="profile-actions">
      <button type="button" className="profile-actions__button-delete">
        <FiTrash2 className="profile-actions__icon" />
        <span>Supprimer le compte </span>
      </button>

      <button type="button" className="profile-actions__button-suspend">
        <HiX className="profile-actions__icon" />
        <span>Suspendre le compte </span>
      </button>

      <button
        type="button"
        className="profile-actions__button"
        onClick={() => navigate("/reservations")}
      >
        <FiCalendar className="profile-actions__icon" />
        <span>Mes reservations</span>
      </button>
    </section>
  );
}
export default ProfileActions;
