import {
  FiCalendar,
  FiFlag,
  FiScissors,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import StatsGraphCard from "../../../components/admin/statsGraphCard/StatsGraphCard";
import "./Dashboard.css";
import BigStatsGraphCard from "../../../components/admin/bigStatsGraphCard/BigStatsGraphCard";
import ReservationStatusGraph from "../../../components/admin/reservationsStatusGraph/ReservationsStatusGraph";

function Dashboard() {
  return (
    <div className="dashboard-main">
      <header className="dashboard-header">
        <h1>Bonjour, Admin 👋</h1>
        <p>
          Bienvenue sur votre tableau de bord. Voici un aperçu de vos
          statistiques récentes :
        </p>
      </header>
      <div className="dashboard-content-graphs">
        <StatsGraphCard
          Icon={FiUsers}
          title="Utilisateurs"
          value="1 245"
          evolution="↑ 12.5%"
        />
        <StatsGraphCard
          Icon={FiScissors}
          title="Coiffeurs"
          value="186"
          evolution="↑ 8.3%"
        />
        <StatsGraphCard
          Icon={FiCalendar}
          title="Réservations"
          value="342"
          evolution="↑ 15.7%"
        />
        <StatsGraphCard
          Icon={FiStar}
          title="Note moyenne"
          value="4.8/5"
          evolution="↑ 2.1%"
        />
        <StatsGraphCard
          Icon={FiFlag}
          title="Avis signalés"
          value="23"
          evolution="↑ 4.2%"
        />
      </div>

      <div className="dashboard-content-big-graphs">
        <BigStatsGraphCard title="Evolution des réservations" />
        <ReservationStatusGraph />
      </div>
    </div>
  );
}

export default Dashboard;
