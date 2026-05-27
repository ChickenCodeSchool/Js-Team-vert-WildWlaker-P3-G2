import { NavLink } from "react-router";

import "./AdminNavBar.css";

function AdminNavBar() {
  return (
    <nav className="adminNavBar-main">
      <h2>SECARE</h2>
      <NavLink to="/admin" className="adminNavBar-menu">
        🏠 Tableau de Bord
      </NavLink>
      <h3>GESTION</h3>
      <NavLink to="/admin/users" className="adminNavBar-menu">
        🧑 Utilisateurs
      </NavLink>
      <NavLink to="/admin/barbers" className="adminNavBar-menu">
        💇 Coiffeurs
      </NavLink>
      <NavLink to="/admin/reservations" className="adminNavBar-menu">
        🗓️ Réservations
      </NavLink>
      <NavLink to="/admin/reviews" className="adminNavBar-menu">
        💬 Avis & Commentaires
      </NavLink>
      <NavLink to="/admin/reporting" className="adminNavBar-menu">
        📢 Signalements
      </NavLink>
      <h3>CONTENU</h3>
      <NavLink to="/admin/events" className="adminNavBar-menu">
        🎉 Événements
      </NavLink>
      <NavLink to="/admin/banniere" className="adminNavBar-menu">
        🖼️ Bannières
      </NavLink>
      <h3>ANALYTICS</h3>
      <NavLink to="/admin/statistics" className="adminNavBar-menu">
        📊 Statistiques
      </NavLink>
      <h3>CONFIGURATION</h3>
      <NavLink to="/admin/admin" className="adminNavBar-menu">
        🏢 Administrateurs
      </NavLink>
      <NavLink to="/admin/configuration" className="adminNavBar-menu">
        🛠️ Paramètres
      </NavLink>
    </nav>
  );
}

export default AdminNavBar;
