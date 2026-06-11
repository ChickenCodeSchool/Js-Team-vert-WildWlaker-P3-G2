import { useNavigate } from "react-router";
import "./ProfileActions.css";
import { FiCalendar, FiTrash2 } from "react-icons/fi";

function ProfileActions() {
  const navigate = useNavigate();
  return (
    <section className="profile-actions">
      <button type="button" className="profile-actions__button-delete">
        <FiTrash2 />
        <span>Supprimer le compte </span>
      </button>

      <button
        type="button"
        className="profile-actions__button"
        onClick={() => navigate("/reservations")}
      >
        <FiCalendar />
        Mes reservations
      </button>
    </section>
  );
}
export default ProfileActions;
