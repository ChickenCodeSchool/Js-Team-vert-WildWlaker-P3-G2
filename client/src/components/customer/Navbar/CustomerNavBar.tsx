import { FiCalendar, FiHome, FiPlus, FiSearch, FiUser } from "react-icons/fi";
import { NavLink } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import "./CustomerNavbar.css";

function CustomerNavBar() {
  const { user } = useAuth();

  return (
    <nav className="navbar" aria-label="Navigation client">
      <div className="navbar__container">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "navbar__item navbar__item--active" : "navbar__item"
          }
        >
          <FiHome className="navbar__icon" />
          <span>Accueil</span>
        </NavLink>

        <NavLink
          to="search"
          className={({ isActive }) =>
            isActive ? "navbar__item navbar__item--active" : "navbar__item"
          }
        >
          <FiSearch className="navbar__icon" />
          <span>Recherche</span>
        </NavLink>

        <NavLink
          to="booking"
          className={({ isActive }) =>
            isActive ? "navbar__center navbar__item--active" : "navbar__center"
          }
        >
          <div className="navbar__center-button">
            <FiPlus />
          </div>
          <span className="navbar__center-label">Réserver</span>
        </NavLink>

        <NavLink
          to="reservations"
          className={({ isActive }) =>
            isActive ? "navbar__item navbar__item--active" : "navbar__item"
          }
        >
          <FiCalendar className="navbar__icon" />
          <span>Réservations</span>
        </NavLink>

        <NavLink
          to={user ? `/profile/${user.id}` : "/login"}
          className={({ isActive }) =>
            isActive ? "navbar__item navbar__item--active" : "navbar__item"
          }
        >
          <FiUser className="navbar__icon" />
          <span>Profil</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default CustomerNavBar;
