import StatsGraphCard from "../../../components/admin/statsGraphCard/StatsGraphCard";
import "./Dashboard.css";

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
        <StatsGraphCard />
      </div>
    </div>
  );
}

export default Dashboard;
