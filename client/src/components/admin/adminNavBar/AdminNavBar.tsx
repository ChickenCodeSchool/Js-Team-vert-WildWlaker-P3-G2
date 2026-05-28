import {
  FiAirplay,
  FiAlertTriangle,
  FiBarChart2,
  FiCalendar,
  FiCamera,
  FiHome,
  FiMessageSquare,
  FiScissors,
  FiSettings,
  FiStar,
  FiUser,
} from "react-icons/fi";
import { NavLink } from "react-router";
import "./AdminNavBar.css";

function AdminNavBar() {
  return (
    <nav className="adminNavBar-main">
      <h2>SECARE</h2>
      <NavLink to="/admin" className="adminNavBar-menu">
        <FiHome /> Tableau de Bord
      </NavLink>
      <h3>GESTION</h3>
      <NavLink to="/admin/users" className="adminNavBar-menu">
        <FiUser /> Utilisateurs
      </NavLink>
      <NavLink to="/admin/barbers" className="adminNavBar-menu">
        <FiScissors /> Coiffeurs
      </NavLink>
      <NavLink to="/admin/reservations" className="adminNavBar-menu">
        <FiCalendar /> Réservations
      </NavLink>
      <NavLink to="/admin/reviews" className="adminNavBar-menu">
        <FiMessageSquare /> Avis & Commentaires
      </NavLink>
      <NavLink to="/admin/reporting" className="adminNavBar-menu">
        <FiAlertTriangle /> Signalements
      </NavLink>
      <h3>CONTENU</h3>
      <NavLink to="/admin/events" className="adminNavBar-menu">
        <FiStar /> Événements
      </NavLink>
      <NavLink to="/admin/banniere" className="adminNavBar-menu">
        <FiCamera />
        Bannières
      </NavLink>
      <h3>ANALYTICS</h3>
      <NavLink to="/admin/statistics" className="adminNavBar-menu">
        <FiBarChart2 /> Statistiques
      </NavLink>
      <h3>CONFIGURATION</h3>
      <NavLink to="/admin/admin" className="adminNavBar-menu">
        <FiAirplay /> Administrateurs
      </NavLink>
      <NavLink to="/admin/configuration" className="adminNavBar-menu">
        <FiSettings /> Paramètres
      </NavLink>
    </nav>
  );
}

export default AdminNavBar;
