import {
  FiAlertTriangle,
  FiCalendar,
  FiHome,
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";
import "./BarberNavBar.css";
import { useState } from "react";
import { MdMenuOpen, MdPeopleAlt } from "react-icons/md";
import { NavLink } from "react-router";

function BarberNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="button_Nav"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdMenuOpen />
      </button>

      <nav className={`NavBarHair-main ${isOpen ? "open" : ""}`}>
        <h1>SECARE</h1>

        <NavLink to="/hairdresser" className="NavBarHair-menu">
          <FiHome /> Tableau de Bord
        </NavLink>
        <h3>GESTION</h3>
        <NavLink to="/hairdresser/users" className="NavBarHair-menu">
          <FiUser /> Mon profil
        </NavLink>
        <NavLink to="/hairdresser/barbers" className="NavBarHair-menu">
          <MdPeopleAlt /> Mes services
        </NavLink>
        <NavLink to="/hairdresser/calendar" className="NavBarHair-menu">
          <FiCalendar /> Mes disponibilité
        </NavLink>
        <NavLink to="/hairdresser/reservations" className="NavBarHair-menu">
          <FiMessageSquare /> Réservation
        </NavLink>
        <NavLink to="/hairdresser/reporting" className="NavBarHair-menu">
          <FiAlertTriangle /> Signalements
        </NavLink>
      </nav>
    </>
  );
}

export default BarberNavBar;
