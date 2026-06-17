import { FiAlertTriangle, FiCalendar, FiHome, FiUser } from "react-icons/fi";
import "./BarberNavBar.css";
import { useState } from "react";
import { GrDocumentConfig } from "react-icons/gr";
import { MdMenuOpen, MdPeopleAlt } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
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

        <NavLink to="/barber/dashBoard" className="NavBarHair-menu">
          <FiHome /> Tableau de Bord
        </NavLink>
        <h3>GESTION</h3>
        <NavLink to="/barber/profile" className="NavBarHair-menu">
          <FiUser /> Mon profil
        </NavLink>
        <NavLink to="/barber/prestations" className="NavBarHair-menu">
          <MdPeopleAlt /> Mes services
        </NavLink>
        <NavLink to="/barber/planning" className="NavBarHair-menu">
          <FiCalendar /> Planning
        </NavLink>
        <NavLink to="/barber/planning" className="NavBarHair-menu">
          <FiCalendar /> Disponibilités
        </NavLink>
        <NavLink to="/barber/signalement" className="NavBarHair-menu">
          <FiAlertTriangle /> Signalements
        </NavLink>
        <h3>ANALYTICS</h3>
        <NavLink to="/barber/statistics" className="NavBarHair-menu">
          <SiSimpleanalytics /> Statistiques
        </NavLink>
        <h3>CONFIGURATION</h3>
        <NavLink to="/barber/signalement" className="NavBarHair-menu">
          <GrDocumentConfig />
          Aide & Support
        </NavLink>
      </nav>
    </>
  );
}

export default BarberNavBar;
