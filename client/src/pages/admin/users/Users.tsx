import { FiCalendar, FiPause, FiUserPlus } from "react-icons/fi";
import "./Users.css";
import StatsCard from "../../../components/admin/statsCard/StatsCard";

function Users() {
  return (
    <div className="admin-users-main">
      <div className="admin-users-header">
        <div className="admin-users-title">
          <FiUserPlus className="admin-users-title-icon" />
          <h1>Gestion des utilisateurs</h1>
        </div>
        <p>Gérez et suivez les utilisateurs de votre plateforme</p>
      </div>
      <div className="admin-users-body">
        <StatsCard
          Icon={FiUserPlus}
          title="utilisateurs"
          value={150}
          cycle="Total"
        />
        <StatsCard
          Icon={FiUserPlus}
          iconColor="icon-success"
          title="Nouveaux utilisateurs"
          value={120}
          cycle="Ce mois-ci"
        />
        <StatsCard
          Icon={FiPause}
          iconColor="icon-warning"
          title="Comptes suspendus"
          value={25}
          cycle="Total"
        />
        <StatsCard
          Icon={FiCalendar}
          iconColor="icon-info"
          title="Réservations"
          value={30}
          cycle="Ce mois-ci"
        />
      </div>
    </div>
  );
}

export default Users;
