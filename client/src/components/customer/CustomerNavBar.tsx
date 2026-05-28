import "./CustomerNavbar.css";
import { FiCalendar, FiHome, FiPlus, FiSearch, FiUser } from "react-icons/fi";
import { NavLink } from "react-router";

function CustomerNavBar() {
  return (
    <nav className="navbar">
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
          to="reserve"
          className={({ isActive }) =>
            isActive ? "navbar__center navbar__item--active" : "navbar__center"
          }
        >
          <div className="navbar__center-button" aria-label="Réserver">
            <FiPlus />
          </div>

          <span className="navbar__center-label">Réserver</span>
        </NavLink>

        <NavLink
          to="bookings"
          className={({ isActive }) =>
            isActive ? "navbar__item navbar__item--active" : "navbar__item"
          }
        >
          <FiCalendar className="navbar__icon" />
          <span>Reservations</span>
        </NavLink>

        <NavLink
          to="profile"
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
