import { useEffect, useState } from "react";
import { FaCommentAlt, FaCut } from "react-icons/fa";
import { FiCalendar, FiHome, FiLogOut, FiUser } from "react-icons/fi";
import { GrDocumentConfig } from "react-icons/gr";
import { MdFreeCancellation, MdPeopleAlt } from "react-icons/md";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import "./BarberNavBar.css";

const API_URL = import.meta.env.VITE_API_URL;

type BarberProfile = {
  name: string;
  avatar_url?: string;
};

function BarberNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [barber, setBarber] = useState<BarberProfile | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`${API_URL}/api/barbers/${user.id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setBarber(data);
      })
      .catch(() => {});
  }, [user?.id]);

  const avatarUrl = barber?.avatar_url?.startsWith("/")
    ? `${API_URL}${barber.avatar_url}`
    : barber?.avatar_url || null;

  const initials = barber?.name ? barber.name.slice(0, 2).toUpperCase() : "??";

  return (
    <>
      <button
        type="button"
        className="button_Nav"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FaCut />
      </button>

      <nav className={`NavBarHair-main ${isOpen ? "open" : ""}`}>
        <div className="NavBarHair-profile">
          <div className="NavBarHair-profile__avatar">
            {avatarUrl ? (
              <img src={avatarUrl} alt={barber?.name} />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          {barber?.name && (
            <p className="NavBarHair-profile__name">{barber.name}</p>
          )}
        </div>

        <NavLink to="/" className="NavBarHair-menu">
          <FiHome /> Accueil
        </NavLink>

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

        <NavLink to="/barber/disponibilites" className="NavBarHair-menu">
          <FiCalendar /> Disponibilités
        </NavLink>

        <NavLink to="/barber/annulations" className="NavBarHair-menu">
          <MdFreeCancellation /> Gestion RDV
        </NavLink>

        <h3>ANALYTICS</h3>

        <NavLink to="/barber/customer" className="NavBarHair-menu">
          <FaCommentAlt /> Avis
        </NavLink>

        <h3>CONFIGURATION</h3>

        <NavLink to="/barber/parametres" className="NavBarHair-menu">
          <GrDocumentConfig />
          Paramètres
        </NavLink>

        <button
          type="button"
          className="NavBarHair-menu NavBarHair-menu--logout"
          onClick={handleLogout}
        >
          <FiLogOut /> Déconnexion
        </button>
      </nav>
    </>
  );
}

export default BarberNavBar;
