import "./CustomerNavbar.css";
import { FiCalendar, FiHome, FiPlus, FiSearch, FiUser } from "react-icons/fi";
import { NavLink } from "react-router";

function CustomerNavBar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <NavLink to="/" className="navbar__item">
          <FiHome className="navbar__icon" />
          <span>Accueil</span>
        </NavLink>

        <NavLink to="search" className="navbar__item">
          <FiSearch className="navbar__icon" />
          <span>Recherche</span>
        </NavLink>

        <div className="navbar__center">
          <button
            type="button"
            className="navbar__center-button"
            aria-label="Réserver"
          >
            <FiPlus />
          </button>

          <span className="navbar__center-label">Réserver</span>
        </div>

        <NavLink to="bookings" className="navbar__item">
          <FiCalendar className="navbar__icon" />
          <span>Reservations</span>
        </NavLink>

        <NavLink to="profile" className="navbar__item">
          <FiUser className="navbar__icon" />
          <span>Profil</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default CustomerNavBar;
